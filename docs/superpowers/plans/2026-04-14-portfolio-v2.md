# Portfolio V2 — Multi-Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the single-page RAG chatbot into a full multi-page portfolio with About, Experience, Certifications, and Contact pages, all using the new Stitch-designed Material Design 3 visual system.

**Architecture:** New shared `Navbar` + `Footer` components wrap all pages via layout. Four new Next.js App Router pages are added (`/about`, `/experience`, `/certifications`, `/contact`). The Home page is redesigned around the new hero+chat layout. A single new backend endpoint `POST /contact` handles contact form submissions. Profile/experience/certification data stays static in the frontend (no backend needed — it's Jorge's CV, not dynamic data).

**Tech Stack:** Next.js 14 App Router, Tailwind CSS, Framer Motion, lucide-react, FastAPI (Python), sendgrid or SMTP for contact email.

---

## Design System Reference

The Stitch designs use a **Material Design 3 light-first** palette. All new pages follow this:

| Token | Value | Role |
|---|---|---|
| `primary` | `#041627` | Hero text, nav brand, deep ink |
| `primary-container` | `#1A2B3C` | Dark hero backgrounds |
| `secondary` | `#006A6A` | Teal — action color, CTA buttons, active nav |
| `background` | `#F9F9F9` | Page canvas |
| `surface` | `#F9F9F9` | Card backgrounds |
| `surface-container` | `#EEEEEE` | Subtle card backgrounds |
| `on-surface` | `#1A1C1C` | Body text |
| `on-surface-variant` | `#44474C` | Secondary text |
| `outline` | `#74777D` | Borders, dividers |
| `outline-variant` | `#C4C6CD` | Subtle borders |

Fonts: `Manrope` (headlines, weights 400/600/700/800) + `Inter` (body/labels, weights 400/500/600).  
Border radius: nearly flat — `2px` default, `4px` lg, `8px` xl, `12px` full.

The existing dark/warm-gold theme (`globals.css`) is **kept as-is** for the chat interface (existing users). The new portfolio pages use the light Stitch palette via a separate CSS layer.

---

## File Map

### New files
- `frontend/app/about/page.tsx` — About page
- `frontend/app/experience/page.tsx` — Experience / Projects page
- `frontend/app/certifications/page.tsx` — Certifications page
- `frontend/app/contact/page.tsx` — Contact page (form)
- `frontend/components/portfolio/Navbar.tsx` — Shared nav (Home | About | Experience | Certifications | Contact | Let's Chat)
- `frontend/components/portfolio/Footer.tsx` — Shared footer (links + copyright)
- `frontend/components/portfolio/HeroSection.tsx` — Home hero with chat embed
- `frontend/lib/portfolio-data.ts` — Static CV data (projects, experience, certs)
- `backend/routers/contact.py` — `POST /contact` endpoint

### Modified files
- `frontend/app/globals.css` — Add portfolio CSS custom properties and Manrope/Inter imports
- `frontend/app/layout.tsx` — Add Manrope + Inter fonts, keep existing fonts
- `frontend/app/page.tsx` — Redesign to use new hero layout with chat
- `frontend/tailwind.config.ts` — Add portfolio color tokens and font families
- `backend/main.py` — Register contact router
- `backend/models/schemas.py` — Add `ContactRequest`, `ContactResponse`

---

## Task 1: Design tokens — globals.css + tailwind.config.ts

**Files:**
- Modify: `frontend/app/globals.css`
- Modify: `frontend/tailwind.config.ts`

- [ ] **Step 1: Add portfolio CSS custom properties to globals.css**

Append to `frontend/app/globals.css` after the existing scrollbar section:

```css
/* ── Portfolio pages (light Stitch palette) ────────────────────────────────── */
.portfolio {
  --p-bg:              #F9F9F9;
  --p-surface:         #EEEEEE;
  --p-surface-low:     #F4F3F3;
  --p-surface-high:    #E8E8E8;
  --p-surface-highest: #E2E2E2;
  --p-primary:         #041627;
  --p-primary-cont:    #1A2B3C;
  --p-secondary:       #006A6A;
  --p-secondary-cont:  #7BF2F2;
  --p-on-surface:      #1A1C1C;
  --p-on-surface-var:  #44474C;
  --p-outline:         #74777D;
  --p-outline-var:     #C4C6CD;
  --p-error:           #BA1A1A;
}
```

- [ ] **Step 2: Add portfolio Tailwind color tokens and font families**

Edit `frontend/tailwind.config.ts` theme.extend:

```ts
// Inside theme.extend.colors, add:
'p-bg':              'var(--p-bg)',
'p-surface':         'var(--p-surface)',
'p-surface-low':     'var(--p-surface-low)',
'p-surface-high':    'var(--p-surface-high)',
'p-surface-highest': 'var(--p-surface-highest)',
'p-primary':         'var(--p-primary)',
'p-primary-cont':    'var(--p-primary-cont)',
'p-secondary':       'var(--p-secondary)',
'p-secondary-cont':  'var(--p-secondary-cont)',
'p-on-surface':      'var(--p-on-surface)',
'p-on-surface-var':  'var(--p-on-surface-var)',
'p-outline':         'var(--p-outline)',
'p-outline-var':     'var(--p-outline-var)',
'p-error':           'var(--p-error)',

// Inside theme.extend.fontFamily, add:
'manrope': ['var(--font-manrope)', 'sans-serif'],
'inter':   ['var(--font-inter)', 'sans-serif'],

// Inside theme.extend.borderRadius, add:
'portfolio': '0.125rem',   // 2px — Stitch default
'portfolio-lg': '0.25rem', // 4px
'portfolio-xl': '0.5rem',  // 8px
'portfolio-full': '0.75rem', // 12px
```

- [ ] **Step 3: Add Manrope + Inter to layout.tsx**

```tsx
// Add to imports in frontend/app/layout.tsx:
import { Manrope, Inter } from 'next/font/google'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

// Add to body className:
// ${manrope.variable} ${inter.variable}
```

- [ ] **Step 4: Run typecheck to verify no breaks**

```bash
cd frontend && npm run typecheck
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add frontend/app/globals.css frontend/tailwind.config.ts frontend/app/layout.tsx
git commit -m "feat(design): add portfolio design tokens, Manrope+Inter fonts"
```

---

## Task 2: Static portfolio data

**Files:**
- Create: `frontend/lib/portfolio-data.ts`

- [ ] **Step 1: Create portfolio data file**

```ts
// frontend/lib/portfolio-data.ts

export interface Project {
  title: string
  description: string
  tags: string[]
  link?: string
}

export interface WorkEntry {
  role: string
  company: string
  period: string
  current?: boolean
}

export interface Certification {
  title: string
  issuer: string
  year: string
  featured?: boolean
}

export const PROJECTS: Project[] = [
  {
    title: 'Scalable MLOps Framework',
    description:
      'Architecting end-to-end machine learning pipelines with automated retraining, model governance, and self-service tooling for Repsol on Databricks.',
    tags: ['Databricks', 'Azure', 'MLflow', 'Python'],
  },
  {
    title: 'Systems Architecture',
    description:
      'Designed distributed data lakehouse architecture on Azure enabling real-time analytics for enterprise-scale petabyte workloads.',
    tags: ['Azure', 'Delta Lake', 'Spark', 'Architecture'],
  },
  {
    title: 'Purdue Legacy',
    description:
      'Computational fluid dynamics research at Purdue University School of Aeronautics — high-performance simulation pipelines for aerospace applications.',
    tags: ['Python', 'HPC', 'Research', 'Aerospace'],
  },
  {
    title: 'Pythonic Soul',
    description:
      'A framework for making data-driven decisions using ML models trained on real operational data. Efficient and domain-driven.',
    tags: ['Python', 'ML', 'FastAPI'],
  },
]

export const EXPERIENCE: WorkEntry[] = [
  { role: 'Senior MLOps Engineer', company: 'Bluetab (IBM Company)', period: '2022 – present', current: true },
  { role: 'Systems Architect', company: 'Freelance / Consulting', period: '2020 – 2022' },
  { role: 'Graduate Researcher', company: 'Purdue University', period: '2018 – 2020' },
]

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Azure Solutions Architect Expert',
    issuer: 'Microsoft',
    year: '2023',
    featured: true,
  },
  {
    title: 'Azure Administrator Associate',
    issuer: 'Microsoft',
    year: '2023',
  },
  {
    title: 'Databricks Certified Machine Learning Professional',
    issuer: 'Databricks',
    year: '2024',
    featured: true,
  },
  {
    title: 'Databricks Certified Machine Learning Associate',
    issuer: 'Databricks',
    year: '2023',
  },
  {
    title: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    year: '2024',
  },
  {
    title: 'Databricks Certified Associate Developer for Apache Spark 3.0',
    issuer: 'Databricks',
    year: '2024',
  },
  {
    title: 'Databricks Lakehouse Fundamentals',
    issuer: 'Databricks',
    year: '2024',
  },
]

export const ABOUT_HIGHLIGHTS = [
  { label: 'Top 5%', description: 'GPA at Purdue University (4.0/4.0)' },
  { label: 'Multilingual', description: 'Spanish (native) · English C1' },
  { label: 'Zürich 2026', description: 'Relocating August 2026' },
]
```

- [ ] **Step 2: Commit**

```bash
git add frontend/lib/portfolio-data.ts
git commit -m "feat(data): add static portfolio data (projects, experience, certs)"
```

---

## Task 3: Shared Navbar component

**Files:**
- Create: `frontend/components/portfolio/Navbar.tsx`

- [ ] **Step 1: Create Navbar**

```tsx
// frontend/components/portfolio/Navbar.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Experience', href: '/experience' },
  { label: 'Certifications', href: '/certifications' },
  { label: 'Contact', href: '/contact' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="portfolio sticky top-0 z-50 border-b border-p-outline-var bg-p-bg/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="font-manrope text-sm font-semibold text-p-primary">
          AI Assistant
        </Link>

        <ul className="flex items-center gap-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  'rounded-portfolio-lg px-3 py-1.5 font-inter text-sm transition-colors duration-150',
                  pathname === href
                    ? 'bg-p-secondary/10 font-semibold text-p-secondary'
                    : 'text-p-on-surface-var hover:text-p-on-surface'
                )}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/"
          className="rounded-portfolio-xl bg-p-secondary px-4 py-1.5 font-inter text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90"
        >
          Let&apos;s Chat
        </Link>
      </nav>
    </header>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/portfolio/Navbar.tsx
git commit -m "feat(ui): add portfolio Navbar component"
```

---

## Task 4: Shared Footer component

**Files:**
- Create: `frontend/components/portfolio/Footer.tsx`

- [ ] **Step 1: Create Footer**

```tsx
// frontend/components/portfolio/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="portfolio border-t border-p-outline-var bg-p-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <p className="font-inter text-xs text-p-on-surface-var">
          © 2024 Jorge Martínez Zapico. Built for the future.
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://www.linkedin.com/in/jorge-martinez-zapico"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs text-p-on-surface-var transition-colors hover:text-p-primary"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Zapi96"
            target="_blank"
            rel="noopener noreferrer"
            className="font-inter text-xs text-p-on-surface-var transition-colors hover:text-p-primary"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add frontend/components/portfolio/Footer.tsx
git commit -m "feat(ui): add portfolio Footer component"
```

---

## Task 5: About page

**Files:**
- Create: `frontend/app/about/page.tsx`

Reference screenshot: `.stitch/designs/about/screenshot.png` — headline "Architecting the Future.", three highlight stats on the left sidebar, long bio paragraphs, "International Mindset" section.

- [ ] **Step 1: Create About page**

```tsx
// frontend/app/about/page.tsx
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { ABOUT_HIGHLIGHTS } from '@/lib/portfolio-data'

export const metadata = {
  title: 'About — Jorge Martínez Zapico',
  description: 'Senior MLOps & AI Engineer. Background in Aerospace Engineering, Big Data, and AI systems.',
}

export default function AboutPage() {
  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 max-w-2xl">
          <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary">
            The Foundation
          </p>
          <h1 className="font-manrope text-5xl font-extrabold leading-tight text-p-primary md:text-6xl">
            Architecting
            <br />
            the Future.
          </h1>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[280px_1fr]">
          {/* Sidebar — highlights */}
          <aside className="space-y-6">
            {ABOUT_HIGHLIGHTS.map(({ label, description }) => (
              <div key={label} className="border-l-2 border-p-secondary pl-4">
                <p className="font-manrope text-2xl font-bold text-p-primary">{label}</p>
                <p className="mt-1 font-inter text-sm text-p-on-surface-var">{description}</p>
              </div>
            ))}
          </aside>

          {/* Main content */}
          <div className="space-y-8 font-inter text-base leading-relaxed text-p-on-surface">
            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                Academic Excellence & Primary Strategy
              </h2>
              <p className="text-p-on-surface-var">
                Jorge holds a degree in Aerospace Engineering from UPV (Valencia) and completed graduate studies at
                Purdue University (GPA 4.0/4.0) in the United States. This foundation in rigorous quantitative
                thinking — from fluid dynamics to orbital mechanics — shapes how he approaches every engineering
                challenge: with first-principles clarity.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                From Aerospace to AI
              </h2>
              <p className="text-p-on-surface-var">
                After completing a Master&apos;s in Big Data (MITMA, Madrid), Jorge pivoted into the rapidly
                evolving world of MLOps and enterprise AI. He is now a Senior MLOps Engineer at Bluetab (an IBM
                Company), where he leads the design and deployment of scalable ML infrastructure for Repsol&apos;s
                self-service AI platform on Databricks and Azure.
              </p>
              <p className="mt-4 text-p-on-surface-var">
                He holds the Azure Solutions Architect Expert and Databricks Certified ML Professional
                certifications — two of the most demanding credentials in cloud and AI engineering.
              </p>
            </section>

            <section>
              <h2 className="mb-3 font-manrope text-xl font-bold text-p-primary">
                International Mindset
              </h2>
              <p className="text-p-on-surface-var">
                Having studied and worked across Spain, the United States, and with international research
                organisations (ESA, DLR, NASA collaborations), Jorge brings a cross-cultural perspective to
                technical leadership. He speaks Spanish natively and English at C1 level, and is planning
                a relocation to Zürich in August 2026 to continue growing in the European AI ecosystem.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd frontend && npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/app/about/page.tsx
git commit -m "feat(pages): add About page"
```

---

## Task 6: Experience page

**Files:**
- Create: `frontend/app/experience/page.tsx`

Reference screenshot: `.stitch/designs/experience/screenshot.png` — "Selected Projects" header, featured project cards with image/dark background, smaller project cards, "Professional Trajectory" timeline at bottom.

- [ ] **Step 1: Create Experience page**

```tsx
// frontend/app/experience/page.tsx
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { PROJECTS, EXPERIENCE } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Experience — Jorge Martínez Zapico',
  description: 'Selected projects and professional trajectory of Jorge Martínez Zapico, Senior MLOps & AI Engineer.',
}

export default function ExperiencePage() {
  const [featured, ...rest] = PROJECTS

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
            Engineering Impact
          </p>
          <h1 className="font-manrope text-5xl font-extrabold text-p-primary">Selected Projects</h1>
          <p className="mt-4 max-w-xl font-inter text-base text-p-on-surface-var">
            From data strategy, data architecture and technical strategy, Jor&apos;s work synthesises a synthesis
            of scalable infrastructure and algorithmic efficiency.
          </p>
        </div>

        {/* Featured project — dark card */}
        <div className="mb-6 overflow-hidden rounded-portfolio-xl bg-p-primary-cont p-8 text-white">
          <p className="mb-1 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary-cont">
            Flagship Project
          </p>
          <h2 className="mb-3 font-manrope text-3xl font-bold">{featured.title}</h2>
          <p className="max-w-xl font-inter text-sm leading-relaxed text-white/70">{featured.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {featured.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-portfolio-full border border-white/20 px-3 py-1 font-inter text-xs text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Other projects grid */}
        <div className="mb-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((project) => (
            <div
              key={project.title}
              className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6 transition-shadow duration-150 hover:shadow-md"
            >
              <h3 className="mb-2 font-manrope text-lg font-bold text-p-primary">{project.title}</h3>
              <p className="mb-4 font-inter text-sm leading-relaxed text-p-on-surface-var">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-portfolio-full bg-p-surface-high px-2.5 py-0.5 font-inter text-xs text-p-on-surface-var"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Professional Trajectory */}
        <section>
          <h2 className="mb-8 font-manrope text-2xl font-bold text-p-primary">Professional Trajectory</h2>
          <div className="divide-y divide-p-outline-var">
            {EXPERIENCE.map((entry) => (
              <div key={entry.role} className="flex items-center justify-between py-5">
                <div>
                  <p className="font-manrope text-base font-bold text-p-primary">{entry.role}</p>
                  <p className="mt-0.5 font-inter text-sm text-p-on-surface-var">{entry.company}</p>
                </div>
                <span
                  className={`rounded-portfolio-full px-3 py-1 font-inter text-xs font-semibold ${
                    entry.current
                      ? 'bg-p-secondary/10 text-p-secondary'
                      : 'bg-p-surface-high text-p-on-surface-var'
                  }`}
                >
                  {entry.current ? 'Current' : entry.period}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd frontend && npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/app/experience/page.tsx
git commit -m "feat(pages): add Experience page with projects and trajectory"
```

---

## Task 7: Certifications page

**Files:**
- Create: `frontend/app/certifications/page.tsx`

Reference screenshot: `.stitch/designs/certifications/screenshot.png` — "Validated Expertise." headline, grid of certification cards, featured ones have dark background, `FULLY INITIALIZED & ACTIVE` status badge.

- [ ] **Step 1: Create Certifications page**

```tsx
// frontend/app/certifications/page.tsx
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { CERTIFICATIONS } from '@/lib/portfolio-data'

export const metadata = {
  title: 'Certifications — Jorge Martínez Zapico',
  description: 'Professional credentials: Azure Solutions Architect Expert, Databricks ML Professional, and more.',
}

export default function CertificationsPage() {
  const featured = CERTIFICATIONS.filter((c) => c.featured)
  const rest = CERTIFICATIONS.filter((c) => !c.featured)

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="mb-2 font-inter text-xs font-semibold uppercase tracking-widest text-p-on-surface-var">
              Professional Credentials
            </p>
            <h1 className="font-manrope text-5xl font-extrabold text-p-primary">
              Validated
              <br />
              Expertise.
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-portfolio-full border border-p-secondary/30 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-p-secondary" />
            <span className="font-inter text-xs font-semibold text-p-secondary">FULLY INITIALIZED &amp; ACTIVE</span>
          </div>
        </div>

        {/* Certifications grid */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Featured certs — dark cards */}
          {featured.map((cert) => (
            <div
              key={cert.title}
              className="rounded-portfolio-xl bg-p-primary-cont p-6 text-white"
            >
              <p className="mb-1 font-inter text-xs text-white/50">{cert.year}</p>
              <h3 className="mb-2 font-manrope text-base font-bold leading-snug">{cert.title}</h3>
              <p className="font-inter text-xs text-white/60">{cert.issuer}</p>
            </div>
          ))}

          {/* Regular certs — light cards */}
          {rest.map((cert) => (
            <div
              key={cert.title}
              className="rounded-portfolio-xl border border-p-outline-var bg-p-surface p-6"
            >
              <p className="mb-1 font-inter text-xs text-p-on-surface-var">{cert.year}</p>
              <h3 className="mb-2 font-manrope text-base font-bold leading-snug text-p-primary">{cert.title}</h3>
              <p className="font-inter text-xs text-p-on-surface-var">{cert.issuer}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd frontend && npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/app/certifications/page.tsx
git commit -m "feat(pages): add Certifications page"
```

---

## Task 8: Backend — Contact endpoint

**Files:**
- Modify: `backend/models/schemas.py`
- Create: `backend/routers/contact.py`
- Modify: `backend/main.py`

The contact form sends name, email, subject, message. The backend validates and returns success. Email delivery is **out of scope for this plan** — the endpoint returns 200 and logs the submission. A TODO comment marks where email delivery would go.

- [ ] **Step 1: Add schemas**

Add to `backend/models/schemas.py`:

```python
class ContactRequest(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=5, max_length=200, pattern=r'^[^@\s]+@[^@\s]+\.[^@\s]+$')
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    status: str  # "sent"
```

- [ ] **Step 2: Create contact router**

```python
# backend/routers/contact.py
import logging
from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from models.schemas import ContactRequest, ContactResponse

logger = logging.getLogger(__name__)
_limiter = Limiter(key_func=get_remote_address)
router = APIRouter()


@router.post("/contact", response_model=ContactResponse)
@_limiter.limit("3/hour")
async def contact(request: Request, body: ContactRequest) -> ContactResponse:
    """Receive a contact form submission.

    TODO: integrate email delivery (SendGrid / SMTP) here.
    """
    logger.info(
        "Contact form received | name=%s email=%s subject=%s",
        body.name,
        body.email,
        body.subject,
    )
    return ContactResponse(status="sent")
```

- [ ] **Step 3: Register router in main.py**

Add to `backend/main.py`:

```python
from routers import chat, upload, warmup, contact  # add contact

# After existing app.include_router lines:
app.include_router(contact.router)
```

- [ ] **Step 4: Write a test**

```python
# backend/tests/test_contact.py
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def _auth_headers():
    """Contact endpoint has no auth — this helper documents the absence."""
    return {}


def test_contact_valid():
    resp = client.post(
        "/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Hello",
            "message": "This is a test message with enough length.",
        },
    )
    assert resp.status_code == 200
    assert resp.json()["status"] == "sent"


def test_contact_invalid_email():
    resp = client.post(
        "/contact",
        json={
            "name": "Test User",
            "email": "not-an-email",
            "subject": "Hello",
            "message": "This is a test message with enough length.",
        },
    )
    assert resp.status_code == 422


def test_contact_message_too_short():
    resp = client.post(
        "/contact",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Hello",
            "message": "short",
        },
    )
    assert resp.status_code == 422
```

- [ ] **Step 5: Run tests**

```bash
cd backend && python -m pytest tests/test_contact.py -v
```

Expected: 3 tests PASS.

- [ ] **Step 6: Commit**

```bash
git add backend/routers/contact.py backend/models/schemas.py backend/main.py backend/tests/test_contact.py
git commit -m "feat(backend): add POST /contact endpoint with rate limiting and validation"
```

---

## Task 9: Contact page — frontend form

**Files:**
- Create: `frontend/app/contact/page.tsx`

Reference screenshot: `.stitch/designs/contact/screenshot.png` — "Initiate a Dialogue." headline, left column with direct email + LinkedIn links, right column with form (Name, Email, Subject, Message, Send button).

- [ ] **Step 1: Add contact API call to lib/api.ts**

Append to `frontend/lib/api.ts`:

```ts
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
```

- [ ] **Step 2: Create Contact page**

```tsx
// frontend/app/contact/page.tsx
'use client'
import { useState } from 'react'
import { Navbar } from '@/components/portfolio/Navbar'
import { Footer } from '@/components/portfolio/Footer'
import { submitContact, ContactPayload } from '@/lib/api'

const EMPTY: ContactPayload = { name: '', email: '', subject: '', message: '' }

export default function ContactPage() {
  const [form, setForm] = useState<ContactPayload>(EMPTY)
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('sending')
    try {
      await submitContact(form)
      setState('sent')
      setForm(EMPTY)
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.')
      setState('error')
    }
  }

  return (
    <div className="portfolio min-h-screen bg-p-bg">
      <Navbar />
      <main className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {/* Left column */}
          <div>
            <p className="mb-4 font-inter text-xs font-semibold uppercase tracking-widest text-p-secondary">
              Connect
            </p>
            <h1 className="font-manrope text-5xl font-extrabold leading-tight text-p-primary">
              Initiate a<br />
              <span className="text-p-secondary">Dialogue.</span>
            </h1>
            <p className="mt-6 max-w-sm font-inter text-base text-p-on-surface-var">
              Whether you&apos;re looking to discuss AI strategy, MLOps architecture, or just want to talk shop
              about the future of intelligence — I&apos;m listening.
            </p>
            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@digitalconcierge.ai"
                className="flex items-center gap-3 rounded-portfolio-xl border border-p-outline-var bg-p-surface px-4 py-3 font-inter text-sm text-p-primary transition-shadow hover:shadow-sm"
              >
                <span className="font-semibold">Direct Email</span>
                <span className="text-p-on-surface-var">hello@digitalconcierge.ai</span>
              </a>
              <a
                href="https://www.linkedin.com/in/jorge-martinez-zapico"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-portfolio-xl border border-p-outline-var bg-p-surface px-4 py-3 font-inter text-sm text-p-primary transition-shadow hover:shadow-sm"
              >
                <span className="font-semibold">Professional Network</span>
                <span className="text-p-on-surface-var">LinkedIn Profile</span>
              </a>
            </div>
          </div>

          {/* Right column — form */}
          <div className="rounded-portfolio-xl border border-p-outline-var bg-white p-8 shadow-sm">
            {state === 'sent' ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 py-12 text-center">
                <p className="font-manrope text-2xl font-bold text-p-primary">Message received.</p>
                <p className="font-inter text-sm text-p-on-surface-var">
                  Typically responds within 24 business hours.
                </p>
                <button
                  onClick={() => setState('idle')}
                  className="mt-4 font-inter text-sm text-p-secondary underline"
                >
                  Send another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block font-inter text-xs font-semibold uppercase tracking-wider text-p-on-surface-var">
                      Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full rounded-portfolio-lg border border-p-outline-var bg-p-bg px-3 py-2 font-inter text-sm text-p-on-surface placeholder:text-p-outline focus:border-p-secondary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block font-inter text-xs font-semibold uppercase tracking-wider text-p-on-surface-var">
                      Email
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-portfolio-lg border border-p-outline-var bg-p-bg px-3 py-2 font-inter text-sm text-p-on-surface placeholder:text-p-outline focus:border-p-secondary focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block font-inter text-xs font-semibold uppercase tracking-wider text-p-on-surface-var">
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                    placeholder="Project inquiry..."
                    className="w-full rounded-portfolio-lg border border-p-outline-var bg-p-bg px-3 py-2 font-inter text-sm text-p-on-surface placeholder:text-p-outline focus:border-p-secondary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block font-inter text-xs font-semibold uppercase tracking-wider text-p-on-surface-var">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder="Your ideas, questions here..."
                    className="w-full rounded-portfolio-lg border border-p-outline-var bg-p-bg px-3 py-2 font-inter text-sm text-p-on-surface placeholder:text-p-outline focus:border-p-secondary focus:outline-none resize-none"
                  />
                </div>
                {state === 'error' && (
                  <p className="font-inter text-xs text-p-error">{errorMsg}</p>
                )}
                <button
                  type="submit"
                  disabled={state === 'sending'}
                  className="flex w-full items-center justify-center gap-2 rounded-portfolio-lg bg-p-primary px-6 py-3 font-inter text-sm font-semibold text-white transition-opacity duration-150 hover:opacity-90 disabled:opacity-50"
                >
                  {state === 'sending' ? 'Sending…' : 'Send Transmission ›'}
                </button>
                <p className="text-center font-inter text-xs text-p-on-surface-var">
                  Typically responds within 24 business hours.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Run typecheck**

```bash
cd frontend && npm run typecheck
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add frontend/app/contact/page.tsx frontend/lib/api.ts
git commit -m "feat(pages): add Contact page with form and POST /contact integration"
```

---

## Task 10: Redesign Home page with portfolio nav

**Files:**
- Modify: `frontend/app/page.tsx`

The new Home page keeps the existing chat but wraps it in the portfolio layout. The Stitch design shows a hero with Jorge's name + tagline on the left, a status badge on the right, chat input in the center-bottom area, suggested questions as chips, and the logo carousel at the very bottom.

The existing `ChatInterface` component handles the chat state. We embed it below the hero. The `IntroAnimation` is kept as-is.

- [ ] **Step 1: Redesign page.tsx**

```tsx
// frontend/app/page.tsx
'use client'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { IntroAnimation } from '@/components/IntroAnimation'
import { ChatInterface } from '@/components/ChatInterface'
import { Navbar } from '@/components/portfolio/Navbar'
import { useWarmup } from '@/hooks/useWarmup'

export default function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const { status } = useWarmup()

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <IntroAnimation onComplete={() => setIntroDone(true)} warmupStatus={status} />
        )}
      </AnimatePresence>
      {introDone && (
        <div className="portfolio flex min-h-screen flex-col bg-p-bg">
          <Navbar />
          <ChatInterface warmupStatus={status} />
        </div>
      )}
    </>
  )
}
```

Note: `ChatInterface` renders its own header internally (the existing dark-themed header). After the nav is in place, the `ChatInterface`'s internal header can be hidden in a follow-up — for now, both coexist while we verify the layout works.

- [ ] **Step 2: Verify build**

```bash
cd frontend && npm run build
```

Expected: build succeeds with no errors. Ignore any "prerendering" warnings for client components.

- [ ] **Step 3: Commit**

```bash
git add frontend/app/page.tsx
git commit -m "feat(home): wrap home page with portfolio Navbar"
```

---

## Task 11: Final integration check

- [ ] **Step 1: Run full frontend typecheck + lint**

```bash
cd frontend && npm run typecheck && npm run lint
```

Expected: no errors, no warnings introduced by our changes.

- [ ] **Step 2: Run backend tests**

```bash
cd backend && python -m pytest tests/ -v
```

Expected: all existing tests + the 3 new contact tests PASS.

- [ ] **Step 3: Start dev server and manually verify each route**

```bash
cd frontend && npm run dev
```

Open in browser and check:
- `http://localhost:3000` — Intro animation plays, then Home with Navbar
- `http://localhost:3000/about` — About page with sidebar highlights
- `http://localhost:3000/experience` — Projects + trajectory
- `http://localhost:3000/certifications` — Certification grid
- `http://localhost:3000/contact` — Contact form (submit and verify "Message received" state)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: portfolio v2 — multi-page layout with About, Experience, Certifications, Contact"
```

---

## What's NOT in this plan (follow-up work)

- **Email delivery** for contact form (SendGrid/SMTP integration)
- **Hero redesign** on Home — the ChatInterface internal header still shows; a follow-up can consolidate the two into a single hero matching the Stitch "Home - New Chat State" design exactly
- **Loading/Hero animation screen** (Stitch screen #2 — the hero personalized loading) — failed to fetch from Stitch, revisit when service is available
- **Design System screen** (Stitch screen #1 — the design system stub) — not a page, reference only
- **Dark mode** for portfolio pages — current plan uses light-only Stitch palette
- **Image assets** for project cards (dark hero images in Experience page)
