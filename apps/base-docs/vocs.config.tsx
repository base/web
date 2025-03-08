import { defineConfig } from 'vocs';
import path from 'path';
import crypto from 'crypto';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import { sidebar } from './sidebar.ts';

const googleAnalyticsScript = {
  __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TKCM02YFWN');
    `,
};

const generateNonce = () => {
  return crypto.randomBytes(16).toString('base64');
};

// NOTE: this CSP only applies in local development. Prod CSP is set in `serve.json`
const contentSecurityPolicy = {
  'default-src': ["'self'"],
  'frame-ancestors': ["'self'"],
  'form-action': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'",
    `'nonce-${generateNonce()}'`,
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
    'https://*.google-analytics.com https://*.analytics.google.com https://*.tagmanager.google.com', // Google Analytics
  ],
  'frame-src': ["'self'", 'https://player.vimeo.com', 'https://verify.walletconnect.org'],
};

export default defineConfig({
  async head() {
    const analytics = (
      <>
        <meta property="twitter:title" content="Base | Docs" />
        <meta property="twitter:image" content="https://docs.base.org/images/base-docs-og.png" />
        <meta
          property="twitter:description"
          content="Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="base.org" />
        <script src="https://tagmanager.google.com/gtag/js?id=G-TKCM02YFWN" async defer />
        <script
          id="gtag-init"
          // eslint-disable-next-line react/no-danger -- need to set innerHTML for Google Analytics
          dangerouslySetInnerHTML={googleAnalyticsScript}
        />
      </>
    );
    return analytics;
  },
  baseUrl: 'https://docs.base.org',
  title: 'Base Docs',
  iconUrl: '/favicon.ico',
  logoUrl: '/logo.svg',
  ogImageUrl: '/images/base-docs-og.png',
  blogDir: './blog',
  description:
    'Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2',
  theme: {
    colorScheme: 'dark',
    accentColor: '#578BFA',
    variables: {
      color: {
        textAccent: '#578BFA',
      },
    },
  },
  topNav: [
    {
      text: 'Get help',
      link: 'https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav',
    },
    {
      text: 'base.org',
      link: 'https://base.org',
    },
  ],
  socials: [
    {
      icon: 'github',
      link: 'https://github.com/base',
    },
    {
      icon: 'x',
      link: 'http://x.com/buildonbase',
    },
    {
      icon: 'warpcast',
      link: 'https://warpcast.com/buildonbase',
    },
    {
      icon: 'discord',
      link: 'https://discord.com/invite/buildonbase',
    },
  ],
  twoslash: {
    compilerOptions: {
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      module: 199, // ModuleKind.NodeNext
      moduleResolution: 99, // ModuleResolutionKind.NodeNext
    },
  },
  markdown: {
    code: {
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
    },
  },
  search: {
    fields: ['title', 'content', 'productLine', 'docType', 'userType'], // Fields to index
    fuzzy: 0.2, // Typo tolerance
    boost: {
      // Boosting by document type
      'docType.API': 2,
      'docType.Guide': 1.5,
    },
    prefix: true, // Autocomplete
  },
  sidebar,
  vite: {
    plugins: [react(), svgr()],
    build: {
      commonjsOptions: {
        include: [/node_modules/],
      },
    },
    optimizeDeps: {
      include: ['react', 'react-dom', '@coinbase/cookie-banner'],
    },
    define: {
      Buffer: ['buffer', 'Buffer'],
    },
    server: {
      headers: {
        'Content-Security-Policy': Object.entries(contentSecurityPolicy)
          .map(([key, value]) => `${key} ${value.join(' ')}`)
          .join('; '),
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        '@/': path.join(process.cwd(), 'docs/'),
        '@/components': path.join(process.cwd(), 'docs/components'),
        '@/pages': path.join(process.cwd(), 'docs/pages'),
        '@/styles': path.join(process.cwd(), 'docs/styles'),
        '@/lib': path.join(process.cwd(), 'docs/lib'),
        '@/utils': path.join(process.cwd(), 'docs/utils'),
        '@/types': path.join(process.cwd(), 'docs/types'),
        '@/images': path.join(process.cwd(), 'docs/public/images'),
      },
    },
  },
});
