import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    https: false,
    strictPort: true,
    allowedHosts: [
      'boozeorno-frontend.onrender.com',
      'localhost',
      '127.0.0.1',
    ],
    proxy: {
      '/search': {
        target: 'https://boozeorno-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/profile': {
        target: 'https://boozeorno-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/login': {
        target: 'https://boozeorno-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
      '/register': {
        target: 'https://boozeorno-backend.onrender.com',
        changeOrigin: true,
        secure: true,
      },
    }
  }
});
