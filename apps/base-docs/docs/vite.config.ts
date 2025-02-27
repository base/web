import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@coinbase/cookie-banner'],
  },
  define: {
    'process.env': {},
    Buffer: ['buffer', 'Buffer'],
  },
  server: {
    fs: {
      // Adjust these paths based on where your docs folder actually lives
      allow: [
        // Allow going up two directories, for example
        '../..',
        // Or, specify a more explicit absolute/relative path
        '/Users/ericbrown/code/base/vocs-mvp/docs',
      ],
    },
  },
});
