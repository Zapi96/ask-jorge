from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from models.schemas import WarmupResponse
from services import databricks

router = APIRouter()
_limiter = Limiter(key_func=get_remote_address)


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.get("/warmup", response_model=WarmupResponse)
@_limiter.limit("10/minute")
async def warmup(request: Request):
    result = await databricks.ping_endpoint()
    return WarmupResponse(**result)
