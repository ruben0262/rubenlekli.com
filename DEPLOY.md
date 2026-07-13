# Deploying rubenlekli.com

The site is a static Vite build deployed to **Cloudflare Pages** with the `wrangler` CLI (already installed as a dev dependency). The domain `rubenlekli.com` is managed in your Cloudflare account, so custom-domain setup is a few clicks.

## One-time setup

### 1. Log in to Cloudflare from wrangler

```powershell
npx wrangler login
```

A browser window opens; approve access for the Cloudflare account that holds `rubenlekli.com`.

### 2. Create the Pages project

```powershell
npx wrangler pages project create rubenlekli --production-branch=main
```

The project name `rubenlekli` matches the `deploy` script in `package.json`. This gives you a default URL like `rubenlekli.pages.dev`.

### 3. First deploy

```powershell
npm run deploy
```

This runs the production build (`tsc && vite build`) and uploads `dist/` to Cloudflare Pages. When it finishes it prints the live `*.pages.dev` URL. Open it and check the site.

### 4. Attach the custom domain

In the Cloudflare dashboard:

1. Go to **Workers & Pages → rubenlekli → Custom domains**.
2. Click **Set up a custom domain**, enter `rubenlekli.com`, confirm.
3. Repeat for `www.rubenlekli.com` if you want the `www` variant (recommended; Cloudflare redirects it).

Because the domain's DNS is already on Cloudflare, the CNAME records are created automatically and the domain activates within a couple of minutes, with SSL included.

> If `rubenlekli.com` currently has old A/AAAA/CNAME records pointing somewhere else, remove them in **DNS → Records** first, then add the custom domain.

## Every time you make changes

```powershell
npm run deploy
```

That is the whole workflow: it rebuilds and pushes the new version live. Deploys are atomic; the previous version stays up until the new one is ready.

Useful extras:

```powershell
npm run dev          # local dev server with hot reload (http://localhost:5173)
npm run preview      # serve the production build locally before deploying
npx wrangler pages deployment list --project-name=rubenlekli   # deploy history
```

## Analytics (Cloudflare Web Analytics)

Free, cookieless, no code change needed because rubenlekli.com is proxied through Cloudflare:

1. Cloudflare dashboard → **Analytics & Logs → Web Analytics**.
2. **Add a site**, enter `rubenlekli.com`.
3. Choose **automatic setup** (available because the DNS is orange-clouded). Cloudflare injects the measurement beacon at the edge; nothing to deploy.

If you prefer the manual snippet instead (or automatic is not offered), copy the JS snippet Cloudflare shows and paste its token here in chat; it goes into `index.html` as one script tag.

Dashboard shows visits, referrers (e.g. how many come from LinkedIn), countries, and page performance.

## Rollback

Every deploy is kept. In the dashboard under **Workers & Pages → rubenlekli → Deployments**, open an older deployment and click **Rollback to this deployment**.

## Where things live

| Thing | Location |
|---|---|
| Page content (bio, links) | `src/components/*.tsx` |
| Project cards + logos | `src/data/projects.tsx` |
| Colors, fonts, animations | `src/index.css` |
| Meta tags / page title | `index.html` |
