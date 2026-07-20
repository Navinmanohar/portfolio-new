import logging
from app.config import get_settings
from app.services import nvidia, cerebras

logger = logging.getLogger(__name__)
settings = get_settings()


async def chat_completion(
    messages: list[dict],
    temperature: float = 0.7,
    max_tokens: int = 1024,
) -> dict:
    if settings.nvidia_api_key:
        try:
            return await nvidia.chat_completion(messages, temperature, max_tokens)
        except Exception as e:
            logger.warning("Nvidia failed, falling back to Cerebras: %s", e)

    return await cerebras.chat_completion(messages, temperature, max_tokens)
