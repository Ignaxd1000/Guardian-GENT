import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Importante para GitHub Pages: base = nombre del repo
export default defineConfig({
  plugins: [react()],
  base: '/guardian-GENT/'
})