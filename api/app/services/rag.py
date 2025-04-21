from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_pinecone import PineconeVectorStore
from langchain.chains import RetrievalQA
from pinecone import Pinecone

import json

from config import settings
from utils.exceptions import PineconeUploadError

# 1. Split raw document into chunks
def split_document(raw_text: str, chunk_size: int = 1000, chunk_overlap: int = 200):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        add_start_index=True
    )
    return splitter.create_documents([raw_text])


# 2. Get OpenAI embeddings
def get_embeddings():
    return OpenAIEmbeddings(
        model="text-embedding-3-large",
        api_key=settings.openai_api_key
    )


# 3. Init Pinecone vector store
def init_vector_store(index_name: str,namespace: str):
    pc = Pinecone(api_key=settings.pinecone_api_key, environment=settings.pinecone_environment)
    index = pc.Index(index_name)
    embeddings = get_embeddings()
    return PineconeVectorStore(embedding=embeddings, index=index,namespace = namespace)


# 4. Store chunks in Pinecone
def store_chunks_in_pinecone(splits, vector_store, namespace: str = None):
    try:
        return vector_store.add_documents(documents=splits, namespace=namespace)
    except Exception as e:
        body = json.loads(e.body)
        error_message = body.get("message", "")

        if "message length too large" in error_message.lower():
            raise PineconeUploadError("File is too large to process. The maximum limit is ~4MB.")

        raise PineconeUploadError(error_message)
# 5. Create the RAG chain
def create_qa_chain(vector_store, namespace: str):
    llm = ChatOpenAI(
        model=settings.openai_model,
        temperature=0.5,
        api_key=settings.openai_api_key
    )
    retriever = vector_store.as_retriever(namespace=namespace)
    
    return RetrievalQA.from_chain_type(
        llm=llm,
        retriever=retriever,
        return_source_documents=True
    )


# 6. Run query against RAG chain
def run_query(qa_chain, query: str):
    return qa_chain.invoke({"query": query})


def delete_namespace(index_name: str, namespace: str):
    pc = Pinecone(api_key=settings.pinecone_api_key, environment=settings.pinecone_environment)
    index = pc.Index(index_name)
    
    try:
        index.delete(namespace=namespace, delete_all=True)
    except Exception as e:
        print(f"Error deleting namespace '{namespace}': {e}")