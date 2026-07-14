# rubenlekli.com — Project Context

Personal portfolio / calling card for Ruben Lekli. Purpose: link shared on LinkedIn for recruiters, referrers, and freelance clients. Show off both the work and the web design itself.

## Stack
- Vite + React + TypeScript
- Tailwind CSS v4 (`@tailwindcss/vite` plugin, theme tokens in `src/index.css`: `ink` #060606, `paper` #f5f5f5, `mist` #9a9a9a)
- Motion (`motion/react`, framer-motion successor) for all animation
- Deployed to Cloudflare Pages via wrangler: `npm run deploy` (project name `rubenlekli`, domain rubenlekli.com on Cloudflare). Full instructions in `DEPLOY.md`.

## Page structure (single page, section ids drive the scrollspy side nav)
| Section | id | Component |
|---|---|---|
| 3D flip business card (pinned 260vh, rotates on scroll; front = intro, back = contact) | `intro` | `HeroCard.tsx` |
| Skills marquee (seamless CSS loop, two identical halves) | — | `Marquee.tsx` |
| About + stats + tip button | `about` | `About.tsx` |
| Project cards (data + inline SVG logos in `src/data/projects.tsx`) | `projects` | `Projects.tsx` |
| Reference quote carousel (auto-rotates when ≥2 entries) | `references` | `References.tsx` |
| Slim footer (© + social links only — no contact block by request) | — | `Footer.tsx` |

Cross-cutting: `Background.tsx` (scroll-linked signal wave with trend/mean-reversion regimes, glow orbs, parallax dot grid), `SideNav.tsx` (dots < lg, lines + labels ≥ lg), `FadeUp.tsx`, `useActiveSection.ts`.

## Design rules (from Ruben, do not violate)
- Black and white only; the single exception is the green "Available for work" pulse dot on the card.
- No em-dashes in site copy. No locations mentioned anywhere. Tab title is just "Ruben Lekli".
- Card front intro avoids "I" and does not name FlowSolutions; About section speaks day-to-day (SE paragraph parallel to quant paragraph).
- Keep it simple: proof lists / extra sections were tried and removed. Don't add complexity without being asked.
- Public site: never include private job-search details (see `d:\Projects\job-search\CLAUDE.md`, which is also the canonical source for bio facts).

## Known gotcha
Raw `useScroll` MotionValues get promoted to a native ScrollTimeline that mismeasures the pinned hero section. Route any scroll-linked style through `useSpring` (or derive from a sprung value) — see `hintOpacity` in `HeroCard.tsx`.

## Verification workflow
Screenshot-verify changes before calling them done: `npm run build`, `npx vite preview --port 4173`, then puppeteer-core + Edge (`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe` — plain Chrome is not installed). Capture desktop 1440×900, tablet 820×1180, mobile 390×844; scroll positions for card front/mid/back, about, references. Scripts from past sessions live in the session scratchpad (recreate as needed). Kill the preview server when done.

## SEO / meta
`index.html` carries OG + Twitter tags and JSON-LD Person schema. `public/og.png` (1200×630) is a render of the card front — regenerate from an HTML replica via headless Edge screenshot if the card design changes. `public/_headers` sets CSP and security headers (analytics beacon domains pre-allowed). `robots.txt` + `sitemap.xml` present.

## Open items / placeholders
- Second reference quote: carousel ready, waiting on a LinkedIn commenter quote (name + title + text) from Ruben.
- PayPal tip link: `paypal.me/rubzl` (set by Ruben — confirm it stays current).
- Cloudflare Web Analytics: enabled from the dashboard (automatic setup), not in code.
- Dashboard security toggles suggested: Always Use HTTPS, HSTS, Email Address Obfuscation, DNSSEC.
- Pipeline project card has no link yet — plan for a public landing page lives in `d:\Projects\job-search\docs\PIPELINE_LANDING_PAGE_PLAN.md`; card gets the href when that ships.
- Morioh card links `moriohbacktests.rubenlekli.com` (repo: `d:\Projects\backtesting_framework`); raw URL deliberately not shown on the card.

## Changelog rule
Every non-trivial change gets an entry in `docs/CHANGELOG.md` (what/where/why, newest first). Update the section table above if sections change.
