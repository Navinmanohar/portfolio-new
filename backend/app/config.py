from pathlib import Path
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = ""
    cerebras_api_key: str = ""
    jwt_secret: str = ""
    smtp_email: str = ""
    smtp_password: str = ""
    from_email: str = ""
    portfolio_url: str = "https://portfolio-new-jscv.onrender.com"
    embedding_model: str = "all-MiniLM-L6-v2"
    cerebras_model: str = "llama3.1-8b"
    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.5-pro"
    nvidia_api_key: str = ""
    nvidia_model: str = "nvidia/llama-3.3-nemotron-super-49b-v1.5"

    class Config:
        env_file = Path(__file__).resolve().parent.parent / ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache
def get_settings():
    return Settings()
