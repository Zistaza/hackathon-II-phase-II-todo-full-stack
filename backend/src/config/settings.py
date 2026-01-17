from pydantic_settings import BaseSettings
import os
from typing import Optional


class Settings(BaseSettings):
    # Authentication
    BETTER_AUTH_SECRET: str = os.getenv("BETTER_AUTH_SECRET", "")

    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql://localhost/todo_app_dev")

    # JWT Configuration
    JWT_ALGORITHM: str = "HS256"
    JWT_EXPIRATION_DELTA: int = 86400  # 24 hours in seconds

    # Application
    APP_NAME: str = "Todo API"
    DEBUG: bool = False

    class Config:
        env_file = ".env"


settings = Settings()