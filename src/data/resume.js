/** 简历内容：依据 yangjiaxi-ai-fullstack.html 与 AI 全栈面试参考手册整理。**文字** 为加粗，==文字== 为强调。 */

export const resume = {
  profile: {
    name: '杨佳锡',
    nameEn: 'Yang Jiaxi',
    avatar: '杨',
    target: 'AI 全栈开发工程师',
    targetSub: '大模型应用方向',
    lede: 'From e-commerce interfaces to AI applications and full-stack projects.',
    tags: ['约 3 年开发经验', '海外硕士', '上海', '随时到岗', '期望 26-30K'],
  },
  contacts: [
    {
      key: 'TEL',
      kind: 'phone',
      value: '139-4425-8090',
    },
    {
      key: 'MAIL',
      kind: 'email',
      value: '837828743@qq.com',
    },
    {
      key: 'CITY',
      kind: 'text',
      value: '上海/杭州/北京',
    },
    {
      key: 'STATUS',
      kind: 'text',
      value: '随时到岗',
    },
    {
      key: 'SALARY',
      kind: 'text',
      value: '期望薪资 26-30K',
    },
  ],
  sections: [
    {
      id: 'profile',
      num: '01',
      title: '职业概述',
      en: 'Profile',
    },
    {
      id: 'highlights',
      num: '02',
      title: '核心优势',
      en: 'Highlights',
    },
    {
      id: 'experience',
      num: '03',
      title: '工作经历',
      en: 'Experience',
    },
    {
      id: 'projects',
      num: '04',
      title: '项目经历',
      en: 'Projects',
    },
    {
      id: 'skills',
      num: '05',
      title: '技术栈',
      en: 'Stack',
    },
    {
      id: 'education',
      num: '06',
      title: '教育 & 语言',
      en: 'Education',
    },
  ],
  summary: ['约 **2 年电商前端开发、7 个月金融 AI 应用开发**经历，覆盖 C 端 H5 / 小程序与 B 端商家 SaaS，信息工程专业海外硕士。', '在 **iFinD AI Chat** 中负责==专家模式前端渲染与交互改造==，参与 Claude Agent SDK、Skills 与多格式文件生成能力的接入联调。', '以 **React / TypeScript** 为基础，通过 **Python / FastAPI、Java / Spring Boot** 拓展全栈能力；已部署 ==ForgeAI== 与 ==MealMind==，具备 Agent 编排、受控工具调用与决策链路评测的项目实践。'],
  highlights: [
    {
      n: '1',
      title: '从业务交互到 AI 能力接入',
      desc: '具备电商 H5、小程序与商家 SaaS 前端经验，在金融 AI 产品中负责专家模式交互改造，参与 Agent 能力接入与前后端联调。',
    },
    {
      n: '2',
      title: '前端基础与全栈项目实践',
      desc: '以 React / TypeScript 构建界面，通过 Spring Boot 管理业务规则与事务，使用 FastAPI / LangGraph 实现 Agent 编排，贯通交互、接口与业务流程。',
    },
    {
      n: '3',
      title: '受控工具调用与任务恢复',
      desc: '在 ForgeAI 中实践阶段工具裁剪、参数校验、RBAC、人工审批与幂等控制，结合 SQLite Checkpoint 和持久化事件实现审批恢复与断线补发。',
    },
    {
      n: '4',
      title: '确定性边界与决策评测',
      desc: '在 MealMind 中把预算、忌口与营业状态等硬约束、价格计算与加权排序交由业务代码执行，模型只负责理解与表达；以 Golden 用例、稳定性复跑与降级链路让推荐可评测、可计量。',
    },
  ],
  experience: [
    {
      company: '同花顺',
      role: 'AI 应用开发工程师（全栈）',
      period: '2026.01 — 2026.08',
      pills: ['互联网金融', 'iFinD AI Chat · 专家模式'],
      points: ['**专家模式交互改造：**负责专家模式相关前端开发，改造对话内容的渲染与交互方式，配合专家模式功能迭代完成界面适配和前后端联调。', '**Agent 能力接入：**参与基于 Claude Agent SDK 的后端能力接入与联调，配合完成 Skills 集成及多格式文件生成相关功能，衔接 Agent 能力与对话界面。'],
    },
    {
      company: '爱库存',
      role: '前端开发工程师',
      period: '2023.07 — 2025.07',
      pills: ['电商', 'C 端交易平台 / B 端商家 SaaS'],
      points: ['负责电商平台 H5、小程序及商家 SaaS 相关前端开发，完成业务页面、交互逻辑与接口对接，支持 C 端与 B 端需求迭代。'],
    },
  ],
  projects: [
    {
      num: '01',
      slug: 'forgeai',
      name: 'ForgeAI · AI 研发交付工作台',
      role: '全栈开发',
      period: '个人项目',
      pills: ['主项目 · B 端', '已部署上线'],
      note: 'Web 工作台 + Java 业务服务 + Python Agent Runtime',
      stack: ['LangGraph', '结构化输出', 'SQLite Checkpoint', 'SSE', 'Vite', 'React 19', 'TypeScript', 'Spring Boot', 'MyBatis-Plus', 'FastAPI', 'MySQL', 'Redis', 'Qdrant', 'Docker Compose'],
      aiStack: ['LangGraph', '结构化输出', 'SQLite Checkpoint', 'SSE'],
      desc: '面向企业产研协作，将需求、PRD、设计、开发、测试与发布管理汇集到同一工作台，通过分阶段 Agent 辅助生成交付物、调用业务工具并推进流程。',
      points: [
        '**全栈架构与业务流程：**构建 Web 工作台、Java 业务服务与 Python Agent Runtime 三层架构；由 Java 统一管理权限、状态机与事务，Agent 经受控 Tool API 执行业务操作，实现需求、文档版本、任务及发布信息的关联管理。',
        '**Agent 编排与模型接入：**基于 LangGraph 实现“计划—工具选择—执行—观察—结果生成”有界循环；按产品、设计、开发、测试、发布阶段裁剪工具与上下文，对接大模型 API，实现结构化输出与流式生成，结合 Schema 校验、调用次数限制与超时重试约束执行。',
        '**人工审批与任务恢复：**按工具风险等级实施确认与审批；将审批绑定具体调用参数，结合 RBAC、组织作用域及幂等控制防止越权和重复写入；使用 SQLite Checkpoint 保存图状态，支持等待审批后的恢复执行。',
        '**AI 交互与可追溯性：**实现对话面板、工具执行状态、审批操作及文档编辑；通过 SSE 展示增量结果，以持久化事件序号支持断线补发，结合前端状态归并与快照恢复保持任务进度一致。',
        '**交付集成与验证：**实现 GitLab 分支、MR、Pipeline 与 Webhook 对接模块，结合 Outbox 与状态校验处理异步结果；构建发布预检、审批后模拟部署及自动化回归，使用 Docker Compose 完成应用部署。',
        '**当前实现边界：**个人项目已部署；知识库索引使用测试向量化实现，发布执行采用模拟方式，尚无真实团队规模与生产检索效果数据。',
      ],
    },
    {
      num: '02',
      slug: 'mealmind',
      name: 'MealMind · AI 外卖决策平台',
      role: '全栈开发',
      period: '个人项目',
      pills: ['副项目 · C 端', '已部署上线'],
      note: '移动端 H5 + Java 业务服务 + Python Agent 运行时',
      stack: ['LangGraph', '决策模型（System One）打分', '结构化输出', 'SSE', 'React', 'TypeScript', 'Vite', 'TanStack Query', 'Zustand', 'Spring Boot', 'MyBatis-Plus', 'FastAPI', 'MySQL', 'Redis', 'Docker Compose'],
      aiStack: ['LangGraph', '决策模型（System One）打分', '结构化输出', 'SSE'],
      desc: '用一句自然语言完成外卖决策：给出 3–5 张带逐维度评分与依据的候选卡片，预算、忌口与营业状态等硬性约束由代码保证零违规，整条决策链路的成本与延迟可评测、可计量。',
      points: [
        '**一句话决策链路：**自然语言需求经生成式模型转为结构化偏好，信息不足时最多 1 轮 2 问；硬约束过滤、逐菜五维打分、加权排序与理由生成在 3 轮对话内给出可直接加购的候选卡片。',
        '**硬约束代码化：**预算、忌口、营业状态与时效由 Java 约束引擎逐条过滤并产出过滤明细，评测门禁零违规；模型只负责语义，不参与约束与价格计算。',
        '**快慢分工与降级：**决策模型对每道候选并行提交 5 个打分问题与 1 个忌口护栏，原生返回概率分布与置信度；生成式模型负责理解与表达，理由只允许引用给定事实。模型不可用时按三档降级切换规则分，并冷却探测恢复。',
        '**可评测与可计量：**Golden 用例批跑、稳定性复跑与校准分桶构成评测闭环；SSE 事件按 seq 编号支持断线续订；单次决策成本（cost_yuan）与端到端 P95 落库，评测看板可查。',
        '**当前实现边界：**商家与菜品均为模拟数据（40 家商家、约 600 道菜品），不含结算与履约；演示规模不与平台体量对标，评测数据为演示期口径。',
      ],
    },
  ],
  skillGroups: [
    {
      title: 'AI / 大模型应用',
      en: 'AI & LLM',
      tags: [
        {
          name: 'LangGraph',
          hot: true,
        },
        {
          name: 'FastAPI',
          hot: true,
        },
        {
          name: '结构化输出',
          hot: true,
        },
        {
          name: '受控工具调用',
        },
        {
          name: 'Checkpoint / 审批恢复',
        },
        {
          name: '大模型 API 接入',
        },
        {
          name: 'Claude Agent SDK 接入',
        },
        {
          name: 'Skills / 文件生成联调',
        },
        {
          name: 'RAG 链路理解',
        },
        {
          name: 'Qdrant 索引 / 过滤',
        },
        {
          name: '概率打分 / 置信度',
        },
      ],
    },
    {
      title: '后端与数据',
      en: 'Backend',
      tags: [
        {
          name: 'Java',
          hot: true,
        },
        {
          name: 'Spring Boot',
          hot: true,
        },
        {
          name: 'Python',
          hot: true,
        },
        {
          name: 'MyBatis / MyBatis-Plus',
        },
        {
          name: 'MySQL',
        },
        {
          name: 'Redis',
        },
        {
          name: 'Flyway',
        },
        {
          name: 'REST API',
        },
        {
          name: 'RBAC / 组织隔离',
        },
        {
          name: '幂等 / 事务 / Outbox',
        },
      ],
    },
    {
      title: '前端开发',
      en: 'Frontend',
      tags: [
        {
          name: 'React',
          hot: true,
        },
        {
          name: 'TypeScript',
          hot: true,
        },
        {
          name: 'Next.js',
          hot: true,
        },
        {
          name: 'React Router',
        },
        {
          name: 'Vite',
        },
        {
          name: 'TanStack Query',
        },
        {
          name: 'Zustand',
        },
        {
          name: 'H5 / 小程序',
        },
      ],
    },
    {
      title: '交互与工程化',
      en: 'Engineering',
      tags: [
        {
          name: 'SSE 流式响应',
          hot: true,
        },
        {
          name: '事件续传 / 快照恢复',
          hot: true,
        },
        {
          name: 'Docker Compose',
          hot: true,
        },
        {
          name: '契约校验',
        },
        {
          name: '单元测试',
        },
        {
          name: '端到端回归',
        },
        {
          name: 'Golden Case 评测',
        },
        {
          name: '故障降级',
        },
      ],
    },
  ],
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
  languages: [
    {
      name: '中文',
      level: '母语',
    },
    {
      name: '日语',
      level: '日本留学经历 · 2015–2023',
    },
  ],
  footerNote: 'ForgeAI 与 MealMind 均为已部署的个人全栈项目 · 可提供项目演示与源码讲解，具体实现范围见项目说明',
};
