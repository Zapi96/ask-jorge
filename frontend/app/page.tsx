'use client'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntroAnimation } from '@/components/IntroAnimation'
import { ChatInterface } from '@/components/ChatInterface'
import { WarmupToast } from '@/components/WarmupToast'
import { Navbar } from '@/components/portfolio/Navbar'
import { useWarmup } from '@/hooks/useWarmup'

export default function HomePage() {
  const [introDone, setIntroDone] = useState<boolean | null>(null)
  const { status } = useWarmup()

  useEffect(() => {
    const shown = sessionStorage.getItem('introShown') === 'true'
    setIntroDone(shown)
  }, [])

  function handleIntroComplete() {
    sessionStorage.setItem('introShown', 'true')
    setIntroDone(true)
  }

  function focusChat() {
    const textarea = document.querySelector<HTMLTextAreaElement>('textarea')
    textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => textarea?.focus(), 300)
  }

  if (introDone === null) return null

  return (
    <div className="portfolio bg-p-bg">
      <AnimatePresence>
        {!introDone && (
          <IntroAnimation onComplete={handleIntroComplete} warmupStatus={status} />
        )}
      </AnimatePresence>
      {introDone && (
        <div className="flex h-screen flex-col overflow-hidden bg-p-bg">
          <Navbar />
          <ChatInterface warmupStatus={status} />
          <WarmupToast warmupStatus={status} onChatNow={focusChat} />
        </div>
      )}
    </div>
  )
}
