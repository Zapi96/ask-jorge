"""
jorge_cv_search_index — Vector Search index creation and sync.

Creates the Databricks Vector Search endpoint and index if they do not exist,
or triggers a delta sync of the existing index from the Delta table.

Run this job after the ingestion_job to keep the search index up to date.

Resources:
    Delta table : jorge.cv_rag.jorge_cv_chunks  (source, CDF-enabled)
    VS endpoint : jorge_cv_search
    VS index    : jorge.cv_rag.jorge_cv_search_index
"""
from databricks.sdk import WorkspaceClient
from databricks.sdk.service.vectorsearch import (
    DeltaSyncVectorIndexSpecRequest,
    EmbeddingSourceColumn,
    EndpointType,
    PipelineType,
    VectorIndexType,
)

CATALOG = "jorge"
DB = "cv_rag"
TABLE_NAME = f"{CATALOG}.{DB}.jorge_cv_chunks"
VS_ENDPOINT_NAME = "jorge_cv_search"
VS_INDEX_NAME = f"{CATALOG}.{DB}.jorge_cv_search_index"
# Built-in Databricks embedding model — no external API calls needed
EMBEDDING_MODEL = "databricks-gte-large-en"


def ensure_endpoint(w: WorkspaceClient) -> None:
    """Create the Vector Search endpoint if it does not already exist."""
    try:
        w.vector_search_endpoints.get_endpoint(VS_ENDPOINT_NAME)
        print(f"VS endpoint '{VS_ENDPOINT_NAME}' already exists.")
    except Exception:
        print(f"Creating VS endpoint '{VS_ENDPOINT_NAME}'…")
        w.vector_search_endpoints.create_endpoint_and_wait(
            name=VS_ENDPOINT_NAME,
            endpoint_type=EndpointType.STANDARD,
        )
        print(f"VS endpoint '{VS_ENDPOINT_NAME}' is ready.")


def create_or_sync_index(w: WorkspaceClient) -> None:
    """Create the Delta Sync index or trigger a sync if it already exists."""
    try:
        w.vector_search_indexes.get_index(VS_INDEX_NAME)
        print(f"VS index '{VS_INDEX_NAME}' exists — triggering delta sync…")
        w.vector_search_indexes.sync_index(VS_INDEX_NAME)
        print("Sync triggered. The index will update in the background.")
    except Exception:
        print(f"VS index '{VS_INDEX_NAME}' not found — creating it…")
        w.vector_search_indexes.create_index(
            name=VS_INDEX_NAME,
            endpoint_name=VS_ENDPOINT_NAME,
            primary_key="id",
            index_type=VectorIndexType.DELTA_SYNC,
            delta_sync_index_spec=DeltaSyncVectorIndexSpecRequest(
                source_table=TABLE_NAME,
                pipeline_type=PipelineType.TRIGGERED,
                embedding_source_columns=[
                    EmbeddingSourceColumn(
                        name="chunk_text",
                        embedding_model_endpoint_name=EMBEDDING_MODEL,
                    )
                ],
            ),
        )
        print(
            f"VS index '{VS_INDEX_NAME}' created. "
            "Initial embedding sync is running in the background."
        )


def main() -> None:
    w = WorkspaceClient()
    ensure_endpoint(w)
    create_or_sync_index(w)
    print("vector_index job complete.")


if __name__ == "__main__":
    main()
