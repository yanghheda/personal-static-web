<script setup>
import { computed, ref } from 'vue'
import { projectStories } from '@/data/projectStories'
import { site } from '@/data/site'
import { useScrollStory } from '@/composables/useScrollStory'
import ProjectDemo from '@/components/projects/ProjectDemo.vue'
import '@/styles/project-detail.css'

const props = defineProps({ slug: { type: String, required: true } })
const project = projectStories[props.slug]
const next = projectStories[project.next]
const root = ref(null)
const hero = ref(null)
const story = ref(null)
const { active, progress, manualMode, goToChapter } = useScrollStory(root, hero, story, project.chapters.length)
const chapter = computed(() => project.chapters[active.value])
</script>

<template>
  <main ref="root" class="project-detail" :class="`theme-${project.theme}`">
    <a class="detail-skip" href="#overview">跳到项目概览</a>
    <header class="detail-nav">
      <div class="detail-nav-inner"><RouterLink to="/projects" class="back-link"><span>←</span> 全部项目</RouterLink><a href="#top" class="detail-brand">{{ project.name }}<span> / PROJECT {{ project.index }}</span></a><nav aria-label="项目章节"><a href="#experience">体验</a><a href="#architecture">架构</a><RouterLink to="/resume" class="nav-resume">我的简历 ↗</RouterLink></nav></div>
      <div class="reading-progress" :style="{ transform: `scaleX(${progress})` }"></div>
    </header>

    <section id="top" ref="hero" class="detail-hero">
      <div class="hero-ambient" aria-hidden="true"></div>
      <div class="detail-container hero-copy"><p class="detail-kicker"><span class="live-dot"></span> SELECTED WORK / {{ project.index }} <span class="kicker-divider">—</span> {{ project.category }}</p><h1><span>{{ project.headline[0] }}</span><span class="hero-highlight">{{ project.headline[1] }}</span></h1><p class="hero-description">{{ project.intro }}</p><a href="#experience" class="detail-button">探索项目 <span>↓</span></a></div>
      <div class="hero-product"><div class="hero-product-label"><span>{{ slug === 'forgeai' ? 'FROM INTENT TO DELIVERY' : 'FROM A SENTENCE TO A MEAL' }}</span><span>{{ slug === 'forgeai' ? '有界智能，无缝协作' : '一句话，到有依据的一餐' }}</span></div><ProjectDemo :project="slug" :step="0" hero /></div>
      <div class="hero-bottom detail-container"><span>DESIGNED & BUILT BY 杨佳锡</span><span class="scroll-cue">SCROLL TO DISCOVER <i>↓</i></span><span>01 — 04</span></div>
    </section>

    <section id="overview" class="detail-overview detail-container">
      <div class="section-label" v-reveal><span>01 / THE IDEA</span><span>为什么做这个项目</span></div>
      <div class="overview-grid"><h2 v-reveal><span v-for="line in project.statement" :key="line">{{ line }}</span></h2><div v-reveal="100"><p class="overview-description">{{ project.problem }}</p><div class="project-byline"><span>{{ project.role }}</span><span>{{ project.status }}</span></div></div></div>
      <div class="detail-stats"><div v-for="(stat, i) in project.stats" :key="stat.label" v-reveal="i * 80"><strong :class="{ 'stat-wordmark': stat.value.length > 3 }">{{ stat.value }}</strong><span>{{ stat.label }}</span></div></div>
    </section>

    <section id="experience" ref="story" class="scroll-story" aria-label="滚动探索项目流程">
      <div class="story-sticky"><div class="detail-container story-inner"><div class="section-label"><span>02 / IN MOTION</span><span>{{ manualMode ? '点击阶段，探索流程 ↓' : '滚动，让流程展开 ↓' }}</span></div><div class="story-layout"><div class="story-copy"><div class="chapter-number">0{{ active + 1 }}<span> / 04</span></div><div class="chapter-text" :key="active"><p class="detail-kicker">{{ chapter.tag }}</p><h2>{{ chapter.title }}</h2><p>{{ chapter.text }}</p><span class="chapter-tech">{{ chapter.detail }}</span></div><nav class="chapter-nav" aria-label="选择演示阶段"><button v-for="(item, i) in project.chapters" :key="item.tag" :aria-current="active === i ? 'step' : undefined" :aria-label="`第 ${i + 1} 阶段：${item.label}`" @click="goToChapter(i)"><span>0{{ i + 1 }}</span><span>{{ item.label }}</span></button></nav></div><figure class="story-visual"><ProjectDemo :project="slug" :step="active" /><figcaption>{{ chapter.caption }}<span>流程示意 · 截图区域待替换</span></figcaption></figure></div></div></div>
    </section>

    <section id="architecture" class="detail-architecture detail-container"><div class="section-label" v-reveal><span>03 / UNDER THE HOOD</span><span>体验背后的工程</span></div><h2 class="section-title" v-reveal>{{ project.architectureTitle }}</h2><p class="section-intro" v-reveal>{{ project.architectureIntro }}</p><div class="architecture-grid"><article v-for="(layer, i) in project.layers" :key="layer.name" class="architecture-card" v-reveal="i * 100"><div class="layer-visual" :class="`layer-${i}`" aria-hidden="true"><i></i><i></i><i></i><span>{{ i === 0 ? '⌘' : i === 1 ? '◈' : '✳' }}</span></div><span class="layer-number">LAYER / {{ layer.symbol }}</span><h3>{{ layer.name }}</h3><p>{{ layer.text }}</p><span class="layer-tech">{{ layer.tech }}</span></article></div><div class="infra-row" v-reveal><span>FOUNDATION</span><span v-for="item in project.infra" :key="item">{{ item }}</span></div></section>

    <section class="detail-engineering detail-container"><div class="engineering-heading" v-reveal><p class="detail-kicker">THE DECISIONS THAT MATTER</p><h2>真正的功夫，<br><span>在看不见的地方。</span></h2><p>三个值得展开聊聊的技术选择。</p></div><div class="engineering-list"><details v-for="(item, i) in project.engineering" :key="item.title" :open="i === 0" v-reveal><summary><span class="engineering-index">0{{ i + 1 }}</span><span>{{ item.title }}</span><span class="details-plus" aria-hidden="true">+</span></summary><div class="engineering-body"><span class="detail-kicker">{{ item.label }}</span><p>{{ item.text }}</p><div class="tradeoff"><b>设计取舍</b><p>{{ item.tradeoff }}</p></div></div></details></div></section>

    <section class="detail-stack detail-container" v-reveal><span class="detail-kicker">BUILT WITH</span><div><span v-for="tech in project.stack" :key="tech">{{ tech }}</span></div></section>
    <section class="detail-ending"><div class="ending-glow" aria-hidden="true"></div><div class="detail-container"><p class="detail-kicker" v-reveal>{{ project.name }} / A PROJECT BY 杨佳锡</p><h2 v-reveal>{{ project.conclusion }}</h2><p v-reveal>{{ project.role }} · {{ project.status }}</p><div class="ending-actions" v-reveal><RouterLink to="/resume" class="detail-button">查看完整简历 <span>↗</span></RouterLink><a :href="`mailto:${site.email}`" class="ending-contact">聊聊这个项目 ↗</a></div><RouterLink :to="`/projects/${project.next}`" class="next-project"><div><span class="detail-kicker">NEXT PROJECT / {{ next.index }}</span><strong>{{ next.name }}</strong><p>{{ next.category }}</p></div><span class="next-arrow">↗</span></RouterLink></div></section>
    <footer class="detail-footer detail-container"><RouterLink to="/">YJXAI.CLOUD</RouterLink><span>© {{ new Date().getFullYear() }} 杨佳锡</span><RouterLink to="/projects">返回全部项目 ↑</RouterLink></footer>
  </main>
</template>
