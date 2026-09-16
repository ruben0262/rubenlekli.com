/* Deliberately alternates engineering and quant terms so neither reads as an afterthought. */
const skills = [
  'Python',
  'Machine Learning',
  'Go',
  'Portfolio Optimisation',
  'TypeScript',
  'Backtesting',
  'MongoDB',
  'SQL',
  'Prompt Engineering',
  'Time-Series Analysis',
  'AWS',
  'Risk Management',
  'Docker',
  'Stochastic Modelling',
  'Cloudflare',
  'Signal Processing',
  'Salesforce',
  'FastAPI',
]

/* One half of the loop — rendered twice so the -50% translate lands on an
   identical frame and the loop is seamless. */
function Half() {
  return (
    <div className="flex shrink-0 items-center">
      {skills.map((skill) => (
        <span
          key={skill}
          className="flex shrink-0 items-center whitespace-nowrap text-sm uppercase tracking-[0.25em] text-mist"
        >
          <span className="px-8">{skill}</span>
          <span className="text-white/30">·</span>
        </span>
      ))}
    </div>
  )
}

export default function Marquee() {
  return (
    <div className="relative z-10 overflow-hidden border-y border-white/10 bg-ink/85 py-5" aria-hidden="true">
      <div className="marquee-track flex w-max">
        <Half />
        <Half />
      </div>
    </div>
  )
}
