from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import JWTError, jwt
import bcrypt
import os

_security = HTTPBearer()
_ALGORITHM = "HS256"
_EXPIRE_MINUTES = 60


def _jwt_secret() -> str:
    return os.environ.get("JWT_SECRET", "")


def _password_hash() -> str:
    return os.environ.get("ADMIN_PASSWORD_HASH", "")


def verify_password(plain_password: str) -> bool:
    """Check plain password against stored bcrypt hash."""
    stored_hash = _password_hash()
    if not stored_hash:
        return False
    try:
        return bcrypt.checkpw(
            plain_password.encode("utf-8"),
            stored_hash.encode("utf-8"),
        )
    except Exception:
        return False


def create_access_token() -> str:
    """Create a JWT token valid for 60 minutes."""
    expire = datetime.now(timezone.utc) + timedelta(minutes=_EXPIRE_MINUTES)
    return jwt.encode(
        {"exp": expire, "sub": "admin"},
        _jwt_secret(),
        algorithm=_ALGORITHM,
    )


async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(_security),
) -> None:
    """FastAPI dependency — raises 401 if token is invalid or expired."""
    try:
        payload = jwt.decode(
            credentials.credentials,
            _jwt_secret(),
            algorithms=[_ALGORITHM],
        )
        if payload.get("sub") != "admin":
            raise HTTPException(status_code=401, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid or expired token")
