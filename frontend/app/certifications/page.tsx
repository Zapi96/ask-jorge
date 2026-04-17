import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { CERTIFICATIONS } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Certifications — Jorge Martínez Zapico',
  description: 'Professional credentials: Azure Solutions Architect Expert, Databricks ML Professional, and more.',
}

export default function CertificationsPage() {
  const featured = CERTIFICATIONS.filter((c) => c.featured)
  const rest = CERTIFICATIONS.filter((c) => !c.featured)

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
              Professional Credentials
            </p>
            <h1 className="font-manrope text-5xl font-extrabold text-p-primary">
              Validated
              <br />
              Expertise.
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-portfolio-2xl border border-p-secondary/30 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-p-secondary" />
            <span className="font-inter text-xs font-semibold text-p-secondary">FULLY INITIALIZED &amp; ACTIVE</span>
          </div>
        </div>

        {/* Certifications grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cert) => (
            <div key={cert.title} className="rounded-portfolio-xl bg-p-primary-cont p-6 text-white">
              <p className="mb-1 font-inter text-xs text-white/50">{cert.year}</p>
              <h3 className="mb-2 font-manrope text-base font-bold leading-snug">{cert.title}</h3>
              <p className="font-inter text-xs text-white/60">{cert.issuer}</p>
            </div>
          ))}
          {rest.map((cert) => (
            <div key={cert.title} className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6">
              <p className="mb-1 font-inter text-xs text-p-on-surface-var">{cert.year}</p>
              <h3 className="mb-2 font-manrope text-base font-bold leading-snug text-p-primary">{cert.title}</h3>
              <p className="font-inter text-xs text-p-on-surface-var">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
