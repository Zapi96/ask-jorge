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

export interface Highlight {
  label: string
  description: string
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

export const ABOUT_HIGHLIGHTS: Highlight[] = [
  { label: 'Top 5%', description: 'GPA at Purdue University (4.0/4.0)' },
  { label: 'Multilingual', description: 'Spanish (native) · English C1' },
  { label: 'Zürich 2026', description: 'Relocating August 2026' },
]
