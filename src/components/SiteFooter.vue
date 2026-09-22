<template>
  <div class="wrap no-print">
    <footer
      class="flex flex-wrap items-center gap-x-[1.6rem] gap-y-[0.8rem] border-t border-rule pt-[1.6rem] pb-[2.4rem] text-inkfade"
    >
      <span class="font-mono text-[0.64rem] tracking-[0.14em] uppercase">© {{ year }}{{ site.icp }}</span>
      <a
        class="inline-flex items-center gap-[0.4rem] font-mono text-[0.64rem] tracking-[0.14em] uppercase"
        :href="site.police.link"
        rel="noreferrer"
        target="_blank"
      >
        <img class="h-[0.9rem] w-auto" :src="site.police.icon" alt="公安备案图标" />
        {{ site.police.code }}
      </a>
      <span class="ml-auto flex flex-wrap gap-[1.2rem] font-mono text-[0.64rem] tracking-[0.14em] uppercase max-[620px]:ml-0">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#index' }">导览</RouterLink>
        <RouterLink :to="{ path: '/', hash: '#contact' }">联系</RouterLink>
      </span>
    </footer>
  </div>
</template>

<script setup>
import { site } from '@/data/site'

const year = new Date().getFullYear()
</script>