from fastapi import APIRouter, UploadFile, File, HTTPException, Depends,Query
from sqlalchemy.orm import Session

import re
from datetime import datetime

from models.user import User
from models.chat import Chat, Message
from database import get_db
from services.auth import get_current_user
from services.rag import (
    split_document,
    init_vector_store,
    store_chunks_in_pinecone,
    create_qa_chain,
    run_query,
    delete_namespace
)
from utils.extract_text import extract_pdf_text, extract_docx_text, extract_pptx_text, extract_txt_text
from schemas.chat import QuestionRequest, UpdateChatTitle
from config import settings
from utils.exceptions import PineconeUploadError


router = APIRouter(prefix='/chat', tags=['Chat'])

ALLOWED_EXTENSIONS = ["pdf", "docx", "txt", "pptx"]

def sanitize_filename_alternative(filename):
    """Removes or replaces non-ASCII alphanumeric characters from a filename."""
    name, ext = filename.rsplit('.', 1)
    sanitized_name = re.sub(r'[^a-zA-Z0-9_-]+', '_', name)
    sanitized_name = sanitized_name.encode('ascii', 'ignore').decode('ascii')
    return f"{sanitized_name}.{ext}"

def get_namespace(user_id, filename):
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    sanitized_file = sanitize_filename_alternative(filename)
    return f"user_{user_id}_chat_{sanitized_file}_{timestamp}"

def extract_text_based_on_extension(ext: str, file: UploadFile):
    match ext:
        case "pdf":
            return extract_pdf_text(file)
        case "docx":
            return extract_docx_text(file)
        case "txt":
            return extract_txt_text(file)
        case "pptx":
            return extract_pptx_text(file)
        case _:
            raise ValueError(f"Unsupported file extension: {ext}")

@router.post("/upload/")
async def upload_file(
    file: UploadFile = File(...),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    ext = file.filename.split(".")[-1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Only PDF, DOCX, TXT, PPTX files are supported")

    try:
        text = extract_text_based_on_extension(ext, file)
        
        splits = split_document(text)

        namespace = get_namespace(user.id, file.filename)
        vector_store = init_vector_store(settings.pinecone_index_name, namespace)
        store_chunks_in_pinecone(splits, vector_store, namespace=namespace)

        chat = Chat(user_id=user.id, title=file.filename, pinecone_namespace=namespace)
        db.add(chat)
        db.commit()
        db.refresh(chat)

        return {"chat_id": chat.id}
    except PineconeUploadError as e:
        raise HTTPException(status_code=413, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")


@router.post("/{chat_id}/ask")
async def ask_question(
    chat_id: str,
    question_request: QuestionRequest,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()

    if not chat:
        raise HTTPException(status_code=404, detail="Chat not found")

    try:
        namespace =  chat.pinecone_namespace
        vector_store = init_vector_store(settings.pinecone_index_name, namespace)

        qa_chain = create_qa_chain(vector_store,namespace)
        response = run_query(qa_chain, question_request.question)

        user_msg = Message(chat_id=chat.id, content=response.get('query'), role='user')
        ai_msg = Message(chat_id=chat.id, content=response.get('result'), role='ai')
        db.add_all([
            user_msg,
            ai_msg,
        ])
        db.commit()

        return {**response,'timestamp':ai_msg.timestamp, 'id':ai_msg.id, 'role':ai_msg.role, 'chat_id':ai_msg.chat_id }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process the question: {str(e)}")
    
    
@router.get("/all_chats")
async def get_all_chats(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=100)
):
    offset = (page - 1) * page_size
    chats = db.query(Chat).filter(Chat.user_id == user.id).limit(page_size).offset(offset).all()
    if not chats:
        raise HTTPException(status_code=404, detail="No chats found for this user")
    return {"page": page, "page_size": page_size, "chats": chats}


@router.get("/{chat_id}/messages")
async def get_messages_for_chat(
    chat_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    chat = db.query(Chat).filter(Chat.id == chat_id).first()
    if not chat or chat.user_id != user.id:
        raise HTTPException(status_code=400, detail="Chat not found or you do not have access to this chat")
    

    messages = (
        db.query(Message)
        .filter(Message.chat_id == chat.id)
        .order_by(Message.timestamp.desc())
    ).all()


    return {
        "messages": messages
    }


@router.delete("/{chat_id}")
async def delete_chat(
    chat_id: str,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        chat = db.query(Chat).filter((Chat.id == chat_id) & (Chat.user_id == user.id)).first()
        
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        delete_namespace(settings.pinecone_index_name, chat.pinecone_namespace)

        db.delete(chat)
        db.commit()

        return {"detail": "Chat deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to delete chat: {str(e)}")

@router.put("/{chat_id}")
async def update_chat_title(
    chat_id: str,
    chat_title: UpdateChatTitle,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        chat = db.query(Chat).filter((Chat.id == chat_id) & (Chat.user_id == user.id)).first()
        
        if not chat:
            raise HTTPException(status_code=404, detail="Chat not found")
        
        chat.title = chat_title.chat_title
        db.commit()
        return chat
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to update chat title: {str(e)}")
