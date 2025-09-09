export async function sha1Hex(input) {
  const data = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest('SHA-1', data)
  const bytes = new Uint8Array(hash)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function secureRandomPassword(length, opts) { // Parece un lio pero es re simple
  const sets = []
  if (opts.lower) sets.push('abcdefghijklmnopqrstuvwxyz')
  if (opts.upper) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ') // Acà defino los sets de caracteres posibles para la contra, cosa de que el usuario pueda elegir
  if (opts.digits) sets.push('0123456789')
  if (opts.symbols) sets.push('!@#$%^&*()-_=+[]{};:,.?/|~')
  const pool = sets.join('')
  if (!pool) return ''
  const buf = new Uint32Array(length)
  crypto.getRandomValues(buf) // Mi querido RNG, me tira unos numeros random, con eso armo la contra
  let result = ''
  for (let i = 0; i < length; i++) {
    const idx = buf[i] % pool.length
    result += pool[idx]
  }
  // Con esto me aseguro que si el usuario eligió varios sets, al menos un caracter de cada set esté en la contra.
  if (sets.length > 1) {
    const arr = result.split('')
    sets.forEach((set, i) => { arr[i] = set[buf[i] % set.length] })
    result = arr.join('')
  }
  return result
}