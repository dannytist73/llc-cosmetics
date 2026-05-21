<script setup>
import { ref, provide } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AppNav from './components/AppNav.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeBar from './components/MarqueeBar.vue'
import ServicesSection from './components/ServicesSection.vue'
import AboutSection from './components/AboutSection.vue'
import TeamSection from './components/TeamSection.vue'
import LocationsSection from './components/LocationsSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import CtaSection from './components/CtaSection.vue'
import AppFooter from './components/AppFooter.vue'

const showLoader = ref(true)
const siteReady = ref(false)

provide('siteReady', siteReady)

const onLoaderComplete = () => {
  showLoader.value = false
  siteReady.value = true
  requestAnimationFrame(() => ScrollTrigger.refresh())
}
</script>

<template>
  <LoadingScreen v-if="showLoader" @complete="onLoaderComplete" />

  <div class="relative overflow-x-clip" :aria-hidden="showLoader">
    <AppNav />
    <main>
      <HeroSection />
      <MarqueeBar />
      <ServicesSection />
      <AboutSection />
      <TeamSection />
      <LocationsSection />
      <TestimonialsSection />
      <CtaSection />
    </main>
    <AppFooter />
  </div>
</template>
