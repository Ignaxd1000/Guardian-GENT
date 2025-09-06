export async function sha1Hex(input) {
  const data = new TextEncoder().encode(input)
  const hash = await crypto.subtle.digest('SHA-1', data)
  const bytes = new Uint8Array(hash)
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase()
}

export function secureRandomPassword(length, opts) {
  const sets = []
  if (opts.lower) sets.push('abcdefghijklmnopqrstuvwxyz')
  if (opts.upper) sets.push('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
  if (opts.digits) sets.push('0123456789')
  if (opts.symbols) sets.push('!@#$%^&*()-_=+[]{};:,.?/|~')
  const pool = sets.join('')
  if (!pool) return ''
  const buf = new Uint32Array(length)
  crypto.getRandomValues(buf)
  let result = ''
  for (let i = 0; i < length; i++) {
    const idx = buf[i] % pool.length
    result += pool[idx]
  }
  // Garantizar al menos un char de cada set elegido
  if (sets.length > 1) {
    const arr = result.split('')
    sets.forEach((set, i) => { arr[i] = set[buf[i] % set.length] })
    result = arr.join('')
  }
  return result
}