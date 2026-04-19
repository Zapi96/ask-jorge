'use client'
import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { useLang } from '@/lib/i18n'
import type { Project } from '@/lib/portfolio-data'

export function ProjectDetailClient({ project }: { project: Project }) {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Back link */}
        <Link
          href="/projects"
          className="mb-10 inline-flex items-center gap-2 font-inter text-sm text-p-on-surface-var transition-colors hover:text-p-on-surface"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('All projects', 'Todos los proyectos')}
        </Link>

        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary">
            {project.period}
          </p>
          <h1 className="font-manrope text-4xl font-extrabold text-p-primary sm:text-5xl">
            {project.title}
          </h1>
          <p className="mt-2 font-manrope text-xl font-semibold text-p-on-surface-var">
            {t(project.subtitle.en, project.subtitle.es)}
          </p>
          <p className="mt-5 max-w-2xl font-inter text-base leading-relaxed text-p-on-surface-var">
            {t(project.description.en, project.description.es)}
          </p>
        </div>

        {/* Meta grid */}
        <div className="mb-12 grid grid-cols-1 gap-4 rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6 sm:grid-cols-3">
          <div>
            <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
              {t('Role', 'Rol')}
            </p>
            <p className="font-inter text-sm font-medium text-p-primary">{project.role}</p>
          </div>
          {project.client && (
            <div>
              <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
                {t('Client / Context', 'Cliente / Contexto')}
              </p>
              <p className="font-inter text-sm font-medium text-p-primary">{project.client}</p>
            </div>
          )}
          <div>
            <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
              {t('Key Impact', 'Impacto Clave')}
            </p>
            <p className="font-inter text-sm font-semibold text-p-secondary">
              {t(project.impact.en, project.impact.es)}
            </p>
          </div>
        </div>

        {/* Highlights */}
        <div className="mb-12">
          <h2 className="mb-6 font-manrope text-2xl font-bold text-p-primary">
            {t('Key Contributions', 'Contribuciones Clave')}
          </h2>
          <ul className="space-y-4">
            {project.highlights.map((h, i) => (
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

        {/* Tags */}
        <div className="mb-12">
          <h2 className="mb-4 font-manrope text-2xl font-bold text-p-primary">
            {t('Tech Stack', 'Stack Tecnológico')}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-portfolio-2xl bg-p-surface-high px-3 py-1 font-inter text-sm font-medium text-p-on-surface-var"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* External link */}
        {project.link && (
          <div className="mb-12">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-portfolio-xl border border-p-outline-var bg-p-surface px-5 py-3 font-inter text-sm font-semibold text-p-primary transition-shadow hover:shadow-md"
            >
              <ExternalLink className="h-4 w-4 text-p-secondary" />
              {t('View official project page', 'Ver página oficial del proyecto')}
            </a>
          </div>
        )}

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
              'The AI assistant on this site can answer detailed questions about this project — tech decisions, challenges, outcomes.',
              'El asistente de IA de esta web puede responder preguntas detalladas sobre este proyecto — decisiones tecnológicas, retos, resultados.'
            )}
          </p>
          <Link
            href="/"
            className="inline-block rounded-portfolio-xl bg-p-secondary px-5 py-2.5 font-inter text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            {t('Open AI Assistant', 'Abrir Asistente de IA')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
