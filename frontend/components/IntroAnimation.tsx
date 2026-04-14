'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WarmupStatus } from '@/lib/api'
import { LogoCarousel } from './LogoCarousel'

const FIRST_NAME = 'JORGE'
const LAST_NAME = 'MARTÍNEZ ZAPICO'
const TITLE = 'Senior MLOps & AI Engineer'

const FACTS = [
  'Senior MLOps Engineer con mindset aeronáutico: del diseño de algoritmos GNSS para la ESA al despliegue de modelos core en Repsol.',
  'Databricks Champion & Azure Solutions Architect Expert, especializado en escalar arquitecturas Lakehouse y gobernanza de modelos.',
  'Arquitecto de plataformas Self-Service de IA: reducción demostrada del 40% en Time-to-Production mediante automatización CI/CD/CT.',
  'Experto en High-Performance Computing: implementación de entrenamiento distribuido con Ray y optimización de pipelines para movilidad nacional.',
  'Líder en LLMOps: integrando RAG avanzado y auditoría de código con modelos GPT en entornos productivos altamente regulados.',
  'Academic Authority: Profesor de Machine Learning en programas de Máster, traduciendo complejidad técnica en valor estratégico de negocio.',
  'Extreme Ownership en operaciones críticas: recuperación in-situ de misiones navales y gestión de crisis de infraestructura Cloud.'
]

interface IntroAnimationProps {
  onComplete: () => void
  warmupStatus: WarmupStatus
}

export function IntroAnimation({ onComplete, warmupStatus }: IntroAnimationProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const [statusIdx, setStatusIdx] = useState(0)
  const [factIdx, setFactIdx] = useState(0)
  const [factVisible, setFactVisible] = useState(false)
  const [exiting, setExiting] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Main phase timeline
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 2600)
    const t4 = setTimeout(() => setAnimDone(true), 3200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  // Status steps
  useEffect(() => {
    if (!animDone || warmupStatus !== 'warm') return
    setExiting(true)
    const t = setTimeout(() => onCompleteRef.current(), 550)
    return () => clearTimeout(t)
  }, [animDone, warmupStatus])

  // Fallback: proceed after 3 minutes regardless (avoid infinite loading)
  useEffect(() => {
    if (!animDone) return
    const t = setTimeout(() => {
      setExiting(true)
      setTimeout(() => onCompleteRef.current(), 550)
    }, 3 * 60 * 1000)
    return () => clearTimeout(t)
  }, [animDone])

  // Facts rotation — show first fact after title appears, then rotate every 3.2 s
  useEffect(() => {
    if (phase < 2) return
    const showTimer = setTimeout(() => setFactVisible(true), 400)
    const interval = setInterval(() => {
      setFactVisible(false)
      setTimeout(() => {
        setFactIdx((i) => (i + 1) % FACTS.length)
        setFactVisible(true)
      }, 380)
    }, 3200)
    return () => { clearTimeout(showTimer); clearInterval(interval) }
  }, [phase])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg select-none"
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Name block */}
          <div className="text-center px-6">
            <div className="flex justify-center" aria-label={FIRST_NAME}>
              {FIRST_NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="font-display font-[800] leading-none text-[clamp(3.5rem,13vw,9rem)] tracking-tight text-text-primary"
                  initial={{ opacity: 0, y: 24 }}
                  animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="font-heading font-[500] text-accent tracking-[0.25em] uppercase text-[clamp(0.7rem,2.5vw,1.2rem)] mt-2"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              aria-label={LAST_NAME}
            >
              {LAST_NAME}
            </motion.div>

            <motion.p
              className="mt-5 font-body text-text-muted text-sm tracking-[0.15em] uppercase"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {TITLE}
            </motion.p>
          </div>

          {/* Rotating fact */}
          <div className="mt-10 h-8 flex items-center justify-center px-6">
            <AnimatePresence mode="wait">
              {factVisible && (
                <motion.p
                  key={factIdx}
                  className="font-body text-text-muted text-xs tracking-wide text-center max-w-sm"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                >
                  {FACTS[factIdx]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Status bar */}
          <motion.div
            className="absolute bottom-16 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            {/* Warning: first load can be slow */}
            <div className="flex items-center gap-1.5">
              <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="text-accent opacity-75">
                <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              <span className="font-body text-[11px] text-text-muted">
                Loading —{' '}
                <span className="text-text-primary font-medium">
                  la primera vez puede tardar hasta 2 minutos
                </span>
              </span>
            </div>

            {/* Dots + status */}
            <div className="flex items-center gap-[5px]" aria-hidden>
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="block h-[5px] w-[5px] rounded-full bg-accent"
                  animate={{ opacity: [0.25, 1, 0.25] }}
                  transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                />
              ))}
              <span className="font-mono text-[11px] text-text-muted ml-1" role="status" aria-live="polite">
                {STATUS_STEPS[statusIdx]}
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}