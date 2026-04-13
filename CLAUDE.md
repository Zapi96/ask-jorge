# RAG CV Assistant — CLAUDE.md

## Contexto del propietario — LEER SIEMPRE
Los ficheros en `_context/` contienen el perfil real de Jorge:
- `_context/main.pdf` — CV completo (fuente de verdad para el contenido)
- `_context/personal.md` — datos de contacto y links

**Resumen del perfil** (para diseño, copy y system prompt):
- Nombre: Jorge Martínez Zapico
- Título: Senior MLOps & AI Engineer
- Certs destacadas: Azure Solutions Architect Expert, Databricks Certified ML Professional
- Empresa actual: Bluetab (IBM Company) — cliente Repsol (MLOps framework, self-service AI platform)
- También: Profesor Adjunto de ML en CEU San Pablo
- Background: Ingeniería Aeroespacial (UPV + Purdue, GPA 4.0) → Big Data (MITMA) → MLOps/AI
- Stack core: Databricks, Azure, LangChain, RAG, FastAPI, Python
- Idiomas: Español (nativo), Inglés C1
- Reubicación: Zürich, agosto 2026
- GitHub: @Zapi96 | LinkedIn: /in/jorge-martinez-zapico

Usar este perfil para:
- Copy de la UI (animación de entrada, título del asistente, suggested questions)
- System prompt del LLM en Databricks
- Decisiones de diseño (tono técnico/profesional, no corporativo genérico)
- Cualquier texto que represente a Jorge ante recruiters

## ¿Qué es este proyecto?
Asistente conversacional basado en RAG que permite a recruiters
hacer preguntas sobre el perfil profesional de Jorge Martínez Zapico.
El sistema recupera información relevante de sus documentos de CV
y responde usando LLMs de Databricks.

## Estructura del repositorio
ask-jorge/
├── frontend/      # Next.js + Tailwind + shadcn/ui (Vercel)
├── backend/       # FastAPI Python (Render)
├── databricks/    # Notebooks, Asset Bundles y Jobs
├── docs/          # Specs e implementation plans
└── .github/       # GitHub Actions CI/CD

## Stack tecnológico
- Frontend: Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion
- Backend: FastAPI, Python 3.11+
- RAG: Databricks Vector Search + Foundation Models
- Deploy: Vercel (frontend), Render (backend)
- CI/CD: GitHub Actions

## Comandos de desarrollo

### Frontend
cd frontend
npm install
npm run dev        # http://localhost:3000
npm run build      # build de producción
npm run lint       # eslint
npm run typecheck  # tsc --noEmit

### Backend
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload  # http://localhost:8000
pytest                     # tests

### Databricks
cd databricks
databricks bundle validate  # valida el bundle
databricks bundle deploy    # despliega al workspace

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

### Python (backend)
- Formatter: ruff format
- Linter: ruff check
- Types: siempre tipado con type hints
- Docstrings: en funciones públicas
- Tests: pytest, ficheros test_*.py

### TypeScript (frontend)
- Formatter: prettier
- Linter: eslint
- Types: siempre, nunca usar any
- Componentes: functional components con tipos explícitos

### Git
- Rama principal: main
- Ramas de feature: feature/nombre-descriptivo
- Commits en inglés, formato: tipo(scope): descripción
  Ejemplos:
  feat(chat): add warm-up ping on page load
  fix(guardrails): improve prompt injection detection
  docs(readme): add deployment instructions
  chore(ci): add backend workflow

## Arquitectura — flujos principales

### Flujo de chat (query)
1. Usuario escribe pregunta en el frontend
2. Frontend valida longitud básica y envía a FastAPI /chat
3. FastAPI aplica guardarraíles de input (regex + validación)
4. FastAPI llama al serving endpoint de Databricks
5. Databricks hace retrieval en Vector Search + genera respuesta
6. FastAPI aplica guardarraíles de output
7. Frontend muestra respuesta con animación de typing

### Flujo de ingesta (upload)
1. Admin sube fichero desde /admin
2. FastAPI recibe fichero y lo sube al Volume de Databricks
3. FastAPI lanza job efímero via Jobs API con file_path como parámetro
4. Job ejecuta notebook de ingesta (chunking + embeddings + upsert)
5. FastAPI hace polling y notifica al frontend el estado
6. Admin ve confirmación de éxito o error

### Warm-up
1. Usuario carga la página
2. Animación de intro arranca (Framer Motion, ~3-4 segundos)
3. En background, frontend llama a FastAPI /warmup
4. FastAPI hace ping al serving endpoint de Databricks
5. Cuando la animación termina, el endpoint ya está caliente

## Seguridad — reglas que nunca romper
- El token de Databricks NUNCA llega al frontend
- Todas las llamadas a Databricks pasan por FastAPI
- CORS solo permite el dominio de producción + localhost en dev
- Nunca hardcodear secrets en código, siempre variables de entorno
- El admin panel requiere JWT válido en cada petición
- Rate limiting activo siempre, incluso en desarrollo

## Databricks — notas importantes
- Los notebooks de referencia están en databricks/notebooks/
- NO asumir nombres de endpoints, clusters o paths
- Toda integración debe basarse en lo que existe en los notebooks
- El job de ingesta es efímero: usa job cluster, no all-purpose cluster
- El serving endpoint tiene autoscaling y puede estar frío:
  gestionar siempre con warm-up y mensajes de estado al usuario

## CI/CD
- Push a main con cambios en /frontend → deploy automático a Vercel
- Push a main con cambios en /backend → deploy automático a Render
- Push a main con cambios en /databricks → deploy bundle a Databricks
- Los PRs ejecutan lint + tests pero NO despliegan
- Secrets en GitHub Actions, nunca en los ficheros de workflow

## Lo que NO hace este proyecto
- No almacena conversaciones de usuarios
- No tiene autenticación de usuarios (solo admin)
- No expone datos personales sensibles en las respuestas
- No responde preguntas fuera del ámbito profesional
