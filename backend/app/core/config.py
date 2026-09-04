import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "AI Job & Skill Gap Analyzer"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str = os.getenv("SECRET_KEY", "super-secret-key-change-in-production-1234567890")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    
    # Weights for scoring
    WEIGHTS: dict = {
        "technical_skills": 0.40,
        "experience": 0.20,
        "projects": 0.15,
        "education": 0.10,
        "certifications": 0.05,
        "soft_skills": 0.05,
        "domain_knowledge": 0.05
    }
    
    # Cosine similarity threshold for strong vs partial vs missing skill match
    SIMILARITY_STRONG_THRESHOLD: float = 0.75
    SIMILARITY_PARTIAL_THRESHOLD: float = 0.45

settings = Settings()
