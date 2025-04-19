import type { Sidebar } from 'vocs';

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
    text: 'Bridges',
    link: '/chain/bridges-mainnet',
  },
  {
    text: 'Status ↗',
    link: 'https://status.base.org/',
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
            items: [
              { text: 'Getting Started', link: '/builderkits/onchainkit/getting-started' },
              { text: 'Telemetry', link: '/builderkits/onchainkit/guides/telemetry' },
              { text: 'Troubleshooting', link: '/builderkits/onchainkit/guides/troubleshooting' },
            ],
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
            collapsed: true,
            items: [
              {
                text: 'OnchainKitProvider',
                link: '/builderkits/onchainkit/config/onchainkit-provider',
              },
              {
                text: 'Custom Supplemental Providers',
                link: '/builderkits/onchainkit/config/supplemental-providers',
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
                text: 'Use Basenames',
                link: '/builderkits/onchainkit/guides/use-basename-in-onchain-app',
              },
              {
                text: 'Use AI-powered IDEs',
                link: '/builderkits/onchainkit/guides/using-ai-powered-ides',
              },
              {
                text: 'AI Prompting Guide',
                link: '/builderkits/onchainkit/guides/ai-prompting-guide',
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
                text: 'Appchain',
                collapsed: true,
                items: [
                  {
                    text: 'Bridge',
                    link: '/builderkits/onchainkit/appchain/bridge',
                  },
                ],
              },
              {
                text: 'Buy',
                collapsed: true,
                items: [
                  {
                    text: 'Buy',
                    link: '/builderkits/onchainkit/buy/buy',
                  },
                ],
              },
              {
                text: 'Checkout',
                collapsed: true,
                items: [
                  {
                    text: 'Checkout',
                    link: '/builderkits/onchainkit/checkout/checkout',
                  },
                ],
              },
              {
                text: 'Earn',
                collapsed: true,
                items: [
                  {
                    text: 'Earn',
                    link: '/builderkits/onchainkit/earn/earn',
                  },
                ],
              },
              {
                text: 'Fund',
                collapsed: true,
                items: [
                  {
                    text: 'FundButton',
                    link: '/builderkits/onchainkit/fund/fund-button',
                  },
                  {
                    text: 'FundCard',
                    link: '/builderkits/onchainkit/fund/fund-card',
                  },
                ],
              },
              {
                text: 'Identity',
                collapsed: true,
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
                collapsed: true,
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
                text: 'Signature',
                link: '/builderkits/onchainkit/signature/signature',
              },
              {
                text: 'Swap',
                collapsed: true,
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
                collapsed: true,
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
                link: '/builderkits/onchainkit/transaction/transaction',
              },
              {
                text: 'Wallet',
                collapsed: true,
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
                  {
                    text: 'WalletIsland',
                    link: '/builderkits/onchainkit/wallet/wallet-island',
                  },
                  {
                    text: 'WalletModal',
                    link: '/builderkits/onchainkit/wallet/wallet-modal',
                  },
                ],
              },
            ],
          },
          {
            text: 'API',
            collapsed: true,
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
                    link: '/builderkits/onchainkit/api/get-tokens',
                  },
                ],
              },
              {
                text: 'Wallet',
                items: [
                  {
                    text: 'getPortfolios',
                    link: '/builderkits/onchainkit/api/get-portfolios',
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
                    link: '/builderkits/onchainkit/config/is-base',
                  },
                  {
                    text: 'isEthereum',
                    link: '/builderkits/onchainkit/config/is-ethereum',
                  },
                ],
              },
              {
                text: 'Earn',
                items: [
                  {
                    text: 'buildDepositToMorphoTx',
                    link: '/builderkits/onchainkit/api/build-deposit-to-morpho-tx',
                  },
                  {
                    text: 'buildWithdrawFromMorphoTx',
                    link: '/builderkits/onchainkit/api/build-withdraw-from-morpho-tx',
                  },
                  {
                    text: 'useBuildDepositToMorphoTx',
                    link: '/builderkits/onchainkit/hooks/use-build-deposit-to-morpho-tx',
                  },
                  {
                    text: 'useBuildWithdrawFromMorphoTx',
                    link: '/builderkits/onchainkit/hooks/use-build-withdraw-from-morpho-tx',
                  },
                  {
                    text: 'useEarnContext',
                    link: '/builderkits/onchainkit/hooks/use-earn-context',
                  },
                ],
              },
              {
                text: 'Fund',
                items: [
                  {
                    text: 'getOnrampBuyUrl',
                    link: '/builderkits/onchainkit/fund/get-onramp-buy-url',
                  },
                  {
                    text: 'fetchOnrampConfig',
                    link: '/builderkits/onchainkit/fund/fetch-onramp-config',
                  },
                  {
                    text: 'fetchOnrampQuote',
                    link: '/builderkits/onchainkit/fund/fetch-onramp-quote',
                  },
                  {
                    text: 'fetchOnrampOptions',
                    link: '/builderkits/onchainkit/fund/fetch-onramp-options',
                  },
                  {
                    text: 'fetchOnrampTransactionStatus',
                    link: '/builderkits/onchainkit/fund/fetch-onramp-transaction-status',
                  },
                  {
                    text: 'setupOnrampEventListeners',
                    link: '/builderkits/onchainkit/fund/setup-onramp-event-listeners',
                  },
                ],
              },
              {
                text: 'Identity',
                items: [
                  {
                    text: 'getAddress',
                    link: '/builderkits/onchainkit/identity/get-address',
                  },
                  {
                    text: 'getAttestations',
                    link: '/builderkits/onchainkit/identity/get-attestations',
                  },
                  {
                    text: 'getAvatar',
                    link: '/builderkits/onchainkit/identity/get-avatar',
                  },
                  {
                    text: 'getAvatars',
                    link: '/builderkits/onchainkit/identity/get-avatars',
                  },
                  {
                    text: 'getName',
                    link: '/builderkits/onchainkit/identity/get-name',
                  },
                  {
                    text: 'getNames',
                    link: '/builderkits/onchainkit/identity/get-names',
                  },
                  {
                    text: 'useAddress',
                    link: '/builderkits/onchainkit/identity/use-address',
                  },
                  {
                    text: 'useAvatar',
                    link: '/builderkits/onchainkit/identity/use-avatar',
                  },
                  {
                    text: 'useAvatars',
                    link: '/builderkits/onchainkit/identity/use-avatars',
                  },
                  {
                    text: 'useName',
                    link: '/builderkits/onchainkit/identity/use-name',
                  },
                  {
                    text: 'useNames',
                    link: '/builderkits/onchainkit/identity/use-names',
                  },
                ],
              },
              {
                text: 'Mint',
                items: [
                  {
                    text: 'useTokenDetails',
                    link: '/builderkits/onchainkit/hooks/use-token-details',
                  },
                  {
                    text: 'useMintDetails',
                    link: '/builderkits/onchainkit/hooks/use-mint-details',
                  },
                ],
              },
              {
                text: 'Token',
                items: [
                  {
                    text: 'formatAmount',
                    link: '/builderkits/onchainkit/token/format-amount',
                  },
                ],
              },
              {
                text: 'Wallet',
                items: [
                  {
                    text: 'isValidAAEntrypoint',
                    link: '/builderkits/onchainkit/wallet/is-valid-aa-entrypoint',
                  },
                  {
                    text: 'isWalletACoinbaseSmartWallet',
                    link: '/builderkits/onchainkit/wallet/is-wallet-a-coinbase-smart-wallet',
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
                link: '/builderkits/onchainkit/api/types',
              },
              {
                text: 'Appchain',
                link: '/builderkits/onchainkit/appchain/types',
              },
              {
                text: 'Checkout',
                link: '/builderkits/onchainkit/checkout/types',
              },
              {
                text: 'Config',
                link: '/builderkits/onchainkit/config/types',
              },
              {
                text: 'Earn',
                link: '/builderkits/onchainkit/earn/types',
              },
              {
                text: 'Fund',
                link: '/builderkits/onchainkit/fund/types',
              },
              {
                text: 'Identity',
                link: '/builderkits/onchainkit/identity/types',
              },
              {
                text: 'Mint',
                link: '/builderkits/onchainkit/mint/types',
              },
              {
                text: 'Signature',
                link: '/builderkits/onchainkit/signature/types',
              },
              {
                text: 'Swap',
                link: '/builderkits/onchainkit/swap/types',
              },
              {
                text: 'Token',
                link: '/builderkits/onchainkit/token/types',
              },
              {
                text: 'Transaction',
                link: '/builderkits/onchainkit/transaction/types',
              },
              {
                text: 'Wallet',
                link: '/builderkits/onchainkit/wallet/types',
              },
            ],
          },
          {
            text: 'Contribution',
            collapsed: true,
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
        ],
      },
      {
        text: 'MiniKit',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/builderkits/minikit/overview',
          },
          {
            text: 'Quickstart',
            link: '/builderkits/minikit/quickstart',
          },
          {
            text: 'Debugging',
            link: '/builderkits/minikit/debugging',
          },
        ],
      },
      {
        text: 'AgentKit (CDP) ↗',
        link: 'https://docs.cdp.coinbase.com/agentkit/docs/welcome',
      },
    ],
  },
  {
    text: 'Blockspace Tools',
    items: [
      {
        text: 'Paymaster (CDP) ↗',
        link: 'https://docs.cdp.coinbase.com/paymaster/docs/welcome',
      },
      {
        text: 'Appchains ↗',
        link: 'https://docs.cdp.coinbase.com/appchains/docs/welcome',
      },
    ],
  },
  {
    text: 'Identity',
    items: [
      {
        text: 'Smart Wallet',
        collapsed: true,
        items: [
          {
            text: 'Quickstart',
            link: '/identity/smart-wallet/quickstart',
            items: [
              { text: 'OnchainKit', link: '/identity/smart-wallet/quickstart/quick-demo' },
              {
                text: 'Next.js Project',
                link: '/identity/smart-wallet/quickstart/nextjs-project',
              },
              {
                text: 'React Native Project',
                link: '/identity/smart-wallet/quickstart/react-native-project',
              },
              {
                text: 'AI Tools',
                link: '/identity/smart-wallet/quickstart/ai-tools-available-for-devs',
              },
            ],
          },
          {
            text: 'Concepts',
            items: [
              {
                text: 'What is Smart Wallet?',
                link: '/identity/smart-wallet/concepts/what-is-smart-wallet',
              },
              {
                text: 'Features',
                items: [
                  {
                    text: 'Built-in Features',
                    collapsed: true,
                    items: [
                      {
                        text: 'Single Sign On',
                        link: '/identity/smart-wallet/concepts/features/built-in/single-sign-on',
                      },
                      {
                        text: 'Networks',
                        link: '/identity/smart-wallet/concepts/features/built-in/networks',
                      },
                      {
                        text: 'Passkeys',
                        link: '/identity/smart-wallet/concepts/features/built-in/passkeys',
                      },
                      {
                        text: 'Recovery Keys',
                        link: '/identity/smart-wallet/concepts/features/built-in/recovery-keys',
                      },
                      {
                        text: 'MagicSpend',
                        link: '/identity/smart-wallet/concepts/features/built-in/MagicSpend',
                      },
                    ],
                  },
                  {
                    text: 'Optional Features',
                    collapsed: true,
                    items: [
                      {
                        text: 'Gas-free Transactions',
                        link: '/identity/smart-wallet/concepts/features/optional/gas-free-transactions',
                      },
                      {
                        text: 'Spend Permissions',
                        link: '/identity/smart-wallet/concepts/features/optional/spend-permissions',
                      },
                      {
                        text: 'Batch Transactions',
                        link: '/identity/smart-wallet/concepts/features/optional/batch-operations',
                      },
                      {
                        text: 'Custom Gas Tokens',
                        link: '/identity/smart-wallet/concepts/features/optional/custom-gas-tokens',
                      },
                      {
                        text: 'Sub Accounts',
                        link: '/identity/smart-wallet/concepts/features/optional/sub-accounts',
                      },
                    ],
                  },
                ],
              },
              {
                text: 'Usage Details',
                collapsed: true,
                items: [
                  {
                    text: 'Signature Verification',
                    link: '/identity/smart-wallet/concepts/usage-details/signature-verification',
                  },
                  { text: 'Popups', link: '/identity/smart-wallet/concepts/usage-details/popups' },
                  {
                    text: 'Simulations',
                    link: '/identity/smart-wallet/concepts/usage-details/simulations',
                  },
                  {
                    text: 'Gas Usage',
                    link: '/identity/smart-wallet/concepts/usage-details/gas-usage',
                  },
                  {
                    text: 'Self Calls',
                    link: '/identity/smart-wallet/concepts/usage-details/self-calls',
                  },
                  {
                    text: 'Validation and Opcode Rules',
                    link: '/identity/smart-wallet/concepts/usage-details/validation-rules',
                  },
                ],
              },
              {
                text: 'Base Gasless Campaign',
                link: '/identity/smart-wallet/concepts/base-gasless-campaign',
              },
            ],
          },
          {
            text: 'Guides',
            items: [
              { text: 'Sign In With Ethereum', link: '/identity/smart-wallet/guides/siwe' },
              {
                text: 'Signing and Verifying Messages',
                link: '/identity/smart-wallet/guides/signing-and-verifying-messages',
              },
              { text: 'MagicSpend', link: '/identity/smart-wallet/guides/magic-spend' },
              {
                text: 'Batch Transactions',
                link: '/identity/smart-wallet/guides/batch-transactions',
              },
              { text: 'Paymasters', link: '/identity/smart-wallet/guides/paymasters' },
              {
                text: 'ERC20 Paymasters',
                link: '/identity/smart-wallet/guides/erc20-paymasters',
              },
              {
                text: 'Sub Accounts',
                collapsed: true,
                link: '/identity/smart-wallet/guides/sub-accounts',
                items: [
                  {
                    text: 'Project Setup',
                    link: '/identity/smart-wallet/guides/sub-accounts/setup',
                  },
                  {
                    text: 'Creating Sub Accounts',
                    link: '/identity/smart-wallet/guides/sub-accounts/creating-sub-accounts',
                  },
                  {
                    text: 'Using Sub Accounts',
                    link: '/identity/smart-wallet/guides/sub-accounts/using-sub-accounts',
                  },
                  {
                    text: 'Incorporate Spend Permissions',
                    link: '/identity/smart-wallet/guides/sub-accounts/incorporate-spend-permissions',
                  },
                ],
              },
              {
                text: 'Spend Permissions',
                collapsed: true,
                link: '/identity/smart-wallet/guides/spend-permissions',
              },
            ],
          },
          {
            text: 'Technical Reference',
            items: [
              {
                text: 'Coinbase Wallet SDK',
                collapsed: true,
                link: '/identity/smart-wallet/technical-reference/sdk',
                items: [
                  {
                    text: 'eth_accounts',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_accounts',
                  },
                  {
                    text: 'eth_blockNumber',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_blockNumber',
                  },
                  {
                    text: 'eth_chainId',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_chainId',
                  },
                  {
                    text: 'eth_coinbase',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_coinbase',
                  },
                  {
                    text: 'eth_estimateGas',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_estimateGas',
                  },
                  {
                    text: 'eth_feeHistory',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_feeHistory',
                  },
                  {
                    text: 'eth_gasPrice',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_gasPrice',
                  },
                  {
                    text: 'eth_getBalance',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getBalance',
                  },
                  {
                    text: 'eth_getBlockByHash',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getBlockByHash',
                  },
                  {
                    text: 'eth_getBlockByNumber',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getBlockByNumber',
                  },
                  {
                    text: 'eth_getBlockTransactionCountByHash',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getBlockTransactionCountByHash',
                  },
                  {
                    text: 'eth_getBlockTransactionCountByNumber',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getBlockTransactionCountByNumber',
                  },
                  {
                    text: 'eth_getCode',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getCode',
                  },
                  {
                    text: 'eth_getLogs',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getLogs',
                  },
                  {
                    text: 'eth_getProof',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getProof',
                  },
                  {
                    text: 'eth_getStorageAt',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getStorageAt',
                  },
                  {
                    text: 'eth_getTransactionByBlockHashAndIndex',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getTransactionByBlockHashAndIndex',
                  },
                  {
                    text: 'eth_getTransactionByBlockNumberAndIndex',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getTransactionByBlockNumberAndIndex',
                  },
                  {
                    text: 'eth_getTransactionByHash',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getTransactionByHash',
                  },
                  {
                    text: 'eth_getTransactionCount',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getTransactionCount',
                  },
                  {
                    text: 'eth_getTransactionReceipt',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getTransactionReceipt',
                  },
                  {
                    text: 'eth_getUncleCountByBlockHash',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getUncleCountByBlockHash',
                  },
                  {
                    text: 'eth_getUncleCountByBlockNumber',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_getUncleCountByBlockNumber',
                  },
                  {
                    text: 'eth_requestAccounts',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_requestAccounts',
                  },
                  {
                    text: 'eth_sendRawTransaction',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_sendRawTransaction',
                  },
                  {
                    text: 'eth_sendTransaction',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_sendTransaction',
                  },
                  {
                    text: 'eth_signTypedData_v4',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/eth_signTypedData_v4',
                  },
                  {
                    text: 'personal_sign',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/personal_sign',
                  },
                  {
                    text: 'wallet_addEthereumChain',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/wallet_addEthereumChain',
                  },
                  {
                    text: 'wallet_addSubAccount',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/wallet_addSubAccount',
                  },
                  {
                    text: 'wallet_connect',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/wallet_connect',
                  },
                  {
                    text: 'wallet_switchEthereumChain',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/wallet_switchEthereumChain',
                  },
                  {
                    text: 'wallet_watchAsset',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/wallet_watchAsset',
                  },
                  {
                    text: 'web3_clientVersion',
                    link: '/identity/smart-wallet/technical-reference/sdk/coinbasewalletprovider/web3_clientVersion',
                  },
                ],
              },
              {
                text: 'Spend Permissions',
                collapsed: true,
                items: [
                  {
                    text: 'Smart Contract Reference',
                    link: '/identity/smart-wallet/technical-reference/spend-permissions/spendpermissionmanager',
                  },
                  {
                    text: 'Fetch Permissions API',
                    link: '/identity/smart-wallet/technical-reference/spend-permissions/coinbase-fetchpermissions',
                  },
                ],
              },
              {
                text: 'Sub Accounts Reference',
                link: '/identity/smart-wallet/technical-reference/sdk/sub-account-reference',
              },
            ],
          },
          {
            text: 'Contribute',
            items: [
              {
                text: 'Contribute to Smart Wallet Docs',
                link: '/identity/smart-wallet/contribute/contribute-to-smart-wallet-docs',
              },
              {
                text: 'Security and Bug Bounty',
                link: '/identity/smart-wallet/contribute/security-and-bug-bounty',
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
              {
                text: 'Basenames Wagmi Tutorial',
                link: '/identity/basenames/basenames-wagmi-tutorial',
              },
              {
                text: 'Basenames OnchainKit Tutorial',
                link: '/identity/basenames/basenames-onchainkit-tutorial',
              },
            ],
          },
          {
            text: 'FAQ & Troubleshooting',
            items: [{ text: 'Basenames FAQ', link: '/identity/basenames/basenames-faq' }],
          },
        ],
      },
      {
        text: 'Verifications (CDP)↗',
        link: 'https://docs.cdp.coinbase.com/verifications/docs/welcome',
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
          { text: 'Why Base?', link: '/chain/why-base' },
          { text: 'Using Base', link: '/chain/using-base' },
          { text: 'Deploy on Base', link: '/chain/deploy-on-base-quickstart' },
          { text: 'Network Information', link: '/chain/network-information' },
          { text: 'Fees', link: '/chain/fees' },
          {
            text: 'Differences Between Ethereum and Base',
            link: '/chain/differences-between-ethereum-and-base',
          },
          { text: 'Run a Base Node', link: '/chain/run-a-base-node' },
          { text: 'Bridge an L1 Token to Base', link: '/chain/bridge-an-l1-token-to-base' },
          { text: 'Adding tokens to Coinbase Wallet', link: '/chain/wallet' },
          {
            text: 'Decentralizing Base with Optimism↗',
            link: 'https://base.mirror.xyz/H_KPwV31M7OJT-THUnU7wYjOF16Sy7aWvaEr5cgHi8I',
          },
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
      {
        text: 'Security',
        collapsed: true,
        items: [
          { text: 'Bug Bounty', link: '/chain/security/bounty' },
          { text: 'Report a Vulnerability', link: '/chain/security/report' },
          {
            text: 'How to avoid getting your app flagged as malicious',
            link: '/chain/security/app-blocklist',
          },
        ],
      },
      {
        text: 'Chain Stats ↗',
        link: 'https://www.base.org/stats',
      },
      {
        text: 'Flashblocks ↗',
        link: '/chain/flashblocks',
      },
      {
        text: 'Base Contracts',
        link: '/chain/base-contracts',
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
      },
    ],
  },
  {
    text: 'Cookbook',
    items: [
      {
        text: 'By use case',
        collapsed: true,
        items: [
          {
            text: 'Payments & Commerce',
            collapsed: true,
            items: [
              {
                text: 'Build an E-commerce App',
                link: '/cookbook/use-case-guides/commerce/build-an-ecommerce-app',
              },
              {
                text: 'Deploy a Shopify Storefront',
                link: '/cookbook/use-case-guides/commerce/deploy-a-shopify-storefront',
              },
              { text: 'Transaction Guide', link: '/cookbook/use-case-guides/transactions' },
            ],
          },
          {
            text: 'NFTs & Digital Assets',
            collapsed: true,
            items: [
              {
                text: 'NFT Minting with Zora',
                link: '/cookbook/use-case-guides/creator/nft-minting-with-zora',
              },
              { text: 'Simple Onchain NFTs', link: '/cookbook/nfts/simple-onchain-nfts' },
              { text: 'Dynamic NFTs', link: '/cookbook/nfts/dynamic-nfts' },
              { text: 'Complex Onchain NFTs', link: '/cookbook/nfts/complex-onchain-nfts' },
              { text: 'Signature Mint', link: '/cookbook/nfts/signature-mint' },
              {
                text: 'ThirdWeb Unreal NFT Items',
                link: '/cookbook/nfts/thirdweb-unreal-nft-items',
              },
            ],
          },
          {
            text: 'Social',
            collapsed: true,
            items: [
              {
                text: 'Farcaster No-Code NFT Minting',
                link: '/cookbook/use-case-guides/no-code-minting',
              },
              {
                text: 'Farcaster NFT Minting Guide',
                link: '/cookbook/use-case-guides/nft-minting',
              },
              {
                text: 'Convert Farcaster Frame to Open Frame',
                link: '/cookbook/use-case-guides/creator/convert-farcaster-frame-to-open-frame',
              },
            ],
          },
          {
            text: 'DeFi & Financial Tools',
            collapsed: true,
            items: [
              {
                text: 'Add In-App Funding (Onramp)',
                link: '/cookbook/use-case-guides/finance/build-a-smart-wallet-funding-app',
              },
              {
                text: 'Access Real-World Data (Chainlink)',
                link: '/cookbook/use-case-guides/finance/access-real-world-data-chainlink',
              },
              {
                text: 'Access Real-Time Asset Data (Pyth)',
                link: '/cookbook/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds',
              },
            ],
          },
          {
            text: 'Growth & Distribution',
            collapsed: true,
            items: [
              { text: 'Cast Actions', link: '/cookbook/use-case-guides/cast-actions' },
              { text: 'Hyperframes', link: '/cookbook/use-case-guides/hyperframes' },
              { text: 'Deploy to Vercel', link: '/cookbook/use-case-guides/deploy-to-vercel' },
              {
                text: 'Gating and Redirects',
                link: '/cookbook/use-case-guides/gating-and-redirects',
              },
              { text: 'Email Campaigns', link: '/cookbook/use-case-guides/create-email-campaigns' },
              { text: 'Retaining Users', link: '/cookbook/use-case-guides/retaining-users' },
            ],
          },
        ],
      },
      {
        text: 'By tool',
        collapsed: true,
        items: [
          {
            text: 'Smart Contract Development',
            collapsed: true,
            items: [
              {
                text: 'Hardhat',
                items: [
                  {
                    text: 'Deploy with Hardhat',
                    link: '/cookbook/smart-contract-development/hardhat/deploy-with-hardhat',
                  },
                  {
                    text: 'Debugging Smart Contracts',
                    link: '/cookbook/smart-contract-development/hardhat/debugging-smart-contracts',
                  },
                  {
                    text: 'Optimizing Gas Usage',
                    link: '/cookbook/smart-contract-development/hardhat/optimizing-gas-usage',
                  },
                  {
                    text: 'Reducing Contract Size',
                    link: '/cookbook/smart-contract-development/hardhat/reducing-contract-size',
                  },
                  {
                    text: 'Analyzing Test Coverage',
                    link: '/cookbook/smart-contract-development/hardhat/analyzing-test-coverage',
                  },
                ],
              },
              {
                text: 'Foundry',
                items: [
                  {
                    text: 'Deploy with Foundry',
                    link: '/cookbook/smart-contract-development/foundry/deploy-with-foundry',
                  },
                  {
                    text: 'Setup with Base',
                    link: '/cookbook/smart-contract-development/foundry/setup-with-base',
                  },
                  {
                    text: 'Testing Smart Contracts',
                    link: '/cookbook/smart-contract-development/foundry/testing-smart-contracts',
                  },
                  {
                    text: 'Verify Contract with Basescan',
                    link: '/cookbook/smart-contract-development/foundry/verify-contract-with-basescan',
                  },
                  {
                    text: 'Generate Random Numbers',
                    link: '/cookbook/smart-contract-development/foundry/generate-random-numbers-contracts',
                  },
                ],
              },
              {
                text: 'Remix',
                items: [
                  {
                    text: 'Deploy with Remix',
                    link: '/cookbook/smart-contract-development/remix/deploy-with-remix',
                  },
                ],
              },
              {
                text: 'Tenderly',
                items: [
                  {
                    text: 'Deploy with Tenderly',
                    link: '/cookbook/smart-contract-development/tenderly/deploy-with-tenderly',
                  },
                ],
              },
              {
                text: 'ThirdWeb',
                items: [
                  {
                    text: 'Deploy with ThirdWeb',
                    link: '/cookbook/smart-contract-development/thirdweb/deploy-with-thirdweb',
                  },
                  {
                    text: 'Build with ThirdWeb',
                    link: '/cookbook/smart-contract-development/thirdweb/build-with-thirdweb',
                  },
                  {
                    text: 'ThirdWeb SDK',
                    link: '/cookbook/smart-contract-development/thirdweb/thirdweb-sdk',
                  },
                  {
                    text: 'ThirdWeb CLI',
                    link: '/cookbook/smart-contract-development/thirdweb/thirdweb-cli',
                  },
                ],
              },
            ],
          },
          {
            text: 'IPFS',
            items: [{ text: 'Deploy with Fleek', link: '/cookbook/ipfs/deploy-with-fleek' }],
          },
          {
            text: 'Token Gating',
            items: [
              {
                text: 'Gate IRL Events with Nouns',
                link: '/cookbook/token-gating/gate-irl-events-with-nouns',
              },
            ],
          },
          {
            text: 'Client-Side Development',
            items: [
              {
                text: 'Introduction to Providers',
                link: '/cookbook/client-side-development/introduction-to-providers',
              },
            ],
          },
          {
            text: 'Account Abstraction',
            items: [
              {
                text: 'Using Biconomy',
                link: '/cookbook/account-abstraction/account-abstraction-on-base-using-biconomy',
              },
              {
                text: 'Using Particle Network',
                link: '/cookbook/account-abstraction/account-abstraction-on-base-using-particle-network',
              },
              {
                text: 'Using Privy and Base Paymaster',
                link: '/cookbook/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster',
              },
              {
                text: 'Gasless Transactions with Paymaster',
                link: '/cookbook/account-abstraction/gasless-transactions-with-paymaster',
              },
            ],
          },
          {
            text: 'Cross-Chain',
            items: [
              {
                text: 'Bridge Tokens with LayerZero',
                link: '/cookbook/cross-chain/bridge-tokens-with-layerzero',
              },
              {
                text: 'Send Messages and Tokens from Base (Chainlink)',
                link: '/cookbook/cross-chain/send-messages-and-tokens-from-base-chainlink',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    text: 'Learn',
    collapsed: true,
    items: [
      {
        text: 'Welcome',
        link: '/learn/welcome',
      },
      {
        text: 'Introduction to Ethereum',
        collapsed: true,
        items: [
          {
            text: 'Intro to Ethereum',
            link: '/learn/introduction-to-ethereum/intro-to-ethereum-vid',
          },
          {
            text: 'Ethereum Dev Overview',
            link: '/learn/introduction-to-ethereum/ethereum-dev-overview-vid',
          },
          {
            text: 'Ethereum Applications',
            link: '/learn/introduction-to-ethereum/ethereum-applications',
          },
          {
            text: 'Gas Use in ETH Transactions',
            link: '/learn/introduction-to-ethereum/gas-use-in-eth-transactions',
          },
          { text: 'EVM Diagram', link: '/learn/introduction-to-ethereum/evm-diagram' },
          {
            text: 'Guide to Base ↗',
            link: 'https://www.coinbase.com/cloud/discover/protocol-guides/guide-to-base',
          },
        ],
      },
      {
        text: 'Development Tools',
        collapsed: true,
        items: [{ text: 'Overview', link: '/learn/development-tools/overview' }],
      },
      {
        text: 'Development with Hardhat',
        collapsed: true,
        items: [
          {
            text: 'Hardhat Setup and Overview',
            items: [
              {
                text: 'Hardhat Overview',
                link: '/learn/hardhat-setup-overview/hardhat-overview-vid',
              },
              {
                text: 'Creating a Project',
                link: '/learn/hardhat-setup-overview/creating-a-project-vid',
              },
              {
                text: 'Setup Overview',
                link: '/learn/hardhat-setup-overview/hardhat-setup-overview-sbs',
              },
            ],
          },
          {
            text: 'Testing with Typescript',
            items: [
              { text: 'Testing Overview', link: '/learn/hardhat-testing/testing-overview-vid' },
              { text: 'Writing Tests', link: '/learn/hardhat-testing/writing-tests-vid' },
              {
                text: 'Contract ABI and Testing',
                link: '/learn/hardhat-testing/contract-abi-and-testing-vid',
              },
              { text: 'Testing Step by Step', link: '/learn/hardhat-testing/hardhat-testing-sbs' },
            ],
          },
          {
            text: 'Etherscan',
            items: [
              { text: 'Step by Step Guide', link: '/learn/etherscan/etherscan-sbs' },
              { text: 'Video Tutorial', link: '/learn/etherscan/etherscan-vid' },
            ],
          },
          {
            text: 'Deploying Smart Contracts',
            items: [
              {
                text: 'Installing Hardhat Deploy',
                link: '/learn/hardhat-deploy/installing-hardhat-deploy-vid',
              },
              {
                text: 'Setup Deploy Script',
                link: '/learn/hardhat-deploy/setup-deploy-script-vid',
              },
              {
                text: 'Testing Deployment',
                link: '/learn/hardhat-deploy/testing-our-deployment-vid',
              },
              {
                text: 'Network Configuration',
                link: '/learn/hardhat-deploy/test-network-configuration-vid',
              },
              { text: 'Deployment', link: '/learn/hardhat-deploy/deployment-vid' },
              { text: 'Step by Step Guide', link: '/learn/hardhat-deploy/hardhat-deploy-sbs' },
            ],
          },
          {
            text: 'Verifying Smart Contracts',
            items: [
              { text: 'Video Tutorial', link: '/learn/hardhat-verify/hardhat-verify-vid' },
              { text: 'Step by Step Guide', link: '/learn/hardhat-verify/hardhat-verify-sbs' },
            ],
          },
          {
            text: 'Mainnet Forking',
            items: [
              { text: 'Video Tutorial', link: '/learn/hardhat-forking/mainnet-forking-vid' },
              { text: 'Step by Step Guide', link: '/learn/hardhat-forking/hardhat-forking' },
            ],
          },
        ],
      },
      {
        text: 'Development With Foundry',
        collapsed: true,
        items: [
          {
            text: 'Introduction to Foundry ↗',
            link: 'https://docs.base.org/tutorials/intro-to-foundry-setup',
          },
          {
            text: 'Testing Smart Contracts ↗',
            link: 'https://docs.base.org/tutorials/intro-to-foundry-testing',
          },
        ],
      },
      {
        text: 'Smart Contract Development',
        collapsed: true,
        items: [
          {
            text: 'Introduction to Solidity',
            link: '/learn/introduction-to-solidity/introduction-to-solidity-overview',
          },
          {
            text: 'Anatomy of a Smart Contract',
            link: '/learn/introduction-to-solidity/anatomy-of-a-smart-contract-vid',
          },
          {
            text: 'Introduction to Solidity',
            items: [
              {
                text: 'Video Tutorial',
                link: '/learn/introduction-to-solidity/introduction-to-solidity-vid',
              },
              { text: 'Overview', link: '/learn/introduction-to-solidity/solidity-overview' },
              {
                text: 'Introduction to Remix',
                link: '/learn/introduction-to-solidity/introduction-to-remix-vid',
              },
              {
                text: 'Remix Guide',
                link: '/learn/introduction-to-solidity/introduction-to-remix',
              },
              {
                text: 'Deployment in Remix',
                link: '/learn/introduction-to-solidity/deployment-in-remix-vid',
              },
              {
                text: 'Step by Step Guide',
                link: '/learn/introduction-to-solidity/deployment-in-remix',
              },
            ],
          },
          {
            text: 'Contracts and Basic Functions',
            items: [
              {
                text: 'Introduction to Contracts',
                link: '/learn/contracts-and-basic-functions/intro-to-contracts-vid',
              },
              {
                text: 'Hello World Guide',
                link: '/learn/contracts-and-basic-functions/hello-world-step-by-step',
              },
              { text: 'Basic Types', link: '/learn/contracts-and-basic-functions/basic-types' },
              {
                text: 'Exercise',
                link: '/learn/contracts-and-basic-functions/basic-functions-exercise',
              },
            ],
          },
          {
            text: 'Deploying to a Testnet',
            items: [
              {
                text: 'Overview of Test Networks',
                link: '/learn/deployment-to-testnet/overview-of-test-networks-vid',
              },
              { text: 'Test Networks', link: '/learn/deployment-to-testnet/test-networks' },
              {
                text: 'Deploy to Base Sepolia',
                link: '/learn/deployment-to-testnet/deployment-to-base-sepolia-sbs',
              },
              {
                text: 'Contract Verification',
                link: '/learn/deployment-to-testnet/contract-verification-sbs',
              },
              {
                text: 'Exercise',
                link: '/learn/deployment-to-testnet/deployment-to-testnet-exercise',
              },
            ],
          },
          {
            text: 'Control Structures',
            items: [
              {
                text: 'Standard Control Structures',
                link: '/learn/control-structures/standard-control-structures-vid',
              },
              { text: 'Loops', link: '/learn/control-structures/loops-vid' },
              {
                text: 'Require, Revert, Error',
                link: '/learn/control-structures/require-revert-error-vid',
              },
              { text: 'Overview', link: '/learn/control-structures/control-structures' },
              { text: 'Exercise', link: '/learn/control-structures/control-structures-exercise' },
            ],
          },
          {
            text: 'Storage in Solidity',
            items: [
              { text: 'Simple Storage', link: '/learn/storage/simple-storage-video' },
              { text: 'Step by Step Guide', link: '/learn/storage/simple-storage-sbs' },
              { text: 'How Storage Works', link: '/learn/storage/how-storage-works-video' },
              { text: 'Storage Overview', link: '/learn/storage/how-storage-works' },
              { text: 'Exercise', link: '/learn/storage/storage-exercise' },
            ],
          },
          {
            text: 'Arrays in Solidity',
            items: [
              { text: 'Arrays Overview', link: '/learn/arrays/arrays-in-solidity-vid' },
              { text: 'Writing Arrays', link: '/learn/arrays/writing-arrays-in-solidity-vid' },
              { text: 'Arrays Guide', link: '/learn/arrays/arrays-in-solidity' },
              { text: 'Filtering Arrays', link: '/learn/arrays/filtering-an-array-sbs' },
              { text: 'Fixed Size Arrays', link: '/learn/arrays/fixed-size-arrays-vid' },
              { text: 'Array Storage Layout', link: '/learn/arrays/array-storage-layout-vid' },
              { text: 'Exercise', link: '/learn/arrays/arrays-exercise' },
            ],
          },
          {
            text: 'The Mapping Type',
            items: [
              { text: 'Mappings Overview', link: '/learn/mappings/mappings-vid' },
              { text: 'Using msg.sender', link: '/learn/mappings/using-msg-sender-vid' },
              { text: 'Step by Step Guide', link: '/learn/mappings/mappings-sbs' },
              {
                text: 'How Mappings are Stored',
                link: '/learn/mappings/how-mappings-are-stored-vid',
              },
              { text: 'Exercise', link: '/learn/mappings/mappings-exercise' },
            ],
          },
          {
            text: 'Advanced Functions',
            items: [
              {
                text: 'Function Visibility',
                link: '/learn/advanced-functions/function-visibility-vid',
              },
              {
                text: 'Visibility Overview',
                link: '/learn/advanced-functions/function-visibility',
              },
              {
                text: 'Function Modifiers',
                link: '/learn/advanced-functions/function-modifiers-vid',
              },
              { text: 'Modifiers Guide', link: '/learn/advanced-functions/function-modifiers' },
            ],
          },
          {
            text: 'Structs',
            items: [
              { text: 'Structs Overview', link: '/learn/structs/structs-vid' },
              { text: 'Step by Step Guide', link: '/learn/structs/structs-sbs' },
              { text: 'Exercise', link: '/learn/structs/structs-exercise' },
            ],
          },
          {
            text: 'Inheritance',
            items: [
              { text: 'Inheritance Overview', link: '/learn/inheritance/inheritance-vid' },
              { text: 'Step by Step Guide', link: '/learn/inheritance/inheritance-sbs' },
              { text: 'Multiple Inheritance', link: '/learn/inheritance/multiple-inheritance-vid' },
              {
                text: 'Multiple Inheritance Guide',
                link: '/learn/inheritance/multiple-inheritance',
              },
              { text: 'Abstract Contracts', link: '/learn/inheritance/abstract-contracts-vid' },
              {
                text: 'Abstract Contracts Guide',
                link: '/learn/inheritance/abstract-contracts-sbs',
              },
              { text: 'Exercise', link: '/learn/inheritance/inheritance-exercise' },
            ],
          },
          {
            text: 'Imports',
            items: [
              { text: 'Imports Overview', link: '/learn/imports/imports-vid' },
              { text: 'Step by Step Guide', link: '/learn/imports/imports-sbs' },
              { text: 'Exercise', link: '/learn/imports/imports-exercise' },
            ],
          },
          {
            text: 'Errors',
            items: [
              { text: 'Error Triage', link: '/learn/error-triage/error-triage-vid' },
              { text: 'Error Guide', link: '/learn/error-triage/error-triage' },
              { text: 'Exercise', link: '/learn/error-triage/error-triage-exercise' },
            ],
          },
          {
            text: 'The new Keyword',
            items: [
              {
                text: 'Creating New Contracts',
                link: '/learn/new-keyword/creating-a-new-contract-vid',
              },
              { text: 'Step by Step Guide', link: '/learn/new-keyword/new-keyword-sbs' },
              { text: 'Exercise', link: '/learn/new-keyword/new-keyword-exercise' },
            ],
          },
          {
            text: 'Contract to Contract Interactions',
            items: [
              { text: 'Intro to Interfaces', link: '/learn/interfaces/intro-to-interfaces-vid' },
              {
                text: 'Calling Another Contract',
                link: '/learn/interfaces/calling-another-contract-vid',
              },
              {
                text: 'Testing the Interface',
                link: '/learn/interfaces/testing-the-interface-vid',
              },
              {
                text: 'Step by Step Guide',
                link: '/learn/interfaces/contract-to-contract-interaction',
              },
            ],
          },
          {
            text: 'Events',
            items: [{ text: 'Step by Step Guide', link: '/learn/events/hardhat-events-sbs' }],
          },
          {
            text: 'Address and Payable',
            items: [{ text: 'Guide', link: '/learn/address-and-payable/address-and-payable' }],
          },
        ],
      },
      {
        text: 'Token Development',
        collapsed: true,
        items: [
          {
            text: 'Introduction to Tokens',
            items: [
              { text: 'Tokens Overview', link: '/learn/intro-to-tokens/intro-to-tokens-vid' },
              {
                text: 'Common Misconceptions',
                link: '/learn/intro-to-tokens/misconceptions-about-tokens-vid',
              },
              { text: 'Overview Guide', link: '/learn/intro-to-tokens/tokens-overview' },
            ],
          },
          {
            text: 'Minimal Tokens',
            items: [
              {
                text: 'Creating a Minimal Token',
                link: '/learn/minimal-tokens/creating-a-minimal-token-vid',
              },
              {
                text: 'Transferring Tokens',
                link: '/learn/minimal-tokens/transferring-a-minimal-token-vid',
              },
              { text: 'Step by Step Guide', link: '/learn/minimal-tokens/minimal-token-sbs' },
              { text: 'Exercise', link: '/learn/minimal-tokens/minimal-tokens-exercise' },
            ],
          },
          {
            text: 'ERC-20 Tokens',
            items: [
              { text: 'Analyzing ERC-20', link: '/learn/erc-20-token/analyzing-erc-20-vid' },
              { text: 'ERC-20 Standard', link: '/learn/erc-20-token/erc-20-standard' },
              { text: 'OpenZeppelin ERC-20', link: '/learn/erc-20-token/openzeppelin-erc-20-vid' },
              { text: 'Testing ERC-20', link: '/learn/erc-20-token/erc-20-testing-vid' },
              { text: 'Step by Step Guide', link: '/learn/erc-20-token/erc-20-token-sbs' },
              { text: 'Exercise', link: '/learn/erc-20-token/erc-20-exercise' },
            ],
          },
          {
            text: 'ERC-721 Tokens',
            items: [
              { text: 'ERC-721 Standard', link: '/learn/erc-721-token/erc-721-standard-video' },
              { text: 'Standard Overview', link: '/learn/erc-721-token/erc-721-standard' },
              { text: 'OpenSea Integration', link: '/learn/erc-721-token/erc-721-on-opensea-vid' },
              {
                text: 'OpenZeppelin ERC-721',
                link: '/learn/erc-721-token/openzeppelin-erc-721-vid',
              },
              {
                text: 'Implementation Guide',
                link: '/learn/erc-721-token/implementing-an-erc-721-vid',
              },
              { text: 'Step by Step Guide', link: '/learn/erc-721-token/erc-721-sbs' },
              { text: 'Exercise', link: '/learn/erc-721-token/erc-721-exercise' },
            ],
          },
        ],
      },
      {
        text: 'Hardhat Tools and Testing',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/learn/hardhat-tools-and-testing/overview' },
          {
            text: 'Profiling Gas ↗',
            link: 'https://docs.base.org/tutorials/hardhat-profiling-gas',
          },
          {
            text: 'Profiling Size ↗',
            link: 'https://docs.base.org/tutorials/hardhat-profiling-size',
          },
          { text: 'Debugging ↗', link: 'https://docs.base.org/tutorials/hardhat-debugging' },
          {
            text: 'Test Coverage ↗',
            link: 'https://docs.base.org/tutorials/hardhat-test-coverage',
          },
        ],
      },
      {
        text: 'Onchain App Development',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/learn/frontend-setup/overview' },
          {
            text: 'Frontend Setup',
            items: [
              { text: 'Wallet Connectors', link: '/learn/frontend-setup/wallet-connectors' },
              {
                text: 'Building an Onchain App',
                link: '/learn/frontend-setup/building-an-onchain-app',
              },
            ],
          },
          {
            text: 'Connecting to the Blockchain ↗',
            link: 'https://docs.base.org/tutorials/intro-to-providers',
          },
          {
            text: 'Reading and Displaying Data',
            items: [
              { text: 'useAccount', link: '/learn/reading-and-displaying-data/useAccount' },
              {
                text: 'useReadContract',
                link: '/learn/reading-and-displaying-data/useReadContract',
              },
              {
                text: 'Configuring useReadContract',
                link: '/learn/reading-and-displaying-data/configuring-useReadContract',
              },
            ],
          },
          {
            text: 'Writing to Contracts',
            items: [
              { text: 'useWriteContract', link: '/learn/writing-to-contracts/useWriteContract' },
              {
                text: 'useSimulateContract',
                link: '/learn/writing-to-contracts/useSimulateContract',
              },
            ],
          },
        ],
      },
      {
        text: 'Exercise Contracts',
        link: '/learn/exercise-contracts',
      },
      {
        text: 'Get help↗',
        link: 'https://discord.com/invite/buildonbase',
      },
    ],
  },
  {
    text: 'Buildathons',
    collapsed: true,
    items: [{ text: '2025-02-flash', link: '/buildathons/2025-02-flash' }],
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
        link: 'https://hackerone.com/coinbase',
      },
    ],
  },
];
