from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import chat, contact, analytics, auth

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Navin Manohar — Portfolio API",
    description="AI-powered portfolio backend with RAG, analytics, and smart contact",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://navinmanohar.vercel.app",
        "https://portfolio-new-azure-tau.vercel.app"
        "https://portfolio-new-1-y2hn.onrender.com",
        "https://portfolio-new-jscv.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(chat.router)
app.include_router(contact.router)
app.include_router(analytics.router)


@app.get("/api/health")
async def health():
    return {"status": "ok", "service": "portfolio-api"}
