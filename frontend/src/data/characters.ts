// 明日方舟人物关系数据
// ─────────────────────────────────────────────
// 这一份是「前端先行」阶段的本地数据源。
// 之后接 Python 后端 + 数据库时,只要让接口返回同样结构的 JSON,
// 页面与关系图代码几乎不用改(这就是把类型/结构先定好的价值)。

export interface Character {
  /** URL 友好的唯一 id,用作 /characters/{id} 的路径 */
  id: string;
  /** 中文名 */
  name: string;
  /** 英文/代号 */
  codename: string;
  /** 所属阵营 id,对应 factions */
  faction: string;
  /** 职业 / 定位 */
  role: string;
  /** 种族(来源:PRTS 设定核对) */
  race: string;
  /** 一句话简介(用于卡片、meta description) */
  summary: string;
  /** 详细介绍(用于人物页正文,利于 SEO 抓取真实内容) */
  description: string;
  /** 背景经历(8 点结构的「背景原理」,基于 PRTS 事实原创撰写) */
  background: string;
}

export interface Faction {
  id: string;
  name: string;
  /** 阵营主题色,用于关系图节点配色 */
  color: string;
}

export type RelationType = '同阵营' | '上下级' | '战友' | '对立' | '血缘' | '渊源';

export interface Relation {
  source: string; // character id
  target: string; // character id
  type: RelationType;
  /** 关系说明 */
  label: string;
}

export const factions: Faction[] = [
  { id: 'rhodes', name: '罗德岛', color: '#4ea1ff' },
  { id: 'reunion', name: '整合运动', color: '#e0533d' },
  { id: 'penguin', name: '企鹅物流', color: '#f2c14e' },
  { id: 'rhine', name: '莱茵生命', color: '#7c6cff' },
  { id: 'lungmen', name: '龙门', color: '#2fa37e' },
  { id: 'laterano', name: '拉特兰', color: '#e0b53d' },
  { id: 'kazdel', name: '卡兹戴尔', color: '#a14d6e' },
];

export const characters: Character[] = [
  {
    id: 'amiya',
    name: '阿米娅',
    codename: 'Amiya',
    faction: 'rhodes',
    role: '罗德岛领袖 / 术师',
    race: '卡特斯',
    summary: '罗德岛的公开领导者,坚定而温柔的卡特斯感染者少女。',
    description:
      '阿米娅是罗德岛的公开领导者,虽然年纪轻轻,却背负着整个组织的命运。' +
      '她是卡特斯种族的感染者,继承了特蕾西娅的力量与遗志,带领罗德岛在矿石病与社会对立的夹缝中寻找出路。',
    background:
      '阿米娅来自卡兹戴尔,是继承了魔王之力的感染者。外表虽是少女,实则背负着数百年的历史与责任;' +
      '她继承特蕾西娅的遗志,以最高执行权带领罗德岛,为感染者寻找未来的道路。',
  },
  {
    id: 'doctor',
    name: '博士',
    codename: 'Doctor',
    faction: 'rhodes',
    role: '罗德岛战术指挥',
    race: '未知',
    summary: '失忆的罗德岛核心指挥,过往笼罩在迷雾中。',
    description:
      '博士是罗德岛的战术指挥官,在剧情开始时因故失去记忆。' +
      '尽管过往成谜,博士与阿米娅、凯尔希之间有着深厚的信任,是罗德岛行动的关键大脑。',
    background:
      '博士是罗德岛的最高指挥,剧情开始时已严重失忆,连重要的过往都无法回忆。' +
      '尽管记忆缺失,博士仍以卓越的战术指挥带领罗德岛,与阿米娅、凯尔希维系着深厚的信任。',
  },
  {
    id: 'kaltsit',
    name: '凯尔希',
    codename: "Kal'tsit",
    faction: 'rhodes',
    role: '罗德岛医疗主管',
    race: '菲林',
    summary: '罗德岛的实际掌舵者之一,神秘而博学的医师。',
    description:
      '凯尔希是罗德岛医疗部门的最高负责人,也是组织真正的元老之一。' +
      '她见证了无数历史,是阿米娅的导师,也与博士有着久远的渊源。',
    background:
      '凯尔希拥有跨越万年的记忆与渊博学识,涉猎冶金、源石技艺、考古与历史等领域,曾是巴别塔的核心成员。' +
      '巴别塔倾覆后,她与阿米娅共同创立罗德岛医疗项目,投身矿石病的研究与救治。',
  },
  {
    id: 'theresa',
    name: '特蕾西娅',
    codename: 'Theresa',
    faction: 'kazdel',
    role: '卡兹戴尔领袖(故人)',
    race: '萨卡兹',
    summary: '卡兹戴尔的魔王,理想主义的象征,已逝。',
    description:
      '特蕾西娅曾是卡兹戴尔的魔王,以和平共处为理想。' +
      '她的逝去深刻影响了阿米娅、凯尔希与塔露拉等人,她的力量与遗志由阿米娅继承。',
    background:
      '特蕾西娅曾是卡兹戴尔的魔王,主张萨卡兹与其他族群的和平共处。' +
      '她的逝去深刻改变了凯尔希、阿米娅与塔露拉的命运,其形象与意志在后续剧情中不断被提及。',
  },
  {
    id: 'talulah',
    name: '塔露拉',
    codename: 'Talulah',
    faction: 'reunion',
    role: '整合运动领袖',
    race: '萨卡兹',
    summary: '整合运动的领导者,以激进手段反抗社会的感染者。',
    description:
      '塔露拉是整合运动的领袖,主张以激烈的方式为感染者争取生存空间。' +
      '她与特蕾西娅有着深厚渊源,立场与罗德岛对立,却并非简单的反派。',
    background:
      '塔露拉是整合运动的领袖与代言人,被视为切尔诺伯格灾难等一系列动乱的主谋。' +
      '她主张以激烈手段为感染者争取生存空间,立场与罗德岛对立,却与特蕾西娅有着深厚渊源。',
  },
  {
    id: 'w',
    name: 'W',
    codename: 'W',
    faction: 'reunion',
    role: '雇佣兵 / 爆破专家',
    race: '萨卡兹',
    summary: '行事乖张的爆破专家,与整合运动和过往纠缠不清。',
    description:
      'W 是萨卡兹雇佣兵,爆破技艺高超、性格张扬。' +
      '她曾活跃于整合运动,与失忆的博士有着神秘的过往。',
    background:
      'W 是身经百战的卡兹戴尔雇佣兵,也是矿石病感染者。她曾追随特蕾西娅、活跃于整合运动,' +
      '切尔诺伯格事件后转而与罗德岛达成战略合作;性格乖张,与失忆的博士有着神秘的过往。',
  },
  {
    id: 'frostnova',
    name: '霜星',
    codename: 'FrostNova',
    faction: 'reunion',
    role: '整合运动干部',
    race: '萨卡兹',
    summary: '整合运动中坚定而悲情的指挥官。',
    description:
      '霜星是整合运动的高级干部,为族人战斗到最后一刻,是悲剧性的坚定者。',
    background:
      '霜星是整合运动的法术部队干部,指挥代号「雪怪」的术师小队,以冰霜法术著称。' +
      '她服从塔露拉的领导,为族人战斗到最后一刻,是悲剧性的坚定者。',
  },
  {
    id: 'texas',
    name: '德克萨斯',
    codename: 'Texas',
    faction: 'penguin',
    role: '企鹅物流职员',
    race: '鲁珀',
    summary: '沉默可靠的企鹅物流核心成员,背负着家族覆灭的过往。',
    description:
      '德克萨斯是企鹅物流的员工,沉默寡言但极为可靠,负责驾驶与护卫。' +
      '她出身已覆灭的德克萨斯家族,与能天使是亲密的同事。',
    background:
      '德克萨斯出身已覆灭的德克萨斯家族,「过去总有一天会追上她」。' +
      '如今她是企鹅物流可靠的员工,沉默寡言、战斗风格直接,与能天使是亲密的同事。',
  },
  {
    id: 'exusiai',
    name: '能天使',
    codename: 'Exusiai',
    faction: 'laterano',
    role: '企鹅物流职员 / 枪手',
    race: '萨科塔',
    summary: '开朗的拉特兰枪手,德克萨斯最好的搭档。',
    description:
      '能天使是来自拉特兰的萨科塔,性格开朗、枪法卓绝。' +
      '她是企鹅物流的王牌,与德克萨斯是形影不离的搭档。',
    background:
      '能天使是来自拉特兰的萨科塔,企鹅物流的王牌枪手,推测身份为信使,并非矿石病感染者。' +
      '她性格开朗、枪法卓绝,既是虔诚的信徒又追逐新潮事物,是德克萨斯少数真正认可的人。',
  },
  {
    id: 'saria',
    name: '塞雷娅',
    codename: 'Saria',
    faction: 'rhine',
    role: '莱茵生命前安全主管',
    race: '瓦伊凡',
    summary: '莱茵生命的前安保负责人,沉稳的守护者。',
    description:
      '塞雷娅曾是莱茵生命防卫科主任,如今与罗德岛合作。' +
      '她与伊芙利特有着监护般的羁绊,守护着这位力量强大的少女。',
    background:
      '塞雷娅曾任莱茵生命防卫科主任,精通生命科学与微生物学。' +
      '因一场涉及伊芙利特的失败实验而离开莱茵生命,如今与罗德岛合作,始终守护着伊芙利特。',
  },
  {
    id: 'ifrit',
    name: '伊芙利特',
    codename: 'Ifrit',
    faction: 'rhine',
    role: '莱茵生命实验体',
    race: '萨卡兹',
    summary: '力量惊人却心智稚嫩的萨卡兹少女。',
    description:
      '伊芙利特是源石适应性极高的感染者,曾是莱茵生命的长期实验体,拥有强大的火焰之力,但心智仍如孩童。' +
      '塞雷娅是她最信赖的守护者。',
    background:
      '伊芙利特是源石适应性极高的感染者,有多发性点火现象,曾是莱茵生命的长期实验体。' +
      '她拥有强大的火焰之力,但心智仍如孩童;她渴望证明自己的成长,十分在意塞雷娅。',
  },
  {
    id: 'lappland',
    name: '拉普兰德',
    codename: 'Lappland',
    faction: 'rhodes',
    role: '罗德岛近卫干员',
    race: '鲁珀',
    summary: '来自叙拉古的危险术师,与德克萨斯有着若即若离的纠葛。',
    description:
      '拉普兰德是来自叙拉古的鲁珀族术师,现为罗德岛近卫干员,矿石病感染严重。' +
      '她性格危险而执着,与同乡德克萨斯有着旧日的渊源。',
    background:
      '拉普兰德来自叙拉古,档案暗示她或许出身当地最危险的家族,但相关调查已被中止。' +
      '她矿石病感染严重、性格危险而执着,与德克萨斯维持着若即若离的关系——她始终想让德克萨斯变回从前的样子。',
  },
  {
    id: 'chen',
    name: '陈',
    codename: "Ch'en",
    faction: 'lungmen',
    role: '龙门近卫局特别督察组组长',
    race: '龙',
    summary: '龙门近卫局最年轻的特别督察组组长,嫉恶如仇。',
    description:
      '陈是龙门近卫局的高级警司、特别督察组组长,毕业于维多利亚皇家近卫学校。' +
      '她嫉恶如仇,致力于打击有组织犯罪。',
    background:
      '陈毕业于维多利亚皇家近卫学校且成绩优异,返回龙门后成为警史中晋升最快的警官、最年轻的特别督察组组长。' +
      '她以嫉恶如仇、作风严苛著称,专注于打击非法活动与有组织犯罪。',
  },
  {
    id: 'sora',
    name: '空',
    codename: 'Sora',
    faction: 'penguin',
    role: '企鹅物流 / 偶像歌手',
    race: '未公开',
    summary: '寄居企鹅物流的现役偶像,以歌声在战场支援队友。',
    description:
      '空是一名现役偶像,暂时寄居于企鹅物流并作为罗德岛干员活动。' +
      '她能以与声音相关的源石技艺在战场上支援队友。',
    background:
      '空是一名现役偶像,因经纪公司要求不公开种族与出身,暂时寄居于企鹅物流。' +
      '她能非主观地施展与声音相关的源石技艺,以歌声为队友提供支援;德克萨斯是她的救命恩人与导师。',
  },
  {
    id: 'silence',
    name: '赫默',
    codename: 'Silence',
    faction: 'rhine',
    role: '莱茵生命源石研究员',
    race: '黎博利',
    summary: '莱茵生命的源石研究员,伊芙利特的守护者。',
    description:
      '赫默是莱茵生命医学研究所的源石研究员,现为罗德岛医疗干员。' +
      '她曾参与伊芙利特相关项目,如今守护着伊芙利特。',
    background:
      '赫默是莱茵生命医学研究所的源石研究员,理想是清除世界上所有的矿石病。' +
      '她曾与塞雷娅共同参与伊芙利特的项目,后因诸多缘由离开莱茵生命,如今守护着伊芙利特,并坚持不让她与塞雷娅相见。',
  },
];

export const relations: Relation[] = [
  { source: 'amiya', target: 'doctor', type: '战友', label: '彼此信赖的搭档' },
  { source: 'amiya', target: 'kaltsit', type: '上下级', label: '凯尔希是阿米娅的导师' },
  { source: 'kaltsit', target: 'doctor', type: '渊源', label: '久远的过往羁绊' },
  { source: 'amiya', target: 'theresa', type: '血缘', label: '继承了特蕾西娅的力量与遗志' },
  { source: 'kaltsit', target: 'theresa', type: '战友', label: '昔日并肩的同伴' },
  { source: 'talulah', target: 'theresa', type: '渊源', label: '深受特蕾西娅影响' },
  { source: 'talulah', target: 'amiya', type: '对立', label: '理念与立场的对立' },
  { source: 'talulah', target: 'w', type: '同阵营', label: '整合运动的同僚' },
  { source: 'talulah', target: 'frostnova', type: '上下级', label: '整合运动的下属干部' },
  { source: 'texas', target: 'exusiai', type: '战友', label: '企鹅物流的黄金搭档' },
  { source: 'saria', target: 'ifrit', type: '上下级', label: '守护与被守护' },
  { source: 'saria', target: 'amiya', type: '同阵营', label: '同属罗德岛' },
  // ↓ 新增人物的关系(均经 PRTS 核对,陈与德克萨斯一条为龙门事务关联,如有更准确设定可调整)
  { source: 'lappland', target: 'texas', type: '渊源', label: '同乡旧识,德克萨斯对她心存畏惧' },
  { source: 'texas', target: 'sora', type: '上下级', label: '德克萨斯是空的救命恩人与导师' },
  { source: 'sora', target: 'exusiai', type: '战友', label: '同在企鹅物流,常争夺德克萨斯的陪伴' },
  { source: 'silence', target: 'ifrit', type: '上下级', label: '赫默是伊芙利特的监护人' },
  { source: 'silence', target: 'saria', type: '渊源', label: '曾共同参与伊芙利特项目,如今因立场分歧' },
  { source: 'chen', target: 'texas', type: '渊源', label: '因龙门事务结识的旧识' },
];

// 便捷查询函数 ─────────────────────────────────
export function getCharacter(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

export function getFaction(id: string): Faction | undefined {
  return factions.find((f) => f.id === id);
}

/** 取得某个角色的所有关系(无向) */
export function relationsOf(id: string): Array<{ other: Character; type: RelationType; label: string }> {
  const out: Array<{ other: Character; type: RelationType; label: string }> = [];
  for (const r of relations) {
    if (r.source === id) {
      const other = getCharacter(r.target);
      if (other) out.push({ other, type: r.type, label: r.label });
    } else if (r.target === id) {
      const other = getCharacter(r.source);
      if (other) out.push({ other, type: r.type, label: r.label });
    }
  }
  return out;
}

/** 关系对页的 URL slug,如 kaltsit-doctor */
export function relationSlug(r: Relation): string {
  return `${r.source}-${r.target}`;
}

/** 取得某阵营的全部人物 */
export function charactersByFaction(factionId: string): Character[] {
  return characters.filter((c) => c.faction === factionId);
}

/** 取得涉及某角色的全部关系(原始 Relation,带 source/target,便于生成内链 slug) */
export function relationsInvolving(id: string): Relation[] {
  return relations.filter((r) => r.source === id || r.target === id);
}
