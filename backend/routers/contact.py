import logging
from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from models.schemas import ContactRequest, ContactResponse

logger = logging.getLogger(__name__)
_limiter = Limiter(key_func=get_remote_address)
router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
@_limiter.limit("3/hour")
async def contact(request: Request, body: ContactRequest) -> ContactResponse:
    """Receive a contact form submission.

    TODO: integrate email delivery (SendGrid / SMTP) here.
    """
    logger.info(
        "Contact form received | name=%s email=%s subject=%s",
        body.name,
        body.email,
        body.subject,
    )
    return ContactResponse(status="sent")
