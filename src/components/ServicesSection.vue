<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const wrapperRef = ref(null)
const activeIndex = ref(0)

const services = [
  { id: 'pico',       name: 'PICO Laser',             image: '/services/pico-laser.webp',        stat: '94% brightening success',        desc: 'Reveal brighter, clearer skin with our advanced PICO technology — targeting pigmentation, acne scars, and uneven tone.' },
  { id: 'hifu',       name: 'HIFU Tightening',         image: '/services/hifu.webp',               stat: '98% lifting satisfaction',        desc: 'Non-surgical facelift results. FDA-approved ultrasound technology with zero downtime — results lasting 12–18 months.' },
  { id: 'co2',        name: 'CO2 Resurfacing',          image: '/services/co2-laser.png',           stat: 'Deep dermal renewal',             desc: 'Fractional CO2 laser for deep skin resurfacing — dramatically improving texture, fine lines, and acne scarring.' },
  { id: 'cosmo',      name: 'Cosmofacial',              image: '/services/cosmo-facial.png',        stat: 'Signature combination treatment', desc: "LLC's exclusive signature facial combining multiple modalities for a customised, comprehensive skin transformation." },
  { id: 'aesthetics', name: 'Aesthetic Treatments',    image: '/services/aesthetics.png',          stat: 'Anti-wrinkle & dermal fillers',   desc: 'Injectables, dermal fillers, and lip enhancement performed by our cosmetic doctor and registered nurses.' },
  { id: 'rosacea',    name: 'Rosacea Treatment',        image: '/services/rosacea.png',             stat: 'Targeted vascular therapy',       desc: 'Reduce persistent redness, manage flare-ups, and restore an even, calm complexion with targeted laser therapy.' },
  { id: 'hair',       name: 'Laser Hair Removal',       image: '/services/laser-hair-removal.webp', stat: 'Permanent reduction',             desc: 'Smooth, lasting results on all skin types with our medical-grade laser systems — face, body, and beyond.' },
  { id: 'tattoo',     name: 'Tattoo Removal',           image: '/services/tattoo-removal.png',      stat: 'Safe & effective PICO removal',   desc: 'Complete removal or targeted lightening with PICO laser precision — faster results with fewer sessions.' },
]

onMounted(() => {
  const cards = gsap.utils.toArray('.service-card')

  cards.forEach((card, i) => {
    if (i > 0) gsap.set(card, { yPercent: 100 })
  })

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: wrapperRef.value,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1,
      onUpdate(self) {
        activeIndex.value = Math.min(
          Math.floor(self.progress * cards.length),
          cards.length - 1
        )
      },
    },
  })

  cards.slice(1).forEach((card) => {
    tl.to(card, { yPercent: 0, duration: 1, ease: 'none' })
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <!-- Wrapper height creates 8 viewports of scroll space -->
  <section id="services" ref="wrapperRef" :style="{ height: `${services.length * 100}dvh` }">
    <!-- Sticky container — stays pinned while user scrolls through wrapper -->
    <div class="sticky top-0 min-h-[100dvh] overflow-hidden">

      <!-- Service cards — all absolutely positioned, stack via z-index -->
      <div
        v-for="(service, i) in services"
        :key="service.id"
        class="service-card absolute inset-0 min-h-[100dvh] flex items-end overflow-hidden"
        :style="{ zIndex: i + 1 }"
      >
        <img :src="service.image" :alt="service.name"
          class="absolute inset-0 w-full h-full object-cover" />
        <div class="absolute inset-0 bg-gradient-to-r from-charcoal/82 via-charcoal/45 to-transparent"></div>

        <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-24 w-full">
          <div class="inline-flex items-center px-3 py-1.5 border border-gold/30 bg-gold/10 text-gold text-xs font-body tracking-wider uppercase mb-5 rounded-sm">
            {{ service.stat }}
          </div>
          <h2 class="font-display font-semibold text-cream leading-none tracking-tighter text-5xl md:text-7xl lg:text-8xl mb-5">
            {{ service.name }}
          </h2>
          <p class="text-cream/60 font-body font-light text-sm md:text-base max-w-md leading-relaxed mb-8">
            {{ service.desc }}
          </p>
          <a href="https://bookings.gettimely.com/llccosmetic/bb/book"
            target="_blank" rel="noopener"
            class="inline-flex items-center gap-2 text-cream/60 text-xs font-body tracking-widest uppercase hover:text-cream transition-colors duration-200 group">
            Book This Treatment
            <svg class="group-hover:translate-x-1 transition-transform duration-200" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2.917 7h8.166M7 2.917L11.083 7 7 11.083" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
        </div>
      </div>

      <!-- Section label -->
      <div class="absolute top-8 left-6 lg:left-10 z-50 pointer-events-none">
        <span class="section-label text-cream/35">Our Treatments</span>
      </div>

      <!-- Progress dots -->
      <div class="absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        <div
          v-for="(_, i) in services" :key="`dot-${i}`"
          class="rounded-full transition-all duration-300 ease-out"
          :class="activeIndex === i
            ? 'w-1.5 h-5 bg-gold'
            : 'w-1.5 h-1.5 bg-cream/25'"
        ></div>
      </div>
    </div>
  </section>
</template>
