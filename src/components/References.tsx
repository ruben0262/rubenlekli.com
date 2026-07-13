import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import FadeUp from './FadeUp'

type Reference = {
  lead: string
  support?: string
  name: string
  initials: string
  role: string
}

/* Add new entries here and the carousel picks them up automatically. */
const references: Reference[] = [
  {
    lead:
      'Technical precision, creativity, and a sharp understanding of both blockchain data structures and financial principles.',
    support:
      'A genuine passion for applying data-driven insights to complex financial and blockchain systems, intellectual curiosity, and disciplined work ethic.',
    name: 'Polina Vertex',
    initials: 'PV',
    role: 'Co-founder, Syntagma Labs · reference letter, 2026',
  },
]

const ROTATE_MS = 9000

export default function References() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = references.length

  useEffect(() => {
    if (count < 2 || paused) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % count), ROTATE_MS)
    return () => clearInterval(timer)
  }, [count, paused])

  const reference = references[index]

  return (
    <section id="references" className="relative z-10 mx-auto min-h-[100svh] max-w-6xl px-6 py-28">
      <FadeUp>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">References</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="mb-14 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          What the people I have built for say.
        </h2>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-10 sm:p-14"
        >
          <span aria-hidden="true" className="absolute -top-6 left-8 font-serif text-[10rem] leading-none text-white/[0.06]">
            &ldquo;
          </span>

          <AnimatePresence mode="wait">
            <motion.figure
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <blockquote className="relative max-w-3xl">
                <p className="text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                  &ldquo;{reference.lead}&rdquo;
                </p>
                {reference.support && (
                  <p className="mt-6 leading-relaxed text-mist">&ldquo;{reference.support}&rdquo;</p>
                )}
              </blockquote>

              <figcaption className="relative mt-10 flex items-center gap-4">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-sm font-semibold">
                  {reference.initials}
                </span>
                <div>
                  <p className="font-medium">{reference.name}</p>
                  <p className="text-sm text-mist">{reference.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          {count > 1 && (
            <div className="mt-10 flex gap-2">
              {references.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show reference ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === index ? 'w-8 bg-paper' : 'w-3 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </FadeUp>
    </section>
  )
}
