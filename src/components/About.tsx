import FadeUp from './FadeUp'

const facts = [
  { value: '2021', label: 'Building software since' },
  { value: '24/7', label: 'Live systems in production' },
  { value: '10+', label: 'Production systems shipped' },
  { value: '5', label: 'Languages shipped to production' },
]

export default function About() {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-6xl px-6 py-28">
      <FadeUp>
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-mist">About</p>
      </FadeUp>

      <div className="grid gap-12 md:grid-cols-2">
        <FadeUp delay={0.1}>
          <h2 className="text-3xl font-semibold leading-snug tracking-tight sm:text-4xl">
            Engineering products by day, researching markets by night.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="space-y-5 leading-relaxed text-mist">
            <p>
              As a software engineer, I design and ship full-stack systems end to end:
              Go and TypeScript backends, real-time WebSocket infrastructure, REST and
              gRPC APIs, ML pipelines, and the React front ends on top. I lead a small
              remote engineering team, own architecture through deployment, and back it
              all with end-to-end test infrastructure.
            </p>
            <p>
              On the quant side, I design and run live systematic trading strategies on
              digital assets, backed by a custom backtesting framework, and publish
              macro research on global liquidity that has drawn engagement from
              institutional quants and CIOs. Previously a Quantitative Research Intern
              at Syntagma Labs, a Web3 &amp; AI advisory lab.
            </p>
            <p>
              I openly work with AI tools such as Claude Code, Codex, and Copilot which are part
              of my daily toolchain, driven with the same discipline as any other
              engineering tool, from architecture reviews to prompt evaluation pipelines.
            </p>

            <a
              href="https://paypal.me/rubzl"
              target="_blank"
              rel="noreferrer"
              className="group !mt-8 inline-flex items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-3.5 transition-colors hover:border-white/40"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                aria-hidden="true"
                className="shrink-0 text-paper"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7.5v9M9.5 9.5c0-1 1.1-1.7 2.5-1.7s2.5.7 2.5 1.7-1 1.4-2.5 1.7c-1.5.3-2.5.8-2.5 1.8s1.1 1.7 2.5 1.7 2.5-.7 2.5-1.7" />
              </svg>
              <span>
                <span className="block text-sm font-medium text-paper">Buy my AI tokens</span>
                <span className="block text-xs text-mist">
                  Like buying me a coffee, except it pays my AI bill. Yes, this is a tip jar haha.
                </span>
              </span>
              <span className="text-mist transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </a>
          </div>
        </FadeUp>
      </div>

      <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
        {facts.map((fact, i) => (
          <div key={fact.label} className="bg-ink p-8">
            <FadeUp delay={i * 0.08}>
              <p className="text-4xl font-semibold tracking-tight">{fact.value}</p>
              <p className="mt-3 text-sm text-mist">{fact.label}</p>
            </FadeUp>
          </div>
        ))}
      </div>

    </section>
  )
}
