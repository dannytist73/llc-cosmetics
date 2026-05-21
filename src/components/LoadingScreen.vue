<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { usePreloader } from '@/composables/usePreloader.js'

const emit = defineEmits(['complete'])

const { progress, isReady, releaseScroll } = usePreloader()

const root = ref(null)
const content = ref(null)
const curtainTop = ref(null)
const curtainBottom = ref(null)
const progressBar = ref(null)
const lineLeft = ref(null)
const lineRight = ref(null)

let exitTween = null
const reducedMotion = ref(false)

const runExit = () => {
  if (!root.value || reducedMotion.value) {
    releaseScroll()
    emit('complete')
    return
  }

  exitTween = gsap.timeline({
    defaults: { ease: 'power4.inOut' },
    onComplete: () => {
      releaseScroll()
      emit('complete')
    },
  })

  exitTween
    .to(content.value, { opacity: 0, y: -24, duration: 0.55, ease: 'power3.in' })
    .to(
      [lineLeft.value, lineRight.value],
      { scaleX: 0, duration: 0.5, ease: 'power3.in' },
      '-=0.35',
    )
    .to(
      progressBar.value,
      { scaleX: 0, opacity: 0, duration: 0.4 },
      '-=0.4',
    )
    .to(
      curtainTop.value,
      { yPercent: -100, duration: 1.35, ease: 'power4.inOut' },
      '-=0.15',
    )
    .to(
      curtainBottom.value,
      { yPercent: 100, duration: 1.35, ease: 'power4.inOut' },
      '<',
    )
    .to(root.value, { autoAlpha: 0, duration: 0.2, pointerEvents: 'none' }, '-=0.1')
}

watch(isReady, (ready) => {
  if (!ready) return
  progress.value = 100
  window.setTimeout(runExit, 280)
})

onMounted(() => {
  reducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reducedMotion.value) {
    releaseScroll()
    emit('complete')
    return
  }

  gsap.set([curtainTop.value, curtainBottom.value], { yPercent: 0 })
  gsap.set(content.value, { opacity: 0, y: 18 })
  gsap.set([lineLeft.value, lineRight.value], { scaleX: 0, transformOrigin: 'center center' })
  gsap
    .timeline({ defaults: { ease: 'power3.out' } })
    .to(content.value, { opacity: 1, y: 0, duration: 1.1, delay: 0.15 })
    .to([lineLeft.value, lineRight.value], { scaleX: 1, duration: 1.2, stagger: 0.08 }, '-=0.7')
})

onUnmounted(() => {
  exitTween?.kill()
})
</script>

<template>
  <div
    ref="root"
    class="loader fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
    aria-live="polite"
    aria-busy="true"
    :aria-label="`Loading site, ${progress} percent`"
  >
    <!-- Curtains unravel to reveal the page beneath -->
    <div
      ref="curtainTop"
      class="loader-curtain absolute top-0 left-0 right-0 h-[52%] bg-charcoal will-change-transform"
    />
    <div
      ref="curtainBottom"
      class="loader-curtain absolute bottom-0 left-0 right-0 h-[52%] bg-charcoal will-change-transform"
    />

    <!-- Center seam -->
    <div
      class="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent z-[2] pointer-events-none"
    />

    <!-- Ambient warm glow behind content -->
    <div class="absolute inset-0 flex items-center justify-center z-[1] pointer-events-none">
      <div class="w-[480px] h-[480px] rounded-full bg-gold/[0.06] blur-[110px]" />
    </div>

    <div
      ref="content"
      class="relative z-10 flex flex-col items-center text-center px-6 max-w-xs"
    >
      <!-- Top ornamental divider -->
      <div class="flex items-center gap-3 w-full max-w-[200px] mb-10">
        <span class="h-px flex-1 bg-gold/35" />
        <span class="text-gold/50 text-[8px] tracking-[0.45em] uppercase font-body shrink-0">LLC</span>
        <span class="h-px flex-1 bg-gold/35" />
      </div>

      <img
        src="/logos/logo-white.png"
        alt=""
        class="h-16 md:h-20 w-auto mb-10"
        width="280"
        height="80"
      />

      <p class="font-display text-cream/90 text-2xl md:text-3xl font-light tracking-[0.08em] mb-2">
        Laser &amp; Skin Clinics
      </p>
      <p class="text-cream/40 text-[10px] font-body tracking-[0.35em] uppercase mb-10">
        Brisbane &amp; Gold Coast
      </p>

      <div class="w-full max-w-[220px] mb-3">
        <div class="h-[1.5px] w-full bg-cream/[0.07] overflow-hidden rounded-full">
          <div
            ref="progressBar"
            class="h-full bg-gradient-to-r from-burgundy via-gold to-coral origin-left will-change-transform transition-transform duration-300 ease-out"
            :style="{ transform: `scaleX(${Math.max(0.02, progress / 100)})` }"
          />
        </div>
      </div>
      <p class="text-cream/30 text-[10px] font-body tabular-nums tracking-widest mb-12">
        {{ progress }}%
      </p>

      <div class="flex items-center gap-3 w-full max-w-[200px]">
        <span ref="lineLeft" class="h-px flex-1 bg-gold/40 origin-right" />
        <span class="text-gold/60 text-[9px] tracking-[0.4em] uppercase font-body shrink-0">Est. 2017</span>
        <span ref="lineRight" class="h-px flex-1 bg-gold/40 origin-left" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.loader-curtain {
  box-shadow: 0 0 80px rgba(0, 0, 0, 0.45);
}
</style>
