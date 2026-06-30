"""ORM 模型 —— 字段与前端 src/data/characters.ts 的类型一一对应。"""
from sqlalchemy import String, Text, Integer, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .database import Base


class Faction(Base):
    __tablename__ = "factions"

    id: Mapped[str] = mapped_column(String(32), primary_key=True)
    name: Mapped[str] = mapped_column(String(64), nullable=False)
    color: Mapped[str] = mapped_column(String(16), nullable=False)

    characters: Mapped[list["Character"]] = relationship(back_populates="faction_obj")


class Character(Base):
    __tablename__ = "characters"

    id: Mapped[str] = mapped_column(String(64), primary_key=True)
    name: Mapped[str] = mapped_column(String(64), nullable=False)
    codename: Mapped[str] = mapped_column(String(64), nullable=False)
    faction: Mapped[str] = mapped_column(ForeignKey("factions.id"), nullable=False)
    role: Mapped[str] = mapped_column(String(128), nullable=False)
    summary: Mapped[str] = mapped_column(String(256), nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)

    faction_obj: Mapped["Faction"] = relationship(back_populates="characters")


class Relation(Base):
    __tablename__ = "relations"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source: Mapped[str] = mapped_column(ForeignKey("characters.id"), nullable=False)
    target: Mapped[str] = mapped_column(ForeignKey("characters.id"), nullable=False)
    type: Mapped[str] = mapped_column(String(16), nullable=False)
    label: Mapped[str] = mapped_column(String(128), nullable=False)
