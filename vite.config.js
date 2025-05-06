import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.VITE_BASE_URL': JSON.stringify(process.env.VITE_BASE_URL),
    'process.env.VITE_BASE_ANON_KEY': JSON.stringify(process.env.VITE_BASE_ANON_KEY)
  }
})
