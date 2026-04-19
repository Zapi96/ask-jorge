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
    const color = resolvedTheme === 'dark' ? COLORS.dark : COLORS.light
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', color)
  }, [resolvedTheme])

  return null
}
