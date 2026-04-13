'use client'
import { motion } from 'framer-motion'
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
            ? 'rounded-tr-sm bg-[rgba(201,168,76,0.12)] border border-border-gold text-text-primary'
            : 'rounded-tl-sm border border-border-default bg-surface text-text-primary backdrop-blur-md'
        )}
      >
        {message.content}
      </div>
    </motion.div>
  )
}
