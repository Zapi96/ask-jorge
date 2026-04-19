'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { useLang } from '@/lib/i18n'
import type { WorkEntry } from '@/lib/portfolio-data'

export function ExperienceDetailClient({ entry }: { entry: WorkEntry }) {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Back */}
        <Link
          href="/experience"
          className="mb-10 inline-flex items-center gap-2 font-inter text-sm text-p-on-surface-var transition-colors hover:text-p-on-surface"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('All experience', 'Toda la experiencia')}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-portfolio-2xl px-3 py-1 font-inter text-xs font-semibold ${
                entry.current
                  ? 'bg-p-secondary/10 text-p-secondary'
                  : 'bg-p-surface-high text-p-on-surface-var'
              }`}
            >
              {entry.current ? `${entry.period} · ${t('Current', 'Actual')}` : entry.period}
            </span>
          </div>
          <h1 className="font-manrope text-4xl font-extrabold text-p-primary sm:text-5xl">
            {entry.role}
          </h1>
          <p className="mt-2 font-manrope text-xl font-semibold text-p-on-surface-var">
            {entry.company}
          </p>
          <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-p-on-surface-var">
            {t(entry.description.en, entry.description.es)}
          </p>
        </div>

        {/* Key contributions */}
        <div className="mb-12">
          <h2 className="mb-6 font-manrope text-2xl font-bold text-p-primary">
            {t('Key Contributions', 'Contribuciones Clave')}
          </h2>
          <ul className="space-y-4">
            {entry.highlights.map((h, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-1 h-5 w-5 shrink-0 rounded-full bg-p-secondary/10 text-center font-inter text-[11px] font-bold leading-5 text-p-secondary">
                  {i + 1}
                </span>
                <p className="font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(h.en, h.es)}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div className="mb-12">
          <h2 className="mb-4 font-manrope text-2xl font-bold text-p-primary">
            {t('Tech Stack', 'Stack Tecnológico')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {entry.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-portfolio-2xl bg-p-surface-high px-3 py-1 font-inter text-sm font-medium text-p-on-surface-var"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-portfolio-xl bg-p-primary-cont p-6 text-white sm:p-8">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary-cont">
            {t('Want to know more?', '¿Quieres saber más?')}
          </p>
          <h3 className="mb-3 font-manrope text-2xl font-bold">
            {t('Ask Jorge directly.', 'Pregúntale directamente a Jorge.')}
          </h3>
          <p className="mb-6 max-w-md font-inter text-sm text-white/70">
            {t(
              'The AI assistant can answer detailed questions about this role — the challenges, decisions, and outcomes.',
              'El asistente de IA puede responder preguntas detalladas sobre este rol — los retos, decisiones y resultados.'
            )}
          </p>
          <Link
            href="/contact"
            className="mr-3 inline-block rounded-portfolio-xl bg-p-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t('Get in Touch', 'Contactar')}
          </Link>
          <Link
            href="/"
            className="inline-block rounded-portfolio-xl border border-white/20 px-5 py-2.5 font-inter text-sm font-semibold text-white/80 transition-opacity hover:opacity-90"
          >
            {t('Open AI Assistant', 'Abrir Asistente de IA')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
