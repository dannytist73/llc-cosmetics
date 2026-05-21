<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const navLinks = [
  { href: '#services', label: 'Treatments' },
  { href: '#about', label: 'About' },
  { href: '#team', label: 'Our Team' },
  { href: '#locations', label: 'Clinics' },
]

const scrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => { scrolled.value = window.scrollY > 80 }

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <nav :class="[
    'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
    scrolled ? 'bg-charcoal/90 backdrop-blur-md py-4 border-b border-white/5' : 'py-7'
  ]">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between">

      <a href="#">
        <img :src="scrolled ? '/logos/logo-full.png' : '/logos/logo-white.png'"
          alt="LLC Cosmetic Laser Clinics" class="h-9 transition-all duration-500" />
      </a>

      <div class="hidden lg:flex items-center gap-10">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          class="text-cream/70 hover:text-cream text-sm font-body tracking-wide transition-colors duration-200">
          {{ link.label }}
        </a>
      </div>

      <a href="https://bookings.gettimely.com/llccosmetic/bb/book?category=508338"
        target="_blank" rel="noopener"
        class="hidden lg:inline-flex items-center px-6 py-2.5 border border-cream/30 text-cream text-xs tracking-widest uppercase hover:bg-cream/10 hover:border-cream/60 transition-all duration-300">
        Book Free Consult
      </a>

      <button @click="menuOpen = !menuOpen" class="lg:hidden flex flex-col gap-1.5 p-2" aria-label="Toggle menu">
        <span :class="['block w-6 h-px bg-cream transition-all duration-300', menuOpen ? 'rotate-45 translate-y-2' : '']"></span>
        <span :class="['block w-4 h-px bg-cream transition-all duration-300', menuOpen ? 'opacity-0' : '']"></span>
        <span :class="['block w-6 h-px bg-cream transition-all duration-300', menuOpen ? '-rotate-45 -translate-y-2' : '']"></span>
      </button>
    </div>

    <div :class="[
      'lg:hidden absolute top-full left-0 right-0 bg-charcoal/95 backdrop-blur-md border-t border-white/5 overflow-hidden transition-all duration-300',
      menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
    ]">
      <div class="px-6 py-6 flex flex-col gap-5">
        <a v-for="link in navLinks" :key="link.href" :href="link.href"
          class="text-cream/70 hover:text-cream text-base font-body tracking-wide transition-colors"
          @click="menuOpen = false">{{ link.label }}</a>
        <a href="https://bookings.gettimely.com/llccosmetic/bb/book?category=508338"
          target="_blank" rel="noopener"
          class="inline-flex px-6 py-3 border border-cream/30 text-cream text-xs tracking-widest uppercase hover:bg-cream/10 transition-all w-fit"
          @click="menuOpen = false">
          Book Free Consult
        </a>
      </div>
    </div>
  </nav>
</template>
