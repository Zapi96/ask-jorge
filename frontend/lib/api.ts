const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

export type WarmupStatus = 'loading' | 'warm' | 'cold' | 'error'

export interface WarmupResult {
  status: WarmupStatus
  latency_ms: number | null
}

export interface ChatResult {
  answer: string
  status: string
}

export async function checkWarmup(): Promise<WarmupResult> {
  try {
    const res = await fetch(`${API_URL}/warmup`, { cache: 'no-store' })
    if (!res.ok) return { status: 'error', latency_ms: null }
    return res.json()
  } catch {
    return { status: 'error', latency_ms: null }
  }
}

export async function sendChat(question: string): Promise<ChatResult> {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { detail?: string }).detail ?? 'Request failed')
  }
  return res.json()
}

export async function adminLogin(password: string): Promise<string> {
  const res = await fetch(`${API_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) throw new Error('Invalid password')
  const data = await res.json()
  return data.access_token
}

export async function uploadFiles(files: File[], token: string): Promise<{ files: Array<{ name: string; run_id: number; status: string }> }> {
  const formData = new FormData()
  files.forEach((f) => formData.append('files', f))
  const res = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { detail?: string }).detail ?? 'Upload failed')
  }
  return res.json()
}

export async function pollUploadStatus(runIds: number[], token: string): Promise<Array<{ run_id: number; status: string }>> {
  const res = await fetch(`${API_URL}/upload/status?run_ids=${runIds.join(',')}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!res.ok) throw new Error('Status check failed')
  const data = await res.json()
  return data.statuses
}

export interface ContactPayload {
  name: string
  email: string
  subject: string
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<void> {
  const res = await fetch(`${API_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error((err as { detail?: string }).detail ?? 'Submission failed')
  }
}
