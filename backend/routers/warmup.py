from fastapi import APIRouter
from models.schemas import WarmupResponse
from services import databricks

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.get("/warmup", response_model=WarmupResponse)
async def warmup():
    result = await databricks.ping_endpoint()
    return WarmupResponse(**result)
