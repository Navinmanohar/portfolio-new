import logging
from app.config import get_settings
from app.services import gemini, cerebras

logger = logging.getLogger(__name__)
settings = get_settings()


async def chat_completion(
    messages: list[dict],
    temperature: float = 0.7,
    max_tokens: int = 1024,
) -> dict:
    if settings.gemini_api_key:
        try:
            return await gemini.chat_completion(messages, temperature, max_tokens)
        except Exception as e:
            logger.warning("Gemini failed, falling back to Cerebras: %s", e)

    return await cerebras.chat_completion(messages, temperature, max_tokens)
