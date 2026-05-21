<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const current = ref(0)
let timer = null

const reviews = [
  { quote: "Pooja was absolutely incredible — the PICO laser treatment has transformed my skin. I've struggled with pigmentation for years and now I feel confident going makeup-free.",    name: 'Anika R.',     service: 'PICO Laser' },
  { quote: "Dr. Yousef was professional and thorough during my consultation. The HIFU results exceeded my expectations — I look five years younger and there was genuinely zero downtime.", name: 'Charlotte M.', service: 'HIFU Tightening' },
  { quote: "I was nervous about laser hair removal but the team made me feel completely at ease. Six sessions in and the results are already permanent. Couldn't be happier.",               name: 'Priya S.',     service: 'Laser Hair Removal' },
  { quote: "Diana explained the science behind every treatment in a way that actually made sense. You can tell the whole team really knows their craft.",                                    name: 'Marcus T.',    service: 'Cosmofacial' },
  { quote: "The Brisbane CBD clinic is spotlessly clean and the staff are so warm. My CO2 resurfacing has completely changed the texture of my skin after just two sessions.",              name: 'Jennifer L.',  service: 'CO2 Resurfacing' },
  { quote: "Had tattoo removal at the Robina clinic — the PICO results were faster than I expected. Faded more in two sessions than years of other treatments elsewhere.",                  name: 'Tom B.',       service: 'Tattoo Removal' },
]

const crossfade = (toIndex) => {
  gsap.to('.review-body', {
    opacity: 0, y: -8, duration: 0.3,
    onComplete() {
      current.value = toIndex
      gsap.fromTo('.review-body', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4 })
    },
  })
}

const next = () => crossfade((current.value + 1) % reviews.length)
const prev = () => crossfade((current.value - 1 + reviews.length) % reviews.length)
const goTo = (i) => { if (i !== current.value) crossfade(i) }

onMounted(() => { timer = setInterval(next, 5500) })
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <section id="testimonials" class="bg-charcoal py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">

      <div class="flex items-start justify-between mb-14">
        <div>
          <div class="section-label text-cream/35 mb-3">What Our Patients Say</div>
          <div class="flex items-center gap-2">
            <span class="text-gold text-sm">★★★★★</span>
            <span class="text-gold text-sm font-body">4.9 / 5 · 397 verified Google reviews</span>
          </div>
        </div>
        <div class="flex gap-2 mt-1">
          <button @click="prev" aria-label="Previous"
            class="w-10 h-10 border border-cream/15 flex items-center justify-center text-cream/40 hover:border-cream/40 hover:text-cream transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8l5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
          <button @click="next" aria-label="Next"
            class="w-10 h-10 border border-cream/15 flex items-center justify-center text-cream/40 hover:border-cream/40 hover:text-cream transition-all duration-200">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M6 3l5 5-5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
          </button>
        </div>
      </div>

      <div class="review-body max-w-3xl">
        <div class="font-display text-8xl text-burgundy/50 leading-none mb-4 -ml-2">"</div>
        <p class="font-display text-2xl md:text-3xl lg:text-[2.2rem] text-cream font-normal italic leading-snug tracking-tight mb-8">
          {{ reviews[current].quote }}
        </p>
        <div class="flex items-center gap-4">
          <div class="w-8 h-px bg-gold/50"></div>
          <div>
            <div class="text-cream font-body font-medium text-sm">{{ reviews[current].name }}</div>
            <div class="text-warm-gray text-xs font-body tracking-wider uppercase mt-0.5">{{ reviews[current].service }}</div>
          </div>
        </div>
      </div>

      <div class="flex gap-2 mt-12">
        <button v-for="(_, i) in reviews" :key="i" @click="goTo(i)"
          class="h-px transition-all duration-400 ease-out"
          :class="current === i ? 'w-10 bg-gold' : 'w-5 bg-cream/25'"
          :aria-label="`Review ${i + 1}`">
        </button>
      </div>
    </div>
  </section>
</template>
