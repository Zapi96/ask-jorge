from fastapi import APIRouter, HTTPException, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from models.schemas import ChatRequest, ChatResponse
from services import databricks
from middleware.guardrails import check_input, sanitize_output
from middleware.token_counter import count_tokens
import os

router = APIRouter()
_limiter = Limiter(key_func=get_remote_address)

_MAX_TOKENS = int(os.environ.get("MAX_TOKENS_INPUT", "200"))
_RATE_MIN = int(os.environ.get("RATE_LIMIT_PER_MINUTE", "5"))
_RATE_HOUR = int(os.environ.get("RATE_LIMIT_PER_HOUR", "20"))


@router.post("/chat", response_model=ChatResponse)
@_limiter.limit(f"{_RATE_MIN}/minute;{_RATE_HOUR}/hour")
async def chat(request: Request, body: ChatRequest):
    # Token limit check
    token_count = count_tokens(body.question)
    if token_count > _MAX_TOKENS:
        raise HTTPException(
            status_code=400,
            detail=f"Question is too long ({token_count} tokens). Please keep it under {_MAX_TOKENS} tokens.",
        )

    # Input guardrails
    error = check_input(body.question)
    if error:
        raise HTTPException(status_code=400, detail=error)

    # Call Databricks
    try:
        answer = await databricks.query_endpoint(body.question)
    except Exception:
        raise HTTPException(
            status_code=504,
            detail="The assistant is not available right now. Please try again.",
        )

    return ChatResponse(answer=sanitize_output(answer))
