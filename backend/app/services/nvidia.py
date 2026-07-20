import httpx
from app.config import get_settings

settings = get_settings()

NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions"


async def chat_completion(
    messages: list[dict],
    temperature: float = 0.7,
    max_tokens: int = 1024,
) -> dict:
    payload = {
        "model": settings.nvidia_model,
        "max_tokens": max_tokens,
        "temperature": temperature,
        "top_p": 1,
        "messages": messages,
    }
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {settings.nvidia_api_key}",
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(NVIDIA_API_URL, json=payload, headers=headers)
        response.raise_for_status()
        return response.json()
