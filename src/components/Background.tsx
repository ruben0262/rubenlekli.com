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

/* The orbs used to be solid discs behind `filter: blur(120px)`. A blurred
   surface has to be re-rasterised whenever it moves or scales, and these move
   AND scale on every scroll frame — that alone was ~50% of the page's total
   render work. A radial gradient paints the same soft glow as a plain
   background, so the layer rasterises once and the scroll only composites it.
   Sizes are ~2x the old boxes because blur() used to spread them well past
   their own bounds. */
const orbA =
  'radial-gradient(circle closest-side, rgba(255,255,255,0.075), rgba(255,255,255,0.05) 28%, ' +
  'rgba(255,255,255,0.018) 58%, rgba(255,255,255,0) 78%)'
const orbB =
  'radial-gradient(circle closest-side, rgba(255,255,255,0.055), rgba(255,255,255,0.036) 28%, ' +
  'rgba(255,255,255,0.013) 58%, rgba(255,255,255,0) 78%)'

/**
 * Fixed full-viewport background that drifts with page scroll:
 * a signal wave that draws itself as you scroll, two glow orbs
 * moving in opposite directions, and a slow-parallax dot grid.
 */
export default function Background() {
  const { scrollYProgress } = useScroll()
  // Deliberately the softest spring on the site: the background is meant to
  // trail the content rather than track the finger.
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 26, restDelta: 0.001 })

  // Orbs are laid out centred on the viewport (see the -55vh/-45vh margins
  // below), so these are drifts away from the centre. Values chosen to land the
  // glow centres exactly where the old corner-anchored boxes put them.
  const orbAX = useTransform(progress, [0, 1], ['-38vw', '-3vw'])
  const orbAY = useTransform(progress, [0, 1], ['-32vh', '47vh'])
  const orbBX = useTransform(progress, [0, 1], ['24vw', '-16vw'])
  const orbBY = useTransform(progress, [0, 1], ['52vh', '-47vh'])
  const orbScale = useTransform(progress, [0, 0.5, 1], [1, 1.35, 0.9])
  const gridY = useTransform(progress, [0, 1], ['0%', '-12%'])

  // Wave draws in over the whole page; drifts up slightly as it goes.
  const wavePathLength = useTransform(progress, [0.02, 0.95], [0, 1])
  const waveY = useTransform(progress, [0, 1], ['6%', '-6%'])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Parallax dot grid. The edge fade used to be a mask-image ON this
          element — masking a layer that moves every frame meant re-rasterising
          the whole grid on every frame (the single biggest paint cost left
          after the orbs). The fade is now a static vignette painted over the
          top instead, so the moving layer is a plain repeating gradient. */}
      <motion.div
        style={{
          y: gridY,
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        className="absolute inset-x-0 -top-[15%] h-[130%]"
      />
      <div
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 50% 40%, transparent 0%, var(--color-ink) 100%)',
        }}
        className="absolute inset-0"
      />

      {/* Signal wave — draws with scroll. The viewBox is 1440 wide, so on a
          phone `preserveAspectRatio="none"` squashed it into a steep scribble.
          Holding a 900px floor keeps the curve's real slope; the overflow is
          clipped by the parent. */}
      <motion.svg
        style={{ y: waveY }}
        className="absolute left-1/2 h-full w-[max(100%,900px)] -translate-x-1/2"
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
        style={{
          x: orbAX, y: orbAY, scale: orbScale, backgroundImage: orbA,
          left: '50%', top: '50%', marginLeft: '-55vh', marginTop: '-55vh',
        }}
        className="absolute h-[110vh] w-[110vh] rounded-full"
      />
      <motion.div
        style={{
          x: orbBX, y: orbBY, scale: orbScale, backgroundImage: orbB,
          left: '50%', top: '50%', marginLeft: '-45vh', marginTop: '-45vh',
        }}
        className="absolute h-[90vh] w-[90vh] rounded-full"
      />
    </div>
  )
}
