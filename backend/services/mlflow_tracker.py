"""
MLflow 3 question tracker.

Uses @mlflow.trace to log every recruiter question + answer as a trace
in a Databricks MLflow experiment. Traces appear in the Databricks UI at:
  <DATABRICKS_HOST>/ml/experiments  →  experiment: /Shared/jorge_cv_questions

Setup (env vars already present in Render):
  DATABRICKS_HOST   = https://<workspace>.cloud.databricks.com
  DATABRICKS_TOKEN  = dapi...
  MLFLOW_TRACKING_URI = databricks   (set automatically by setup())

Optional override:
  MLFLOW_EXPERIMENT_NAME = /Shared/jorge_cv_questions  (default)
"""

import logging
import os
import mlflow

_log = logging.getLogger("ask_jorge.tracker")
_EXPERIMENT_NAME = os.environ.get(
    "MLFLOW_EXPERIMENT_NAME", "/Shared/jorge_cv_questions"
)
_enabled = False


def setup() -> None:
    """Configure MLflow to trace to Databricks. Call once at startup."""
    global _enabled
    if not (os.environ.get("DATABRICKS_HOST") and os.environ.get("DATABRICKS_TOKEN")):
        _log.info("MLflow tracking disabled — DATABRICKS_HOST/TOKEN not set.")
        return
    try:
        mlflow.set_tracking_uri("databricks")
        mlflow.set_experiment(_EXPERIMENT_NAME)
        _enabled = True
        _log.info("MLflow tracing → experiment '%s'", _EXPERIMENT_NAME)
    except Exception as exc:
        _log.warning("MLflow setup failed (tracing disabled): %s", exc)


@mlflow.trace(name="recruiter_question", span_type="CHAT")
def _trace_question(question: str, answer: str, ip: str) -> str:
    """Traced function — MLflow captures inputs + output automatically."""
    mlflow.log_param("ip", ip)
    return answer


def log_question(question: str, answer: str, ip: str = "") -> None:
    """Log a question/answer trace to Databricks MLflow. Blocking — run from BackgroundTasks."""
    if not _enabled:
        return
    try:
        _trace_question(question=question, answer=answer, ip=ip)
    except Exception as exc:
        _log.warning("MLflow log_question failed: %s", exc)
