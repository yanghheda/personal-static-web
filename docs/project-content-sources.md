# 项目详情页内容与截图维护

核对日期：2026-10-13。详情页与项目列表共用 `src/data/projectStories.js`，不从原站点的简历或项目文案推导内容。

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

### MealMind

源仓库：`../mealmind`。

- `README.md`：项目范围、三层架构、里程碑、部署形态与成本 / 延迟说明。
- `docs/PRD.md`：产品目标、硬约束规则（§5.3）、评分规格（§5.4）、降级表（§5.7）、评测指标（§7.2）与 Go / No-Go 实测（§7.5）。
- `docs/tech-design.md`：接口契约（23 个对外接口 + 内部接口）、降级状态机（§6.1）、Scorer 双通道（§6.2）、部署拓扑（§8.1）。
- `services/biz`（Spring Boot）：约束引擎、加权排序、决策记录与成本计量。
- `services/agent`（FastAPI + LangGraph）：理解器、打分器、表达器与评测执行器。

商家与菜品均为模拟数据（40 家商家、约 600 道菜品），不含交易与结算；评测数字为演示期口径，不描述为线上指标，也不使用未提供的性能提升或商业数据。

## 截图替换

MealMind 的 5 张视觉素材已替换为线上演示站（https://mealmind.yjxai.cloud）的真实截图，采集日期 2026-10-18。ForgeAI 的 5 张视觉素材已替换为线上演示站的真实截图（游客账号 `guest@forge.demo`，采集日期 2026-10-19）。设备外框、滚动动画与流程图不依赖图片。

将截图放进 `public/images/projects/`，在 `src/data/projectStories.js` 中配置路径：

- 首屏：对应项目的 `screenshot.src`，例如 `/images/projects/forgeai-hero.webp`。
- 四个滚动章节：对应 `chapters[i].image`。
- 留空时继续显示主题色占位；有路径时显示图片，保留外框与布局。
- 截图需要遮蔽真实账号、密钥、内部地址等非展示内容。
- 采集时按框内屏幕的实际宽高比取景（桌面框首屏约 2.30:1、章节约 2.08:1，手机竖屏 208:450），铺满即可避免两侧留白。

MealMind 已接入的文件（`public/images/projects/`，390×844 视口、2x 采集、WebP q82，均为游客身份下的真实链路）：

| 文件 | 区域 | 内容 |
| --- | --- | --- |
| `mealmind-hero.webp` | 首屏 | 会话结果区：需求、过滤明细、推荐卡与五维分 |
| `mealmind-understand.webp` | 01 澄清需求 | 需求输入、我理解到的需求、追问卡 |
| `mealmind-constraints.webp` | 02 约束过滤 | 过滤明细（打烊 / 售罄 / 超预算 / 忌口 / 时效 / 截断）与进度步骤 |
| `mealmind-score.webp` | 03 打分与表达 | 第二张推荐卡：综合分、五维分、置信度、接近标记 |
| `mealmind-eval.webp` | 04 评测与恢复 | 评测看板：模式、Golden 用例数、单次决策成本与门限、最新批次指标 |

`mealmind-eval.webp` 取自一次真实触发的 50 条 Golden 用例批次（同步执行约几分钟），指标区展示 硬约束零违规率 / 理解准确率 / 候选充足率 / 空结果准确率 / Top1 口味命中率 / P95 延迟；稳定性三项需 `repeat > 1` 复跑，当前批次未触发，显示为「—」。

ForgeAI 已接入的文件（1512 宽、2x 采集、WebP q82，线上游客账号 `guest@forge.demo`）：

| 文件 | 区域 | 内容 |
| --- | --- | --- |
| `forgeai-hero.webp` | 首屏 | 需求详情：六阶段进度、需求材料、阶段操作面板 |
| `forgeai-context.webp` | 01 连接上下文 | PRD 文档：目录、正文渲染、已发布 v1 与需求状态 |
| `forgeai-agent.webp` | 02 受控执行 | Agent 指令中心：用户指令、思考过程、工具调用汇总与最终回答 |
| `forgeai-approval.webp` | 03 审批恢复 | 发布管理：发布单（待审批 / HIGH）、六项确定性预检全部通过、HIGH 风险审批卡等待审批 |
| `forgeai-delivery.webp` | 04 追踪交付 | 开发工作区：合并请求 1/1、Pipeline 1/1、开发任务 1/1、交付链路（分支 → 已合并 MR → Pipeline 成功）与 QA 门禁已通过 |

演示数据为一条真实走通全流程的需求：`REQ-1 交付风险预警：超期需求自动提醒与升级`，处于 `READY_FOR_RELEASE`（可发布），含五项需求材料、已发布的 PRD v1、UX 文档与验收后的开发 / QA 任务；发布单 `v1.0.0 / production` 预检六项全部通过，`Deployment #1` 停留在**等待 HIGH 审批**（发起人自审被服务端 `SELF_APPROVAL_FORBIDDEN` 拒绝，故未审批）。**该游客账号是共享账号（ADR-028），访客之间不隔离，重复进入不重置数据。** 采集期间产生的空白 Agent 会话已清理。

| 项目 | 区域 | 建议截图 | 状态 |
| --- | --- | --- | --- |
| ForgeAI | 首屏 | 需求详情与阶段导航（原为「Agent 对话面板」，模型不可用已改文案） | ✅ |
| ForgeAI | 01 | 需求详情 / PRD 与阶段导航 | ✅ |
| ForgeAI | 02 | Agent 指令中心 / 工具执行过程 | ✅ |
| ForgeAI | 03 | 发布预检 / HIGH 审批 | ✅ 截取「预检全部通过 + 等待另一位有权限用户审批」 |
| ForgeAI | 04 | 开发页 / MR、Pipeline 与执行轨迹 | ✅ 线上 `FORGE_GITLAB_PROVIDER=demo` 下采集（`DemoSourceControlProvider` 模拟分支 / MR / Pipeline），页面未宣称已接入真实 GitLab |

线上实测：向 `REQ-1` 下达指令后，Run 曾在 445ms 内以 `AGENT_MODEL_UNAVAILABLE` 失败，执行轨迹页记录「运行终态 · 运行失败」。根因是 `forge-agent` 原先只挂 `internal: true` 的 `forge-internal` 网络，无公网出口、DNS 不转发外部域名（容器内解析 `dashscope.aliyuncs.com` 报 `gaierror(-3, 'Temporary failure in name resolution')`）；对比 mealmind-agent 挂 `[internal, egress]` 双网络则正常。已为 `forge-agent` 追加普通 bridge 网络 `egress`（仓库 `deploy/compose.yml` 与线上 `/opt/forge-ai/deploy/compose.yml` 同步修改，线上 `.env` 备份为 `.env.bak-provider-<时间戳>`），修复后容器 DNS 解析返回 `8.140.217.18`、HTTPS 返回 401（可达），Agent 会话可真实执行并产生工具调用轨迹。

| 项目 | 区域 | 状态 |
| --- | --- | --- |
| MealMind | 首屏 | ✅ AI 决策会话 / 推荐卡片 |
| MealMind | 01 | ✅ 需求输入 / 澄清追问卡 |
| MealMind | 02 | ✅ 约束过滤 / 过滤明细与候选集 |
| MealMind | 03 | ✅ 推荐卡片 / 五维分与档位说明 |
| MealMind | 04 | ✅ 评测看板 / 成本与 P95 |

ForgeAI 使用横屏画面（`.desktop-screen`），MealMind 使用竖屏画面（`.phone-device`）。

竖屏手机的屏幕比例按 390:844 对齐 H5 截图，截图铺满整屏，两侧不留白、不裁切；状态栏作为独立 28px 条带浮在截图上方，底栏为纯白以便与应用自身顶栏连成一体。若某张截图的页面顶栏是深色，在该章节加 `chrome: 'dark'`，状态栏会跟随深色底（MealMind 04 评测看板即此情况）。

横屏桌面框不写死截图高度：`.project-screenshot` 用 `aspect-ratio: 3024 / 1456`（章节，2.08:1）、首屏桌面图用 `aspect-ratio: 3024 / 1314`（2.30:1）占据屏幕，高度随宽度推导。此前写死 `height: 320px` 会让框内屏幕比例随视口宽度漂移——实测视口 1100px 时 `cover` 已横向裁掉 17.9%、900px 时裁掉 31%（左侧导航被裁掉）；改为按比例占位后，1440 / 1280 / 1100 / 900 四个宽度下的裁切均 ≤ 0.23%（亚像素）。

采集时统一从**页面顶部**取景（浏览器窗口滚动到顶时的完整画面），保留应用顶栏、面包屑与页签，避免从页面中段裁起导致画面像「页面碎片」。桌面截图按 1512 宽取景后裁到 3024×1456（2.0769），与章节屏幕比例一致。

## 交互与构建

- 路由：`/projects/forgeai`、`/projects/mealmind`。
- 正常视口使用 sticky 场景，滚动推进四阶段，按钮可直接定位阶段。
- 短屏与 `prefers-reduced-motion` 模式使用自然文档流与按钮切换，避免内容被固定区域裁掉。
- 滚动监听合并到 requestAnimationFrame，离开页面时清理监听器、动画帧与 ResizeObserver。
- `npm run dev` 本地预览；`npm run build` 构建静态产物。沿用站点的 history 路由部署方式，需要服务器将页面路径回退到 `index.html`。
