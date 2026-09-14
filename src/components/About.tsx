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
            Turning complex requirements into production systems.
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <div className="space-y-5 leading-relaxed text-mist">
            <p>
              Turning non-technical client requirements, messy product ideas, and real
              engineering constraints into production systems. Scope and priority decisions 
              happen early, and stay firm under pressure: what ships first, what gets cut, 
              and what risks breaking if the timeline shrinks. Most
              projects get built with clients, founders, or team leads who need
              AI-powered applications, workflow infrastructure, data pipelines,
              internal tools, new products, or optimizations to existing systems.
            </p>
            <p> 
              Quant dev is part of the same engineering work, with more finance, 
              mathematics, statistics, and optimization in the loop. In practice, that's building research,
              backtesting, portfolio, and robustness tooling to test market ideas
              properly, for client work and for strategies traded independently.
            </p>
            <p>
              AI tools are part of how the work gets done; mostly used for 
              speed and to sketch out scaffolding. Output correctness remains under careful 
              review, ensured by the test harness, the criteria, and a strong oracle, to spot
              any errors that may slip through. The work still has to be structured 
              clearly, reviewed properly, and maintained like any other production system.
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
