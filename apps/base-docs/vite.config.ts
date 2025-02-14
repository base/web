import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    fs: {
      allow: [
        resolve(__dirname, './docs'),
        resolve(__dirname, './node_modules/vocs/_lib'),
        resolve(__dirname, './node_modules/vite/dist/client')
      ]
    },
    headers: {
      'Cache-Control': 'no-store',
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, './docs')
      },
      {
        find: '@/components',
        replacement: resolve(__dirname, './docs/components')
      },
      {
        find: '@/pages',
        replacement: resolve(__dirname, './docs/pages')
      },
      {
        find: '@/styles',
        replacement: resolve(__dirname, './docs/styles')
      },
      {
        find: '@/lib',
        replacement: resolve(__dirname, './docs/lib')
      },
      {
        find: '@/utils',
        replacement: resolve(__dirname, './docs/utils')
      },
      {
        find: '@/types',
        replacement: resolve(__dirname, './docs/types')
      },
      {
        find: '@onchainkit',
        replacement: resolve(__dirname, './docs/pages/builderkits/onchainkit')
      }
    ]
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash].[ext]`
      }
    }
  }
})