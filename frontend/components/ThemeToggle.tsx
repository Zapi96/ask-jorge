'use client'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils'

const THEMES = [
  { value: 'system', icon: Monitor, label: 'System' },
  { value: 'light',  icon: Sun,     label: 'Light'  },
  { value: 'dark',   icon: Moon,    label: 'Dark'   },
] as const

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch — render only after mount
  useEffect(() => setMounted(true), [])
  if (!mounted) return <div className="h-8 w-[88px]" />

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className="flex items-center rounded-lg border border-border-default bg-surface p-0.5 gap-0.5"
    >
      {THEMES.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={label}
          aria-pressed={theme === value}
          className={cn(
            'flex h-7 w-7 items-center justify-center rounded-md transition-colors duration-150',
            theme === value
              ? 'bg-elevated text-accent'
              : 'text-text-muted hover:text-text-primary'
          )}
        >
          <Icon className="h-3.5 w-3.5" aria-hidden />
        </button>
      ))}
    </div>
  )
}
