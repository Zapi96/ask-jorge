import pytest
from unittest.mock import AsyncMock, MagicMock, patch


@pytest.mark.asyncio
async def test_ping_endpoint_returns_warm_on_200():
    mock_response = MagicMock()
    mock_response.status_code = 200
    mock_response.raise_for_status = MagicMock()

    mock_client = AsyncMock()
    mock_client.post = AsyncMock(return_value=mock_response)

    with patch("services.databricks.httpx.AsyncClient") as MockClient:
        MockClient.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        MockClient.return_value.__aexit__ = AsyncMock(return_value=False)

        from services.databricks import ping_endpoint
        result = await ping_endpoint()

    assert result["status"] == "warm"
    assert result["latency_ms"] is not None


@pytest.mark.asyncio
async def test_ping_endpoint_returns_error_on_exception():
    mock_client = AsyncMock()
    mock_client.post = AsyncMock(side_effect=Exception("connection refused"))

    with patch("services.databricks.httpx.AsyncClient") as MockClient:
        MockClient.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        MockClient.return_value.__aexit__ = AsyncMock(return_value=False)

        from services.databricks import ping_endpoint
        result = await ping_endpoint()

    assert result["status"] == "error"
    assert result["latency_ms"] is None


@pytest.mark.asyncio
async def test_query_endpoint_returns_content():
    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value={"predictions": [{"content": "Jorge has 5 years exp."}]})
    mock_response.raise_for_status = MagicMock()

    mock_client = AsyncMock()
    mock_client.post = AsyncMock(return_value=mock_response)

    with patch("services.databricks.httpx.AsyncClient") as MockClient:
        MockClient.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        MockClient.return_value.__aexit__ = AsyncMock(return_value=False)

        from services.databricks import query_endpoint
        result = await query_endpoint("What is Jorge's experience?")

    assert result == "Jorge has 5 years exp."


@pytest.mark.asyncio
async def test_get_job_run_status_success():
    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value={
        "state": {"life_cycle_state": "TERMINATED", "result_state": "SUCCESS"}
    })
    mock_response.raise_for_status = MagicMock()

    mock_client = AsyncMock()
    mock_client.get = AsyncMock(return_value=mock_response)

    with patch("services.databricks.httpx.AsyncClient") as MockClient:
        MockClient.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        MockClient.return_value.__aexit__ = AsyncMock(return_value=False)

        from services.databricks import get_job_run_status
        status = await get_job_run_status(12345)

    assert status == "success"


@pytest.mark.asyncio
async def test_get_job_run_status_running():
    mock_response = MagicMock()
    mock_response.json = MagicMock(return_value={
        "state": {"life_cycle_state": "RUNNING", "result_state": ""}
    })
    mock_response.raise_for_status = MagicMock()

    mock_client = AsyncMock()
    mock_client.get = AsyncMock(return_value=mock_response)

    with patch("services.databricks.httpx.AsyncClient") as MockClient:
        MockClient.return_value.__aenter__ = AsyncMock(return_value=mock_client)
        MockClient.return_value.__aexit__ = AsyncMock(return_value=False)

        from services.databricks import get_job_run_status
        status = await get_job_run_status(12345)

    assert status == "running"
