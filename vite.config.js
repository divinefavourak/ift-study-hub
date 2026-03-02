import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Forward system env var OPENROUTER_API_KEY → import.meta.env.VITE_OPENROUTER_API_KEY
    'import.meta.env.VITE_OPENROUTER_API_KEY': JSON.stringify(
      process.env.OPENROUTER_API_KEY ?? ''
    ),
  },
})
