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
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        elevated: 'var(--color-elevated)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-muted': 'var(--color-text-muted)',
        accent: 'var(--color-accent)',
        'accent-glow': 'var(--color-accent-glow)',
        'border-default': 'var(--color-border-default)',
        'border-gold': 'var(--color-border-gold)',
        destructive: '#EF4444',
        warning: '#F59E0B',
        'p-bg':              'var(--p-bg)',
        'p-surface':         'var(--p-surface)',
        'p-surface-low':     'var(--p-surface-low)',
        'p-surface-high':    'var(--p-surface-high)',
        'p-surface-highest': 'var(--p-surface-highest)',
        'p-primary':         'var(--p-primary)',
        'p-primary-cont':    'var(--p-primary-cont)',
        'p-secondary':       'var(--p-secondary)',
        'p-secondary-cont':  'var(--p-secondary-cont)',
        'p-on-surface':      'var(--p-on-surface)',
        'p-on-surface-var':  'var(--p-on-surface-var)',
        'p-outline':         'var(--p-outline)',
        'p-outline-var':     'var(--p-outline-var)',
        'p-error':           'var(--p-error)',
      },
      fontFamily: {
        display: ['var(--font-syne)', 'sans-serif'],
        heading: ['var(--font-space-grotesk)', 'sans-serif'],
        body: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        'manrope': ['var(--font-manrope)', 'sans-serif'],
        'inter':   ['var(--font-inter)', 'sans-serif'],
      },
      borderRadius: {
        'portfolio':      '0.125rem',
        'portfolio-lg':   '0.25rem',
        'portfolio-xl':   '0.5rem',
        'portfolio-full': '0.75rem',
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
