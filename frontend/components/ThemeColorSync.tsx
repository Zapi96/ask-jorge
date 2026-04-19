'use client'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const COLORS = { dark: '#0D1717', light: '#F9F9F9' }

function setMeta(name: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.name = name
    document.head.appendChild(el)
  }
  el.content = content
}

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return
    const isDark = resolvedTheme === 'dark'
    setMeta('theme-color', isDark ? COLORS.dark : COLORS.light)
    setMeta('color-scheme', isDark ? 'dark' : 'light')
  }, [resolvedTheme])

  return null
}
