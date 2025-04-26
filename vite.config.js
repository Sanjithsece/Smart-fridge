import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/droidcam': {
        target: 'http://localhost:4747',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/droidcam/, '')
      }
    }
  }
});