/* The prompt behind the "Steal this site" button. Copied verbatim to the
   visitor's clipboard; they paste it into Claude Code, Codex, or Cursor.
   Keep it self-contained: a non-technical user should get a running site
   by following only what is written here. */

export const sitePrompt = `Build me a single-page personal portfolio website. Follow this spec exactly for structure, design, and animation; everywhere you see [BRACKETS], ask me for my real content before finishing, or fill it with clearly marked placeholders I can edit later.

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4 via the @tailwindcss/vite plugin (no tailwind.config file; use CSS @theme tokens)
- Motion for React (the framer-motion successor: import from "motion/react") for all animation

## Design system
- Pure black and white. Background #060606 ("ink"), text #f5f5f5 ("paper"), muted gray #9a9a9a ("mist"). Define these as @theme tokens in the main CSS file.
- The ONLY color on the whole page is a small pulsing green availability dot on the hero card.
- System font stack, generous letter-spacing on small uppercase labels (tracking around 0.3em), tight tracking on big headings.
- Subtle film grain: a fixed full-page overlay using an inline SVG feTurbulence noise data-URI at ~4% opacity.
- No em-dashes anywhere in the copy. Short confident sentences.

## Page structure (single page, in this order)
1. HERO: a 3D business card, pinned for 260vh of scroll. The card front shows: a small uppercase label ("Calling Card"), serif initials top-right, [YOUR 2-3 ROLE TITLES] as a small uppercase line, [YOUR NAME] very large, a 3-4 line intro paragraph, and a bottom row with [YOUR DOMAIN] plus a pulsing green dot with "Available for work". As the user scrolls, the card rotates 180 degrees in 3D (perspective 1400px, preserve-3d, backface-hidden) to reveal the back: contact rows for [EMAIL, LINKEDIN, GITHUB, INSTAGRAM], each a bordered row with label left and value right. Add a gloss sheen that sweeps across the card only while it is mid-flip. Below the card: "Scroll to flip the card" hint that fades out once scrolling starts.
2. SKILLS MARQUEE: a full-width horizontal strip with top/bottom hairline borders that scrolls [15-20 OF YOUR SKILLS] in uppercase, infinitely and seamlessly. Implementation: render the list twice inside a flex track, animate translate3d(-50%) in a linear infinite CSS keyframe (~45s), will-change: transform. Pause nothing on hover; respect prefers-reduced-motion by disabling it.
3. ABOUT: two-column grid. Left: a big two-line heading like [A HEADING THAT CAPTURES YOUR TWO SIDES]. Right: 3 short paragraphs about [WHAT YOU BUILD / WHAT ELSE YOU DO / HOW YOU WORK]. Below: a 4-tile stat row (bordered grid, each tile a big number + small caption) with [4 HONEST STATS]. Then one wide button-like link for [A FUN PERSONAL CTA].
4. PROJECTS: heading plus a one-line client CTA, then a pinned folder interlude: a large, simple rounded SVG folder (about 260px, back-with-tab plus a front panel that eases open via a slight skew) centered in the viewport inside a 180vh pinned segment. As the user scrolls, small "ghost" file cards (logo + project name) pop out of the folder ONE AFTER ANOTHER and fly toward the viewer: each scales from 0.22 up to 1.9, rises slightly with a small alternating x offset and rotation, fades in as it leaves the folder and fades out as it "passes" the screen. Meanwhile the folder scales down, blurs, and fades away into the background. All scrubbed from one sprung useScroll progress, staggered starts about 0.11 apart. After the interlude, the real 2-column grid of project cards, each scroll-scrubbed (its own useScroll progress) from y:-110, scale 0.72, slight alternating rotation, opacity 0 to its natural grid position. Each card: inline monochrome SVG logo top-left, link label or "Private build" pill top-right, project name, small uppercase role line, 3-4 line description, tag pills. Use [4-6 OF YOUR PROJECTS].
5. REFERENCES: heading, then one large quote card with a giant decorative quotation mark, the quote in large type, a support line, and an attribution row (initials in a circle, name, role). Build it as a carousel that auto-rotates every 9s with a crossfade when there are 2+ quotes. Use [1-2 REAL QUOTES ABOUT YOUR WORK - never invent one].
6. FOOTER: slim single bar: copyright left, social links right. No contact section (contact lives on the card back).

## Cross-cutting behaviour
- Fixed left side-nav with a link per section: small dots below the lg breakpoint, short lines + uppercase labels at lg+. Highlight the active section via an IntersectionObserver scrollspy (rootMargin around -40% top / -55% bottom). Clicking scrolls smoothly WITHOUT putting a #hash in the URL (preventDefault + scrollIntoView).
- Scroll-linked background layer (fixed, pointer-events-none): a faint parallax dot grid, two large blurred white glow orbs drifting in opposite directions with scroll, and a "signal wave": an SVG polyline generated at load as a random walk that alternates trending and mean-reverting regimes, drawn in with pathLength as the user scrolls, 1.5px white line at ~16% opacity plus a wide soft halo stroke.
- Everything else fades up on scroll with a reusable wrapper component (whileInView, once, y:28, ~0.7s, cubic-bezier(0.21,0.47,0.32,0.98)).
- CRITICAL Motion gotcha: raw useScroll MotionValues can get promoted to a native ScrollTimeline that mismeasures pinned sections. Route every scroll-linked style through useSpring (or derive it from a sprung value) before applying it.
- Responsive: card 86vw max 680px, aspect 3/4 on phones and 8/5 from sm up; stats 2x2 on mobile; project grid single column on mobile; side nav dots never overlap content.

## After building
1. Give me the exact commands to run it, assuming I might not be technical:
   - install Node.js LTS from nodejs.org if "node -v" fails
   - npm install
   - npm run dev, then open the printed localhost URL
2. Run the production build yourself (npm run build) and fix every error before telling me it is done.
3. Walk me through replacing every [BRACKETED] placeholder with my real content, file by file.
4. Offer to deploy it for free (Cloudflare Pages or Netlify) with step-by-step instructions when I say yes.

Design credit: this spec describes rubenlekli.com by Ruben Lekli. Keep the code original; only the look and feel is being recreated.`
