import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { ABOUT_HIGHLIGHTS } from '@/lib/portfolio-data'

export const metadata = {
  title: 'About — Jorge Martínez Zapico',
  description: 'Senior MLOps & AI Engineer. Background in Aerospace Engineering, Big Data, and AI systems.',
}

export default function AboutPage() {
  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary">
            The Foundation
          </p>
          <h1 className="font-manrope text-5xl font-extrabold leading-tight text-p-primary md:text-6xl">
            Architecting
            <br />
            the Future.
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            {ABOUT_HIGHLIGHTS.map(({ label, description }) => (
              <div key={label} className="border-l-2 border-p-secondary pl-4">
                <p className="font-manrope text-2xl font-bold text-p-primary">{label}</p>
                <p className="mt-1 font-inter text-sm text-p-on-surface-var">{description}</p>
              </div>
            ))}
          </aside>

          {/* Main content */}
          <div className="space-y-8 font-inter text-base leading-relaxed text-p-on-surface">
            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                Academic Excellence & Primary Strategy
              </h2>
              <p className="text-p-on-surface-var">
                Jorge holds a degree in Aerospace Engineering from UPV (Valencia) and completed graduate studies at
                Purdue University (GPA 4.0/4.0) in the United States. This foundation in rigorous quantitative
                thinking — from fluid dynamics to orbital mechanics — shapes how he approaches every engineering
                challenge: with first-principles clarity.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                From Aerospace to AI
              </h2>
              <p className="text-p-on-surface-var">
                After completing a Master&apos;s in Big Data (MITMA, Madrid), Jorge pivoted into the rapidly
                evolving world of MLOps and enterprise AI. He is now a Senior MLOps Engineer at Bluetab (an IBM
                Company), where he leads the design and deployment of scalable ML infrastructure for Repsol&apos;s
                self-service AI platform on Databricks and Azure.
              </p>
              <p className="mt-4 text-p-on-surface-var">
                He holds the Azure Solutions Architect Expert and Databricks Certified ML Professional
                certifications — two of the most demanding credentials in cloud and AI engineering.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                International Mindset
              </h2>
              <p className="text-p-on-surface-var">
                Having studied and worked across Spain, the United States, and with international research
                organisations (ESA, DLR, NASA collaborations), Jorge brings a cross-cultural perspective to
                technical leadership. He speaks Spanish natively and English at C1 level, and is planning
                a relocation to Zürich in August 2026 to continue growing in the European AI ecosystem.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
