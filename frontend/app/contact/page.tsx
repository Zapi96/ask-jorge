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
                href="mailto:jorge@askjorge.info"
                className="flex items-center gap-3 rounded-portfolio-xl border border-p-outline-var bg-p-surface px-4 py-3 font-inter text-sm text-p-primary transition-shadow hover:shadow-sm"
              >
                <span className="font-semibold">Direct Email</span>
                <span className="text-p-on-surface-var">jorge@askjorge.info</span>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    className="w-full resize-none rounded-portfolio-lg border border-p-outline-var bg-p-bg px-3 py-2 font-inter text-sm text-p-on-surface placeholder:text-p-outline focus:border-p-secondary focus:outline-none"
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
