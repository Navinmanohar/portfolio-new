import numpy as np
import re
import hashlib
from functools import lru_cache

DIM = 384


def _hash_ngrams(text: str, n_start: int = 2, n_end: int = 5) -> list[int]:
    tokens = re.findall(r"\b\w+\b", text.lower())
    indices: list[int] = []
    for token in tokens:
        for n in range(n_start, min(n_end, len(token)) + 1):
            for i in range(len(token) - n + 1):
                ngram = token[i : i + n]
                h = int(hashlib.md5(ngram.encode()).hexdigest(), 16)
                indices.append(h % DIM)
    return indices


def generate_embedding(text: str) -> list[float]:
    indices = _hash_ngrams(text)
    if not indices:
        return [0.0] * DIM
    vec = np.zeros(DIM)
    for i in indices:
        vec[i] += 1
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
