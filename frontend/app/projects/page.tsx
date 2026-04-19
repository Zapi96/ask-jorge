'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { PROJECTS } from '@/lib/portfolio-data'
import { useLang } from '@/lib/i18n'

export default function ProjectsPage() {
  const t = useLang()
  const [featured, ...rest] = PROJECTS

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
            {t('Engineering Impact', 'Impacto de Ingeniería')}
          </p>
          <h1 className="font-manrope text-4xl font-extrabold text-p-primary sm:text-5xl">
            {t('Selected Projects', 'Proyectos Seleccionados')}
          </h1>
          <p className="mt-4 max-w-xl font-inter text-base text-p-on-surface-var">
            {t(
              'From national-scale data platforms and aerospace research to enterprise MLOps — real work, measurable outcomes.',
              'Desde plataformas de datos a escala nacional e investigación aeroespacial hasta MLOps empresarial — trabajo real, resultados medibles.'
            )}
          </p>
        </div>

        {/* Featured project — dark card */}
        <Link
          href={`/projects/${featured.slug}`}
          className="group mb-6 block overflow-hidden rounded-portfolio-xl bg-p-primary-cont p-6 text-white transition-opacity hover:opacity-95 sm:p-8"
        >
          <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary-cont">
            {t('Flagship Project', 'Proyecto Principal')}
          </p>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="mb-1 font-manrope text-3xl font-bold">{featured.title}</h2>
              <p className="mb-3 font-inter text-sm text-white/60">
                {t(featured.subtitle.en, featured.subtitle.es)}
              </p>
              <p className="max-w-xl font-inter text-sm leading-relaxed text-white/70">
                {t(featured.description.en, featured.description.es)}
              </p>
            </div>
            <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-white/40 transition-transform group-hover:translate-x-1" />
          </div>
          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {featured.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-portfolio-2xl border border-white/20 px-3 py-1 font-inter text-xs text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="shrink-0 font-inter text-xs font-semibold text-p-secondary-cont">
              {t(featured.impact.en, featured.impact.es)}
            </span>
          </div>
        </Link>

        {/* Other projects grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
          {rest.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6 transition-shadow duration-150 hover:shadow-md"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-manrope text-lg font-bold text-p-primary">{project.title}</h3>
                  <p className="font-inter text-xs text-p-on-surface-var">
                    {t(project.subtitle.en, project.subtitle.es)}
                  </p>
                </div>
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-p-on-surface-var/40 transition-transform group-hover:translate-x-0.5" />
              </div>
              <p className="mb-4 font-inter text-sm leading-relaxed text-p-on-surface-var line-clamp-3">
                {t(project.description.en, project.description.es)}
              </p>
              <div className="mb-3 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-portfolio-2xl bg-p-surface-high px-2.5 py-0.5 font-inter text-xs text-p-on-surface-var"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="rounded-portfolio-2xl bg-p-surface-high px-2.5 py-0.5 font-inter text-xs text-p-on-surface-var">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
              <p className="font-inter text-xs font-semibold text-p-secondary">
                {t(project.impact.en, project.impact.es)}
              </p>
            </Link>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
