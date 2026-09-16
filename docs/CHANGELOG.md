# Changelog

Newest first. Format: what / where / why.

## 2026-09-16 — Mobile performance, pacing rebalance, responsive sizing

Ruben: the site felt laggy overall on mobile, and the card flip / folder reveal were "too fast, not right pacing or sizes". Measured with a CPU-throttled (4x) headless Chrome trace scrolling the whole page at 390x844, comparing the previous build against this one over 5 runs each.

**Performance (total tracked main-thread render work per scroll-through: 1161ms -> 592ms, -49%. Rasterisation: 752ms -> 226ms, -70%.)**
- `Background.tsx`: the two glow orbs were solid discs behind `blur-[120px]` / `blur-[100px]` that also animated `scale`. A blurred surface is re-rasterised whenever it moves or scales, so these alone were ~50% of the page's render work (A/B: hiding them cut raster 581ms -> 150ms). Replaced with `radial-gradient` backgrounds and no filter: same soft glow, layer rasterises once and scroll only composites it. Boxes are ~2x bigger (110vh/90vh) because `blur()` used to spread them past their bounds, and they are now centre-anchored (`left/top 50%` + negative margins) with drifts expressed from the centre, so the glow lands exactly where it did before.
- `Background.tsx`: the parallax dot grid's edge fade was a `mask-image` **on the moving element**, which re-rasterised the whole grid every frame. It became the biggest remaining cost once the orbs were fixed (A/B: 530ms -> 396ms total, raster 229ms -> 76ms). The grid is now a plain repeating gradient and the fade is a static vignette div painted over it.
- `Background.tsx`: the wave SVG had `preserveAspectRatio="none"` against a 1440-wide viewBox, so on a phone it squashed into a steep scribble. Now `w-[max(100%,900px)]` centred, which keeps the curve's real slope (overflow is clipped by the parent).
- `Marquee.tsx`: dropped `backdrop-blur-sm` (re-samples everything behind a full-width strip each frame) for `bg-ink/85`. Indistinguishable on a dark background.
- `Projects.tsx`: removed the scroll-animated `filter: blur()` on the receding folder; it recedes on scale + opacity now.
- `HeroCard.tsx`: card shadow blur 80px -> 45px. It is all but invisible against #060606 but had to be re-rasterised through every frame of the 3D rotation.
- Investigated and ruled out: intermittent 3x raster spikes looked like they might come from the randomly generated wave path. Nine seeded runs showed path height varying 198px -> 624px with no cost difference (118-170ms), and the same spikes appeared in variants with no wave. It is measurement noise on the dev machine, not a site issue. Final build measures 589-615ms across 5 consecutive runs with no outliers.

**Pacing** — the scroll budgets were backwards: the hero flip (one rotation) got 1013px of scroll on mobile while the folder reveal (folder opens, six cards leave one by one, folder recedes) got 675px, less than a single thumb flick.
- Folder segment 180vh -> 245svh: the sequence now gets **1224px** on mobile (1.8x). Ghost stagger 0.11 -> 0.112, span 0.34 -> 0.33, folder fade 0.68-0.92 -> 0.70-0.94 so it holds until the last card (launching at 0.61) is clear, with settle room before the pin ends.
- Hero 260vh -> 220svh with the rotation window widened 0.05-0.8 -> 0.04-0.92. The old mapping left the last ~270px of the pin with nothing animating, which read as the page being stuck. Flip is now ~891px of scroll with zero dead time. (A first pass cut the hero to 190svh, which would have made the flip *faster* than before — the opposite of the complaint — so it was reverted to this.)
- Project cards: scrub window 42vh -> 58vh, and the deltas softened (y -110 -> -72, scale 0.72 -> 0.86, rotation +/-5 -> +/-3.5). Over the longer window the old deltas over-travelled and read as a lurch rather than a settle.
- Net page length on mobile: 11.8 -> **11.4** screens, so the slower reveal did not cost any extra scrolling.
- All scrub springs stiffened: hero 80/18 -> 200/32, folder 80/20 -> 170/28, project cards 90/20 -> 190/28, background 60/20 -> 90/26, all with `restDelta`. The old ~critically-damped-but-soft springs trailed the finger by roughly 0.45s, which reads as lag independently of frame rate. The background stays the softest on purpose (it should trail).

**Mobile frames and sizing**
- All pinned sections use `svh` (`h-[220svh]`, `h-svh`, `h-[245svh]`) instead of `vh`, so the mobile address bar showing/hiding cannot resize a pin mid-scroll. Verified no clipping at 360x640 and 375x667.
- About stat tiles: `p-8` -> `p-5 sm:p-8`, value `text-4xl` -> `text-3xl sm:text-4xl`, caption `text-sm` -> `text-xs sm:text-sm`. Long captions were wrapping to four lines and making the tiles very uneven.
- Project cards `p-6 sm:p-8`; long link labels (`leadops.flow-solutions.xyz`) dropped from `text-xs tracking-[0.2em]` to `text-[10px] tracking-[0.1em]` on mobile so they stay on one line instead of wrapping into the logo, arrow given `shrink-0`.
- References: card `p-6 sm:p-10 md:p-14`, quote `text-xl sm:text-2xl md:text-3xl`, and the decorative quote mark `text-[5rem]` on mobile (was `text-[10rem]`, which sat directly on top of the first line of the quote).
- Section padding `py-20 sm:py-28` on About / Projects / References; folder SVG `min(56vw,260px)` -> `min(62vw,280px)`; ghost cards `w-44 sm:w-52`.
- `sitePrompt.ts` updated to match: new scroll budgets, and a new "CRITICAL performance rules" block (never animate blur, never mask a moving element, avoid backdrop-filter on scrolled content, use stiff springs) so stolen copies do not inherit the same lag.

## 2026-07-16 — Build-time prerender + meta refresh
- SEO concern (SPA ships empty HTML): added `scripts/prerender.mjs` to the build chain — serves dist, renders in headless Chrome, scrolls to trigger all once-only reveals, injects ~40 kB of real HTML into `dist/index.html`. `main.tsx` now hydrates over it (falls back to createRoot in dev). Verified: Morioh/references/contact text present in raw HTML, page still interactive after hydration (one expected #418 mismatch warning on animated subtrees).
- Meta refreshed to current positioning (description mentions Morioh; og/twitter titles "AI Software Engineer · Quant Researcher"; JSON-LD gains knowsAbout + Morioh in sameAs) and `public/og.png` re-rendered with the current card titles/sub-line.
- Note: full SSR framework migration (Next/Astro) deliberately avoided — single-page site, prerender gives crawlers identical content at zero architectural cost.

## 2026-07-16 — Settled on the ghost-card interlude version
- After trying both measured-flight variants, Ruben picked the earlier stable version as final: pinned 180vh interlude where ghost file cards (logo + title) pop out of the centred folder one after another toward the viewer while the folder shrinks/blurs/fades, followed by the real grid cards scrubbing in (y:-110, scale 0.72, ±5°). Projects.tsx and sitePrompt restored to exactly that; measured-delta code removed.

## 2026-07-16 — Reverted pinned-folder sequential deal
- Ruben preferred the previous feel: Projects.tsx reverted to the measured-flight version (static folder in a 50vh block above the grid, real cards fly from it into their slots via per-card sprung useScroll + document-space deltas). The pinned centre-screen folder, strict one-by-one sequencing, and sequence-tied folder fade are gone; sitePrompt restored to match. Steal-button 2s hover kept (not card-related).

## 2026-07-16 — Sequential deal from a pinned folder
- Cards now leave the folder strictly one after another (sequence driven by global scrollY: per-card launch window `gridTop − 0.92vh + i·0.34vh`, span 0.95·step), not in row pairs.
- Folder pinned centre-screen for the whole reveal (sticky h-screen overlay with −100vh margin, z above the cards so they emerge from behind it), bigger (min(64vw,330px)); it shrinks, blurs, and fades in step with the CARD SEQUENCE (not section progress — section-length made it vanish before the last cards launched).
- Un-launched cards sit invisible at the folder's fixed viewport point: flight start tracks the folder in viewport space (`dy = vh/2 − (slotDocY − scrollY)`), so every card visibly exits the folder regardless of slot depth.
- Steal-button hover grow slowed again (2s).

## 2026-07-16 — Cards fly from folder straight into the grid
- Ghost mini-cards + pinned interlude removed (Ruben: titles flying out then cards appearing again read as duplication). Now the REAL project cards start collapsed (scale 0.12) at the folder's centre and scroll-scrub directly into their natural grid slots — one continuous motion.
- Implementation: folder sits in a ~50vh block above the grid (z above cards, so they emerge from behind it); `useLayoutEffect` measures the vector from each card's grid slot back to the folder centre via `getBoundingClientRect` (re-measured on resize; centres are transform-stable since translate/scale act around the card centre). Per-card sprung `useScroll` drives translate/scale/opacity.
- sitePrompt.ts updated to describe the measured-flight mechanic.

## 2026-07-14 — Hero quant sentence v4, softer button hover
- Hero second sentence now names the quant toolkit without metrics: "Approaching markets purely quantitatively, building tools for thorough backtesting, robustness testing, and multi-factor portfolio optimisation, where data makes the calls." (Ruben had set first sentence to "…modern pipelines operate on".)
- Steal-button hover grow slowed to 700ms with the site's signature cubic-bezier — reads as a breath, not a pop.

## 2026-07-14 — Folder pop-toward-viewer, hero copy v3, button hover
- Ghost cards no longer spread radially: they pop out of the folder sequentially (staggered starts ~0.11 apart) and fly toward the viewer — scale 0.22→1.9, slight rise + alternating x/rotation, fade out as they pass the screen. Folder lingers longer (fades 0.68→0.92) so late cards still visibly emerge from it.
- Folder SVG simplified: rounded back-with-tab + rounded front panel easing open via skew; peeking-card detail removed.
- Hero: "businesses run on" → "real work runs on"; colon dropped ("Applying the same standard to markets, with systematic strategies…").
- Steal-this-site button grows on hover (scale 1.03) so it reads as clickable.
- sitePrompt.ts updated to match the new interlude.

## 2026-07-14 — Big pinned folder reveal, intro/about v2, coloured AI glyphs
- Folder reveal rebuilt per Ruben's vision: 180vh pinned interlude, large folder (min(56vw,260px)) centered in viewport; scroll opens the flap, six ghost file cards (logo + name) fly outward to vw/vh spread targets while the folder scales down, blurs, and fades into the background; "Scroll to open" hint. Real grid + per-card scrub unchanged below. Verified mid-flight desktop + mobile.
- Hero intro v2 (not AI-only, stronger tie): "Building the platforms, web applications, and AI systems that businesses run on. Applying the same standard to markets: systematic strategies tested honestly, traded live, and judged by results."
- About P1 broadened: "full products, web applications, and platforms…".
- Steal-button glyphs now brand-coloured (Claude #D97757, GPT #10A37F, Gemini #4E86F5, Cursor white) — second sanctioned colour exception, noted in CLAUDE.md.
- sitePrompt.ts updated to describe the new folder interlude so stolen sites match.

## 2026-07-14 — Folder reveal, copy pass, "Steal this site" button
- Projects: cards now spill out of an SVG folder (flap opens in view) — each card scroll-scrubbed via its own sprung useScroll from y:-110/scale 0.72/±5° to its grid slot; reversible on scroll-up. Grid layout unchanged.
- Hero intro rewritten around common ground (FlowSolutions-style outcome language + quant as "same systems thinking"): "Building AI-powered platforms that win customers, move data, and automate the work teams should not be doing by hand…".
- About paragraphs rewritten image-first, less technical ("a week of manual work into a button", "with my own capital behind them", craft = "turn messy data into decisions you can trust").
- Marquee: dev/quant terms deliberately alternated; added SQL, Backtesting, Time-Series Analysis, Risk Management, Signal Processing; dropped Java, React, WebSockets, PyTorch (absorbed by Machine Learning).
- Tip jar replaced by "Steal this site" (`StealThisSite.tsx` + `src/data/sitePrompt.ts`): one click copies a ~5.6k-char self-contained prompt that rebuilds this design in Claude Code/Codex/Cursor (stack, tokens, all sections/animations, ScrollTimeline gotcha, non-technical run instructions, bracketed content placeholders). Clipboard write + copied-state verified headless; full generation test not yet run.
- Verification note: user's live Edge session blocks headless Edge (delegates and exits 0) — screenshot scripts now use puppeteer's bundled Chrome for Testing (`npx puppeteer browsers install chrome`).

## 2026-07-14 — Morioh copy pass + client speed-up stat
- Morioh card rewritten to match the other cards' register (was too spec-sheet): equities + digital assets (not just digital), role "Creator" → "Designer & Developer", grid/DSR jargon dropped for "institutional-grade validation built in to keep results honest".
- Stats: "24/7 live systems" tile → "80% typical speed-up measured on client workflows". Ruben reports 55–109% measured across FlowSolutions client projects (CRM/data-entry/reporting/AI integrations); 80% chosen as the credible mid-range, "typical … measured" wording keeps it defensible.

## 2026-07-14 — Morioh card, hash-free nav, stats
- New project card: Morioh Backtesting (`src/data/projects.tsx`) — public hosted backtesting platform (Python/FastAPI engine + job queue, React/ECharts front end, walk-forward + DSR); links moriohbacktests.rubenlekli.com, label "Try Morioh live" (raw URL kept off the card by request). 4×4 grid logo mirrors the L1×L2 weighting grid.
- Side nav scrolls via scrollIntoView with preventDefault — no more #intro etc. in the URL (`SideNav.tsx`). "Intro" label kept over "Contact": card flip delivers contact casually, per Ruben.
- Languages-in-production stat 5 → 7 (Python, Go, TypeScript, JavaScript, Java, SQL, Pine Script). "Time/money saved for clients" stat considered and rejected: unmeasurable, invites scepticism.
- Pipeline landing-page plan written to `d:\Projects\job-search\docs\PIPELINE_LANDING_PAGE_PLAN.md` (that repo's changelog updated too).

## 2026-07-13 — Security headers + project docs
- Added `public/_headers`: strict CSP (self-only + Cloudflare analytics domains), X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy. Static site needs nothing else code-side; dashboard toggles (HTTPS, HSTS, email obfuscation, DNSSEC) documented in DEPLOY.md discussion.
- Added `CLAUDE.md` (project context) and this changelog.

## 2026-07-13 — Availability + client CTA + analytics docs
- Card front bottom-right: pulsing green dot + "Available for work" (replaced "est. 2021"); card back: "Available for contract & full-time work" (replaced "Open to interesting problems"). Only colour on the site — deliberate.
- Projects section: one-line client CTA linking to flow-solutions.xyz/inquire for contract work.
- DEPLOY.md: Cloudflare Web Analytics setup section (automatic edge injection, no code).

## 2026-07-13 — SEO + tip copy + wave regimes
- OG/social preview: `public/og.png` (1200×630 render of the card front), OG + Twitter meta, canonical, JSON-LD Person schema, robots.txt, sitemap.xml. LinkedIn preview needs post-inspector re-scrape after deploy.
- Tip button: "Buy my AI tokens" + "…pays my AI bill. Yes, this is a tip jar haha." (Claude removed from name, joke made explicit). PayPal handle set to paypal.me/rubzl by Ruben.
- Background wave generator: alternating regimes — ~60% trending legs (mostly up) / ~40% mean-reversion to local mean; was pure random walk.
- Fixed "nteams" typo in card intro.

## 2026-07-13 — Card polish + simplification
- Sheen artifact fix: gloss clipped by card's rounded corners (`overflow-hidden`) and opacity-gated to mid-flip only; static card was showing an offset light slab.
- Removed "Proof, not promises" list (user: keep it simple).
- Signal wave background added: scroll-drawn equity-curve SVG path, 1.5px line + 7px halo, regenerated per page load.

## 2026-07-13 — Content round (titles, about, references carousel)
- Tab title → "Ruben Lekli".
- Card intro rewritten: no "I", no FlowSolutions; who/what/working-on/goal structure.
- About: FlowSolutions paragraph → day-to-day SE paragraph (parallel to quant paragraph); cut "ship fast without shipping sloppy" and the BEng sentence.
- References converted to carousel (crossfade, 9s auto-rotate, dots; activates at ≥2 quotes). Still one quote: Polina Vertex, Syntagma Labs reference letter.

## 2026-07-13 — Layout round (v3)
- Locations removed everywhere. "Portfolio" label → "Calling Card". Top nav removed entirely.
- Footer contact block removed → slim bar (© + social links incl. GitHub). Contact lives on card back.
- Side nav responsive: dots < lg, lines + labels ≥ lg (labels overlapped the card on tablets); card width 86vw on small screens.
- References section min-h-100svh so its anchor lands at viewport top.
- Tip button moved to About; favicon rebuilt to match card RL mark (gradient + border + serif RL).
- GitHub (ruben0262) added to card back + footer.

## 2026-07-13 — Redesign (v2): flip card, side nav, scroll background
- Hero → pinned 3D flip business card: front intro, back contact rows; scroll-driven rotation with spring, moving gloss sheen.
- Left side nav with IntersectionObserver scrollspy.
- Scroll-linked background: two glow orbs + parallax dot grid.
- Marquee rebuilt for seamless GPU loop (translate3d, identical halves); keywords swapped to industry terms (later edited by Ruben in place).
- About: AI-first tooling paragraph (Claude Code, Codex, Copilot); stats → 2021 / 24-7 / 10+ systems shipped / 5 languages in production.
- References section added (Polina Vertex quote). Ko-fi tip button (later switched to PayPal).
- Fixed: Motion promoting raw scroll-linked opacity to native ScrollTimeline that mismeasured the pinned section — derive from sprung value instead.

## 2026-07-13 — Initial build (v1)
- Scaffolded Vite + React + TS + Tailwind v4 + Motion in `d:\Projects\rubenlekli.com`.
- Single dark page: hero, skills marquee, about + stats, 5 project cards with inline SVG logos (FlowSolutions, LeadOps, Global Liquidity Research, Quantitative Investing System, Data Pipeline & ML Classifier), contact footer.
- Content sourced from `d:\Projects\job-search\CLAUDE.md` + local flow-solutions repo (live sites 403 automated fetches).
- Cloudflare Pages deploy via wrangler (`npm run deploy`), DEPLOY.md walkthrough, RL favicon.
