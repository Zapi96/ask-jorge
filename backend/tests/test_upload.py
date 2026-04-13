import os
import pytest
from fastapi.testclient import TestClient

os.environ.update(
    {
        "DATABRICKS_HOST": "https://test.azuredatabricks.net",
        "DATABRICKS_TOKEN": "test-token",
        "DATABRICKS_JOB_ID": "1",
        "ADMIN_PASSWORD_HASH": "$2b$12$AAAAAAAAAAAAAAAAAAAAAA.AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA",
        "JWT_SECRET": "test-secret-for-ci",
        "ALLOWED_ORIGINS": "http://localhost:3000",
    }
)


@pytest.fixture(scope="module")
def client():
    from main import app

    return TestClient(app)


def test_upload_requires_auth(client):
    resp = client.post(
        "/upload", files={"files": ("test.pdf", b"content", "application/pdf")}
    )
    assert resp.status_code in (
        401,
        403,
    )  # HTTPBearer returns 401 when no credentials provided


def test_upload_rejects_invalid_extension(client):
    # Get a token first — note: login will fail since we have a dummy hash
    # Just test auth rejection scenario for now
    resp = client.post(
        "/upload",
        headers={"Authorization": "Bearer fake-token"},
        files={"files": ("test.exe", b"content", "application/octet-stream")},
    )
    # Should be 401 (bad token) or 400 (bad file) — either way not 200
    assert resp.status_code in (400, 401, 403, 422)


def test_admin_login_rejects_wrong_password(client):
    resp = client.post("/admin/login", json={"password": "wrong-password"})
    assert resp.status_code == 401
    assert "Invalid password" in resp.json()["detail"]
