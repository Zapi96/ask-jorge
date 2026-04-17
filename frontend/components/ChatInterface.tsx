'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { WarmupStatus } from '@/lib/api'
import { ChatBubble } from './ChatBubble'
import { TypingIndicator } from './TypingIndicator'
import { SuggestedQuestions, QUESTIONS } from './SuggestedQuestions'
import { StatusBadge } from './StatusBadge'
import { ThemeToggle } from './ThemeToggle'
import { LogoCarousel } from './LogoCarousel'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  warmupStatus: WarmupStatus
}

export function ChatInterface({ warmupStatus }: ChatInterfaceProps) {
  const { messages, isLoading, error, sendMessage } = useChat()
  const [input, setInput] = useState('')
  const [suggIdx, setSuggIdx] = useState(0)
  const [justReady, setJustReady] = useState(false)
  const prevStatus = useRef<WarmupStatus>('loading')
  const isWarmingUp = warmupStatus !== 'warm'
  const showOverlay = isWarmingUp || justReady
  const isUnavailable = false
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasMessages = messages.length > 0

  // Detect warm transition → show "ready" state on overlay for 2.5s
  useEffect(() => {
    if (prevStatus.current !== 'warm' && warmupStatus === 'warm') {
      setJustReady(true)
      const t = setTimeout(() => setJustReady(false), 2500)
      return () => clearTimeout(t)
    }
    prevStatus.current = warmupStatus
  }, [warmupStatus])

  // Rotate compact suggestions after each assistant reply
  useEffect(() => {
    const last = messages[messages.length - 1]
    if (last?.role === 'assistant') {
      setSuggIdx((i) => (i + 2) % QUESTIONS.length)
    }
  }, [messages])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const handleSend = useCallback((q: string) => {
    if (!q.trim() || isLoading || isUnavailable) return
    setInput('')
    sendMessage(q.trim())
  }, [isLoading, isUnavailable, sendMessage])

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    handleSend(input)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend(input)
    }
  }

  return (
    <div className="relative flex h-dvh flex-col">
      {/* Warmup overlay — warming state + ready flash */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            key="warmup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={cn(
              'absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-[3px]',
              justReady ? 'bg-bg/90' : 'bg-bg/80'
            )}
            aria-live="polite"
          >
            {/* Progress bar — only while warming */}
            {!justReady && (
              <div className="absolute top-0 left-0 right-0 h-0.5 overflow-hidden bg-border-default">
                <div className="absolute h-full bg-accent warmup-bar" />
              </div>
            )}

            <AnimatePresence mode="wait">
              {justReady ? (
                /* ── Ready state ── */
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center gap-4 px-6 text-center"
                >
                  <motion.div
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  >
                    <CheckCircle className="h-10 w-10 text-accent" aria-hidden />
                  </motion.div>
                  <p className="font-heading text-lg font-semibold text-text-primary">
                    Asistente listo
                  </p>
                  <p className="font-mono text-xs text-text-muted">
                    Ya puedes hacer tu primera pregunta
                  </p>
                </motion.div>
              ) : (
                /* ── Warming state ── */
                <motion.div
                  key="warming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col items-center gap-4 px-6 text-center"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full border-2 border-accent/30 border-t-accent animate-spin" aria-hidden />
                    <span className="font-heading text-sm font-semibold text-text-primary">
                      Activando asistente de IA…
                    </span>
                  </div>
                  <p className="max-w-xs font-mono text-[11px] text-text-muted">
                    {warmupStatus === 'error'
                      ? 'Reintentando conexión con el modelo…'
                      : 'El modelo está arrancando. La primera carga puede tardar hasta 2 min.'}
                  </p>
                  <div className="mt-2 flex items-center gap-2 rounded-lg border border-border-default bg-surface px-3 py-2">
                    <svg width="13" height="13" viewBox="0 0 18 18" fill="none" className="text-accent shrink-0">
                      <circle cx="9" cy="9" r="7" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 5v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="font-mono text-[10px] text-text-muted">
                      Puedes explorar el portfolio mientras esperas
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-default px-6 py-4">
        <div>
          <h1 className="font-heading font-[600] text-base text-text-primary">Ask about Jorge</h1>
          <p className="font-mono text-[11px] text-text-muted">AI-powered professional profile</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <StatusBadge status={warmupStatus} />
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {!hasMessages && (
            <div className="flex flex-1 flex-col items-center justify-center gap-8 pt-16">
              <p className="font-body text-sm text-text-muted text-center max-w-sm">
                Ask me anything about Jorge&apos;s professional experience, skills, or background.
              </p>
              <SuggestedQuestions onSelect={handleSend} />
            </div>
          )}

          <AnimatePresence initial={false}>
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            {isLoading && (
              <div className="flex justify-start" key="typing">
                <TypingIndicator />
              </div>
            )}
          </AnimatePresence>

          {error && (
            <p className="text-center text-xs text-destructive font-mono" role="alert">
              {error}
            </p>
          )}

          <div ref={bottomRef} />
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-border-default px-4 py-4">
        {/* Compact suggestions — only when conversation is active */}
        {hasMessages && (
          <div className="mx-auto mb-2 flex max-w-2xl flex-col items-end gap-1">
            {[QUESTIONS[suggIdx], QUESTIONS[(suggIdx + 1) % QUESTIONS.length]].map((q) => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                disabled={isLoading}
                className="max-w-[260px] truncate rounded-lg border border-border-default px-3 py-1 font-mono text-[10px] text-text-muted transition-colors duration-150 hover:border-accent hover:text-accent disabled:opacity-40 cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <form
          onSubmit={handleSubmit}
          className="mx-auto flex max-w-2xl items-end gap-3"
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={isWarmingUp ? 'El asistente se está activando…' : 'Ask something about Jorge…'}
            rows={1}
            disabled={isLoading || isUnavailable || isWarmingUp}
            aria-label="Your question"
            className={cn(
              'flex-1 resize-none rounded-xl border border-border-default bg-elevated px-4 py-3',
              'font-body text-sm text-text-primary placeholder:text-text-muted',
              'focus:border-border-gold focus:outline-none transition-colors duration-150',
              'min-h-[48px] max-h-36',
              isLoading && 'opacity-50 cursor-not-allowed'
            )}
            style={{ fieldSizing: 'content' } as React.CSSProperties}
          />
          <button
            type="submit"
            disabled={isLoading || isUnavailable || isWarmingUp || !input.trim()}
            aria-label="Send message"
            className={cn(
              'flex h-12 w-12 shrink-0 items-center justify-center rounded-xl',
              'bg-accent text-bg transition-all duration-150',
              'hover:bg-accent/90 active:scale-95',
              'disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer',
              'focus-visible:outline-2 focus-visible:outline-accent'
            )}
          >
            <Send className="h-4 w-4" aria-hidden />
          </button>
        </form>
        {warmupStatus === 'cold' && (
          <p className="mt-2 text-center font-mono text-[11px] text-text-muted">
            First response may take a few seconds while the assistant warms up.
          </p>
        )}
        {warmupStatus === 'error' && (
          <p className="mt-2 text-center font-mono text-[11px] text-text-muted">
            The assistant is starting up. This may take a few minutes — it will retry automatically.
          </p>
        )}
        <div className="mt-3 border-t border-border-default pt-3">
          <LogoCarousel />
        </div>
      </footer>
    </div>
  )
}
