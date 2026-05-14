import httpx
import json
from typing import AsyncGenerator
from app.config import get_settings

settings = get_settings()


async def chat_completion(
    messages: list[dict],
    temperature: float = 0.7,
    max_tokens: int = 1024,
    stream: bool = False,
) -> dict:
    async with httpx.AsyncClient(timeout=60.0) as client:
        payload = {
            "model": settings.cerebras_model,
            "max_completion_tokens": max_tokens,
            "temperature": temperature,
            "top_p": 1,
            "stream": stream,
            "messages": messages,
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.cerebras_api_key}",
        }
        response = await client.post(
            "https://api.cerebras.ai/v1/chat/completions",
            json=payload,
            headers=headers,
        )
        response.raise_for_status()
        return response.json()


async def chat_completion_stream(
    messages: list[dict],
    temperature: float = 0.7,
    max_tokens: int = 1024,
) -> AsyncGenerator[str, None]:
    async with httpx.AsyncClient(timeout=120.0) as client:
        payload = {
            "model": settings.cerebras_model,
            "max_completion_tokens": max_tokens,
            "temperature": temperature,
            "top_p": 1,
            "stream": True,
            "messages": messages,
        }
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {settings.cerebras_api_key}",
        }
        async with client.stream(
            "POST",
            "https://api.cerebras.ai/v1/chat/completions",
            json=payload,
            headers=headers,
        ) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    data = line[6:]
                    if data.strip() == "[DONE]":
                        break
                    try:
                        chunk = json.loads(data)
                        delta = chunk.get("choices", [{}])[0].get("delta", {})
                        content = delta.get("content", "")
                        if content:
                            yield content
                    except json.JSONDecodeError:
                        continue
