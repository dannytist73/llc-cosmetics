<script setup>
import AppNav from './components/AppNav.vue'
import HeroSection from './components/HeroSection.vue'
import MarqueeBar from './components/MarqueeBar.vue'
import ServicesSection from './components/ServicesSection.vue'
import AboutSection from './components/AboutSection.vue'
import TeamSection from './components/TeamSection.vue'
import LocationsSection from './components/LocationsSection.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import CtaSection from './components/CtaSection.vue'
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="relative overflow-x-hidden">
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
