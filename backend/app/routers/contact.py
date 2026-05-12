from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.contact import ContactCreate, ResumeRequestCreate
from app.models.contact import ContactMessage, ResumeRequest
from app.services.email_service import send_resume_email

router = APIRouter(prefix="/api/contact", tags=["contact"])


@router.post("/message")
async def submit_contact(data: ContactCreate, db: Session = Depends(get_db)):
    msg = ContactMessage(
        name=data.name,
        email=data.email,
        message=data.message,
        company=data.company,
        role=data.role,
    )
    db.add(msg)
    db.commit()
    return {"status": "ok", "message": "Message received"}


@router.post("/resume")
async def request_resume(data: ResumeRequestCreate, db: Session = Depends(get_db)):
    sent = await send_resume_email(data.email, data.company)
    req = ResumeRequest(email=data.email, company=data.company, sent=sent)
    db.add(req)
    db.commit()

    if sent:
        return {"status": "ok", "message": "Resume sent to your email"}
    return {"status": "error", "message": "Failed to send email. Please check the API key."}
