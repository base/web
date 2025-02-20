import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const DIRNAME = dirname(fileURLToPath(import.meta.url));

const contentSecurityPolicy = {
  'default-src': ["'self'"],
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    'https://static-assets.coinbase.com/js/cca/v0.0.1.js', // CCA Lite
    'https://cca-lite.coinbase.com', // CCA Lite
  ],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:'],
  'connect-src': [
    "'self'",
    'wss://www.walletlink.org/rpc', // Coinbase Wallet SDK
    'wss://relay.walletconnect.com', // WalletConnect
    'wss://relay.walletconnect.org',
    'https://goerli.base.org', // Base Goerli RPC
    'https://sepolia.base.org', // Base Sepolia RPC
    'https://cca-lite.coinbase.com', // CCA Lite
    'https://*.algolia.net', // Algolia Search
    'https://*.algolianet.com', // Algolia Search
    'https://api.mendable.ai/v1/newConversation', // Mendable API
    'https://api.mendable.ai/v1/mendableChat', // Mendable API
    'https://api.mendable.ai/v1/rateMessage', // Mendable API
    'https://api.sprig.com', // Sprig API
    'https://cdn.sprig.com', // Sprig API
    'https://flag.lab.amplitude.com/sdk/v2/flags',
    'https://api.lab.amplitude.com/sdk/v2/vardata',
    'https://browser-intake-datadoghq.com', // datadog
    'https://*.datadoghq.com',
    'https://*.google-analytics.com  https://*.analytics.google.com  https://*.googletagmanager.com', // Google Analytics
  ],
  'frame-src': ["'self'", 'https://player.vimeo.com', 'https://verify.walletconnect.org'],
};

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    fs: {
      strict: false,
      allow: [
        // Allow serving files from root directory
        resolve(DIRNAME, '.'),
        // Allow node_modules
        resolve(DIRNAME, 'node_modules'),
      ],
    },
    headers: {
      'Cache-Control': 'no-store',
      'Content-Security-Policy': Object.entries(contentSecurityPolicy).map(([key, value]) => `${key} ${value.join('  ')}`).join('; '),
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(DIRNAME, './docs'),
      },
      {
        find: '@/components',
        replacement: resolve(DIRNAME, './docs/components'),
      },
      {
        find: '@/pages',
        replacement: resolve(DIRNAME, './docs/pages'),
      },
      {
        find: '@/styles',
        replacement: resolve(DIRNAME, './docs/styles'),
      },
      {
        find: '@/lib',
        replacement: resolve(DIRNAME, './docs/lib'),
      },
      {
        find: '@/utils',
        replacement: resolve(DIRNAME, './docs/utils'),
      },
      {
        find: '@/types',
        replacement: resolve(DIRNAME, './docs/types'),
      },
      {
        find: '@onchainkit',
        replacement: resolve(DIRNAME, './docs/pages/builderkits/onchainkit'),
      },
      {
        find: '@/images',
        replacement: resolve(DIRNAME, './docs/public/images'),
      },
    ],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', '@coinbase/cookie-banner'],
  },
  build: {
    commonjsOptions: {
      include: [/node_modules/],
    },
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name].[hash].js',
        chunkFileNames: '[name].[hash].js',
        assetFileNames: '[name].[hash].[ext]',
      },
    },
  },
});
