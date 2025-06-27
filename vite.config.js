import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { copyFileSync } from 'fs'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-404',
      writeBundle() {
        // Copy 404.html to dist after build for GitHub Pages SPA routing
        copyFileSync('public/404.html', 'dist/404.html')
      }
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
          vendor: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
        }
      }
    },
    chunkSizeWarningLimit: 800 // Increased from default 500
  },
  server: {
    // Configure dev server for SPA routing
    historyApiFallback: true
  },
  preview: {
    // Configure preview server for SPA routing
    historyApiFallback: true
  }
})
