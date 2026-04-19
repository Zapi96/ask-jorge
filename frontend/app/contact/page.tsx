'use client'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { useLang } from '@/lib/i18n'

export default function ContactPage() {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-2xl px-6 py-24">
        <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary">
          {t('Connect', 'Conectar')}
        </p>
        <h1 className="font-manrope text-4xl font-extrabold leading-tight text-p-primary sm:text-5xl">
          {t('Initiate a', 'Inicia un')}<br />
          <span className="text-p-secondary">{t('Dialogue.', 'Diálogo.')}</span>
        </h1>
        <p className="mt-6 font-inter text-base text-p-on-surface-var">
          {t(
            "Whether you're looking to discuss AI strategy, MLOps architecture, or just want to talk shop about the future of intelligence — I'm listening.",
            'Si quieres hablar sobre estrategia de IA, arquitectura MLOps, o simplemente conversar sobre el futuro de la inteligencia — te escucho.'
          )}
        </p>

        <div className="mt-10 space-y-4">
          <a
            href="mailto:jorgemartinezzapico@gmail.com"
            className="flex items-center gap-5 rounded-portfolio-xl border border-p-outline-var bg-p-surface px-6 py-5 transition-shadow hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shrink-0 text-p-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0l-9.75 6.75L2.25 6.75" />
            </svg>
            <div>
              <p className="font-inter text-sm font-semibold text-p-on-surface">{t('Email', 'Email')}</p>
              <p className="font-inter text-sm text-p-on-surface-var">jorgemartinezzapico@gmail.com</p>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/jorge-martinez-zapico"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-5 rounded-portfolio-xl border border-p-outline-var bg-p-surface px-6 py-5 transition-shadow hover:shadow-md"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 shrink-0 text-p-secondary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <div>
              <p className="font-inter text-sm font-semibold text-p-on-surface">LinkedIn</p>
              <p className="font-inter text-sm text-p-on-surface-var">/in/jorge-martinez-zapico</p>
            </div>
          </a>
        </div>
      </main>
      <Footer />
    </div>
  )
}
