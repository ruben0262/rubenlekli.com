# rubenlekli.com

Personal portfolio landing page for Ruben Lekli. Black-and-white single page with scroll-triggered animations: hero, skills marquee, about, project cards (FlowSolutions, LeadOps, quant research, trading systems, data pipeline), and contact.

**Stack:** Vite · React · TypeScript · Tailwind CSS v4 · Motion (framer-motion successor)

## Commands

```powershell
npm install       # first time only
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build to dist/
npm run preview   # serve the production build locally
npm run deploy    # build + publish to Cloudflare Pages
```

Deployment and domain setup: see [DEPLOY.md](DEPLOY.md). Project context for Claude: [CLAUDE.md](CLAUDE.md). History: [docs/CHANGELOG.md](docs/CHANGELOG.md).

## Editing content

| What | Where |
|---|---|
| Project cards, descriptions, links, logos | `src/data/projects.tsx` |
| Flip card: name, titles, contact rows | `src/components/HeroCard.tsx` |
| About text and stat blocks | `src/components/About.tsx` |
| Reference quote (Syntagma Labs) | `src/components/References.tsx` |
| Email, socials, Ko-fi button, footer | `src/components/Footer.tsx` |
| Skills marquee items | `src/components/Marquee.tsx` |
| Section list (side nav + mobile nav) | `src/components/SideNav.tsx` |
| Scroll background (orbs, dot grid) | `src/components/Background.tsx` |
| Colors, grain, keyframes | `src/index.css` |
