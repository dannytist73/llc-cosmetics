<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const clinics = [
  { id: 'brisbane',  name: 'Brisbane CBD', address: '2/97 Creek Street, Brisbane City QLD 4000',                    image: '/clinics/brisbane.jpg',  maps: 'https://maps.google.com/?q=2/97+Creek+Street+Brisbane+QLD' },
  { id: 'sunnybank', name: 'Sunnybank',    address: 'Times Square Level 1, 250 McCullough Street, QLD 4109',        image: '/clinics/sunnybank.jpg', maps: 'https://maps.google.com/?q=250+McCullough+Street+Sunnybank+QLD' },
  { id: 'southport', name: 'Southport',    address: '138 Queen Street, Southport QLD 4215',                          image: '/clinics/southport.jpg', maps: 'https://maps.google.com/?q=138+Queen+Street+Southport+QLD' },
  { id: 'robina',    name: 'Robina',       address: '133 Laver Drive, Robina QLD 4226',                              image: '/clinics/robina.jpg',    maps: 'https://maps.google.com/?q=133+Laver+Drive+Robina+QLD' },
]

onMounted(() => {
  gsap.from('.clinic-card', {
    y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
    scrollTrigger: { trigger: '#locations', start: 'top 75%' },
  })
})
</script>

<template>
  <section id="locations" class="bg-cream-dark py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="mb-12">
        <div class="section-label mb-3">Find Us</div>
        <h2 class="font-display text-5xl md:text-6xl font-semibold text-charcoal leading-none tracking-tighter">
          Four Clinics Across<br />
          <em class="italic text-burgundy">Queensland</em>
        </h2>
      </div>

      <div class="locations-grid">
        <div
          v-for="clinic in clinics"
          :key="clinic.id"
          :class="`clinic-card clinic-${clinic.id} relative overflow-hidden group cursor-default h-60 md:h-auto`"
        >
          <img :src="clinic.image" :alt="`${clinic.name} Clinic`"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />

          <!-- Permanent dark gradient at bottom -->
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent"></div>

          <!-- Hover overlay -->
          <div class="absolute inset-0 bg-charcoal/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
            <div class="text-cream font-display text-2xl font-semibold mb-1">{{ clinic.name }}</div>
            <div class="text-cream/65 text-sm font-body leading-relaxed mb-3">{{ clinic.address }}</div>
            <a :href="clinic.maps" target="_blank" rel="noopener"
              class="text-gold text-xs font-body tracking-widest uppercase hover:text-cream transition-colors duration-200">
              Get Directions →
            </a>
          </div>

          <!-- Always-visible label -->
          <div class="absolute bottom-4 left-5 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
            <div class="text-cream font-display text-xl font-semibold drop-shadow-sm">{{ clinic.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
