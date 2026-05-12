from sqlalchemy.orm import Session
from sqlalchemy import func
from app.models.visitor import VisitorLog
from app.models.contact import ResumeRequest, ContactMessage
from app.models.chat import ChatMessage, ChatSession
from app.models.analytics import ProjectView
from datetime import datetime, timedelta


def get_dashboard_stats(db: Session):
    total_visitors = db.query(VisitorLog).count()
    unique_sessions = db.query(VisitorLog.session_id).distinct().count()
    resume_requests = db.query(ResumeRequest).count()
    total_chats = db.query(ChatSession).count()
    total_messages = db.query(ChatMessage).count()
    contact_messages = db.query(ContactMessage).count()

    top_projects = (
        db.query(ProjectView.project_name, func.count().label("views"))
        .group_by(ProjectView.project_name)
        .order_by(func.count().desc())
        .limit(5)
        .all()
    )

    visitors_today = db.query(VisitorLog).filter(
        VisitorLog.visit_time >= datetime.utcnow() - timedelta(days=1)
    ).count()

    return {
        "total_visitors": total_visitors,
        "unique_sessions": unique_sessions,
        "resume_requests": resume_requests,
        "total_chats": total_chats,
        "total_messages": total_messages,
        "contact_messages": contact_messages,
        "visitors_today": visitors_today,
        "top_projects": [
            {"name": p[0], "views": p[1]} for p in top_projects
        ],
    }
