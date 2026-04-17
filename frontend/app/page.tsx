'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntroAnimation } from '@/components/IntroAnimation'
import { ChatInterface } from '@/components/ChatInterface'
import { Navbar } from '@/components/portfolio/Navbar'
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
      {introDone && (
        <div className="portfolio flex min-h-screen flex-col bg-p-bg">
          <Navbar />
          <ChatInterface warmupStatus={status} />
        </div>
      )}
    </>
  )
}
