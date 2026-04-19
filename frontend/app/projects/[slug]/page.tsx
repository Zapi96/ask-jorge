import { notFound } from 'next/navigation'
import { PROJECTS } from '@/lib/portfolio-data'
import { ProjectDetailClient } from './ProjectDetailClient'

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return {}
  return {
    title: `${project.title} — Jorge Martínez Zapico`,
    description: project.description.en,
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PROJECTS.find((p) => p.slug === params.slug)
  if (!project) notFound()
  return <ProjectDetailClient project={project} />
}
