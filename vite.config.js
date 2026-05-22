import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    // Splits third-party libraries into a separate 'vendor' chunk
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
    // Raises warning threshold to 1000 kB (1MB) to handle larger vendor chunks smoothly
    chunkSizeWarningLimit: 1000,
  },
})