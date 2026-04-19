'use client'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  return (
    <div className="flex items-center overflow-hidden rounded-portfolio-lg border border-p-outline-var font-inter text-xs font-semibold">
      <button
        onClick={() => setLang('en')}
        className={cn(
          'px-2 py-1 transition-colors duration-150',
          lang === 'en'
            ? 'bg-p-secondary text-white'
            : 'text-p-on-surface-var hover:text-p-on-surface'
        )}
      >
        EN
      </button>
      <button
        onClick={() => setLang('es')}
        className={cn(
          'px-2 py-1 transition-colors duration-150',
          lang === 'es'
            ? 'bg-p-secondary text-white'
            : 'text-p-on-surface-var hover:text-p-on-surface'
        )}
      >
        ES
      </button>
    </div>
  )
}
