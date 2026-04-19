'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { EXPERIENCE } from '@/lib/portfolio-data'
import { useLang } from '@/lib/i18n'

export default function ExperiencePage() {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-14">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
            {t('Career History', 'Trayectoria Profesional')}
          </p>
          <h1 className="font-manrope text-4xl font-extrabold text-p-primary sm:text-5xl">
            {t('Professional Trajectory', 'Trayectoria Profesional')}
          </h1>
          <p className="mt-4 max-w-xl font-inter text-base text-p-on-surface-var">
            {t(
              "From aerospace research in the USA to enterprise MLOps at one of Spain's largest energy companies — and now academia.",
              'Desde la investigación aeroespacial en EE.UU. hasta el MLOps empresarial en una de las mayores energéticas de España — y ahora la academia.'
            )}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-[7px] top-2 hidden h-[calc(100%-2rem)] w-px bg-p-outline-var md:block" />

          {EXPERIENCE.map((entry, idx) => (
            <div key={`${entry.slug}-${idx}`} className="relative pb-10 md:pl-10">
              {/* Dot */}
              <div
                className={`absolute left-0 top-1.5 hidden h-3.5 w-3.5 rounded-full border-2 border-p-bg md:block ${
                  entry.current ? 'border-p-secondary bg-p-secondary' : 'border-p-outline-var bg-p-bg'
                }`}
              />

              {/* Card */}
              <div className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6">
                {/* Top row */}
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-manrope text-lg font-bold text-p-primary">{entry.role}</h2>
                    <p className="mt-0.5 font-inter text-sm text-p-on-surface-var">{entry.company}</p>
                  </div>
                  <span
                    className={`shrink-0 rounded-portfolio-2xl px-3 py-1 font-inter text-xs font-semibold ${
                      entry.current
                        ? 'bg-p-secondary/10 text-p-secondary'
                        : 'bg-p-surface-high text-p-on-surface-var'
                    }`}
                  >
                    {entry.current ? `${entry.period} · ${t('Current', 'Actual')}` : entry.period}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-5 font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(entry.description.en, entry.description.es)}
                </p>

                {/* Highlights */}
                <ul className="mb-5 space-y-2">
                  {entry.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-p-secondary" />
                      <p className="font-inter text-sm text-p-on-surface-var">{t(h.en, h.es)}</p>
                    </li>
                  ))}
                </ul>

                {/* Footer row: tags + link */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex flex-wrap gap-2">
                    {entry.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-portfolio-2xl bg-p-surface-high px-2.5 py-0.5 font-inter text-xs text-p-on-surface-var"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/experience/${entry.slug}`}
                    className="group inline-flex items-center gap-1 font-inter text-xs font-semibold text-p-secondary transition-opacity hover:opacity-80"
                  >
                    {t('View details', 'Ver detalles')}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
