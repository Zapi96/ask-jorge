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


class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(
        ..., min_length=5, max_length=200, pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$"
    )
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    status: str  # "sent"
