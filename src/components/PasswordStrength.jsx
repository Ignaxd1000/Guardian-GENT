import React from 'react'

function scorePassword(pw) {
  if (!pw) return { score: 0, label: 'Vacío', color: '#9ca3af', tips: [] }
  let score = 0
  const tips = []
  const length = pw.length
  const hasLower = /[a-z]/.test(pw)
  const hasUpper = /[A-Z]/.test(pw)
  const hasDigit = /\d/.test(pw)
  const hasSymbol = /[^A-Za-z0-9]/.test(pw)

  score += Math.min(10, length) // longitud ayuda
  score += (hasLower + hasUpper + hasDigit + hasSymbol) * 2

  if (length < 8) tips.push('Usá 12+ caracteres.')
  if (!(hasLower && hasUpper)) tips.push('Combiná mayúsculas y minúsculas.')
  if (!hasDigit) tips.push('Agregá números.')
  if (!hasSymbol) tips.push('Agregá símbolos.')

  const max = 10 + 8 // tope simple 18
  const pct = Math.min(100, Math.round((score / max) * 100))
  let label = 'Muy débil', color = '#dc2626'
  if (pct >= 25) { label = 'Débil'; color = '#f97316' }
  if (pct >= 50) { label = 'Media'; color = '#f59e0b' }
  if (pct >= 75) { label = 'Fuerte'; color = '#16a34a' }
  if (pct >= 90) { label = 'Muy fuerte'; color = '#16a34a' }

  return { score: pct, label, color, tips }
}

export default function PasswordStrength({ password }) {
  const { score, label, color, tips } = scorePassword(password)
  return (
    <div className="card" aria-live="polite">
      <h2>Fortaleza de la contraseña</h2>
      <div className="progress" role="progressbar" aria-valuenow={score} aria-valuemin="0" aria-valuemax="100" aria-label="Fortaleza">
        <div style={{ width: `${score}%`, background: color }} />
      </div>
      <p>
        Estado: <span className="badge" style={{ borderColor: color, color }}>{label}</span>
      </p>
      {tips.length > 0 && (
        <ul>
          {tips.map((t, i) => <li key={i}><small className="muted">{t}</small></li>)}
        </ul>
      )}
    </div>
  )
}