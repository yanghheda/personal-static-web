<script setup>
import GuideLines from '@/components/GuideLines.vue'
import GrainOverlay from '@/components/GrainOverlay.vue'
import SiteTopbar from '@/components/SiteTopbar.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import CopyToast from '@/components/CopyToast.vue'
</script>

<template>
  <GuideLines />
  <GrainOverlay />
  <SiteTopbar />

  <RouterView />

  <SiteFooter />
  <CopyToast />
</template>