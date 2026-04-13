from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    databricks_host: str
    databricks_token: str
    databricks_job_id: int
    databricks_endpoint_name: str = "jorge_cv_endpoint"
    databricks_volume_path: str = "/Volumes/workspace/default/jorge_cv_docs"

    admin_password_hash: str  # bcrypt hash
    jwt_secret: str
    allowed_origins: str = "http://localhost:3000"

    max_tokens_input: int = 200
    max_tokens_output: int = 500
    rate_limit_per_minute: int = 5
    rate_limit_per_hour: int = 20


settings = Settings()
