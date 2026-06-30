"""FastAPI 入口:提供人物 / 阵营 / 关系 的 JSON API。"""
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import select
from sqlalchemy.orm import Session

from .config import settings
from .database import Base, engine, get_db
from . import models, schemas

# 启动时按模型建表(学习阶段够用;生产建议改用 Alembic 迁移)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="明日方舟人物关系 API",
    description="为前端关系图谱提供阵营 / 人物 / 关系数据。",
    version="0.1.0",
)

# 允许 Astro 前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health():
    return {"status": "ok"}


@app.get("/api/factions", response_model=list[schemas.FactionOut])
def list_factions(db: Session = Depends(get_db)):
    return db.scalars(select(models.Faction)).all()


@app.get("/api/characters", response_model=list[schemas.CharacterOut])
def list_characters(db: Session = Depends(get_db)):
    return db.scalars(select(models.Character)).all()


@app.get("/api/characters/{character_id}", response_model=schemas.CharacterOut)
def get_character(character_id: str, db: Session = Depends(get_db)):
    obj = db.get(models.Character, character_id)
    if obj is None:
        raise HTTPException(status_code=404, detail="character not found")
    return obj


@app.get("/api/relations", response_model=list[schemas.RelationOut])
def list_relations(db: Session = Depends(get_db)):
    return db.scalars(select(models.Relation)).all()


@app.get("/api/graph", response_model=schemas.GraphOut)
def get_graph(db: Session = Depends(get_db)):
    """一次性返回整张关系图所需的全部数据。"""
    return schemas.GraphOut(
        factions=db.scalars(select(models.Faction)).all(),
        characters=db.scalars(select(models.Character)).all(),
        relations=db.scalars(select(models.Relation)).all(),
    )
