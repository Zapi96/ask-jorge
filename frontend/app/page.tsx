'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntroAnimation } from '@/components/IntroAnimation'
import { ChatInterface } from '@/components/ChatInterface'
import { useWarmup } from '@/hooks/useWarmup'

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const { status } = useWarmup()

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <IntroAnimation onComplete={() => setIntroDone(true)} warmupStatus={status} />
        )}
      </AnimatePresence>
      {introDone && <ChatInterface warmupStatus={status} />}
    </>
  )
}
