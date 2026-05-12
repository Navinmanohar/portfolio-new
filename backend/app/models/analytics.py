from sqlalchemy import Column, Integer, String, DateTime, func
from app.database import Base


class ProjectView(Base):
    __tablename__ = "project_views"

    id = Column(Integer, primary_key=True, index=True)
    project_name = Column(String(255), nullable=False)
    visitor_id = Column(String(255), nullable=True)
    viewed_at = Column(DateTime(timezone=True), server_default=func.now())
