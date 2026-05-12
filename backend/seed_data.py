"""
Seed the RAG knowledge base with portfolio data.
Run: python seed_data.py
"""
import sys
import os
import json

sys.path.insert(0, os.path.dirname(__file__))

from app.database import SessionLocal, engine, Base
from app.models.document import DocumentEmbedding
from app.services.embeddings import generate_embedding, chunk_text

DOCUMENTS = [
    {
        "source": "resume",
        "content": """
Navin Manohar is an AI Engineer and Backend Developer with 2+ years of experience.
He builds production-grade AI systems, scalable APIs, RAG pipelines, and enterprise backends.
He is proficient in Python, FastAPI, Node.js, Express.js, PostgreSQL, and LLM-powered systems.
His tech stack includes RAG, LangChain, Agentic AI, ChromaDB, Cerebras API, LLaMA 3.3 70B,
scikit-learn, Docker, Redis, and Next.js.
He has built 150+ REST APIs and delivered 45% efficiency improvements through workflow automation.
""",
    },
    {
        "source": "experience",
        "content": """
Navin worked at AppVin Technologies as Software Developer (Backend Lead) from Jan 2025 to Present.
He designed 150+ REST APIs for the GoEMP enterprise HRMS platform.
He built a multi-level workflow engine reducing manual effort by 45%.
He developed an auto-scheduling (rota) system reducing manual planning by 70%.
He optimized PostgreSQL queries reducing API latency by 30%.
He implemented RBAC, JWT authentication, Redis caching, and zero-downtime data migration.

Before that, he worked at GeeksforGeeks as MTS (MERN Stack) from Jul 2023 to Oct 2024.
He built backend services for a large-scale Doubt Portal driving 70-80% engagement increase.
He created a mentorship platform improving team efficiency by 30-40%.
He improved CI/CD workflows reducing feature rollout time by 30%.
""",
    },
    {
        "source": "project_hireflow",
        "content": """
HireFlow AI is an intelligent hiring platform built by Navin Manohar.
It features a full-stack AI hiring platform with agentic chatbot powered by 24 custom AI tools.
It implements RAG-based resume analysis with automated scoring (skill, experience, overall 0-100).
It has a role-aware AI agent (HR vs Employee) with persistent chat sessions and tool routing.
Features include auto-shortlisting, skill gap analysis, AI interview question generation,
and candidate comparison.
Tech stack: FastAPI, Next.js 16, React 19, PostgreSQL, SQLAlchemy, Cerebras AI, LLaMA 3.3 70B.
""",
    },
    {
        "source": "project_smartdocs",
        "content": """
SmartDocs AI is a RAG-powered document Q&A system built by Navin Manohar.
Users can upload PDFs, ask questions, and get accurate AI answers using semantic search.
It uses ChromaDB for vector storage and sentence-transformers for embeddings.
It features persistent chat history with SQLite and multi-document support.
Tech stack: Python, FastAPI, RAG, ChromaDB, Ollama, Sentence Transformers.
""",
    },
    {
        "source": "project_sentiment",
        "content": """
Sentiment Analyzer is an NLP text classifier built by Navin Manohar.
It trained a Logistic Regression classifier on 25,000 IMDB reviews achieving 88% accuracy.
It has a FastAPI endpoint for real-time sentiment prediction with confidence scores.
Tech stack: Python, scikit-learn, NLP, TF-IDF, FastAPI, Pandas.
""",
    },
    {
        "source": "project_goemp",
        "content": """
GoEMP HRMS is an enterprise HRMS platform designed by Navin Manohar.
It handles attendance, leave, payroll, rota, contracts, help desk ticketing,
and workflow automation with multi-tenant architecture.
It has 150+ REST APIs, multi-level workflow engine, RBAC, Redis caching,
PostgreSQL optimization, and cron automation.
Currently building an AI agentic chatbot with RAG, LangChain, and tool calling
to automate HR operations and employee support.
Tech stack: Node.js, Express.js, PostgreSQL, Sequelize, Redis, Python, LangChain.
""",
    },
    {
        "source": "engineering_philosophy",
        "content": """
Navin Manohar's engineering philosophy centers on building production-grade systems
that bridge the gap between AI capabilities and enterprise reliability.
He focuses on scalable architecture, clean code, measurable impact, and end-to-end ownership.
He believes in combining strong backend fundamentals with cutting-edge AI to solve real problems.
His approach includes: modular architecture, service layer separation, API validation,
comprehensive logging, error handling, and performance optimization.
""",
    },
]


def seed():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    existing = db.query(DocumentEmbedding).count()
    if existing > 0:
        print(f"Database already has {existing} documents. Skipping seed.")
        db.close()
        return

    for doc in DOCUMENTS:
        chunks = chunk_text(doc["content"], chunk_size=300, overlap=30)
        for chunk in chunks:
            embedding = generate_embedding(chunk)
            de = DocumentEmbedding(
                content=chunk,
                embedding=json.dumps(embedding),
                source=doc["source"],
                metadata_=doc["source"],
            )
            db.add(de)

    db.commit()
    count = db.query(DocumentEmbedding).count()
    print(f"Seeded {count} document chunks into the knowledge base.")
    db.close()


if __name__ == "__main__":
    seed()
