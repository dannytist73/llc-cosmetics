<script setup>
const navLinks = [
  { href: '#services',  label: 'Treatments' },
  { href: '#about',     label: 'About Us'   },
  { href: '#team',      label: 'Our Team'   },
  { href: '#locations', label: 'Clinics'    },
]

const clinics = [
  { name: 'Brisbane CBD', address: '2/97 Creek Street QLD 4000' },
  { name: 'Sunnybank',    address: '250 McCullough Street QLD 4109' },
  { name: 'Southport',    address: '138 Queen Street QLD 4215' },
  { name: 'Robina',       address: '133 Laver Drive QLD 4226' },
]
</script>

<template>
  <footer class="bg-charcoal border-t border-white/5">
    <div class="max-w-7xl mx-auto px-6 lg:px-10 py-16 md:py-20">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

        <!-- Logo + tagline + social -->
        <div>
          <img src="/logos/logo-white.png" alt="LLC Cosmetic Laser Clinics" class="h-10 mb-5" />
          <p class="text-cream/45 text-sm font-body leading-relaxed max-w-[240px]">
            Advanced, non-surgical skin & laser treatments performed by medical experts.
          </p>
          <div class="flex gap-4 mt-7">
            <a href="https://www.facebook.com/LLCClinic/" target="_blank" rel="noopener"
              class="text-cream/35 hover:text-cream transition-colors duration-200" aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/llccosmeticlaserclinics/" target="_blank" rel="noopener"
              class="text-cream/35 hover:text-cream transition-colors duration-200" aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="https://www.tiktok.com/@llccosmeticlaserclinics" target="_blank" rel="noopener"
              class="text-cream/35 hover:text-cream transition-colors duration-200" aria-label="TikTok">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.98a8.27 8.27 0 004.84 1.55V7.08a4.85 4.85 0 01-1.07-.39z"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Nav links -->
        <div>
          <div class="text-cream/35 text-xs font-body tracking-widest uppercase mb-5">Navigation</div>
          <div class="flex flex-col gap-3">
            <a v-for="link in navLinks" :key="link.href" :href="link.href"
              class="text-cream/55 hover:text-cream text-sm font-body transition-colors duration-200">
              {{ link.label }}
            </a>
            <a href="https://bookings.gettimely.com/llccosmetic/bb/book?category=508338"
              target="_blank" rel="noopener"
              class="text-gold hover:text-gold/75 text-sm font-body transition-colors duration-200">
              Book a Consultation
            </a>
          </div>
        </div>

        <!-- Contact + clinics -->
        <div>
          <div class="text-cream/35 text-xs font-body tracking-widest uppercase mb-5">Contact</div>
          <div class="flex flex-col gap-2 mb-7">
            <a href="tel:0730921378"
              class="text-cream/55 hover:text-cream text-sm font-body transition-colors duration-200">07 3092 1378</a>
            <a href="mailto:info@llccosmetic.com"
              class="text-cream/55 hover:text-cream text-sm font-body transition-colors duration-200">info@llccosmetic.com</a>
            <span class="text-cream/35 text-sm font-body">Mon–Sun · 10:00–18:00</span>
          </div>
          <div class="text-cream/35 text-xs font-body tracking-widest uppercase mb-3">Clinics</div>
          <div class="flex flex-col gap-2">
            <div v-for="clinic in clinics" :key="clinic.name" class="text-xs font-body leading-relaxed">
              <span class="text-cream/50">{{ clinic.name }}</span>
              <span class="text-cream/30"> — {{ clinic.address }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <span class="text-cream/25 text-xs font-body">© 2026 LLC Cosmetic Laser Clinics. All rights reserved.</span>
        <div class="flex gap-6">
          <a href="#" class="text-cream/25 hover:text-cream/55 text-xs font-body transition-colors">Privacy Policy</a>
          <a href="#" class="text-cream/25 hover:text-cream/55 text-xs font-body transition-colors">Terms & Conditions</a>
        </div>
      </div>
    </div>
  </footer>
</template>
