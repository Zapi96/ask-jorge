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
              className="group relative flex flex-col overflow-hidden rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6 transition-all duration-300 hover:border-p-primary hover:bg-p-primary-cont hover:shadow-xl"
            >
              {/* Logo container */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-portfolio-xl bg-p-surface-high p-3.5 transition-colors duration-300 group-hover:bg-white/10">
                <Image
                  src={cert.logo}
                  alt={cert.issuer}
                  width={40}
                  height={40}
                  className="opacity-60 transition-all duration-300 group-hover:invert group-hover:opacity-90"
                />
              </div>

              {/* Year */}
              <p className="mb-1 font-inter text-xs text-p-on-surface-var transition-colors duration-300 group-hover:text-white/50">
                {cert.year}
              </p>

              {/* Title */}
              <h3 className="mb-1 font-manrope text-base font-bold leading-snug text-p-primary transition-colors duration-300 group-hover:text-white">
                {cert.title}
              </h3>

              {/* Issuer */}
              <p className="mb-4 font-inter text-xs text-p-on-surface-var transition-colors duration-300 group-hover:text-white/60">
                {cert.issuer}
              </p>

              {/* Description — collapses to 0 height when not hovered */}
              <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr]">
                <p className="mb-0 overflow-hidden font-inter text-xs leading-relaxed text-white/75 opacity-0 transition-opacity duration-300 group-hover:mb-4 group-hover:opacity-100">
                  {t(cert.description.en, cert.description.es)}
                </p>
              </div>

              {/* CTA */}
              <p className="mt-auto font-inter text-[10px] text-p-outline transition-colors duration-300 group-hover:text-white/50">
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
