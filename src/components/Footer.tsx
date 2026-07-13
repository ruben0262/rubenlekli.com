const socials = [
  { label: 'Email', href: 'mailto:lekliruben@gmail.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ruben-lekli-qnt123/' },
  { label: 'GitHub', href: 'https://github.com/ruben0262' },
  { label: 'Instagram', href: 'https://www.instagram.com/ruben_zl/' },
  { label: 'FlowSolutions', href: 'https://flow-solutions.xyz' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-6 py-10">
        <span className="text-xs text-mist">© {new Date().getFullYear()} Ruben Lekli</span>
        <ul className="flex flex-wrap gap-5 text-sm">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                className="text-mist transition-colors hover:text-paper"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
