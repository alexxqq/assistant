import uuid
from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, Boolean
from sqlalchemy.orm import relationship

from datetime import datetime

from database import Base, engine
from models.user import User 


class Chat(Base):
    __tablename__ = "chats"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4())) 
    user_id = Column(String, ForeignKey("users.id"), nullable=False)
    title = Column(String, nullable=False)
    pinecone_namespace = Column(String, unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    is_active = Column(Boolean, default=True)

    user = relationship("User", back_populates="chats")
    
    messages = relationship("Message", back_populates="chat", cascade="all, delete-orphan", passive_deletes=True)

class Message(Base):
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True) 
    chat_id = Column(String, ForeignKey("chats.id", ondelete="CASCADE"), nullable=False)
    content = Column(Text, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow) 
    chat = relationship("Chat", back_populates="messages")
    role = Column(String, nullable=False)

Base.metadata.create_all(bind=engine)
