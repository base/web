import type { Sidebar } from 'vocs'

// Note: careful of name clashing between sidebar items and docs pages. 
// For example, 'Quickstart' is used for both sidebar and page names.
// If docs are part of a sidebar collection, they should be in a subfolder
export const sidebar: Sidebar = [
  {
    text: 'Overview',
    link: '/',
  },
  {
    text: 'Quickstart',
    link: '/quickstart',
  },
  {
    text: 'Builder Kits',
    items: [
      {
        text: 'OnchainKit',
        collapsed: true,
        items: [
          {
            text: 'Introduction',
            items: [{ text: 'Getting Started', link: '/builderkits/onchainkit/getting-started' }],
          },
          {
            text: 'Installation',
            items: [
              { text: 'Next.js', link: '/builderkits/onchainkit/installation/nextjs' },
              { text: 'Vite', link: '/builderkits/onchainkit/installation/vite' },
              { text: 'Remix', link: '/builderkits/onchainkit/installation/remix' },
              { text: 'Astro', link: '/builderkits/onchainkit/installation/astro' },
            ],
          },
          {
            text: 'Config',
            items: [
              {
                text: 'OnchainKitProvider',
                link: '/builderkits/onchainkit/config/onchainkit-provider',
              },
            ],
          },
          {
            text: 'Contribution',
            items: [
              {
                text: 'How to Contribute',
                link: '/builderkits/onchainkit/guides/contribution',
              },
              {
                text: 'Report a Bug',
                link: '/builderkits/onchainkit/guides/reporting-bug',
              },
            ],
          },
          {
            text: 'Guides',
            items: [
              {
                text: 'Lifecycle Status',
                link: '/builderkits/onchainkit/guides/lifecycle-status',
              },
              {
                text: 'Tailwind CSS Integration',
                link: '/builderkits/onchainkit/guides/tailwind',
              },
              {
                text: 'Theme Customization',
                link: '/builderkits/onchainkit/guides/themes',
              },
              {
                text: 'Use Basename',
                link: '/builderkits/onchainkit/guides/use-basename-in-onchain-app',
              },
            ],
          },
          {
            text: 'Templates',
            items: [
              {
                text: 'Onchain NFT App ↗',
                link: 'https://ock-mint.vercel.app/',
              },
              {
                text: 'Onchain Commerce App ↗',
                link: 'https://onchain-commerce-template.vercel.app/',
              },
              {
                text: 'Onchain Social Profile ↗',
                link: 'https://github.com/fakepixels/ock-identity',
              },
            ],
          },
          {
            text: 'Components',
            items: [
              {
                text: 'Checkout',
                items: [
                  {
                    text: 'Checkout',
                    link: '/builderkits/onchainkit/checkout/checkout',
                  },
                ],
              },
              {
                text: 'Frame',
                items: [
                  {
                    text: 'FrameMetadata',
                    link: '/builderkits/onchainkit/frame/frame-metadata',
                  },
                ],
              },
              {
                text: 'Fund',
                items: [
                  {
                    text: 'FundButton',
                    link: '/builderkits/onchainkit/fund/fund-button',
                  },
                ],
              },
              {
                text: 'Identity',
                items: [
                  {
                    text: 'Identity',
                    link: '/builderkits/onchainkit/identity/identity',
                  },
                  {
                    text: 'Address',
                    link: '/builderkits/onchainkit/identity/address',
                  },
                  {
                    text: 'Avatar',
                    link: '/builderkits/onchainkit/identity/avatar',
                  },
                  {
                    text: 'Badge',
                    link: '/builderkits/onchainkit/identity/badge',
                  },
                  {
                    text: 'IdentityCard',
                    link: '/builderkits/onchainkit/identity/identity-card',
                  },
                  {
                    text: 'Name',
                    link: '/builderkits/onchainkit/identity/name',
                  },
                  {
                    text: 'Socials',
                    link: '/builderkits/onchainkit/identity/socials',
                  },
                ],
              },
              {
                text: 'Mint',
                items: [
                  {
                    text: 'NFTCard',
                    link: '/builderkits/onchainkit/mint/nft-card',
                  },
                  {
                    text: 'NFTMintCard',
                    link: '/builderkits/onchainkit/mint/nft-mint-card',
                  },
                ],
              },
              {
                text: 'Swap',
                items: [
                  {
                    text: 'Swap',
                    link: '/builderkits/onchainkit/swap/swap',
                  },
                  {
                    text: 'SwapSettings',
                    link: '/builderkits/onchainkit/swap/swap-settings',
                  },
                ],
              },
              {
                text: 'Token',
                items: [
                  {
                    text: 'TokenChip',
                    link: '/builderkits/onchainkit/token/token-chip',
                  },
                  {
                    text: 'TokenImage',
                    link: '/builderkits/onchainkit/token/token-image',
                  },
                  {
                    text: 'TokenRow',
                    link: '/builderkits/onchainkit/token/token-row',
                  },
                  {
                    text: 'TokenSearch',
                    link: '/builderkits/onchainkit/token/token-search',
                  },
                  {
                    text: 'TokenSelectDropdown',
                    link: '/builderkits/onchainkit/token/token-select-dropdown',
                  },
                ],
              },
              {
                text: 'Transaction',
                items: [
                  {
                    text: 'Transaction',
                    link: '/builderkits/onchainkit/transaction/transaction',
                  },
                ],
              },
              {
                text: 'Wallet',
                items: [
                  {
                    text: 'Wallet',
                    link: '/builderkits/onchainkit/wallet/wallet',
                  },
                  {
                    text: 'WalletDropdownBasename',
                    link: '/builderkits/onchainkit/wallet/wallet-dropdown-basename',
                  },
                  {
                    text: 'WalletDropdownDisconnect',
                    link: '/builderkits/onchainkit/wallet/wallet-dropdown-disconnect',
                  },
                  {
                    text: 'WalletDropdownFundLink',
                    link: '/builderkits/onchainkit/wallet/wallet-dropdown-fund-link',
                  },
                  {
                    text: 'WalletDropdownLink',
                    link: '/builderkits/onchainkit/wallet/wallet-dropdown-link',
                  },
                ],
              },
            ],
          },
          {
            text: 'API',
            items: [
              {
                text: 'Mint',
                items: [
                  {
                    text: 'getTokenDetails',
                    link: '/builderkits/onchainkit/api/get-token-details',
                  },
                  {
                    text: 'getMintDetails',
                    link: '/builderkits/onchainkit/api/get-mint-details',
                  },
                  {
                    text: 'buildMintTransaction',
                    link: '/builderkits/onchainkit/api/build-mint-transaction',
                  },
                ],
              },
              {
                text: 'Swap',
                items: [
                  {
                    text: 'buildSwapTransaction',
                    link: '/builderkits/onchainkit/api/build-swap-transaction',
                  },
                  {
                    text: 'getSwapQuote',
                    link: '/builderkits/onchainkit/api/get-swap-quote',
                  },
                ],
              },
              {
                text: 'Token',
                items: [
                  {
                    text: 'getTokens',
                    link: '/docs/kits/onchainkit/api/get-tokens',
                  },
                ],
              },
            ],
          },
          {
            text: 'Utilities',
            collapsed: true,
            items: [
              {
                text: 'Config',
                items: [
                  {
                    text: 'isBase',
                    link: '/docs/kits/onchainkit/config/is-base',
                  },
                  {
                    text: 'isEthereum',
                    link: '/docs/kits/onchainkit/config/is-ethereum',
                  },
                ],
              },
              {
                text: 'Fund',
                items: [
                  {
                    text: 'getOnrampBuyUrl',
                    link: '/docs/kits/onchainkit/fund/get-onramp-buy-url',
                  },
                ],
              },
              {
                text: 'Frame',
                items: [
                  {
                    text: 'getFarcasterUserAddress',
                    link: '/docs/kits/onchainkit/farcaster/get-farcaster-user-address',
                  },
                  {
                    text: 'getFrameHtmlResponse',
                    link: '/docs/kits/onchainkit/frame/get-frame-html-response',
                  },
                  {
                    text: 'getFrameMessage',
                    link: '/docs/kits/onchainkit/frame/get-frame-message',
                  },
                  {
                    text: 'getFrameMetadata',
                    link: '/docs/kits/onchainkit/frame/get-frame-metadata',
                  },
                  {
                    text: 'getXmtpFrameMessage',
                    link: '/docs/kits/onchainkit/xmtp/get-xmtp-frame-message',
                  },
                  {
                    text: 'isXmtpFrameRequest',
                    link: '/docs/kits/onchainkit/xmtp/is-xmtp-frame-request',
                  },
                ],
              },
              {
                text: 'Identity',
                items: [
                  {
                    text: 'getAddress',
                    link: '/docs/kits/onchainkit/identity/get-address',
                  },
                  {
                    text: 'getAttestations',
                    link: '/docs/kits/onchainkit/identity/get-attestations',
                  },
                  {
                    text: 'getAvatar',
                    link: '/docs/kits/onchainkit/identity/get-avatar',
                  },
                  {
                    text: 'getName',
                    link: '/docs/kits/onchainkit/identity/get-name',
                  },
                  {
                    text: 'useAddress',
                    link: '/docs/kits/onchainkit/identity/use-address',
                  },
                  {
                    text: 'useAvatar',
                    link: '/docs/kits/onchainkit/identity/use-avatar',
                  },
                  {
                    text: 'useName',
                    link: '/docs/kits/onchainkit/identity/use-name',
                  },
                ],
              },
              {
                text: 'Token',
                items: [
                  {
                    text: 'formatAmount',
                    link: '/docs/kits/onchainkit/token/format-amount',
                  },
                ],
              },
              {
                text: 'Wallet',
                items: [
                  {
                    text: 'isValidAAEntrypoint',
                    link: '/docs/kits/onchainkit/wallet/is-valid-aa-entrypoint',
                  },
                  {
                    text: 'isWalletACoinbaseSmartWallet',
                    link: '/docs/kits/onchainkit/wallet/is-wallet-a-coinbase-smart-wallet',
                  },
                ],
              },
            ],
          },
          {
            text: 'Types',
            collapsed: true,
            items: [
              {
                text: 'API',
                link: '/docs/kits/onchainkit/api/types',
              },
              {
                text: 'Checkout',
                link: '/docs/kits/onchainkit/checkout/types',
              },
              {
                text: 'Config',
                link: '/docs/kits/onchainkit/config/types',
              },
              {
                text: 'Farcaster',
                link: '/docs/kits/onchainkit/farcaster/types',
              },
              {
                text: 'Fund',
                link: '/docs/kits/onchainkit/fund/types',
              },
              {
                text: 'Frame',
                link: '/docs/kits/onchainkit/frame/types',
              },
              {
                text: 'Identity',
                link: '/docs/kits/onchainkit/identity/types',
              },
              {
                text: 'Mint',
                link: '/docs/kits/onchainkit/mint/types',
              },
              {
                text: 'Swap',
                link: '/docs/kits/onchainkit/swap/types',
              },
              {
                text: 'Token',
                link: '/docs/kits/onchainkit/token/types',
              },
              {
                text: 'Transaction',
                link: '/docs/kits/onchainkit/transaction/types',
              },
              {
                text: 'Wallet',
                link: '/docs/kits/onchainkit/wallet/types',
              },
            ],
          },
        ],
      },
      {
        text: 'AgentKit ↗',
        link: 'https://docs.cdp.coinbase.com/agentkit/docs/welcome',
      },
    ]
  },
  {
    text: 'Blockspace Tools',
    items: [
      {
        text: 'Paymaster ↗',
        link: 'https://docs.cdp.coinbase.com/paymaster/docs/welcome',
      },
      // { PENDING APPCHAIN RELEASE 2/25
      //   text: 'Appchains ↗',
      //   link: 'https://docs.cdp.coinbase.com/paymaster/docs/welcome',
      // },
    ]
  },
  {
    text: 'Identity',
    items: [
      {
        text: 'Smart Wallet',
        collapsed: true,
        items: [
          {
            text: "Introduction",
            items: [
              { text: "Install for Web", link: "identity/smart-wallet/install-web" },
              { text: "Install for React Native", link: "identity/smart-wallet/install-react-native" },
              { text: "Recommend Libraries", link: "identity/smart-wallet/recommended-libraries" },
              { text: "Starter Templates", link: "identity/smart-wallet/starter-templates" },
            ],
          },
      
          {
            text: "Features",
            items: [
              {
                text: "Built-in Features",
                items: [
                  { text: "Single Sign On", link: "identity/smart-wallet/features/single-sign-on" },
                  { text: "Networks", link: "identity/smart-wallet/features/networks" },
                  { text: "Passkeys", link: "identity/smart-wallet/features/passkeys" },
                  { text: "Recovery", link: "identity/smart-wallet/features/recovery-keys" },
                  { text: "MagicSpend", link: "identity/smart-wallet/features/magic-spend" },
                ],
              },
              {
                text: "Optional Features",
                items: [
                  { text: "Gas-free Transactions", link: "identity/smart-wallet/features/sponsored-transactions" },
                  { text: "One-click Transactions", link: "identity/smart-wallet/features/spend-permissions" },
                  { text: "Batch Transactions", link: "identity/smart-wallet/features/batch-operations" },
                  { text: "Custom Gas Tokens", link: "identity/smart-wallet/features/custom-gas-tokens" },
                ],
              },
            ],
          },
          {
            text: "Important Details",
            items: [
              { text: "Signature Verification", link: "identity/smart-wallet/important-details/signature-verification" },
              { text: "Popups", link: "identity/smart-wallet/important-details/popups" },
              { text: "Simulations", link: "identity/smart-wallet/important-details/simulations" },
              { text: "Portability", link: "identity/smart-wallet/important-details/portability" },
              { text: "Gas Usage", link: "identity/smart-wallet/important-details/gas-usage" },
              { text: "Self Calls", link: "identity/smart-wallet/important-details/self-calls" },
            ],
          },
          {
            text: "SDK",
            collapsed: false,
            items: [
              {
                text: "createCoinbaseWalletSDK",
                link: "identity/smart-wallet/sdk/create-coinbase-wallet-sdk",
              },
            ],
          },
          {
            text: 'Tutorials',
            collapsed: true,
            items: [
              {
                text: 'Create a New Web App',
                items: [
                  { text: 'Using Onchain App Template', link: '/identity/smart-wallet/guides/create-app/using-onchain-app-template' },
                  { text: 'Using Wagmi', link: '/identity/smart-wallet/guides/create-app/using-wagmi' },
                ],
              },
              { text: 'Update Existing App', link: '/identity/smart-wallet/guides/update-existing-app' },
              { text: 'React Native Integration', link: '/identity/smart-wallet/guides/react-native-integration' },
              { text: 'Create Wallet Button', link: '/identity/smart-wallet/guides/components/create-wallet-button' },
              { text: 'Signature Verification', link: '/identity/smart-wallet/guides/signature-verification' },
              { text: 'SIWE', link: '/identity/smart-wallet/guides/siwe' },
              { text: 'Batch Transactions', link: '/identity/smart-wallet/guides/batch-transactions' },
              {
                text: 'Spend Permissions',
                items: [
                  { text: 'Overview', link: '/identity/smart-wallet/guides/spend-permissions/overview' },
                  { text: 'Quick Start', link: '/identity/smart-wallet/guides/spend-permissions/quick-start' },
                  {
                    text: 'API Reference',
                    items: [
                      { text: 'Client Resources', link: '/identity/smart-wallet/guides/spend-permissions/api-reference/client-resources' },
                      { text: 'SpendPermissionManager', link: '/identity/smart-wallet/guides/spend-permissions/api-reference/spendpermissionmanager' },
                      { text: 'Wallet FetchPermissions', link: '/identity/smart-wallet/guides/spend-permissions/api-reference/wallet-fetchpermissions' },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'Basenames',
        collapsed: true,
        items: [
          {
            text: 'Tutorials',
            items: [
              { text: 'Basenames Wagmi Tutorial', link: '/identity/basenames/basenames-wagmi-tutorial' },
              { text: 'Basenames OnchainKit Tutorial', link: '/identity/basenames/basenames-onchainkit-tutorial' },
            ],
          },
          {
            text: 'FAQ & Troubleshooting',
            items: [
              { text: 'Basenames FAQ', link: '/identity/basenames/basenames-faq' },
            ],
          },
        ],
      },
      {
        text: 'Verifications',
        collapsed: true,
        items: [
          {
            text: 'Quickstart',
            items: [
              { text: 'Quickstart', link: '/identity/verifications/quickstart' },
            ],
          },
          {
            text: 'Introduction',
            items: [
              { text: 'Welcome', link: '/identity/verifications/welcome' },
              { text: 'Use Cases', link: '/identity/verifications/use-cases' },
            ],
          },
          {
            text: 'Documentation',
            items: [
              { text: 'Attestations', link: '/identity/verifications/attestations' },
            ],
          },
          { text: 'FAQ & Troubleshooting', link: '/identity/verifications/faq-troubleshooting' },
          {
            text: 'Support',
            items: [
              { text: 'Discord Community', link: '/identity/verifications/verifications-discord' },
            ],
          },
        ],
      },
    ],
  },
  {
    text: 'Chain',
    items: [
      {
        text: 'General',
        collapsed: true,
        items: [
          { text: 'Deploy on Base', link: '/chain/deploy-on-base-quickstart' },
          { text: 'Network Information', link: '/chain/network-information' },
          { text: 'Fees', link: '/chain/fees' },
          { text: 'Differences Between Ethereum and Base', link: '/chain/differences-between-ethereum-and-base' },
          { text: 'Run a Base Node', link: '/chain/run-a-base-node' },
          { text: 'Bridge an L1 Token to Base', link: '/chain/bridge-an-l1-token-to-base' },
        ],
      },
      {
        text: 'Contracts',
        collapsed: true,
        items: [
          { text: 'Base Contracts', link: '/chain/base-contracts' },
        ],
      },
      {
        text: 'Security',
        collapsed: true,
        items: [
          { text: 'Security', link: '/chain/security' },
        ],
      },
      {
        text: 'OP Stack',
        collapsed: true,
        items: [
          { text: 'Decentralizing Base with Optimism', link: '/chain/decentralizing-base-with-optimism' },
        ],
      },
      {
        text: 'Tools',
        collapsed: true,
        items: [
          { text: 'Onchain Registry API', link: '/chain/registry-api' },
          { text: 'Node Providers', link: '/chain/node-providers' },
          { text: 'Block Explorers', link: '/chain/block-explorers' },
          { text: 'Network Faucets', link: '/chain/network-faucets' },
          { text: 'Oracles', link: '/chain/oracles' },
          { text: 'Data Indexers', link: '/chain/data-indexers' },
          { text: 'Cross-chain', link: '/chain/cross-chain' },
          { text: 'Account Abstraction', link: '/chain/account-abstraction' },
          { text: 'Onramps', link: '/chain/onramps' },
        ],
      },
    ],
  },
  {
    text: 'Use Cases',
    items: [
      {
        text: 'Onboard any user',
        link: '/use-cases/onboard-any-user',
      },
      {
        text: 'Accept crypto payments',
        link: '/use-cases/accept-crypto-payments',
      },
      {
        text: 'Launch AI Agents',
        link: '/use-cases/launch-ai-agents',
      },
      {
        text: 'Decentralize your social app',
        link: '/use-cases/decentralize-social-app',
      },
      {
        text: 'DeFi your app',
        link: '/use-cases/defi-your-app',
      },
      {
        text: 'Go gasless',
        link: '/use-cases/go-gasless',
      }
    ]
  },
  {
    text: 'Cookbook',
    items: [
      {
        text: 'Use Case Guides',
        collapsed: true, 
        items: [
          {
            text: 'Payments & Commerce',
            items: [
              { text: 'Accept Crypto Payments', link: '/cookbook/use-case-guides/commerce/accept-crypto-payments' },
              { text: 'Build an E-commerce App', link: '/cookbook/use-case-guides/commerce/build-an-ecommerce-app' },
              { text: 'Deploy a Shopify Storefront', link: '/cookbook/use-case-guides/commerce/deploy-a-shopify-storefront' },
              { text: 'Transaction Guide', link: '/cookbook/life-cycle-guides/activating/transactions' },
            ],
          },
          {
            text: 'NFTs & Digital Assets',
            items: [
              { text: 'NFT Minting with Zora', link: '/cookbook/use-case-guides/creator/nft-minting-with-zora' },
              { text: 'No-Code NFT Minting', link: '/cookbook/life-cycle-guides/activating/no-code-minting' },
              { text: 'NFT Minting Guide', link: '/cookbook/life-cycle-guides/activating/nft-minting' },
              { text: 'Convert Farcaster Frame to Open Frame', link: '/cookbook/use-case-guides/creator/convert-farcaster-frame-to-open-frame' },
            ],
          },
          {
            text: 'DeFi & Financial Tools',
            items: [
              { text: 'Add In-App Funding (Onramp)', link: '/cookbook/use-case-guides/finance/build-a-smart-wallet-funding-app' },
              { text: 'Access Real-World Data (Chainlink)', link: '/cookbook/use-case-guides/finance/access-real-world-data-chainlink' },
              { text: 'Access Real-Time Asset Data (Pyth)', link: '/cookbook/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds' },
            ],
          },
          {
            text: 'Growth & Distribution',
            items: [
              {
                text: 'Social & Distribution',
                items: [
                  { text: 'Cast Actions', link: '/cookbook/life-cycle-guides/growing/cast-actions' },
                  { text: 'Hyperframes', link: '/cookbook/life-cycle-guides/growing/hyperframes' },
                ],
              },
              {
                text: 'Deployment & Access',
                items: [
                  { text: 'Deploy to Vercel', link: '/cookbook/life-cycle-guides/growing/deploy-to-vercel' },
                  { text: 'Gating and Redirects', link: '/cookbook/life-cycle-guides/growing/gating-and-redirects' },
                ],
              },
              {
                text: 'User Engagement',
                items: [
                  { text: 'Email Campaigns', link: '/cookbook/life-cycle-guides/retaining/create-email-campaigns' },
                ],
              },
            ],
          },
        ],
      },
      {
        text: 'General Development',
        collapsed: true,
        items: [
          {
            text: 'Smart Contract Development',
            items: [
              {
                text: 'Hardhat',
                items: [
                  { text: 'Deploy with Hardhat', link: '/cookbook/general-development/smart-contract-development/hardhat/deploy-with-hardhat' },
                  { text: 'Debugging Smart Contracts', link: '/cookbook/general-development/smart-contract-development/hardhat/debugging-smart-contracts' },
                  { text: 'Optimizing Gas Usage', link: '/cookbook/general-development/smart-contract-development/hardhat/optimizing-gas-usage' },
                  { text: 'Reducing Contract Size', link: '/cookbook/general-development/smart-contract-development/hardhat/reducing-contract-size' },
                  { text: 'Analyzing Test Coverage', link: '/cookbook/general-development/smart-contract-development/hardhat/analyzing-test-coverage' },
                ],
              },
              {
                text: 'Foundry',
                items: [
                  { text: 'Deploy with Foundry', link: '/cookbook/general-development/smart-contract-development/foundry/deploy-with-foundry' },
                  { text: 'Setup with Base', link: '/cookbook/general-development/smart-contract-development/foundry/setup-with-base' },
                  { text: 'Testing Smart Contracts', link: '/cookbook/general-development/smart-contract-development/foundry/testing-smart-contracts' },
                ],
              },
              {
                text: 'Remix',
                items: [
                  { text: 'Deploy with Remix', link: '/cookbook/general-development/smart-contract-development/remix/deploy-with-remix' },
                ],
              },
              {
                text: 'Tenderly',
                items: [
                  { text: 'Deploy with Tenderly', link: '/cookbook/general-development/smart-contract-development/tenderly/deploy-with-tenderly' },
                ],
              },
              {
                text: 'ThirdWeb',
                items: [
                  { text: 'Deploy with ThirdWeb', link: '/cookbook/general-development/smart-contract-development/thirdweb/deploy-with-thirdweb' },
                  { text: 'Build with ThirdWeb', link: '/cookbook/general-development/smart-contract-development/thirdweb/build-with-thirdweb' },
                  { text: 'ThirdWeb SDK', link: '/cookbook/general-development/smart-contract-development/thirdweb/thirdweb-sdk' },
                  { text: 'ThirdWeb CLI', link: '/cookbook/general-development/smart-contract-development/thirdweb/thirdweb-cli' },
                ],
              },
            ],
          },
          {
            text: 'NFTs',
            items: [
              { text: 'Simple Onchain NFTs', link: '/cookbook/general-development/nfts/simple-onchain-nfts' },
              { text: 'Dynamic NFTs', link: '/cookbook/general-development/nfts/dynamic-nfts' },
              { text: 'Complex Onchain NFTs', link: '/cookbook/general-development/nfts/complex-onchain-nfts' },
              { text: 'Signature Mint', link: '/cookbook/general-development/nfts/signature-mint' },
              { text: 'ThirdWeb Unreal NFT Items', link: '/cookbook/general-development/nfts/thirdweb-unreal-nft-items' },
            ],
          },
          {
            text: 'IPFS',
            items: [
              { text: 'Deploy with Fleek', link: '/cookbook/general-development/ipfs/deploy-with-fleek' },
            ],
          },
          {
            text: 'Token Gating',
            items: [
              { text: 'Gate IRL Events with Nouns', link: '/cookbook/general-development/token-gating/gate-irl-events-with-nouns' },
            ],
          },
          {
            text: 'Client-Side Development',
            items: [
              { text: 'Introduction to Providers', link: '/cookbook/general-development/client-side-development/introduction-to-providers' },
            ],
          },
          {
            text: 'Account Abstraction',
            items: [
              { text: 'Using Biconomy', link: '/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-biconomy' },
              { text: 'Using Particle Network', link: '/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-particle-network' },
              { text: 'Using Privy and Base Paymaster', link: '/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster' },
              { text: 'Gasless Transactions with Paymaster', link: '/cookbook/general-development/account-abstraction/gasless-transactions-with-paymaster' },
            ],
          },
          {
            text: 'Cross-Chain',
            items: [
              { text: 'Bridge Tokens with LayerZero', link: '/cookbook/general-development/cross-chain/bridge-tokens-with-layerzero' },
              { text: 'Send Messages and Tokens from Base (Chainlink)', link: '/cookbook/general-development/cross-chain/send-messages-and-tokens-chainlink' },
            ],
          },
        ],
      },
    ]
  },
  {
    text: 'Feedback',
    items: [
      {
        text: 'Get help ↗',
        link: 'https://discord.com/invite/buildonbase',
      },
      {
        text: 'Bug bounty ↗',
        link: 'https://hackerone.com/coinbase'
      }
    ]
  }
]