/**
 * 简历内容配置
 * 页面只负责渲染，所有文案集中在此处，便于随时更新。
 *
 * 富文本标记：
 *   **文字**  → 加粗强调（墨色）
 *   ==文字==  → 关键词强调（品牌橙）
 */

export const resume = {
  /** 抬头 */
  profile: {
    name: '杨佳锡',
    nameEn: 'Yang Jiaxi',
    avatar: '杨',
    target: 'AI 全栈开发工程师',
    targetSub: '大模型应用方向',
    lede: 'Three years of shipping products — from e-commerce H5 to LLM-powered agents.',
    tags: ['3 年经验', '海外硕士', '上海', '随时到岗', '期望 26-30K'],
  },

  /** 联系方式：phone 走站点统一脱敏逻辑，不在页面源码暴露完整号码 */
  contacts: [
    { key: 'TEL', kind: 'phone', value: '139-4425-8090' },
    { key: 'MAIL', kind: 'email', value: '837828743@qq.com' },
    { key: 'CITY', kind: 'text', value: '上海（可接受上海 / 远程）' },
    { key: 'STATUS', kind: 'text', value: '随时到岗' },
    { key: 'SALARY', kind: 'text', value: '期望薪资 26-30K' },
  ],

  /** 页内导航（锚点） */
  sections: [
    { id: 'profile', num: '01', title: '职业概述', en: 'Profile' },
    { id: 'highlights', num: '02', title: '核心优势', en: 'Highlights' },
    { id: 'experience', num: '03', title: '工作经历', en: 'Experience' },
    { id: 'projects', num: '04', title: '项目经历', en: 'Projects' },
    { id: 'skills', num: '05', title: '技术栈', en: 'Stack' },
    { id: 'education', num: '06', title: '教育 & 语言', en: 'Education' },
  ],

  /** 01 职业概述 */
  summary: [
    '3 年研发经验，计算机科班（日本信息工程硕士）。前端出身，具备 **2 年电商 H5 / 小程序与商家 SaaS** 开发经验；后转型 AI 应用全栈，掌握 **Java / Python / TypeScript 三语言全栈**能力。',
    '熟练落地大模型应用全链路：**LangGraph 多节点 Agent 编排、RAG 检索增强（Qdrant 向量库 + 权限过滤）、Prompt 工程与结构化输出、SSE 流式交互、人机协同审批与 AI 评测门禁**。',
    '独立从 0 到 1 设计并上线两个 AI 全栈项目——==B 端 AI 研发交付工作台==与 ==C 端 AI 电商决策商城==，覆盖企业级 SaaS 与电商双业务场景。',
  ],

  /** 02 核心优势 */
  highlights: [
    {
      n: '1',
      title: 'AI 工程化全链路实战',
      desc: 'Agent 编排、RAG、流式输出、工具调用、人工审批、评测门禁均落地为生产级管道，含权限隔离、失败降级与可观测，非玩具级 Demo。',
    },
    {
      n: '2',
      title: '三语言全栈一人贯通',
      desc: 'Java(Spring Boot 业务权威) + Python(FastAPI / LangGraph Agent) + TypeScript(React / Next.js / RN)，前后端与 AI 服务独立交付。',
    },
    {
      n: '3',
      title: 'B 端 + C 端双业务场景',
      desc: '企业级多租户 SaaS 权限治理经验，叠加电商交易、推荐、智能决策场景，业务理解与技术深度兼具。',
    },
    {
      n: '4',
      title: '严谨的工程素养',
      desc: '契约驱动开发、Monorepo 架构边界守护、Testcontainers / ArchUnit 测试、Docker 私有化部署、Prometheus 监控与 SLO。',
    },
  ],

  /** 03 工作经历 */
  experience: [
    {
      company: '同花顺',
      role: 'AI 应用开发工程师（全栈）',
      period: '2026.01 — 2026.08',
      pills: ['互联网金融', 'AI Chat · 全栈'],
      points: [
        '负责金融数据终端 **iFinD 的 AI Chat 智能问答**产品核心模块全栈开发，覆盖对话交互、上下文管理与会话历史等功能。',
        '基于**大模型 API + RAG 检索增强**实现金融资讯 / 数据的智能问答；设计并迭代 ==Prompt 模板与上下文管理策略==，提升回答准确率与稳定性。',
        '落地 **SSE 流式输出与打字机渲染**、多轮对话状态管理；以 **React 前端 + Python(FastAPI) 后端**全栈交付，与算法、产品协同推进模型能力工程化。',
        '处理高并发下的**异步任务、接口限流与异常降级**，保障对话服务在行情高峰时段的可用性。',
      ],
    },
    {
      company: '爱库存',
      role: '前端开发工程师',
      period: '2023.07 — 2025.07',
      pills: ['电商', 'H5 / 小程序 · 商家 SaaS'],
      points: [
        '负责电商平台 **H5 端与小程序**核心交易链路开发（商品详情、购物车、订单、营销活动、个人中心），保障大促期间页面稳定与性能。',
        '负责**商家 SaaS 平台**前端开发（商品 / 订单 / 库存管理、营销工具、数据看板），沉淀可复用业务组件与脚手架，提升团队迭代效率。',
        '基于 **React + TypeScript** 技术栈，完成首屏加载、长列表渲染、包体积等性能优化，推动组件库与工程规范建设，完成多机型跨端适配。',
      ],
    },
  ],

  /** 04 项目经历 */
  projects: [
    {
      num: '01',
      name: 'ForgeAI · AI 原生软件交付工作台',
      role: '独立设计 & 开发',
      period: '2025.07 — 2026.01',
      pills: ['B 端 · 研发协同 SaaS', '已部署上线'],
      note: 'Monorepo 三应用 · 约 2.4 万行生产代码',
      stack: [
        'LangGraph',
        'RAG / Qdrant',
        'SSE 事件流',
        'Agent 工具契约',
        'Next.js 16',
        'React 19',
        'TypeScript',
        'Java 21',
        'Spring Boot 3.5',
        'Python 3.12',
        'FastAPI',
        'MySQL',
        'Redis',
        'Docker Compose',
      ],
      aiStack: ['LangGraph', 'RAG / Qdrant', 'SSE 事件流', 'Agent 工具契约'],
      desc: '面向中小研发团队的自托管 AI 原生软件交付工作台，以 Work Item 为核心，用 AI Agent 串联「需求 → UX 设计 → 开发 → 测试 → 发布」全链路，自动编排建分支 / MR、跟踪 CI 流水线、生成测试用例与发布单，并提供统一研发上下文与权限管控。',
      points: [
        '基于 **LangGraph StateGraph 自研有界 Agent 工作流**（上下文校验 → 规划 → 工具选择 → 守卫 → 执行 → 观测 → 总结）；高风险操作（合并保护分支 / 生产发布 / 回滚）强制**人工审批**，借 checkpoint 持久化实现任务==暂停 / 恢复==。',
        '落地 **RAG 知识库**：文档版本化 → 分块 → 向量化 → Qdrant 异步索引；检索时在**服务端用 RBAC 权限强制构造过滤条件**（工作区 + 项目范围），调用方无法越权，topK 上限控制 Token 预算。',
        '设计**持久化事件流 SSE**：Agent 事件先落 MySQL（run 内严格递增序号）再推送，支持 ==Last-Event-ID 断线补发==与前端序号断层检测自动重连，连接与任务生命周期解耦。',
        '构建**契约驱动工具系统**：18 个 Tool + 6 个 Skill 以 YAML / JSON Schema 为唯一事实源，声明入参、所需权限、风险等级、幂等与重试策略，启动时校验，Web / Server / Agent 三方共享。',
        '实现**企业级安全与多租户**：组织 → 工作区 → 项目三级隔离、7 类系统角色 + 项目级角色范围；AES-256-GCM 加密第三方密钥、CSRF 双提交、SSRF 防护、只追加审计日志。',
        '工程质量保障：**ArchUnit 架构守护 + Testcontainers 集成测试**、Golden Cases 评测门禁（含越权 / 误操作负向用例）、Prometheus 指标与 SLO、结构化日志贯穿 RequestId；抽象**可插拔模型适配端口**，可平滑接入 OpenAI 兼容协议多家大模型。',
      ],
    },
    {
      num: '02',
      name: 'HengPick 智能商城 · AI 购物决策助手',
      role: '独立设计 & 开发',
      period: '2025.09 — 2026.01',
      pills: ['C 端 · 电商', '已部署上线'],
      note: 'RN 宿主 + H5 + 双后端服务',
      stack: [
        '阿里云百炼 LLM',
        'LangGraph',
        'RAG / Qdrant',
        '结构化输出',
        'Redis Streams',
        'React Native / Expo',
        'React 19',
        'Vite',
        'Java 21',
        'Spring Boot',
        'Python / FastAPI',
        'MySQL',
        'Docker',
      ],
      aiStack: ['阿里云百炼 LLM', 'LangGraph', 'RAG / Qdrant', '结构化输出', 'Redis Streams'],
      desc: '嵌入电商 App 的 AI 购物决策智能商城，把「给父母买、预算 3000、续航好且易用」这类模糊自然语言需求，拆解为可检查、可追溯的购买决策链：意图理解 → 主动追问 → 结构化搜索 → RAG 评价摘要 → 五维评分 → 可解释报告，最终回跳商品详情完成模拟结算。',
      points: [
        '接入**阿里云百炼大模型**（OpenAI 兼容协议 + ==response_format JSON Schema== 受约束结构化输出），用 **LangGraph 编排**意图识别、缺失信息追问、工具调用、评价摘要、报告生成多节点工作流。',
        '践行**「确定性边界 vs 概率边界」治理**：价格计算、硬条件过滤、五维推荐分、结算重确认全部由 Java 确定性完成，LLM 只负责语言与推理；报告发布前**校验金额、事实与引用一致性**，杜绝模型幻觉影响交易。',
        '实现 **RAG 证据检索**：Qdrant 稠密检索 + Payload 强过滤（SKU 级证据不串品），语义分 / 可信度 / 主题 / 时效加权确定性重排；**Prompt 注入**在数据导入与生成双侧扫描拦截。',
        '构建**实时可恢复决策流**：SSE 推送阶段进度 + Redis Streams 作为进度通道，Last-Event-ID 断线续读、轮询快照兜底，runVersion 版本号防止旧任务晚到覆盖新结果。',
        '设计**高可用降级**：模型不可用 → 规则意图 + 模板报告、向量库故障 → 结构化评价降级，均打降级码并在 Trace 可见；Golden Cases 门禁要求硬条件违反率 0%、价格 / 引用完整率 100%。',
        '落地**用户可控 AI Memory**（偏好以提案形式生成、需用户确认生效，支持作用域与保留期）与 **RN ↔ H5 版本化 HostBridge** 桥接（限消息大小 / 深度 / 时间窗，WebView 安全嵌入）。',
      ],
    },
  ],

  /** 05 技术栈 */
  skillGroups: [
    {
      title: 'AI / 大模型应用',
      en: 'AI & LLM',
      tags: [
        { name: 'LangGraph', hot: true },
        { name: 'RAG 检索增强', hot: true },
        { name: 'Qdrant 向量库', hot: true },
        { name: '大模型 API 接入', hot: true },
        { name: 'Prompt 工程', hot: true },
        { name: 'Agent 工具调用' },
        { name: 'SSE 流式输出' },
        { name: '结构化输出 JSON Schema' },
        { name: '人机协同审批' },
        { name: 'AI 评测 Golden Cases' },
        { name: '阿里云百炼' },
        { name: 'OpenAI 兼容协议' },
      ],
    },
    {
      title: '后端',
      en: 'Backend',
      tags: [
        { name: 'Java 21', hot: true },
        { name: 'Spring Boot 3', hot: true },
        { name: 'Python 3.12', hot: true },
        { name: 'FastAPI', hot: true },
        { name: 'MyBatis-Plus' },
        { name: 'MySQL' },
        { name: 'Redis' },
        { name: 'Flyway' },
        { name: 'JWT / 会话' },
        { name: 'RBAC 多租户' },
      ],
    },
    {
      title: '前端',
      en: 'Frontend',
      tags: [
        { name: 'React 19', hot: true },
        { name: 'Next.js 16', hot: true },
        { name: 'TypeScript', hot: true },
        { name: 'React Native / Expo' },
        { name: 'Vite' },
        { name: 'Zustand' },
        { name: 'React Query' },
        { name: 'Arco Design' },
        { name: 'H5 / 小程序' },
      ],
    },
    {
      title: '工程与运维',
      en: 'DevOps',
      tags: [
        { name: 'Docker Compose' },
        { name: 'Monorepo' },
        { name: 'OpenAPI 契约驱动' },
        { name: 'Nginx' },
        { name: 'Git' },
        { name: 'Testcontainers' },
        { name: 'ArchUnit' },
        { name: 'Prometheus' },
        { name: 'CI 质量门禁' },
      ],
    },
  ],

  /** 06 教育背景 */
  education: [
    {
      degree: '信息工程（计算机）',
      badge: '硕士',
      school: '中部大学 · 日本',
      period: '2021.04 — 2023.03',
    },
    {
      degree: '信息工程（计算机）',
      badge: '本科',
      school: '名古屋 HAL · 日本',
      period: '2017.04 — 2021.03',
    },
  ],

  /** 06 语言能力 */
  languages: [
    { name: '中文', level: '母语' },
    { name: '日语', level: '6 年留学 · 可商务沟通' },
    { name: '英语', level: '读写技术文档' },
  ],

  footerNote:
    '以上两个项目均为个人独立从 0 到 1 设计、开发并使用 Docker Compose 部署上线 · 可提供在线演示地址与源码讲解',
}