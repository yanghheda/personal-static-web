/**
 * v-reveal —— 滚动进入视口时触发入场动画
 * 用法：v-reveal 或 v-reveal="80"（80 为延迟毫秒数，对应原稿的内联 --d）
 */

let observer = null

function getObserver() {
  if (observer) return observer
  if (!('IntersectionObserver' in window)) return null

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-in')
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  )

  return observer
}

export const reveal = {
  mounted(el, binding) {
    el.setAttribute('data-reveal', '')
    if (binding.value) el.style.setProperty('--d', `${binding.value}ms`)

    const io = getObserver()
    if (!io) {
      // 不支持 IntersectionObserver 时直接显示
      el.classList.add('is-in')
      return
    }
    io.observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}