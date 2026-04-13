'use client'
import { useState, useEffect, useRef } from 'react'
import { checkWarmup, WarmupStatus } from '@/lib/api'

const RETRY_INTERVAL_MS = 30_000

export function useWarmup() {
  const [status, setStatus] = useState<WarmupStatus>('cold')
  const [latencyMs, setLatencyMs] = useState<number | null>(null)
  const statusRef = useRef(status)
  statusRef.current = status

  useEffect(() => {
    let active = true

    async function ping() {
      const result = await checkWarmup()
      if (!active) return
      setStatus(result.status)
      setLatencyMs(result.latency_ms)
    }

    ping()

    // Retry every 30 s until warm
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
