import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.orm import relationship

from datetime import datetime

from database import Base, engine


class User(Base):
    __tablename__ = "users"
    
    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    name = Column(String)
    picture = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    chats = relationship("Chat", back_populates="user")

Base.metadata.create_all(bind=engine)
