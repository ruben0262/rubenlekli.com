import FadeUp from './FadeUp'
import StealThisSite from './StealThisSite'

const facts = [
  { value: '2021', label: 'Building software since' },
  { value: '83.6%', label: 'Typical speed-up measured on client workflows' },
  { value: '10+', label: 'Production systems shipped' },
  { value: '7', label: 'Languages shipped to production' },
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
              I build, manage, and maintain the systems businesses run on: full
              products, web applications, platforms that talk to your customers while
              you sleep, pipelines that move data where it needs to be, and automation
              that turns a week of manual work into a button. I lead a small remote
              engineering team and stay close to the hard parts from the first
              architecture sketch to the moment the system is live and earning its keep.
            </p>
            <p>
              The same thinking runs my work in markets. I build my own quantitative
              research systems, use them to look for alpha, and put my own capital behind
              the ideas that survive. That means coming up with a thesis, taking it
              apart through backtesting, robustness testing, and optimization sequences,
              then asking whether it can survive real markets. Whether the problem is a
              sales funnel or a portfolio, the craft is the same: turn messy data into
              decisions you can trust, then automate the follow-through.
            </p>
            <p>
              I use AI tools such as Claude Code, Codex, and Copilot openly as part of
              my daily toolchain. I treat them like any other engineering tool: useful,
              powerful, and only as good as the review process around them.
            </p>

            <StealThisSite />
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
