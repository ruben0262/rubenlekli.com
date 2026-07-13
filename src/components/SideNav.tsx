import useActiveSection from '../hooks/useActiveSection'

export const sections = [
  { id: 'intro', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'references', label: 'References' },
]

const ids = sections.map((s) => s.id)

export default function SideNav() {
  const active = useActiveSection(ids)

  return (
    <nav
      aria-label="Sections"
      className="fixed left-2 top-1/2 z-40 -translate-y-1/2 sm:left-4 lg:left-6"
    >
      <ul className="space-y-5">
        {sections.map((section) => {
          const isActive = active === section.id
          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                className="group flex items-center gap-3 py-1"
                aria-current={isActive ? 'true' : undefined}
                aria-label={section.label}
              >
                {/* Below lg: dot indicator. lg+: line + label (labels would overlap the card on tablets). */}
                <span
                  className={`block h-1.5 w-1.5 rounded-full transition-all duration-300 lg:hidden ${
                    isActive ? 'scale-125 bg-paper' : 'bg-white/25 group-hover:bg-white/50'
                  }`}
                />
                <span
                  className={`hidden h-px transition-all duration-300 lg:block ${
                    isActive ? 'w-10 bg-paper' : 'w-5 bg-white/25 group-hover:w-8 group-hover:bg-white/50'
                  }`}
                />
                <span
                  className={`hidden text-[11px] uppercase tracking-[0.25em] transition-colors duration-300 lg:block ${
                    isActive ? 'text-paper' : 'text-mist/60 group-hover:text-mist'
                  }`}
                >
                  {section.label}
                </span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
