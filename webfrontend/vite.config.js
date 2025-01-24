import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components', // Example alias
    },
  },
  server: {
    port: 3000, // Customize your development server port
  },
});
