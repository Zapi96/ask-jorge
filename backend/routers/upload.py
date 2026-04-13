from fastapi import APIRouter, UploadFile, File, HTTPException, Depends, Query, Request
from typing import List
from models.schemas import UploadResponse, UploadedFile, LoginRequest, TokenResponse
from services import databricks
from core.auth import get_current_admin, verify_password, create_access_token
from slowapi import Limiter
from slowapi.util import get_remote_address
import os
import re

router = APIRouter()
_limiter = Limiter(key_func=get_remote_address)

_ALLOWED_EXTENSIONS = {".pdf", ".docx"}
_MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB
_VOLUME_PATH = os.environ.get(
    "DATABRICKS_VOLUME_PATH", "/Volumes/jorge/cv_rag/jorge_cv_docs"
)


def _sanitize_filename(name: str) -> str:
    """Strip path components and replace unsafe characters to prevent path traversal."""
    name = os.path.basename(name or "upload")
    name = re.sub(r"[^\w.\-]", "_", name)
    return name or "upload"


@router.post("/admin/login", response_model=TokenResponse)
@_limiter.limit("5/minute")
async def admin_login(request: Request, body: LoginRequest):
    if not verify_password(body.password):
        raise HTTPException(status_code=401, detail="Invalid password")
    return TokenResponse(access_token=create_access_token())


@router.post("/upload", response_model=UploadResponse)
@_limiter.limit("10/minute")
async def upload_files(
    request: Request,
    files: List[UploadFile] = File(...),
    _: None = Depends(get_current_admin),
):
    if not files:
        raise HTTPException(status_code=400, detail="No files provided.")

    results: list[UploadedFile] = []
    for i, file in enumerate(files):
        safe_name = _sanitize_filename(file.filename or "")
        ext = ("." + safe_name.rsplit(".", 1)[-1].lower()) if "." in safe_name else ""
        if ext not in _ALLOWED_EXTENSIONS:
            raise HTTPException(
                status_code=400,
                detail=f"{safe_name}: unsupported format. Use PDF or DOCX.",
            )

        content = await file.read()
        if len(content) > _MAX_FILE_SIZE:
            raise HTTPException(
                status_code=400,
                detail=f"{safe_name}: exceeds 10MB limit.",
            )

        await databricks.upload_file_to_volume(content, safe_name)
        file_path = f"{_VOLUME_PATH}/{safe_name}"
        run_id = await databricks.trigger_ingestion_job(
            file_path, full_reindex=(i == 0)
        )
        results.append(UploadedFile(name=safe_name, run_id=run_id, status="queued"))

    return UploadResponse(files=results)


@router.get("/upload/status")
async def upload_status(
    run_ids: str = Query(...),
    _: None = Depends(get_current_admin),
):
    ids = [int(x.strip()) for x in run_ids.split(",") if x.strip().isdigit()]
    statuses = []
    for run_id in ids:
        status = await databricks.get_job_run_status(run_id)
        statuses.append({"run_id": run_id, "status": status})
    return {"statuses": statuses}
