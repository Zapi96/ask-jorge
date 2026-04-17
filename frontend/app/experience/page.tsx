import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { PROJECTS, EXPERIENCE } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Experience — Jorge Martínez Zapico',
  description: 'Selected projects and professional trajectory of Jorge Martínez Zapico, Senior MLOps & AI Engineer.',
}

export default function ExperiencePage() {
  const [featured, ...rest] = PROJECTS

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
            Engineering Impact
          </p>
          <h1 className="font-manrope text-5xl font-extrabold text-p-primary">Selected Projects</h1>
          <p className="mt-4 max-w-xl font-inter text-base text-p-on-surface-var">
            From data strategy and architecture to technical leadership, Jorge&apos;s work synthesises
            scalable infrastructure and algorithmic efficiency.
          </p>
        </div>

        {/* Featured project — dark card */}
        <div className="mb-6 overflow-hidden rounded-portfolio-xl bg-p-primary-cont p-8 text-white">
          <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary-cont">
            Flagship Project
          </p>
          <h2 className="mb-3 font-manrope text-3xl font-bold">{featured.title}</h2>
          <p className="max-w-xl font-inter text-sm leading-relaxed text-white/70">{featured.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-portfolio-2xl border border-white/20 px-3 py-1 font-inter text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Other projects grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <div
              key={project.title}
              className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6 transition-shadow duration-150 hover:shadow-md"
            >
              <h3 className="mb-2 font-manrope text-lg font-bold text-p-primary">{project.title}</h3>
              <p className="mb-4 font-inter text-sm leading-relaxed text-p-on-surface-var">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-portfolio-2xl bg-p-surface-high px-2.5 py-0.5 font-inter text-xs text-p-on-surface-var"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Trajectory */}
        <section>
          <h2 className="mb-8 font-manrope text-2xl font-bold text-p-primary">Professional Trajectory</h2>
          <div className="divide-y divide-p-outline-var">
            {EXPERIENCE.map((entry) => (
              <div key={entry.role} className="flex items-center justify-between py-5">
                <div>
                  <p className="font-manrope text-base font-bold text-p-primary">{entry.role}</p>
                  <p className="mt-0.5 font-inter text-sm text-p-on-surface-var">{entry.company}</p>
                </div>
                <span
                  className={`rounded-portfolio-2xl px-3 py-1 font-inter text-xs font-semibold ${
                    entry.current
                      ? 'bg-p-secondary/10 text-p-secondary'
                      : 'bg-p-surface-high text-p-on-surface-var'
                  }`}
                >
                  {entry.current ? 'Current' : entry.period}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
