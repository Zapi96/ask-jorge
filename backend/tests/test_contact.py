from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_contact_valid():
    resp = client.post(
        "/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Hello",
            "message": "This is a test message with enough length.",
        },
    )
    assert resp.status_code == 200
    assert resp.json()["status"] == "sent"


def test_contact_invalid_email():
    resp = client.post(
        "/contact",
        json={
            "name": "Test User",
            "email": "not-an-email",
            "subject": "Hello",
            "message": "This is a test message with enough length.",
        },
    )
    assert resp.status_code == 422


def test_contact_message_too_short():
    resp = client.post(
        "/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Hello",
            "message": "short",
        },
    )
    assert resp.status_code == 422
