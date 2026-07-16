import type { ReactNode } from 'react'

export type Project = {
  name: string
  role: string
  description: string
  tags: string[]
  href?: string
  linkLabel?: string
  logo: ReactNode
}

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const

const FlowSolutionsLogo = (
  <svg viewBox="0 0 48 48" width="40" height="40" {...stroke} aria-hidden="true">
    <path d="M6 15c8-6 14 6 22 0s8-6 14-2" />
    <path d="M6 25c8-6 14 6 22 0s8-6 14-2" />
    <path d="M6 35c8-6 14 6 22 0s8-6 14-2" />
  </svg>
)

const LeadOpsLogo = (
  <svg viewBox="0 0 48 48" width="40" height="40" {...stroke} aria-hidden="true">
    <path d="M8 10h32L28 26v12l-8 4V26L8 10z" />
    <circle cx="24" cy="17" r="2.2" fill="currentColor" stroke="none" />
  </svg>
)

const MoriohLogo = (
  <svg viewBox="0 0 48 48" width="40" height="40" {...stroke} aria-hidden="true">
    <rect x="7" y="7" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" opacity="0.9" />
    <rect x="19.5" y="7" width="9" height="9" rx="1.5" />
    <rect x="32" y="7" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" opacity="0.35" />
    <rect x="7" y="19.5" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" opacity="0.5" />
    <rect x="19.5" y="19.5" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" opacity="0.9" />
    <rect x="32" y="19.5" width="9" height="9" rx="1.5" />
    <rect x="7" y="32" width="9" height="9" rx="1.5" />
    <rect x="19.5" y="32" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" opacity="0.35" />
    <rect x="32" y="32" width="9" height="9" rx="1.5" fill="currentColor" stroke="none" opacity="0.7" />
  </svg>
)

const LiquidityLogo = (
  <svg viewBox="0 0 48 48" width="40" height="40" {...stroke} aria-hidden="true">
    <path d="M6 38l10-12 8 6 12-18" />
    <circle cx="36" cy="14" r="3" />
    <path d="M6 44h36" />
  </svg>
)

const QuantLogo = (
  <svg viewBox="0 0 48 48" width="40" height="40" {...stroke} aria-hidden="true">
    <path d="M12 14v20M12 20h-4v8h4v-8h4v8h-4" />
    <path d="M26 8v28M26 14h-4v12h4V14h4v12h-4" />
    <path d="M40 20v20M40 26h-4v8h4v-8h4v8h-4" />
  </svg>
)

const PipelineLogo = (
  <svg viewBox="0 0 48 48" width="40" height="40" {...stroke} aria-hidden="true">
    <circle cx="10" cy="12" r="4" />
    <circle cx="38" cy="12" r="4" />
    <circle cx="24" cy="26" r="4" />
    <circle cx="24" cy="42" r="0.5" fill="currentColor" />
    <path d="M13 15l8 8M35 15l-8 8M24 30v9" />
  </svg>
)

export const projects: Project[] = [
  {
    name: 'FlowSolutions',
    role: 'Founder & Lead Developer',
    description:
      'Software and automation studio for teams with messy operations. We build custom apps, automations, and practical AI tools that remove manual work, connect the systems already in use, and make day-to-day work less fragile.',
    tags: ['Custom software', 'Automation', 'AI tools'],
    href: 'https://flow-solutions.xyz',
    linkLabel: 'flow-solutions.xyz',
    logo: FlowSolutionsLogo,
  },
  {
    name: 'LeadOps',
    role: 'Lead Developer',
    description:
      'Lead qualification system for businesses that get messages from everywhere. It handles inbound conversations across WhatsApp, Instagram, Messenger, Discord, Telegram, and Gmail, then keeps the sales team updated in real time from a Go backend.',
    tags: ['Go', 'AI agents', 'Multi-channel', 'Real-time'],
    href: 'https://leadops.flow-solutions.xyz',
    linkLabel: 'leadops.flow-solutions.xyz',
    logo: LeadOpsLogo,
  },
  {
    name: 'Morioh Backtesting',
    role: 'Designer & Developer',
    description:
      'Free public backtesting platform for equities and digital assets. Test a single strategy, combine factors into a portfolio, and inspect the result with charts and validation checks that make overfitting harder to hide. Python engine, React front end, open for anyone to use.',
    tags: ['Python', 'FastAPI', 'React', 'Quant tooling'],
    href: 'https://moriohbacktests.rubenlekli.com',
    linkLabel: 'Try Morioh live',
    logo: MoriohLogo,
  },
  {
    name: 'Global Liquidity Research',
    role: 'Independent Researcher',
    description:
      'Published quantitative research on the relationship between global liquidity, Bitcoin, and Gold using VAR models, Granger causality, and impulse response analysis. The work drew responses from institutional quants, CIOs, and prop traders on LinkedIn.',
    tags: ['Quant research', 'VAR models', 'Macro'],
    href: 'https://www.linkedin.com/in/ruben-lekli-qnt123/',
    linkLabel: 'Read on LinkedIn',
    logo: LiquidityLogo,
  },
  {
    name: 'Quantitative Investing System',
    role: 'Designer & Developer',
    description:
      'My private research and execution stack for digital-asset strategies. It starts with alpha ideas, runs them through a custom Python backtester, walk-forward validation, portfolio construction, and bias checks, then tracks what is strong enough to trade live.',
    tags: ['Python', 'Systematic trading', 'Portfolio construction'],
    logo: QuantLogo,
  },
  {
    name: 'Automated Data Pipeline & ML Classifier',
    role: 'Designer & Developer',
    description:
      'Data pipeline that collects from multiple sources, classifies new items from past decisions, and keeps running without babysitting. It runs as a three-service Docker stack on a hardened Linux VPS, with a Telegram bot for control and alerts.',
    tags: ['Python', 'Docker', 'Machine learning', 'Linux'],
    logo: PipelineLogo,
  },
]
