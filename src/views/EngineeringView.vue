<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { engineering } from '@/data/engineering'
import { site } from '@/data/site'

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
const active = ref(engineering.sections[0].id)
let queued = false

function measure() {
  queued = false
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(1, doc.scrollTop / max) : 0

  let current = engineering.sections[0].id
  for (const s of engineering.sections) {
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
  <div class="engineering">
    <!-- 阅读进度 -->
    <div
      class="no-print pointer-events-none fixed inset-x-0 top-[var(--topbar-h)] z-[9] h-[2px] origin-left bg-accent transition-transform duration-150 ease-out"
      :style="{ transform: `scaleX(${progress})` }"></div>

    <!-- ============ 页内目录 ============ -->
    <nav
      class="no-print sticky top-[var(--topbar-h)] z-[5] border-y border-rule bg-[color-mix(in_srgb,var(--color-paper)_92%,transparent)] backdrop-blur-[8px]"
      aria-label="工程实录目录">
      <ul class="wrap flex list-none gap-[clamp(0.9rem,2.5vw,2rem)] overflow-x-auto p-0">
        <li v-for="s in engineering.sections" :key="s.id" class="shrink-0">
          <a class="eng-toc__item flex items-center gap-[0.45rem] border-b-2 py-[0.85rem] font-mono text-[0.66rem] tracking-[0.12em] whitespace-nowrap transition-colors duration-300"
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
        <div class="grid items-end gap-[clamp(2rem,5vw,3.5rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,19rem)]">
          <div>
            <p class="eyebrow mono" v-reveal>{{ engineering.eyebrow }}</p>

            <h1 class="mt-0 mb-0 font-serif text-[clamp(3.2rem,10vw,7.4rem)] leading-[0.92] font-normal tracking-[-0.035em]">
              {{ engineering.title }}<span class="text-accent">.</span>
            </h1>

            <p class="mt-[1rem] mb-0 font-serif text-[clamp(1.15rem,2.6vw,1.85rem)] leading-[1.3] tracking-[-0.01em]"
              v-reveal="120">
              用 AI 交付真实系统的
              <em class="not-italic text-accent">边界、验证与复盘</em>
            </p>

            <p class="mt-[0.7rem] mb-0 font-serif text-[1.02rem] italic text-inksoft" v-reveal="160">
              {{ engineering.lede }}
            </p>

            <div class="mt-[1.6rem] flex flex-wrap gap-[0.45rem]" v-reveal="200">
              <span v-for="t in engineering.tags" :key="t"
                class="border border-rule-strong px-[0.65rem] py-[0.22rem] font-mono text-[0.62rem] tracking-[0.1em] text-inksoft">
                {{ t }}
              </span>
            </div>
          </div>

          <!-- 关键数字 -->
          <div v-reveal="240">
            <dl class="m-0 border-t-2 border-ink">
              <div v-for="s in engineering.stats" :key="s.label"
                class="flex flex-row-reverse items-baseline justify-between gap-[1rem] border-b border-rule py-[0.6rem]">
                <dt class="mono shrink-0 text-inkfade">{{ s.label }}</dt>
                <dd class="m-0 font-serif text-[1.5rem] leading-none text-accent">{{ s.value }}</dd>
              </div>
            </dl>
          </div>
        </div>

        <p class="mt-[clamp(1.6rem,3.5vw,2.4rem)] mb-0 max-w-[46em] text-[1.02rem] leading-[1.9] text-inksoft"
          v-reveal="300">
          <template v-for="(seg, i) in rich(engineering.intro)" :key="i">
            <b v-if="seg.k === 'b'" class="font-semibold text-ink">{{ seg.t }}</b>
            <em v-else-if="seg.k === 'm'" class="font-semibold text-accent not-italic">{{ seg.t }}</em>
            <template v-else>{{ seg.t }}</template>
          </template>
        </p>
      </section>

      <!-- ============ 分节 ============ -->
      <section v-for="s in engineering.sections" :id="s.id" :key="s.id"
        class="scroll-mt-[calc(var(--topbar-h)+3.5rem)] border-b border-rule py-[clamp(3rem,7vw,5.5rem)]">
        <div class="eng-sec mb-[clamp(1.5rem,3.5vw,2.4rem)] flex flex-wrap items-baseline gap-4" v-reveal>
          <span class="mono text-accent" v-scramble="'.eng-sec'">{{ s.num }}</span>
          <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
            {{ s.title }} <em class="text-accent">/ {{ s.en }}</em>
          </h2>
        </div>

        <div class="max-w-[46em]">
          <p v-for="(para, i) in s.paras" :key="i"
            class="mt-0 mb-[1.1rem] text-[1.02rem] leading-[1.9] text-inksoft last:mb-0" v-reveal="i * 60">
            <template v-for="(seg, j) in rich(para)" :key="j">
              <b v-if="seg.k === 'b'" class="font-semibold text-ink">{{ seg.t }}</b>
              <em v-else-if="seg.k === 'm'" class="font-semibold text-accent not-italic">{{ seg.t }}</em>
              <template v-else>{{ seg.t }}</template>
            </template>
          </p>
        </div>

        <ul v-if="s.points?.length"
          class="mt-[clamp(1.6rem,3.5vw,2.4rem)] grid list-none gap-x-[clamp(1.2rem,3vw,2.5rem)] gap-y-[0.7rem] p-0 md:grid-cols-2">
          <li v-for="(point, i) in s.points" :key="point"
            class="relative pl-[1.1rem] text-[0.9rem] leading-[1.75] text-inksoft before:absolute before:top-[0.62rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-[2px] before:bg-accent before:content-['']"
            v-reveal="i * 50">
            {{ point }}
          </li>
        </ul>
      </section>

      <!-- ============ 结尾 ============ -->
      <section class="py-[clamp(3rem,7vw,5.5rem)]">
        <p class="eyebrow mono" v-reveal>{{ engineering.ending.eyebrow }}</p>

        <h2 class="mt-0 mb-[1.2rem] font-serif text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.18] font-normal tracking-[-0.025em]"
          v-reveal="80">
          <span v-for="line in engineering.ending.title" :key="line" class="block">{{ line }}</span>
        </h2>

        <p class="mt-0 mb-0 max-w-[44em] text-[1.02rem] leading-[1.9] text-inksoft" v-reveal="160">
          {{ engineering.ending.desc }}
        </p>

        <div class="mt-[1.8rem] flex flex-wrap gap-[0.6rem]" v-reveal="220">
          <RouterLink to="/projects"
            class="btn btn--solid inline-flex items-center gap-[0.5rem] border border-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.14em] uppercase">
            <span>看两个项目</span><span class="arw">→</span>
          </RouterLink>
          <RouterLink to="/resume"
            class="btn inline-flex items-center gap-[0.5rem] border border-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.14em] uppercase">
            <span>看简历</span><span class="arw">→</span>
          </RouterLink>
          <a :href="`mailto:${site.email}`"
            class="btn inline-flex items-center gap-[0.5rem] border border-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.14em] uppercase">
            <span>聊聊 AI 协作</span>
          </a>
        </div>
      </section>
    </main>
  </div>
</template>