<script setup>
import { useRoute } from 'vue-router'

import GuideLines from '@/components/GuideLines.vue'
import GrainOverlay from '@/components/GrainOverlay.vue'
import SiteTopbar from '@/components/SiteTopbar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CopyToast from '@/components/CopyToast.vue'

const route = useRoute()
</script>

<template>
  <GuideLines v-if="!route.meta.immersive" />
  <GrainOverlay v-if="!route.meta.immersive" />
  <SiteTopbar v-if="!route.meta.immersive" />

  <RouterView :key="route.path" />

  <SiteFooter v-if="!route.meta.immersive" />
  <CopyToast />
</template>