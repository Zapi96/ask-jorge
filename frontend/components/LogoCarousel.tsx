'use client'


interface ImgLogo {
  type: 'img'
  src: string
  label: string
}
interface SiLogo {
  type: 'si'
  path: string
  label: string
}
interface TextLogo {
  type: 'text'
  label: string
  sub?: string
}
type Logo = ImgLogo | SiLogo | TextLogo

const LOGOS: Logo[] = [
  // ── Technologies ──────────────────────────────────────────────────────────
  { type: 'img',  src: '/logos/databricks.svg',              label: 'Databricks' },
  { type: 'img',  src: '/logos/azure.svg',             label: 'Azure' },

  // ── Companies ─────────────────────────────────────────────────────────────
  { type: 'img', src: '/logos/repsol.svg',            label: 'Repsol' },
  { type: 'img', src: '/logos/bluetab.svg',label: 'Bluetab, an IBM Company' },
  { type: 'img', src: '/logos/gmv.svg', label: 'GMV' },
  { type: 'img', src: '/logos/nommon.svg', label: 'Nommon' },

  // ── Space & Research agencies ─────────────────────────────────────────────
  { type: 'img',  src: '/logos/nasa.svg',              label: 'NASA' },
  { type: 'img',  src: '/logos/esa.svg',               label: 'ESA' },
  { type: 'img',  src: '/logos/dlr.svg',               label: 'DLR' },
  { type: 'img',  src: '/logos/euspa.svg',             label: 'EUSPA' },
  { type: 'img',  src: '/logos/aiaa.svg',              label: 'AIAA' },

  // ── European Commission ───────────────────────────────────────────────────
  { type: 'img',  src: '/logos/european-commission.svg', label: 'European Commission' },

  // ── Universities ──────────────────────────────────────────────────────────
  { type: 'img',  src: '/logos/upv.svg',               label: 'UPV' },
  { type: 'img',  src: '/logos/purdue.svg',            label: 'Purdue' },
  { type: 'img',  src: '/logos/wut.svg',               label: 'WUT' },
]

function LogoItem({ logo }: { logo: Logo }) {
  return (
    <div className="flex flex-col items-center justify-center gap-0.5 select-none px-1">
      {logo.type === 'img' ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo.src}
          alt={logo.label}
          className="h-5 sm:h-6 w-auto max-w-[80px] sm:max-w-[100px] object-contain"
          style={{ filter: 'grayscale(1) brightness(0.55) contrast(1.2)' }}
          loading="lazy"
          decoding="async"
        />
      ) : logo.type === 'si' ? (
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 shrink-0 sm:h-6 sm:w-6"
          aria-label={logo.label}
          role="img"
        >
          <path d={logo.path} />
        </svg>
      ) : (
        <span className="font-heading font-[700] text-[11px] sm:text-[13px] tracking-widest uppercase leading-none whitespace-nowrap">
          {logo.label}
        </span>
      )}
      {'sub' in logo && logo.sub && (
        <span className="font-mono text-[7px] sm:text-[8px] tracking-wider opacity-60 uppercase whitespace-nowrap">
          {logo.sub}
        </span>
      )}
    </div>
  )
}

export function LogoCarousel() {
  const doubled = [...LOGOS, ...LOGOS]

  return (
    <div
      className="w-full overflow-hidden"
      aria-label="Companies, universities and organisations"
      role="region"
    >
      <div className="relative">
        {/* fade edges */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 sm:w-16"
          style={{ background: 'linear-gradient(to right, var(--color-bg), transparent)' }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 sm:w-16"
          style={{ background: 'linear-gradient(to left, var(--color-bg), transparent)' }}
        />

        <div
          className="flex w-max items-center gap-8 sm:gap-12 text-text-muted opacity-50 hover:opacity-70 transition-opacity duration-300 py-1"
          style={{ animation: 'marquee 40s linear infinite' }}
        >
          {doubled.map((logo, i) => (
            <LogoItem key={i} logo={logo} />
          ))}
        </div>
      </div>
    </div>
  )
}
