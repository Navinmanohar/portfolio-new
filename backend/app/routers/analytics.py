from fastapi import APIRouter, Depends, Header, Request
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.visitor import VisitorLog
from app.models.analytics import ProjectView
from app.schemas.contact import VisitorLogCreate, ProjectViewCreate
from app.services.auth import get_current_user
from app.services.analytics import get_dashboard_stats

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.post("/visit")
async def track_visit(
    data: VisitorLogCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    forwarded = request.headers.get("x-forwarded-for", "")
    ip = forwarded.split(",")[0].strip() if forwarded else (request.client.host if request.client else None)
    log = VisitorLog(
        ip=ip,
        session_id=data.session_id,
        referrer=data.referrer,
        device=data.device,
        browser=data.browser,
        page=data.page,
    )
    db.add(log)
    db.commit()
    return {"status": "ok"}


@router.post("/project-view")
async def track_project_view(data: ProjectViewCreate, db: Session = Depends(get_db)):
    view = ProjectView(project_name=data.project_name, visitor_id=data.visitor_id)
    db.add(view)
    db.commit()
    return {"status": "ok"}


@router.get("/dashboard")
async def dashboard(db: Session = Depends(get_db), user=Depends(get_current_user)):
    return get_dashboard_stats(db)


@router.get("/visitors")
async def visitors(db: Session = Depends(get_db), user=Depends(get_current_user)):
    logs = (
        db.query(VisitorLog)
        .order_by(VisitorLog.visit_time.desc())
        .limit(100)
        .all()
    )
    return [
        {
            "ip": v.ip,
            "referrer": v.referrer,
            "device": v.device,
            "browser": v.browser,
            "session_id": v.session_id,
            "page": v.page,
            "visited_at": v.visit_time.isoformat() if v.visit_time else None,
        }
        for v in logs
    ]
