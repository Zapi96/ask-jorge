'use client'
import { Mic, BookOpen, Trophy, Users, Globe } from 'lucide-react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { useLang } from '@/lib/i18n'
import type { B } from '@/lib/portfolio-data'

const TALKS: { title: string; event: string; context: string; description: B; tags: string[] }[] = [
  {
    title: 'RAG Architectures: Types, Trade-offs & Use Cases',
    event: 'AI Tech Advisory Group — Bluetab, an IBM Company',
    context: 'Bluetab AI Tech Advisory',
    description: {
      en: "Co-presented a comprehensive overview of Retrieval-Augmented Generation as part of Bluetab's internal AI Tech Advisory committee. Covered the landscape of RAG architectures — naive RAG, advanced RAG, modular RAG — including chunking strategies, embedding models, retrieval methods (dense, sparse, hybrid), and reranking. Discussed production considerations: latency, accuracy, and observability.",
      es: 'Co-presenté una visión completa de la Generación Aumentada con Recuperación (RAG) como parte del comité interno de AI Tech Advisory de Bluetab. Cubrí el panorama de arquitecturas RAG — naive RAG, advanced RAG, modular RAG — incluyendo estrategias de chunking, modelos de embedding, métodos de recuperación (denso, disperso, híbrido) y reranking. Discutí consideraciones de producción: latencia, precisión y observabilidad.',
    },
    tags: ['RAG', 'LangChain', 'Vector DBs', 'LLMs', 'AI Architecture'],
  },
  {
    title: 'Databricks Declarative Automation Bundles (DABs)',
    event: 'Internal Tech Talk — Bluetab, an IBM Company',
    context: 'Repsol AI Platform',
    description: {
      en: 'Deep-dive on Databricks Asset Bundles (now rebranded as Declarative Automation Bundles) — how to define Jobs, Model Serving Endpoints, and ML Experiments as Infrastructure as Code. Covered the full deployment lifecycle: bundle validation, environment promotion (DEV → TEST → PRO), and CI/CD integration with Azure DevOps. Based on first-hand implementation at Repsol.',
      es: 'Deep-dive sobre Databricks Asset Bundles (ahora rebautizados como Declarative Automation Bundles) — cómo definir Jobs, Model Serving Endpoints y ML Experiments como Infraestructura como Código. Se cubrió el ciclo de vida completo de despliegue: validación de bundles, promoción de entornos (DEV → TEST → PRO) e integración CI/CD con Azure DevOps. Basado en implementación de primera mano en Repsol.',
    },
    tags: ['Databricks', 'DABs', 'IaC', 'CI/CD', 'MLOps', 'Azure DevOps'],
  },
  {
    title: 'LLMs for Unstructured Document Extraction',
    event: 'Internal Tech Talk — Bluetab, an IBM Company',
    context: 'PoC for El Corte Inglés (IBM ADP platform)',
    description: {
      en: 'Presented a GPT-based pipeline for extracting structured data from unstructured documents — CVs, invoices, and receipts that followed no fixed template. Demonstrated how prompt engineering and LLM orchestration can convert raw text into database-ready structured formats, applied as a real PoC on the IBM ADP platform for talent screening at El Corte Inglés.',
      es: 'Presenté un pipeline basado en GPT para extraer datos estructurados de documentos no estructurados — CVs, facturas y recibos sin plantilla fija. Demostré cómo la ingeniería de prompts y la orquestación de LLMs pueden convertir texto bruto en formatos estructurados listos para base de datos, aplicado como PoC real en la plataforma IBM ADP para cribado de talento en El Corte Inglés.',
    },
    tags: ['GPT', 'LLMs', 'Prompt Engineering', 'IBM ADP', 'NLP'],
  },
]

const WORKSHOPS: { title: string; event: string; description: B; tags: string[] }[] = [
  {
    title: 'Building a RAG with pgvector & PostgreSQL',
    event: 'Hands-on Workshop — Bluetab AI Tech Advisory',
    description: {
      en: 'Practical workshop guiding colleagues through building a production-grade RAG system from scratch using open-source tooling. Participants ran the entire pipeline — document ingestion, chunking, embedding generation, pgvector indexing, and retrieval — inside a Google Colab environment connected to a self-managed PostgreSQL database. Focused on understanding the internals before using managed services.',
      es: 'Taller práctico guiando a compañeros a través de la construcción de un sistema RAG de calidad producción desde cero usando herramientas open-source. Los participantes ejecutaron el pipeline completo — ingestión de documentos, chunking, generación de embeddings, indexación pgvector y recuperación — dentro de un entorno Google Colab conectado a una base de datos PostgreSQL autogestionada. Enfocado en entender los componentes internos antes de usar servicios gestionados.',
    },
    tags: ['pgvector', 'PostgreSQL', 'RAG', 'Python', 'Google Colab', 'Embeddings'],
  },
  {
    title: 'Building a Databricks RAG with Vector Search & Unity Catalog',
    event: 'Hands-on Workshop — Bluetab AI Tech Advisory',
    description: {
      en: 'Advanced workshop on building enterprise-grade RAG pipelines natively on the Databricks platform. Covered Databricks Vector Search index creation and management, Unity Catalog for data governance and access control, Foundation Models API for generation, and MLflow for tracking retrieval experiments. Designed for teams ready to take RAG from prototype to production.',
      es: 'Taller avanzado sobre construcción de pipelines RAG de nivel empresarial de forma nativa en la plataforma Databricks. Cubrió la creación y gestión de índices de Databricks Vector Search, Unity Catalog para gobernanza de datos y control de acceso, Foundation Models API para generación y MLflow para seguimiento de experimentos de recuperación. Diseñado para equipos listos para llevar RAG del prototipo a producción.',
    },
    tags: ['Databricks', 'Vector Search', 'Unity Catalog', 'MLflow', 'RAG', 'Foundation Models'],
  },
]

const HACKATHONS: { year: string; prize: string; title: string; event: string; description: B; tags: string[] }[] = [
  {
    year: '2025',
    prize: '1st Prize — Overall Winner',
    title: 'Snowflake AI Platform Application',
    event: 'Bluetab Internal Hackathon 2025',
    description: {
      en: "Led the team that won the overall first prize proposing an AI-powered application built on Snowflake's platform and its native AI capabilities — including Snowflake Cortex, Arctic LLM, and Snowpark. The solution demonstrated how to build intelligent data products leveraging Snowflake's converged analytics and AI stack for enterprise use cases.",
      es: 'Lideré el equipo que ganó el primer premio general proponiendo una aplicación potenciada por IA construida sobre la plataforma de Snowflake y sus capacidades de IA nativas — incluyendo Snowflake Cortex, Arctic LLM y Snowpark. La solución demostró cómo construir productos de datos inteligentes aprovechando el stack convergente de analítica e IA de Snowflake para casos de uso empresariales.',
    },
    tags: ['Snowflake', 'Cortex', 'AI', 'Snowpark', 'LLMs'],
  },
  {
    year: '2024',
    prize: 'Best Technological Solution',
    title: 'Enterprise AI Platform on Databricks',
    event: 'Bluetab Internal Hackathon 2024',
    description: {
      en: 'Won the Best Technological Solution award for proposing a self-service AI platform architecture based entirely on Databricks — covering the full ML lifecycle from data ingestion and feature engineering to model training, serving, and governance. The proposal directly influenced the design of Repsol\'s AI platform that Jorge later architected and built.',
      es: 'Gané el premio a la Mejor Solución Tecnológica por proponer una arquitectura de plataforma de AI de autoservicio basada completamente en Databricks — cubriendo el ciclo de vida completo de ML desde la ingestión de datos y feature engineering hasta el entrenamiento, serving y gobernanza de modelos. La propuesta influyó directamente en el diseño de la plataforma de AI de Repsol que Jorge posteriormente arquitecturó y construyó.',
    },
    tags: ['Databricks', 'MLOps', 'AI Platform', 'Self-Service', 'Architecture'],
  },
]

const COMMUNITY: { title: string; badge: string; description: B; tags: string[] }[] = [
  {
    title: 'Databricks Summit — San Francisco',
    badge: 'Upcoming · June 2026',
    description: {
      en: "Selected to represent Bluetab at the Databricks Data + AI Summit in San Francisco — the flagship annual conference for the global Databricks community. Will attend as the company's technical delegate, covering the latest in the Lakehouse ecosystem, LLMOps, and the Databricks roadmap.",
      es: 'Seleccionado para representar a Bluetab en el Databricks Data + AI Summit en San Francisco — la conferencia anual insignia para la comunidad global de Databricks. Asistiré como delegado técnico de la empresa, cubriendo las últimas novedades en el ecosistema Lakehouse, LLMOps y el roadmap de Databricks.',
    },
    tags: ['Databricks', 'Data + AI Summit', 'San Francisco', 'Conference'],
  },
  {
    title: 'Databricks Industry Forum — Madrid',
    badge: '2025 · Madrid',
    description: {
      en: 'Attended the Databricks Industry Forum held in Madrid — an invitation-only event bringing together enterprise practitioners to discuss real-world implementations of the Lakehouse platform across regulated industries. Engaged directly with Databricks engineers and product leaders on platform roadmap and enterprise architecture patterns.',
      es: 'Asistí al Databricks Industry Forum celebrado en Madrid — un evento solo por invitación que reúne a profesionales empresariales para discutir implementaciones reales de la plataforma Lakehouse en industrias reguladas. Interactué directamente con ingenieros y líderes de producto de Databricks sobre el roadmap de la plataforma y patrones de arquitectura empresarial.',
    },
    tags: ['Databricks', 'Industry Forum', 'Madrid', 'Enterprise AI'],
  },
  {
    title: 'Databricks User Group Madrid — 3 Events',
    badge: 'Recurring · Madrid',
    description: {
      en: 'Attended all three editions of the Databricks User Group Madrid — a practitioner community where engineers and architects from different companies share real implementation case studies. Each session featured end-to-end examples of how organisations solved specific data and AI challenges using Databricks, covering topics from streaming ingestion and Delta Live Tables to MLflow and model serving at scale.',
      es: 'Asistí a las tres ediciones del Databricks User Group Madrid — una comunidad de profesionales donde ingenieros y arquitectos de diferentes empresas comparten casos de estudio de implementación reales. Cada sesión presentó ejemplos end-to-end de cómo las organizaciones resolvieron desafíos específicos de datos e IA usando Databricks, cubriendo temas desde ingestión de streaming y Delta Live Tables hasta MLflow y model serving a escala.',
    },
    tags: ['Databricks', 'User Group', 'Community', 'Madrid', 'MLOps'],
  },
]

const PEOPLE: { title: string; description: B; tags: string[] }[] = [
  {
    title: 'Technical Interviewing — DS, ML & MLOps',
    description: {
      en: "Active contributor to Bluetab's hiring process for Data Science, Machine Learning, and MLOps profiles. Designs and conducts technical interviews assessing algorithmic thinking, system design, and practical ML skills. Also participates in Bluetab's Graduate Programme, evaluating high-potential junior profiles through group dynamics and technical challenges.",
      es: 'Contribuidor activo al proceso de contratación de Bluetab para perfiles de Data Science, Machine Learning y MLOps. Diseña y realiza entrevistas técnicas evaluando pensamiento algorítmico, diseño de sistemas y habilidades prácticas de ML. También participa en el Graduate Programme de Bluetab, evaluando perfiles junior de alto potencial mediante dinámicas de grupo y retos técnicos.',
    },
    tags: ['Hiring', 'Technical Interviews', 'Graduate Programme', 'Talent Acquisition'],
  },
  {
    title: 'Onboarding & Mentoring — Git & Engineering Practices',
    description: {
      en: 'Mentors new engineers and graduates joining the AI platform team, running internal training sessions on Git best practices, branch strategy, and collaborative development workflows. Coordinates the transition from Jupyter notebooks to production-grade code, enforcing unit testing standards and code review culture to accelerate integration of new team members.',
      es: 'Mentoriza a nuevos ingenieros y graduados que se incorporan al equipo de plataforma de AI, ejecutando sesiones de formación interna sobre mejores prácticas de Git, estrategia de ramas y flujos de trabajo de desarrollo colaborativo. Coordina la transición de Jupyter notebooks a código de calidad producción, aplicando estándares de testing unitario y cultura de revisión de código para acelerar la integración de nuevos miembros.',
    },
    tags: ['Mentoring', 'Git', 'Onboarding', 'Code Review', 'Engineering Culture'],
  },
]

function SectionHeader({
  icon: Icon,
  label,
  title,
}: {
  icon: React.ElementType
  label: string
  title: string
}) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-portfolio-lg bg-p-secondary/10">
        <Icon className="h-4.5 w-4.5 text-p-secondary" />
      </div>
      <div>
        <p className="font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
          {label}
        </p>
        <h2 className="font-manrope text-2xl font-bold text-p-primary">{title}</h2>
      </div>
    </div>
  )
}

export default function ActivitiesPage() {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-4xl px-6 py-16">
        {/* Header */}
        <div className="mb-16">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
            {t('Beyond the Day-to-Day', 'Más Allá del Día a Día')}
          </p>
          <h1 className="font-manrope text-4xl font-extrabold text-p-primary sm:text-5xl">
            {t('Talks, Workshops', 'Charlas, Talleres')}
            <br />
            {t('& Community.', '& Comunidad.')}
          </h1>
          <p className="mt-4 max-w-xl font-inter text-base text-p-on-surface-var">
            {t(
              'Knowledge sharing, competitive wins, and building the team — a record of contributions beyond the project backlog.',
              'Compartiendo conocimiento, victorias competitivas, y construyendo equipo — un registro de contribuciones más allá del backlog del proyecto.'
            )}
          </p>
        </div>

        {/* Talks */}
        <section className="mb-16">
          <SectionHeader
            icon={Mic}
            label={t('Technical Talks', 'Charlas Técnicas')}
            title={t('Talks & Presentations', 'Charlas & Presentaciones')}
          />
          <div className="space-y-4">
            {TALKS.map((talk, i) => (
              <div
                key={i}
                className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6"
              >
                <div className="mb-1 flex flex-wrap items-start justify-between gap-2">
                  <h3 className="font-manrope text-lg font-bold text-p-primary">{talk.title}</h3>
                </div>
                <p className="mb-0.5 font-inter text-xs font-semibold text-p-secondary">{talk.event}</p>
                <p className="mb-4 font-inter text-xs text-p-on-surface-var">{talk.context}</p>
                <p className="mb-5 font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(talk.description.en, talk.description.es)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {talk.tags.map((tag) => (
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
        </section>

        {/* Workshops */}
        <section className="mb-16">
          <SectionHeader
            icon={BookOpen}
            label={t('Hands-on Sessions', 'Sesiones Prácticas')}
            title={t('Workshops', 'Talleres')}
          />
          <div className="space-y-4">
            {WORKSHOPS.map((ws, i) => (
              <div
                key={i}
                className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6"
              >
                <h3 className="mb-0.5 font-manrope text-lg font-bold text-p-primary">{ws.title}</h3>
                <p className="mb-4 font-inter text-xs font-semibold text-p-secondary">{ws.event}</p>
                <p className="mb-5 font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(ws.description.en, ws.description.es)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {ws.tags.map((tag) => (
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
        </section>

        {/* Hackathons */}
        <section className="mb-16">
          <SectionHeader
            icon={Trophy}
            label={t('Competitive', 'Competitivo')}
            title="Hackathons"
          />
          <div className="space-y-4">
            {HACKATHONS.map((h, i) => (
              <div
                key={i}
                className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-portfolio-2xl bg-p-secondary/10 px-3 py-1 font-inter text-xs font-semibold text-p-secondary">
                    {h.prize}
                  </span>
                  <span className="font-inter text-xs text-p-on-surface-var">{h.year} · {h.event}</span>
                </div>
                <h3 className="mb-3 font-manrope text-lg font-bold text-p-primary">{h.title}</h3>
                <p className="mb-5 font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(h.description.en, h.description.es)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {h.tags.map((tag) => (
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
        </section>

        {/* Community */}
        <section className="mb-16">
          <SectionHeader
            icon={Globe}
            label={t('Databricks Community', 'Comunidad Databricks')}
            title={t('Events & Conferences', 'Eventos & Conferencias')}
          />
          <div className="space-y-4">
            {COMMUNITY.map((item, i) => (
              <div
                key={i}
                className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6"
              >
                <div className="mb-3 flex flex-wrap items-center gap-3">
                  <span className="rounded-portfolio-2xl bg-p-secondary/10 px-3 py-1 font-inter text-xs font-semibold text-p-secondary">
                    {item.badge}
                  </span>
                </div>
                <h3 className="mb-3 font-manrope text-lg font-bold text-p-primary">{item.title}</h3>
                <p className="mb-5 font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(item.description.en, item.description.es)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
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
        </section>

        {/* People */}
        <section className="mb-16">
          <SectionHeader
            icon={Users}
            label={t('People & Culture', 'Personas & Cultura')}
            title={t('Hiring & Mentoring', 'Contratación & Mentoría')}
          />
          <div className="space-y-4">
            {PEOPLE.map((item, i) => (
              <div
                key={i}
                className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6"
              >
                <h3 className="mb-3 font-manrope text-lg font-bold text-p-primary">{item.title}</h3>
                <p className="mb-5 font-inter text-sm leading-relaxed text-p-on-surface-var">
                  {t(item.description.en, item.description.es)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
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
        </section>
      </main>
      <Footer />
    </div>
  )
}
