<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { gsap } from 'gsap'

const trackRef = ref(null)
let tween = null

const items = [
  '7+ Years of Excellence', '55,000+ Patients Treated', '4 Clinic Locations',
  '100,000+ Successful Treatments', '20 Skin Experts', '4.9★ Google Rating',
  'FDA-Approved Technologies', 'Zero Downtime Procedures',
]

onMounted(() => {
  tween = gsap.to(trackRef.value, {
    xPercent: -50, duration: 28, ease: 'none', repeat: -1,
  })
})

onUnmounted(() => tween?.kill())
</script>

<template>
  <div class="bg-burgundy overflow-hidden h-14 flex items-center select-none"
    @mouseenter="tween?.pause()" @mouseleave="tween?.resume()">
    <div ref="trackRef" class="flex items-center whitespace-nowrap will-change-transform">
      <template v-for="set in 2" :key="set">
        <span v-for="item in items" :key="`${set}-${item}`"
          class="text-cream/75 text-xs font-body tracking-widest uppercase mx-6 flex-shrink-0">
          {{ item }}<span class="text-gold/60 ml-6">·</span>
        </span>
      </template>
    </div>
  </div>
</template>
