import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  resolve: {
    alias: {
      '#components': resolve(
        dirname(fileURLToPath(import.meta.url)),
        'components'
      ),

      '#constants': resolve(
        dirname(fileURLToPath(import.meta.url)),
        'constants'
      ),

      '#stores': resolve(
        dirname(fileURLToPath(import.meta.url)),
        'stores'
      ),

      '#hoc': resolve(
        dirname(fileURLToPath(import.meta.url)),
        'hoc'
      ),

      '#windows': resolve(
        dirname(fileURLToPath(import.meta.url)),
        'windows'
      ),
    }
  }
})