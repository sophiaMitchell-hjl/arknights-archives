"""Pydantic 模型 —— API 的出参结构,字段与前端 TS 类型保持一致。"""
from typing import List
from pydantic import BaseModel, ConfigDict


class FactionOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    color: str


class CharacterOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: str
    name: str
    codename: str
    faction: str
    role: str
    summary: str
    description: str


class RelationOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    source: str
    target: str
    type: str
    label: str


class GraphOut(BaseModel):
    """一次性返回整张图所需的全部数据,供前端关系图直接消费。"""
    factions: List[FactionOut]
    characters: List[CharacterOut]
    relations: List[RelationOut]
