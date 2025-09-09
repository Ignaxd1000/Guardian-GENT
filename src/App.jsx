import React, { useState, useEffect } from 'react'
import PasswordStrength from './components/PasswordStrength.jsx'
import BreachCheck from './components/BreachCheck.jsx'
import Generator from './components/Generator.jsx'

export default function App() {
  const [password, setPassword] = useState('')
  const [dark, setDark] = useState(
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  )

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light')
  }, [dark])

  function handleGenerate(pw) {
    setPassword(pw)
  }

  return (
    <div className="container">
      <header>
        <h1>Guardian — Contraseñas Seguras</h1>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={dark}
            onChange={() => setDark(d => !d)}
          />
          Modo oscuro
        </label>
      </header>

      <div className="card">
        <label htmlFor="pw">Probá tu contraseña (se evalúa localmente)</label>
        <input
          id="pw"
          type="password"
          placeholder="Escribi aca…"
          value={password}
          onChange={e => setPassword(e.target.value)}
          aria-describedby="help"
        />
        <small id="help" className="muted">
          No se almacena nada. Usá una contraseña de ejemplo si preferís.
        </small>
      </div>

      <div className="row">
        <PasswordStrength password={password} />
        <BreachCheck password={password} />
      </div>

      <Generator onGenerate={handleGenerate} />

      <footer>
        <p>Hecho con React y Web Crypto. No guardo datos(tampoco tengo datacenters donde guardarlos jaja).</p>
      </footer>
    </div>
  )
}