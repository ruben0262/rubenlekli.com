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
  const start = 0.08 + index * 0.11
  const end = start + 0.34
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
      className="absolute flex w-48 items-center gap-3 rounded-xl border border-white/15 bg-[#101010] p-3 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)]"
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
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 20 })

  const folderScale = useTransform(progress, [0, 0.92], [1, 0.6])
  const folderOpacity = useTransform(progress, [0.68, 0.92], [1, 0])
  const folderBlur = useTransform(progress, [0.55, 0.92], ['blur(0px)', 'blur(10px)'])
  const flapSkew = useTransform(progress, [0.03, 0.2], [0, -8])
  const hintOpacity = useTransform(progress, [0, 0.12], [1, 0])

  return (
    <div ref={ref} className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <motion.div style={{ scale: folderScale, opacity: folderOpacity, filter: folderBlur }}>
          <svg
            viewBox="0 0 120 92"
            className="w-[min(56vw,260px)]"
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
          className="absolute bottom-12 text-xs uppercase tracking-[0.3em] text-mist"
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
    offset: ['start 102%', 'start 60%'],
  })
  const reveal = useSpring(scrollYProgress, { stiffness: 90, damping: 20 })

  const y = useTransform(reveal, [0, 1], [-110, 0])
  const scale = useTransform(reveal, [0, 1], [0.72, 1])
  const rotate = useTransform(reveal, [0, 1], [index % 2 === 0 ? -5 : 5, 0])
  const opacity = useTransform(reveal, [0, 0.35], [0, 1])

  const isLink = Boolean(project.href)
  const Inner = isLink ? motion.a : motion.div

  return (
    <motion.div ref={ref} style={{ y, scale, rotate, opacity }}>
      <Inner
        {...(isLink ? { href: project.href, target: '_blank', rel: 'noreferrer' } : {})}
        whileHover={{ y: -6 }}
        className="group flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/30"
      >
        <div className="mb-6 flex items-start justify-between">
          <span className="text-paper/90">{project.logo}</span>
          {isLink ? (
            <span className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-mist transition-colors group-hover:text-paper">
              {project.linkLabel}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
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
    <section id="projects" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <FadeUp>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">Projects</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="mb-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Most of my work lives in private repos. Here is what you can see.
        </h2>
      </FadeUp>
      <FadeUp delay={0.15}>
        <p className="mb-10 max-w-2xl text-mist">
          Need something like this built for your business? I take on client work
          through FlowSolutions:{' '}
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
