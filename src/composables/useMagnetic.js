import { ref } from 'vue'

export function useMagnetic(strength = 0.4) {
  const el = ref(null)

  const onMouseMove = (e) => {
    if (!el.value) return
    const rect = el.value.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.value.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const onMouseEnter = () => {
    if (!el.value) return
    el.value.style.transition = 'transform 0.15s cubic-bezier(0.33, 1, 0.68, 1)'
    window.addEventListener('mousemove', onMouseMove)
  }

  const onMouseLeave = () => {
    window.removeEventListener('mousemove', onMouseMove)
    if (!el.value) return
    el.value.style.transition = 'transform 0.6s cubic-bezier(0.33, 1, 0.68, 1)'
    el.value.style.transform = 'translate(0px, 0px)'
  }

  return { el, onMouseEnter, onMouseLeave }
}
