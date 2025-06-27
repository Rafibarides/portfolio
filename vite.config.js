import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom'],
          framer: ['framer-motion'],
          vendor: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
        }
      }
    },
    chunkSizeWarningLimit: 800, // Increased from default 500
    assetsDir: 'assets',
    // Copy CNAME file to dist
    copyPublicDir: true
  },
  server: {
    // Configure dev server for SPA routing
    historyApiFallback: true
  },
  preview: {
    // Configure preview server for SPA routing
    historyApiFallback: true
  },
  publicDir: 'public'
})
