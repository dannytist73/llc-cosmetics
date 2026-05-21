/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  safelist: [
    'clinic-brisbane',
    'clinic-sunnybank',
    'clinic-southport',
    'clinic-robina',
  ],
  theme: {
    extend: {
      colors: {
        burgundy: { DEFAULT: '#663130', light: '#7a3d3c', dark: '#4a2322' },
        coral: '#D25239',
        cream: { DEFAULT: '#FFF7F1', dark: '#F5EFEE' },
        charcoal: '#1A1512',
        'warm-gray': '#8B7D7B',
        gold: '#C4A882',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
