from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.models.chat import ChatSession, ChatMessage
from app.services.rag import build_rag_messages
from app.services.cerebras import chat_completion
import uuid

router = APIRouter(prefix="/api/chat", tags=["chat"])


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
