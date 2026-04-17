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
  const [animDone, setAnimDone] = useState(false)
  const [exiting, setExiting] = useState(false)
  
  // Estados para los mensajes rotativos — índice inicial aleatorio
  const [factIdx, setFactIdx] = useState(() => Math.floor(Math.random() * FACTS.length))
  const [factVisible, setFactVisible] = useState(false)

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // 1. Cronología principal de la animación inicial
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 2600)
    const t4 = setTimeout(() => setAnimDone(true), 12000)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  // 2. Rotación de frases (FACTS) - Empieza en la fase 2
  useEffect(() => {
    if (phase < 2) return
    
    // Mostrar la primera frase
    const showFirst = setTimeout(() => setFactVisible(true), 400)
    
    const interval = setInterval(() => {
      setFactVisible(false)
      setTimeout(() => {
        setFactIdx((prev) => (prev + 1) % FACTS.length)
        setFactVisible(true)
      }, 400) // Tiempo de transición entre frases
    }, 4000) // Cambia cada 4 segundos

    return () => {
      clearTimeout(showFirst)
      clearInterval(interval)
    }
  }, [phase])

  // 3. Salida siempre al terminar la animación — el warmup continúa en background
  useEffect(() => {
    if (!animDone) return
    setExiting(true)
    const t = setTimeout(() => onCompleteRef.current(), 550)
    return () => clearTimeout(t)
  }, [animDone])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg select-none"
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Bloque de Nombre y Título */}
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

          {/* MENSAJES ROTATIVOS (Facts) */}
          <div className="mt-12 h-10 flex items-center justify-center px-6">
            <AnimatePresence mode="wait">
              {factVisible && (
                <motion.p
                  key={factIdx}
                  className="font-body text-text-muted text-xs sm:text-sm tracking-wide text-center max-w-md italic"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {FACTS[factIdx]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Logo carousel + Status Inferior */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-8 pb-6 sm:pb-8"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-3" role="status">
              {/* Aviso de tiempo de espera */}
              <div className="flex items-center gap-2 mb-1">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="text-accent animate-pulse">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="font-body text-[10px] text-text-muted uppercase tracking-wider">
                  La primera carga puede tardar hasta <span className="text-accent font-bold">2 minutos</span>
                </span>
              </div>

              {/* Spinner y Estado de la API */}
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full border-2 border-accent/20 border-t-accent animate-spin" aria-hidden />
                <span className="font-mono text-[10px] text-text-muted">
                  {warmupStatus === 'cold'  ? 'Warming up assistant…' :
                   warmupStatus === 'error' ? 'Retrying connection…' :
                                              'Loading knowledge base…'}
                </span>
              </div>
            </div>
            
            <LogoCarousel />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}