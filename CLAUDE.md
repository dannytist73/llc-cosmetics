# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Dev server at http://localhost:5173
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```

No test runner or linter is configured.

## Architecture

**Vue 3 SPA** — single-page scroll experience. No router library; navigation uses hash anchors (`#services`, `#about`, `#team`, `#locations`). External booking via `https://bookings.gettimely.com/llccosmetic/`.

**Entry flow:** `index.html` → `src/main.js` (registers GSAP ScrollTrigger) → `App.vue` (renders all 10 sections in sequence).

**Content is fully static** — all text, service listings, clinic data, team profiles, and testimonials are hardcoded arrays inside each component's `<script setup>`. There are no API calls or data-fetching layers.

**Components** (`src/components/`) render in this order in `App.vue`:
`AppNav` → `HeroSection` → `MarqueeBar` → `ServicesSection` → `AboutSection` → `TeamSection` → `LocationsSection` → `TestimonialsSection` → `CtaSection` → `AppFooter`

**Animation strategy:**
- GSAP timelines for staggered hero text reveals on mount
- GSAP ScrollTrigger for scroll-driven card stacking in `ServicesSection`
- CSS transitions for nav background fade, button hovers, clinic card overlays
- `useMagnetic.js` composable — mouse-tracking transform applied to CTA buttons

**Styling:** Tailwind CSS with custom color palette (`burgundy`, `coral`, `cream`, `charcoal`, `warm-gray`, `gold`) and two fonts loaded from Google Fonts: **Cormorant Garamond** (headings/display) and **Outfit** (body). Custom component classes (`.btn-primary`, `.btn-outline`, `.section-label`, `.locations-grid`) are defined in `src/style.css`.

**Path alias:** `@` resolves to `./src`.

**Static assets** live in `assets/` (Vite `publicDir`) — images are referenced as `/clinics/`, `/logos/`, `/services/`, `/staff/`, `/video/` root-relative paths.

**Reference doc:** `SITE_CONTENT.md` at the project root captures the original llccosmetic.com content (addresses, brand details, booking links) used when building this site.
