import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components', // Custom alias
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:4000', // Proxy API requests during development
    },
  },
  build: {
    sourcemap: true, // Enable source maps for better debugging
  },
});
