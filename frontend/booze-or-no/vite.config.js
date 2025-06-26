import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: false,
    strictPort: true,
    proxy: {
  '/register': {
    target: 'http://backend:8000',
    changeOrigin: true,
    secure: false,
  },
  '/login': {
    target: 'http://backend:8000',
    changeOrigin: true,
    secure: false,
  },
  '/search': {
    target: 'http://backend:8000',
    changeOrigin: true,
    secure: false,
  },
  '/profile': {
    target: 'http://backend:8000',
    changeOrigin: true,
    secure: false,
  },
  '/autocomplete': {
  target: 'http://backend:8000',
  changeOrigin: true,
  secure: false,
}
  }
    }
      }
        )
