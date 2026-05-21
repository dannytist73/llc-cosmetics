<script setup>
import { ref, inject, watch, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { useMagnetic } from '@/composables/useMagnetic.js'

const siteReady = inject('siteReady', ref(true))

const scrollIndicator = ref(null)
const { el: bookBtn, onMouseEnter: bookEnter, onMouseLeave: bookLeave } = useMagnetic(0.4)
const { el: exploreBtn, onMouseEnter: exploreEnter, onMouseLeave: exploreLeave } = useMagnetic(0.4)

let bounceTween = null
let heroPlayed = false

const hideIndicator = () => {
  if (window.scrollY > 200) gsap.to(scrollIndicator.value, { opacity: 0, duration: 0.3 })
}

const playHeroIntro = () => {
  if (heroPlayed) return
  heroPlayed = true

  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
  tl.from('.hero-line', { y: '110%', duration: 1.2, stagger: 0.15, delay: 0.2 })
    .from('.hero-sub', { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')
    .from('.hero-ctas', { y: 20, opacity: 0, duration: 0.8 }, '-=0.5')
    .from('.hero-badge', { y: 10, opacity: 0, duration: 0.6 }, '-=0.4')

  if (scrollIndicator.value) {
    bounceTween = gsap.to(scrollIndicator.value, {
      y: 10, duration: 0.9, repeat: -1, yoyo: true, ease: 'power1.inOut',
    })
  }
}

watch(siteReady, (ready) => {
  if (ready) playHeroIntro()
}, { immediate: true })

onMounted(() => {
  window.addEventListener('scroll', hideIndicator, { passive: true })
})

onUnmounted(() => {
  bounceTween?.kill()
  window.removeEventListener('scroll', hideIndicator)
})
</script>

<template>
  <section class="relative min-h-[100dvh] flex items-end overflow-hidden bg-charcoal">
    <video class="absolute inset-0 w-full h-full object-cover" autoplay muted loop playsinline preload="auto"
      poster="/video/hero-video-poster.jpg">
      <source src="/video/hero-video.mp4" type="video/mp4" />
    </video>

    <div class="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/25"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 pt-32 w-full">
      <p class="section-label text-cream/40 mb-6">Brisbane & Gold Coast · Est. 2017</p>

      <h1 class="font-display font-semibold leading-none tracking-tighter mb-8">
        <div class="overflow-hidden">
          <span class="hero-line block text-cream text-5xl md:text-7xl lg:text-[7rem]">Advanced</span>
        </div>
        <div class="overflow-hidden">
          <span class="hero-line block text-gold italic text-5xl md:text-7xl lg:text-[7rem]">Non-Surgical</span>
        </div>
        <div class="overflow-hidden">
          <span class="hero-line block text-cream text-5xl md:text-7xl lg:text-[7rem]">Treatments.</span>
        </div>
      </h1>

      <p class="hero-sub text-cream/65 font-body font-light text-base md:text-lg max-w-lg leading-relaxed mb-10">
        Medically supervised aesthetic treatments that enhance natural beauty.<br class="hidden md:block" />
        Four clinics across Brisbane &amp; Gold Coast.
      </p>

      <div class="hero-ctas flex flex-wrap gap-4 mb-16">
        <a ref="bookBtn"
          href="https://bookings.gettimely.com/llccosmetic/bb/book?category=508338"
          target="_blank" rel="noopener"
          class="btn-primary"
          @mouseenter="bookEnter" @mouseleave="bookLeave">
          Book Free Consultation
        </a>
        <a ref="exploreBtn" href="#services" class="btn-outline"
          @mouseenter="exploreEnter" @mouseleave="exploreLeave">
          Explore Treatments
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.917 7h8.166M7 2.917L11.083 7 7 11.083" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>

      <div class="hero-badge flex items-center gap-3 text-cream/50 text-xs font-body tracking-wider">
        <span class="text-gold">★★★★★</span>
        <span>4.9 · 397 verified reviews · 55,000+ patients served</span>
      </div>
    </div>

    <div ref="scrollIndicator" class="absolute bottom-8 right-10 flex flex-col items-center gap-2 pointer-events-none">
      <span class="text-cream/40 text-xs tracking-widest uppercase font-body writing-mode-vertical hidden lg:block">Scroll</span>
      <svg width="20" height="32" viewBox="0 0 20 32" fill="none">
        <rect x="1.5" y="1.5" width="17" height="29" rx="8.5" stroke="rgba(255,247,241,0.25)" stroke-width="1.5"/>
        <rect x="9" y="7" width="2" height="6" rx="1" fill="rgba(255,247,241,0.4)"/>
      </svg>
    </div>
  </section>
</template>
