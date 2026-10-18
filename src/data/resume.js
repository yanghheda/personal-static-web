/** 简历内容：依据 yangjiaxi-ai-fullstack.html 与 AI 全栈面试参考手册整理。**文字** 为加粗，==文字== 为强调。 */

export const resume = {
  profile: {
    name: '杨佳锡',
    nameEn: 'Yang Jiaxi',
    avatar: '杨',
    target: 'AI 全栈开发工程师',
    targetSub: '大模型应用方向',
    lede: 'From e-commerce interfaces to AI applications and full-stack projects.',
    tags: ['28 岁', '海外硕士', '约 3 年开发经验', '随时到岗'],
  },
  contacts: [
    {
      key: 'TEL',
      kind: 'phone',
      value: '13944258090',
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
      key: 'PORTAL',
      kind: 'link',
      value: 'www.yjxai.cloud',
      href: 'https://www.yjxai.cloud',
    },
    {
      key: 'GITHUB',
      kind: 'link',
      value: 'github.com/yanghheda',
      href: 'https://github.com/yanghheda',
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
  summary: ['约 **2 年电商前端开发、7 个月金融 AI 应用开发**经历，覆盖 C 端 H5 / 小程序与 B 端商家 SaaS，信息工程专业海外硕士。', '在 **iFinD AI Chat** 中负责==专家模式前端渲染与交互改造==，参与 Agent 能力接入。', '以 **React / TypeScript** 为基础，通过 **Python / FastAPI、Java / Spring Boot** 拓展全栈能力；已部署 ==ForgeAI== 与 ==MealMind==，具备 Agent 编排、受控工具调用、模型评测与部署上线的项目实践。'],
  highlights: [
    {
      n: '1',
      title: '从电商前端到金融 AI 产品',
      desc: '约 2 年电商 H5、小程序与商家 SaaS 前端经验；在同花顺 iFinD AI Chat 负责专家模式交互改造，参与 Claude Agent SDK、Skills 与多格式文件生成的能力接入和前后端联调。',
    },
    {
      n: '2',
      title: 'Agent 编排与工具治理',
      desc: '以 LangGraph 有界循环驱动交付：按阶段裁剪上下文与可用工具，权限、幂等与状态机校验统一留在服务端，Agent 仅经受控 Tool API 执行、不持有业务凭据。',
    },
    {
      n: '3',
      title: '人工审批与任务恢复',
      desc: 'HIGH 风险动作冻结 Tool、调用参数与资源版本，由非发起人独立审批；SQLite Checkpoint 保存图状态、审批后重校验再恢复，持久事件序号支持 SSE 断线补发。',
    },
    {
      n: '4',
      title: '确定性边界与降级',
      desc: '硬约束过滤、价格计算与加权排序全部由业务代码执行，模型只负责理解与表达；失败按「单菜规则分 → 整轮规则模式 → 冷却探测恢复」三档降级，降级状态对用户可见。',
    },
    {
      n: '5',
      title: '可评测、可计量',
      desc: 'Golden 用例批跑、稳定性复跑与置信度校准构成评测闭环：硬约束零违规、通过率 98%、端到端 P95 目标 ≤3s，单次决策成本与各阶段耗时落库、看板可查。',
    },
  ],
  experience: [
    {
      company: '同花顺',
      role: 'AI 应用开发工程师',
      period: '2026.01 — 2026.08',
      pills: ['互联网金融', 'iFinD AI Chat · 专家模式'],
      points: ['**专家模式交互改造：**负责专家模式相关前端开发，改造对话内容的渲染与交互方式，配合专家模式功能迭代完成界面适配和前后端联调。', '**Agent 能力接入：**参与基于 Claude Agent SDK 的后端能力接入与联调，配合完成 Skills 集成及多格式文件生成相关功能，衔接 Agent 能力与对话界面。'],
    },
    {
      company: '爱库存',
      role: '前端开发工程师',
      period: '2023.07 — 2025.07',
      pills: ['电商', 'C 端交易平台 / B 端商家 SaaS'],
      points: ['负责电商平台 C 端 H5、微信小程序开发，覆盖商品、交易、营销及大促活动。', '参与 B 端商家 SaaS 开发，实现商品、订单管理及数据看板，沉淀业务组件。'],
    },
  ],
  projects: [
    {
      num: '01',
      slug: 'forgeai',
      name: 'ForgeAI · AI 研发交付工作台',
      role: '全栈开发',
      period: '个人项目',
      pills: ['个人项目 · 全栈', 'B 端 · 已部署上线'],
      note: 'Web 工作台 + Java 业务服务 + Python Agent Runtime',
      stack: ['LangGraph', '结构化输出', 'SQLite Checkpoint', 'SSE', 'Vite', 'React 19', 'TypeScript', 'TanStack Query', 'Zustand', 'Spring Boot', 'MyBatis-Plus', 'FastAPI', 'MySQL', 'Redis', 'Qdrant', 'Docker Compose'],
      aiStack: ['LangGraph', '结构化输出', 'SQLite Checkpoint', 'SSE'],
      desc: '面向企业产研协作，将需求、PRD、设计、开发、测试与发布管理汇集到同一工作台，通过分阶段 Agent 辅助生成交付物、调用业务工具并推进流程。',
      points: [
        '**全栈架构与业务流程：**以 Monorepo 组织 Web 工作台、Java 业务服务与 Python Agent Runtime 三层架构；由 Java 统一管理权限、状态机与事务，Agent 仅经受控 Tool API（短时 Run 级 JWT）执行业务操作、不持有业务凭据；以交付图串联需求、文档版本、任务、MR / Pipeline 与发布信息。',
        '**Agent 编排与执行约束：**基于 LangGraph 搭建“计划—工具选择—守卫—执行—观察—收敛”有界循环；按产品、设计、开发、测试、发布阶段注入工具白名单与最小化上下文；实现结构化输出与流式生成，经 Pydantic 与 JSON Schema 双层校验，以工具调用预算、图递归上限与模型调用超时重试约束执行。',
        '**人工审批与任务恢复：**按 Tool / Skill 契约的权限码与三级风险（LOW / MEDIUM / HIGH）分流，HIGH 强制人工审批且申请人不可自批；审批冻结参数哈希与资源版本并设 15 分钟 TTL，结合 RBAC、公司作用域及 runId + toolCallId 幂等键（命中即重放）防止越权和重复写入；SQLite Checkpoint 保存图状态，等待审批后由 Outbox 驱动恢复执行。',
        '**AI 交互与可追溯性：**实现对话面板、实时工具执行状态、审批操作及 Tiptap 文档编辑；通过 SSE 展示回答、思考与工具事件增量，以持久化事件序号支持断线补发；结合前端增量归并、快照拉取与轮询兜底保持任务进度一致。',
        '**交付集成与验证：**实现 GitLab 分支、MR、Pipeline 与 Webhook 对接；Webhook 队列幂等去重、按远端时间戳丢弃迟到事件并定时对账收敛；发布前执行 6 条确定性预检，审批通过后触发模拟部署；以 CI 质量门禁、集成测试与冒烟回归脚本保障交付质量，三应用经 Docker Compose 容器化编排部署。',
      ],
    },
    {
      num: '02',
      slug: 'mealmind',
      name: 'MealMind · AI 外卖决策平台',
      role: '全栈开发',
      period: '个人项目',
      pills: ['个人项目 · 全栈', 'C 端 · 已部署 · 模拟数据'],
      note: '移动端 H5 + Java 业务服务 + Python Agent 运行时',
      stack: ['LangGraph', '阿里云百炼（决策模型打分）', '通义千问（理解与生成）', '结构化输出', 'SSE', 'React', 'TypeScript', 'Vite', 'TanStack Query', 'Zustand', 'Spring Boot', 'MyBatis-Plus', 'FastAPI', 'MySQL', 'Redis', 'Docker Compose'],
      aiStack: ['LangGraph', '决策模型（阿里云百炼）', '结构化输出', 'SSE'],
      desc: '面向外卖「不知道吃什么」的决策场景，输入一句自然语言，3 轮对话内给出 3–5 张带逐维度评分、依据与置信度的候选卡片；硬性约束（预算 / 忌口 / 营业状态）由代码保证零违规。',
      points: ['**架构与职责边界：**H5 / Java 业务服务 / Python Agent 三层分层，模型只负责语义，硬约束过滤、价格计算、加权排序与落库全部由 Java 完成；Agent 不接触业务存储与凭据，不可用时仅推荐降级。', '**快慢模型分工与打分：**决策模型逐菜按口味、预算、时效、口碑、场景五维打分并返回概率分布与置信度，不生成文本；生成式模型负责理解、追问与理由表达；综合分与展示顺序由代码合成，模型不可调整。', '**降级、恢复与评测：**Scorer 适配层提供决策模型 / 规则分双实现，单菜失败降规则分、失败超阈值整轮切规则模式；SSE 分步进度支持断线补齐与会话恢复；以 Golden 用例集、重复复跑与置信度校准评测，复用线上同一实现，本地评测批实测硬约束零违规、通过率 98%、端到端 P95 约 3s，成本接入看板。', '**部署与交付：**三容器 Docker Compose 接入服务器共享基础设施，复用边缘 nginx 反代；配置 GitHub Actions 流水线，构建镜像推 GHCR 后 SSH 部署，按变更路径只重建受影响服务，公网 HTTPS 可访问。'],
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
          name: 'RAG 链路理解（分块 / 索引 / 检索 / 引用校验）',
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
  footerNote: 'ForgeAI 与 MealMind 均为已部署的个人全栈项目 · 演示地址 forgeai.yjxai.cloud / mealmind.yjxai.cloud · 可提供源码讲解，具体实现范围见项目说明',
};
