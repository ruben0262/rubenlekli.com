/**
 * Build-time prerender: serves the built dist/, renders the page in headless
 * Chrome, scrolls through it so every whileInView section reaches its visible
 * state, and writes the resulting HTML into dist/index.html. Crawlers get the
 * full page content; the client bundle hydrates on top of it in the browser.
 *
 * Runs as part of `npm run build` (and therefore `npm run deploy`).
 */
import { preview } from 'vite'
import puppeteer from 'puppeteer'
import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'

const PORT = 4177
const server = await preview({ preview: { port: PORT, strictPort: true } })

try {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: { width: 1440, height: 900 },
  })
  const page = await browser.newPage()
  await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 1500))

  // Trigger every once-only in-view animation so the snapshot holds final,
  // visible content instead of opacity-0 initial states.
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 120))
    }
    window.scrollTo(0, 0)
  })
  await new Promise((r) => setTimeout(r, 1500))

  const rootHtml = await page.evaluate(() => document.getElementById('root').innerHTML)
  await browser.close()

  if (!rootHtml || rootHtml.length < 5000) {
    throw new Error(`Prerender produced suspiciously little HTML (${rootHtml?.length ?? 0} chars)`)
  }

  const indexPath = path.resolve('dist', 'index.html')
  const template = await readFile(indexPath, 'utf8')
  const marker = '<div id="root"></div>'
  if (!template.includes(marker)) {
    throw new Error('dist/index.html does not contain the empty #root marker')
  }
  await writeFile(indexPath, template.replace(marker, `<div id="root">${rootHtml}</div>`), 'utf8')
  console.log(`Prerender OK: injected ${(rootHtml.length / 1024).toFixed(1)} kB of static HTML into dist/index.html`)
} finally {
  await server.close()
}
