'use client'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Message } from '@/hooks/useChat'
import { cn } from '@/lib/utils'

export function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      className={cn('flex w-full', isUser ? 'justify-end' : 'justify-start')}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className={cn(
          'max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed font-body',
          isUser
            ? 'rounded-tr-sm bg-accent/10 border border-accent/25 text-text-primary'
            : 'rounded-tl-sm border border-border-default bg-surface text-text-primary backdrop-blur-md'
        )}
      >
        {isUser ? (
          message.content
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
              ul: ({ children }) => <ul className="mb-2 ml-4 list-disc space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal space-y-1">{children}</ol>,
              li: ({ children }) => <li className="leading-relaxed">{children}</li>,
              strong: ({ children }) => <strong className="font-semibold text-text-primary">{children}</strong>,
              em: ({ children }) => <em className="italic">{children}</em>,
            }}
          >
            {message.content}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  )
}
