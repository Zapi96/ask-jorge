'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
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
  const isUnavailable = false
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasMessages = messages.length > 0

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
    <div className="flex h-dvh flex-col">
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
            placeholder="Ask something about Jorge…"
            rows={1}
            disabled={isLoading || isUnavailable}
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
            disabled={isLoading || isUnavailable || !input.trim()}
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
