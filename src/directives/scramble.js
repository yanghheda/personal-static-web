/**
 * v-scramble —— 悬停时文本字符从随机符号逐位还原（终端扰码效果）
 * 用在站点导览编号上：监听最近 .index__link 祖先的 mouseenter 触发
 * prefers-reduced-motion 时不注册
 */

const POOL = '!<>-_\\/[]{}—=+*^?#01'

export const scramble = {
  mounted(el) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const original = el.textContent
    const host = el.closest('.index__link') || el
    let raf = 0

    const run = () => {
      cancelAnimationFrame(raf)
      const start = performance.now()
      const duration = 420

      const frame = (now) => {
        const t = Math.min((now - start) / duration, 1)
        const resolved = Math.floor(t * original.length)
        let out = ''
        for (let i = 0; i < original.length; i++) {
          out += i < resolved ? original[i] : POOL[(Math.random() * POOL.length) | 0]
        }
        el.textContent = out
        if (t < 1) raf = requestAnimationFrame(frame)
        else el.textContent = original
      }
      raf = requestAnimationFrame(frame)
    }

    host.addEventListener('mouseenter', run)
    el._scrambleCleanup = () => {
      host.removeEventListener('mouseenter', run)
      cancelAnimationFrame(raf)
      el.textContent = original
    }
  },

  unmounted(el) {
    el._scrambleCleanup?.()
  },
}
