'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { WarmupStatus } from '@/lib/api'
import { LogoCarousel } from './LogoCarousel'

const FIRST_NAME = 'JORGE'
const LAST_NAME = 'MARTÍNEZ ZAPICO'
const TITLE = 'Senior MLOps & AI Engineer'

// Facts técnicos curados de tu trayectoria (ESA, NASA, Repsol, Purdue)
const FACTS = [
  'Senior MLOps Engineer with an Aerospace Engineering background, applying mission-critical rigor to production AI[cite: 1, 213].',
  'Databricks Champion Nominee specialized in Unity Catalog and large-scale Lakehouse architectures[cite: 85, 91].',
  'Proven track record in designing self-service AI platforms that reduce Time-to-Production by up to 40%[cite: 93, 122].',
  'Expert in architecting RAG solutions and LLMOps pipelines for enterprise-grade Generative AI[cite: 137, 140].',
  'Advanced proficiency in distributed computing and parallel model training using Ray and Apache Spark[cite: 143, 249].',
  'Technical Lead for national-scale mobility projects, managing high-volume pipelines and critical SLAs[cite: 55, 61].',
  'Machine Learning Professor at Universidad CEU San Pablo, bridging the gap between theory and business strategy[cite: 204, 216].',
  'Strategic focus on AI Governance, implementing automated auditing for model lineage and cost optimization[cite: 91, 107].',
  'Hands-on experience in Geospatial Data Engineering, processing multi-terabyte datasets for GNSS research[cite: 1, 49].',
  'Azure Solutions Architect Expert with deep expertise in AKS, Managed Identities, and secure networking[cite: 86, 246].',
  'Developed custom Python SDKs to standardize model serving and ensure corporate security compliance[cite: 99, 102].',
  'Experienced in "Wiki-as-Code" strategies, leveraging LLMs to increase documentation velocity by 80%[cite: 176, 183].',
  'Purdue University Alumni (GPA 4.0/4.0), specializing in optimization research linked to NASA[cite: 251, 382].',
  'Extreme Ownership mindset with experience in on-site mission recovery and hardware-software troubleshooting[cite: 20, 23].',
  'Active tech community contributor, delivering workshops on DABs and MLOps best practices[cite: 139, 196].',
  'Skilled in Infrastructure as Code (IaC) using Terraform and Azure DevOps for high-availability environments[cite: 86, 132].'
];

const STATUS_MESSAGES = [
  'Preparing the environment...',
  'Deploying resources and knowledge base...',
  'Initializing Jorge\'s AI assistant...',
  'Almost there! Setting up the final details...',
  'Optimizing engine for real-time interaction...',
  'Soon you will be able to deep dive into Jorge\'s expertise...'
];

interface IntroAnimationProps {
  onComplete: () => void
  warmupStatus: WarmupStatus
}

export function IntroAnimation({ onComplete, warmupStatus }: IntroAnimationProps) {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(0)
  const [animDone, setAnimDone] = useState(false)
  const [exiting, setExiting] = useState(false)
  
  const [factIdx, setFactIdx] = useState(0)
  const [statusIdx, setStatusIdx] = useState(0)
  const [factVisible, setFactVisible] = useState(false)

  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 300)
    const t2 = setTimeout(() => setPhase(2), 1800)
    const t3 = setTimeout(() => setPhase(3), 2600)
    const t4 = setTimeout(() => setAnimDone(true), 3200)
    return () => [t1, t2, t3, t4].forEach(clearTimeout)
  }, [])

  useEffect(() => {
    if (phase < 2) return
    setFactVisible(true)
    
    const interval = setInterval(() => {
      setFactVisible(false)
      setTimeout(() => {
        setFactIdx((prev) => (prev + 1) % FACTS.length)
        setStatusIdx((prev) => (prev + 1) % STATUS_MESSAGES.length)
        setFactVisible(true)
      }, 400) 
    }, 7000) // Rotación cada 7 segundos para asegurar legibilidad técnica

    return () => clearInterval(interval)
  }, [phase])

  useEffect(() => {
    if (!animDone || warmupStatus !== 'warm') return
    setExiting(true)
    const t = setTimeout(() => onCompleteRef.current(), 550)
    return () => clearTimeout(t)
  }, [animDone, warmupStatus])

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
          {/* Header Section */}
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

          {/* Technical Facts Carousel */}
          <div className="mt-12 h-10 flex items-center justify-center px-6 text-center">
            <AnimatePresence mode="wait">
              {factVisible && (
                <motion.p
                  key={`fact-${factIdx}`}
                  className="font-body text-text-muted text-xs sm:text-sm tracking-wide max-w-md italic"
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

          {/* Footer Status & Logistics */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-8 pb-6 sm:pb-8"
            initial={{ opacity: 0 }}
            animate={phase >= 3 ? { opacity: 1 } : {}}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col items-center gap-3" role="status">
              {/* Status Message Rotation */}
              <div className="flex items-center gap-2 mb-1">
                <svg width="14" height="14" viewBox="0 0 18 18" fill="none" className="text-accent/60 animate-pulse">
                  <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <AnimatePresence mode="wait">
                  <motion.span 
                    key={`status-${statusIdx}`}
                    className="font-body text-[10px] text-text-muted uppercase tracking-wider min-w-[220px] text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {STATUS_MESSAGES[statusIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Progress Indicator & Boot Info */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full border-2 border-accent/20 border-t-accent animate-spin" />
                  <span className="font-mono text-[10px] text-text-muted/80">
                    {warmupStatus === 'cold'  ? 'Warming up assistant…' :
                     warmupStatus === 'error' ? 'Retrying connection…' :
                                                'Loading knowledge base…'}
                  </span>
                </div>
                
                {/* Discrete 2-min warning */}
                <span className="font-body text-[9px] text-text-muted/40 tracking-tight lowercase">
                  (Initial boot can take up to 2 min due to server wakeup)
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