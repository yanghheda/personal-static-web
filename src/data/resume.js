/** 简历内容：依据本地最新简历（杨佳锡_AI全栈开发工程师_简历_上海）整理。**文字** 为加粗，==文字== 为强调。 */

export const resume = {
  profile: {
    name: '杨佳锡',
    nameEn: 'Yang Jiaxi',
    avatar: '杨',
    target: 'AI 全栈开发工程师',
    targetSub: 'AI 前端 · AI 应用',
    lede: 'From e-commerce frontend to AI full-stack delivery.',
    tags: ['28 岁', '海外硕士', '3 年研发经验', '随时到岗'],
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
      value: '上海',
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
  summary: [
    '3 年研发经验，具备 **AI 全栈落地能力**，能按业务目标反推方案，独立完成从交互、服务端到 Agent 流程的端到端交付。拥有==电商营销、商家云平台、AI 智能客服、金融 AI 业务方向==的研发经历。',
    '借助 AI 编程工具独立完成并部署 **ForgeAI**，覆盖 React / Java / Python 三层实现、AI 交互、Agent 编排与治理、容器化交付；能界定 AI 能力边界并验证产出。',
  ],
  highlights: [
    {
      n: '1',
      title: '3 年研发，四类业务方向',
      desc: '电商营销、商家云平台、AI 智能客服与金融 AI 业务；覆盖 C 端 H5 / 小程序、B 端配置台与审批流，以及 AI 对话与 Agent 能力接入。',
    },
    {
      n: '2',
      title: '可追踪的 AI 交互',
      desc: '负责流式回答、思考过程与工具调用结果的渲染与交互改造；前端按 sequence 去重续读 SSE 事件，断线以快照收敛缺口，公网 30 次多步任务首反馈中位 0.7s、30/30 次事件序号无缺口。',
    },
    {
      n: '3',
      title: '受控 Agent 与人工审批',
      desc: 'Agent 仅通过短时 Run 级 JWT 调用受控 Tool API，不持有业务凭据；按三级风险分流，HIGH 强制非发起人审批，以参数哈希、资源版本、幂等键与 Checkpoint / Outbox 保证可恢复。',
    },
    {
      n: '4',
      title: '有界编排与工程边界',
      desc: '基于 LangGraph 有界循环，按交付阶段注入工具白名单与最小化上下文，叠加工具预算、递归上限与模型超时重试；越界调用在 Runtime 拦截，不依赖提示词约束。',
    },
    {
      n: '5',
      title: '性能与稳定性优化',
      desc: '智能客服请求复用与短 TTL 缓存使 AI 会话请求量减少 18%，会话恢复成功率由约 70% 提升至 99%，长列表窗口化渲染使媒体流量降低 35%。',
    },
  ],
  experience: [
    {
      company: '同花顺',
      role: 'AI 应用开发工程师（前端方向）',
      period: '2026.01 — 2026.08',
      pills: ['互联网金融', 'iFinD AI Chat'],
      points: [
        '**AI 对话与 Agent 能力：**负责流式回答、思考过程与工具调用结果的渲染与交互改造；负责专家模式前端与多格式文件渲染，参与 Claude Agent SDK、Skills 能力接入联调。',
        '**AI 定时任务模块：**负责任务创建、列表 / 详情、执行记录与终端提醒接入的前端开发与接口联调；与 Java 服务端明确接口契约与异常口径。',
        '**团队共建：**部门双周分享会主讲 2 次；参与公司 AI Native 开发平台共建，负责 2 个 Skill 的开发。',
      ],
    },
    {
      company: '爱库存',
      role: '前端开发工程师（后半年参与全栈开发）',
      period: '2023.07 — 2025.07',
      pills: ['电商', 'C 端交易平台 / B 端商家云平台'],
      points: [
        '**C 端 H5 和小程序：**负责营销会场、店铺页的 H5 和小程序开发，覆盖页面搭建、交互实现、接口联调与多端适配，支持营销活动上线与迭代。',
        '**B 端商家云平台：**负责商家营销激励中心（满返 / 满赠 / 拓新 / PK）的配置台与商家 BP 审批模块前端开发；参与营销相关聚合接口开发。',
        '**智能客服：**负责饷店 H5 智能客服的 AI 接入、消息渲染与性能优化，统一消息协议并补齐异常兜底与会话恢复。',
      ],
    },
  ],
  projects: [
    {
      num: '01',
      slug: 'forgeai',
      name: 'ForgeAI · AI Native 研发交付工作台',
      role: '全栈开发',
      period: '2026.07 — 2026.09',
      pills: ['研发协作 · 个人项目', '已部署上线'],
      note: 'forgeai.yjxai.cloud',
      stack: ['React / TypeScript / Vite', 'TanStack Query / Zustand', 'Spring Boot / MyBatis-Plus', 'FastAPI / LangGraph', 'MySQL / Redis / Qdrant', 'Docker Compose'],
      aiStack: ['FastAPI / LangGraph'],
      desc: '面向小团队及公司内部研发团队的自托管 B 端研发交付工作台，以统一工作项和交付图串联需求、文档、任务、MR / CI 与发布状态，覆盖产品、UX、开发、测试与发布的完整流程；内置 Agent 辅助生成文档、拆解任务及调用受控工具，减少跨阶段重复操作、提升交付效率。',
      points: [
        '**受控工具调用：**Agent 仅通过受控 Tool API（短时 Run 级 JWT）操作业务对象，不持有长期业务凭据；服务端按权限码与资源归属拦截越权，按状态机拦截非法状态流转。',
        '**可追踪的 AI 交互：**前端订阅带序号 SSE 事件流，对话流与轨迹按 sequence 去重续读，审批 / 终态事件更新 Run 状态；断线以快照重取收敛缺口。公网 30 次多步任务首反馈中位 0.7s、端到端 P95 26.9s，30/30 次任务事件序号无缺口。',
        '**执行可靠性：**按三级风险分流，HIGH 强制人工审批且申请人不可自批；审批冻结参数哈希与资源版本，runId + toolCallId 幂等拦截重复写入，Checkpoint 与 Outbox 支持审批后继续执行。',
        '**有界执行：**基于 LangGraph 有界循环，按交付阶段注入工具白名单与最小化上下文，叠加工具预算、递归上限与模型超时重试；越界调用在 Runtime 拦截，不依赖提示词约束。',
        '**交付集成：**打通 GitLab 分支、MR、Pipeline 与 Webhook，队列幂等去重 + 迟到事件丢弃 + 建分支 / MR reconcile；发布前执行 6 条确定性预检，审批通过后触发发布流水线（模拟环境执行）。',
      ],
    },
    {
      num: '02',
      name: 'AI 智能客服 H5 · 私域电商平台饷店',
      role: '前端开发',
      period: '2024.10 — 2025.01',
      pills: ['公司项目 · 爱库存', 'AI 智能助手接入'],
      note: '上线后 AI 自助解决率提升约 10%',
      stack: ['Next.js / React', 'Tailwind CSS', 'Zustand', 'AI 智能助手接入'],
      aiStack: ['AI 智能助手接入'],
      desc: '饷店 H5 中的客服模块，技术重构的同时集成 AI 智能助手，在保留常规售后能力的基础上降低人工转接率、提升会话稳定性；上线后 AI 自助解决率提升约 10%。',
      points: [
        '**消息协议与发送状态：**将文本 / 卡片 / 图片 / 附件收敛为统一消息模型，分离用户消息发送状态与 AI 回复流式状态；超时先查消息状态，重试复用 clientMsgId，由服务端幂等去重，避免重复发送与假失败。',
        '**转人工交接：**按用户主动、连续失败、超时及业务下发的敏感意图触发转人工，转接时组装近期对话、订单 / 商品上下文与 AI 摘要；转接后前端停止渲染后续 AI 流，排队 / 已接入 / 失败三态可恢复，避免用户重复描述。',
        '**在途请求复用与缓存：**以「会话 + 上下文指纹 + 归一化问题」为键复用进行中请求，成功结果短 TTL 缓存、失败不缓存；客服页 AI 会话请求量减少 18%，缓存命中等待缩短约 120ms。',
        '**会话持久化：**内存快照承载首屏、IndexedDB 兜底持久化，写入节流 + 容量上限 + LRU 淘汰；刷新或切后台恢复最近消息、顺序与发送状态，恢复成功率由约 70% 提升至 99%。',
        '**长列表加载：**历史消息按可视区域窗口化渲染，仅保留可视区与缓冲区节点，图片与附件按可视区域懒加载、首屏不懒加载；客服页媒体流量降低 35%，减少长会话 DOM 压力与首屏阻塞。',
      ],
    },
    {
      num: '03',
      name: '商家营销激励中心（B 端）· 商家云平台',
      role: 'B 端前端开发',
      period: '2024.01 — 2024.10',
      pills: ['公司项目 · 爱库存', '活动配置 · 规则管理 · 审批流'],
      note: '满返 / 满赠 / 拓新 / PK 四类活动',
      stack: ['React', 'Vite', 'Ant Design', 'constate', 'MicroApp 微前端'],
      aiStack: [],
      desc: '面向商家 / 运营的营销激励配置平台，支撑满返、满赠、拓新、PK 4 类任务型活动从创建、规则配置到审批生效的完整流程；活动在 C 端激励中心承接店主参与，形成「配置—审批—生效」闭环。',
      points: [
        '**活动表单抽象：**将 4 类活动的初始化、类型差异、字段联动与提交收敛为自定义 Hook，入参为活动类型与模式，页面只保留布局与字段声明；公共字段与差异字段按类型配置注入，新增活动类型不再复制整套页面，同类配置页开发工时估算减少约 80%。',
        '**动态字段与联动校验：**用 Form.List 承载规则行动态增删，dependencies 驱动依赖字段重校验；金额、次数、时间边界与跨字段规则收敛为 1 套公共校验，4 类活动按类型配置复用。',
        '**状态域拆分：**基于 constate 按活动配置、列表、审批拆分独立 Context，全局只保留用户与权限等低频状态，页面态留在页面；消费者只订阅所属业务域，避免单一全局 store 变更引发全量重渲染。',
        '**业务组件封装：**二次封装活动类型选择器、金额 / 次数输入与审批状态操作区，统一 value / onChange 受控契约、只读权限与错误提示；底层 props 透传，组件库升级在封装层消化。',
        '**列表与加载优化：**活动列表的筛选、分页、请求状态与 URL 参数联动，刷新或分享链接可还原查询条件；非核心模块路由级懒加载，输入类交互做防抖，减少无效请求与首屏资源。',
      ],
    },
  ],
  skillGroups: [
    {
      title: '前端',
      en: 'Frontend',
      tags: [
        {
          name: 'TypeScript',
          hot: true,
        },
        {
          name: 'React / Next.js',
          hot: true,
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
          name: 'SSE 流式渲染 / 会话恢复 / Agent 执行可视化',
          hot: true,
        },
        {
          name: 'H5 / 微信小程序',
        },
      ],
    },
    {
      title: '后端与中间件',
      en: 'Backend',
      tags: [
        {
          name: 'Node.js',
        },
        {
          name: 'Java / Spring Boot',
          hot: true,
        },
        {
          name: 'Python / FastAPI',
          hot: true,
        },
        {
          name: 'MySQL',
        },
        {
          name: 'Redis',
        },
        {
          name: 'Kafka',
        },
        {
          name: 'MyBatis-Plus',
        },
        {
          name: 'JWT / RBAC',
        },
        {
          name: 'Spring Cloud（了解）',
        },
      ],
    },
    {
      title: 'AI Agent',
      en: 'Agent',
      tags: [
        {
          name: 'LangGraph 有界 Agent Loop',
          hot: true,
        },
        {
          name: 'Tool Calling',
          hot: true,
        },
        {
          name: 'Prompt / Context Engineering',
        },
        {
          name: '结构化输出与流式生成',
          hot: true,
        },
        {
          name: 'MCP（了解协议）',
        },
        {
          name: 'LangChain / LlamaIndex（了解）',
        },
        {
          name: 'Planning / Memory / 多智能体（了解）',
        },
      ],
    },
    {
      title: 'RAG 与数据',
      en: 'RAG',
      tags: [
        {
          name: '文档解析 / 切分 / Embedding',
          hot: true,
        },
        {
          name: 'Qdrant',
          hot: true,
        },
        {
          name: '引用溯源 / 权限过滤',
        },
        {
          name: '混合检索 / 重排（了解）',
        },
      ],
    },
    {
      title: '工程化与部署',
      en: 'DevOps',
      tags: [
        {
          name: 'Linux',
        },
        {
          name: 'Nginx',
        },
        {
          name: 'Docker / Compose',
          hot: true,
        },
        {
          name: 'GitHub Actions',
          hot: true,
        },
        {
          name: 'CI 门禁',
        },
        {
          name: '日志 / 指标 / Trace（了解）',
        },
      ],
    },
    {
      title: 'AI 编程实践',
      en: 'AI Coding',
      tags: [
        {
          name: 'Codex',
          hot: true,
        },
        {
          name: 'Trae',
          hot: true,
        },
        {
          name: '需求拆解 / 生成 / 审查 / 验证与测试',
        },
      ],
    },
  ],
  education: [
    {
      degree: '计算机软件工程',
      badge: '硕士',
      school: '中部大学（日本）',
      period: '2021.04 — 2023.03',
    },
    {
      degree: '计算机软件工程',
      badge: '本科',
      school: '名古屋 HAL（日本）',
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
  footerNote: 'ForgeAI 已部署上线 · forgeai.yjxai.cloud · 可提供源码讲解，具体实现范围见项目说明；公司项目按脱敏口径说明',
};
