<script setup>
import { site } from '@/data/site'
import { useContact } from '@/composables/useContact'

const { masked, handleCall } = useContact()
</script>

<template>
  <header
    class="no-print fixed inset-x-0 top-0 z-10 flex h-[var(--topbar-h)] items-center border-b border-rule bg-[color-mix(in_srgb,var(--color-paper)_82%,transparent)] backdrop-blur-[10px]"
  >
    <div class="mx-auto flex w-full max-w-[var(--maxw)] items-center gap-[1.25rem] px-[var(--pad)]">
      <RouterLink class="flex items-center gap-[0.6rem] font-mono text-[0.72rem] tracking-[0.16em]" to="/">
        <b class="grid h-[22px] w-[22px] place-items-center bg-ink font-serif text-[0.8rem] font-normal text-paper">Y</b>
        {{ site.brand }}
      </RouterLink>

      <span
        class="inline-flex items-center gap-[0.45rem] rounded-full border border-rule-strong px-[0.6rem] py-[0.2rem] font-mono text-[0.62rem] tracking-[0.12em]"
      >
        <i class="h-[6px] w-[6px] rounded-full bg-accent"></i>OPEN TO WORK
      </span>

      <span class="ml-auto"></span>

      <!-- 电话：号段在 JS 中解码后按设备能力处理，页面源码不含完整号码 -->
      <a
        class="cursor-pointer border-b border-transparent font-mono text-[0.66rem] tracking-[0.14em] text-ink transition-all duration-[0.25s] hover:border-accent hover:text-accent"
        href="#contact"
        @click="handleCall"
      >
        <span class="text-inkfade max-[620px]:hidden">CALL ·</span><span>{{ masked }}</span>
      </a>

      <RouterLink
        class="border-b border-transparent font-mono text-[0.66rem] tracking-[0.14em] text-inksoft transition-all duration-[0.25s] hover:border-accent hover:text-accent max-[620px]:hidden"
        :to="{ path: '/', hash: '#index' }"
      >
        INDEX ↓
      </RouterLink>
    </div>
  </header>
</template>