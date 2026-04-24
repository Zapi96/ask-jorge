from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routers import chat, upload, warmup, contact
from services import mlflow_tracker
import logging
import os
import sys

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(levelname)s %(name)s — %(message)s",
)


def _validate_secrets() -> None:
    """Fail fast if required secrets are missing or too weak."""
    jwt_secret = os.environ.get("JWT_SECRET", "")
    if not jwt_secret:
        sys.exit("FATAL: JWT_SECRET environment variable is not set.")
    if len(jwt_secret) < 32:
        sys.exit("FATAL: JWT_SECRET must be at least 32 characters.")
    if not os.environ.get("ADMIN_PASSWORD_HASH", ""):
        sys.exit("FATAL: ADMIN_PASSWORD_HASH environment variable is not set.")


_validate_secrets()
mlflow_tracker.setup()

_limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Ask Jorge API", version="1.0.0")
app.state.limiter = _limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Exact origins from env var (production domain + localhost)
_origins = [
    o.strip()
    for o in os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
]

# Regex covers all Vercel preview deployments: ask-jorge-<hash>-<team>.vercel.app
_origin_regex = r"https://ask-jorge[a-z0-9-]*\.vercel\.app"

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
    allow_origin_regex=_origin_regex,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type"],
)


@app.middleware("http")
async def security_headers(request: Request, call_next) -> Response:
    response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "geolocation=(), microphone=(), camera=()"
    response.headers["Strict-Transport-Security"] = (
        "max-age=31536000; includeSubDomains"
    )
    return response


app.include_router(warmup.router)
app.include_router(chat.router)
app.include_router(upload.router)
app.include_router(contact.router)
