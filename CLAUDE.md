# ask-jorge — CLAUDE.md

## Perfil — leer siempre
- Nombre: Jorge Martínez Zapico
- Título: Senior MLOps & AI Engineer
- Certs: Azure Solutions Architect Expert, Databricks Certified ML Professional
- Empresa actual: Bluetab (IBM Company) — cliente Repsol (MLOps framework, self-service AI platform)
- También: Profesor Adjunto de ML en CEU San Pablo
- Background: Ingeniería Aeroespacial (UPV + Purdue, GPA 4.0) → Big Data (MITMA) → MLOps/AI
- Stack core: Databricks, Azure, LangChain, RAG, FastAPI, Python
- Idiomas: Español (nativo), Inglés C1
- Ubicación: España | Abierto a reubicación internacional
- GitHub: @Zapi96 | LinkedIn: /in/jorge-martinez-zapico

## Fuentes de verdad (externas)
- Contexto profesional: `/Users/jorge/Developer/Personal/Projects-code/jorge-cv/_context/`
- Grafo: `/Users/jorge/Developer/Personal/Projects-code/jorge-cv/graphify-out/`

## Query protocol — antes de escribir cualquier copy sobre Jorge
1. `/graphify query "[pregunta]" --graph /Users/jorge/Developer/Personal/Projects-code/jorge-cv/graphify-out/graph.json`
2. `@/Users/jorge/Developer/Personal/Projects-code/jorge-cv/graphify-out/GRAPH_REPORT.md`
3. Leer `_context/` raw solo si el grafo no responde

Queries útiles:
- `/graphify query "What are Jorge's most central technical skills?"`
- `/graphify query "What connects Databricks across all roles?"`
- `/graphify query "What projects show leadership or impact?"`
- `/graphify query "What technologies bridge multiple domains?"`

No inventar métricas ni proyectos. Si falta info → STOP y preguntar.

## Skills — cargar según tarea

### Escritura / copy (siempre en tareas de texto)
`@/Users/jorge/.claude/skills/humanizer/SKILL.md`
Aplicar para: UI copy, suggested questions, mensajes de estado, system prompt LLM, cualquier texto visible al recruiter.

### Frontend
`@/Users/jorge/.claude/skills/react-components/SKILL.md`
Cargar cuando: componentes, hooks, páginas Next.js.

`@/Users/jorge/.claude/skills/shadcn-ui/SKILL.md`
Cargar cuando: cualquier componente shadcn/ui.

`@/Users/jorge/.claude/skills/stitch-design/SKILL.md`
Cargar cuando: design system, tokens, layout, consistencia visual.

### Backend
`@/Users/jorge/.claude/skills/python-data/SKILL.md`
Cargar cuando: endpoints FastAPI, modelos Pydantic, lógica backend.

### Seguridad
`@/Users/jorge/.claude/skills/owasp-security/SKILL.md`
Cargar cuando: JWT, rate limiting, CORS, guardarraíles, validación de inputs.

## Plugins activos (automáticos, no requieren carga manual)
- `ui-ux-pro-max` — diseño UI avanzado
- `frontend-design` — patrones Next.js / Tailwind
- `code-review` — validación antes de commits
- `vercel` / `vercel-plugin` — deploy y previews

## ¿Qué es este proyecto?
Asistente conversacional RAG que permite a recruiters hacer preguntas
sobre el perfil profesional de Jorge. Recupera información de sus documentos
de CV y responde usando LLMs de Databricks.

## Estructura
ask-jorge/
├── frontend/      # Next.js 14 + Tailwind + shadcn/ui (Vercel)
├── backend/       # FastAPI Python (Render)
├── databricks/    # Notebooks, Asset Bundles y Jobs
├── docs/          # Specs e implementation plans
└── .github/       # GitHub Actions CI/CD

## Stack
- Frontend: Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion
- Backend: FastAPI, Python 3.11+
- RAG: Databricks Vector Search + Foundation Models
- Deploy: Vercel (frontend), Render (backend)
- CI/CD: GitHub Actions

## Comandos

### Frontend
cd frontend && npm install && npm run dev   # http://localhost:3000

### Backend
cd backend && python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload   # http://localhost:8000
pytest

### Databricks
cd databricks
databricks bundle validate
databricks bundle deploy

## Variables de entorno

### Backend (.env)
DATABRICKS_HOST=
DATABRICKS_TOKEN=
DATABRICKS_JOB_ID=
DATABRICKS_ENDPOINT_URL=
DATABRICKS_VOLUME_PATH=
ADMIN_PASSWORD_HASH=
JWT_SECRET=
ALLOWED_ORIGINS=
MAX_TOKENS_INPUT=200
MAX_TOKENS_OUTPUT=500
RATE_LIMIT_PER_HOUR=20
RATE_LIMIT_PER_MINUTE=5

### Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000

## Convenciones de código

### Python
- ruff format + ruff check · type hints siempre · docstrings en públicas · pytest

### TypeScript
- prettier + eslint · nunca `any` · functional components tipados

### Git
- main · feature/nombre-descriptivo
- Commits en inglés: tipo(scope): descripción
  feat(chat): add warm-up ping on page load
  fix(guardrails): improve prompt injection detection

## Arquitectura

### Chat (query)
Usuario → frontend → FastAPI /chat → guardarraíles input
→ Databricks serving → Vector Search + LLM
→ guardarraíles output → frontend (typing animation)

### Ingesta (upload)
Admin → /admin → FastAPI → Volume → job efímero
→ notebook (chunking + embeddings + upsert) → polling → confirmación

### Warm-up
Page load → animación Framer Motion (~3-4s)
→ /warmup en background → ping Databricks → endpoint caliente

## Seguridad — nunca romper
- Token Databricks NUNCA al frontend
- Todas las llamadas a Databricks pasan por FastAPI
- CORS: solo dominio producción + localhost en dev
- Sin secrets hardcodeados, siempre variables de entorno
- Admin panel requiere JWT válido en cada petición
- Rate limiting activo siempre

## Databricks — notas
- Notebooks de referencia en `databricks/notebooks/`
- NO asumir nombres de endpoints, clusters o paths
- Job de ingesta es efímero (job cluster, no all-purpose)
- Serving endpoint puede estar frío → gestionar con warm-up

## CI/CD
- Push a main → deploy automático según carpeta modificada
  (Vercel / Render / Databricks bundle)
- PRs: lint + tests, sin deploy
- Secrets en GitHub Actions únicamente

## Fuera de scope
- No almacena conversaciones de usuarios
- No autenticación de usuarios (solo admin)
- No expone datos personales sensibles
- No responde fuera del ámbito profesional de Jorge