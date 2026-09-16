import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import FadeUp from './FadeUp'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

/* Small fixed offsets so consecutive cards don't overlap perfectly as they approach. */
const ghostOffsets = [
  { x: '-7vw', r: -5 },
  { x: '8vw', r: 4 },
  { x: '-9vw', r: -3 },
  { x: '7vw', r: 5 },
  { x: '-6vw', r: -4 },
  { x: '9vw', r: 3 },
]

/* Cards pop out of the folder one after another and fly TOWARD the viewer:
   scale up from folder-sized to larger than life, rising slightly, fading
   out as they "pass" the screen — like opening a folder full of files. */
function GhostCard({
  project,
  index,
  progress,
}: {
  project: Project
  index: number
  progress: MotionValue<number>
}) {
  const offset = ghostOffsets[index % ghostOffsets.length]
  const start = 0.05 + index * 0.112
  const end = start + 0.33
  const scale = useTransform(progress, [start, end], [0.22, 1.9])
  const y = useTransform(progress, [start, end], ['9vh', '-14vh'])
  const x = useTransform(progress, [start, end], ['0vw', offset.x])
  const rotate = useTransform(progress, [start, end], [0, offset.r])
  const opacity = useTransform(
    progress,
    [start, start + 0.08, end - 0.1, end],
    [0, 1, 1, 0],
  )

  return (
    <motion.div
      style={{ x, y, rotate, scale, opacity, zIndex: index + 1 }}
      className="absolute flex w-44 items-center gap-3 sm:w-52 rounded-xl border border-white/15 bg-[#101010] p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]"
      aria-hidden="true"
    >
      <span className="shrink-0 scale-75 text-paper/80">{project.logo}</span>
      <span className="truncate text-xs text-mist">{project.name}</span>
    </motion.div>
  )
}

/* Pinned interlude: a big folder in the middle of the screen. Scrolling opens it,
   the project files pop out toward the viewer, and the folder recedes into the
   background. */
function FolderReveal() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const progress = useSpring(scrollYProgress, { stiffness: 170, damping: 28, restDelta: 0.001 })

  // No filter: blur() here. Animating a blur forces the folder to be
  // re-rasterised on every scroll frame; scale + opacity alone composite for
  // free and read the same way (it recedes rather than defocuses).
  const folderScale = useTransform(progress, [0, 0.96], [1, 0.55])
  // Holds until the last card (which launches at 0.61) is well clear.
  const folderOpacity = useTransform(progress, [0.70, 0.94], [1, 0])
  const flapSkew = useTransform(progress, [0.02, 0.14], [0, -8])
  const hintOpacity = useTransform(progress, [0, 0.08], [1, 0])

  return (
    <div ref={ref} className="relative h-[245svh]">
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ scale: folderScale, opacity: folderOpacity }}>
          <svg
            viewBox="0 0 120 92"
            className="w-[min(62vw,280px)]"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <g className="text-mist">
              {/* Folder back with tab */}
              <path
                d="M12 30a6 6 0 0 1 6-6h26l8 8h50a6 6 0 0 1 6 6v40a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V30z"
                fill="#0b0b0b"
              />
              {/* Folder front, hinged at the bottom, eases open */}
              <motion.path
                d="M12 46a6 6 0 0 1 6-6h84a6 6 0 0 1 6 6v32a6 6 0 0 1-6 6H18a6 6 0 0 1-6-6V46z"
                fill="#151515"
                style={{ skewX: flapSkew, originX: '50%', originY: '92%' }}
              />
            </g>
          </svg>
        </motion.div>

        {/* Project files flying out of the folder */}
        {projects.map((project, i) => (
          <GhostCard key={project.name} project={project} index={i} progress={progress} />
        ))}

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute bottom-10 text-xs sm:bottom-12 uppercase tracking-[0.3em] text-mist"
        >
          Scroll to open
        </motion.p>
      </div>
    </div>
  )
}

/* Each card scrubs from "inside the folder" (small, tilted, lifted toward it)
   to its grid slot as it scrolls into view. Reversible — scroll back up and it returns. */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    // Was a 42vh window, which on a phone is ~350px — one flick and the card
    // had already snapped into place. 58vh gives the settle room to be seen.
    offset: ['start 100%', 'start 42%'],
  })
  const reveal = useSpring(scrollYProgress, { stiffness: 190, damping: 30, restDelta: 0.001 })

  // Gentler start values than before (-110/0.72/±5): over a longer window the
  // old deltas over-travelled and read as a lurch rather than a settle.
  const y = useTransform(reveal, [0, 1], [-72, 0])
  const scale = useTransform(reveal, [0, 1], [0.86, 1])
  const rotate = useTransform(reveal, [0, 1], [index % 2 === 0 ? -3.5 : 3.5, 0])
  const opacity = useTransform(reveal, [0, 0.3], [0, 1])

  const isLink = Boolean(project.href)
  const Inner = isLink ? motion.a : motion.div

  return (
    <motion.div ref={ref} style={{ y, scale, rotate, opacity }}>
      <Inner
        {...(isLink ? { href: project.href, target: '_blank', rel: 'noreferrer' } : {})}
        whileHover={{ y: -6 }}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/30 sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="text-paper/90">{project.logo}</span>
          {isLink ? (
            <span className="flex min-w-0 items-center gap-2 pl-3 text-right text-[10px] uppercase tracking-[0.1em] text-mist transition-colors group-hover:text-paper sm:text-xs sm:tracking-[0.2em]">
              <span className="min-w-0 break-words">{project.linkLabel}</span>
              <svg width="14" height="14" className="shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </span>
          ) : (
            <span className="rounded-full border border-white/15 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-mist">
              Private build
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-mist">{project.role}</p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-mist">{project.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-mist">
              {tag}
            </span>
          ))}
        </div>
      </Inner>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-20 sm:py-28">
      <FadeUp>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">Projects</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="mb-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Most production work lives in private repos. Here is what you can inspect.
        </h2>
      </FadeUp>
      <FadeUp delay={0.15}>
        <p className="mb-10 max-w-2xl text-mist">
          Need something like this built for your business? I take on client work
          through FlowSolutions{' '}
          <a
            href="https://flow-solutions.xyz/inquire"
            target="_blank"
            rel="noreferrer"
            className="text-paper underline underline-offset-4 transition-colors hover:text-mist"
          >
            tell us about your project
          </a>
          .
        </p>
      </FadeUp>

      <FolderReveal />

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
