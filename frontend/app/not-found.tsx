export default function NotFound() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4">
      <h1 className="font-display text-4xl font-bold text-accent">404</h1>
      <p className="text-text-secondary">Page not found.</p>
      <a href="/" className="text-accent underline underline-offset-4">
        Go back home
      </a>
    </main>
  )
}
