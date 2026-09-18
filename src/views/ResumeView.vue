<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { resume } from '@/data/resume'
import { useContact } from '@/composables/useContact'

const { masked, handleCall, handleCopy } = useContact()

/* ---------- 富文本标记：**加粗** / ==关键词== ---------- */
const SEG = /(\*\*[^*]+\*\*|==[^=]+==)/g
function rich(text) {
  return text.split(SEG).filter(Boolean).map((s) => {
    if (s.startsWith('**')) return { k: 'b', t: s.slice(2, -2) }
    if (s.startsWith('==')) return { k: 'm', t: s.slice(2, -2) }
    return { k: 'n', t: s }
  })
}

/* ---------- 阅读进度 + 页内目录高亮 ---------- */
const progress = ref(0)
const active = ref(resume.sections[0].id)
let queued = false

function measure() {
  queued = false
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, doc.scrollTop / max) : 0

  let current = resume.sections[0].id
  for (const s of resume.sections) {
    const el = document.getElementById(s.id)
    if (el && el.getBoundingClientRect().top <= 190) current = s.id
  }
  active.value = current
}

function onScroll() {
  if (queued) return
  queued = true
  requestAnimationFrame(measure)
}

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
  measure()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div>
    <!-- 阅读进度 -->
    <div
      class="no-print pointer-events-none fixed inset-x-0 top-[var(--topbar-h)] z-[9] h-[2px] origin-left bg-accent transition-transform duration-150 ease-out"
      :style="{ transform: `scaleX(${progress})` }"></div>

    <!-- ============ 页内目录 ============ -->
    <nav
      class="no-print sticky top-[var(--topbar-h)] z-[5] border-y border-rule bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] backdrop-blur-[8px]"
      aria-label="简历目录">
      <ul class="wrap flex list-none gap-[clamp(0.9rem,2.5vw,2rem)] overflow-x-auto p-0">
        <li v-for="s in resume.sections" :key="s.id" class="shrink-0">
          <a class="flex items-center gap-[0.45rem] border-b-2 py-[0.85rem] font-mono text-[0.66rem] tracking-[0.12em] whitespace-nowrap transition-colors duration-300"
            :class="active === s.id ? 'border-accent text-accent' : 'border-transparent text-inksoft hover:text-ink'"
            :href="`#${s.id}`">
            <span class="text-[0.6rem] opacity-70">{{ s.num }}</span>
            {{ s.title }}
          </a>
        </li>
      </ul>
    </nav>

    <main class="wrap">
      <!-- ============ 抬头 ============ -->
      <section class="pt-[calc(var(--topbar-h)+clamp(3rem,9vw,7rem))] pb-[clamp(2.2rem,5vw,3.6rem)]">
        <div class="grid items-end gap-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
          <div>
            <p class="eyebrow mono" v-reveal>01 — 简历 / Resume</p>

            <h1
              class="mt-0 mb-0 font-serif text-[clamp(3.2rem,10vw,7.4rem)] leading-[0.92] font-normal tracking-[-0.035em]"
              v-reveal="60">
              {{ resume.profile.name }}<span class="text-accent">.</span>
            </h1>

            <p class="mt-[1rem] mb-0 font-serif text-[clamp(1.15rem,2.6vw,1.85rem)] leading-[1.3] tracking-[-0.01em]"
              v-reveal="120">
              {{ resume.profile.target }}
              <em class="not-italic text-accent">·</em>
              {{ resume.profile.targetSub }}
            </p>

            <p class="mt-[0.7rem] mb-0 font-serif text-[1.02rem] italic text-inksoft" v-reveal="160">
              {{ resume.profile.lede }}
            </p>

            <div class="mt-[1.6rem] flex flex-wrap gap-[0.45rem]" v-reveal="200">
              <span v-for="t in resume.profile.tags" :key="t"
                class="border border-rule-strong px-[0.65rem] py-[0.22rem] font-mono text-[0.62rem] tracking-[0.1em] text-inksoft">
                {{ t }}
              </span>
            </div>
          </div>

          <!-- 联系方式 -->
          <aside class="border-t-2 border-ink" v-reveal="240">
            <dl class="m-0">
              <div v-for="c in resume.contacts" :key="c.key"
                class="flex items-baseline justify-between gap-[1rem] border-b border-rule py-[0.6rem]">
                <dt class="mono shrink-0 text-inkfade">{{ c.key }}</dt>
                <dd class="m-0 text-right font-mono text-[0.78rem] tracking-[0.02em]">
                  <a v-if="c.kind === 'phone'"
                    class="cursor-pointer border-b border-transparent transition-colors duration-200 hover:border-accent hover:text-accent"
                    href="#contact" @click="handleCall">
                    {{ masked }}
                  </a>
                  <button v-else-if="c.kind === 'email'"
                    class="cursor-pointer border-b border-transparent font-mono text-[0.78rem] transition-colors duration-200 hover:border-accent hover:text-accent"
                    type="button" @click="handleCopy(c.value, '邮箱')">
                    {{ c.value }}
                  </button>
                  <span v-else class="text-inksoft">{{ c.value }}</span>
                </dd>
              </div>
            </dl>

            <div class="mt-[1.1rem] flex flex-wrap gap-[0.6rem]">
              <button
                class="btn btn--solid inline-flex items-center gap-[0.5rem] border border-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.14em] uppercase"
                type="button" @click="handleCopy(resume.contacts[1].value, '邮箱')">
                <span>复制邮箱</span>
              </button>
              <a class="btn inline-flex items-center gap-[0.5rem] border border-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.14em] uppercase"
                href="#contact" @click="handleCall">
                <span>打电话</span>
              </a>
              <RouterLink
                class="btn inline-flex items-center gap-[0.5rem] border border-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.14em] uppercase"
                to="/projects">
                <span>看项目</span><span class="arw">→</span>
              </RouterLink>
            </div>
          </aside>
        </div>
      </section>

      <!-- ============ 01 职业概述 ============ -->
      <section id="profile"
        class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] border-b border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <div class="mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent">{{ resume.sections[0].num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            职业概述 <em class="text-accent">/ Profile</em>
          </h2>
        </div>

        <div class="grid gap-[clamp(1.2rem,3vw,2.6rem)] md:grid-cols-[minmax(0,1fr)_minmax(0,13rem)]">
          <div>
            <p v-for="(para, i) in resume.summary" :key="i"
              class="mt-0 mb-[1.1rem] max-w-[46em] text-[1.02rem] leading-[1.9] text-inksoft last:mb-0"
              v-reveal="i * 70">
              <template v-for="(seg, j) in rich(para)" :key="j">
                <b v-if="seg.k === 'b'" class="font-semibold text-ink">{{ seg.t }}</b>
                <em v-else-if="seg.k === 'm'" class="font-semibold text-accent not-italic">{{ seg.t }}</em>
                <template v-else>{{ seg.t }}</template>
              </template>
            </p>
          </div>

          <dl class="m-0 border-t-2 border-ink max-md:order-first">
            <div v-for="(h, i) in resume.highlights" :key="h.n"
              class="border-b border-rule py-[0.6rem] max-md:flex max-md:items-baseline max-md:gap-[0.7rem]">
              <dt class="mono text-accent">0{{ i + 1 }}</dt>
              <dd class="m-0 mt-[0.25rem] text-[0.82rem] leading-[1.55] text-inksoft max-md:mt-0">{{ h.title }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <!-- ============ 02 核心优势 ============ -->
      <section id="highlights"
        class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] border-b border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <div class="mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent">{{ resume.sections[1].num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            核心优势 <em class="text-accent">/ Highlights</em>
          </h2>
        </div>

        <div class="grid gap-x-[clamp(1.2rem,3vw,2.6rem)] gap-y-[clamp(1.5rem,3vw,2.2rem)] md:grid-cols-2">
          <div v-for="(h, i) in resume.highlights" :key="h.n" class="border-t-2 border-ink pt-[1.1rem]"
            v-reveal="i * 70">
            <div class="flex items-baseline gap-[0.7rem]">
              <span class="font-serif text-[clamp(1.7rem,4vw,2.4rem)] leading-[1] text-accent">{{ h.n }}</span>
              <h3 class="m-0 font-serif text-[1.24rem] font-normal tracking-[-0.01em]">{{ h.title }}</h3>
            </div>
            <p class="mt-[0.6rem] mb-0 max-w-[34em] text-[0.92rem] text-inksoft">{{ h.desc }}</p>
          </div>
        </div>
      </section>

      <!-- ============ 03 工作经历 ============ -->
      <section id="experience"
        class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] border-b border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <div class="mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent">{{ resume.sections[2].num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            工作经历 <em class="text-accent">/ Experience</em>
          </h2>
        </div>

        <article v-for="(job, i) in resume.experience" :key="job.company"
          class="grid gap-x-[clamp(1.2rem,3vw,3rem)] gap-y-[0.9rem] border-t border-rule-strong py-[clamp(1.6rem,4vw,2.6rem)] md:grid-cols-[minmax(0,11rem)_minmax(0,1fr)]"
          v-reveal="i * 70">
          <div>
            <div class="mono text-inkfade">{{ job.period }}</div>
            <div class="mono mt-[0.4rem] text-accent">0{{ i + 1 }}</div>
          </div>

          <div>
            <h3
              class="m-0 font-serif text-[clamp(1.3rem,2.8vw,1.75rem)] leading-[1.25] font-normal tracking-[-0.015em]">
              {{ job.company }} <em class="not-italic text-accent">·</em> {{ job.role }}
            </h3>

            <div class="mt-[0.7rem] flex flex-wrap items-center gap-[0.5rem]">
              <span v-for="p in job.pills" :key="p"
                class="border border-rule-strong px-[0.6rem] py-[0.1rem] font-mono text-[0.6rem] tracking-[0.1em] text-inkfade">
                {{ p }}
              </span>
            </div>

            <ul class="mt-[1.1rem] grid list-none gap-y-[0.7rem] p-0">
              <li v-for="(pt, j) in job.points" :key="j"
                class="relative pl-[1.1rem] text-[0.94rem] leading-[1.78] text-inksoft before:absolute before:top-[0.62rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-[2px] before:bg-accent before:content-['']">
                <template v-for="(seg, k) in rich(pt)" :key="k">
                  <b v-if="seg.k === 'b'" class="font-semibold text-ink">{{ seg.t }}</b>
                  <em v-else-if="seg.k === 'm'" class="font-semibold text-accent not-italic">{{ seg.t }}</em>
                  <template v-else>{{ seg.t }}</template>
                </template>
              </li>
            </ul>
          </div>
        </article>
      </section>

      <!-- ============ 04 项目经历 ============ -->
      <section id="projects"
        class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] border-b border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <div class="mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent">{{ resume.sections[3].num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            项目经历 <em class="text-accent">/ Projects</em>
          </h2>
          <RouterLink
            class="mono ml-auto border-b border-rule-strong pb-[2px] transition-colors duration-200 hover:border-accent hover:text-accent"
            to="/projects">
            完整项目页 ↗
          </RouterLink>
        </div>

        <article v-for="(p, i) in resume.projects" :key="p.name"
          class="border-t border-rule-strong py-[clamp(1.8rem,4.5vw,3.2rem)]" v-reveal="i * 70">
          <div class="flex flex-wrap items-baseline justify-between gap-x-[1.5rem] gap-y-[0.5rem]">
            <h3
              class="m-0 max-w-[26em] font-serif text-[clamp(1.5rem,3.6vw,2.35rem)] leading-[1.15] font-normal tracking-[-0.02em]">
              {{ p.name }}
            </h3>
            <span class="font-mono text-[0.72rem] tracking-[0.06em] text-inkfade">{{ p.period }}</span>
          </div>

          <div
            class="mt-[0.8rem] flex flex-wrap items-center gap-x-[0.9rem] gap-y-[0.5rem] text-[0.85rem] text-inksoft">
            <span class="font-mono text-[0.62rem] tracking-[0.12em] text-accent">{{ p.num }}</span>
            <span class="font-mono text-[0.6rem] tracking-[0.12em] text-inkfade">{{ p.role }}</span>
            <span v-for="pl in p.pills" :key="pl"
              class="border border-rule-strong px-[0.6rem] py-[0.1rem] font-mono text-[0.6rem] tracking-[0.1em] uppercase">
              {{ pl }}
            </span>
            <span class="font-mono text-[0.62rem] text-inkfade">{{ p.note }}</span>
          </div>

          <p
            class="mt-[1.1rem] mb-0 max-w-[54em] border-l-2 border-accent pl-[0.9rem] text-[0.96rem] leading-[1.8] text-inksoft">
            {{ p.desc }}
          </p>

          <div class="mt-[1.1rem] flex flex-wrap gap-[0.35rem]">
            <span v-for="t in p.stack" :key="t"
              class="border px-[0.5rem] py-[0.1rem] font-mono text-[0.6rem] tracking-[0.08em]"
              :class="p.aiStack.includes(t) ? 'border-accent text-accent' : 'border-rule-strong text-inkfade'">
              {{ t }}
            </span>
          </div>

          <ul class="mt-[1.3rem] grid list-none gap-x-[clamp(1.2rem,3vw,2.5rem)] gap-y-[0.7rem] p-0 md:grid-cols-2">
            <li v-for="(pt, j) in p.points" :key="j"
              class="relative pl-[1.1rem] text-[0.9rem] leading-[1.75] text-inksoft before:absolute before:top-[0.6rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-[2px] before:bg-accent before:content-['']">
              <template v-for="(seg, k) in rich(pt)" :key="k">
                <b v-if="seg.k === 'b'" class="font-semibold text-ink">{{ seg.t }}</b>
                <em v-else-if="seg.k === 'm'" class="font-semibold text-accent not-italic">{{ seg.t }}</em>
                <template v-else>{{ seg.t }}</template>
              </template>
            </li>
          </ul>
        </article>

        <p class="mt-[clamp(1.5rem,3vw,2.2rem)] mb-0 border-t border-dashed border-rule pt-[0.9rem] text-center font-mono text-[0.68rem] tracking-[0.04em] text-inkfade"
          v-reveal>
          {{ resume.footerNote }}
        </p>
      </section>

      <!-- ============ 05 技术栈 ============ -->
      <section id="skills"
        class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] border-b border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <div class="mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent">{{ resume.sections[4].num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            技术栈 <em class="text-accent">/ Stack</em>
          </h2>
        </div>

        <div class="grid gap-x-[clamp(1.2rem,3vw,2.6rem)] gap-y-[clamp(1.6rem,3.5vw,2.4rem)] md:grid-cols-2">
          <div v-for="(g, i) in resume.skillGroups" :key="g.title" class="border-t-2 border-ink pt-[1rem]"
            v-reveal="i * 60">
            <div class="flex items-baseline justify-between gap-[1rem]">
              <h3 class="m-0 font-serif text-[1.2rem] font-normal tracking-[-0.01em]">{{ g.title }}</h3>
              <span class="mono text-inkfade">{{ g.en }}</span>
            </div>

            <div class="mt-[0.85rem] flex flex-wrap gap-[0.35rem]">
              <span v-for="t in g.tags" :key="t.name"
                class="border px-[0.5rem] py-[0.12rem] font-mono text-[0.62rem] tracking-[0.06em] transition-colors duration-300"
                :class="t.hot ? 'border-accent text-accent' : 'border-rule-strong text-inksoft'">
                {{ t.name }}
              </span>
            </div>
          </div>
        </div>
      </section>

      <!-- ============ 06 教育 & 语言 ============ -->
      <section id="education" class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] py-[clamp(3rem,7vw,5.5rem)]">
        <div class="mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent">{{ resume.sections[5].num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            教育 &amp; 语言 <em class="text-accent">/ Education</em>
          </h2>
        </div>

        <div class="grid gap-x-[clamp(1.2rem,3vw,3rem)] gap-y-[clamp(1.6rem,3.5vw,2.4rem)] md:grid-cols-2">
          <!-- 教育背景 -->
          <div v-reveal>
            <p class="eyebrow mono mb-[0.9rem]">教育背景 / Education</p>
            <div v-for="(e, i) in resume.education" :key="e.school"
              class="flex flex-wrap items-baseline justify-between gap-x-[1rem] gap-y-[0.3rem] border-t border-rule-strong py-[1rem]"
              :class="i === resume.education.length - 1 ? 'border-b' : ''">
              <div>
                <div class="flex items-center gap-[0.5rem]">
                  <span class="font-serif text-[1.16rem] tracking-[-0.01em]">{{ e.degree }}</span>
                  <span class="bg-ink px-[0.45rem] py-[0.05rem] font-mono text-[0.58rem] tracking-[0.1em] text-paper">
                    {{ e.badge }}
                  </span>
                </div>
                <div class="mt-[0.25rem] text-[0.85rem] text-inksoft">{{ e.school }}</div>
              </div>
              <span class="font-mono text-[0.68rem] text-inkfade">{{ e.period }}</span>
            </div>
          </div>

          <!-- 语言能力 -->
          <div v-reveal="60">
            <p class="eyebrow mono mb-[0.9rem]">语言能力 / Languages</p>
            <div v-for="(l, i) in resume.languages" :key="l.name"
              class="flex flex-wrap items-baseline justify-between gap-x-[1rem] gap-y-[0.3rem] border-t border-rule-strong py-[1rem]"
              :class="i === resume.languages.length - 1 ? 'border-b' : ''">
              <span class="font-serif text-[1.16rem] tracking-[-0.01em]">{{ l.name }}</span>
              <span class="font-mono text-[0.68rem] text-inksoft">{{ l.level }}</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>