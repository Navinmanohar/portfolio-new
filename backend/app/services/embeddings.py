import numpy as np
import re
from collections import Counter
from functools import lru_cache


def tokenize(text: str) -> list[str]:
    return re.findall(r"\b[a-z]{2,}\b", text.lower())


@lru_cache(maxsize=1)
def get_idf():
    from app.models.document import DocumentEmbedding
    from app.database import SessionLocal
    db = SessionLocal()
    docs = db.query(DocumentEmbedding.content).all()
    db.close()
    n_docs = len(docs)
    df: dict[str, int] = {}
    for (content,) in docs:
        for token in set(tokenize(content)):
            df[token] = df.get(token, 0) + 1
    return {token: np.log((1 + n_docs) / (1 + freq)) + 1 for token, freq in df.items()}


def generate_embedding(text: str) -> list[float]:
    idf = get_idf()
    tokens = tokenize(text)
    if not tokens:
        return [0.0] * len(idf) if idf else [0.0]
    tf = Counter(tokens)
    max_tf = max(tf.values())
    vec = np.array([tf.get(token, 0) / max_tf * idf.get(token, 0) for token in idf])
    norm = np.linalg.norm(vec)
    if norm > 0:
        vec = vec / norm
    return vec.tolist()


def chunk_text(text: str, chunk_size: int = 500, overlap: int = 50) -> list[str]:
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start = end - overlap
    return chunks
