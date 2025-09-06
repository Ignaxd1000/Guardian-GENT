import React, { useState } from 'react'
import { sha1Hex } from '../utils/crypto.js'

export default function BreachCheck({ password }) {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function check() {
    setError('')
    setResult(null)
    if (!password) return
    setLoading(true)
    try {
      const hash = await sha1Hex(password)
      const prefix = hash.slice(0, 5)
      const suffix = hash.slice(5)
      const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`)
      if (!res.ok) throw new Error('Fallo al consultar HIBP')
      const text = await res.text()
      const lines = text.split('\n').map(l => l.trim())
      const match = lines.find(line => line.split(':')[0] === suffix)
      if (match) {
        const count = parseInt(match.split(':')[1].trim(), 10)
        setResult({ compromised: true, count })
      } else {
        setResult({ compromised: false, count: 0 })
      }
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Verificar filtraciones (HIBP)</h2>
      <p><small className="muted">Privacidad: tu contraseña no se envía, solo un prefijo del hash SHA‑1 (k‑anonymity).</small></p>
      <button className="primary" onClick={check} disabled={!password || loading}>
        {loading ? 'Consultando…' : 'Verificar'}
      </button>
      {error && <p style={{ color: 'var(--danger)' }}>Error: {error}</p>}
      {result && result.compromised && (
        <p style={{ color: 'var(--danger)' }}>
          Esta contraseña aparece en brechas {result.count.toLocaleString()} veces. ¡No la uses!
        </p>
      )}
      {result && !result.compromised && (
        <p style={{ color: 'var(--ok)' }}>
          No hay coincidencias en la base consultada. Igualmente seguí buenas prácticas.
        </p>
      )}
    </div>
  )
}