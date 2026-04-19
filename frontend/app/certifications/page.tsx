'use client'
import Image from 'next/image'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { CERTIFICATIONS } from '@/lib/portfolio-data'
import { useLang } from '@/lib/i18n'

export default function CertificationsPage() {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
            {t('Professional Credentials', 'Credenciales Profesionales')}
          </p>
          <h1 className="font-manrope text-4xl font-extrabold text-p-primary sm:text-5xl">
            {t('Validated', 'Expertise')}
            <br />
            {t('Expertise.', 'Validado.')}
          </h1>
        </div>

        {/* Certifications grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert) => (
            <a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex flex-col overflow-hidden rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6 transition-all duration-200 hover:border-p-secondary hover:shadow-md"
            >
              {/* Logo */}
              <Image
                src={cert.logo}
                alt={cert.issuer}
                width={80}
                height={80}
                className="mb-5 object-contain opacity-85"
              />

              {/* Year */}
              <p className="mb-1 font-inter text-xs text-p-on-surface-var">
                {cert.year}
              </p>

              {/* Title */}
              <h3 className="mb-1 font-manrope text-base font-bold leading-snug text-p-on-surface">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="mb-3 font-inter text-xs text-p-on-surface-var">
                {cert.issuer}
              </p>

              {/* Description */}
              <p className="mb-4 font-inter text-xs leading-relaxed text-p-on-surface-var line-clamp-3">
                {t(cert.description.en, cert.description.es)}
              </p>

              {/* CTA */}
              <p className="mt-auto font-inter text-[10px] font-semibold text-p-secondary">
                {t('View credential →', 'Ver credencial →')}
              </p>
            </a>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
