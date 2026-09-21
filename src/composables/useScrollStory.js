import { onMounted, onUnmounted, ref } from 'vue'

// 用一个被动监听器和合并后的动画帧更新滚动进度。短屏与减少动态效果模式改用按钮浏览。
export function useScrollStory(root, hero, story, count) {
  const active = ref(0)
  const progress = ref(0)
  const reducedMotion = ref(false)
  const manualMode = ref(false)
  const compactQuery = '(max-height: 740px) and (max-width: 760px), (max-height: 640px) and (min-width: 761px)'
  let frame = 0
  let media
  let resizeObserver

  function update() {
    frame = 0
    if (!root.value || !story.value || !hero.value) return
    const viewport = window.innerHeight
    manualMode.value = reducedMotion.value || window.matchMedia(compactQuery).matches
    const bounds = root.value.getBoundingClientRect()
    progress.value = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - viewport)))
    const heroBounds = hero.value.getBoundingClientRect()
    const heroProgress = Math.max(0, Math.min(1, -heroBounds.top / heroBounds.height))
    root.value.style.setProperty('--hero-progress', reducedMotion.value ? 0 : heroProgress)
    const storyBounds = story.value.getBoundingClientRect()
    const position = Math.max(0, Math.min(0.9999, (100 - storyBounds.top) / Math.max(1, storyBounds.height - viewport)))
    if (!manualMode.value) active.value = Math.floor(position * count)
  }
  function schedule() {
    if (!frame) frame = requestAnimationFrame(update)
  }
  function onMotionChange() {
    reducedMotion.value = media.matches
    schedule()
  }
  function goToChapter(index) {
    if (!story.value) return
    if (manualMode.value) {
      active.value = index
      return
    }
    const bounds = story.value.getBoundingClientRect()
    const distance = Math.max(1, bounds.height - window.innerHeight)
    window.scrollTo({
      top: window.scrollY + bounds.top - 100 + distance * ((index + 0.2) / count),
      behavior: reducedMotion.value ? 'instant' : 'smooth',
    })
  }
  onMounted(() => {
    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    onMotionChange()
    media.addEventListener('change', onMotionChange)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    resizeObserver = new ResizeObserver(schedule)
    if (root.value) resizeObserver.observe(root.value)
    schedule()
  })
  onUnmounted(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    media?.removeEventListener('change', onMotionChange)
    resizeObserver?.disconnect()
  })
  return { active, progress, reducedMotion, manualMode, goToChapter }
}
