'use client'
import { motion } from 'framer-motion'

export function TypingIndicator() {
  return (
    <div
      className="flex items-center gap-[5px] rounded-2xl rounded-tl-sm border border-border-default bg-surface px-4 py-3"
      role="status"
      aria-label="Assistant is thinking"
    >
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="block h-[6px] w-[6px] rounded-full bg-accent"
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 0.9,
            delay: i * 0.15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden
        />
      ))}
    </div>
  )
}
