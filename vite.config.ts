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
import path from 'path';

// https://vitejs.dev/config//
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          ui: ['lucide-react', '@headlessui/react']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0', // Listen on all addresses
    port: 3000,
    strictPort: true, // Fail if port is in use
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
});
