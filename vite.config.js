import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure proper base path for GitHub Pages with custom domain
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
    chunkSizeWarningLimit: 800, // Increased from default 500
    outDir: 'dist', // Ensure output directory is correctly set
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
