<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const sectionRef = ref(null)
const displayVals = reactive(['0', '0', '0', '0'])

const counterDefs = [
  { label: 'Years in Business',     target: 7,      suffix: '+', large: false },
  { label: 'Patients Treated',      target: 55000,  suffix: '+', large: true  },
  { label: 'Clinic Locations',      target: 4,      suffix: '',  large: false },
  { label: 'Successful Treatments', target: 100000, suffix: '+', large: true  },
]

const values = [
  { name: 'Integrity',    desc: 'Honest recommendations. Transparent results.' },
  { name: 'Excellence',   desc: 'World-class technology meets expert hands.' },
  { name: 'Innovation',   desc: 'Latest skin treatment advancements.' },
  { name: 'Compassion',   desc: 'Every treatment tailored with care.' },
  { name: 'Empowerment',  desc: 'Educate, inform, guide on your skincare journey.' },
]

let triggers = []

onMounted(() => {
  const st = ScrollTrigger.create({
    trigger: sectionRef.value,
    start: 'top 75%',
    once: true,
    onEnter() {
      counterDefs.forEach((def, i) => {
        const proxy = { v: 0 }
        gsap.to(proxy, {
          v: def.target,
          duration: 2.5,
          ease: 'power2.out',
          onUpdate() {
            displayVals[i] = def.large
              ? `${Math.round(proxy.v / 1000)}K`
              : `${Math.round(proxy.v)}`
          },
        })
      })
    },
  })
  triggers.push(st)

  const st2 = gsap.from('.value-item', {
    x: -30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.values-list', start: 'top 80%' },
  })
  triggers.push(st2.scrollTrigger)
})

onUnmounted(() => triggers.forEach(t => t?.kill?.()))
</script>

<template>
  <section id="about" ref="sectionRef" class="bg-cream py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="section-label mb-8">About LLC Cosmetic</div>

      <blockquote class="font-display text-3xl md:text-5xl lg:text-6xl font-semibold italic text-charcoal leading-tight tracking-tighter max-w-4xl mb-20">
        "Personalised, medically supervised aesthetic treatments that enhance natural beauty, improve skin health, and empower confidence."
      </blockquote>

      <!-- Animated counters -->
      <div class="grid grid-cols-2 md:grid-cols-4 border-t border-charcoal/10 mb-20">
        <div v-for="(def, i) in counterDefs" :key="def.label"
          class="py-10 pr-6 border-b border-r border-charcoal/10 last:border-r-0">
          <div class="font-display text-5xl md:text-6xl font-semibold text-burgundy leading-none mb-2">
            {{ displayVals[i] }}{{ def.suffix }}
          </div>
          <div class="text-warm-gray text-xs font-body tracking-wider uppercase">{{ def.label }}</div>
        </div>
      </div>

      <!-- Values -->
      <div class="section-label mb-6">Core Values</div>
      <div class="values-list border-t border-charcoal/10">
        <div v-for="value in values" :key="value.name"
          class="value-item flex items-baseline justify-between py-5 border-b border-charcoal/10 group">
          <span class="font-display text-2xl md:text-3xl font-semibold text-charcoal group-hover:text-burgundy transition-colors duration-300">
            {{ value.name }}
          </span>
          <span class="text-warm-gray text-sm font-body max-w-xs text-right hidden md:block">
            {{ value.desc }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
