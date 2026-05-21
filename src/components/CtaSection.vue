<script setup>
import { onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useMagnetic } from '@/composables/useMagnetic.js'

const { el: ctaBtn, onMouseEnter: ctaEnter, onMouseLeave: ctaLeave } = useMagnetic(0.3)

onMounted(() => {
  gsap.from('.cta-line', {
    y: '105%', duration: 1.1, stagger: 0.1, ease: 'power4.out',
    scrollTrigger: { trigger: '#cta', start: 'top 70%' },
  })
})

onUnmounted(() => {
  ScrollTrigger.getAll().forEach(t => t.kill())
})
</script>

<template>
  <section id="cta" class="bg-burgundy py-32 md:py-44 overflow-hidden">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="mb-14">
        <div class="overflow-hidden">
          <span class="cta-line block font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-cream leading-none tracking-tighter">
            Begin your skin
          </span>
        </div>
        <div class="overflow-hidden">
          <span class="cta-line block font-display text-5xl md:text-7xl lg:text-8xl font-semibold italic text-gold leading-none tracking-tighter">
            transformation
          </span>
        </div>
        <div class="overflow-hidden">
          <span class="cta-line block font-display text-5xl md:text-7xl lg:text-8xl font-semibold text-cream leading-none tracking-tighter">
            today.
          </span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-start sm:items-center gap-8">
        <a ref="ctaBtn"
          href="https://bookings.gettimely.com/llccosmetic/bb/book?category=508338"
          target="_blank" rel="noopener"
          class="inline-flex items-center gap-3 px-8 py-4 bg-cream text-charcoal text-xs font-body font-medium tracking-widest uppercase hover:bg-cream-dark transition-colors duration-300"
          @mouseenter="ctaEnter" @mouseleave="ctaLeave">
          Book Free Consultation
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2.917 7h8.166M7 2.917L11.083 7 7 11.083" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>

        <div class="text-cream/55 font-body">
          <p class="text-sm mb-1">No commitment. Personalised to you.</p>
          <a href="tel:0730921378" class="text-xs tracking-widest uppercase font-body hover:text-cream transition-colors duration-200">
            07 3092 1378
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
