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
      'Software and automation studio. We design and build custom software, automation, and practical AI tools that cut manual work, connect disconnected systems, and help teams run more efficiently.',
    tags: ['Custom software', 'Automation', 'AI tools'],
    href: 'https://flow-solutions.xyz',
    linkLabel: 'flow-solutions.xyz',
    logo: FlowSolutionsLogo,
  },
  {
    name: 'LeadOps',
    role: 'Lead Developer',
    description:
      'AI-powered lead qualification platform. Qualifies inbound leads in real time across WhatsApp, Instagram, Messenger, Discord, Telegram, and Gmail with natural AI conversations — built on a Go backend with real-time WebSocket infrastructure.',
    tags: ['Go', 'AI agents', 'Multi-channel', 'Real-time'],
    href: 'https://leadops.flow-solutions.xyz',
    linkLabel: 'leadops.flow-solutions.xyz',
    logo: LeadOpsLogo,
  },
  {
    name: 'Global Liquidity Research',
    role: 'Independent Researcher',
    description:
      'Published quantitative research showing global liquidity Granger-causes Bitcoin and Gold, built on VAR models and impulse response analysis. Engaged by 100+ institutional quants, CIOs, and prop traders on LinkedIn.',
    tags: ['Quant research', 'VAR models', 'Macro'],
    href: 'https://www.linkedin.com/in/ruben-lekli-qnt123/',
    linkLabel: 'Read on LinkedIn',
    logo: LiquidityLogo,
  },
  {
    name: 'Quantitative Investing System',
    role: 'Designer & Developer',
    description:
      'Live systematic strategies on digital assets with a multi-year track record, powered by a custom Python backtesting framework: walk-forward validation, multi-factor portfolio construction, and statistical bias correction across 189 unit tests.',
    tags: ['Python', 'Systematic trading', 'Portfolio construction'],
    logo: QuantLogo,
  },
  {
    name: 'Automated Data Pipeline & ML Classifier',
    role: 'Designer & Developer',
    description:
      'Multi-source data collection pipeline with a self-improving ML classifier trained on real decisions, running 24/7 as a three-service Docker stack on a hardened Linux VPS with a Telegram control bot.',
    tags: ['Python', 'Docker', 'Machine learning', 'Linux'],
    logo: PipelineLogo,
  },
]
