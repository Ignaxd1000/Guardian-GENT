import React, { useState } from 'react'
import PasswordStrength from './components/PasswordStrength.jsx'
import BreachCheck from './components/BreachCheck.jsx'
import Generator from './components/Generator.jsx'

export default function App() {
  const [password, setPassword] = useState('')
  const [dark, setDark] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  function handleGenerate(pw) {
    setPassword(pw)
  }

  return (
    <div className="container">
      <header>
        <h1>Guardian — Contraseñas Seguras</h1>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={dark} onChange={() => setDark(d => !d)} />
          Modo oscuro
        </label>
      </header>

      <div className="card">
        <label htmlFor="pw">Probá tu contraseña (se evalúa localmente)</label>
        <input
          id="pw"
          type="password"
          placeholder="Escribí aquí…"
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-describedby="help"
        />
        <small id="help" className="muted">No se almacena nada. Usá una contraseña de ejemplo si preferís.</small>
      </div>

      <div className="row">
        <PasswordStrength password={password} />
        <BreachCheck password={password} />
      </div>

      <Generator onGenerate={handleGenerate} />

      <footer>
        <p>Hecho con React y Web Crypto. Educativo. No guardamos datos.</p>
      </footer>

      <style>{`
        body { background: ${dark ? '#0b0f14' : 'white'}; }
      `}</style>
    </div>
  )
}