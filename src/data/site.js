/** 站点文本数据：与简历及面试参考手册保持一致。phoneBase64 保留现有联系方式处理方式。 */

export const site = {
  "brand": "YJXAI.CLOUD",
  "name": "杨佳锡",
  "email": "837828743@qq.com",
  "wechat": "y837828743",
  "github": "https://github.com/yanghheda",
  "phoneBase64": "MTM5NDQyNTgwOTA=",
  "icp": "吉ICP备2026009438号-1"
}

export const navIndex = [
  {
    "num": "01",
    "to": "/resume",
    "title": "简历",
    "en": "Resume",
    "desc": "完整履历：职业概述、核心优势、工作与项目经历、技能矩阵、教育与语言。",
    "domain": "yjxai.cloud/resume",
    "tags": [
      "求职",
      "AI 全栈"
    ]
  },
  {
    "num": "02",
    "to": "/projects",
    "title": "项目",
    "en": "Projects",
    "desc": "个人全栈项目：ForgeAI 研发交付工作台与 HengPick 智能购物决策，展示业务流程、架构与关键实现。",
    "domain": "yjxai.cloud/projects",
    "tags": [
      "作品集"
    ]
  },
  {
    "num": "03",
    "title": "实验室",
    "en": "Lab",
    "desc": "计划整理 Agent 编排、受控工具调用与检索实验，提供可交互的 AI 应用演示。",
    "domain": "即将上线",
    "tags": [
      "Soon"
    ],
    "soon": true
  },
  {
    "num": "04",
    "title": "笔记",
    "en": "Notes",
    "desc": "技术沉淀：前端与跨端交互、Agent 编排、审批恢复、业务校验与 AI 应用工程实践。",
    "domain": "即将上线",
    "tags": [
      "Soon"
    ],
    "soon": true
  },
  {
    "num": "05",
    "title": "电话",
    "en": "Call",
    "desc": "岗位机会、技术交流都欢迎，点击直接沟通。",
    "domain": "139****8090",
    "tags": [
      "电话",
      "直达"
    ],
    "action": "call"
  }
]

export const stats = [
  {
    "n": "02",
    "unit": "YEARS",
    "label": "约 2 年电商前端开发经历，覆盖 C 端 H5 / 小程序与 B 端商家 SaaS。"
  },
  {
    "n": "07",
    "unit": "MONTHS",
    "label": "金融 AI 应用开发经历，负责 iFinD AI Chat 专家模式前端改造，参与 Agent 能力接入。"
  },
  {
    "n": "03",
    "unit": "TRACKS",
    "label": "全栈实践的三个方向：前端与跨端交互、Java 业务服务、Python / Agent 编排。"
  }
]

export const nowItems = [
  {
    "en": "Doing",
    "title": "正在做",
    "desc": "围绕 ForgeAI 与 HengPick 整理全栈项目实践，梳理工具调用、人工审批、任务恢复和跨端业务流程。"
  },
  {
    "en": "Learning",
    "title": "正在学",
    "desc": "继续深入真实数据下的检索与引用校验、Agent 任务可靠性，以及模型输出和确定性业务规则的边界。"
  },
  {
    "en": "Looking for",
    "title": "正在找",
    "desc": "AI 全栈 / AI 应用开发岗位。目前在上海，随时到岗，希望进一步承担从前端交互到服务接口与 Agent 流程的完整交付。"
  }
]

export const projects = [
  {
    "name": "ForgeAI · AI 研发交付工作台",
    "period": "个人项目",
    "kind": "主项目 · B 端 · 个人项目",
    "online": true,
    "desc": "面向企业产研协作，将需求、PRD、设计、开发、测试与发布管理汇集到同一工作台，通过分阶段 Agent 辅助生成交付物、调用业务工具并推进流程。",
    "stack": [
      "LangGraph",
      "结构化输出",
      "SQLite Checkpoint",
      "SSE",
      "Next.js",
      "React",
      "TypeScript",
      "Spring Boot",
      "MyBatis-Plus",
      "FastAPI",
      "MySQL",
      "Redis",
      "Qdrant",
      "Docker Compose"
    ],
    "points": [
      "全栈架构与业务流程：构建 Web 工作台、Java 业务服务与 Python Agent Runtime 三层架构；由 Java 统一管理权限、状态机与事务，Agent 经受控 Tool API 执行业务操作，实现需求、文档版本、任务及发布信息的关联管理。",
      "Agent 编排与模型接入：基于 LangGraph 实现“计划—工具选择—执行—观察—结果生成”有界循环；按产品、设计、开发、测试、发布阶段裁剪工具与上下文，对接大模型 API，实现结构化输出与流式生成，结合 Schema 校验、调用次数限制与超时重试约束执行。",
      "人工审批与任务恢复：按工具风险等级实施确认与审批；将审批绑定具体调用参数，结合 RBAC、组织作用域及幂等控制防止越权和重复写入；使用 SQLite Checkpoint 保存图状态，支持等待审批后的恢复执行。",
      "AI 交互与可追溯性：实现对话面板、工具执行状态、审批操作及文档编辑；通过 SSE 展示增量结果，以持久化事件序号支持断线补发，结合前端状态归并与快照恢复保持任务进度一致。",
      "交付集成与验证：实现 GitLab 分支、MR、Pipeline 与 Webhook 对接模块，结合 Outbox 与状态校验处理异步结果；构建发布预检、审批后模拟部署及自动化回归，使用 Docker Compose 完成应用部署。",
      "当前实现边界：个人项目已部署；知识库索引使用测试向量化实现，发布执行采用模拟方式，尚无真实团队规模与生产检索效果数据。"
    ],
    "repo": ""
  },
  {
    "name": "HengPick · AI 智能购物决策",
    "period": "个人项目",
    "kind": "副项目 · C 端 · 个人项目",
    "online": true,
    "desc": "面向“给谁买、预算多少、看重什么”的购物需求，在 React Native 商城中嵌入 H5 决策页，提供需求澄清、候选比较、价格方案与购买建议，衔接商品详情和模拟结算。",
    "stack": [
      "LangGraph",
      "大模型 API 接入",
      "Qdrant",
      "Redis Streams",
      "React Native / Expo",
      "React",
      "Vite",
      "TypeScript",
      "Spring Boot",
      "MyBatis",
      "FastAPI",
      "MySQL"
    ],
    "points": [
      "跨端业务衔接：使用一次性 Ticket、H5 Session 与版本化 HostBridge 连接 RN 宿主和 H5，完成需求输入、决策进度、商品对比、返回商品详情及模拟结算路径。",
      "决策编排与事实校验：基于 LangGraph 串联意图提取、追问、商品筛选、价格计算与评分；将价格、优惠及硬条件判断交由 Java 执行，模型负责需求理解与建议表达，购买意向创建前再次确认报价版本。",
      "证据检索与质量评测：实现 Qdrant 证据索引、按 Dataset / Product / SKU 过滤、引用归属校验及评价摘要模块；建立 Golden Case 回归与价格、硬条件、引用完整性门禁，区分模型生成结果与模板降级结果。",
      "异步可靠性：以 MySQL 保存 Decision Run 权威状态，Redis Stream / SSE 传递进度；使用 Run 版本拦截过期回调，支持断线续读与轮询快照，提供模型不可用时的规则 / 模板降级与脱敏 Trace。",
      "当前实现边界：商品、报价与结算采用模拟数据；评价检索与优惠模块尚未完整接入主链，部分评分输入为演示值，进度步骤在图执行后集中回调。"
    ],
    "repo": ""
  }
]
