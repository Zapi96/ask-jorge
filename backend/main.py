from fastapi import FastAPI, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from routers import chat, upload, warmup
import os

_limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="Ask Jorge API", version="1.0.0")
app.state.limiter = _limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

_origins = [
    o.strip()
    for o in os.environ.get("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=_origins,
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
    return response


app.include_router(warmup.router)
app.include_router(chat.router)
app.include_router(upload.router)
