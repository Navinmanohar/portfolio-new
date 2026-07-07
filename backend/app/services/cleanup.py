import asyncio
import logging
from datetime import datetime, timedelta, timezone
from sqlalchemy import delete
from app.database import SessionLocal
from app.models.chat import ChatSession, ChatMessage

logger = logging.getLogger(__name__)

RETENTION_DAYS = 7


async def cleanup_old_sessions():
    while True:
        try:
            db = SessionLocal()
            cutoff = datetime.now(timezone.utc) - timedelta(days=RETENTION_DAYS)

            old_sessions = (
                db.query(ChatSession)
                .filter(ChatSession.created_at < cutoff)
                .all()
            )

            if old_sessions:
                session_ids = [s.session_id for s in old_sessions]
                db.query(ChatMessage).filter(
                    ChatMessage.session_id.in_(session_ids)
                ).delete(synchronize_session=False)
                db.query(ChatSession).filter(
                    ChatSession.session_id.in_(session_ids)
                ).delete(synchronize_session=False)
                db.commit()
                logger.info("Cleaned up %d old chat sessions", len(old_sessions))

            db.close()
        except Exception as e:
            logger.error("Cleanup error: %s", e)

        await asyncio.sleep(86400)
