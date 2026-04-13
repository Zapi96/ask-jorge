# Ask Jorge — Design Spec
**Date:** 2026-04-13  
**Status:** Approved  
**Project:** RAG CV Assistant — "Ask Jorge"

---

## 1. What We're Building

A public-facing conversational web app that lets recruiters ask questions about Jorge Martínez Zapico's professional and personal profile. Powered by a RAG pipeline on Databricks. Deployed on Vercel (frontend) + Render (backend).

**Tone:** Premium, dark, editorial. RAP aesthetic — Roc Nation meets Vercel. Not cartoonish.

---

## 2. Architecture Overview

```
Recruiter → Next.js frontend (Vercel)
                ↓ POST /chat
           FastAPI backend (Render)
                ↓ guardrails + rate limiting
           Databricks Serving Endpoint (jorge_cv_endpoint)
                ↓ Vector Search → LLM → response
           FastAPI backend
                ↓ output guardrails
           Next.js frontend → chat UI
```

Admin flow:
```
Admin → /admin (JWT-protected) → POST /upload (multi-file)
     → FastAPI → PUT Volume → POST jobs/run-now (per file)
     → polling → frontend status update
```

---

## 3. Databricks Resources

Resources to create in the existing workspace (adapted from CDJ workshop):

| Resource | Name |
|---|---|
| Volume path | `/Volumes/workspace/default/jorge_cv_docs/` |
| Delta table | `workspace.default.jorge_cv_chunks` |
| Vector Search endpoint | `jorge_cv_search` |
| Vector Search index | `workspace.default.jorge_cv_search_index` |
| Serving endpoint | `jorge_cv_endpoint` |
| MLflow model | `workspace.default.jorge_cv_chatbot` |
| LLM | `databricks-meta-llama-3-3-70b-instruct` |
| Retriever k | 3 chunks |
| Max output tokens | 500 |
| Temperature | 0.01 |
| Scale to zero | true (warm-up strategy handles cold starts) |

**System prompt:**
```
You are a professional assistant for Jorge Martínez Zapico, Senior MLOps & AI Engineer
(Azure Solutions Architect Expert, Databricks Certified Machine Learning Professional).
You help recruiters and visitors learn about Jorge's professional background, experience,
skills, certifications, and personal interests he has chosen to share.

Answer questions about:
- Professional experience, skills, certifications, projects
- Personal topics Jorge shares: hobbies, interests, personal story, background

Answer ONLY based on the provided context. If you don't know, say so.
Decline questions unrelated to Jorge (general knowledge, third parties, politics, etc.).
Do not reveal sensitive contact details (phone, exact address) unless explicitly present.

Context: {context}
```

**Serving endpoint input/output:**
- Input: `{"messages": [{"role": "user", "content": "..."}]}`
- Output: `{"predictions": [{"content": "..."}]}`
- REST: `POST https://<DATABRICKS_HOST>/serving-endpoints/jorge_cv_endpoint/invocations`

---

## 4. Project Structure

```
rag-cv/
├── _context/                    # NOT committed to git
│   ├── main.pdf                 # Jorge's CV (source of truth)
│   └── personal.md              # Contact + personal info
│
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx             # Public chat
│   │   └── admin/page.tsx       # Protected admin
│   ├── components/
│   │   ├── IntroAnimation.tsx
│   │   ├── ChatInterface.tsx
│   │   ├── ChatBubble.tsx
│   │   ├── StatusBadge.tsx
│   │   ├── SuggestedQuestions.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── AdminPanel.tsx
│   ├── hooks/
│   │   ├── useWarmup.ts
│   │   └── useChat.ts
│   ├── lib/api.ts
│   ├── .env.local
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── routers/
│   │   ├── chat.py              # POST /chat
│   │   ├── upload.py            # POST /upload (multi-file)
│   │   └── warmup.py            # GET /warmup
│   ├── services/
│   │   └── databricks.py        # All Databricks REST calls
│   ├── middleware/
│   │   ├── rate_limiter.py
│   │   ├── guardrails.py
│   │   └── token_counter.py
│   ├── tests/
│   ├── .env
│   └── requirements.txt
│
├── databricks/
│   ├── notebooks/
│   │   ├── 1_ingestion.ipynb    # PDF chunking + Delta + Vector Search
│   │   └── 2_serving_model.ipynb # RAG chain + MLflow + endpoint
│   └── bundles/
│       ├── databricks.yml
│       ├── resources/ingestion_job.yml
│       └── src/ingestion.py
│
├── .github/workflows/
│   ├── frontend.yml
│   ├── backend.yml
│   └── databricks.yml
│
├── .gitignore                   # Excludes _context/, .env, .env.local
├── CLAUDE.md
└── README.md
```

---

## 5. Frontend — Visual Design System

### Philosophy
**Roc Nation meets Vercel.** Dark, editorial, premium. Hip-hop luxury aesthetic — not cartoonish. The gold accent is the single point of color: chains, trophies, gold records. Everything else is warm black and muted.

### Color Tokens
```css
--bg:            #080807;              /* Near-black warm */
--surface:       #100F0D;              /* Chat surface */
--elevated:      #181614;              /* Inputs, hover */
--border:        rgba(255,255,255,0.07);
--border-gold:   rgba(201,168,76,0.20);
--text-primary:  #F2EDE6;             /* Warm white */
--text-muted:    #7A7269;
--accent:        #C9A84C;             /* Gold — single accent */
--accent-glow:   rgba(201,168,76,0.12);
--destructive:   #EF4444;
--warning:       #F59E0B;
```

### Typography
| Role | Font | Weight |
|---|---|---|
| Display (intro) | Syne | 700–800 |
| Heading | Space Grotesk | 500–700 |
| Body / chat | Geist | 300–500 |
| Mono / status | Geist Mono | 400 |

### Effects
- Grain texture overlay: SVG noise, `opacity: 0.03` on `::before` of body
- Glassmorphism cards: `backdrop-blur-md`, `bg-white/[0.03]`, gold hairline border
- Gold glow on active status: `box-shadow: 0 0 12px rgba(201,168,76,0.4)`
- Spring animations: Framer Motion `type: "spring"`, `damping: 20, stiffness: 90`
- Exit animations 60–70% shorter than enter

---

## 6. Frontend — Intro Animation + Warm-up

**Duration:** 3–4 seconds total. Warm-up fires immediately at second 1 in background.

```
Phase 1 (0–0.8s):   Fade in dark background
Phase 2 (0.8–2.0s): "JORGE" letter-by-letter, Syne 800, stagger 80ms/char
                     "MARTÍNEZ ZAPICO" fades in below, Space Grotesk 500 tracking-widest
Phase 3 (2.0–3.0s): "Senior MLOps & AI Engineer" fade in
                     Animated status bar: 3 gold dots + message cycling:
                     "Initializing…" → "Loading knowledge base…" → "Ready"
Phase 4 (3.0–4.0s): Slide-up transition into chat UI
                     If endpoint not warm yet → badge shows "Warming up…" (amber)
                     If warm → badge shows "Ready" (gold solid)
```

Warm-up is non-blocking — the chat is always accessible after the animation ends.

---

## 7. Frontend — Chat Components

### StatusBadge
- `🟡` Amber pulsing = warming up
- `●` Gold solid = ready
- `✕` Red = unavailable
- Positioned top-right, discrete, always visible

### SuggestedQuestions (chips)
Shown before first user message, disappear on first send:
- "What's Jorge's experience with Databricks and MLflow?"
- "What ML projects has he led?"
- "What's his main tech stack?"
- "Does he have RAG architecture experience?"
- "What's his background before MLOps?"
- "Is he available to relocate?"

### ChatBubble
- User: warm gold-tinted surface, right-aligned
- Assistant: glassmorphism card, left-aligned, gold border hairline
- Typing indicator: 3 bouncing dots (stagger 100ms), gold color

---

## 8. Backend — API Endpoints

### POST /chat
```
Request:  { "question": string }          # max 200 tokens
Response: { "answer": string, "status": "ok" }

Guards:
- token_counter: reject if > 200 tokens (tiktoken)
- guardrails input: prompt injection, off-topic, offensive
- rate_limiter: 5/min, 20/hour per IP (slowapi)
- timeout: 30s to Databricks
- guardrails output: no sensitive PII leakage

Errors: 400 (guardrail), 429 (rate limit), 504 (timeout), 500 (unknown)
```

### POST /upload (admin only, JWT required)
```
Request:  multipart/form-data, multiple files (PDF/DOCX, max 10MB each)
Response: { "files": [{ "name": string, "run_id": int, "status": "queued" }] }

Flow per file:
1. Validate extension (pdf/docx) + MIME + size
2. PUT /api/2.0/fs/files/jorge_cv_docs/<filename>
3. POST /api/2.1/jobs/run-now with notebook_params { file_path, full_reindex }
   full_reindex=true only on first file of batch (truncates table once)
4. Return run_ids for polling

Polling: GET /upload/status?run_ids=1,2,3 → per-file status
```

### GET /warmup
```
Response: { "status": "warm" | "cold" | "error", "latency_ms": int }
Fire-and-forget ping to Databricks endpoint with minimal payload.
```

### GET /health
```
Response: { "status": "ok" }
Used by Render post-deploy health check.
```

---

## 9. Backend — Guardrails

### Input guardrails (regex patterns)
```python
PROMPT_INJECTION = [
    r"ignore (previous|above|all) instructions",
    r"act as (if you are|a|an)",
    r"forget (your|the) (role|instructions|prompt)",
    r"you are now",
    r"disregard",
    r"new persona",
]
OFF_TOPIC_SIGNALS = [
    # Not strictly blocked — the LLM system prompt handles this
    # Regex only catches obvious non-Jorge queries
]
```

### Output guardrails
- Strip phone numbers: `r'\+\d[\d\s\-\(\)]{8,}'`
- Strip exact street addresses
- Flag if response length < 20 chars (likely hallucination/refusal)

---

## 10. Databricks Asset Bundle

### `databricks.yml`
```yaml
bundle:
  name: jorge-cv-rag

workspace:
  host: ${DATABRICKS_HOST}

targets:
  dev:
    mode: development
    default: true
  prod:
    mode: production

resources:
  jobs:
    ingestion_job:
      source: resources/ingestion_job.yml
```

### `resources/ingestion_job.yml`
```yaml
name: jorge-cv-ingestion
job_clusters:
  - job_cluster_key: ingestion_cluster
    new_cluster:
      spark_version: 15.4.x-scala2.12
      node_type_id: Standard_DS3_v2
      num_workers: 1
tasks:
  - task_key: ingest
    job_cluster_key: ingestion_cluster
    notebook_task:
      notebook_path: ../notebooks/1_ingestion
      base_parameters:
        file_path: ""        # injected at runtime
        full_reindex: "true" # "false" for additive
    timeout_seconds: 1800
```

---

## 11. Security Rules (non-negotiable)

- DATABRICKS_TOKEN never reaches frontend
- All Databricks calls via FastAPI only
- CORS: production domain + localhost in dev only
- Admin: bcrypt password hash, JWT 1h, 5 login attempts then 15min block per IP
- HTTPS in production always
- No secrets in code — only environment variables
- Timeout 30s on all Databricks calls

---

## 12. CI/CD

| Trigger | Pipeline | Action |
|---|---|---|
| Push to main, `/frontend` changed | `frontend.yml` | lint → typecheck → build → Vercel deploy |
| Push to main, `/backend` changed | `backend.yml` | ruff → pytest → Render deploy hook → /health check |
| Push to main, `/databricks` changed | `databricks.yml` | bundle validate → bundle deploy |
| PRs | all | lint + tests only, no deploy |

GitHub Secrets required: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `RENDER_DEPLOY_HOOK_URL`, `DATABRICKS_HOST`, `DATABRICKS_TOKEN`.

---

## 13. Environment Variables

### Backend `.env`
```
DATABRICKS_HOST=
DATABRICKS_TOKEN=
DATABRICKS_JOB_ID=
DATABRICKS_ENDPOINT_NAME=jorge_cv_endpoint
DATABRICKS_VOLUME_PATH=/Volumes/workspace/default/jorge_cv_docs
ADMIN_PASSWORD_HASH=          # bcrypt
JWT_SECRET=
ALLOWED_ORIGINS=https://ask-jorge.vercel.app,http://localhost:3000
MAX_TOKENS_INPUT=200
MAX_TOKENS_OUTPUT=500
RATE_LIMIT_PER_HOUR=20
RATE_LIMIT_PER_MINUTE=5
```

### Frontend `.env.local`
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 14. Skills Workflow for Implementation

1. `superpowers:writing-plans` — detailed implementation plan
2. `superpowers:test-driven-development` — for chat, guardrails, upload
3. `frontend-design` — production-grade component implementation
4. `shadcn-ui` — component selection and configuration
5. `react-components` — convert designs to clean components
6. `stitch-design` — screen design iteration if needed
7. `superpowers:verification-before-completion` — before any "done" claim

---

## 15. What This Project Does NOT Do

- Does not store conversations
- Does not authenticate users (only admin)
- Does not expose sensitive PII in responses
- Does not answer questions outside Jorge's profile scope
- Does not use frontend calls to Databricks directly
