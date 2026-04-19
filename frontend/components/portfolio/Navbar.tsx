'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useWarmup } from '@/hooks/useWarmup'
import { WarmupStatus } from '@/lib/api'
import { useLang } from '@/lib/i18n'
import { LanguageSwitcher } from './LanguageSwitcher'
import { ThemeToggle } from '@/components/ThemeToggle'

function AssistantStatus({ status }: { status: WarmupStatus }) {
  const t = useLang()
  const isWarm = status === 'warm'
  const label = isWarm ? t('Ready', 'Listo') : t('Warming up…', 'Iniciando…')
  return (
    <span className="flex items-center gap-1.5" aria-label={`Assistant: ${label}`}>
      <span
        className={cn(
          'h-1.5 w-1.5 rounded-full shrink-0',
          isWarm ? 'bg-p-secondary' : 'bg-amber-400 animate-pulse'
        )}
        aria-hidden
      />
      <span className={cn('font-inter text-[10px]', isWarm ? 'text-p-secondary' : 'text-p-on-surface-var')}>
        {label}
      </span>
    </span>
  )
}

export function Navbar() {
  const t = useLang()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { status } = useWarmup()

  const NAV_LINKS = [
    { label: t('Home', 'Inicio'), href: '/' },
    { label: t('About', 'Sobre mí'), href: '/about' },
    { label: t('Experience', 'Experiencia'), href: '/experience' },
    { label: t('Projects', 'Proyectos'), href: '/projects' },
    { label: t('Activities', 'Actividades'), href: '/activities' },
    { label: t('Certifications', 'Certificaciones'), href: '/certifications' },
    { label: t('Contact', 'Contacto'), href: '/contact' },
  ]

  function isActive(href: string) {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(href + '/')
  }

  return (
    <header className="portfolio sticky top-0 z-50 border-b border-p-outline-var bg-p-bg/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="font-manrope text-sm font-semibold text-p-primary">AI Assistant</span>
          <AssistantStatus status={status} />
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'rounded-portfolio-lg px-3 py-1.5 font-inter text-sm transition-colors duration-150',
                  isActive(href)
                    ? 'bg-p-secondary/10 font-semibold text-p-secondary'
                    : 'text-p-on-surface-var hover:text-p-on-surface'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <LanguageSwitcher />
          <Link
            href="/contact"
            className="hidden sm:inline-block rounded-portfolio-xl bg-p-secondary px-4 py-1.5 font-inter text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            {t("Let's Chat", 'Hablemos')}
          </Link>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex items-center justify-center rounded-portfolio-lg p-1.5 text-p-on-surface-var transition-colors hover:text-p-primary"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div className="portfolio md:hidden border-t border-p-outline-var bg-p-bg px-6 py-4">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-portfolio-lg px-3 py-2.5 font-inter text-sm transition-colors duration-150',
                    isActive(href)
                      ? 'bg-p-secondary/10 font-semibold text-p-secondary'
                      : 'text-p-on-surface-var hover:text-p-on-surface'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-portfolio-xl bg-p-secondary px-4 py-2 text-center font-inter text-sm font-semibold text-white"
              >
                {t("Let's Chat", 'Hablemos')}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
