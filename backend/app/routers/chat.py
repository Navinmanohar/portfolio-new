import re
import uuid
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse, MessageOut
from app.models.chat import ChatSession, ChatMessage
from app.models.contact import ResumeRequest
from app.services.rag import build_rag_messages
from app.services.cerebras import chat_completion
from app.services.email_service import send_resume_email

router = APIRouter(prefix="/api/chat", tags=["chat"])


@router.get("/{session_id}")
async def get_history(session_id: str, db: Session = Depends(get_db)):
    messages = (
        db.query(ChatMessage)
        .filter_by(session_id=session_id)
        .order_by(ChatMessage.created_at)
        .limit(50)
        .all()
    )
    return [MessageOut(role=m.role, content=m.content, created_at=m.created_at) for m in messages]


@router.post("")
async def chat(request: ChatRequest, db: Session = Depends(get_db)):
    session_id = request.session_id or str(uuid.uuid4())

    session = db.query(ChatSession).filter_by(session_id=session_id).first()
    if not session:
        session = ChatSession(session_id=session_id)
        db.add(session)
        db.commit()

    db.add(ChatMessage(session_id=session_id, role="user", content=request.message))
    db.commit()

    # Detect email send requests
    email_match = re.search(r"[\w.+-]+@[\w-]+\.[\w.-]+", request.message)
    msg_lower = request.message.lower()
    is_send_request = any(kw in msg_lower for kw in ["send", "mail", "email", "share", "forward"])

    # Check if last assistant message was asking for email
    last_assistant = (
        db.query(ChatMessage)
        .filter_by(session_id=session_id, role="assistant")
        .order_by(ChatMessage.created_at.desc())
        .first()
    )
    asked_for_email = last_assistant and any(
        phrase in last_assistant.content.lower()
        for phrase in ["your email", "provide your email", "share your email", "what.*email"]
    )

    if email_match and (is_send_request or asked_for_email):
        to_email = email_match.group()
        sent = await send_resume_email(to_email, "Chat Request")
        req = ResumeRequest(email=to_email, company="Chat Request", sent=sent)
        db.add(req)
        db.commit()
        if sent:
            reply = f"I've sent Navin's details and resume to {to_email}. Check your inbox!"
        else:
            reply = "Sorry, I couldn't send the email right now. Please try using the 'Request Resume' button on the contact section."
        db.add(ChatMessage(session_id=session_id, role="assistant", content=reply))
        db.commit()
        return ChatResponse(reply=reply, session_id=session_id)

    if is_send_request and not email_match:
        reply = "Sure! Please share your email address and I'll send Navin's details and resume right away."
        db.add(ChatMessage(session_id=session_id, role="assistant", content=reply))
        db.commit()
        return ChatResponse(reply=reply, session_id=session_id)

    history = (
        db.query(ChatMessage)
        .filter_by(session_id=session_id)
        .order_by(ChatMessage.created_at)
        .limit(20)
        .all()
    )

    rag_messages = build_rag_messages(request.message, db)

    chat_history = [
        {"role": "system", "content": rag_messages[0]["content"]},
    ]
    for msg in history[-10:]:
        chat_history.append({"role": msg.role, "content": msg.content})

    try:
        response = await chat_completion(chat_history)
        reply = response["choices"][0]["message"]["content"]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    db.add(ChatMessage(session_id=session_id, role="assistant", content=reply))
    db.commit()

    return ChatResponse(reply=reply, session_id=session_id)
