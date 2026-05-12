from pydantic import BaseModel
from typing import Optional


class ContactCreate(BaseModel):
    name: str
    email: str
    message: str
    company: Optional[str] = None
    role: Optional[str] = None


class ResumeRequestCreate(BaseModel):
    email: str
    company: Optional[str] = None


class VisitorLogCreate(BaseModel):
    session_id: Optional[str] = None
    referrer: Optional[str] = None
    device: Optional[str] = None
    browser: Optional[str] = None


class ProjectViewCreate(BaseModel):
    project_name: str
    visitor_id: Optional[str] = None
