# 明日方舟人物关系图谱

一个可视化《明日方舟》人物关系网络的网站,同时作为 **SEO 实践学习**项目。
前端用交互式力导向图展示阵营与人物关系,并完整实践了 title、meta、canonical、
结构化数据、sitemap 等 SEO 要点。

---

## 技术栈

### 前端(`frontend/`)— 已完成,可上线

| 类别 | 技术 | 说明 |
|---|---|---|
| 框架 | **Astro 4.16** | 静态站点生成(SSG),天生对 SEO 友好 |
| 语言 | **TypeScript** | 数据层与 `.astro` 组件 |
| 可视化 | **ECharts 5** | 力导向人物关系图(客户端岛屿) |
| 样式 | **原生 CSS** | `public/styles/global.css`,无 UI 框架 |
| SEO | **@astrojs/sitemap 3.1.6** | 自动生成 sitemap;canonical / OG / JSON-LD 手写在 BaseLayout |
| 运行时 | **Node 22 / npm 10** | 仅构建期需要,产物是纯静态 HTML |

> 数据当前来自本地文件 `frontend/src/data/characters.ts`(「前端先行」数据源),
> 其 `Character / Faction / Relation` 类型即未来后端 API 的数据契约。

### 后端(`backend/`)— 代码已写,待部署

| 类别 | 技术 | 说明 |
|---|---|---|
| 框架 | **FastAPI 0.115** | 异步、自带 `/docs`、Pydantic 校验 |
| ORM | **SQLAlchemy 2.0**(同步) | + `psycopg2` 驱动 |
| 数据库 | **PostgreSQL** | 提供阵营 / 人物 / 关系 JSON API |
| 校验 / 配置 | **Pydantic v2** + pydantic-settings | API 出入参与环境配置 |
| 服务器 | **uvicorn** | ASGI |

### 部署目标

- 远程 Linux 服务器(Debian 11 / Python 3.9),通过 **Termius(SSH)** 管理
- 前后端衔接:前端把本地数据源换成 `fetch(后端 API)`,接口返回相同结构的 JSON 即可

---

## 项目结构

```
ArkNights/
├── frontend/                  # Astro 前端(已完成)
│   ├── astro.config.mjs       # site / sitemap 配置
│   ├── src/
│   │   ├── data/characters.ts # 数据源:阵营 / 人物 / 关系(= API 契约)
│   │   ├── layouts/BaseLayout.astro       # 全站 SEO <head>
│   │   ├── components/RelationGraph.astro  # ECharts 关系图
│   │   └── pages/             # 首页 / 人物 / 关系对 / 阵营 / SEO 笔记
│   └── public/                # robots.txt、全局样式
├── backend/                   # FastAPI 后端(待部署)
│   ├── app/                   # main / models / schemas / database / seed
│   └── requirements.txt
├── seo/                       # SEO 策略文档
│   ├── keyword-matrix.csv     # 关键词矩阵
│   └── site-architecture.md   # 信息架构
└── README.md
```

---

## 本地运行

### 前端

```bash
cd frontend
npm install
npm run dev      # 开发预览 http://localhost:4321
npm run build    # 生产构建到 dist/
```

### 后端(待服务器环境就绪后)

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # 配置 DATABASE_URL
python -m app.seed            # 初始化数据
uvicorn app.main:app --reload # http://localhost:8000/docs
```

---

## SEO 特性(前端已实现)

- 每页唯一的 `<title>` + `<meta name="description">`(公式化撰写)
- `<link rel="canonical">`、Open Graph、Twitter Card
- **JSON-LD 结构化数据**:`Person` / `FAQPage` / `BreadcrumbList` / `ItemList` / `CollectionPage` / `WebSite`
- 自动生成 `sitemap-index.xml` + `robots.txt`
- 语义化 HTML、面包屑、描述性内链锚文本
- 渐进增强:关系图为 canvas,另提供文字版名录与独立人物页保证可索引

---

## 内容规模

- 7 个阵营 · 15 个人物 · 18 条关系
- 共 45 个静态页面(人物页 / 关系对页 / 阵营专题页 / 名录页)

---

> 本站为 SEO 学习用 Demo,《明日方舟》人物与设定版权归鹰角网络所有。
