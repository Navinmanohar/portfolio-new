import httpx
from app.config import get_settings

settings = get_settings()

GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent"


def _convert_messages(messages: list[dict]) -> tuple[str, list[dict]]:
    system_instruction = ""
    contents = []

    for msg in messages:
        if msg["role"] == "system":
            system_instruction = msg["content"]
        else:
            role = "user" if msg["role"] == "user" else "model"
            contents.append({"role": role, "parts": [{"text": msg["content"]}]})

    return system_instruction, contents


async def chat_completion(
    messages: list[dict],
    temperature: float = 0.7,
    max_tokens: int = 1024,
) -> dict:
    system_instruction, contents = _convert_messages(messages)

    url = GEMINI_API_URL.format(model=settings.gemini_model)
    payload = {
        "contents": contents,
        "generationConfig": {
            "temperature": temperature,
            "maxOutputTokens": max_tokens,
        },
    }
    if system_instruction:
        payload["systemInstruction"] = {"parts": [{"text": system_instruction}]}

    headers = {
        "Content-Type": "application/json",
        "x-goog-api-key": settings.gemini_api_key,
    }

    async with httpx.AsyncClient(timeout=60.0) as client:
        response = await client.post(url, json=payload, headers=headers)
        response.raise_for_status()
        data = response.json()

    text = data["candidates"][0]["content"]["parts"][0]["text"]
    return {
        "choices": [
            {
                "message": {
                    "role": "assistant",
                    "content": text,
                }
            }
        ]
    }
