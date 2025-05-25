import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: false,  // explicitly disable https if it is enabled
    strictPort: true, // ensures Vite fails if port 3000 is not available
    proxy: {
      '/search': {
        target: 'http://backend:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
