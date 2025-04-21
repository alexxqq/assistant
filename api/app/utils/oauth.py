import httpx
from google.oauth2 import id_token
from google.auth.transport import requests

from config import settings


async def exchange_code_for_token(code: str) -> str:
    async with httpx.AsyncClient() as client:
        token_res = await client.post(
            "https://oauth2.googleapis.com/token",
            data={
                "code": code,
                "client_id": settings.google_client_id,
                "client_secret": settings.google_client_secret,
                "redirect_uri": settings.google_redirect_uri,
                "grant_type": "authorization_code",
            },
        )
        token_res.raise_for_status()
        return token_res.json()["id_token"]


def verify_id_token(id_token_value: str):
    return id_token.verify_oauth2_token(id_token_value, requests.Request(), settings.google_client_id)
