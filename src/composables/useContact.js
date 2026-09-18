import { site } from '@/data/site'
import { useToast } from './useToast'

const phone = atob(site.phoneBase64)
const masked = `${phone.slice(0, 3)}****${phone.slice(7)}`
const isMobile = /Android|iPhone|iPad|iPod|HarmonyOS|Mobile|Windows Phone/i.test(navigator.userAgent)

export function useContact() {
  const { show } = useToast()

  function copyText(text, msg) {
    const fallback = () => {
      const ta = document.createElement('textarea')
      ta.value = text
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.top = '-1000px'
      document.body.appendChild(ta)
      ta.select()
      try {
        document.execCommand('copy')
        show(msg)
      } catch {
        show('复制失败，请手动记录')
      }
      document.body.removeChild(ta)
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(() => show(msg), fallback)
    } else {
      fallback()
    }
  }

  /** 移动端唤起拨号盘；桌面端复制号码 */
  function handleCall(event) {
    const el = event.currentTarget

    if (isMobile) {
      if (el.tagName !== 'A') window.location.href = `tel:${phone}`
      return
    }

    event.preventDefault()
    copyText(phone, `已复制手机号 ${phone}`)
  }

  function handleCopy(value, label) {
    copyText(value, `已复制${label} ${value}`)
  }

  return { phone, masked, isMobile, handleCall, handleCopy }
}