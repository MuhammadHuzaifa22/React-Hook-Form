import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1000, // Increase the limit to 1000 kB
    rollupOptions: {
      external: [
        // List any external libraries you want to exclude from the bundle
        // e.g., 'React-Hook-Form/assets/index-D9Y6fNZ4.js'
      ],
      output: {
        manualChunks(id) {
          // Split chunks if necessary, customize according to your app's structure
          if (id.includes('node_modules')) {
            // Create chunks for each package in node_modules
            return id.toString().split('node_modules/')[1].split('/')[0];
          }
          // Optionally add more custom chunking logic here
        },
      },
    },
  },
  // Optionally add server configuration for development
  server: {
    port: 3000, // Set your preferred port for the dev server
    open: true, // Automatically open the app in the default browser
  },
});
