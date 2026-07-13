import { motion } from 'motion/react'
import FadeUp from './FadeUp'
import { projects } from '../data/projects'
import type { Project } from '../data/projects'

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isLink = Boolean(project.href)
  const Wrapper = isLink ? motion.a : motion.div

  return (
    <Wrapper
      {...(isLink ? { href: project.href, target: '_blank', rel: 'noreferrer' } : {})}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: (index % 2) * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
      whileHover={{ y: -6 }}
      className="group flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-white/30"
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
    </Wrapper>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <FadeUp>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">Projects</p>
      </FadeUp>
      <FadeUp delay={0.1}>
        <h2 className="mb-6 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Most of my work lives in private repos. Here is what you can see.
        </h2>
      </FadeUp>
      <FadeUp delay={0.15}>
        <p className="mb-14 max-w-2xl text-mist">
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

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </section>
  )
}
