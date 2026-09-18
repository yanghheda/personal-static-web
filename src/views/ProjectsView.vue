<script setup>
import { projects } from '@/data/site'
</script>

<template>
  <main class="wrap">
    <!-- 页头 -->
    <section class="pt-[calc(var(--topbar-h)+clamp(3rem,9vw,7rem))] pb-[clamp(2.5rem,6vw,5rem)]">
      <p class="eyebrow mono" v-reveal>02 — 项目 / Projects</p>
      <h1
        class="mt-0 mb-[1.1rem] font-serif text-[clamp(2.7rem,7.6vw,6.2rem)] leading-[0.98] font-normal tracking-[-0.025em] text-balance"
        v-reveal="80"
      >
        项目<em class="text-accent">与作品</em>
      </h1>
      <p class="mt-0 mb-[1.6rem] font-serif text-[clamp(1.05rem,2vw,1.5rem)] italic tracking-[0.005em] text-inksoft" v-reveal="160">
        Things I designed and shipped end to end.
      </p>
      <p class="mt-0 max-w-[34em] text-[1.02rem] text-inksoft" v-reveal="220">
        以下项目均由我<b class="font-semibold text-ink">独立完成从 0 到 1 的设计、开发与部署</b>。技术选型、架构边界与关键取舍写在每个项目下方，可按需索取在线演示与源码讲解。
      </p>
    </section>

    <!-- 项目列表 -->
    <section class="border-t border-rule py-[clamp(3.5rem,8vw,6.5rem)]">
      <article
        v-for="(p, i) in projects"
        :key="p.name"
        class="mb-[clamp(2.5rem,6vw,4rem)] border-b border-rule pb-[clamp(2.5rem,6vw,4rem)] last:mb-0 last:border-b-0 last:pb-0"
        v-reveal="i * 80"
      >
        <div class="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
          <h2 class="m-0 max-w-[26em] font-serif text-[clamp(1.5rem,3.6vw,2.4rem)] leading-[1.15] font-normal tracking-[-0.02em]">
            {{ p.name }}
          </h2>
          <span class="font-mono text-[0.72rem] tracking-[0.06em] text-inkfade">{{ p.period }}</span>
        </div>

        <div class="mt-[0.9rem] flex flex-wrap items-center gap-x-[0.9rem] gap-y-[0.5rem] text-[0.85rem] text-inksoft">
          <span class="border border-rule-strong px-[0.6rem] py-[0.1rem] font-mono text-[0.6rem] tracking-[0.1em] uppercase">{{ p.kind }}</span>
          <span v-if="p.online" class="font-mono text-[0.6rem] tracking-[0.1em] text-accent uppercase">● 已部署上线</span>
        </div>

        <p class="mt-[1.2rem] max-w-[52em] text-[0.98rem] text-inksoft">{{ p.desc }}</p>

        <ul class="mt-[1.4rem] grid list-none gap-x-[clamp(1.2rem,3vw,2.5rem)] gap-y-[0.7rem] p-0 md:grid-cols-2">
          <li
            v-for="point in p.points"
            :key="point"
            class="relative pl-[1.1rem] text-[0.92rem] leading-[1.75] text-inksoft before:absolute before:top-[0.62rem] before:left-0 before:h-[6px] before:w-[6px] before:rounded-[2px] before:bg-accent before:content-['']"
          >
            {{ point }}
          </li>
        </ul>

        <div class="mt-[1.4rem] flex flex-wrap gap-[0.35rem]">
          <span
            v-for="tech in p.stack"
            :key="tech"
            class="border border-rule-strong px-[0.5rem] py-[0.1rem] font-mono text-[0.6rem] tracking-[0.1em] text-inkfade"
          >
            {{ tech }}
          </span>
        </div>

        <a
          v-if="p.repo"
          class="mt-[1.4rem] inline-block border-b border-rule-strong font-mono text-[0.68rem] tracking-[0.12em] text-inksoft transition-all duration-[0.25s] hover:border-accent hover:text-accent"
          :href="p.repo"
          target="_blank"
          rel="noopener"
        >
          源码仓库 ↗
        </a>
      </article>
    </section>
  </main>
</template>