/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f5f5f5',
        primary: '#a5382b',
        secondary: '#d8b084',
        tertiary: '#115814',
        'primary-light': 'rgba(165, 56, 43, 0.9)',
        'primary-lighter': 'rgba(165, 56, 43, 0.15)',
        'secondary-light': 'rgba(216, 176, 132, 0.9)',
        'secondary-lighter': 'rgba(216, 176, 132, 0.15)',
        'tertiary-light': 'rgba(17, 88, 20, 0.9)',
        'tertiary-lighter': 'rgba(17, 88, 20, 0.15)',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        lato: ['Lato', 'sans-serif'],
        switzer: ['Inter', 'sans-serif'],
        crimson: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
};