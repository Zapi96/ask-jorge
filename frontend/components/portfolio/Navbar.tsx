'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
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

  return (
    <header className="portfolio sticky top-0 z-50 border-b border-p-outline-var bg-p-bg/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-manrope text-sm font-semibold text-p-primary">
          AI Assistant
        </Link>

        <ul className="flex items-center gap-1">
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

        <Link
          href="/"
          className="rounded-portfolio-xl bg-p-secondary px-4 py-1.5 font-inter text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
        >
          Let&apos;s Chat
        </Link>
      </nav>
    </header>
  )
}
