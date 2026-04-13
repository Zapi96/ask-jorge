from pydantic import BaseModel, Field
from typing import Optional


class ChatRequest(BaseModel):
    question: str = Field(..., min_length=3, max_length=2000)


class ChatResponse(BaseModel):
    answer: str
    status: str = "ok"


class UploadedFile(BaseModel):
    name: str
    run_id: Optional[int] = None
    status: str


class UploadResponse(BaseModel):
    files: list[UploadedFile]


class WarmupResponse(BaseModel):
    status: str  # "warm" | "cold" | "error"
    latency_ms: Optional[int] = None


class LoginRequest(BaseModel):
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
