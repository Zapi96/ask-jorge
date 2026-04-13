import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './hooks/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#080807',
        surface: '#100F0D',
        elevated: '#181614',
        'text-primary': '#F2EDE6',
        'text-muted': '#7A7269',
        accent: '#C9A84C',
        'accent-glow': 'rgba(201,168,76,0.12)',
        'border-default': 'rgba(255,255,255,0.07)',
        'border-gold': 'rgba(201,168,76,0.20)',
        destructive: '#EF4444',
        warning: '#F59E0B',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      keyframes: {
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-6px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
      },
      animation: {
        'bounce-dot': 'bounce-dot 1.4s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
