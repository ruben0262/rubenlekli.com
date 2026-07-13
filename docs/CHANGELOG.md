# Changelog

Newest first. Format: what / where / why.

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
