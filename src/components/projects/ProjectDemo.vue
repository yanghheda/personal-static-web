<script setup>
import { computed } from 'vue'
import { projectStories } from '@/data/projectStories'
const props = defineProps({ project: { type: String, required: true }, step: { type: Number, default: 0 }, hero: Boolean })
const content = computed(() => projectStories[props.project])
const forge = computed(() => props.project === 'forgeai')
const imageSrc = computed(() => props.hero ? content.value.screenshot.src : content.value.chapters[props.step].image)
const screen = computed(() => props.hero ? content.value.screenshot.title : content.value.chapters[props.step].screen)
const chromeDark = computed(() => (props.hero ? content.value.screenshot : content.value.chapters[props.step]).chrome === 'dark')
</script>

<template>
  <div class="product-demo" :class="[forge ? 'demo-forge' : 'demo-meal', { 'demo-hero': hero }]">
    <div :class="forge ? 'desktop-frame' : 'shopping-canvas'">
      <template v-if="forge"><div class="frame-chrome"><span class="window-dots"><i></i><i></i><i></i></span><span>FORGE AI / DELIVERY WORKBENCH</span><span>↗</span></div></template>
      <template v-else><div class="shopping-orbit orbit-one"></div><div class="shopping-orbit orbit-two"></div></template>
      <div :class="forge ? 'desktop-screen' : 'phone-device'">
        <div v-if="!forge" class="phone-top" :class="{ 'phone-top--dark': chromeDark }"><span>9:41</span><i></i><span>▮▮ ▰</span></div>
        <img v-if="imageSrc" class="project-screenshot" :src="imageSrc" :alt="screen" :loading="hero ? 'eager' : 'lazy'" />
        <div v-else class="screenshot-placeholder" :class="`placeholder-step-${step}`" :key="screen" role="img" :aria-label="`${screen}，截图占位`">
          <div class="placeholder-grid" aria-hidden="true"></div>
          <div class="placeholder-art" aria-hidden="true"><i></i><i></i><i></i><span>{{ forge ? 'F' : 'M' }}<b>↗</b></span></div>
          <span class="placeholder-eyebrow">{{ hero ? 'PRODUCT OVERVIEW' : `PRODUCT STORY / 0${step + 1}` }}</span>
          <strong>{{ screen }}</strong><span class="placeholder-caption">{{ hero ? content.screenshot.hint : '预留对应功能的实际项目截图' }}</span>
          <span class="placeholder-badge">截图占位 <span>· {{ content.screenshot.ratio }}</span></span>
          <span class="placeholder-corner corner-tl" aria-hidden="true"></span><span class="placeholder-corner corner-br" aria-hidden="true"></span>
        </div>
        <div v-if="!forge" class="phone-home"></div>
      </div>
      <div v-if="hero && !forge" class="floating-chip chip-budget"><span>从你的需求出发</span><b>口味 · 预算 · 忌口</b><i>↗</i></div>
      <div v-if="hero && !forge" class="floating-chip chip-evidence"><span class="chip-check">✓</span><div><b>每个分数都有依据</b><span>Scores you can check.</span></div></div>
    </div>
    <div v-if="!hero" class="scene-flow" :key="step" aria-label="本阶段流程"><span v-for="(item, i) in content.chapters[step].flow" :key="item" :style="{ '--node': i }"><i>{{ String(i + 1).padStart(2, '0') }}</i>{{ item }}</span></div>
  </div>
</template>
