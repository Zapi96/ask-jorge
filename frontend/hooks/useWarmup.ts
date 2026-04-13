'use client'
import { useState, useEffect } from 'react'
import { checkWarmup, WarmupStatus } from '@/lib/api'

export function useWarmup() {
  const [status, setStatus] = useState<WarmupStatus>('cold')
  const [latencyMs, setLatencyMs] = useState<number | null>(null)

  useEffect(() => {
    let active = true
    checkWarmup().then((result) => {
      if (!active) return
      setStatus(result.status)
      setLatencyMs(result.latency_ms)
    })
    return () => { active = false }
  }, [])

  return { status, latencyMs }
}
