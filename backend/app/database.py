"""数据库引擎与会话。"""
from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker, Session

from .config import settings

# pool_pre_ping:连接前先 ping 一下,避免远程库长连接被掐断后报错
engine = create_engine(settings.database_url, pool_pre_ping=True, future=True)

SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


class Base(DeclarativeBase):
    """所有 ORM 模型的基类。"""
    pass


def get_db():
    """FastAPI 依赖:每个请求一个会话,用完即关。"""
    db: Session = SessionLocal()
    try:
        yield db
    finally:
        db.close()
