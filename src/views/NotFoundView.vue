<template>
  <main class="wrap">
    <section class="pt-[calc(var(--topbar-h)+clamp(4rem,12vw,9rem))] pb-[clamp(4rem,10vw,7rem)]">
      <p class="eyebrow mono" v-reveal>404 — 页面不存在</p>
      <h1
        class="mt-0 mb-[1.1rem] font-serif text-[clamp(2.7rem,7.6vw,6.2rem)] leading-[0.98] font-normal tracking-[-0.025em]"
        v-reveal="80"
      >
        走<em class="text-accent">丢了</em>
      </h1>
      <p class="mt-0 mb-[2.2rem] max-w-[34em] text-[1.02rem] text-inksoft" v-reveal="160">
        这个地址下没有内容。可能是链接过期，或者页面还没上线。
      </p>
      <div class="flex flex-wrap gap-[0.7rem]" v-reveal="220">
        <RouterLink
          class="btn btn--solid inline-flex items-center gap-[0.6rem] border border-ink px-[1.35rem] py-[0.85rem] font-mono text-[0.72rem] tracking-[0.14em] uppercase"
          to="/"
        >
          <span>回到首页</span><span class="arw">→</span>
        </RouterLink>
        <RouterLink
          class="btn inline-flex items-center gap-[0.6rem] border border-ink px-[1.35rem] py-[0.85rem] font-mono text-[0.72rem] tracking-[0.14em] uppercase"
          to="/projects"
        >
          <span>看看项目</span><span class="arw">→</span>
        </RouterLink>
      </div>
    </section>
  </main>
</template>