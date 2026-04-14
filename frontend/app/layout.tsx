import type { Metadata } from 'next'
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

const BASE_URL = 'https://askjorge.info'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Jorge — Senior MLOps & AI Engineer',
  description:
    'AI-powered assistant to explore Jorge Martínez Zapico\'s professional profile: MLOps, Databricks, Azure, LangChain, RAG, and more.',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    url: BASE_URL,
    siteName: 'Jorge',
    title: 'Jorge — Senior MLOps & AI Engineer',
    description:
      'Ask anything about Jorge\'s experience, skills, and background. Powered by a Databricks RAG pipeline.',
    images: [
      {
        url: '/og.svg',
        width: 1200,
        height: 630,
        alt: 'Jorge — Senior MLOps & AI Engineer',
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jorge — Senior MLOps & AI Engineer',
    description:
      'Ask anything about Jorge\'s experience, skills, and background. Powered by Databricks RAG.',
    images: ['/og.svg'],
  },
  icons: { icon: '/icon.svg' },
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
