export function Footer() {
  return (
    <footer className="portfolio border-t border-p-outline-var bg-p-bg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <p className="font-inter text-xs text-p-on-surface-var">
          © 2026 Jorge Martínez Zapico. Built for the future.
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
