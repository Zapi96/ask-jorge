'use client'
import { useState, useCallback, useEffect } from 'react'
import { sendChat } from '@/lib/api'

export interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const MESSAGES_KEY = 'chat-messages'

export function useChat() {
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return []
    try {
      const stored = sessionStorage.getItem(MESSAGES_KEY)
      return stored ? (JSON.parse(stored) as Message[]) : []
    } catch {
      return []
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    sessionStorage.setItem(MESSAGES_KEY, JSON.stringify(messages))
  }, [messages])

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
