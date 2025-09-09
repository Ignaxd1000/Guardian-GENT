import React, { useState } from 'react'
import { secureRandomPassword } from '../utils/crypto.js'

export default function Generator({ onGenerate }) {
  const [length, setLength] = useState(16)
  const [opts, setOpts] = useState({ lower: true, upper: true, digits: true, symbols: true })
  const [last, setLast] = useState('')

  function toggle(key) {
    setOpts(o => ({ ...o, [key]: !o[key] }))
  }

  function generate() {
    const pw = secureRandomPassword(length, opts)
    setLast(pw)
    onGenerate?.(pw)
  }
                                    // En este archivo no hay mucho para comentar
  async function copy() {
    if (!last) return
    await navigator.clipboard.writeText(last)
    alert('Contraseña copiada')
  }

  return (
    <div className="card">
      <h2>Generador de contraseñas</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        <label>
          Longitud: {length}
          <input type="range" min="8" max="64" value={length} onChange={e => setLength(parseInt(e.target.value, 10))} />
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 8 }}>
          <label><input type="checkbox" checked={opts.lower} onChange={() => toggle('lower')} /> Minúsculas</label>
          <label><input type="checkbox" checked={opts.upper} onChange={() => toggle('upper')} /> Mayúsculas</label>
          <label><input type="checkbox" checked={opts.digits} onChange={() => toggle('digits')} /> Números</label>
          <label><input type="checkbox" checked={opts.symbols} onChange={() => toggle('symbols')} /> Símbolos</label>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="primary" onClick={generate}>Generar</button>
          <button onClick={copy} disabled={!last}>Copiar</button>
        </div>
        <input type="text" value={last} readOnly placeholder="Tu nueva contraseña aparecerá aquí" />
      </div>
    </div>
  )
}