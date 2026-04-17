'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="portfolio sticky top-0 z-50 border-b border-p-outline-var bg-p-bg/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-manrope text-sm font-semibold text-p-primary" onClick={() => setOpen(false)}>
          AI Assistant
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'rounded-portfolio-lg px-3 py-1.5 font-inter text-sm transition-colors duration-150',
                  pathname === href
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
          <Link
            href="/"
            className="rounded-portfolio-xl bg-p-secondary px-4 py-1.5 font-inter text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
            onClick={() => setOpen(false)}
          >
            Let&apos;s Chat
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
                    pathname === href
                      ? 'bg-p-secondary/10 font-semibold text-p-secondary'
                      : 'text-p-on-surface-var hover:text-p-on-surface'
                  )}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
