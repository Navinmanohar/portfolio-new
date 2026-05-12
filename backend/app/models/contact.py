from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, func
from app.database import Base


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False)
    message = Column(Text, nullable=False)
    company = Column(String(255), nullable=True)
    role = Column(String(255), nullable=True)
    read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ResumeRequest(Base):
    __tablename__ = "resume_requests"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), nullable=False)
    company = Column(String(255), nullable=True)
    sent = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
