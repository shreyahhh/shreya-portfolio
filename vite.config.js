import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Always load .env from the folder that contains vite.config.js (not only process.cwd()).
  // Fixes EmailJS (and other VITE_*) missing when the dev command is run from a parent directory.
  const env = loadEnv(mode, __dirname, 'VITE_')

  return {
    plugins: [react()],
    envDir: __dirname,
    define: {
      'import.meta.env.VITE_EMAILJS_SERVICE_ID': JSON.stringify(env.VITE_EMAILJS_SERVICE_ID ?? ''),
      'import.meta.env.VITE_EMAILJS_TEMPLATE_ID': JSON.stringify(env.VITE_EMAILJS_TEMPLATE_ID ?? ''),
      'import.meta.env.VITE_EMAILJS_PUBLIC_KEY': JSON.stringify(env.VITE_EMAILJS_PUBLIC_KEY ?? ''),
    },
  }
})
