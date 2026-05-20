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
        cream: '#e8e4dc',
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
        head: ['var(--font-head)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        logo:   '0.18em',
        label:  '0.08em',
        button: '0.06em',
        meta:   '0.04em',
        nav:    '0.02em',
        h3:     '-0.01em',
        h2:     '-0.02em',
        h1:     '-0.04em',
      },
      fontSize: {
        eyebrow: ['11px',   { lineHeight: '1',    letterSpacing: '0.08em' }],
        label:   ['10.5px', { lineHeight: '1',    letterSpacing: '0.08em' }],
        stat:    ['36px',   { lineHeight: '1',    letterSpacing: '-0.02em' }],
      },
    },
  },
  plugins: [],
};