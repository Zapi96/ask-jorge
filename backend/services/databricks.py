import os
import time
import httpx


def _base_url() -> str:
    return os.environ.get("DATABRICKS_HOST", "").rstrip("/")


def _headers() -> dict:
    return {
        "Authorization": f"Bearer {os.environ.get('DATABRICKS_TOKEN', '')}",
        "Content-Type": "application/json",
    }


def _endpoint_name() -> str:
    return os.environ.get("DATABRICKS_ENDPOINT_NAME", "jorge_cv_endpoint")


def _volume_path() -> str:
    return os.environ.get(
        "DATABRICKS_VOLUME_PATH", "/Volumes/jorge/cv_rag/jorge_cv_docs"
    )


def _job_id() -> int:
    return int(os.environ.get("DATABRICKS_JOB_ID", "0"))


async def query_endpoint(question: str) -> str:
    """Call the Databricks serving endpoint and return the answer string."""
    payload = {"messages": [{"role": "user", "content": question}]}
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            f"{_base_url()}/serving-endpoints/{_endpoint_name()}/invocations",
            headers=_headers(),
            json=payload,
        )
        resp.raise_for_status()
        data = resp.json()
        # Databricks returns the chain output directly as a list: ["answer string"]
        if isinstance(data, list):
            return str(data[0])
        # Fallback: {"predictions": ["string"]} or {"predictions": [{"content": ...}]}
        prediction = data["predictions"][0]
        if isinstance(prediction, str):
            return prediction
        if isinstance(prediction, dict):
            return (
                prediction.get("content") or prediction.get("output") or str(prediction)
            )
        return str(prediction)


async def _get_endpoint_state() -> tuple[str, str, dict]:
    """Return (ready_state, config_update_state, config) for the serving endpoint.

    ready_state      : "READY" | "NOT_READY"
    config_update    : "NOT_UPDATING" | "IN_PROGRESS" | "UPDATE_FAILED"
    config           : the served_entities / traffic_config dict needed to restart
    """
    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.get(
            f"{_base_url()}/api/2.0/serving-endpoints/{_endpoint_name()}",
            headers=_headers(),
        )
        resp.raise_for_status()
        data = resp.json()
    state = data.get("state", {})
    config = data.get("config", {})
    return state.get("ready", "NOT_READY"), state.get("config_update", "NOT_UPDATING"), config


async def _start_endpoint(config: dict) -> None:
    """Trigger a restart by re-submitting the endpoint config."""
    # Extract only the fields the PUT endpoint accepts
    put_body: dict = {}
    for key in ("served_entities", "served_models", "traffic_config", "auto_capture_config"):
        if key in config:
            put_body[key] = config[key]
    async with httpx.AsyncClient(timeout=15.0) as client:
        resp = await client.put(
            f"{_base_url()}/api/2.0/serving-endpoints/{_endpoint_name()}/config",
            headers=_headers(),
            json=put_body,
        )
        resp.raise_for_status()


async def ping_endpoint() -> dict:
    """Check endpoint state, start it if stopped, then invoke it to confirm warmth."""
    # 1. Check current state
    try:
        ready, config_update, config = await _get_endpoint_state()
    except Exception:
        # Can't reach management API — fall through to invocation attempt
        ready, config_update, config = "UNKNOWN", "UNKNOWN", {}

    # 2. If stopped (NOT_READY and not already updating), trigger restart
    if ready == "NOT_READY" and config_update == "NOT_UPDATING" and config:
        try:
            await _start_endpoint(config)
        except Exception:
            pass  # best-effort; we'll report cold either way
        return {"status": "cold", "latency_ms": None}

    # 3. If already updating/starting, just report cold
    if ready == "NOT_READY":
        return {"status": "cold", "latency_ms": None}

    # 4. Endpoint is READY — invoke it to confirm and measure latency
    payload = {"messages": [{"role": "user", "content": "ping"}]}
    start = time.monotonic()
    async with httpx.AsyncClient(timeout=30.0) as client:
        try:
            resp = await client.post(
                f"{_base_url()}/serving-endpoints/{_endpoint_name()}/invocations",
                headers=_headers(),
                json=payload,
            )
            latency_ms = int((time.monotonic() - start) * 1000)
            if resp.status_code == 200:
                return {"status": "warm", "latency_ms": latency_ms}
            return {"status": "cold", "latency_ms": latency_ms}
        except httpx.TimeoutException:
            return {"status": "cold", "latency_ms": None}
        except Exception:
            return {"status": "error", "latency_ms": None}


async def upload_file_to_volume(file_content: bytes, filename: str) -> None:
    """Upload a file to the Databricks Volume via Files API."""
    url = f"{_base_url()}/api/2.0/fs/files{_volume_path()}/{filename}"
    headers = {"Authorization": f"Bearer {os.environ.get('DATABRICKS_TOKEN', '')}"}
    async with httpx.AsyncClient(timeout=60.0) as client:
        resp = await client.put(url, headers=headers, content=file_content)
        resp.raise_for_status()


async def trigger_ingestion_job(file_path: str, full_reindex: bool = True) -> int:
    """Trigger the ephemeral ingestion job and return the run_id."""
    payload = {
        "job_id": _job_id(),
        "notebook_params": {
            "file_path": file_path,
            "full_reindex": "true" if full_reindex else "false",
        },
    }
    async with httpx.AsyncClient(timeout=30.0) as client:
        resp = await client.post(
            f"{_base_url()}/api/2.1/jobs/run-now",
            headers=_headers(),
            json=payload,
        )
        resp.raise_for_status()
        return resp.json()["run_id"]


async def get_job_run_status(run_id: int) -> str:
    """Poll the run status. Returns: 'running' | 'success' | 'failed' | 'pending'."""
    async with httpx.AsyncClient(timeout=10.0) as client:
        resp = await client.get(
            f"{_base_url()}/api/2.1/jobs/runs/get",
            headers=_headers(),
            params={"run_id": run_id},
        )
        resp.raise_for_status()
        state = resp.json()["state"]
        life_cycle = state.get("life_cycle_state", "")
        result = state.get("result_state", "")
        if life_cycle == "TERMINATED":
            return "success" if result == "SUCCESS" else "failed"
        if life_cycle in ("PENDING", "RUNNING", "BLOCKED"):
            return "running"
        return "pending"
