import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'

const contactRows = [
  { label: 'Email', value: 'lekliruben@gmail.com', href: 'mailto:lekliruben@gmail.com' },
  { label: 'LinkedIn', value: 'in/ruben-lekli-qnt123', href: 'https://www.linkedin.com/in/ruben-lekli-qnt123/' },
  { label: 'GitHub', value: 'ruben0262', href: 'https://github.com/ruben0262' },
  { label: 'Instagram', value: '@ruben_zl', href: 'https://www.instagram.com/ruben_zl/' },
]

const cardFaceClass =
  'absolute inset-0 flex flex-col justify-between overflow-hidden rounded-3xl border border-white/15 p-8 sm:p-10 ' +
  '[backface-visibility:hidden] bg-[linear-gradient(145deg,#161616_0%,#0b0b0b_55%,#131313_100%)] ' +
  'shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]'

export default function HeroCard() {
  const containerRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 18 })

  const rotateY = useTransform(progress, [0.05, 0.8], [0, 180])
  const sheenX = useTransform(progress, [0, 1], ['-60%', '160%'])
  // Only visible mid-flip; at rest the light slab would sit awkwardly on the static card
  const sheenOpacity = useTransform(progress, [0.03, 0.15, 0.85, 0.95], [0, 1, 1, 0])
  // Derived from the sprung value: keeps the update on the JS path, since the
  // raw scroll value gets promoted to a native ScrollTimeline that mismeasures
  // this pinned section.
  const hintOpacity = useTransform(progress, [0.02, 0.12], [1, 0])

  return (
    <section ref={containerRef} id="intro" className="relative h-[260vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ perspective: 1400 }}
          className="w-[min(86vw,680px)]"
        >
          <motion.div
            style={{ rotateY, transformStyle: 'preserve-3d' }}
            className="relative aspect-[3/4] w-full sm:aspect-[8/5]"
          >
            {/* ── Front face ─────────────────────── */}
            <div className={cardFaceClass}>
              <div className="flex items-start justify-between">
                <span className="text-xs uppercase tracking-[0.35em] text-mist">Calling Card</span>
                <span className="font-serif text-lg tracking-tight text-paper/80">RL</span>
              </div>

              <div>
                <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-mist sm:text-xs">
                  AI Software Engineer · Full-Stack Developer · Quant Researcher
                </p>
                <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">Ruben Lekli</h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-mist sm:text-base">
                  Leading development teams that ship production AI and software platforms,
                  and working on the hard problems of quantitative finance: 
                  separating signal from noise, constructing portfolios, executing live.
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-mist">
                <span>rubenlekli.com</span>
                <span className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Available for work
                </span>
              </div>

              {/* Moving gloss sheen */}
              <motion.div
                aria-hidden="true"
                style={{ x: sheenX, opacity: sheenOpacity }}
                className="pointer-events-none absolute inset-y-0 w-1/3 rotate-[8deg] bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
              />
            </div>

            {/* ── Back face ──────────────────────── */}
            <div className={cardFaceClass} style={{ transform: 'rotateY(180deg)' }}>
              <div className="flex items-start justify-between">
                <span className="text-xs uppercase tracking-[0.35em] text-mist">Contact</span>
                <span className="font-serif text-lg tracking-tight text-paper/80">RL</span>
              </div>

              <ul className="space-y-3 sm:space-y-4">
                {contactRows.map((row) => (
                  <li key={row.label}>
                    <a
                      href={row.href}
                      target={row.href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noreferrer"
                      className="group flex items-baseline justify-between gap-4 border-b border-white/10 pb-2"
                    >
                      <span className="text-[11px] uppercase tracking-[0.25em] text-mist">
                        {row.label}
                      </span>
                      <span className="truncate text-sm text-paper/90 transition-colors group-hover:text-paper sm:text-base">
                        {row.value} ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between text-xs text-mist">
                <span>Available for contract &amp; full-time work</span>
                <span>rubenlekli.com</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="mt-10 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-mist"
        >
          Scroll to flip the card
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            aria-hidden="true"
          >
            ↓
          </motion.span>
        </motion.p>
      </div>
    </section>
  )
}
