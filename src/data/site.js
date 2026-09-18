/**
 * 站点内容数据
 * 原首页中写死的文案集中在此，便于后续替换
 */

export const site = {
  brand: 'YJXAI.CLOUD',
  name: '杨佳锡',
  email: '837828743@qq.com',
  wechat: 'y837828743',
  github: 'https://github.com/yanghheda',
  /** 手机号以 base64 存放，避免在页面源码中出现完整号码 */
  phoneBase64: 'MTM5NDQyNTgwOTA=',
  icp: '吉ICP备2026009438号-1',
}

/** 01 站点导览 */
export const navIndex = [
  {
    num: '01',
    to: '/resume',
    title: '简历',
    en: 'Resume',
    desc: '完整履历：职业概述、核心优势、工作与项目经历、技能矩阵、教育与语言。',
    domain: 'yjxai.cloud/resume',
    tags: ['求职', 'AI 全栈'],
  },
  {
    num: '02',
    to: '/projects',
    title: '项目',
    en: 'Projects',
    desc: '开源项目与作品集：技术选型、架构说明、核心难点与源码仓库。',
    domain: 'yjxai.cloud/projects',
    tags: ['作品集'],
  },
  {
    num: '03',
    title: '实验室',
    en: 'Lab',
    desc: 'AI 应用的在线实验场：Agent、RAG 检索、工具调用，打开即用无需部署。',
    domain: '即将上线',
    tags: ['Soon'],
    soon: true,
  },
  {
    num: '04',
    title: '笔记',
    en: 'Notes',
    desc: '技术沉淀：前端工程化、Java 后端实践、AI 应用开发中的踩坑与思考。',
    domain: '即将上线',
    tags: ['Soon'],
    soon: true,
  },
  {
    num: '05',
    title: '电话',
    en: 'Call',
    desc: '岗位机会、技术交流都欢迎，点击直接沟通。',
    domain: '139****8090',
    tags: ['电话', '直达'],
    action: 'call',
  },
]

/** 02 一些数字 */
export const stats = [
  {
    n: '02',
    unit: 'YEARS',
    label: '前端工程经验，从页面还原到组件体系、构建流程与性能优化。',
  },
  {
    n: '07',
    unit: 'MONTHS',
    label: 'AI 应用开发，覆盖 Prompt 工程、RAG 检索链路与 Agent 工具编排。',
  },
  {
    n: '03',
    unit: 'TRACKS',
    label: '核心方向：前端工程、Java 后端服务、AI 应用与 Agent 开发。',
  },
]

/** 03 近况 */
export const nowItems = [
  {
    en: 'Doing',
    title: '正在做',
    desc: '把 Agent 能力沉淀成可复用的全栈模板：从对话入口、工具调用到落地页，一条链路跑通。',
  },
  {
    en: 'Learning',
    title: '正在学',
    desc: 'RAG 检索与召回优化、多智能体协作模式，以及 MCP 工具生态的工程化落地。',
  },
  {
    en: 'Looking for',
    title: '正在找',
    desc: 'AI 应用 / 全栈 / 前端工程相关岗位。若你手上刚好有合适的机会，欢迎直接找我。',
  },
]

/** 项目列表 —— TODO: 按实际情况补充仓库地址与截图 */
export const projects = [
  {
    name: 'ForgeAI · AI 原生软件交付工作台',
    period: '2025.07 — 2026.01',
    kind: 'B 端 · 研发协同 SaaS',
    online: true,
    desc: '面向中小研发团队的自托管 AI 原生软件交付工作台，以 Work Item 为核心，用 AI Agent 串联「需求 → UX 设计 → 开发 → 测试 → 发布」全链路，自动编排建分支 / MR、跟踪 CI 流水线、生成测试用例与发布单，并提供统一研发上下文与权限管控。',
    stack: ['LangGraph', 'RAG / Qdrant', 'SSE 事件流', 'Next.js', 'React', 'TypeScript', 'Java 21', 'Spring Boot 3.5', 'Python 3.12', 'FastAPI', 'MySQL', 'Redis', 'Docker Compose'],
    points: [
      '基于 LangGraph StateGraph 自研有界 Agent 工作流，高风险操作强制人工审批，借 checkpoint 持久化实现任务暂停 / 恢复。',
      '落地 RAG 知识库，检索时在服务端用 RBAC 权限强制构造过滤条件，调用方无法越权，topK 上限控制 Token 预算。',
      '设计持久化事件流 SSE，支持 Last-Event-ID 断线补发与前端序号断层检测自动重连，连接与任务生命周期解耦。',
      '构建契约驱动工具系统，18 个 Tool + 6 个 Skill 以 YAML / JSON Schema 为唯一事实源，启动时校验，三方共享。',
      '企业级安全与多租户：组织 → 工作区 → 项目三级隔离、AES-256-GCM 加密第三方密钥、SSRF 防护、只追加审计日志。',
    ],
    repo: '',
  },
  {
    name: 'HengPick 智能商城 · AI 购物决策助手',
    period: '2025.09 — 2026.01',
    kind: 'C 端 · 电商',
    online: true,
    desc: '嵌入电商 App 的 AI 购物决策智能商城，把「给父母买、预算 3000、续航好且易用」这类模糊自然语言需求，拆解为可检查、可追溯的购买决策链：意图理解 → 主动追问 → 结构化搜索 → RAG 评价摘要 → 五维评分 → 可解释报告。',
    stack: ['阿里云百炼 LLM', 'LangGraph', 'RAG / Qdrant', '结构化输出', 'Redis Streams', 'React Native / Expo', 'React 19', 'Vite', 'Java 21', 'Spring Boot', 'FastAPI', 'MySQL', 'Docker'],
    points: [
      '接入阿里云百炼大模型，用 response_format JSON Schema 受约束结构化输出，LangGraph 编排意图识别、追问、工具调用、报告生成多节点工作流。',
      '践行「确定性边界 vs 概率边界」治理：价格计算、硬条件过滤、推荐分、结算重确认全部由 Java 确定性完成，LLM 只负责语言与推理。',
      '实现 RAG 证据检索：Qdrant 稠密检索 + Payload 强过滤（SKU 级证据不串品），语义分 / 可信度 / 主题 / 时效加权确定性重排。',
      '构建实时可恢复决策流：SSE 推送阶段进度 + Redis Streams 作为进度通道，轮询快照兜底，runVersion 防止旧任务覆盖新结果。',
      '设计高可用降级：模型不可用 → 规则意图 + 模板报告，向量库故障 → 结构化评价降级，均打降级码并在 Trace 可见。',
    ],
    repo: '',
  },
]