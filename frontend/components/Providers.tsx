'use client'
import { ThemeProvider } from 'next-themes'
import { LanguageProvider } from '@/lib/i18n'

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
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  )
}
