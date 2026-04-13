'use client'
import { WarmupStatus } from '@/lib/api'
import { cn } from '@/lib/utils'

const CONFIG: Record<WarmupStatus, { label: string; dotClass: string }> = {
  warm: { label: 'Ready', dotClass: 'bg-accent animate-pulse-gold' },
  cold: { label: 'Warming up…', dotClass: 'bg-warning animate-pulse' },
  error: { label: 'Unavailable', dotClass: 'bg-destructive' },
}

export function StatusBadge({ status }: { status: WarmupStatus }) {
  const cfg = CONFIG[status]
  return (
    <div
      role="status"
      aria-label={`Assistant status: ${cfg.label}`}
      className="flex items-center gap-1.5 rounded-full border border-border-default bg-surface px-3 py-1 text-xs font-mono text-text-muted"
    >
      <span className={cn('h-1.5 w-1.5 rounded-full', cfg.dotClass)} aria-hidden />
      {cfg.label}
    </div>
  )
}
