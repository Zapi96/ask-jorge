'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, X } from 'lucide-react'
import { WarmupStatus } from '@/lib/api'

interface WarmupToastProps {
  warmupStatus: WarmupStatus
  onChatNow: () => void
}

export function WarmupToast({ warmupStatus, onChatNow }: WarmupToastProps) {
  const [visible, setVisible] = useState(false)
  const prevStatus = useRef<WarmupStatus>('loading')

  useEffect(() => {
    // Only show when transitioning from non-warm → warm
    if (prevStatus.current !== 'warm' && warmupStatus === 'warm') {
      setVisible(true)
      const t = setTimeout(() => setVisible(false), 8000)
      return () => clearTimeout(t)
    }
    prevStatus.current = warmupStatus
  }, [warmupStatus])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-50 flex items-start gap-3 rounded-xl border border-border-gold bg-elevated px-4 py-3 shadow-lg max-w-[260px]"
          role="status"
          aria-live="polite"
        >
          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
          <div className="flex-1 min-w-0">
            <p className="font-heading text-sm font-semibold text-text-primary">
              Asistente listo
            </p>
            <button
              onClick={() => { setVisible(false); onChatNow() }}
              className="mt-1 font-mono text-[11px] text-accent hover:underline cursor-pointer"
            >
              Chatear ahora →
            </button>
          </div>
          <button
            onClick={() => setVisible(false)}
            aria-label="Cerrar notificación"
            className="mt-0.5 rounded p-0.5 text-text-muted transition-colors hover:text-text-primary cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
