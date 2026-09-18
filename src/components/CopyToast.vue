<template>
  <div
    class="toast no-print fixed bottom-8 left-1/2 z-20 max-w-[calc(100vw-2rem)] border-l-[3px] border-accent bg-ink px-[1.1rem] py-[0.7rem] font-mono text-[0.68rem] tracking-[0.1em] text-paper"
    :class="{ 'is-show': visible }"
    role="status"
    aria-live="polite"
  >
    {{ message }}
  </div>
</template>

<script setup>
import { useToast } from '@/composables/useToast'

const { message, visible } = useToast()
</script>