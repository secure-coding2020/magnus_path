import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// base: './' uses relative paths, so the built site works on GitHub Pages
// (https://secure-coding2020.github.io/magnus_path/) and on a custom domain.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
