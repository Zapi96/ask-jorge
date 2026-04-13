'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WarmupStatus } from '@/lib/api'

const FIRST_NAME = 'JORGE'
const LAST_NAME = 'MARTÍNEZ ZAPICO'
const TITLE = 'Senior MLOps & AI Engineer'

interface IntroAnimationProps {
  onComplete: () => void
  warmupStatus: WarmupStatus
}

export function IntroAnimation({ onComplete, warmupStatus }: IntroAnimationProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const [animDone, setAnimDone] = useState(false)
  const [exiting, setExiting] = useState(false)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  // Play name/title animation phases
  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 2600)
    const t4 = setTimeout(() => setAnimDone(true), 3200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  // Proceed only when animation is done AND endpoint is warm
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
            {/* First name — letter stagger */}
            <div className="flex justify-center" aria-label={FIRST_NAME}>
              {FIRST_NAME.split('').map((char, i) => (
                <motion.span
                  key={i}
                  className="font-display font-[800] leading-none text-[clamp(3.5rem,13vw,9rem)] tracking-tight text-text-primary"
                  initial={{ opacity: 0, y: 24 }}
                  animate={phase >= 1 ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: i * 0.07,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Last name */}
            <motion.div
              className="font-heading font-[500] text-accent tracking-[0.25em] uppercase text-[clamp(0.7rem,2.5vw,1.2rem)] mt-2"
              initial={{ opacity: 0 }}
              animate={phase >= 1 ? { opacity: 1 } : {}}
              transition={{ delay: 0.55, duration: 0.5 }}
              aria-label={LAST_NAME}
            >
              {LAST_NAME}
            </motion.div>

            {/* Title */}
            <motion.p
              className="mt-5 font-body text-text-muted text-sm tracking-[0.15em] uppercase"
              initial={{ opacity: 0 }}
              animate={phase >= 2 ? { opacity: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {TITLE}
            </motion.p>
          </div>

          {/* Loading spinner */}
          <motion.div
            className="absolute bottom-16 flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
            role="status"
            aria-label="Loading assistant"
          >
            <div className="h-4 w-4 rounded-full border-2 border-accent/20 border-t-accent animate-spin" aria-hidden />
            <span className="font-mono text-[11px] text-text-muted">
              {warmupStatus === 'cold'  ? 'Warming up assistant…' :
               warmupStatus === 'error' ? 'Starting up…' :
                                          'Loading knowledge base…'}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
