'use client'
import { motion } from 'framer-motion'

export const QUESTIONS = [
  "What's Jorge's experience with Databricks and MLflow?",
  "What ML projects has he led?",
  "What's his main tech stack?",
  "Does he have RAG (Retrieval-Augmented Generation) experience?",
  "What's his background before MLOps?",
  "Is he available to relocate?",
]

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 px-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {QUESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onSelect(q)}
          className="rounded-full border border-border-gold bg-surface px-4 py-2 text-sm font-heading text-text-muted transition-colors duration-150 hover:border-accent hover:text-accent cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
        >
          {q}
        </button>
      ))}
    </motion.div>
  )
}
