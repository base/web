const MillionLint = require('@million/lint');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const isProdEnv = process.env.NODE_ENV === 'production';

// Can't import this from apps/web/src/utils/images.ts for some reason
const allowedImageRemoteDomains = ['zku9gdedgba48lmr.public.blob.vercel-storage.com'];

const baseConfig = {
  // Enable advanced features
  compiler: {
    reactRemoveProperties: true,
    removeConsole: isProdEnv,
    styledComponents: true,
  },

  // Always enable compression
  compress: true,

  // We have our own linting infrastructure, so avoid Next's
  eslint: {
    ignoreDuringBuilds: true,
  },

  // This conflicts with how we use project refs and aliases
  typescript: {
    ignoreBuildErrors: true,
  },

  // Do not broadcast that we're using Next
  poweredByHeader: false,

  // Generate source maps for production builds
  productionBrowserSourceMaps: false,

  // Enable strict mode in development
  reactStrictMode: !isProdEnv,
};

function extendBaseConfig(customConfig = {}, plugins = []) {
  const defaultConfig = {
    ...baseConfig,
    ...customConfig,
    webpack: (webpack, options) => {
      if (customConfig.webpack) {
        return customConfig.webpack(webpack, options);
      }

      return webpack;
    },
  };

  return plugins.reduce((acc, plugin) => plugin(acc), defaultConfig);
}

// csp headers
const isLocalDevelopment = process.env.NODE_ENV === 'development';
const isE2ETest = process.env.E2E_TEST === 'true';
const baseXYZDomains = 'https://base.mirror.xyz';
const greenhouseDomains = 'https://boards.greenhouse.io https://boards-api.greenhouse.io';
const ccaDomain = 'https://static-assets.coinbase.com/js/cca/v0.0.1.js';
const ccaLiteDomains = 'https://cca-lite.coinbase.com';
const sprigDomains = 'https://api.sprig.com https://cdn.sprig.com';
const walletconnectDomains =
  'https://*.walletconnect.org wss://*.walletconnect.org wss://*.walletconnect.com https://*.walletconnect.com https://explorer-api.walletconnect.com';
const metamaskDomains =
  'wss://metamask-sdk.api.cx.metamask.io https://metamask-sdk.api.cx.metamask.io';

const contentSecurityPolicy = {
  'default-src': [
    "'self'",
    "'unsafe-inline'", // NextJS requires 'unsafe-inline'
    "'wasm-unsafe-eval'", // wasm requires 'unsafe-eval'
    isLocalDevelopment ? "'unsafe-eval'" : '',
    baseXYZDomains,
    ccaDomain,
    ccaLiteDomains,
    walletconnectDomains,
    'https://fonts.googleapis.com', // OCK styles loads google fonts via CSS
    'https://fonts.gstatic.com/', // OCK styles loads google fonts via CSS
    'https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com',
    'https://jsv3.recruitics.com/0778138b-cc59-11ef-a514-fd1759833eec.js', // recruitics job analytics
  ],
  'worker-src': ["'self'", 'blob:'],
  'connect-src': [
    "'self'",
    'blob:',
    'https://blob.vercel-storage.com', // Vercel File storage
    'https://zku9gdedgba48lmr.public.blob.vercel-storage.com', // Vercel File storage
    walletconnectDomains,
    sprigDomains,
    greenhouseDomains,
    ccaLiteDomains,
    ccaDomain,
    'https://ccip-v2.ens.xyz',
    'https://euc.li',
    'https://arweave.net',
    'https://ens.xyz',
    'https://enhanced-provider.rainbow.me',
    'https://*.coinbase.com',
    'wss://www.walletlink.org/rpc', // coinbase wallet connection
    'https://analytics-service-dev.cbhq.net',
    'mainnet.base.org',
    'sepolia.base.org',
    'https://cloudflare-eth.com',
    'https://i.seadn.io/', // ens avatars
    'https://api.opensea.io', // enables getting ENS avatars
    'https://ipfs.io', // ipfs ens avatar resolution
    'https://cloudflare-ipfs.com', // ipfs Cloudflare ens avatar resolution
    'wss://www.walletlink.org',
    'https://base.easscan.org/graphql',
    'https://api.guild.xyz/',
    isE2ETest ? 'ws://localhost:8545/' : isLocalDevelopment ? 'ws://localhost:3000/' : '',
    isE2ETest ? 'http://localhost:8545/' : isLocalDevelopment ? 'http://localhost:3000/' : '',
    'https://flag.lab.amplitude.com/sdk/v2/flags',
    'https://api.lab.amplitude.com/sdk/v2/vardata',
    'https://browser-intake-datadoghq.com', // datadog
    'https://*.datadoghq.com', //datadog
    'https://translate.googleapis.com', // Let user translate our website
    'https://sdk-api.neynar.com/', // Neynar API
    'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.33.0/dist/dotlottie-player.wasm', // lottie player for profile pages
    'https://cdn.jsdelivr.net/npm/@lottiefiles/dotlottie-web@0.31.1/dist/dotlottie-player.wasm', // lottie player for profile pages
    'https://unpkg.com/@lottiefiles/dotlottie-web@0.31.1/dist/dotlottie-player.wasm', // lottie player for profile pages
    'https://unpkg.com/@lottiefiles/dotlottie-web@0.33.0/dist/dotlottie-player.wasm', // lottie player for api
    `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
    'https://usdc-claim-git-master-coinbase-vercel.vercel.app',
    'https://eth.merkle.io', // new default viem rpc
    'https://blue-api.morpho.org/graphql', // morpho
    'https://base-sepolia.easscan.org/graphql', // nft
    'https://*.google-analytics.com',
    'wss://metamask-sdk.api.cx.metamask.io', // MetaMask SDK websocket
    'https://metamask-sdk.api.cx.metamask.io', // MetaMask SDK API
  ],
  'frame-src': ['https://p.datadoghq.com', walletconnectDomains],
  'frame-ancestors': ["'self'", baseXYZDomains],
  'form-action': ["'self'", baseXYZDomains],
  'img-src': [
    "'self'",
    'blob:',
    'data:',
    'https://base.org',
    'https://*.base.org',
    'https://euc.li',
    'https://*.walletconnect.com/', // WalletConnect
    'https://i.seadn.io/', // ens avatars
    'https://ipfs.io', // ipfs ens avatar resolution
    'https://cloudflare-ipfs.com', // ipfs Cloudflare ens avatar resolution
    'https://res.cloudinary.com',
    `https://${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
    'https://img.reservoir.tools', // reservoir
    'https://d3r81g40ycuhqg.cloudfront.net/', // OCK Earn component
  ],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

const securityHeaders = [
  {
    key: 'cache-control',
    value: 'no-cache',
  },
  {
    key: 'content-security-policy',
    value: cspObjectToString,
  },
  {
    key: 'cross-origin-opener-policy',
    value: 'same-origin-allow-popups',
  },
  {
    key: 'referrer-policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'strict-transport-security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'x-content-type-options',
    value: 'nosniff',
  },
  {
    key: 'x-frame-options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'x-xss-protection',
    value: '1; mode=block',
  },
];

const millionEnabled = process.env.MILLION_LINT === 'true';

module.exports = MillionLint.next({
  enabled: millionEnabled,
  rsc: true,
})(
  extendBaseConfig(
    {
      transpilePackages: ['base-ui'],
      i18n: {
        locales: ['en'],
        defaultLocale: 'en',
      },
      webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
        config.module.rules.push({
          test: /\.webm/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/webm/',
                publicPath: '/_next/static/assets/webm/',
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.mp4$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/mp4/',
                publicPath: '/_next/static/assets/mp4/',
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.gltf/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/gltf/',
                publicPath: '/_next/static/assets/gltf/',
              },
            },
          ],
        });
        config.module.rules.push({
          test: /\.glb/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name][hash].[ext]',
                outputPath: 'static/assets/glb/',
                publicPath: '/_next/static/assets/glb/',
              },
            },
          ],
        });

        config.externals.push('pino-pretty');
        config.experiments = { ...config.experiments, asyncWebAssembly: true };

        return config;
      },
      images: {
        remotePatterns: allowedImageRemoteDomains.map((hostname) => {
          return {
            protocol: 'https',
            hostname,
          };
        }),
      },
      async headers() {
        if (millionEnabled) {
          return [];
        }

        return [
          {
            source: '/:path*',
            basePath: false,
            headers: securityHeaders,
          },
        ];
      },
      async rewrites() {
        return [
          {
            source: '/brand',
            destination: '/',
            has: [{ type: 'host', value: 'brand.base.org' }],
          },
        ];
      },
      async redirects() {
        return [
          {
            source: '/builders',
            destination: '/build',
            permanent: true,
          },
          {
            source: '/careers',
            destination: '/jobs',
            permanent: true,
          },
          {
            source: '/buildersummer',
            destination: '/onchainsummer',
            permanent: true,
          },
          {
            source: '/onchainsummer',
            destination: '/build',
            permanent: true,
          },
          {
            source: '/getstarted',
            destination: '/build',
            permanent: true,
          },
          {
            source: '/onchainfont',
            // just so the build doesn't fail in CI
            destination: process.env.NEXT_PUBLIC_OCS_CREATIVE_DOWNLOAD_URL ?? '/',
            permanent: false,
          },
          {
            source: '/luma',
            destination: 'https://lu.ma/base-virtualevents',
            permanent: true,
          },
          {
            source: '/registry',
            destination: 'https://buildonbase.deform.cc/getstarted/',
            permanent: true,
          },
          {
            source: '/registry-edit',
            destination: 'https://buildonbase.deform.cc/registry-edit/',
            permanent: true,
          },
          {
            source: '/name/:path.base.eth',
            destination: '/name/:path',
            permanent: true,
          },
          {
            source: '/names/:path',
            destination: '/name/:path',
            permanent: true,
          },
          {
            source: '/name',
            destination: '/names',
            permanent: true,
          },
          {
            source: '/builders/smart-wallet',
            destination: '/build/base-account',
            permanent: true,
          },
          {
            source: '/build/minikit',
            destination: '/build/mini-apps',
            permanent: true,
          },
          {
            source: '/builders/minikit',
            destination: '/build/mini-apps',
            permanent: true,
          },
          {
            source: '/builders/:path',
            destination: '/build/:path',
            permanent: true,
          },
          {
            source: '/500',
            destination: '/',
            permanent: false,
          },
        ];
      },
    },
    [withBundleAnalyzer],
  ),
);
