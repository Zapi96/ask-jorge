'use client'
import { useState, useEffect, useRef } from 'react'
import { checkWarmup, WarmupStatus } from '@/lib/api'

const RETRY_INTERVAL_MS = 15_000

const SESSION_KEY = 'warmup-status'

export function useWarmup() {
  const [status, setStatus] = useState<WarmupStatus>(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem(SESSION_KEY) === 'warm') {
      return 'warm'
    }
    return 'loading'
  })
  const [latencyMs, setLatencyMs] = useState<number | null>(null)
  const statusRef = useRef(status)
  statusRef.current = status

  useEffect(() => {
    // Already known warm this session — no ping needed
    if (statusRef.current === 'warm') return

    let active = true

    async function ping() {
      const result = await checkWarmup()
      if (!active) return
      if (result.status === 'warm') sessionStorage.setItem(SESSION_KEY, 'warm')
      setStatus(result.status)
      setLatencyMs(result.latency_ms)
    }

    ping()

    const interval = setInterval(() => {
      if (statusRef.current !== 'warm') ping()
    }, RETRY_INTERVAL_MS)

    return () => {
      active = false
      clearInterval(interval)
    }
  }, [])

  return { status, latencyMs }
}
