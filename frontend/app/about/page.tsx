'use client'
import { MapPin, Globe, GraduationCap, Award } from 'lucide-react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { ABOUT_HIGHLIGHTS } from '@/lib/portfolio-data'
import { useLang } from '@/lib/i18n'

export default function AboutPage() {
  const t = useLang()

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary">
            {t('The Foundation', 'La Base')}
          </p>
          <h1 className="font-manrope text-4xl font-extrabold leading-tight text-p-primary sm:text-5xl md:text-6xl">
            {t('Aerospace Roots,', 'Raíces Aeroespaciales,')}
            <br />
            {t('AI Systems.', 'Sistemas de IA.')}
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="space-y-6">
            {ABOUT_HIGHLIGHTS.map(({ label, description }) => (
              <div key={label} className="border-l-2 border-p-secondary pl-4">
                <p className="font-manrope text-2xl font-bold text-p-primary">{label}</p>
                <p className="mt-1 font-inter text-sm text-p-on-surface-var">
                  {t(description.en, description.es)}
                </p>
              </div>
            ))}

            {/* Quick facts */}
            <div className="pt-4">
              <p className="mb-3 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
                {t('Quick Facts', 'Datos Rápidos')}
              </p>
              <ul className="space-y-2.5 font-inter text-sm text-p-on-surface-var">
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0 text-p-secondary" />
                  {t('Based in Madrid, Spain', 'Con base en Madrid, España')}
                </li>
                <li className="flex items-center gap-2">
                  <Globe className="h-3.5 w-3.5 shrink-0 text-p-secondary" />
                  {t('Spanish (native) · English C1', 'Español (nativo) · Inglés C1')}
                </li>
                <li className="flex items-center gap-2">
                  <GraduationCap className="h-3.5 w-3.5 shrink-0 text-p-secondary" />
                  UPV · Purdue University
                </li>
                <li className="flex items-center gap-2">
                  <Award className="h-3.5 w-3.5 shrink-0 text-p-secondary" />
                  {t('Databricks Champion Nominee', 'Nominado Databricks Champion')}
                </li>
              </ul>
            </div>
          </aside>

          {/* Main content */}
          <div className="space-y-8 font-inter text-base leading-relaxed text-p-on-surface">
            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                {t('From Aerospace to AI', 'De la Aeroespacial a la IA')}
              </h2>
              <p className="text-p-on-surface-var">
                {t(
                  "I hold a degree in Aerospace Engineering from the Universitat Politècnica de València (UPV) and completed graduate studies at Purdue University (Indiana, USA) with a perfect GPA of 4.0/4.0 — earning Dean's List and Semester Honors. My research there on urban air mobility and satellite orbit simulation, in collaboration with NASA-linked projects, was published at the SciTech international conference.",
                  'Tengo un grado en Ingeniería Aeroespacial por la Universitat Politècnica de València (UPV) y completé estudios de posgrado en la Universidad de Purdue (Indiana, EE.UU.) con un GPA perfecto de 4.0/4.0 — obteniendo Dean\'s List y Semester Honors. Mi investigación allí sobre movilidad aérea urbana y simulación de órbitas satelitales, en colaboración con proyectos vinculados a la NASA, fue publicada en la conferencia internacional SciTech.'
                )}
              </p>
              <p className="mt-4 text-p-on-surface-var">
                {t(
                  'This foundation in rigorous quantitative thinking — from computational fluid dynamics to orbital mechanics and signal analysis — shapes how I approach every engineering problem: with first-principles clarity and an obsession for measurable outcomes.',
                  'Esta base en pensamiento cuantitativo riguroso — desde dinámica de fluidos computacional hasta mecánica orbital y análisis de señales — define cómo afronto cada problema de ingeniería: con claridad de primeros principios y una obsesión por los resultados medibles.'
                )}
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                {t('Enterprise MLOps & AI Infrastructure', 'MLOps Empresarial e Infraestructura de AI')}
              </h2>
              <p className="text-p-on-surface-var">
                {t(
                  "My Purdue research already pointed toward data and AI — applying Big Data techniques and ML clustering to urban mobility at scale, in collaboration with NASA. From there, I joined GMV as a GNSS data engineer, developing signal analysis pipelines for the European Space Agency, before moving into full-stack data engineering at Nommon and ultimately into MLOps at Bluetab (an IBM Company), where I now lead the design of Repsol's self-service AI platform on Databricks and Azure.",
                  'Mi investigación en Purdue ya apuntaba hacia datos e IA — aplicando técnicas de Big Data y clustering de ML a movilidad urbana a escala, en colaboración con la NASA. Desde allí, me incorporé a GMV como ingeniero de datos GNSS, desarrollando pipelines de análisis de señal para la Agencia Espacial Europea, antes de pasar a ingeniería de datos full-stack en Nommon y finalmente a MLOps en Bluetab (una empresa de IBM), donde ahora lidero el diseño de la plataforma de AI de autoservicio de Repsol sobre Databricks y Azure.'
                )}
              </p>
              <p className="mt-4 text-p-on-surface-var">
                {t(
                  'My work spans the entire ML lifecycle: from experiment governance and model lineage with MLflow and Unity Catalog, to distributed training with Ray, automated deployments via Databricks Asset Bundles, and GenAI research in RAG architectures with LangChain. I hold the Azure Solutions Architect Expert and multiple Databricks Professional certifications, and was nominated for the Databricks Champion programme.',
                  'Mi trabajo abarca todo el ciclo de vida ML: desde la gobernanza de experimentos y linaje de modelos con MLflow y Unity Catalog, hasta el entrenamiento distribuido con Ray, despliegues automatizados mediante Databricks Asset Bundles, e investigación en GenAI con arquitecturas RAG y LangChain. Cuento con la certificación Azure Solutions Architect Expert y múltiples certificaciones Databricks Professional, y fui nominado para el programa Databricks Champion.'
                )}
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                {t('International Perspective', 'Perspectiva Internacional')}
              </h2>
              <p className="text-p-on-surface-var">
                {t(
                  "I have studied and worked across Spain, the United States, Germany, Poland, and internationally with agencies including the ESA, DLR, and NASA-linked research groups. This cross-cultural experience — combined with a track record of leading technical projects under pressure, from solo field missions in the North Sea to national-scale data platforms for Spain's Ministry of Transport — defines my approach to engineering leadership.",
                  'He estudiado y trabajado en España, Estados Unidos, Alemania, Polonia e internacionalmente con agencias como la ESA, el DLR y grupos de investigación vinculados a la NASA. Esta experiencia intercultural — combinada con un historial de liderazgo de proyectos técnicos bajo presión, desde misiones de campo en solitario en el Mar del Norte hasta plataformas de datos a escala nacional para el Ministerio de Transportes de España — define mi enfoque del liderazgo en ingeniería.'
                )}
              </p>
              <p className="mt-4 text-p-on-surface-var">
                {t(
                  'I am actively exploring senior opportunities at the frontier of AI infrastructure in the European tech ecosystem.',
                  'Estoy explorando activamente oportunidades senior en la frontera de la infraestructura de AI en el ecosistema tecnológico europeo.'
                )}
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                {t('Teaching & Knowledge Sharing', 'Docencia y Transferencia de Conocimiento')}
              </h2>
              <p className="text-p-on-surface-var">
                {t(
                  "Since February 2026, I teach Machine Learning as an adjunct professor in the Master's in Business Analytics for Strategic Management at Universidad CEU San Pablo — a 60-hour program covering the full ML lifecycle on Databricks, from EDA and supervised learning to Deep Learning fundamentals and capstone projects. I also run internal workshops on Databricks Asset Bundles and RAG architectures for Bluetab's technical teams and strategic clients.",
                  'Desde febrero de 2026, imparto Machine Learning como profesor adjunto en el Máster en Business Analytics para la Gestión Estratégica en la Universidad CEU San Pablo — un programa de 60 horas que cubre el ciclo de vida completo de ML en Databricks, desde EDA y aprendizaje supervisado hasta fundamentos de Deep Learning y proyectos fin de máster. También imparto talleres internos sobre Databricks Asset Bundles y arquitecturas RAG para los equipos técnicos y clientes estratégicos de Bluetab.'
                )}
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
