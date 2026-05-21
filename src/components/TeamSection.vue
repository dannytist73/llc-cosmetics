<script setup>
import { onMounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const team = [
  { name: 'Dr. Yousef Khammar', role: 'Cosmetic Doctor',   cred: 'MBBS, FRACGP', image: '/staff/yousef-khammar.png' },
  { name: 'Diana Binny',         role: 'Medical Physicist', cred: 'PhD',           image: '/staff/diana-binny.png'   },
  { name: 'Dusty',               role: 'Registered Nurse',  cred: 'RN',            image: '/staff/dusty.webp'        },
  { name: 'Elizabeth',           role: 'Dermal Therapist',  cred: 'DT',            image: '/staff/elizabeth.png'     },
  { name: 'Isabella',            role: 'Registered Nurse',  cred: 'RN',            image: '/staff/isabella.png'      },
  { name: 'Mary',                role: 'Dermal Therapist',  cred: 'DT',            image: '/staff/mary.png'          },
  { name: 'Pooja',               role: 'Dermal Therapist',  cred: 'DT',            image: '/staff/pooja.png'         },
  { name: 'Kristina',            role: 'Dermal Therapist',  cred: 'DT',            image: '/staff/kristina.png'      },
  { name: 'Moseka',              role: 'Dermal Therapist',  cred: 'DT',            image: '/staff/moseka.webp'       },
]

const featured = team.slice(0, 2)
const rest = team.slice(2)

onMounted(() => {
  gsap.from('.team-card', {
    y: 40, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
    scrollTrigger: { trigger: '#team', start: 'top 75%' },
  })
})
</script>

<template>
  <section id="team" class="bg-cream py-24 md:py-32">
    <div class="max-w-7xl mx-auto px-6 lg:px-10">
      <div class="mb-12">
        <div class="section-label mb-3">The People Behind Your Results</div>
        <h2 class="font-display text-5xl md:text-6xl font-semibold text-charcoal leading-none tracking-tighter">
          Our <em class="italic text-burgundy">Experts</em>
        </h2>
      </div>

      <!-- Featured: Dr. Yousef & Diana -->
      <div class="grid grid-cols-2 gap-1.5 mb-1.5">
        <div v-for="member in featured" :key="member.name"
          class="team-card relative overflow-hidden cursor-default">
          <div class="aspect-[3/4]">
            <img :src="member.image" :alt="member.name"
              class="w-full h-full object-cover object-top" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-5 md:p-7">
            <div class="text-cream font-body font-semibold text-base md:text-lg leading-tight">{{ member.name }}</div>
            <div class="text-gold text-xs font-body tracking-wider uppercase mt-1">{{ member.role }}</div>
            <div class="text-cream/55 text-xs font-body mt-0.5">{{ member.cred }}</div>
          </div>
        </div>
      </div>

      <!-- Rest of the team -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5">
        <div v-for="member in rest" :key="member.name"
          class="team-card relative overflow-hidden cursor-default">
          <div class="aspect-[3/4]">
            <img :src="member.image" :alt="member.name"
              class="w-full h-full object-cover object-top" />
          </div>
          <div class="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-transparent to-transparent"></div>
          <div class="absolute bottom-0 left-0 right-0 p-4">
            <div class="text-cream font-body font-medium text-sm leading-tight">{{ member.name }}</div>
            <div class="text-gold text-xs font-body tracking-wider uppercase mt-0.5">{{ member.role }}</div>
            <div class="text-cream/50 text-xs font-body mt-0.5">{{ member.cred }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
