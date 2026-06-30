"""应用配置:从环境变量 / .env 读取。"""
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    # 数据库连接串,默认值方便本地直接跑
    database_url: str = "postgresql+psycopg2://arknights:arknights@localhost:5432/arknights"

    # 允许跨域的前端来源(逗号分隔的字符串)
    cors_origins: str = "http://localhost:4321"

    @property
    def cors_origin_list(self) -> list[str]:
        return [o.strip() for o in self.cors_origins.split(",") if o.strip()]


settings = Settings()
