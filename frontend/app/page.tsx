'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntroAnimation } from '@/components/IntroAnimation'
import { ChatInterface } from '@/components/ChatInterface'
import { WarmupToast } from '@/components/WarmupToast'
import { Navbar } from '@/components/portfolio/Navbar'
import { useWarmup } from '@/hooks/useWarmup'

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const { status } = useWarmup()
  function focusChat() {
    // Scroll to and focus the chat input
    const textarea = document.querySelector<HTMLTextAreaElement>('textarea')
    textarea?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    setTimeout(() => textarea?.focus(), 300)
  }

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
          <WarmupToast warmupStatus={status} onChatNow={focusChat} />
        </div>
      )}
    </>
  )
}
