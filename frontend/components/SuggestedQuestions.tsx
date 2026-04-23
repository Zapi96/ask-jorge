'use client'
import { motion } from 'framer-motion'
import { useLang } from '@/lib/i18n'

const QUESTIONS_EN = [
  "What's your experience with Databricks and MLflow?",
  "What ML projects have you led?",
  "What's your main tech stack?",
  "Do you have RAG (Retrieval-Augmented Generation) experience?",
  "What's your background before MLOps?",
  "What talks or workshops have you given?",
]

const QUESTIONS_ES = [
  '¿Cuál es tu experiencia con Databricks y MLflow?',
  '¿Qué proyectos de ML has liderado?',
  '¿Cuál es tu stack tecnológico principal?',
  '¿Tienes experiencia con RAG (Retrieval-Augmented Generation)?',
  '¿Cuál es tu background antes del MLOps?',
  '¿Qué charlas o talleres has impartido?',
]

export const QUESTIONS = QUESTIONS_EN

interface SuggestedQuestionsProps {
  onSelect: (question: string) => void
}

export function SuggestedQuestions({ onSelect }: SuggestedQuestionsProps) {
  const t = useLang()
  const questions = QUESTIONS_EN.map((en, i) => t(en, QUESTIONS_ES[i]))

  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 px-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {questions.map((q, i) => (
        <button
          key={QUESTIONS_EN[i]}
          onClick={() => onSelect(q)}
          className="rounded-full border border-border-gold bg-surface px-4 py-2 text-sm font-heading text-text-muted transition-colors duration-150 hover:border-accent hover:text-accent cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
        >
          {q}
        </button>
      ))}
    </motion.div>
  )
}
