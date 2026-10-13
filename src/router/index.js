import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'YJX · AI 全栈开发工程师 — 个人门户' },
  },
  {
    path: '/resume',
    name: 'resume',
    component: () => import('@/views/ResumeView.vue'),
    meta: { title: '杨佳锡 · AI 全栈开发工程师 · 简历' },
  },
  {
    path: '/projects',
    name: 'projects',
    component: () => import('@/views/ProjectsView.vue'),
    meta: { title: '项目 · Projects — YJX' },
  },
  {
    path: '/projects/forgeai',
    name: 'project-forgeai',
    component: () => import('@/views/ProjectDetailView.vue'),
    props: { slug: 'forgeai' },
    meta: { title: 'ForgeAI · AI 研发交付工作台 — YJX', immersive: true },
  },
  {
    path: '/projects/mealmind',
    name: 'project-mealmind',
    component: () => import('@/views/ProjectDetailView.vue'),
    props: { slug: 'mealmind' },
    meta: { title: 'MealMind · AI 外卖决策平台 — YJX', immersive: true },
  },
  {
    path: '/engineering',
    name: 'engineering',
    component: () => import('@/views/EngineeringView.vue'),
    meta: { title: '工程实录 · AI 协作 — YJX' },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: '页面不存在 — YJX' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title
})

export default router