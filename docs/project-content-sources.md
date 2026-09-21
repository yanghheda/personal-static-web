# 项目详情页内容与截图维护

核对日期：2026-09-21。详情页与项目列表共用 `src/data/projectStories.js`，不从原站点的简历或项目文案推导内容。

## 内容来源

用户指定的简历：`../yangjiaxi-resume/yangjiaxi-ai-fullstack.html` 中的「项目经历」。

### ForgeAI

源仓库：`../forge-ai`。

- `docs/adr/ADR-016-remove-workspace-project-scope.md`：当前为公司级资源范围，已移除 Workspace / Project Scope。
- `docs/adr/ADR-017-stage-aware-conversational-agent.md`：会话绑定需求、阶段选择 Skill、裁剪工具与上下文。
- `docs/adr/ADR-019-approve-only-final-release.md`：常规过程动作默认执行，最终发布 HIGH 独立审批。
- `docs/adr/ADR-021-role-model-global-and-domain-admins.md`：角色模型仍在演进，页面不宣传固定角色数量或尚未接入的后续审核流程。
- `forge-agent/src/forge_agent/gateway/runtime.py`：LangGraph、有界调用预算、SQLite Checkpoint。
- `forge-server/src/main/java/ai/forge/server/conversation/application/ConversationService.java`：阶段 Skill 与常规 `ALLOW` 策略。
- `packages/forge-contracts/tools/deploy_release.yaml`、`forge-server/src/main/java/ai/forge/server/release/domain/SimulatedDeploymentExecutor.java`：发布执行为明确标记的模拟部署，不是生产环境发布。
- `forge-web/src/features/console/components/agent-conversation-panel.tsx`、`release-workspace.tsx`：对话、审批、发布预检与快照呈现。
- `docs/design/forgeai-console/PAGE-MAP.md`：截图区域对应的实际页面。

部分 README 仍描述早期骨架阶段，与当前代码不一致；页面采用当前 ADR、实现与用户简历交叉核对后的描述。

### HengPick

源仓库：`../hengpick-smart-mall`。

- `README.md`：项目范围、跨端链路、模拟数据、事实边界、故障语义和评测边界。
- `services/agent-service/app/graph/workflow.py`：意图、追问、筛选、价格、评分与校验编排；不宣传每个内部节点均为真实模型调用。
- `services/commerce-api/src/main/java/com/hengpick/mall/decision/report/FinalReportValidator.java`：Schema、ID、硬条件、排序、金额、引用归属、版本校验。
- `apps/commerce-app/src/screens/`：商城、智能商城、商品详情与模拟结算页面。
- `apps/commerce-app/src/bridge/`、`apps/smart-mall-h5/src/bridge/`：RN ↔ H5 桥接。

商品、报价、评价与结算均为模拟场景。不将评测门禁阈值描述成真实线上准确率，也不使用未提供的性能提升或商业指标。

## 截图替换

当前视觉素材均为 CSS / div 占位，不是实际产品截图。设备外框、滚动动画与流程图不依赖图片。

将截图放进 `public/images/projects/`，在 `src/data/projectStories.js` 中配置路径：

- 首屏：对应项目的 `screenshot.src`，例如 `/images/projects/forgeai-overview.webp`。
- 四个滚动章节：对应 `chapters[i].image`。
- 留空时继续显示主题色占位；有路径时显示图片，保留外框与布局。
- 截图需要遮蔽真实账号、密钥、内部地址等非展示内容。

| 项目 | 区域 | 建议截图 |
| --- | --- | --- |
| ForgeAI | 首屏 | 需求详情与 Agent 对话面板 |
| ForgeAI | 01 | 需求详情 / PRD 与阶段导航 |
| ForgeAI | 02 | Agent 指令中心 / 工具执行过程 |
| ForgeAI | 03 | 发布预检 / HIGH 审批 |
| ForgeAI | 04 | 开发页 / MR、Pipeline 与执行轨迹 |
| HengPick | 首屏 | H5 决策报告 |
| HengPick | 01 | 需求输入 / 主动追问 |
| HengPick | 02 | 候选对比 / 价格与五维评分 |
| HengPick | 03 | 报告 / 评价与证据引用 |
| HengPick | 04 | RN 商品详情 / 模拟结算 |

ForgeAI 使用横屏画面，HengPick 使用竖屏画面。图片采用 contain 保持完整内容，不裁掉业务信息。

## 交互与构建

- 路由：`/projects/forgeai`、`/projects/hengpick`。
- 正常视口使用 sticky 场景，滚动推进四阶段，按钮可直接定位阶段。
- 短屏与 `prefers-reduced-motion` 模式使用自然文档流与按钮切换，避免内容被固定区域裁掉。
- 滚动监听合并到 requestAnimationFrame，离开页面时清理监听器、动画帧与 ResizeObserver。
- `npm run dev` 本地预览；`npm run build` 构建静态产物。沿用站点的 history 路由部署方式，需要服务器将页面路径回退到 `index.html`。
