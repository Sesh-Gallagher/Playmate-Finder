/**
 * Configures the Vite build for the application.
 * - Enables the React plugin
 * - Excludes the `lucide-react` dependency from optimization
 * - Sets the output directory to `dist`
 * - Enables source maps
 * - Cleans the output directory before each build
 * - Optimizes the bundle size by creating separate vendor and UI chunks
 * - Proxies API requests to `http://localhost:3000`
 */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config//
export default defineConfig({
  plugins: [react()],
  base:"/Playmate-Finder",
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false
      },
      '/socket.io': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true
      }
    }
  }
});
