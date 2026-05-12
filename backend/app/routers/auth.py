from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.user import User
from app.schemas.auth import LoginRequest, TokenResponse
from app.services.auth import create_access_token, verify_password

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=TokenResponse)
async def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter_by(email=data.email).first()
    if not user or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=token)


@router.post("/setup", response_model=TokenResponse)
async def setup_admin(data: LoginRequest, db: Session = Depends(get_db)):
    from app.services.auth import get_password_hash

    existing = db.query(User).filter_by(email=data.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")

    user = User(
        email=data.email,
        password_hash=get_password_hash(data.password),
        role="admin",
    )
    db.add(user)
    db.commit()

    token = create_access_token({"sub": user.email})
    return TokenResponse(access_token=token)
