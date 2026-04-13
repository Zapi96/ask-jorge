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
    return os.environ.get("DATABRICKS_VOLUME_PATH", "/Volumes/workspace/default/jorge_cv_docs")


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
        return resp.json()["predictions"][0]["content"]


async def ping_endpoint() -> dict:
    """Lightweight ping to warm up the serving endpoint."""
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
