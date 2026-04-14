'use client'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="ask-jorge-theme"
      themes={['dark', 'light']}
      disableTransitionOnChange={false}
    >
      {children}
    </ThemeProvider>
  )
}
