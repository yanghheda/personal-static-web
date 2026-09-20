/**
 * v-countup —— 进入视口时数字从 0 递增到目标值
 * 用法：v-countup="s.n"（目标值为数字字符串，保留前导零宽度）
 * prefers-reduced-motion 或不支持 IntersectionObserver 时直接显示原值
 */

let observer = null

function getObserver() {
  if (observer) return observer
  if (!('IntersectionObserver' in window)) return null

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        run(entry.target)
        observer.unobserve(entry.target)
      })
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.4 },
  )

  return observer
}

function run(el) {
  const target = el._countupTarget
  const n = parseInt(target, 10)
  const duration = 1100
  const start = performance.now()

  const frame = (now) => {
    const t = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - t, 3)
    el.textContent = String(Math.round(eased * n)).padStart(target.length, '0')
    if (t < 1) requestAnimationFrame(frame)
  }
  requestAnimationFrame(frame)
}

export const countup = {
  mounted(el, binding) {
    const target = String(binding.value ?? el.textContent).trim()
    if (!/^\d+$/.test(target)) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const io = getObserver()
    if (!io) return // 保持插值渲染出的原值

    el._countupTarget = target
    el.textContent = '0'.repeat(target.length)
    io.observe(el)
  },

  unmounted(el) {
    observer?.unobserve(el)
  },
}
