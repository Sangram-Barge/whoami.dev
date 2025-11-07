import React, { useState, useRef, useEffect } from 'react'

const initialLines = [
  { type: 'output', text: 'Welcome to whoami.dev — press Enter to start typing.' },
  { type: 'output', text: "Type 'help' to see commands." }
]

export default function Terminal() {
  const [lines, setLines] = useState(initialLines)
  const [input, setInput] = useState('')
  const inputRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  function handleCommand(cmdRaw) {
    const cmd = cmdRaw.trim()
    if (!cmd) return
    const parts = cmd.split(/\s+/)
    const base = parts[0].toLowerCase()

    setLines(prev => [...prev, { type: 'input', text: cmd }])

    if (base === 'help') {
      setTimeout(() => setLines(prev => [...prev, { type: 'output', text: "Available commands: about, projects, contact, clear, resume" }]), 200)
      return
    }

    if (base === 'about') {
      setTimeout(() => setLines(prev => [...prev, { type: 'output', text: "Hi — I'm [Your Name]. I'm a dev who builds things. (replace this text)" }]), 200)
      return
    }

    if (base === 'projects') {
      setTimeout(() => setLines(prev => [...prev, { type: 'output', text: "- Project A: https://github.com/you/project-a\n- Project B: https://github.com/you/project-b" }]), 200)
      return
    }

    if (base === 'contact') {
      setTimeout(() => setLines(prev => [...prev, { type: 'output', text: "Email: you@example.com — or visit /contact" }]), 200)
      return
    }

    if (base === 'clear') {
      setLines([])
      return
    }

    if (base === 'resume') {
      setTimeout(() => setLines(prev => [...prev, { type: 'output', text: 'Resume: https://link-to-resume' }]), 200)
      return
    }

    setTimeout(() => setLines(prev => [...prev, { type: 'output', text: `'${cmd}' : command not found` }]), 200)
  }

  function onKeyDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleCommand(input)
      setInput('')
    }

    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      setLines([])
    }
  }

  return (
    <div className="terminal-wrap">
      <div className="terminal" ref={containerRef} role="log" aria-live="polite">
        {lines.map((line, i) => (
          <div key={i} className={`line ${line.type}`}>
            {line.type === 'input' ? (
              <span className="prompt">$</span>
            ) : null}
            <pre>{line.text}</pre>
          </div>
        ))}

        <div className="line prompt-line">
          <span className="prompt">$</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="cmd-input"
            aria-label="Terminal command input"
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>

      <div className="controls">
        <button onClick={() => setLines([])} title="Clear">Clear</button>
      </div>

      <style jsx>{`
        .terminal-wrap { display:flex; flex-direction:column; height:100vh; padding:20px; background:#0b0f14; color:#c9d1d9; }
        .terminal { flex:1; overflow:auto; border-radius:8px; padding:16px; background:linear-gradient(180deg,#000 0%, #071024 100%); box-shadow: 0 8px 30px rgba(0,0,0,0.6); }
        .line { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Courier New", monospace; font-size:14px; white-space:pre-wrap; margin-bottom:6px }
        .prompt { color:#39ff14; margin-right:8px }
        .cmd-input { background:transparent; border:0; outline:none; color:inherit; font:inherit; width:60%; }
        .controls { margin-top:12px }
        .controls button { background:#111; color:#c9d1d9; border:1px solid #222; padding:8px 12px; border-radius:6px }
      `}</style>
    </div>
  )
}
