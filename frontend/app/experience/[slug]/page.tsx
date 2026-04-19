import { notFound } from 'next/navigation'
import { EXPERIENCE } from '@/lib/portfolio-data'
import { ExperienceDetailClient } from './ExperienceDetailClient'

export function generateStaticParams() {
  return EXPERIENCE.map((e) => ({ slug: e.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const entry = EXPERIENCE.find((e) => e.slug === params.slug)
  if (!entry) return {}
  return {
    title: `${entry.role} — Jorge Martínez Zapico`,
    description: entry.description.en,
  }
}

export default function ExperienceDetailPage({ params }: { params: { slug: string } }) {
  const entry = EXPERIENCE.find((e) => e.slug === params.slug)
  if (!entry) notFound()
  return <ExperienceDetailClient entry={entry} />
}
