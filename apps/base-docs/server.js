const express = require('express');
const path = require('path');
const basicAuth = require('express-basic-auth');
const fs = require('fs');
const notFound = require('./404.js');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const unless = function (path, middleware) {
  return function (req, res, next) {
    if (path === req.baseUrl) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

const app = express();

app.use(express.static('static'));

app.use(bodyParser.json());

app.get('/api/_health', (_, res) => {
  res.sendStatus(200);
});

app.post('/api/rateMessage', (req, res) => {
  const { message_id, rating_value } = req.body;

  const data = {
    api_key: process.env.MENDABLE_SERVER_API_KEY,
    message_id,
    rating_value,
  };

  fetch('https://api.mendable.ai/v1/rateMessage', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => res.json(response))
    .catch((error) => res.status(400));
});

const redirectRoutes = {
  '/base-camp': '/base-learn/docs/welcome',
  '/base-learn': '/base-learn/docs/welcome',
  '/basecamp': '/base-learn/docs/welcome',
  '/baselearn': '/base-learn/docs/welcome',
  '/using-base': '/docs/using-base',
  '/network-information': '/docs/network-information',
  '/base-contracts': '/docs/base-contracts',
  '/fees': '/docs/fees',
  '/differences': '/docs/differences',
  '/contracts': '/docs/contracts',
  '/security': '/docs/security',
  '/terms-of-service': '/docs/terms-of-service',
  '/privacy-policy': '/docs/privacy-policy',
  '/cookie-policy': '/docs/cookie-policy',
  '/tools/node-providers': '/docs/tools/node-providers',
  '/tools/block-explorers': '/docs/tools/block-explorers',
  '/tools/network-faucets': '/docs/tools/network-faucets',
  '/tools/oracles': '/docs/tools/oracles',
  '/tools/data-indexers': '/docs/tools/data-indexers',
  '/tools/cross-chain': '/docs/tools/cross-chain',
  '/tools/account-abstraction': '/docs/tools/account-abstraction',
  '/tools/nft-checkout': '/docs/tools/nft-checkout',
  '/tools/onramps': '/docs/tools/onramps',
  '/tools/onboarding': '/docs/tools/onboarding',
  '/tools/bridges': '/docs/tools/bridges',
  '/docs/tools/bridges-testnet': '/docs/tools/bridges',
  'docs/tools/bridge-faq': '/docs/tools/bridges',
  '/tools/foundry': '/docs/tools/foundry',
  '/tools/hardhat': '/docs/tools/hardhat',
  '/tools/thirdweb-cli': '/docs/tools/thirdweb-cli',
  '/tools/ethers': '/docs/tools/ethers',
  '/tools/thirdweb-sdk': '/docs/tools/thirdweb-sdk',
  '/tools/viem': '/docs/tools/viem',
  '/tools/web3': '/docs/tools/web3',
  '/tokens/list': '/docs/tokens/list',
  '/tokens/wallet': '/docs/tokens/wallet',
  '/guides/run-a-base-goerli-node/': '/tutorials/run-a-base-node/',
  '/guides/deploy-smart-contracts': '/tutorials/deploy-with-hardhat',
  '/guides/deploy-with-foundry': '/tutorials/deploy-with-foundry',
  '/guides/deploy-with-remix': '/tutorials/deploy-with-remix',
  '/guides/deploy-with-tenderly': '/tutorials/deploy-with-tenderly',
  '/guides/deploy-with-thirdweb': '/tutorials/deploy-with-thirdweb',
  '/guides/build-with-thirdweb': '/tutorials/build-with-thirdweb',
  '/guides/run-a-base-node': '/tutorials/run-a-base-node',
  '/guides/using-chainlink-price-feeds': '/tutorials/oracles-chainlink-price-feeds',
  '/guides/using-pyth-price-feeds': '/tutorials/oracles-pyth-price-feeds',
  '/guides/using-supra-vrf': '/tutorials/oracles-supra-vrf',
  '/guides/cross-chain-with-ccip': '/tutorials/cross-chain-with-ccip',
  '/guides/cross-chain-with-layerzero': '/tutorials/cross-chain-with-layerzero',
  '/guides/account-abstraction-with-biconomy': '/tutorials/account-abstraction-with-biconomy',
  '/guides/building-with-base-and-foundry/introduction': '/tutorials/intro-to-foundry-setup',
  '/guides/building-with-base-and-foundry/testing': '/tutorials/intro-to-foundry-testing',
  '/guides/complex-onchain-nfts': '/tutorials/onchain-nfts',
  '/guides/linked-minting-frame': '/tutorials/farcaster-frames-nocode-minting',
  '/guides/nft-minting-frame': '/tutorials/farcaster-frames-nft-minting',
  '/guides/deploy-frame-on-vercel': '/tutorials/farcaster-frames-deploy-to-vercel',
  '/guides/advanced-frame-behavior': '/tutorials/farcaster-frames-gating-and-redirects',
  '/guides/hyperframes': '/tutorials/farcaster-frames-hyperframes',
  '/guides/frame-transactions': '/tutorials/farcaster-frames-transactions'
};

Object.keys(redirectRoutes).forEach(route => {
  app.get(route, (req, res) => {
    res.redirect(redirectRoutes[route]);
  });
});

if (process.env.APP_STAGE === 'production' && process.env.AUTH_ENABLED !== 'false') {
  const auth = basicAuth({
    challenge: true,
    realm: 'This is a private site',
    // expected in the format: "user1:pass user2:pass" (same as the Base public router)
    users: process.env.BASIC_AUTH_CREDENTIALS.split(' ').reduce((o, e) => {
      let s = e.split(':');
      o[s[0]] = s[1];
      return o;
    }, {}),
  });

  app.use(unless('/api/_health', auth));
}

app.set('port', 3000);

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
    'https://*.datadoghq.com'
  ],
  'frame-src': ["'self'", 'https://player.vimeo.com', 'https://verify.walletconnect.org'],
};

const cspObjectToString = Object.entries(contentSecurityPolicy).reduce((acc, [key, value]) => {
  return `${acc}${key} ${value.join(' ')};`;
}, '');

app.use(
  express.static(path.join(__dirname, '../../out/base-docs'), {
    setHeaders: function (res) {
      res.setHeader('cache-control', 'no-store');
      res.setHeader('content-security-policy', cspObjectToString);
      res.setHeader('cross-origin-opener-policy', 'same-origin-allow-popups');
      res.setHeader('referrer-policy', 'strict-origin-when-cross-origin');
      res.setHeader('strict-transport-security', 'max-age=63072000; includeSubDomains; preload');
      res.setHeader('x-content-type-options', 'nosniff');
      res.setHeader('x-frame-options', 'SAMEORIGIN');
      res.setHeader('x-xss-protection', '1; mode=block');
    },
  }),
);

app.use(function (req, res, next) {
  const filePath = path.resolve(__dirname, req.originalUrl.slice(1));
  const rootDir = path.resolve(__dirname, 'public');

  if (!filePath.startsWith(rootDir)) {
    res.status(404).send(notFound.html);
    return;
  }

  if (!fs.existsSync(filePath)) {
    res.status(404).send(notFound.html);
    return;
  }

  next();
});

app.listen(app.get('port'));
