'use client'
import { useState, useCallback } from 'react'
import { sendChat } from '@/lib/api'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const sendMessage = useCallback(async (question: string) => {
    if (isLoading || !question.trim()) return
    setError(null)

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: question.trim(),
    }
    setMessages((prev) => [...prev, userMsg])
    setIsLoading(true)

    try {
      const { answer } = await sendChat(question.trim())
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: answer,
      }
      setMessages((prev) => [...prev, assistantMsg])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  return { messages, isLoading, error, sendMessage }
}
