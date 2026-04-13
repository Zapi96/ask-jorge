'use client'
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Send } from 'lucide-react'
import { useChat } from '@/hooks/useChat'
import { WarmupStatus } from '@/lib/api'
import { ChatBubble } from './ChatBubble'
import { TypingIndicator } from './TypingIndicator'
import { SuggestedQuestions } from './SuggestedQuestions'
import { StatusBadge } from './StatusBadge'
import { cn } from '@/lib/utils'

interface ChatInterfaceProps {
  warmupStatus: WarmupStatus
}

export function ChatInterface({ warmupStatus }: ChatInterfaceProps) {
  const { messages, isLoading, error, sendMessage } = useChat()
  const [input, setInput] = useState('')
  // Only block input while an actual request is in flight — not on warmup error,
  // since the chat endpoint may still work even if the warmup ping failed.
  const isUnavailable = false
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const hasMessages = messages.length > 0

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    const q = input.trim()
    if (!q || isLoading || isUnavailable) return
    setInput('')
    sendMessage(q)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="flex h-dvh flex-col">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border-default px-6 py-4">
        <div>
          <h1 className="font-heading font-[600] text-base text-text-primary">Ask Jorge</h1>
          <p className="font-mono text-[11px] text-text-muted">AI-powered professional profile</p>
        </div>
        <StatusBadge status={warmupStatus} />
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <div className="mx-auto flex max-w-2xl flex-col gap-4">
          {!hasMessages && (
            <div className="flex flex-1 flex-col items-center justify-center gap-8 pt-16">
              <p className="font-body text-sm text-text-muted text-center max-w-sm">
                Ask me anything about Jorge&apos;s professional experience, skills, or background.
              </p>
              <SuggestedQuestions
                onSelect={(q) => { setInput(q); sendMessage(q) }}
              />
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
      </footer>
    </div>
  )
}
