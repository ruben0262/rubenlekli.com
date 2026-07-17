import { useRef, useState } from 'react'
import { sitePrompt } from '../data/sitePrompt'

/* Nods to the assistants the prompt works in, tinted with their usual brand colours. */
const assistants = [
  { label: 'Claude', glyph: '✳', color: '#D97757' },
  { label: 'GPT', glyph: 'G', color: '#10A37F' },
  { label: 'Gemini', glyph: '✦', color: '#4E86F5' },
  { label: 'Cursor', glyph: '▶', color: '#F5F5F5' },
]

export default function StealThisSite() {
  const [copied, setCopied] = useState(false)
  const resetTimer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(sitePrompt)
      setCopied(true)
      clearTimeout(resetTimer.current)
      resetTimer.current = setTimeout(() => setCopied(false), 4000)
    } catch {
      // Clipboard blocked (rare): fall back to a prompt-sized alert-free select
      window.prompt('Copy the prompt below:', sitePrompt)
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      style={{ transition: 'transform 2s cubic-bezier(0.21, 0.47, 0.32, 0.98), border-color 2s ease' }}
      className="group !mt-8 flex w-full max-w-xl items-center gap-4 rounded-2xl border border-white/15 bg-white/[0.03] px-5 py-4 text-left hover:border-white/40"
    >
      <span className="flex shrink-0 -space-x-2.5" aria-hidden="true">
        {assistants.map((assistant) => (
          <span
            key={assistant.label}
            title={assistant.label}
            style={{ color: assistant.color }}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-[#111] text-sm shadow-[0_0_0_3px_#060606]"
          >
            {assistant.glyph}
          </span>
        ))}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-paper">
          {copied ? 'Copied. Paste it into Claude Code, Codex, or Cursor.' : 'Steal this site'}
        </span>
        <span className="block text-xs text-mist">
          {copied
            ? 'It will build you a site with this design, then you add your own story.'
            : 'One click copies the prompt behind this design. Free to use, runs in any AI coding tool.'}
        </span>
      </span>
      <span className="shrink-0 text-mist transition-transform group-hover:translate-x-1" aria-hidden="true">
        {copied ? '✓' : '⧉'}
      </span>
    </button>
  )
}
