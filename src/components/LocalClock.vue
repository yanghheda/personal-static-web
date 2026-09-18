<template>
  <dd class="m-0 font-mono text-[0.72rem] tracking-[0.06em] text-accent tabular-nums">{{ time }}</dd>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const time = ref('--:--:--')
let timer = null

const fmt = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
})

onMounted(() => {
  const tick = () => {
    time.value = fmt.format(new Date())
  }
  tick()
  timer = setInterval(tick, 1000)
})

onUnmounted(() => clearInterval(timer))
</script>