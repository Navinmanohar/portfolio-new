import numpy as np
from functools import lru_cache

_model = None


def get_model():
    global _model
    if _model is None:
        from fastembed import TextEmbedding
        _model = TextEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
    return _model


def generate_embedding(text: str) -> list[float]:
    model = get_model()
    embedding = list(model.embed(text))[0]
    return embedding.tolist() if hasattr(embedding, 'tolist') else list(embedding)


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
