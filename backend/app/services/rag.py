import json
import numpy as np
from sqlalchemy.orm import Session
from app.models.document import DocumentEmbedding
from app.services.embeddings import generate_embedding


RAG_SYSTEM_PROMPT = """You are an AI assistant for Navin Manohar's engineering portfolio.
Only answer questions about Navin Manohar — his experience, projects, skills, education, and engineering work.
If a question is off-topic (general AI definitions, coding help, unrelated topics), politely say:
"I'm designed to answer questions about Navin Manohar's portfolio. Please ask about his experience, projects, or skills."
Never answer general or unrelated questions.
Never start responses with "Based on the provided context" or "According to the context".
Answer conversationally using the context provided.

Context:
{context}
"""


def cosine_similarity(a: list[float], b: list[float]) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


def retrieve_context(query: str, db: Session, top_k: int = 4) -> str:
    query_embedding = generate_embedding(query)
    docs = db.query(DocumentEmbedding).all()
    scored = []
    for doc in docs:
        if doc.embedding:
            doc_emb = json.loads(doc.embedding)
            score = cosine_similarity(query_embedding, doc_emb)
            scored.append((score, doc.content))
    scored.sort(key=lambda x: x[0], reverse=True)
    top = scored[:top_k]
    return "\n\n".join([content for _, content in top])


def build_rag_messages(query: str, db: Session) -> list[dict]:
    context = retrieve_context(query, db)
    system = RAG_SYSTEM_PROMPT.format(context=context)
    return [
        {"role": "system", "content": system},
        {"role": "user", "content": query},
    ]
