import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages serves this project from /To-Do-List/, not the domain root.
  base: "/To-Do-List/",
  plugins: [react()],
})
