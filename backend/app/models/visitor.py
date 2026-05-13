from sqlalchemy import Column, Integer, String, DateTime, Text, func
from app.database import Base


class VisitorLog(Base):
    __tablename__ = "visitor_logs"

    id = Column(Integer, primary_key=True, index=True)
    ip = Column(String(45), nullable=True)
    country = Column(String(100), nullable=True)
    city = Column(String(100), nullable=True)
    device = Column(String(255), nullable=True)
    browser = Column(String(255), nullable=True)
    referrer = Column(Text, nullable=True)
    session_id = Column(String(255), nullable=True)
    page = Column(String(500), nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    visit_time = Column(DateTime(timezone=True), server_default=func.now())
