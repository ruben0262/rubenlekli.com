import { motion, useScroll, useSpring, useTransform } from 'motion/react'

/* Equity-curve style walk generated once per load, alternating between
   trending regimes (persistent directional drift, mostly up) and
   mean-reverting regimes (pull back toward the local mean). */
function generateWavePath(width = 1440, height = 900): string {
  const points: string[] = []
  let y = height * 0.8
  let trending = true
  let trendDir = -1 // negative y = up
  let regimeLeft = 0
  let localMean = y

  for (let x = 0; x <= width; x += 24) {
    if (regimeLeft <= 0) {
      trending = Math.random() < 0.6
      regimeLeft = 6 + Math.floor(Math.random() * 10)
      trendDir = Math.random() < 0.72 ? -1 : 1
      localMean = y
    }
    regimeLeft--

    const noise = (Math.random() - 0.5) * 34
    const drift = trending ? trendDir * 20 : (localMean - y) * 0.4
    y += drift + noise
    y = Math.min(height * 0.92, Math.max(height * 0.08, y))
    points.push(`${x},${y.toFixed(1)}`)
  }
  return 'M' + points.join(' L')
}

const wavePath = generateWavePath()

/**
 * Fixed full-viewport background that drifts with page scroll:
 * a signal wave that draws itself as you scroll, two glow orbs
 * moving in opposite directions, and a slow-parallax dot grid.
 */
export default function Background() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 60, damping: 20 })

  const orbAY = useTransform(progress, [0, 1], ['-10vh', '70vh'])
  const orbAX = useTransform(progress, [0, 1], ['-5vw', '30vw'])
  const orbBY = useTransform(progress, [0, 1], ['80vh', '-20vh'])
  const orbBX = useTransform(progress, [0, 1], ['60vw', '20vw'])
  const orbScale = useTransform(progress, [0, 0.5, 1], [1, 1.35, 0.9])
  const gridY = useTransform(progress, [0, 1], ['0%', '-12%'])

  // Wave draws in over the whole page; drifts up slightly as it goes.
  const wavePathLength = useTransform(progress, [0.02, 0.95], [0, 1])
  const waveY = useTransform(progress, [0, 1], ['6%', '-6%'])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Parallax dot grid */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        className="absolute inset-x-0 -top-[15%] h-[130%] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
      />

      {/* Signal wave — draws with scroll */}
      <motion.svg
        style={{ y: waveY }}
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        fill="none"
      >
        {/* Soft halo under the line */}
        <motion.path
          d={wavePath}
          stroke="rgba(255,255,255,0.05)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: wavePathLength }}
        />
        <motion.path
          d={wavePath}
          stroke="rgba(255,255,255,0.16)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ pathLength: wavePathLength }}
        />
      </motion.svg>

      {/* Glow orbs */}
      <motion.div
        style={{ x: orbAX, y: orbAY, scale: orbScale }}
        className="absolute h-[55vh] w-[55vh] rounded-full bg-white/[0.06] blur-[120px]"
      />
      <motion.div
        style={{ x: orbBX, y: orbBY, scale: orbScale }}
        className="absolute h-[45vh] w-[45vh] rounded-full bg-white/[0.045] blur-[100px]"
      />
    </div>
  )
}
