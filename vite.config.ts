import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true, // This enables network access
    strictPort: true, // Ensures Vite uses exactly port 5173
    watch: {
      usePolling: true, // Enables file system events on Linux
    },
  },
});
