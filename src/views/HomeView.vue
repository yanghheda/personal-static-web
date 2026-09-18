<script setup>
import LocalClock from '@/components/LocalClock.vue'
import { navIndex, nowItems, site, stats } from '@/data/site'
import { useContact } from '@/composables/useContact'

const { masked, handleCall, handleCopy } = useContact()
</script>

<template>
  <main class="wrap">
    <!-- ========== 00 英雄区 ========== -->
    <section class="pt-[calc(var(--topbar-h)+clamp(3rem,9vw,7rem))] pb-[clamp(3rem,7vw,6rem)]">
      <div
        class="grid grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)] items-start gap-[clamp(2rem,5vw,5rem)] max-[960px]:grid-cols-1"
      >
        <div>
          <p class="eyebrow mono" v-reveal>00 — 你好，我是 杨佳锡</p>
          <h1
            class="mt-0 mb-[1.1rem] font-serif text-[clamp(2.7rem,7.6vw,6.2rem)] leading-[0.98] font-normal tracking-[-0.025em] text-balance"
            v-reveal="80"
          >
            AI 全栈<br />开发<em class="text-accent">工程师</em>
          </h1>
          <p
            class="mt-0 mb-[1.6rem] font-serif text-[clamp(1.05rem,2vw,1.5rem)] italic tracking-[0.005em] text-inksoft"
            v-reveal="160"
          >
            I build AI products that actually ship.
          </p>
          <p class="mt-0 mb-[2.2rem] max-w-[34em] text-[1.02rem] text-inksoft" v-reveal="220">
            <b class="font-semibold text-ink">2 年前端工程</b>经验，<b class="font-semibold text-ink">7 个月 AI 应用开发</b>经验。熟悉 Vue / React 前端工程与 Java 后端体系， 了解 LangChain、RAG 与 MCP 工具生态，擅长把大模型能力落进真正可用、别人愿意用的产品界面里。
          </p>
          <div class="flex flex-wrap gap-[0.7rem]" v-reveal="300">
            <RouterLink
              class="btn btn--solid inline-flex items-center gap-[0.6rem] border border-ink px-[1.35rem] py-[0.85rem] font-mono text-[0.72rem] tracking-[0.14em] uppercase"
              to="/resume"
            >
              <span>查看简历</span><span class="arw">→</span>
            </RouterLink>
            <RouterLink
              class="btn inline-flex items-center gap-[0.6rem] border border-ink px-[1.35rem] py-[0.85rem] font-mono text-[0.72rem] tracking-[0.14em] uppercase"
              :to="{ path: '/', hash: '#contact' }"
            >
              <span>联系我</span><span class="arw">↓</span>
            </RouterLink>
          </div>
        </div>

        <aside
          class="relative mt-[clamp(0.5rem,4vw,3rem)] border border-ink bg-paper2 px-[1.4rem] pt-[1.4rem] pb-[1.1rem] shadow-[10px_10px_0_rgba(21,18,14,0.09)] max-[960px]:mt-0"
          v-reveal="260"
        >
          <div class="mono flex justify-between gap-4 border-b border-rule pb-[0.85rem] text-inkfade">
            <span>PORTAL / v1.0</span><span>CN · UTC+8</span>
          </div>
          <div class="mt-[0.35rem] mb-[0.5rem] font-serif text-[clamp(2.4rem,4.6vw,3.6rem)] leading-none tracking-[-0.04em]">
            杨佳锡
          </div>
          <dl class="m-0 border-t border-rule">
            <div class="flex items-baseline justify-between gap-4 border-b border-rule py-[0.6rem] last:border-b-0">
              <dt class="mono text-inkfade">Local time</dt>
              <LocalClock />
            </div>
            <div class="flex items-baseline justify-between gap-4 border-b border-rule py-[0.6rem] last:border-b-0">
              <dt class="mono text-inkfade">Status</dt>
              <dd class="m-0 font-mono text-[0.72rem] tracking-[0.06em]">求职中 · 随时到岗</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 border-b border-rule py-[0.6rem] last:border-b-0">
              <dt class="mono text-inkfade">Focus</dt>
              <dd class="m-0 font-mono text-[0.72rem] tracking-[0.06em]">前端 / Java / Agent</dd>
            </div>
            <div class="flex items-baseline justify-between gap-4 border-b border-rule py-[0.6rem] last:border-b-0">
              <dt class="mono text-inkfade">Base</dt>
              <dd class="m-0 font-mono text-[0.72rem] tracking-[0.06em]">Shanghai, China</dd>
            </div>
          </dl>
          <div class="stamp">求职中<br />OPEN TO WORK</div>
        </aside>
      </div>
    </section>

    <!-- ========== 01 站点索引 ========== -->
    <section id="index" class="border-t border-rule py-[clamp(3.5rem,8vw,6.5rem)]">
      <div class="mb-[clamp(1.6rem,4vw,3rem)] flex flex-wrap items-baseline gap-4" v-reveal>
        <span class="mono text-accent">01</span>
        <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
          站点导览 <em class="text-accent">/ Index</em>
        </h2>
      </div>

      <ul class="index m-0 list-none border-t border-rule-strong p-0">
        <li v-for="(item, i) in navIndex" :key="item.num" class="index__item border-b border-rule" v-reveal="i * 60">
          <!-- 站内路由 -->
          <RouterLink v-if="item.to" class="index__link" :to="item.to">
            <span class="index__num">{{ item.num }}</span>
            <span class="index__main">
              <span class="index__title">{{ item.title }} <small>{{ item.en }}</small></span>
              <span class="index__desc">{{ item.desc }}</span>
            </span>
            <span class="index__meta">
              <span class="index__domain">{{ item.domain }}</span>
              <span class="index__tags">
                <span v-for="t in item.tags" :key="t" class="index__tag">{{ t }}</span>
              </span>
            </span>
            <span class="index__arw">→</span>
          </RouterLink>

          <!-- 电话：桌面端点击复制，移动端唤起拨号 -->
          <button v-else-if="item.action === 'call'" class="index__link" type="button" @click="handleCall">
            <span class="index__num">{{ item.num }}</span>
            <span class="index__main">
              <span class="index__title">{{ item.title }} <small>{{ item.en }}</small></span>
              <span class="index__desc">{{ item.desc }}</span>
            </span>
            <span class="index__meta">
              <span class="index__domain">{{ masked }}</span>
              <span class="index__tags">
                <span v-for="t in item.tags" :key="t" class="index__tag">{{ t }}</span>
              </span>
            </span>
            <span class="index__arw">→</span>
          </button>

          <!-- 尚未上线，不可点击 -->
          <div v-else class="index__link index__link--soon">
            <span class="index__num">{{ item.num }}</span>
            <span class="index__main">
              <span class="index__title">{{ item.title }} <small>{{ item.en }}</small></span>
              <span class="index__desc">{{ item.desc }}</span>
            </span>
            <span class="index__meta">
              <span class="index__domain">{{ item.domain }}</span>
              <span class="index__tags">
                <span v-for="t in item.tags" :key="t" class="index__tag index__tag--soon">{{ t }}</span>
              </span>
            </span>
            <span class="index__arw">—</span>
          </div>
        </li>
      </ul>
    </section>
  </main>

  <!-- ========== 02 数据带 ========== -->
  <section class="border-t border-ink bg-ink pt-[clamp(3.5rem,8vw,6rem)] pb-0 text-paper">
    <div class="wrap">
      <div class="mb-[clamp(2rem,5vw,3.2rem)] flex flex-wrap items-baseline gap-4" v-reveal>
        <span class="mono text-accent">02</span>
        <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
          一些数字 <em class="text-accent">/ By the numbers</em>
        </h2>
        <span class="mono ml-auto text-[rgba(239,235,227,0.5)]">截至 2026</span>
      </div>

      <div
        class="grid grid-cols-3 gap-px border-y border-[rgba(239,235,227,0.2)] bg-[rgba(239,235,227,0.2)] max-[960px]:grid-cols-1"
        v-reveal
      >
        <div v-for="s in stats" :key="s.n" class="bg-ink px-[clamp(1rem,2vw,1.6rem)] py-[clamp(1.5rem,4vw,2.6rem)]">
          <div class="flex items-baseline gap-[0.3rem] font-serif text-[clamp(3rem,8vw,5.4rem)] leading-[0.9] tracking-[-0.04em]">
            {{ s.n }}<sup class="stat-unit">{{ s.unit }}</sup>
          </div>
          <!-- mb-[1em]：原稿只设了 margin-top，底部留白来自 UA 的 p { margin-block-end: 1em }（= 0.88rem 即 14.08px） -->
          <p class="mt-[0.9rem] mb-[1em] max-w-[22em] text-[0.88rem] text-[rgba(239,235,227,0.62)]">{{ s.label }}</p>
        </div>
      </div>

      <div
        class="marquee mt-[clamp(2.5rem,6vw,4rem)] flex overflow-hidden border-t border-[rgba(239,235,227,0.2)] py-4"
        aria-hidden="true"
      >
        <div
          class="marquee__track flex gap-[2.6rem] pr-[2.6rem] font-mono text-[0.76rem] tracking-[0.16em] whitespace-nowrap uppercase text-[rgba(239,235,227,0.55)]"
        >
          <span>Vue <b>/</b> React <b>/</b> TypeScript <b>/</b> Vite <b>/</b> Tailwind</span>
          <span>Java <b>/</b> Spring Boot <b>/</b> MySQL <b>/</b> Redis <b>/</b> Docker</span>
          <span>Python <b>/</b> LangChain <b>/</b> RAG <b>/</b> MCP <b>/</b> Agent</span>
          <!-- 重复一遍以实现无缝循环 -->
          <span>Vue <b>/</b> React <b>/</b> TypeScript <b>/</b> Vite <b>/</b> Tailwind</span>
          <span>Java <b>/</b> Spring Boot <b>/</b> MySQL <b>/</b> Redis <b>/</b> Docker</span>
          <span>Python <b>/</b> LangChain <b>/</b> RAG <b>/</b> MCP <b>/</b> Agent</span>
        </div>
      </div>
    </div>
  </section>

  <main class="wrap">
    <!-- ========== 03 近况 ========== -->
    <section id="now" class="border-t border-rule py-[clamp(3.5rem,8vw,6.5rem)]">
      <div class="mb-[clamp(1.6rem,4vw,3rem)] flex flex-wrap items-baseline gap-4" v-reveal>
        <span class="mono text-accent">03</span>
        <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
          近况 <em class="text-accent">/ Now</em>
        </h2>
        <span class="mono ml-auto text-inkfade">持续更新</span>
      </div>

      <div class="grid grid-cols-3 gap-[clamp(1.2rem,3vw,2.5rem)] max-[960px]:grid-cols-1">
        <div
          v-for="(n, i) in nowItems"
          :key="n.en"
          class="border-t-2 border-ink pt-[1.1rem]"
          v-reveal="i * 80"
        >
          <span class="mono text-accent">{{ n.en }}</span>
          <h3 class="mt-[0.6rem] mb-[0.5rem] font-serif text-[1.32rem] font-normal tracking-[-0.01em]">{{ n.title }}</h3>
          <p class="m-0 text-[0.92rem] text-inksoft">{{ n.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ========== 04 联系 ========== -->
    <section id="contact" class="border-t border-rule pt-[clamp(3.5rem,9vw,6.5rem)] pb-[clamp(3.5rem,9vw,6.5rem)]">
      <div class="mb-[clamp(1.6rem,4vw,3rem)] flex flex-wrap items-baseline gap-4" v-reveal>
        <span class="mono text-accent">04</span>
        <h2 class="m-0 font-serif text-[clamp(1.6rem,3.4vw,2.6rem)] font-normal tracking-[-0.02em]">
          保持联系 <em class="text-accent">/ Say hi</em>
        </h2>
      </div>

      <a
        class="mail relative mt-[1.2rem] mb-[2.4rem] block w-fit max-w-full font-serif text-[clamp(1.9rem,7vw,5rem)] leading-[1.05] tracking-[-0.035em] break-words"
        :href="`mailto:${site.email}`"
        v-reveal
      >
        {{ site.email }}
      </a>

      <div class="flex flex-wrap gap-[0.55rem]" v-reveal="80">
        <a
          class="chip inline-flex items-center gap-[0.5rem] border border-rule-strong px-[0.9rem] py-[0.5rem] font-mono text-[0.68rem] tracking-[0.12em] transition-all duration-[0.3s] hover:border-ink hover:bg-ink hover:text-paper"
          href="#contact"
          @click="handleCall"
        >
          <b class="font-normal text-accent">TEL</b>{{ masked }}
        </a>
        <button
          class="chip inline-flex items-center gap-[0.5rem] border border-rule-strong px-[0.9rem] py-[0.5rem] font-mono text-[0.68rem] tracking-[0.12em] transition-all duration-[0.3s] hover:border-ink hover:bg-ink hover:text-paper"
          type="button"
          @click="handleCopy(site.wechat, '微信号')"
        >
          <b class="font-normal text-accent">WECHAT</b>{{ site.wechat }}
        </button>
        <a
          class="chip inline-flex items-center gap-[0.5rem] border border-rule-strong px-[0.9rem] py-[0.5rem] font-mono text-[0.68rem] tracking-[0.12em] transition-all duration-[0.3s] hover:border-ink hover:bg-ink hover:text-paper"
          :href="site.github"
          target="_blank"
          rel="noopener"
        >
          <b class="font-normal text-accent">↗</b>GitHub
        </a>
        <RouterLink
          class="chip inline-flex items-center gap-[0.5rem] border border-rule-strong px-[0.9rem] py-[0.5rem] font-mono text-[0.68rem] tracking-[0.12em] transition-all duration-[0.3s] hover:border-ink hover:bg-ink hover:text-paper"
          to="/resume"
        >
          <b class="font-normal text-accent">↗</b>Resume
        </RouterLink>
      </div>
    </section>
  </main>
</template>