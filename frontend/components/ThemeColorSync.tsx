'use client'
import { useTheme } from 'next-themes'
import { useEffect } from 'react'

const COLORS = {
  dark:  '#0D1717',
  light: '#F9F9F9',
}

export function ThemeColorSync() {
  const { resolvedTheme } = useTheme()

  useEffect(() => {
    if (!resolvedTheme) return

    const color = resolvedTheme === 'dark' ? COLORS.dark : COLORS.light

    // Remove all existing theme-color metas (including media-query variants)
    document.querySelectorAll('meta[name="theme-color"]').forEach((el) => el.remove())

    // Insert a single canonical one
    const meta = document.createElement('meta')
    meta.name = 'theme-color'
    meta.content = color
    document.head.appendChild(meta)
  }, [resolvedTheme])

  return null
}
