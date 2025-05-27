from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

class Settings(BaseSettings):
    app_name: str = "AI QA App"
    debug: bool = True

    pinecone_api_key: str
    pinecone_environment : str = 'us-east-1'
    pinecone_index_name: str = 'assistant-ai'

    openai_api_key: str
    openai_model: str = 'gpt-4o-mini'

    database_url: str

    secret_key: str
    jwt_algorithm: str = "HS256"
    cookie_token : str = "access_token"

    google_client_id: str
    google_client_secret: str
    google_redirect_uri: str

    front_host : str
    class Config:
        env_file = ".env"

settings = Settings()
