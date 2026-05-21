import { ref, onMounted, onUnmounted } from 'vue'

const MIN_MS = 900
const MAX_MS = 9000

/**
 * Waits for fonts, window load, and hero video (critical LCP asset).
 * Progress blends real readiness with a gentle simulated curve.
 */
export function usePreloader() {
  const progress = ref(0)
  const isReady = ref(false)

  let raf = 0
  let start = 0
  let destroyed = false

  const weights = { fonts: 0.2, window: 0.25, video: 0.45, minTime: 0.1 }
  const gates = { fonts: false, window: false, video: false, minTime: false }

  const updateProgress = () => {
    let p = 0
    if (gates.fonts) p += weights.fonts
    if (gates.window) p += weights.window
    if (gates.video) p += weights.video
    if (gates.minTime) p += weights.minTime
    progress.value = Math.min(100, Math.round(p * 100))
  }

  const tryFinish = () => {
    if (destroyed || isReady.value) return
    const all =
      gates.fonts && gates.window && gates.video && gates.minTime
    if (all) isReady.value = true
  }

  const preloadHeroVideo = () =>
    new Promise((resolve) => {
      const video = document.createElement('video')
      video.preload = 'auto'
      video.muted = true
      video.playsInline = true

      const done = () => {
        video.removeEventListener('canplaythrough', done)
        video.removeEventListener('loadeddata', done)
        video.src = ''
        video.load()
        resolve()
      }

      const failSafe = window.setTimeout(done, 6000)

      video.addEventListener('canplaythrough', () => {
        window.clearTimeout(failSafe)
        done()
      }, { once: true })

      video.addEventListener('loadeddata', () => {
        if (video.readyState >= 3) {
          window.clearTimeout(failSafe)
          done()
        }
      })

      video.src = '/video/hero-video.mp4'
      video.load()
    })

  onMounted(() => {
    start = performance.now()
    document.documentElement.classList.add('is-loading')

    const tick = (now) => {
      const elapsed = now - start
      const simulated = Math.min(0.92, elapsed / (MIN_MS * 1.35))
      const target = Math.max(progress.value / 100, simulated)
      if (progress.value < 100) {
        progress.value = Math.min(
          99,
          Math.max(progress.value, Math.floor(target * 100)),
        )
      }
      if (elapsed >= MIN_MS) {
        gates.minTime = true
        updateProgress()
        tryFinish()
      }
      if (!isReady.value) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    document.fonts?.ready?.then(() => {
      gates.fonts = true
      updateProgress()
      tryFinish()
    }) ?? (() => {
      gates.fonts = true
      updateProgress()
      tryFinish()
    })()

    if (document.readyState === 'complete') {
      gates.window = true
      updateProgress()
      tryFinish()
    } else {
      window.addEventListener(
        'load',
        () => {
          gates.window = true
          updateProgress()
          tryFinish()
        },
        { once: true },
      )
    }

    preloadHeroVideo().then(() => {
      gates.video = true
      updateProgress()
      tryFinish()
    })

    window.setTimeout(() => {
      if (!isReady.value) {
        gates.video = true
        gates.minTime = true
        gates.fonts = true
        gates.window = true
        progress.value = 100
        isReady.value = true
      }
    }, MAX_MS)
  })

  onUnmounted(() => {
    destroyed = true
    cancelAnimationFrame(raf)
    document.documentElement.classList.remove('is-loading')
  })

  const releaseScroll = () => {
    document.documentElement.classList.remove('is-loading')
  }

  return { progress, isReady, releaseScroll }
}
