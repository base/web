module.exports = {
    gettingStartedSidebar: [
      {
        type: 'doc',
        id: 'getting-started/index',
      },
      {
        type: 'category',
        label: 'Quickstart',
        items: ['getting-started/deploy-on-base-quickstart', 'getting-started/onchainkit-quickstart'],
      },
      {
        type: 'category',
        label: 'Introduction',
        items: [
          'getting-started/why-base',
          'getting-started/explore-all-tools',
          'getting-started/building-onchain',
          'getting-started/onchain-development-lifecycle',
        ],
      },
      {
        type: 'category',
        label: 'Get Setup',
        items: ['getting-started/setting-up-your-dev-environment', 'getting-started/docs-tour'],
      },
      {
        type: 'category',
        label: 'Migrating to Base',
        items: ['getting-started/to-be-built'],
      },
    ],
    appToolsSidebar: [
      {
        type: 'doc',
        id: 'app-tools/index',
      },
      {
        type: 'category',
        label: 'OnchainKit',
        items: [
          {
            type: 'category',
            label: 'Quickstart Guide',
            items: ['app-tools/onchainkit/getting-started'],
          },
          'app-tools/onchainkit/introduction',
          {
            type: 'category',
            label: 'Tutorials',
            items: [
              'app-tools/onchainkit/create-a-basename-profile-component',
              'app-tools/onchainkit/lifecycle-status',
              'app-tools/onchainkit/tailwind-css-integration',
              'app-tools/onchainkit/theme-customization',
              'app-tools/onchainkit/use-basenames',
              'app-tools/onchainkit/use-coinbase-smart-wallet-and-eoas',
            ],
          },
          {
            type: 'category',
            label: 'Templates',
            items: ['app-tools/onchainkit/existing-templates'],
          },
          {
            type: 'category',
            label: 'Documentation',
            items: [
              'app-tools/onchainkit/components-section',
              'app-tools/onchainkit/api-section',
              'app-tools/onchainkit/utilities',
              'app-tools/onchainkit/types',
            ],
          },
          {
            type: 'category',
            label: 'FAQ & Troubleshooting',
            items: ['app-tools/onchainkit/to-be-built'],
          },
          {
            type: 'category',
            label: 'Support & Contribution',
            items: ['app-tools/onchainkit/how-to-contribute', 'app-tools/onchainkit/report-a-bug'],
          },
        ],
      },
      {
        type: 'category',
        label: 'Basenames',
        items: [
          'app-tools/basenames/quickstart-guide',
          'app-tools/basenames/introduction',
          {
            type: 'category',
            label: 'Tutorials',
            items: [
              'app-tools/basenames/add-frames-to-a-basename',
              'app-tools/basenames/basenames-wagmi-tutorial',
              'app-tools/basenames/basenames-onchainkit-tutorial',
            ],
          },
          {
            type: 'category',
            label: 'Documentation',
            items: ['app-tools/basenames/to-be-built'],
          },
          {
            type: 'category',
            label: 'FAQ & Troubleshooting',
            items: ['app-tools/basenames/basenames-faq'],
          },
          {
            type: 'category',
            label: 'Support & Contribution',
            items: ['app-tools/basenames/how-to-contribute', 'app-tools/basenames/report-a-bug'],
          },
        ],
      },
      {
        type: 'category',
        label: 'Paymaster',
        items: [
          'app-tools/paymaster/quickstart-guide',
          'app-tools/paymaster/welcome',
          {
            type: 'category',
            label: 'Tutorials',
            items: ['app-tools/paymaster/gasless-transactions-with-paymaster'],
          },
          {
            type: 'category',
            label: 'Documentation',
            items: [
              'app-tools/paymaster/erc20-paymaster',
              'app-tools/paymaster/security',
              'app-tools/paymaster/errors',
              'app-tools/paymaster/quickstart-headless',
            ],
          },
          {
            type: 'category',
            label: 'FAQ & Troubleshooting',
            items: ['app-tools/paymaster/troubleshooting'],
          },
          {
            type: 'category',
            label: 'Support & Contribution',
            items: ['app-tools/paymaster/how-to-contribute'],
          },
        ],
      },
      {
        type: 'category',
        label: 'Verifications',
        items: [
          {
            type: 'category',
            label: 'Quickstart Guide',
            items: ['app-tools/verifications/existing-quickstart-on-cdp'],
          },
          {
            type: 'category',
            label: 'Introduction',
            items: [
              'app-tools/verifications/welcome-to-coinbase-verifications',
              'app-tools/verifications/use-cases',
            ],
          },
          {
            type: 'category',
            label: 'Tutorials',
            items: ['app-tools/verifications/to-be-built'],
          },
          {
            type: 'category',
            label: 'Documentation',
            items: ['app-tools/verifications/attestations-document'],
          },
          'app-tools/verifications/faq-troubleshooting',
          {
            type: 'category',
            label: 'Support & Contribution',
            items: ['app-tools/verifications/verifications-discord'],
          },
        ],
      },
    ],
    walletToolsSidebar: [
      {
        type: 'doc',
        id: 'wallet-tools/index',
      },
      {
        type: 'category',
        label: 'Wallet SDK',
        items: [
          {
            type: 'category',
            label: 'Introduction',
            items: [
              'wallet-tools/wallet-sdk/welcome',
              'wallet-tools/wallet-sdk/wallet-features',
              'wallet-tools/wallet-sdk/environments',
              'wallet-tools/wallet-sdk/whitelisted-networks',
              'wallet-tools/wallet-sdk/developer-settings',
              'wallet-tools/wallet-sdk/injected-provider',
            ],
          },
          {
            type: 'category',
            label: 'Tutorials',
            items: [
              'wallet-tools/wallet-sdk/adding-tokens-to-coinbase-wallet',
              'wallet-tools/wallet-sdk/sample-applications',
            ],
          },
          {
            type: 'category',
            label: 'Coinbase Wallet SDK',
            items: [
              'wallet-tools/wallet-sdk/installing',
              'wallet-tools/wallet-sdk/setup',
              {
                type: 'category',
                label: 'Making Requests',
                items: [
                  'wallet-tools/wallet-sdk/getting-eth-accounts',
                  'wallet-tools/wallet-sdk/switching-chains',
                  'wallet-tools/wallet-sdk/tracking-assets',
                ],
              },
              'wallet-tools/wallet-sdk/disconnecting-links',
            ],
          },
          {
            type: 'category',
            label: 'Coinbase Wallet Mobile SDK',
            items: [
              'wallet-tools/wallet-sdk/mobile-sdk-overview',
              {
                type: 'category',
                label: 'iOS',
                items: [
                  'wallet-tools/wallet-sdk/ios-install',
                  'wallet-tools/wallet-sdk/ios-setup',
                  'wallet-tools/wallet-sdk/ios-establishing-a-connection',
                  'wallet-tools/wallet-sdk/ios-making-requests',
                  'wallet-tools/wallet-sdk/ios-api-reference',
                ],
              },
              {
                type: 'category',
                label: 'Android',
                items: [
                  'wallet-tools/wallet-sdk/android-install',
                  'wallet-tools/wallet-sdk/android-setup',
                  'wallet-tools/wallet-sdk/android-establishing-a-connection',
                  'wallet-tools/wallet-sdk/android-making-requests',
                  'wallet-tools/wallet-sdk/android-api-reference',
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'Solana Developers',
            items: [
              {
                type: 'category',
                label: 'Injected Solana provider',
                items: [
                  'wallet-tools/wallet-sdk/solana-provider',
                  'wallet-tools/wallet-sdk/solana-connecting-accounts',
                  'wallet-tools/wallet-sdk/solana-sending-transactions',
                  'wallet-tools/wallet-sdk/solana-signing-messages',
                  'wallet-tools/wallet-sdk/solana-provider-api',
                ],
              },
              {
                type: 'category',
                label: 'Solana wallet adapter',
                items: ['wallet-tools/wallet-sdk/solana-adapter-guide'],
              },
            ],
          },
          {
            type: 'category',
            label: 'Xmtp',
            items: ['wallet-tools/wallet-sdk/xmtp'],
          },
          {
            type: 'category',
            label: 'Sample Applications',
            items: ['wallet-tools/wallet-sdk/sample-applications'],
          },
          {
            type: 'category',
            label: 'FAQ & Troubleshooting',
            items: [
              'wallet-tools/wallet-sdk/faq',
              'wallet-tools/wallet-sdk/errors',
              'wallet-tools/wallet-sdk/injected-provider-guidance',
              'wallet-tools/wallet-sdk/mobile-dapp-integration-via-deep-linking',
              'wallet-tools/wallet-sdk/ux-guidelines',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'Smart Wallet',
        items: [
          {
            type: 'category',
            label: 'Quickstart Guide',
            items: ['wallet-tools/smart-wallet/quick-start'],
          },
          {
            type: 'category',
            label: 'Introduction',
            items: [
              'wallet-tools/smart-wallet/why-smart-wallet',
              'wallet-tools/smart-wallet/launch-ready-checklist',
              'wallet-tools/smart-wallet/wallet-library-support',
              'wallet-tools/smart-wallet/base-gasless-campaign',
            ],
          },
          {
            type: 'category',
            label: 'Tutorials',
            items: [
              {
                type: 'category',
                label: 'Create a New Web App',
                items: [
                  'wallet-tools/smart-wallet/guides/create-app/using-onchain-app-template',
                  'wallet-tools/smart-wallet/guides/create-app/using-wagmi',
                ],
              },
              'wallet-tools/smart-wallet/guides/update-existing-app',
              'wallet-tools/smart-wallet/guides/react-native-integration',
              'wallet-tools/smart-wallet/guides/components/create-wallet-button',
              'wallet-tools/smart-wallet/guides/signature-verification',
              'wallet-tools/smart-wallet/guides/siwe',
              'wallet-tools/smart-wallet/guides/batch-transactions',
              {
                type: 'category',
                label: 'Spend Permissions',
                items: [
                  'wallet-tools/smart-wallet/guides/spend-permissions/overview',
                  'wallet-tools/smart-wallet/guides/spend-permissions/quick-start',
                  {
                    type: 'category',
                    label: 'API Reference',
                    items: [
                      'wallet-tools/smart-wallet/guides/spend-permissions/api-reference/client-resources',
                      'wallet-tools/smart-wallet/guides/spend-permissions/api-reference/spendpermissionmanager',
                      'wallet-tools/smart-wallet/guides/spend-permissions/api-reference/wallet-fetchpermissions',
                    ],
                  },
                ],
              },
              {
                type: 'category',
                label: 'Tips & Tricks',
                items: [
                  'wallet-tools/smart-wallet/guides/tips/inspect-txn-simulation',
                  'wallet-tools/smart-wallet/guides/tips/popup-tips',
                ],
              },
            ],
          },
          {
            type: 'category',
            label: 'SDK',
            items: [
              {
                type: 'category',
                id: 'wallet-tools/smart-wallet/sdk/getting-started',
                items: ['wallet-tools/smart-wallet/sdk/make-web3-provider'],
              },
            ],
          },
          {
            type: 'category',
            label: 'FAQ & Troubleshooting',
            items: ['wallet-tools/smart-wallet/FAQ'],
          },
        ],
      },
      {
        type: 'category',
        label: 'Mobile Wallet Protocol',
        items: [
          {
            type: 'category',
            label: 'Quickstart Guide',
            items: ['wallet-tools/mobile-wallet-protocol/to-be-built'],
          },
          {
            type: 'category',
            label: 'Introduction',
            items: ['wallet-tools/mobile-wallet-protocol/existing-overview'],
          },
          {
            type: 'category',
            label: 'Tutorials',
            items: ['wallet-tools/mobile-wallet-protocol/to-be-built'],
          },
          {
            type: 'category',
            label: 'Documentation',
            items: ['wallet-tools/mobile-wallet-protocol/existing-docs-other-than-overview'],
          },
          {
            type: 'category',
            label: 'FAQ & Troubleshooting',
            items: ['wallet-tools/mobile-wallet-protocol/to-be-built'],
          },
        ],
      },
    ],
    baseChainSidebar: [
      {
        type: 'doc',
        id: 'base-chain/index',
      },
      {
        type: 'category',
        label: 'Quickstart Guide',
        items: ['base-chain/to-be-built'],
      },
      {
        type: 'category',
        label: 'Introduction',
        items: ['base-chain/to-be-built'],
      },
      {
        type: 'category',
        label: 'Tutorials',
        items: ['base-chain/run-a-base-node', 'base-chain/bridge-an-l1-token-to-base'],
      },
      {
        type: 'category',
        label: 'Documentation',
        items: [
          'base-chain/network-information',
          'base-chain/base-contracts',
          'base-chain/fees',
          'base-chain/differences-between-ethereum-and-base',
          'base-chain/decentralizing-base-with-optimism',
          'base-chain/node-providers',
          'base-chain/network-faucets',
          'base-chain/security',
        ],
      },
      {
        type: 'category',
        label: 'FAQ & Troubleshooting',
        items: ['base-chain/to-be-built'],
      },
      {
        type: 'category',
        label: 'Support & Contribution',
        items: ['base-chain/to-be-built'],
      },
    ],
    guidesSidebar: [
      {
        type: 'doc',
        id: 'guides/index',
      },
      {
        type: 'category',
        label: 'Use Case Guides',
        items: [
          {
            type: 'category',
            label: 'Finance',
            items: [
              'guides/use-case-guides/finance/build-a-smart-wallet-funding-app',
              'guides/use-case-guides/finance/access-real-world-data-chainlink',
              'guides/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds',
            ],
          },
          {
            type: 'category',
            label: 'Creator',
            items: [
              'guides/use-case-guides/creator/nft-minting-with-zora',
              'guides/use-case-guides/creator/convert-farcaster-frame-to-open-frame',
            ],
          },
          {
            type: 'category',
            label: 'Commerce',
            items: [
              'guides/use-case-guides/commerce/build-an-ecommerce-app',
              'guides/use-case-guides/commerce/deploy-a-shopify-storefront',
            ],
          },
        ],
      },
      {
        type: 'category',
        label: 'Life-Cycle Guides',
        items: [
          {
            type: 'category',
            label: 'Onboarding',
            items: ['guides/life-cycle-guides/onboarding/to-be-built'],
          },
          {
            type: 'category',
            label: 'Activating',
            items: [
              'guides/life-cycle-guides/activating/transactions',
              'guides/life-cycle-guides/activating/nft-minting',
              'guides/life-cycle-guides/activating/no-code-minting',
            ],
          },
          {
            type: 'category',
            label: 'Growing',
            items: [
              'guides/life-cycle-guides/growing/cast-actions',
              'guides/life-cycle-guides/growing/gating-and-redirects',
              'guides/life-cycle-guides/growing/deploy-to-vercel',
              'guides/life-cycle-guides/growing/hyperframes',
            ],
          },
          {
            type: 'category',
            label: 'Retaining',
            items: ['guides/life-cycle-guides/retaining/create-email-campaigns'],
          },
          {
            type: 'category',
            label: 'Monetizing',
            items: ['guides/life-cycle-guides/monetizing/to-be-built'],
          },
        ],
      },
      {
        type: 'category',
        label: 'General Development Guides',
        items: [
          {
            type: 'category',
            label: 'Smart Contract Development',
            items: [
              {
                type: 'category',
                label: 'Hardhat',
                items: [
                  'guides/general-development-guides/smart-contract-development/hardhat/deploy-with-hardhat',
                  'guides/general-development-guides/smart-contract-development/hardhat/debugging-smart-contracts',
                  'guides/general-development-guides/smart-contract-development/hardhat/optimizing-gas-usage',
                  'guides/general-development-guides/smart-contract-development/hardhat/reducing-contract-size',
                  'guides/general-development-guides/smart-contract-development/hardhat/analyzing-test-coverage',
                ],
              },
              {
                type: 'category',
                label: 'Foundry',
                items: [
                  'guides/general-development-guides/smart-contract-development/foundry/deploy-with-foundry',
                  'guides/general-development-guides/smart-contract-development/foundry/setup-with-base',
                  'guides/general-development-guides/smart-contract-development/foundry/testing-smart-contracts',
                ],
              },
              {
                type: 'category',
                label: 'Remix',
                items: [
                  'guides/general-development-guides/smart-contract-development/remix/deploy-with-remix',
                ],
              },
              {
                type: 'category',
                label: 'Tenderly',
                items: [
                  'guides/general-development-guides/smart-contract-development/tenderly/deploy-with-tenderly',
                ],
              },
              {
                type: 'category',
                label: 'ThirdWeb',
                items: [
                  'guides/general-development-guides/smart-contract-development/thirdweb/deploy-with-thirdweb',
                  'guides/general-development-guides/smart-contract-development/thirdweb/build-with-thirdweb',
                  'guides/general-development-guides/smart-contract-development/thirdweb/thirdweb-sdk',
                  'guides/general-development-guides/smart-contract-development/thirdweb/thirdweb-cli',
                ],
              },
              'guides/general-development-guides/smart-contract-development/verify-contract-with-basescan',
              'guides/general-development-guides/smart-contract-development/generate-random-numbers-contracts',
            ],
          },
          {
            type: 'category',
            label: 'NFTs',
            items: [
              'guides/general-development-guides/nfts/simple-onchain-nfts',
              'guides/general-development-guides/nfts/dynamic-nfts',
              'guides/general-development-guides/nfts/complex-onchain-nfts',
              'guides/general-development-guides/nfts/signature-mint',
              'guides/general-development-guides/nfts/thirdweb-unreal-nft-items',
            ],
          },
          {
            type: 'category',
            label: 'IPFS',
            items: ['guides/general-development-guides/IPFS/deploy-with-fleek'],
          },
          {
            type: 'category',
            label: 'Token Gating',
            items: ['guides/general-development-guides/token-gating/gate-irl-events-with-nouns'],
          },
          {
            type: 'category',
            label: 'Client-Side Development',
            items: [
              'guides/general-development-guides/client-side-development/introduction-to-providers',
            ],
          },
          {
            type: 'category',
            label: 'Account Abstraction',
            items: [
              'guides/general-development-guides/account-abstraction/account-abstraction-on-base-using-biconomy',
              'guides/general-development-guides/account-abstraction/account-abstraction-on-base-using-particle-network',
              'guides/general-development-guides/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster',
            ],
          },
          {
            type: 'category',
            label: 'Cross-Chain',
            items: [
              'guides/general-development-guides/cross-chain/bridge-tokens-with-layerzero',
              'guides/general-development-guides/cross-chain/send-messages-and-tokens-from-base-chainlink',
            ],
          },
        ],
      },
    ],
  };
  