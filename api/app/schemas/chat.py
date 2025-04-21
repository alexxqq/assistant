from pydantic import BaseModel

class QuestionRequest(BaseModel):
    question: str

class UpdateChatTitle(BaseModel):
    chat_title: str
