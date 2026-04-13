'use client'
import { useCallback, useRef, useState } from 'react'
import { Upload, CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import { adminLogin, uploadFiles, pollUploadStatus } from '@/lib/api'
import { cn } from '@/lib/utils'

interface FileJob {
  name: string
  run_id: number
  status: 'queued' | 'running' | 'success' | 'failed'
}

export function AdminPanel() {
  const [token, setToken] = useState<string | null>(null)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [jobs, setJobs] = useState<FileJob[]>([])
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError(null)
    try {
      const t = await adminLogin(password)
      setToken(t)
    } catch {
      setLoginError('Invalid password')
    }
  }

  const handleFiles = useCallback(async (files: File[]) => {
    if (!token || uploading) return
    const valid = files.filter((f) => f.name.match(/\.(pdf|docx)$/i) && f.size <= 10 * 1024 * 1024)
    if (!valid.length) {
      setUploadError('Only PDF or DOCX files under 10MB are accepted.')
      return
    }
    setUploadError(null)
    setUploading(true)
    try {
      const { files: jobFiles } = await uploadFiles(valid, token)
      const initialJobs: FileJob[] = jobFiles.map((f) => ({
        name: f.name,
        run_id: f.run_id,
        status: 'queued',
      }))
      setJobs((prev) => [...prev, ...initialJobs])

      // Poll until all done
      const runIds = jobFiles.map((f) => f.run_id)
      const poll = setInterval(async () => {
        const statuses = await pollUploadStatus(runIds, token)
        setJobs((prev) =>
          prev.map((j) => {
            const s = statuses.find((s) => s.run_id === j.run_id)
            return s ? { ...j, status: s.status as FileJob['status'] } : j
          })
        )
        const allDone = statuses.every((s) => s.status === 'success' || s.status === 'failed')
        if (allDone) clearInterval(poll)
      }, 5000)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Upload failed')
    } finally {
      setUploading(false)
    }
  }, [token, uploading])

  if (!token) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-bg px-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-heading text-xl font-[600] text-text-primary">Admin Access</h1>
          <div>
            <label className="mb-1.5 block font-body text-xs text-text-muted" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-border-default bg-elevated px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted focus:border-border-gold focus:outline-none"
            />
          </div>
          {loginError && <p className="text-xs text-destructive font-mono" role="alert">{loginError}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-accent py-3 font-heading text-sm font-[600] text-bg hover:bg-accent/90 transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-bg px-6 py-10">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-xl font-[600] text-text-primary">Document Manager</h1>
          <button
            onClick={() => setToken(null)}
            className="font-mono text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
          >
            Logout
          </button>
        </div>

        {/* Drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault()
            setIsDragging(false)
            handleFiles(Array.from(e.dataTransfer.files))
          }}
          onClick={() => fileInputRef.current?.click()}
          className={cn(
            'flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed py-16 transition-colors duration-150',
            isDragging ? 'border-accent bg-accent/5' : 'border-border-default hover:border-border-gold'
          )}
          role="button"
          tabIndex={0}
          aria-label="Drop PDF or DOCX files here or click to select"
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
        >
          <Upload className={cn('h-8 w-8', isDragging ? 'text-accent' : 'text-text-muted')} aria-hidden="true" />
          <p className="font-body text-sm text-text-muted text-center">
            Drop PDF or DOCX files here<br />
            <span className="text-xs">Max 10MB per file</span>
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(Array.from(e.target.files ?? []))}
          />
        </div>

        {uploadError && (
          <p className="text-xs text-destructive font-mono" role="alert">{uploadError}</p>
        )}

        {/* Job list */}
        {jobs.length > 0 && (
          <div className="space-y-2">
            <h2 className="font-heading text-sm font-[500] text-text-muted">Indexing jobs</h2>
            {jobs.map((job, i) => (
              <div
                key={`${job.name}-${i}`}
                className="flex items-center justify-between rounded-xl border border-border-default bg-surface px-4 py-3"
              >
                <span className="font-mono text-xs text-text-primary truncate max-w-[60%]">{job.name}</span>
                <span className="flex items-center gap-1.5 font-mono text-xs">
                  {job.status === 'success' && <><CheckCircle2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" /> <span className="text-accent">Done</span></>}
                  {job.status === 'failed' && <><XCircle className="h-3.5 w-3.5 text-destructive" aria-hidden="true" /> <span className="text-destructive">Failed</span></>}
                  {(job.status === 'queued' || job.status === 'running') && (
                    <><Loader2 className="h-3.5 w-3.5 animate-spin text-warning" aria-hidden="true" /> <span className="text-warning">Indexing…</span></>
                  )}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
