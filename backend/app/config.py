from pathlib import Path
from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    database_url: str = ""
    cerebras_api_key: str = ""
    jwt_secret: str = ""
    resend_api_key: str = ""
    from_email: str = ""
    admin_email: str = ""
    embedding_model: str = "all-MiniLM-L6-v2"
    cerebras_model: str = "llama3.1-8b"

    class Config:
        env_file = Path(__file__).resolve().parent.parent / ".env"
        env_file_encoding = "utf-8"
        extra = "ignore"


@lru_cache
def get_settings():
    return Settings()
