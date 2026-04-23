import type { Metadata, Viewport } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Syne, Space_Grotesk, Manrope, Inter } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const BASE_URL = 'https://jorgezapico.dev'

export const viewport: Viewport = {
  themeColor: '#F9F9F9', // updated dynamically by ThemeColorSync on client
  viewportFit: 'cover',  // enables safe-area-inset-* on iOS notch/dynamic island
}

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Jorge Martínez Zapico — Senior MLOps & AI Engineer',
  description:
    'Senior MLOps & AI Engineer specialising in Databricks, Azure, LangChain, and RAG architectures. Ask anything about Jorge\'s background via the AI-powered assistant.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Jorge Martínez Zapico',
    title: 'Jorge Martínez Zapico — Senior MLOps & AI Engineer',
    description:
      'Senior MLOps & AI Engineer — Databricks, Azure, LangChain, RAG. Explore Jorge\'s full profile via an AI-powered assistant.',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Jorge Martínez Zapico — Senior MLOps & AI Engineer',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jorge Martínez Zapico — Senior MLOps & AI Engineer',
    description:
      'Senior MLOps & AI Engineer — Databricks, Azure, LangChain, RAG. Explore Jorge\'s full profile via an AI-powered assistant.',
    images: ['/og.svg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} ${syne.variable} ${spaceGrotesk.variable} ${manrope.variable} ${inter.variable} min-h-dvh bg-bg text-text-primary antialiased font-body`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
