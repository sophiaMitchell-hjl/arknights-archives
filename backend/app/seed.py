"""初始化数据:把前端 characters.ts 里的同一份数据写入数据库。

用法(在 backend/ 目录,激活虚拟环境后):
    python -m app.seed
重复执行安全:会先清空三张表再重新写入。
"""
from .database import Base, engine, SessionLocal
from . import models

FACTIONS = [
    {"id": "rhodes", "name": "罗德岛", "color": "#4ea1ff"},
    {"id": "reunion", "name": "整合运动", "color": "#e0533d"},
    {"id": "penguin", "name": "企鹅物流", "color": "#f2c14e"},
    {"id": "rhine", "name": "莱茵生命", "color": "#7c6cff"},
]

CHARACTERS = [
    {"id": "amiya", "name": "阿米娅", "codename": "Amiya", "faction": "rhodes",
     "role": "罗德岛领袖 / 术师", "summary": "罗德岛的公开领导者,坚定而温柔的卡特斯感染者少女。",
     "description": "阿米娅是罗德岛的公开领导者,虽然年纪轻轻,却背负着整个组织的命运。"
                    "她是卡特斯种族的感染者,继承了特蕾西娅的力量与遗志,带领罗德岛在矿石病与社会对立的夹缝中寻找出路。"},
    {"id": "doctor", "name": "博士", "codename": "Doctor", "faction": "rhodes",
     "role": "罗德岛战术指挥", "summary": "失忆的罗德岛核心指挥,过往笼罩在迷雾中。",
     "description": "博士是罗德岛的战术指挥官,在剧情开始时因故失去记忆。"
                    "尽管过往成谜,博士与阿米娅、凯尔希之间有着深厚的信任,是罗德岛行动的关键大脑。"},
    {"id": "kaltsit", "name": "凯尔希", "codename": "Kal'tsit", "faction": "rhodes",
     "role": "罗德岛医疗主管", "summary": "罗德岛的实际掌舵者之一,神秘而博学的医师。",
     "description": "凯尔希是罗德岛医疗部门的最高负责人,也是组织真正的元老之一。"
                    "她见证了无数历史,是阿米娅的导师,也与博士有着久远的渊源。"},
    {"id": "theresa", "name": "特蕾西娅", "codename": "Theresa", "faction": "rhodes",
     "role": "卡兹戴尔领袖(故人)", "summary": "卡兹戴尔的魔王,理想主义的象征,已逝。",
     "description": "特蕾西娅曾是卡兹戴尔的魔王,以和平共处为理想。"
                    "她的逝去深刻影响了阿米娅、凯尔希与塔露拉等人,她的力量与遗志由阿米娅继承。"},
    {"id": "talulah", "name": "塔露拉", "codename": "Talulah", "faction": "reunion",
     "role": "整合运动领袖", "summary": "整合运动的领导者,以激进手段反抗社会的感染者。",
     "description": "塔露拉是整合运动的领袖,主张以激烈的方式为感染者争取生存空间。"
                    "她与特蕾西娅有着深厚渊源,立场与罗德岛对立,却并非简单的反派。"},
    {"id": "w", "name": "W", "codename": "W", "faction": "reunion",
     "role": "雇佣兵 / 爆破专家", "summary": "行事乖张的爆破专家,与整合运动和过往纠缠不清。",
     "description": "W 是萨卡兹雇佣兵,爆破技艺高超、性格张扬。她曾活跃于整合运动,与德克萨斯等人有着旧日的渊源。"},
    {"id": "frostnova", "name": "霜星", "codename": "FrostNova", "faction": "reunion",
     "role": "整合运动干部", "summary": "整合运动中坚定而悲情的指挥官。",
     "description": "霜星是整合运动的高级干部,为族人战斗到最后一刻,是悲剧性的坚定者。"},
    {"id": "texas", "name": "德克萨斯", "codename": "Texas", "faction": "penguin",
     "role": "企鹅物流职员", "summary": "沉默可靠的企鹅物流核心成员,背负着西西里的过往。",
     "description": "德克萨斯是企鹅物流的员工,沉默寡言但极为可靠。"
                    "她来自西西里,与能天使是亲密的同事,也与 W 有着旧日纠葛。"},
    {"id": "exusiai", "name": "能天使", "codename": "Exusiai", "faction": "penguin",
     "role": "企鹅物流职员 / 枪手", "summary": "开朗的拉特兰枪手,德克萨斯最好的搭档。",
     "description": "能天使是来自拉特兰的萨科塔,性格开朗、枪法卓绝。她是企鹅物流的王牌,与德克萨斯是形影不离的搭档。"},
    {"id": "saria", "name": "塞雷娅", "codename": "Saria", "faction": "rhine",
     "role": "莱茵生命前安全主管", "summary": "莱茵生命的前安保负责人,沉稳的守护者。",
     "description": "塞雷娅曾是莱茵生命的安全主管,如今加入罗德岛。她与伊芙利特有着监护般的羁绊,守护着这位力量强大的少女。"},
    {"id": "ifrit", "name": "伊芙利特", "codename": "Ifrit", "faction": "rhine",
     "role": "莱茵生命实验体", "summary": "力量惊人却心智稚嫩的萨卡兹少女。",
     "description": "伊芙利特是莱茵生命的实验对象,拥有强大的火焰之力,但心智仍如孩童。塞雷娅是她最信赖的守护者。"},
]

RELATIONS = [
    ("amiya", "doctor", "战友", "彼此信赖的搭档"),
    ("amiya", "kaltsit", "上下级", "凯尔希是阿米娅的导师"),
    ("kaltsit", "doctor", "渊源", "久远的过往羁绊"),
    ("amiya", "theresa", "血缘", "继承了特蕾西娅的力量与遗志"),
    ("kaltsit", "theresa", "战友", "昔日并肩的同伴"),
    ("talulah", "theresa", "渊源", "深受特蕾西娅影响"),
    ("talulah", "amiya", "对立", "理念与立场的对立"),
    ("talulah", "w", "同阵营", "整合运动的同僚"),
    ("talulah", "frostnova", "上下级", "整合运动的下属干部"),
    ("w", "texas", "渊源", "旧日的纠葛"),
    ("texas", "exusiai", "战友", "企鹅物流的黄金搭档"),
    ("saria", "ifrit", "上下级", "守护与被守护"),
    ("saria", "amiya", "同阵营", "同属罗德岛"),
]


def run() -> None:
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        # 清空(注意顺序:先删有外键引用的 relations)
        db.query(models.Relation).delete()
        db.query(models.Character).delete()
        db.query(models.Faction).delete()
        db.commit()

        db.add_all(models.Faction(**f) for f in FACTIONS)
        db.add_all(models.Character(**c) for c in CHARACTERS)
        db.commit()  # 先提交人物,满足关系表的外键

        db.add_all(
            models.Relation(source=s, target=t, type=ty, label=lb)
            for (s, t, ty, lb) in RELATIONS
        )
        db.commit()
        print(f"已写入 {len(FACTIONS)} 阵营 / {len(CHARACTERS)} 人物 / {len(RELATIONS)} 关系。")
    finally:
        db.close()


if __name__ == "__main__":
    run()
