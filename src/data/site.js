import { projectStories } from './projectStories';

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
  phoneBase64: 'MTM5NDQyNTgwOTA=',
  icp: '吉ICP备2026009438号-1',
};

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
    desc: '个人全栈项目：ForgeAI 研发交付工作台与 HengPick 智能购物决策，展示业务流程、架构与关键实现。',
    domain: 'yjxai.cloud/projects',
    tags: ['作品集'],
  },
  {
    num: '03',
    title: '实验室',
    en: 'Lab',
    desc: '计划整理 Agent 编排、受控工具调用与检索实验，提供可交互的 AI 应用演示。',
    domain: '即将上线',
    tags: ['Soon'],
    soon: true,
  },
  {
    num: '04',
    title: '笔记',
    en: 'Notes',
    desc: '技术沉淀：前端与跨端交互、Agent 编排、审批恢复、业务校验与 AI 应用工程实践。',
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
];

export const stats = [
  {
    n: '02',
    unit: 'YEARS',
    label: '约 2 年电商前端开发经历，覆盖 C 端 H5 / 小程序与 B 端商家 SaaS。',
  },
  {
    n: '07',
    unit: 'MONTHS',
    label: '金融 AI 应用开发经历，负责 iFinD AI Chat 专家模式前端改造，参与 Agent 能力接入。',
  },
  {
    n: '03',
    unit: 'TRACKS',
    label: '全栈实践的三个方向：前端与跨端交互、Java 业务服务、Python / Agent 编排。',
  },
];

export const nowItems = [
  {
    en: 'Doing',
    title: '正在做',
    desc: '围绕 ForgeAI 与 HengPick 整理全栈项目实践，梳理工具调用、人工审批、任务恢复和跨端业务流程。',
  },
  {
    en: 'Learning',
    title: '正在学',
    desc: '继续深入真实数据下的检索与引用校验、Agent 任务可靠性，以及模型输出和确定性业务规则的边界。',
  },
  {
    en: 'Looking for',
    title: '正在找',
    desc: 'AI 全栈 / AI 应用开发岗位。目前在上海，随时到岗，希望进一步承担从前端交互到服务接口与 Agent 流程的完整交付。',
  },
];

/** 项目摘要与详情共用经简历和源仓库核对的内容。 */
export const projects = Object.entries(projectStories).map(([slug, project]) => ({
  slug,
  name: `${project.name} · ${project.category}`,
  period: project.role,
  kind: slug === 'forgeai' ? 'B 端 · 产研协作' : 'C 端 · 购物决策 Demo',
  online: true,
  status: project.status,
  desc: project.problem,
  stack: project.stack,
  points: project.chapters.map((chapter) => chapter.text),
  repo: '',
}));
