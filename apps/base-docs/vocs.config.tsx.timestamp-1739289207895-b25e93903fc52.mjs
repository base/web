// vocs.config.tsx
import { defineConfig } from "file:///Users/ericbrown/code/base/vocs-mvp/node_modules/vocs/_lib/index.js";

// sidebar.ts
var sidebar = {
  "/get-started": [
    {
      text: "Overview",
      link: "/get-started",
      collapsed: false
    },
    {
      text: "Quickstart",
      link: "/get-started/quickstart",
      items: [
        { text: "Deploy On Base", link: "/get-started/deploy-on-base-quickstart" }
      ]
    },
    {
      text: "Introduction",
      items: [
        { text: "Why Base?", link: "/get-started/why-base" },
        { text: "Explore All Tools", link: "/get-started/explore-all-tools" },
        { text: "Docs Tour", link: "/get-started/docs-tour" }
      ]
    },
    {
      text: "Building on Base",
      items: [
        { text: "Overview", link: "/get-started/building-onchain/overview" },
        { text: "The Onchain Tech Stack", link: "/get-started/building-onchain/the-onchain-tech-stack" },
        {
          text: "Unique Aspects of Building Onchain",
          link: "/get-started/building-onchain/unique-aspects-of-building-onchain",
          items: [
            { text: "Accounts and Wallets", link: "/get-started/building-onchain/unique-aspects-of-building-onchain" },
            { text: "Onchain Identity", link: "/get-started/building-onchain/onchain-identity" },
            { text: "Submitting Transactions", link: "/get-started/building-onchain/submitting-transactions" },
            { text: "Paying for Transactions", link: "/get-started/building-onchain/paying-for-transactions" },
            { text: "Connecting your Frontend", link: "/get-started/building-onchain/connecting-your-frontend" },
            { text: "Funding Wallets (Onramps)", link: "/get-started/building-onchain/funding-wallets-onramps" },
            { text: "Onchain Social Networks", link: "/get-started/building-onchain/onchain-social-networks" },
            { text: "Onchain AI Agents", link: "/get-started/building-onchain/onchain-ai-agents" }
          ]
        },
        { text: "Onchain Development Lifecycle", link: "/get-started/building-onchain/onchain-development-lifecycle" },
        { text: "An Opinionated Stack", link: "/get-started/building-onchain/an-opinionated-stack" },
        { text: "Continue Building Onchain", link: "/get-started/building-onchain/continue-building-onchain" }
      ]
    }
  ],
  "/docs": [
    {
      text: "Overview",
      link: "/docs"
    },
    {
      text: "Kits",
      collapsed: false,
      items: [
        {
          text: "OnchainKit",
          collapsed: true,
          items: [
            {
              text: "Introduction",
              items: [{ text: "Getting Started", link: "/docs/kits/onchainkit/getting-started" }]
            },
            {
              text: "Installation",
              items: [
                { text: "Next.js", link: "/docs/kits/onchainkit/installation/nextjs" },
                { text: "Vite", link: "/docs/kits/onchainkit/installation/vite" },
                { text: "Remix", link: "/docs/kits/onchainkit/installation/remix" },
                { text: "Astro", link: "/docs/kits/onchainkit/installation/astro" }
              ]
            },
            {
              text: "Config",
              items: [
                {
                  text: "OnchainKitProvider",
                  link: "/docs/kits/onchainkit/config/onchainkit-provider"
                }
              ]
            },
            {
              text: "Contribution",
              items: [
                {
                  text: "How to Contribute",
                  link: "/docs/kits/onchainkit/guides/contribution"
                },
                {
                  text: "Report a Bug",
                  link: "/docs/kits/onchainkit/guides/reporting-bug"
                }
              ]
            },
            {
              text: "Guides",
              items: [
                {
                  text: "Lifecycle Status",
                  link: "/docs/kits/onchainkit/guides/lifecycle-status"
                },
                {
                  text: "Tailwind CSS Integration",
                  link: "/docs/kits/onchainkit/guides/tailwind"
                },
                {
                  text: "Theme Customization",
                  link: "/docs/kits/onchainkit/guides/themes"
                },
                {
                  text: "Use Basename",
                  link: "/docs/kits/onchainkit/guides/use-basename-in-onchain-app"
                }
              ]
            },
            {
              text: "Templates",
              items: [
                {
                  text: "Onchain NFT App",
                  link: "https://ock-mint.vercel.app/"
                },
                {
                  text: "Onchain Commerce App",
                  link: "https://onchain-commerce-template.vercel.app/"
                },
                {
                  text: "Onchain Social Profile",
                  link: "https://github.com/fakepixels/ock-identity"
                }
              ]
            },
            {
              text: "Components",
              items: [
                {
                  text: "Checkout",
                  items: [
                    {
                      text: "Checkout",
                      link: "/docs/kits/onchainkit/checkout/checkout"
                    }
                  ]
                },
                {
                  text: "Frame",
                  items: [
                    {
                      text: "FrameMetadata",
                      link: "/docs/kits/onchainkit/frame/frame-metadata"
                    }
                  ]
                },
                {
                  text: "Fund",
                  items: [
                    {
                      text: "FundButton",
                      link: "/docs/kits/onchainkit/fund/fund-button"
                    }
                  ]
                },
                {
                  text: "Identity",
                  items: [
                    {
                      text: "Identity",
                      link: "/docs/kits/onchainkit/identity/identity"
                    },
                    {
                      text: "Address",
                      link: "/docs/kits/onchainkit/identity/address"
                    },
                    {
                      text: "Avatar",
                      link: "/docs/kits/onchainkit/identity/avatar"
                    },
                    {
                      text: "Badge",
                      link: "/docs/kits/onchainkit/identity/badge"
                    },
                    {
                      text: "IdentityCard",
                      link: "/docs/kits/onchainkit/identity/identity-card"
                    },
                    {
                      text: "Name",
                      link: "/docs/kits/onchainkit/identity/name"
                    },
                    {
                      text: "Socials",
                      link: "/docs/kits/onchainkit/identity/socials"
                    }
                  ]
                },
                {
                  text: "Mint",
                  items: [
                    {
                      text: "NFTCard",
                      link: "/docs/kits/onchainkit/mint/nft-card"
                    },
                    {
                      text: "NFTMintCard",
                      link: "/docs/kits/onchainkit/mint/nft-mint-card"
                    }
                  ]
                },
                {
                  text: "Swap",
                  items: [
                    {
                      text: "Swap",
                      link: "/docs/kits/onchainkit/swap/swap"
                    },
                    {
                      text: "SwapSettings",
                      link: "/docs/kits/onchainkit/swap/swap-settings"
                    }
                  ]
                },
                {
                  text: "Token",
                  items: [
                    {
                      text: "TokenChip",
                      link: "/docs/kits/onchainkit/token/token-chip"
                    },
                    {
                      text: "TokenImage",
                      link: "/docs/kits/onchainkit/token/token-image"
                    },
                    {
                      text: "TokenRow",
                      link: "/docs/kits/onchainkit/token/token-row"
                    },
                    {
                      text: "TokenSearch",
                      link: "/docs/kits/onchainkit/token/token-search"
                    },
                    {
                      text: "TokenSelectDropdown",
                      link: "/docs/kits/onchainkit/token/token-select-dropdown"
                    }
                  ]
                },
                {
                  text: "Transaction",
                  items: [
                    {
                      text: "Transaction",
                      link: "/docs/kits/onchainkit/transaction/transaction"
                    }
                  ]
                },
                {
                  text: "Wallet",
                  items: [
                    {
                      text: "Wallet",
                      link: "/docs/kits/onchainkit/wallet/wallet"
                    },
                    {
                      text: "WalletDropdownBasename",
                      link: "/docs/kits/onchainkit/wallet/wallet-dropdown-basename"
                    },
                    {
                      text: "WalletDropdownDisconnect",
                      link: "/docs/kits/onchainkit/wallet/wallet-dropdown-disconnect"
                    },
                    {
                      text: "WalletDropdownFundLink",
                      link: "/docs/kits/onchainkit/wallet/wallet-dropdown-fund-link"
                    },
                    {
                      text: "WalletDropdownLink",
                      link: "/docs/kits/onchainkit/wallet/wallet-dropdown-link"
                    }
                  ]
                }
              ]
            },
            {
              text: "API",
              items: [
                {
                  text: "Mint",
                  items: [
                    {
                      text: "getTokenDetails",
                      link: "/docs/kits/onchainkit/api/get-token-details"
                    },
                    {
                      text: "getMintDetails",
                      link: "/docs/kits/onchainkit/api/get-mint-details"
                    },
                    {
                      text: "buildMintTransaction",
                      link: "/docs/kits/onchainkit/api/build-mint-transaction"
                    }
                  ]
                },
                {
                  text: "Swap",
                  items: [
                    {
                      text: "buildSwapTransaction",
                      link: "/docs/kits/onchainkit/api/build-swap-transaction"
                    },
                    {
                      text: "getSwapQuote",
                      link: "/docs/kits/onchainkit/api/get-swap-quote"
                    }
                  ]
                },
                {
                  text: "Token",
                  items: [
                    {
                      text: "getTokens",
                      link: "/docs/kits/onchainkit/api/get-tokens"
                    }
                  ]
                }
              ]
            },
            {
              text: "Utilities",
              collapsed: true,
              items: [
                {
                  text: "Config",
                  items: [
                    {
                      text: "isBase",
                      link: "/docs/kits/onchainkit/config/is-base"
                    },
                    {
                      text: "isEthereum",
                      link: "/docs/kits/onchainkit/config/is-ethereum"
                    }
                  ]
                },
                {
                  text: "Fund",
                  items: [
                    {
                      text: "getOnrampBuyUrl",
                      link: "/docs/kits/onchainkit/fund/get-onramp-buy-url"
                    }
                  ]
                },
                {
                  text: "Frame",
                  items: [
                    {
                      text: "getFarcasterUserAddress",
                      link: "/docs/kits/onchainkit/farcaster/get-farcaster-user-address"
                    },
                    {
                      text: "getFrameHtmlResponse",
                      link: "/docs/kits/onchainkit/frame/get-frame-html-response"
                    },
                    {
                      text: "getFrameMessage",
                      link: "/docs/kits/onchainkit/frame/get-frame-message"
                    },
                    {
                      text: "getFrameMetadata",
                      link: "/docs/kits/onchainkit/frame/get-frame-metadata"
                    },
                    {
                      text: "getXmtpFrameMessage",
                      link: "/docs/kits/onchainkit/xmtp/get-xmtp-frame-message"
                    },
                    {
                      text: "isXmtpFrameRequest",
                      link: "/docs/kits/onchainkit/xmtp/is-xmtp-frame-request"
                    }
                  ]
                },
                {
                  text: "Identity",
                  items: [
                    {
                      text: "getAddress",
                      link: "/docs/kits/onchainkit/identity/get-address"
                    },
                    {
                      text: "getAttestations",
                      link: "/docs/kits/onchainkit/identity/get-attestations"
                    },
                    {
                      text: "getAvatar",
                      link: "/docs/kits/onchainkit/identity/get-avatar"
                    },
                    {
                      text: "getName",
                      link: "/docs/kits/onchainkit/identity/get-name"
                    },
                    {
                      text: "useAddress",
                      link: "/docs/kits/onchainkit/identity/use-address"
                    },
                    {
                      text: "useAvatar",
                      link: "/docs/kits/onchainkit/identity/use-avatar"
                    },
                    {
                      text: "useName",
                      link: "/docs/kits/onchainkit/identity/use-name"
                    }
                  ]
                },
                {
                  text: "Token",
                  items: [
                    {
                      text: "formatAmount",
                      link: "/docs/kits/onchainkit/token/format-amount"
                    }
                  ]
                },
                {
                  text: "Wallet",
                  items: [
                    {
                      text: "isValidAAEntrypoint",
                      link: "/docs/kits/onchainkit/wallet/is-valid-aa-entrypoint"
                    },
                    {
                      text: "isWalletACoinbaseSmartWallet",
                      link: "/docs/kits/onchainkit/wallet/is-wallet-a-coinbase-smart-wallet"
                    }
                  ]
                }
              ]
            },
            {
              text: "Types",
              collapsed: true,
              items: [
                {
                  text: "API",
                  link: "/docs/kits/onchainkit/api/types"
                },
                {
                  text: "Checkout",
                  link: "/docs/kits/onchainkit/checkout/types"
                },
                {
                  text: "Config",
                  link: "/docs/kits/onchainkit/config/types"
                },
                {
                  text: "Farcaster",
                  link: "/docs/kits/onchainkit/farcaster/types"
                },
                {
                  text: "Fund",
                  link: "/docs/kits/onchainkit/fund/types"
                },
                {
                  text: "Frame",
                  link: "/docs/kits/onchainkit/frame/types"
                },
                {
                  text: "Identity",
                  link: "/docs/kits/onchainkit/identity/types"
                },
                {
                  text: "Mint",
                  link: "/docs/kits/onchainkit/mint/types"
                },
                {
                  text: "Swap",
                  link: "/docs/kits/onchainkit/swap/types"
                },
                {
                  text: "Token",
                  link: "/docs/kits/onchainkit/token/types"
                },
                {
                  text: "Transaction",
                  link: "/docs/kits/onchainkit/transaction/types"
                },
                {
                  text: "Wallet",
                  link: "/docs/kits/onchainkit/wallet/types"
                }
              ]
            }
          ]
        },
        {
          text: "AgentKit",
          collapsed: true,
          items: [
            { text: "Overview", link: "/docs/kits/agentkit/index" }
          ]
        }
      ]
    },
    // {
    //   text: 'Paymaster',
    //   collapsed: true,
    //   items: [
    //     { text: 'Welcome', link: '/app-tools/paymaster/welcome' },
    //     {
    //       text: 'Quickstart',
    //       items: [
    //         { text: 'UI Integration Guide', link: '/app-tools/paymaster/quickstart-guide' },
    //         { text: 'Headless Integration Guide', link: '/app-tools/paymaster/quickstart-headless' },
    //       ],
    //     },
    //     {
    //       text: 'Tutorials',
    //       items: [
    //         { text: 'Gasless Transactions', link: '/app-tools/paymaster/gasless-transactions-with-paymaster' },
    //       ],
    //     },
    //     {
    //       text: 'Documentation',
    //       items: [
    //         { text: 'ERC20 Paymaster', link: '/app-tools/paymaster/erc20-paymaster' },
    //         { text: 'Security', link: '/app-tools/paymaster/security' },
    //         { text: 'Error Reference', link: '/app-tools/paymaster/errors' },
    //       ],
    //     },
    //     {
    //       text: 'FAQ & Troubleshooting',
    //       items: [
    //         { text: 'Troubleshooting Guide', link: '/app-tools/paymaster/troubleshooting' },
    //       ],
    //     },
    //   ],
    // },
    {
      text: "Identity",
      collapsed: false,
      items: [
        {
          text: "Smart Wallet",
          collapsed: true,
          items: [
            {
              text: "Quickstart Guide",
              items: [
                { text: "Quick Start", link: "/docs/identity/smart-wallet/quick-start" }
              ]
            },
            {
              text: "Introduction",
              items: [
                { text: "Why Smart Wallet", link: "/docs/identity/smart-wallet/why-smart-wallet" },
                { text: "Launch Ready Checklist", link: "/docs/identity/smart-wallet/launch-ready-checklist" },
                { text: "Wallet Library Support", link: "/docs/identity/smart-wallet/wallet-library-support" },
                { text: "Base Gasless Campaign", link: "/docs/identity/smart-wallet/base-gasless-campaign" }
              ]
            },
            {
              text: "Tutorials",
              items: [
                {
                  text: "Create a New Web App",
                  items: [
                    { text: "Using Onchain App Template", link: "/docs/identity/smart-wallet/guides/create-app/using-onchain-app-template" },
                    { text: "Using Wagmi", link: "/docs/identity/smart-wallet/guides/create-app/using-wagmi" }
                  ]
                },
                { text: "Update Existing App", link: "/docs/identity/smart-wallet/guides/update-existing-app" },
                { text: "React Native Integration", link: "/docs/identity/smart-wallet/guides/react-native-integration" },
                { text: "Create Wallet Button", link: "/docs/identity/smart-wallet/guides/components/create-wallet-button" },
                { text: "Signature Verification", link: "/docs/identity/smart-wallet/guides/signature-verification" },
                { text: "SIWE", link: "/docs/identity/smart-wallet/guides/siwe" },
                { text: "Batch Transactions", link: "/docs/identity/smart-wallet/guides/batch-transactions" },
                {
                  text: "Spend Permissions",
                  items: [
                    { text: "Overview", link: "/docs/identity/smart-wallet/guides/spend-permissions/overview" },
                    { text: "Quick Start", link: "/docs/identity/smart-wallet/guides/spend-permissions/quick-start" },
                    {
                      text: "API Reference",
                      items: [
                        { text: "Client Resources", link: "/docs/identity/smart-wallet/guides/spend-permissions/api-reference/client-resources" },
                        { text: "SpendPermissionManager", link: "/docs/identity/smart-wallet/guides/spend-permissions/api-reference/spendpermissionmanager" },
                        { text: "Wallet FetchPermissions", link: "/docs/identity/smart-wallet/guides/spend-permissions/api-reference/wallet-fetchpermissions" }
                      ]
                    }
                  ]
                },
                {
                  text: "Tips & Tricks",
                  items: [
                    { text: "Inspect Transaction Simulation", link: "/docs/identity/smart-wallet/guides/tips/inspect-txn-simulation" },
                    { text: "Popup Tips", link: "/docs/identity/smart-wallet/guides/tips/popup-tips" }
                  ]
                }
              ]
            },
            {
              text: "SDK",
              items: [
                {
                  text: "Getting Started",
                  link: "/docs/identity/smart-wallet/sdk/getting-started",
                  items: [{ text: "createCoinbaseWalletSDK", link: "/docs/identity/smart-wallet/sdk/create-coinbase-wallet-sdk" }]
                }
              ]
            },
            {
              text: "FAQ & Troubleshooting",
              items: [
                { text: "FAQ", link: "/docs/identity/smart-wallet/FAQ" }
              ]
            }
          ]
        },
        {
          text: "Sign in with Base",
          collapsed: true,
          items: [
            {
              text: "Wallet SDK",
              collapsed: true,
              items: [
                {
                  text: "Introduction",
                  items: [
                    { text: "Welcome", link: "/docs/identity/wallet-sdk/welcome" },
                    { text: "Wallet Features", link: "/docs/identity/wallet-sdk/wallet-features" },
                    { text: "Environments", link: "/docs/identity/wallet-sdk/environments" },
                    { text: "Whitelisted Networks", link: "/docs/identity/wallet-sdk/whitelisted-networks" },
                    { text: "Developer Settings", link: "/docs/identity/wallet-sdk/developer-settings" },
                    { text: "Injected Provider", link: "/docs/identity/wallet-sdk/injected-provider" }
                  ]
                },
                {
                  text: "Tutorials",
                  items: [
                    { text: "Adding Tokens to Coinbase Wallet", link: "/docs/identity/wallet-sdk/adding-tokens-to-coinbase-wallet" },
                    { text: "Sample Applications", link: "/docs/identity/wallet-sdk/sample-applications" }
                  ]
                },
                {
                  text: "Coinbase Wallet SDK",
                  items: [
                    { text: "Installing", link: "/docs/identity/wallet-sdk/installing" },
                    { text: "Setup", link: "/docs/identity/wallet-sdk/setup" },
                    {
                      text: "Making Requests",
                      items: [
                        { text: "Getting ETH Accounts", link: "/docs/identity/wallet-sdk/getting-eth-accounts" },
                        { text: "Switching Chains", link: "/docs/identity/wallet-sdk/switching-chains" },
                        { text: "Tracking Assets", link: "/docs/identity/wallet-sdk/tracking-assets" }
                      ]
                    },
                    { text: "Disconnecting Links", link: "/docs/identity/wallet-sdk/disconnecting-links" }
                  ]
                },
                {
                  text: "Coinbase Wallet Mobile SDK",
                  items: [
                    { text: "Mobile SDK Overview", link: "/docs/identity/wallet-sdk/mobile-sdk-overview" },
                    {
                      text: "iOS",
                      items: [
                        { text: "Installation", link: "/docs/identity/wallet-sdk/ios-install" },
                        { text: "Setup", link: "/docs/identity/wallet-sdk/ios-setup" },
                        { text: "Establishing a Connection", link: "/docs/identity/wallet-sdk/ios-establishing-a-connection" },
                        { text: "Making Requests", link: "/docs/identity/wallet-sdk/ios-making-requests" },
                        { text: "API Reference", link: "/docs/identity/wallet-sdk/ios-api-reference" }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              text: "Mobile Wallet Protocol",
              collapsed: true,
              items: [
                { text: "Overview", link: "/docs/identity/mobile-wallet-protocol/spec-overview" },
                {
                  text: "Messages",
                  link: "/docs/identity/mobile-wallet-protocol/messages-example",
                  items: [
                    { text: "Request Content", link: "/docs/identity/mobile-wallet-protocol/messages-request" },
                    { text: "Response Content", link: "/docs/identity/mobile-wallet-protocol/messages-response" }
                  ]
                },
                { text: "Batch Requests", link: "/docs/identity/mobile-wallet-protocol/batch" },
                { text: "Encryption", link: "/docs/identity/mobile-wallet-protocol/encryption" },
                { text: "Handshake", link: "/docs/identity/mobile-wallet-protocol/handshake" },
                { text: "Verification", link: "/docs/identity/mobile-wallet-protocol/verification" },
                { text: "Multi-chain", link: "/docs/identity/mobile-wallet-protocol/multi-chain" },
                { text: "Transport Layer", link: "/docs/identity/mobile-wallet-protocol/network" }
              ]
            }
          ]
        },
        {
          text: "Basenames",
          collapsed: true,
          items: [
            {
              text: "Tutorials",
              items: [
                { text: "Basenames Wagmi Tutorial", link: "/docs/identity/basenames/basenames-wagmi-tutorial" },
                { text: "Basenames OnchainKit Tutorial", link: "/docs/identity/basenames/basenames-onchainkit-tutorial" }
              ]
            },
            {
              text: "FAQ & Troubleshooting",
              items: [
                { text: "Basenames FAQ", link: "/docs/identity/basenames/basenames-faq" }
              ]
            }
          ]
        },
        {
          text: "Verifications",
          collapsed: true,
          items: [
            {
              text: "Quickstart",
              items: [
                { text: "Quickstart", link: "/docs/identity/verifications/quickstart" }
              ]
            },
            {
              text: "Introduction",
              items: [
                { text: "Welcome", link: "/docs/identity/verifications/welcome" },
                { text: "Use Cases", link: "/docs/identity/verifications/use-cases" }
              ]
            },
            {
              text: "Documentation",
              items: [
                { text: "Attestations", link: "/docs/identity/verifications/attestations" }
              ]
            },
            { text: "FAQ & Troubleshooting", link: "/docs/identity/verifications/faq-troubleshooting" },
            {
              text: "Support",
              items: [
                { text: "Discord Community", link: "/docs/identity/verifications/verifications-discord" }
              ]
            }
          ]
        }
      ]
    },
    {
      text: "Chain",
      items: [
        {
          text: "General",
          collapsed: true,
          items: [
            { text: "Network Information", link: "/docs/chain/network-information" },
            { text: "Fees", link: "/docs/chain/fees" },
            { text: "Differences Between Ethereum and Base", link: "/docs/chain/differences-between-ethereum-and-base" },
            { text: "Run a Base Node", link: "/docs/chain/run-a-base-node" },
            { text: "Bridge an L1 Token to Base", link: "/docs/chain/bridge-an-l1-token-to-base" }
          ]
        },
        {
          text: "Contracts",
          collapsed: true,
          items: [
            { text: "Base Contracts", link: "/docs/chain/base-contracts" }
          ]
        },
        {
          text: "Security",
          collapsed: true,
          items: [
            { text: "Security", link: "/docs/chain/security" }
          ]
        },
        {
          text: "OP Stack",
          collapsed: true,
          items: [
            { text: "Decentralizing Base with Optimism", link: "/docs/chain/decentralizing-base-with-optimism" }
          ]
        },
        {
          text: "Tools",
          collapsed: true,
          items: [
            { text: "Node Providers", link: "/docs/chain/node-providers" },
            { text: "Network Faucets", link: "/docs/chain/network-faucets" }
          ]
        }
      ]
    }
  ],
  "/guides": [
    {
      text: "Overview",
      link: "/guides"
    },
    {
      text: "Use Case Guides",
      items: [
        {
          text: "Payments & Commerce",
          items: [
            { text: "Accept Crypto Payments", link: "/guides/use-case-guides/commerce/accept-crypto-payments" },
            { text: "Build an E-commerce App", link: "/guides/use-case-guides/commerce/build-an-ecommerce-app" },
            { text: "Deploy a Shopify Storefront", link: "/guides/use-case-guides/commerce/deploy-a-shopify-storefront" },
            { text: "Transaction Guide", link: "/guides/life-cycle-guides/activating/transactions" }
          ]
        },
        {
          text: "NFTs & Digital Assets",
          items: [
            { text: "NFT Minting with Zora", link: "/guides/use-case-guides/creator/nft-minting-with-zora" },
            { text: "No-Code NFT Minting", link: "/guides/life-cycle-guides/activating/no-code-minting" },
            { text: "NFT Minting Guide", link: "/guides/life-cycle-guides/activating/nft-minting" },
            { text: "Convert Farcaster Frame to Open Frame", link: "/guides/use-case-guides/creator/convert-farcaster-frame-to-open-frame" }
          ]
        },
        {
          text: "DeFi & Financial Tools",
          items: [
            { text: "Add In-App Funding (Onramp)", link: "/guides/use-case-guides/finance/build-a-smart-wallet-funding-app" },
            { text: "Access Real-World Data (Chainlink)", link: "/guides/use-case-guides/finance/access-real-world-data-chainlink" },
            { text: "Access Real-Time Asset Data (Pyth)", link: "/guides/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds" }
          ]
        },
        {
          text: "Growth & Distribution",
          items: [
            {
              text: "Social & Distribution",
              items: [
                { text: "Cast Actions", link: "/guides/life-cycle-guides/growing/cast-actions" },
                { text: "Hyperframes", link: "/guides/life-cycle-guides/growing/hyperframes" }
              ]
            },
            {
              text: "Deployment & Access",
              items: [
                { text: "Deploy to Vercel", link: "/guides/life-cycle-guides/growing/deploy-to-vercel" },
                { text: "Gating and Redirects", link: "/guides/life-cycle-guides/growing/gating-and-redirects" }
              ]
            },
            {
              text: "User Engagement",
              items: [
                { text: "Email Campaigns", link: "/guides/life-cycle-guides/retaining/create-email-campaigns" }
              ]
            }
          ]
        }
      ]
    },
    {
      text: "General Development",
      items: [
        {
          text: "Smart Contract Development",
          items: [
            {
              text: "Hardhat",
              items: [
                { text: "Deploy with Hardhat", link: "/guides/general-development/smart-contract-development/hardhat/deploy-with-hardhat" },
                { text: "Debugging Smart Contracts", link: "/guides/general-development/smart-contract-development/hardhat/debugging-smart-contracts" },
                { text: "Optimizing Gas Usage", link: "/guides/general-development/smart-contract-development/hardhat/optimizing-gas-usage" },
                { text: "Reducing Contract Size", link: "/guides/general-development/smart-contract-development/hardhat/reducing-contract-size" },
                { text: "Analyzing Test Coverage", link: "/guides/general-development/smart-contract-development/hardhat/analyzing-test-coverage" }
              ]
            },
            {
              text: "Foundry",
              items: [
                { text: "Deploy with Foundry", link: "/guides/general-development/smart-contract-development/foundry/deploy-with-foundry" },
                { text: "Setup with Base", link: "/guides/general-development/smart-contract-development/foundry/setup-with-base" },
                { text: "Testing Smart Contracts", link: "/guides/general-development/smart-contract-development/foundry/testing-smart-contracts" }
              ]
            },
            {
              text: "Remix",
              items: [
                { text: "Deploy with Remix", link: "/guides/general-development/smart-contract-development/remix/deploy-with-remix" }
              ]
            },
            {
              text: "Tenderly",
              items: [
                { text: "Deploy with Tenderly", link: "/guides/general-development/smart-contract-development/tenderly/deploy-with-tenderly" }
              ]
            },
            {
              text: "ThirdWeb",
              items: [
                { text: "Deploy with ThirdWeb", link: "/guides/general-development/smart-contract-development/thirdweb/deploy-with-thirdweb" },
                { text: "Build with ThirdWeb", link: "/guides/general-development/smart-contract-development/thirdweb/build-with-thirdweb" },
                { text: "ThirdWeb SDK", link: "/guides/general-development/smart-contract-development/thirdweb/thirdweb-sdk" },
                { text: "ThirdWeb CLI", link: "/guides/general-development/smart-contract-development/thirdweb/thirdweb-cli" }
              ]
            }
          ]
        },
        {
          text: "NFTs",
          items: [
            { text: "Simple Onchain NFTs", link: "/guides/general-development/nfts/simple-onchain-nfts" },
            { text: "Dynamic NFTs", link: "/guides/general-development/nfts/dynamic-nfts" },
            { text: "Complex Onchain NFTs", link: "/guides/general-development/nfts/complex-onchain-nfts" },
            { text: "Signature Mint", link: "/guides/general-development/nfts/signature-mint" },
            { text: "ThirdWeb Unreal NFT Items", link: "/guides/general-development/nfts/thirdweb-unreal-nft-items" }
          ]
        },
        {
          text: "IPFS",
          items: [
            { text: "Deploy with Fleek", link: "/guides/general-development/ipfs/deploy-with-fleek" }
          ]
        },
        {
          text: "Token Gating",
          items: [
            { text: "Gate IRL Events with Nouns", link: "/guides/general-development/token-gating/gate-irl-events-with-nouns" }
          ]
        },
        {
          text: "Client-Side Development",
          items: [
            { text: "Introduction to Providers", link: "/guides/general-development/client-side-development/introduction-to-providers" }
          ]
        },
        {
          text: "Account Abstraction",
          items: [
            { text: "Using Biconomy", link: "/guides/general-development/account-abstraction/account-abstraction-on-base-using-biconomy" },
            { text: "Using Particle Network", link: "/guides/general-development/account-abstraction/account-abstraction-on-base-using-particle-network" },
            { text: "Using Privy and Base Paymaster", link: "/guides/general-development/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster" },
            { text: "Gasless Transactions with Paymaster", link: "/guides/general-development/account-abstraction/gasless-transactions-with-paymaster" }
          ]
        },
        {
          text: "Cross-Chain",
          items: [
            { text: "Bridge Tokens with LayerZero", link: "/guides/general-development/cross-chain/bridge-tokens-with-layerzero" },
            { text: "Send Messages and Tokens from Base (Chainlink)", link: "/guides/general-development/cross-chain/send-messages-and-tokens-chainlink" }
          ]
        }
      ]
    }
  ]
};

// vocs.config.tsx
import { ModuleKind, ModuleResolutionKind } from "file:///Users/ericbrown/code/base/vocs-mvp/node_modules/typescript/lib/typescript.js";
import path from "path";
import { Fragment, jsx, jsxs } from "file:///Users/ericbrown/code/base/vocs-mvp/node_modules/react/jsx-runtime.js";
var baseConfig = {
  //basePath: "https://docs.base.org/docs", // Comment out in local dev
  baseUrl: "/",
  title: "Base Docs",
  description: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2",
  iconUrl: {
    light: "img/favicon.ico",
    dark: "img/favicon.ico"
  }
  // logoUrl: {
  //   // light: ,
  //   // dark: ,
  // }
};
var bannerConfig = {
  // If we don't fork vocs, the banner can be overridden as seen below to add a header
  // banner: {
  //   content: (
  //     <div className="vocs_banner_content">
  //       <div className="left-column">
  //         {/* Optional: Add content here if needed in the future */}
  //       </div>
  //       <div className="center-column">
  //         <nav className="navigation-links">
  //           <a href="/">API</a>
  //           <a href="/docs">Tools</a>
  //           <a href="/blog">Blog</a>
  //           <a href="/community">Community</a>
  //         </nav>
  //       </div>
  //       <div className="right-column">
  //         <button
  //           className="connect-wallet-button"
  //           onClick={() => {
  //             // Add your wallet connection logic here
  //           }}
  //         >
  //           Connect Wallet
  //         </button>
  //       </div>
  //     </div>
  //   ),
  //   height: '99px', // Must match height in CSS
  //   dismissable: 'false', // Make it permanent
  //   backgroundColor: '#232225', // Charcoal color
  // }
};
var twoslashConfig = {
  twoslash: {
    compilerOptions: {
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      module: ModuleKind.NodeNext,
      //ModuleKind.Preserve
      moduleResolution: ModuleResolutionKind.NodeNext
    }
  }
};
var sidebarConfig = {
  sidebar
};
var topNavConfig = {
  topNav: [
    { text: "Get Started", link: "/get-started", match: "/get-started" },
    {
      text: "Docs",
      link: "/docs",
      match: "/docs"
    },
    {
      text: "Guides",
      link: "/guides",
      match: "/guides"
    },
    {
      text: "base.org",
      link: "https://base.org"
    }
  ],
  layout: "left"
};
var markdownConfig = {
  code: {
    themes: {
      light: "github-light",
      dark: "github-dark"
    }
  }
};
var pluggableConfig = {
  markdown: {
    remarkPlugins: [
      // Add your remark plugins here
    ]
  }
};
var blogConfig = {
  blogDir: "./blog"
};
var headConfig = {
  head: /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("meta", { property: "og:type", content: "website" }),
    /* @__PURE__ */ jsx("meta", { property: "og:title", content: "Base | Docs" }),
    /* @__PURE__ */ jsx("meta", { property: "og:image", content: "https://docs.base.org/img/base-open-graph.png" }),
    /* @__PURE__ */ jsx("meta", { property: "og:description", content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:title", content: "Base | Docs" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:image", content: "https://docs.base.org/img/base-open-graph.png" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:description", content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:card", content: "summary_large_image" }),
    /* @__PURE__ */ jsx("meta", { property: "twitter:domain", content: "base.org" })
  ] })
};
var searchConfig = {
  search: {
    fields: ["title", "content", "productLine", "docType", "userType"],
    // Fields to index
    storeFields: ["title", "snippet", "productLine", "docType"],
    // Fields to return in results
    searchOptions: {
      prefix: true,
      // Autocomplete
      fuzzy: 0.2,
      // Typo tolerance
      boost: { docType: { "API": 2, "Guide": 1.5 }, recencyScore: 2 },
      // Boosting by document type and recency
      filter: (doc) => doc.productLine === "Base Protocol" || doc.productLine === "OnchainKit",
      // Faceted search
      highlight: true,
      // Instant search result preview
      limit: 10
      // Pagination
    }
  }
};
var vocs_config_default = defineConfig({
  ...baseConfig,
  ...bannerConfig,
  ...sidebarConfig,
  ...topNavConfig,
  ...blogConfig,
  ...headConfig,
  ...markdownConfig,
  ...pluggableConfig,
  ...searchConfig,
  ...twoslashConfig,
  vite: {
    resolve: {
      alias: {
        "@": path.join(process.cwd(), "docs"),
        "@/components": path.join(process.cwd(), "docs/components"),
        "@/pages": path.join(process.cwd(), "docs/pages"),
        "@/styles": path.join(process.cwd(), "docs/styles"),
        "@/lib": path.join(process.cwd(), "docs/lib"),
        "@/utils": path.join(process.cwd(), "docs/utils"),
        "@/types": path.join(process.cwd(), "docs/types")
      }
    }
  }
});
export {
  vocs_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHN4IiwgInNpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZvY3MnXG5pbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSAnLi9zaWRlYmFyLnRzJ1xuaW1wb3J0IHsgTW9kdWxlS2luZCwgTW9kdWxlUmVzb2x1dGlvbktpbmQgfSBmcm9tICd0eXBlc2NyaXB0J1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgYmFzZUNvbmZpZyA9IHtcbiAgLy9iYXNlUGF0aDogXCJodHRwczovL2RvY3MuYmFzZS5vcmcvZG9jc1wiLCAvLyBDb21tZW50IG91dCBpbiBsb2NhbCBkZXZcbiAgYmFzZVVybDogJy8nLFxuICB0aXRsZTogJ0Jhc2UgRG9jcycsXG4gIGRlc2NyaXB0aW9uOiAnRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyJyxcbiAgaWNvblVybDoge1xuICAgIGxpZ2h0OiAnaW1nL2Zhdmljb24uaWNvJyxcbiAgICBkYXJrOiAnaW1nL2Zhdmljb24uaWNvJyxcbiAgfSxcbiAgLy8gbG9nb1VybDoge1xuICAvLyAgIC8vIGxpZ2h0OiAsXG4gIC8vICAgLy8gZGFyazogLFxuICAvLyB9XG59XG5cbi8vIHVzZWQgZm9yIGdsb2JhbCBkaXNtaXNzYWJsZSBhbm5vdW5jZW1lbnRzLCBldGNcbmNvbnN0IGJhbm5lckNvbmZpZyA9IHtcbiAgLy8gSWYgd2UgZG9uJ3QgZm9yayB2b2NzLCB0aGUgYmFubmVyIGNhbiBiZSBvdmVycmlkZGVuIGFzIHNlZW4gYmVsb3cgdG8gYWRkIGEgaGVhZGVyXG4gIC8vIGJhbm5lcjoge1xuICAvLyAgIGNvbnRlbnQ6IChcbiAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwidm9jc19iYW5uZXJfY29udGVudFwiPlxuICAvLyAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtY29sdW1uXCI+XG4gIC8vICAgICAgICAgey8qIE9wdGlvbmFsOiBBZGQgY29udGVudCBoZXJlIGlmIG5lZWRlZCBpbiB0aGUgZnV0dXJlICovfVxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXItY29sdW1uXCI+XG4gIC8vICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZpZ2F0aW9uLWxpbmtzXCI+XG4gIC8vICAgICAgICAgICA8YSBocmVmPVwiL1wiPkFQSTwvYT5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvZG9jc1wiPlRvb2xzPC9hPlxuICAvLyAgICAgICAgICAgPGEgaHJlZj1cIi9ibG9nXCI+QmxvZzwvYT5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvY29tbXVuaXR5XCI+Q29tbXVuaXR5PC9hPlxuICAvLyAgICAgICAgIDwvbmF2PlxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1jb2x1bW5cIj5cbiAgLy8gICAgICAgICA8YnV0dG9uXG4gIC8vICAgICAgICAgICBjbGFzc05hbWU9XCJjb25uZWN0LXdhbGxldC1idXR0b25cIlxuICAvLyAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAvLyAgICAgICAgICAgICAvLyBBZGQgeW91ciB3YWxsZXQgY29ubmVjdGlvbiBsb2dpYyBoZXJlXG4gIC8vICAgICAgICAgICB9fVxuICAvLyAgICAgICAgID5cbiAgLy8gICAgICAgICAgIENvbm5lY3QgV2FsbGV0XG4gIC8vICAgICAgICAgPC9idXR0b24+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgPC9kaXY+XG4gIC8vICAgKSxcbiAgLy8gICBoZWlnaHQ6ICc5OXB4JywgLy8gTXVzdCBtYXRjaCBoZWlnaHQgaW4gQ1NTXG4gIC8vICAgZGlzbWlzc2FibGU6ICdmYWxzZScsIC8vIE1ha2UgaXQgcGVybWFuZW50XG4gIC8vICAgYmFja2dyb3VuZENvbG9yOiAnIzIzMjIyNScsIC8vIENoYXJjb2FsIGNvbG9yXG4gIC8vIH1cbn1cblxuLy8gUmV1c2FibGUgbmF2IGxpbmsgc3R5bGVzIChpZiBub3QgdXNpbmcgVGFpbHdpbmQpXG5jb25zdCBuYXZMaW5rU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMnLFxuICAnOmhvdmVyJzogeyBvcGFjaXR5OiAwLjcgfSxcbn1cblxuY29uc3QgdHdvc2xhc2hDb25maWcgPSB7XG4gIHR3b3NsYXNoOiB7XG4gICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICBhbGxvd1VtZEdsb2JhbEFjY2VzczogdHJ1ZSxcbiAgICAgIGVzTW9kdWxlSW50ZXJvcDogdHJ1ZSxcbiAgICAgIG1vZHVsZTogTW9kdWxlS2luZC5Ob2RlTmV4dCwgLy9Nb2R1bGVLaW5kLlByZXNlcnZlXG4gICAgICBtb2R1bGVSZXNvbHV0aW9uOiBNb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlTmV4dCxcbiAgICB9LFxuICB9XG59XG5cbmNvbnN0IHNpZGViYXJDb25maWcgPSB7XG4gIHNpZGViYXI6IHNpZGViYXJcbn1cblxuY29uc3QgdG9wTmF2Q29uZmlnID0ge1xuICB0b3BOYXY6IFtcbiAgICB7IHRleHQ6ICdHZXQgU3RhcnRlZCcsIGxpbms6ICcvZ2V0LXN0YXJ0ZWQnLCBtYXRjaDogJy9nZXQtc3RhcnRlZCcgfSxcbiAgICB7IFxuICAgICAgdGV4dDogJ0RvY3MnLCBcbiAgICAgIGxpbms6ICcvZG9jcycsIFxuICAgICAgbWF0Y2g6ICcvZG9jcycsXG4gICAgfSxcbiAgICB7IFxuICAgICAgdGV4dDogJ0d1aWRlcycsIFxuICAgICAgbGluazogJy9ndWlkZXMnLCBcbiAgICAgIG1hdGNoOiAnL2d1aWRlcydcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdiYXNlLm9yZycsXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9iYXNlLm9yZycsXG4gICAgfVxuICBdLFxuICBsYXlvdXQ6ICdsZWZ0Jyxcbn1cblxuY29uc3QgbWFya2Rvd25Db25maWcgPSB7XG4gIGNvZGU6IHtcbiAgICB0aGVtZXM6IHtcbiAgICAgIGxpZ2h0OiAnZ2l0aHViLWxpZ2h0JyxcbiAgICAgIGRhcms6ICdnaXRodWItZGFyaycsXG4gICAgfVxuICB9XG59XG5cbi8vIHBsdWdpbnMgZm9yIHRyYW5zZm9ybWluZyBtYXJrZG93bjogaHR0cHM6Ly9naXRodWIuY29tL3JlbWFya2pzL3JlbWFyay9ibG9iL21haW4vZG9jL3BsdWdpbnMubWQjbGlzdC1vZi1wbHVnaW5zXG5jb25zdCBwbHVnZ2FibGVDb25maWcgPXtcbiAgbWFya2Rvd246IHtcbiAgICByZW1hcmtQbHVnaW5zOiBbXG4gICAgICAvLyBBZGQgeW91ciByZW1hcmsgcGx1Z2lucyBoZXJlXG4gICAgXVxuICB9XG59XG5cblxuY29uc3QgYmxvZ0NvbmZpZyA9IHtcbiAgYmxvZ0RpcjogXCIuL2Jsb2dcIlxufVxuXG4vLyBDYW4gZGVmaW5lIHBhdGggb2JqZWN0cyB3aGljaCByZXR1cm4gZGlmZmVyZW50IG1ldGEgdGFncyBmb3IgbW9yZSBjb250cm9sXG5jb25zdCBoZWFkQ29uZmlnID0ge1xuICBoZWFkOiAoXG4gICAgPD5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dHlwZVwiIGNvbnRlbnQ9XCJ3ZWJzaXRlXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6dGl0bGVcIiBjb250ZW50PVwiQmFzZSB8IERvY3NcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzppbWFnZVwiIGNvbnRlbnQ9XCJodHRwczovL2RvY3MuYmFzZS5vcmcvaW1nL2Jhc2Utb3Blbi1ncmFwaC5wbmdcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJvZzpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJFeHBsb3JlIHRoZSBkb2N1bWVudGF0aW9uIGZvciBCYXNlLCBhIHNlY3VyZSwgbG93LWNvc3QsIGJ1aWxkZXItZnJpZW5kbHkgRXRoZXJldW0gTDJcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOnRpdGxlXCIgY29udGVudD1cIkJhc2UgfCBEb2NzXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjppbWFnZVwiIGNvbnRlbnQ9XCJodHRwczovL2RvY3MuYmFzZS5vcmcvaW1nL2Jhc2Utb3Blbi1ncmFwaC5wbmdcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIgY29udGVudD1cIkV4cGxvcmUgdGhlIGRvY3VtZW50YXRpb24gZm9yIEJhc2UsIGEgc2VjdXJlLCBsb3ctY29zdCwgYnVpbGRlci1mcmllbmRseSBFdGhlcmV1bSBMMlwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6Y2FyZFwiIGNvbnRlbnQ9XCJzdW1tYXJ5X2xhcmdlX2ltYWdlXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjpkb21haW5cIiBjb250ZW50PVwiYmFzZS5vcmdcIiAvPlxuICAgIDwvPlxuICApLFxufVxuXG4vLyB2b2NzIHVzZXMgTWluaVNlYXJjaCwgY2hlY2sgY29uZmlnc1xuY29uc3Qgc2VhcmNoQ29uZmlnID0geyBcbiAgc2VhcmNoOiB7XG4gICAgZmllbGRzOiBbJ3RpdGxlJywgJ2NvbnRlbnQnLCAncHJvZHVjdExpbmUnLCAnZG9jVHlwZScsICd1c2VyVHlwZSddLCAgLy8gRmllbGRzIHRvIGluZGV4XG4gICAgc3RvcmVGaWVsZHM6IFsndGl0bGUnLCAnc25pcHBldCcsICdwcm9kdWN0TGluZScsICdkb2NUeXBlJ10sIC8vIEZpZWxkcyB0byByZXR1cm4gaW4gcmVzdWx0c1xuICAgIHNlYXJjaE9wdGlvbnM6IHtcbiAgICAgIHByZWZpeDogdHJ1ZSwgLy8gQXV0b2NvbXBsZXRlXG4gICAgICBmdXp6eTogMC4yLCAgLy8gVHlwbyB0b2xlcmFuY2VcbiAgICAgIGJvb3N0OiB7IGRvY1R5cGU6IHsgJ0FQSSc6IDIsICdHdWlkZSc6IDEuNSB9LCByZWNlbmN5U2NvcmU6IDIgfSwgLy8gQm9vc3RpbmcgYnkgZG9jdW1lbnQgdHlwZSBhbmQgcmVjZW5jeVxuICAgICAgZmlsdGVyOiAoZG9jOiB7IHByb2R1Y3RMaW5lOiBzdHJpbmcgfSkgPT4gXG4gICAgICAgIGRvYy5wcm9kdWN0TGluZSA9PT0gJ0Jhc2UgUHJvdG9jb2wnIHx8IGRvYy5wcm9kdWN0TGluZSA9PT0gJ09uY2hhaW5LaXQnLCAvLyBGYWNldGVkIHNlYXJjaFxuICAgICAgaGlnaGxpZ2h0OiB0cnVlLCAvLyBJbnN0YW50IHNlYXJjaCByZXN1bHQgcHJldmlld1xuICAgICAgbGltaXQ6IDEwIC8vIFBhZ2luYXRpb25cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgLi4uYmFzZUNvbmZpZyxcbiAgLi4uYmFubmVyQ29uZmlnLFxuICAuLi5zaWRlYmFyQ29uZmlnLFxuICAuLi50b3BOYXZDb25maWcsXG4gIC4uLmJsb2dDb25maWcsXG4gIC4uLmhlYWRDb25maWcsXG4gIC4uLm1hcmtkb3duQ29uZmlnLFxuICAuLi5wbHVnZ2FibGVDb25maWcsXG4gIC4uLnNlYXJjaENvbmZpZyxcbiAgLi4udHdvc2xhc2hDb25maWcsXG4gIHZpdGU6IHtcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcycpLFxuICAgICAgICAnQC9jb21wb25lbnRzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL2NvbXBvbmVudHMnKSxcbiAgICAgICAgJ0AvcGFnZXMnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MvcGFnZXMnKSxcbiAgICAgICAgJ0Avc3R5bGVzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3N0eWxlcycpLFxuICAgICAgICAnQC9saWInOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MvbGliJyksXG4gICAgICAgICdAL3V0aWxzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3V0aWxzJyksXG4gICAgICAgICdAL3R5cGVzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3R5cGVzJylcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0pXG5cbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2VyaWNicm93bi9jb2RlL2Jhc2Uvdm9jcy1tdnBcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9lcmljYnJvd24vY29kZS9iYXNlL3ZvY3MtbXZwL3NpZGViYXIudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2VyaWNicm93bi9jb2RlL2Jhc2Uvdm9jcy1tdnAvc2lkZWJhci50c1wiO2ltcG9ydCB0eXBlIHsgU2lkZWJhciB9IGZyb20gJ3ZvY3MnXG5cbi8vIE5vdGU6IGNhcmVmdWwgb2YgbmFtZSBjbGFzaGluZyBiZXR3ZWVuIHNpZGViYXIgaXRlbXMgYW5kIGRvY3MgcGFnZXMuIFxuLy8gRm9yIGV4YW1wbGUsICdRdWlja3N0YXJ0JyBpcyB1c2VkIGZvciBib3RoIHNpZGViYXIgYW5kIHBhZ2UgbmFtZXMuXG4vLyBJZiBkb2NzIGFyZSBwYXJ0IG9mIGEgc2lkZWJhciBjb2xsZWN0aW9uLCB0aGV5IHNob3VsZCBiZSBpbiBhIHN1YmZvbGRlclxuZXhwb3J0IGNvbnN0IHNpZGViYXI6IFNpZGViYXIgPSB7XG4gICcvZ2V0LXN0YXJ0ZWQnOltcbiAgICB7XG4gICAgICB0ZXh0OiAnT3ZlcnZpZXcnLFxuICAgICAgbGluazogJy9nZXQtc3RhcnRlZCcsXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1F1aWNrc3RhcnQnLFxuICAgICAgbGluazogJy9nZXQtc3RhcnRlZC9xdWlja3N0YXJ0JyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ0RlcGxveSBPbiBCYXNlJywgbGluazogJy9nZXQtc3RhcnRlZC9kZXBsb3ktb24tYmFzZS1xdWlja3N0YXJ0JyB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLCBcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHsgdGV4dDogJ1doeSBCYXNlPycsIGxpbms6ICcvZ2V0LXN0YXJ0ZWQvd2h5LWJhc2UnIH0sXG4gICAgICAgIHsgdGV4dDogJ0V4cGxvcmUgQWxsIFRvb2xzJywgbGluazogJy9nZXQtc3RhcnRlZC9leHBsb3JlLWFsbC10b29scycgfSxcbiAgICAgICAgeyB0ZXh0OiAnRG9jcyBUb3VyJywgbGluazogJy9nZXQtc3RhcnRlZC9kb2NzLXRvdXInIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0J1aWxkaW5nIG9uIEJhc2UnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2dldC1zdGFydGVkL2J1aWxkaW5nLW9uY2hhaW4vb3ZlcnZpZXcnIH0sXG4gICAgICAgIHsgdGV4dDogJ1RoZSBPbmNoYWluIFRlY2ggU3RhY2snLCBsaW5rOiAnL2dldC1zdGFydGVkL2J1aWxkaW5nLW9uY2hhaW4vdGhlLW9uY2hhaW4tdGVjaC1zdGFjaycgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdVbmlxdWUgQXNwZWN0cyBvZiBCdWlsZGluZyBPbmNoYWluJyxcbiAgICAgICAgICBsaW5rOiAnL2dldC1zdGFydGVkL2J1aWxkaW5nLW9uY2hhaW4vdW5pcXVlLWFzcGVjdHMtb2YtYnVpbGRpbmctb25jaGFpbicsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0FjY291bnRzIGFuZCBXYWxsZXRzJywgbGluazogJy9nZXQtc3RhcnRlZC9idWlsZGluZy1vbmNoYWluL3VuaXF1ZS1hc3BlY3RzLW9mLWJ1aWxkaW5nLW9uY2hhaW4nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdPbmNoYWluIElkZW50aXR5JywgbGluazogJy9nZXQtc3RhcnRlZC9idWlsZGluZy1vbmNoYWluL29uY2hhaW4taWRlbnRpdHknIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdTdWJtaXR0aW5nIFRyYW5zYWN0aW9ucycsIGxpbms6ICcvZ2V0LXN0YXJ0ZWQvYnVpbGRpbmctb25jaGFpbi9zdWJtaXR0aW5nLXRyYW5zYWN0aW9ucycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1BheWluZyBmb3IgVHJhbnNhY3Rpb25zJywgbGluazogJy9nZXQtc3RhcnRlZC9idWlsZGluZy1vbmNoYWluL3BheWluZy1mb3ItdHJhbnNhY3Rpb25zJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQ29ubmVjdGluZyB5b3VyIEZyb250ZW5kJywgbGluazogJy9nZXQtc3RhcnRlZC9idWlsZGluZy1vbmNoYWluL2Nvbm5lY3RpbmcteW91ci1mcm9udGVuZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0Z1bmRpbmcgV2FsbGV0cyAoT25yYW1wcyknLCBsaW5rOiAnL2dldC1zdGFydGVkL2J1aWxkaW5nLW9uY2hhaW4vZnVuZGluZy13YWxsZXRzLW9ucmFtcHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdPbmNoYWluIFNvY2lhbCBOZXR3b3JrcycsIGxpbms6ICcvZ2V0LXN0YXJ0ZWQvYnVpbGRpbmctb25jaGFpbi9vbmNoYWluLXNvY2lhbC1uZXR3b3JrcycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ09uY2hhaW4gQUkgQWdlbnRzJywgbGluazogJy9nZXQtc3RhcnRlZC9idWlsZGluZy1vbmNoYWluL29uY2hhaW4tYWktYWdlbnRzJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHsgdGV4dDogJ09uY2hhaW4gRGV2ZWxvcG1lbnQgTGlmZWN5Y2xlJywgbGluazogJy9nZXQtc3RhcnRlZC9vbmNoYWluLWRldmVsb3BtZW50LWxpZmVjeWNsZScgfSxcbiAgICAgICAgeyB0ZXh0OiAnQW4gT3BpbmlvbmF0ZWQgU3RhY2snLCBsaW5rOiAnL2dldC1zdGFydGVkL2FuLW9waW5pb25hdGVkLXN0YWNrJyB9LFxuICAgICAgICB7IHRleHQ6ICdDb250aW51ZSBCdWlsZGluZyBPbmNoYWluJywgbGluazogJy9nZXQtc3RhcnRlZC9jb250aW51ZS1idWlsZGluZy1vbmNoYWluJyB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICAnL2RvY3MnOiBbXG4gICAge1xuICAgICAgdGV4dDogJ092ZXJ2aWV3JyxcbiAgICAgIGxpbms6ICcvZG9jcycsXG4gICAgfSxcbiAgICB7XG4gICAgICB0ZXh0OiAnS2l0cycsXG4gICAgICBjb2xsYXBzZWQ6IGZhbHNlLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdPbmNoYWluS2l0JyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJywgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9nZXR0aW5nLXN0YXJ0ZWQnIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0luc3RhbGxhdGlvbicsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmV4dC5qcycsIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaW5zdGFsbGF0aW9uL25leHRqcycgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdWaXRlJywgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vdml0ZScgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdSZW1peCcsIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaW5zdGFsbGF0aW9uL3JlbWl4JyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0FzdHJvJywgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vYXN0cm8nIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbktpdFByb3ZpZGVyJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL29uY2hhaW5raXQtcHJvdmlkZXInLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnQ29udHJpYnV0aW9uJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnSG93IHRvIENvbnRyaWJ1dGUnLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9ndWlkZXMvY29udHJpYnV0aW9uJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdSZXBvcnQgYSBCdWcnLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9ndWlkZXMvcmVwb3J0aW5nLWJ1ZycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdHdWlkZXMnLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdMaWZlY3ljbGUgU3RhdHVzJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZ3VpZGVzL2xpZmVjeWNsZS1zdGF0dXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1RhaWx3aW5kIENTUyBJbnRlZ3JhdGlvbicsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2d1aWRlcy90YWlsd2luZCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnVGhlbWUgQ3VzdG9taXphdGlvbicsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2d1aWRlcy90aGVtZXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1VzZSBCYXNlbmFtZScsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2d1aWRlcy91c2UtYmFzZW5hbWUtaW4tb25jaGFpbi1hcHAnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnVGVtcGxhdGVzJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbiBORlQgQXBwJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICdodHRwczovL29jay1taW50LnZlcmNlbC5hcHAvJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdPbmNoYWluIENvbW1lcmNlIEFwcCcsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9vbmNoYWluLWNvbW1lcmNlLXRlbXBsYXRlLnZlcmNlbC5hcHAvJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdPbmNoYWluIFNvY2lhbCBQcm9maWxlJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vZmFrZXBpeGVscy9vY2staWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnQ29tcG9uZW50cycsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0NoZWNrb3V0JyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY2hlY2tvdXQvY2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdGcmFtZScsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0ZyYW1lTWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZnJhbWUvZnJhbWUtbWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZEJ1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mdW5kL2Z1bmQtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9pZGVudGl0eScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9hZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBdmF0YXInLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvYXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdCYWRnZScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9iYWRnZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHlDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2lkZW50aXR5LWNhcmQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU29jaWFscycsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9zb2NpYWxzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnTWludCcsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05GVENhcmQnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvbWludC9uZnQtY2FyZCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTkZUTWludENhcmQnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvbWludC9uZnQtbWludC1jYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvc3dhcC9zd2FwJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwU2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvc3dhcC9zd2FwLXNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW4nLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbkNoaXAnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4tY2hpcCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5JbWFnZScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1pbWFnZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5Sb3cnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4tcm93JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlblNlYXJjaCcsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1zZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuU2VsZWN0RHJvcGRvd24nLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4tc2VsZWN0LWRyb3Bkb3duJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC90cmFuc2FjdGlvbi90cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXREcm9wZG93bkJhc2VuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQtZHJvcGRvd24tYmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRGlzY29ubmVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWRpc2Nvbm5lY3QnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRnVuZExpbmsnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvd2FsbGV0L3dhbGxldC1kcm9wZG93bi1mdW5kLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duTGluaycsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0FQSScsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRUb2tlbkRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvYXBpL2dldC10b2tlbi1kZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRNaW50RGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LW1pbnQtZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnYnVpbGRNaW50VHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLW1pbnQtdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwJyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnYnVpbGRTd2FwVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLXN3YXAtdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFN3YXBRdW90ZScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LXN3YXAtcXVvdGUnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFRva2VucycsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LXRva2VucycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnVXRpbGl0aWVzJyxcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdDb25maWcnLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc0Jhc2UnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL2lzLWJhc2UnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzRXRoZXJldW0nLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL2lzLWV0aGVyZXVtJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZCcsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldE9ucmFtcEJ1eVVybCcsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mdW5kL2dldC1vbnJhbXAtYnV5LXVybCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0ZyYW1lJyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0RmFyY2FzdGVyVXNlckFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZmFyY2FzdGVyL2dldC1mYXJjYXN0ZXItdXNlci1hZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZUh0bWxSZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mcmFtZS9nZXQtZnJhbWUtaHRtbC1yZXNwb25zZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0RnJhbWVNZXNzYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1tZXNzYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZU1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1tZXRhZGF0YScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0WG10cEZyYW1lTWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC94bXRwL2dldC14bXRwLWZyYW1lLW1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzWG10cEZyYW1lUmVxdWVzdCcsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC94bXRwL2lzLXhtdHAtZnJhbWUtcmVxdWVzdCcsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0QWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0QXR0ZXN0YXRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hdHRlc3RhdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldEF2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXROYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1uYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3VzZS1hZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VBdmF0YXInLFxuICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvdXNlLWF2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAndXNlTmFtZScsXG4gICAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtbmFtZScsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuJyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZm9ybWF0QW1vdW50JyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3Rva2VuL2Zvcm1hdC1hbW91bnQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXQnLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc1ZhbGlkQUFFbnRyeXBvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC9pcy12YWxpZC1hYS1lbnRyeXBvaW50JyxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc1dhbGxldEFDb2luYmFzZVNtYXJ0V2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC9pcy13YWxsZXQtYS1jb2luYmFzZS1zbWFydC13YWxsZXQnLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1R5cGVzJyxcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdBUEknLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvdHlwZXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0NoZWNrb3V0JyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY2hlY2tvdXQvdHlwZXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0NvbmZpZycsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2NvbmZpZy90eXBlcycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnRmFyY2FzdGVyJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZmFyY2FzdGVyL3R5cGVzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZnVuZC90eXBlcycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnRnJhbWUnLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mcmFtZS90eXBlcycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS90eXBlcycsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnTWludCcsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L21pbnQvdHlwZXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9zd2FwL3R5cGVzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3Rva2VuL3R5cGVzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3RyYW5zYWN0aW9uL3R5cGVzJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXQnLFxuICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvdHlwZXMnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQWdlbnRLaXQnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2RvY3Mva2l0cy9hZ2VudGtpdC9pbmRleCcgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICAgIC8vIHtcbiAgICAvLyAgIHRleHQ6ICdQYXltYXN0ZXInLFxuICAgIC8vICAgY29sbGFwc2VkOiB0cnVlLFxuICAgIC8vICAgaXRlbXM6IFtcbiAgICAvLyAgICAgeyB0ZXh0OiAnV2VsY29tZScsIGxpbms6ICcvYXBwLXRvb2xzL3BheW1hc3Rlci93ZWxjb21lJyB9LFxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgdGV4dDogJ1F1aWNrc3RhcnQnLFxuICAgIC8vICAgICAgIGl0ZW1zOiBbXG4gICAgLy8gICAgICAgICB7IHRleHQ6ICdVSSBJbnRlZ3JhdGlvbiBHdWlkZScsIGxpbms6ICcvYXBwLXRvb2xzL3BheW1hc3Rlci9xdWlja3N0YXJ0LWd1aWRlJyB9LFxuICAgIC8vICAgICAgICAgeyB0ZXh0OiAnSGVhZGxlc3MgSW50ZWdyYXRpb24gR3VpZGUnLCBsaW5rOiAnL2FwcC10b29scy9wYXltYXN0ZXIvcXVpY2tzdGFydC1oZWFkbGVzcycgfSxcbiAgICAvLyAgICAgICBdLFxuICAgIC8vICAgICB9LFxuICAgIC8vICAgICB7XG4gICAgLy8gICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgLy8gICAgICAgaXRlbXM6IFtcbiAgICAvLyAgICAgICAgIHsgdGV4dDogJ0dhc2xlc3MgVHJhbnNhY3Rpb25zJywgbGluazogJy9hcHAtdG9vbHMvcGF5bWFzdGVyL2dhc2xlc3MtdHJhbnNhY3Rpb25zLXdpdGgtcGF5bWFzdGVyJyB9LFxuICAgIC8vICAgICAgIF0sXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICAgIHtcbiAgICAvLyAgICAgICB0ZXh0OiAnRG9jdW1lbnRhdGlvbicsXG4gICAgLy8gICAgICAgaXRlbXM6IFtcbiAgICAvLyAgICAgICAgIHsgdGV4dDogJ0VSQzIwIFBheW1hc3RlcicsIGxpbms6ICcvYXBwLXRvb2xzL3BheW1hc3Rlci9lcmMyMC1wYXltYXN0ZXInIH0sXG4gICAgLy8gICAgICAgICB7IHRleHQ6ICdTZWN1cml0eScsIGxpbms6ICcvYXBwLXRvb2xzL3BheW1hc3Rlci9zZWN1cml0eScgfSxcbiAgICAvLyAgICAgICAgIHsgdGV4dDogJ0Vycm9yIFJlZmVyZW5jZScsIGxpbms6ICcvYXBwLXRvb2xzL3BheW1hc3Rlci9lcnJvcnMnIH0sXG4gICAgLy8gICAgICAgXSxcbiAgICAvLyAgICAgfSxcbiAgICAvLyAgICAge1xuICAgIC8vICAgICAgIHRleHQ6ICdGQVEgJiBUcm91Ymxlc2hvb3RpbmcnLFxuICAgIC8vICAgICAgIGl0ZW1zOiBbXG4gICAgLy8gICAgICAgICB7IHRleHQ6ICdUcm91Ymxlc2hvb3RpbmcgR3VpZGUnLCBsaW5rOiAnL2FwcC10b29scy9wYXltYXN0ZXIvdHJvdWJsZXNob290aW5nJyB9LFxuICAgIC8vICAgICAgIF0sXG4gICAgLy8gICAgIH0sXG4gICAgLy8gICBdLFxuICAgIC8vIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICAgIGNvbGxhcHNlZDogZmFsc2UsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1NtYXJ0IFdhbGxldCcsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdRdWlja3N0YXJ0IEd1aWRlJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdRdWljayBTdGFydCcsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvcXVpY2stc3RhcnQnIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdXaHkgU21hcnQgV2FsbGV0JywgbGluazogJy9kb2NzL2lkZW50aXR5L3NtYXJ0LXdhbGxldC93aHktc21hcnQtd2FsbGV0JyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0xhdW5jaCBSZWFkeSBDaGVja2xpc3QnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2xhdW5jaC1yZWFkeS1jaGVja2xpc3QnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnV2FsbGV0IExpYnJhcnkgU3VwcG9ydCcsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvd2FsbGV0LWxpYnJhcnktc3VwcG9ydCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdCYXNlIEdhc2xlc3MgQ2FtcGFpZ24nLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2Jhc2UtZ2FzbGVzcy1jYW1wYWlnbicgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdUdXRvcmlhbHMnLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdDcmVhdGUgYSBOZXcgV2ViIEFwcCcsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBPbmNoYWluIEFwcCBUZW1wbGF0ZScsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2NyZWF0ZS1hcHAvdXNpbmctb25jaGFpbi1hcHAtdGVtcGxhdGUnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIFdhZ21pJywgbGluazogJy9kb2NzL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvY3JlYXRlLWFwcC91c2luZy13YWdtaScgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdVcGRhdGUgRXhpc3RpbmcgQXBwJywgbGluazogJy9kb2NzL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvdXBkYXRlLWV4aXN0aW5nLWFwcCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdSZWFjdCBOYXRpdmUgSW50ZWdyYXRpb24nLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9yZWFjdC1uYXRpdmUtaW50ZWdyYXRpb24nIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQ3JlYXRlIFdhbGxldCBCdXR0b24nLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9jb21wb25lbnRzL2NyZWF0ZS13YWxsZXQtYnV0dG9uJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NpZ25hdHVyZSBWZXJpZmljYXRpb24nLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zaWduYXR1cmUtdmVyaWZpY2F0aW9uJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NJV0UnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zaXdlJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0JhdGNoIFRyYW5zYWN0aW9ucycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2JhdGNoLXRyYW5zYWN0aW9ucycgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnU3BlbmQgUGVybWlzc2lvbnMnLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9vdmVydmlldycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUXVpY2sgU3RhcnQnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9xdWljay1zdGFydCcgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBUEkgUmVmZXJlbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQ2xpZW50IFJlc291cmNlcycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2UvY2xpZW50LXJlc291cmNlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NwZW5kUGVybWlzc2lvbk1hbmFnZXInLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9hcGktcmVmZXJlbmNlL3NwZW5kcGVybWlzc2lvbm1hbmFnZXInIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdXYWxsZXQgRmV0Y2hQZXJtaXNzaW9ucycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2Uvd2FsbGV0LWZldGNocGVybWlzc2lvbnMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnVGlwcyAmIFRyaWNrcycsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdJbnNwZWN0IFRyYW5zYWN0aW9uIFNpbXVsYXRpb24nLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy90aXBzL2luc3BlY3QtdHhuLXNpbXVsYXRpb24nIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1BvcHVwIFRpcHMnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy90aXBzL3BvcHVwLXRpcHMnIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnU0RLJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2dldHRpbmctc3RhcnRlZCcsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW3sgdGV4dDogJ2NyZWF0ZUNvaW5iYXNlV2FsbGV0U0RLJywgbGluazogJy9kb2NzL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY3JlYXRlLWNvaW5iYXNlLXdhbGxldC1zZGsnIH1dLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnRkFRICYgVHJvdWJsZXNob290aW5nJyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdGQVEnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvc21hcnQtd2FsbGV0L0ZBUScgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdTaWduIGluIHdpdGggQmFzZScsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXQgU0RLJyxcbiAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnV2VsY29tZScsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL3dlbGNvbWUnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1dhbGxldCBGZWF0dXJlcycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL3dhbGxldC1mZWF0dXJlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRW52aXJvbm1lbnRzJywgbGluazogJy9kb2NzL2lkZW50aXR5L3dhbGxldC1zZGsvZW52aXJvbm1lbnRzJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdXaGl0ZWxpc3RlZCBOZXR3b3JrcycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL3doaXRlbGlzdGVkLW5ldHdvcmtzJyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXZlbG9wZXIgU2V0dGluZ3MnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvd2FsbGV0LXNkay9kZXZlbG9wZXItc2V0dGluZ3MnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0luamVjdGVkIFByb3ZpZGVyJywgbGluazogJy9kb2NzL2lkZW50aXR5L3dhbGxldC1zZGsvaW5qZWN0ZWQtcHJvdmlkZXInIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdBZGRpbmcgVG9rZW5zIHRvIENvaW5iYXNlIFdhbGxldCcsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL2FkZGluZy10b2tlbnMtdG8tY29pbmJhc2Utd2FsbGV0JyB9LFxuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdTYW1wbGUgQXBwbGljYXRpb25zJywgbGluazogJy9kb2NzL2lkZW50aXR5L3dhbGxldC1zZGsvc2FtcGxlLWFwcGxpY2F0aW9ucycgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnQ29pbmJhc2UgV2FsbGV0IFNESycsXG4gICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdJbnN0YWxsaW5nJywgbGluazogJy9kb2NzL2lkZW50aXR5L3dhbGxldC1zZGsvaW5zdGFsbGluZycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU2V0dXAnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvd2FsbGV0LXNkay9zZXR1cCcgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdNYWtpbmcgUmVxdWVzdHMnLFxuICAgICAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdHZXR0aW5nIEVUSCBBY2NvdW50cycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL2dldHRpbmctZXRoLWFjY291bnRzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU3dpdGNoaW5nIENoYWlucycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL3N3aXRjaGluZy1jaGFpbnMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUcmFja2luZyBBc3NldHMnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvd2FsbGV0LXNkay90cmFja2luZy1hc3NldHMnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGlzY29ubmVjdGluZyBMaW5rcycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL2Rpc2Nvbm5lY3RpbmctbGlua3MnIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ0NvaW5iYXNlIFdhbGxldCBNb2JpbGUgU0RLJyxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ01vYmlsZSBTREsgT3ZlcnZpZXcnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvd2FsbGV0LXNkay9tb2JpbGUtc2RrLW92ZXJ2aWV3JyB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lPUycsXG4gICAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0luc3RhbGxhdGlvbicsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL2lvcy1pbnN0YWxsJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnU2V0dXAnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvd2FsbGV0LXNkay9pb3Mtc2V0dXAnIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdFc3RhYmxpc2hpbmcgYSBDb25uZWN0aW9uJywgbGluazogJy9kb2NzL2lkZW50aXR5L3dhbGxldC1zZGsvaW9zLWVzdGFibGlzaGluZy1hLWNvbm5lY3Rpb24nIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdNYWtpbmcgUmVxdWVzdHMnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvd2FsbGV0LXNkay9pb3MtbWFraW5nLXJlcXVlc3RzJyB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQVBJIFJlZmVyZW5jZScsIGxpbms6ICcvZG9jcy9pZGVudGl0eS93YWxsZXQtc2RrL2lvcy1hcGktcmVmZXJlbmNlJyB9LFxuICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnTW9iaWxlIFdhbGxldCBQcm90b2NvbCcsXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL3NwZWMtb3ZlcnZpZXcnIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdGV4dDogJ01lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL21lc3NhZ2VzLWV4YW1wbGUnLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVxdWVzdCBDb250ZW50JywgbGluazogJy9kb2NzL2lkZW50aXR5L21vYmlsZS13YWxsZXQtcHJvdG9jb2wvbWVzc2FnZXMtcmVxdWVzdCcgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVzcG9uc2UgQ29udGVudCcsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL21lc3NhZ2VzLXJlc3BvbnNlJyB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0JhdGNoIFJlcXVlc3RzJywgbGluazogJy9kb2NzL2lkZW50aXR5L21vYmlsZS13YWxsZXQtcHJvdG9jb2wvYmF0Y2gnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnRW5jcnlwdGlvbicsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL2VuY3J5cHRpb24nIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnSGFuZHNoYWtlJywgbGluazogJy9kb2NzL2lkZW50aXR5L21vYmlsZS13YWxsZXQtcHJvdG9jb2wvaGFuZHNoYWtlJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1ZlcmlmaWNhdGlvbicsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL3ZlcmlmaWNhdGlvbicgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNdWx0aS1jaGFpbicsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL211bHRpLWNoYWluJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1RyYW5zcG9ydCBMYXllcicsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9tb2JpbGUtd2FsbGV0LXByb3RvY29sL25ldHdvcmsnIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnQmFzZW5hbWVzJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZW5hbWVzIFdhZ21pIFR1dG9yaWFsJywgbGluazogJy9kb2NzL2lkZW50aXR5L2Jhc2VuYW1lcy9iYXNlbmFtZXMtd2FnbWktdHV0b3JpYWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZW5hbWVzIE9uY2hhaW5LaXQgVHV0b3JpYWwnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvYmFzZW5hbWVzL2Jhc2VuYW1lcy1vbmNoYWlua2l0LXR1dG9yaWFsJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0ZBUSAmIFRyb3VibGVzaG9vdGluZycsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZW5hbWVzIEZBUScsIGxpbms6ICcvZG9jcy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLWZhcScgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdWZXJpZmljYXRpb25zJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1F1aWNrc3RhcnQnLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1F1aWNrc3RhcnQnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy9xdWlja3N0YXJ0JyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnV2VsY29tZScsIGxpbms6ICcvZG9jcy9pZGVudGl0eS92ZXJpZmljYXRpb25zL3dlbGNvbWUnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNlIENhc2VzJywgbGluazogJy9kb2NzL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvdXNlLWNhc2VzJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0RvY3VtZW50YXRpb24nLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0F0dGVzdGF0aW9ucycsIGxpbms6ICcvZG9jcy9pZGVudGl0eS92ZXJpZmljYXRpb25zL2F0dGVzdGF0aW9ucycgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdGQVEgJiBUcm91Ymxlc2hvb3RpbmcnLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy9mYXEtdHJvdWJsZXNob290aW5nJyB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnU3VwcG9ydCcsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGlzY29yZCBDb21tdW5pdHknLCBsaW5rOiAnL2RvY3MvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy92ZXJpZmljYXRpb25zLWRpc2NvcmQnIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0NoYWluJyxcbiAgICAgIGl0ZW1zOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnR2VuZXJhbCcsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdOZXR3b3JrIEluZm9ybWF0aW9uJywgbGluazogJy9kb2NzL2NoYWluL25ldHdvcmstaW5mb3JtYXRpb24nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdGZWVzJywgbGluazogJy9kb2NzL2NoYWluL2ZlZXMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdEaWZmZXJlbmNlcyBCZXR3ZWVuIEV0aGVyZXVtIGFuZCBCYXNlJywgbGluazogJy9kb2NzL2NoYWluL2RpZmZlcmVuY2VzLWJldHdlZW4tZXRoZXJldW0tYW5kLWJhc2UnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdSdW4gYSBCYXNlIE5vZGUnLCBsaW5rOiAnL2RvY3MvY2hhaW4vcnVuLWEtYmFzZS1ub2RlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnQnJpZGdlIGFuIEwxIFRva2VuIHRvIEJhc2UnLCBsaW5rOiAnL2RvY3MvY2hhaW4vYnJpZGdlLWFuLWwxLXRva2VuLXRvLWJhc2UnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDb250cmFjdHMnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnQmFzZSBDb250cmFjdHMnLCBsaW5rOiAnL2RvY3MvY2hhaW4vYmFzZS1jb250cmFjdHMnIH0sXG5cbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1NlY3VyaXR5JyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1NlY3VyaXR5JywgbGluazogJy9kb2NzL2NoYWluL3NlY3VyaXR5JyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnT1AgU3RhY2snLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnRGVjZW50cmFsaXppbmcgQmFzZSB3aXRoIE9wdGltaXNtJywgbGluazogJy9kb2NzL2NoYWluL2RlY2VudHJhbGl6aW5nLWJhc2Utd2l0aC1vcHRpbWlzbScgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1Rvb2xzJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ05vZGUgUHJvdmlkZXJzJywgbGluazogJy9kb2NzL2NoYWluL25vZGUtcHJvdmlkZXJzJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnTmV0d29yayBGYXVjZXRzJywgbGluazogJy9kb2NzL2NoYWluL25ldHdvcmstZmF1Y2V0cycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9LFxuICBdLFxuICAnL2d1aWRlcyc6IFtcbiAgICB7XG4gICAgICB0ZXh0OiAnT3ZlcnZpZXcnLFxuICAgICAgbGluazogJy9ndWlkZXMnLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ1VzZSBDYXNlIEd1aWRlcycsXG4gICAgICBpdGVtczogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1BheW1lbnRzICYgQ29tbWVyY2UnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdBY2NlcHQgQ3J5cHRvIFBheW1lbnRzJywgbGluazogJy9ndWlkZXMvdXNlLWNhc2UtZ3VpZGVzL2NvbW1lcmNlL2FjY2VwdC1jcnlwdG8tcGF5bWVudHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdCdWlsZCBhbiBFLWNvbW1lcmNlIEFwcCcsIGxpbms6ICcvZ3VpZGVzL3VzZS1jYXNlLWd1aWRlcy9jb21tZXJjZS9idWlsZC1hbi1lY29tbWVyY2UtYXBwJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IGEgU2hvcGlmeSBTdG9yZWZyb250JywgbGluazogJy9ndWlkZXMvdXNlLWNhc2UtZ3VpZGVzL2NvbW1lcmNlL2RlcGxveS1hLXNob3BpZnktc3RvcmVmcm9udCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1RyYW5zYWN0aW9uIEd1aWRlJywgbGluazogJy9ndWlkZXMvbGlmZS1jeWNsZS1ndWlkZXMvYWN0aXZhdGluZy90cmFuc2FjdGlvbnMnIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdORlRzICYgRGlnaXRhbCBBc3NldHMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdORlQgTWludGluZyB3aXRoIFpvcmEnLCBsaW5rOiAnL2d1aWRlcy91c2UtY2FzZS1ndWlkZXMvY3JlYXRvci9uZnQtbWludGluZy13aXRoLXpvcmEnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdOby1Db2RlIE5GVCBNaW50aW5nJywgbGluazogJy9ndWlkZXMvbGlmZS1jeWNsZS1ndWlkZXMvYWN0aXZhdGluZy9uby1jb2RlLW1pbnRpbmcnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdORlQgTWludGluZyBHdWlkZScsIGxpbms6ICcvZ3VpZGVzL2xpZmUtY3ljbGUtZ3VpZGVzL2FjdGl2YXRpbmcvbmZ0LW1pbnRpbmcnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdDb252ZXJ0IEZhcmNhc3RlciBGcmFtZSB0byBPcGVuIEZyYW1lJywgbGluazogJy9ndWlkZXMvdXNlLWNhc2UtZ3VpZGVzL2NyZWF0b3IvY29udmVydC1mYXJjYXN0ZXItZnJhbWUtdG8tb3Blbi1mcmFtZScgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0RlRmkgJiBGaW5hbmNpYWwgVG9vbHMnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdBZGQgSW4tQXBwIEZ1bmRpbmcgKE9ucmFtcCknLCBsaW5rOiAnL2d1aWRlcy91c2UtY2FzZS1ndWlkZXMvZmluYW5jZS9idWlsZC1hLXNtYXJ0LXdhbGxldC1mdW5kaW5nLWFwcCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0FjY2VzcyBSZWFsLVdvcmxkIERhdGEgKENoYWlubGluayknLCBsaW5rOiAnL2d1aWRlcy91c2UtY2FzZS1ndWlkZXMvZmluYW5jZS9hY2Nlc3MtcmVhbC13b3JsZC1kYXRhLWNoYWlubGluaycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0FjY2VzcyBSZWFsLVRpbWUgQXNzZXQgRGF0YSAoUHl0aCknLCBsaW5rOiAnL2d1aWRlcy91c2UtY2FzZS1ndWlkZXMvZmluYW5jZS9hY2Nlc3MtcmVhbC10aW1lLWFzc2V0LWRhdGEtcHl0aC1wcmljZS1mZWVkcycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0dyb3d0aCAmIERpc3RyaWJ1dGlvbicsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1NvY2lhbCAmIERpc3RyaWJ1dGlvbicsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnQ2FzdCBBY3Rpb25zJywgbGluazogJy9ndWlkZXMvbGlmZS1jeWNsZS1ndWlkZXMvZ3Jvd2luZy9jYXN0LWFjdGlvbnMnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnSHlwZXJmcmFtZXMnLCBsaW5rOiAnL2d1aWRlcy9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2h5cGVyZnJhbWVzJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveW1lbnQgJiBBY2Nlc3MnLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB0byBWZXJjZWwnLCBsaW5rOiAnL2d1aWRlcy9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2RlcGxveS10by12ZXJjZWwnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnR2F0aW5nIGFuZCBSZWRpcmVjdHMnLCBsaW5rOiAnL2d1aWRlcy9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2dhdGluZy1hbmQtcmVkaXJlY3RzJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1VzZXIgRW5nYWdlbWVudCcsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnRW1haWwgQ2FtcGFpZ25zJywgbGluazogJy9ndWlkZXMvbGlmZS1jeWNsZS1ndWlkZXMvcmV0YWluaW5nL2NyZWF0ZS1lbWFpbC1jYW1wYWlnbnMnIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ0dlbmVyYWwgRGV2ZWxvcG1lbnQnLFxuICAgICAgaXRlbXM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdTbWFydCBDb250cmFjdCBEZXZlbG9wbWVudCcsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0hhcmRoYXQnLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIEhhcmRoYXQnLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvZGVwbG95LXdpdGgtaGFyZGhhdCcgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZWJ1Z2dpbmcgU21hcnQgQ29udHJhY3RzJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L2RlYnVnZ2luZy1zbWFydC1jb250cmFjdHMnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnT3B0aW1pemluZyBHYXMgVXNhZ2UnLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvb3B0aW1pemluZy1nYXMtdXNhZ2UnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVkdWNpbmcgQ29udHJhY3QgU2l6ZScsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9yZWR1Y2luZy1jb250cmFjdC1zaXplJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0FuYWx5emluZyBUZXN0IENvdmVyYWdlJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9oYXJkaGF0L2FuYWx5emluZy10ZXN0LWNvdmVyYWdlJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ0ZvdW5kcnknLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIEZvdW5kcnknLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvZGVwbG95LXdpdGgtZm91bmRyeScgfSxcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdTZXR1cCB3aXRoIEJhc2UnLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvc2V0dXAtd2l0aC1iYXNlJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ1Rlc3RpbmcgU21hcnQgQ29udHJhY3RzJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9mb3VuZHJ5L3Rlc3Rpbmctc21hcnQtY29udHJhY3RzJyB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ1JlbWl4JyxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBSZW1peCcsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvcmVtaXgvZGVwbG95LXdpdGgtcmVtaXgnIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnVGVuZGVybHknLFxuICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIFRlbmRlcmx5JywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90ZW5kZXJseS9kZXBsb3ktd2l0aC10ZW5kZXJseScgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdUaGlyZFdlYicsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggVGhpcmRXZWInLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL2RlcGxveS13aXRoLXRoaXJkd2ViJyB9LFxuICAgICAgICAgICAgICAgIHsgdGV4dDogJ0J1aWxkIHdpdGggVGhpcmRXZWInLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL2J1aWxkLXdpdGgtdGhpcmR3ZWInIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnVGhpcmRXZWIgU0RLJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90aGlyZHdlYi90aGlyZHdlYi1zZGsnIH0sXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnVGhpcmRXZWIgQ0xJJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90aGlyZHdlYi90aGlyZHdlYi1jbGknIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTkZUcycsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1NpbXBsZSBPbmNoYWluIE5GVHMnLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L25mdHMvc2ltcGxlLW9uY2hhaW4tbmZ0cycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0R5bmFtaWMgTkZUcycsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy9keW5hbWljLW5mdHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdDb21wbGV4IE9uY2hhaW4gTkZUcycsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy9jb21wbGV4LW9uY2hhaW4tbmZ0cycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1NpZ25hdHVyZSBNaW50JywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9uZnRzL3NpZ25hdHVyZS1taW50JyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnVGhpcmRXZWIgVW5yZWFsIE5GVCBJdGVtcycsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy90aGlyZHdlYi11bnJlYWwtbmZ0LWl0ZW1zJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnSVBGUycsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIEZsZWVrJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9pcGZzL2RlcGxveS13aXRoLWZsZWVrJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnVG9rZW4gR2F0aW5nJyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnR2F0ZSBJUkwgRXZlbnRzIHdpdGggTm91bnMnLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L3Rva2VuLWdhdGluZy9nYXRlLWlybC1ldmVudHMtd2l0aC1ub3VucycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0NsaWVudC1TaWRlIERldmVsb3BtZW50JyxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnSW50cm9kdWN0aW9uIHRvIFByb3ZpZGVycycsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvY2xpZW50LXNpZGUtZGV2ZWxvcG1lbnQvaW50cm9kdWN0aW9uLXRvLXByb3ZpZGVycycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0FjY291bnQgQWJzdHJhY3Rpb24nLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBCaWNvbm9teScsIGxpbms6ICcvZ3VpZGVzL2dlbmVyYWwtZGV2ZWxvcG1lbnQvYWNjb3VudC1hYnN0cmFjdGlvbi9hY2NvdW50LWFic3RyYWN0aW9uLW9uLWJhc2UtdXNpbmctYmljb25vbXknIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBQYXJ0aWNsZSBOZXR3b3JrJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9hY2NvdW50LWFic3RyYWN0aW9uL2FjY291bnQtYWJzdHJhY3Rpb24tb24tYmFzZS11c2luZy1wYXJ0aWNsZS1uZXR3b3JrJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgUHJpdnkgYW5kIEJhc2UgUGF5bWFzdGVyJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9hY2NvdW50LWFic3RyYWN0aW9uL2FjY291bnQtYWJzdHJhY3Rpb24tb24tYmFzZS11c2luZy1wcml2eS1hbmQtdGhlLWJhc2UtcGF5bWFzdGVyJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnR2FzbGVzcyBUcmFuc2FjdGlvbnMgd2l0aCBQYXltYXN0ZXInLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L2FjY291bnQtYWJzdHJhY3Rpb24vZ2FzbGVzcy10cmFuc2FjdGlvbnMtd2l0aC1wYXltYXN0ZXInIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDcm9zcy1DaGFpbicsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0JyaWRnZSBUb2tlbnMgd2l0aCBMYXllclplcm8nLCBsaW5rOiAnL2d1aWRlcy9nZW5lcmFsLWRldmVsb3BtZW50L2Nyb3NzLWNoYWluL2JyaWRnZS10b2tlbnMtd2l0aC1sYXllcnplcm8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdTZW5kIE1lc3NhZ2VzIGFuZCBUb2tlbnMgZnJvbSBCYXNlIChDaGFpbmxpbmspJywgbGluazogJy9ndWlkZXMvZ2VuZXJhbC1kZXZlbG9wbWVudC9jcm9zcy1jaGFpbi9zZW5kLW1lc3NhZ2VzLWFuZC10b2tlbnMtY2hhaW5saW5rJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gIF0sXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFBLFNBQVMsb0JBQW9COzs7QUNLdEIsSUFBTSxVQUFtQjtBQUFBLEVBQzlCLGdCQUFlO0FBQUEsSUFDYjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sV0FBVztBQUFBLElBQ2I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sa0JBQWtCLE1BQU0seUNBQXlDO0FBQUEsTUFDM0U7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsRUFBRSxNQUFNLGFBQWEsTUFBTSx3QkFBd0I7QUFBQSxRQUNuRCxFQUFFLE1BQU0scUJBQXFCLE1BQU0saUNBQWlDO0FBQUEsUUFDcEUsRUFBRSxNQUFNLGFBQWEsTUFBTSx5QkFBeUI7QUFBQSxNQUN0RDtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsUUFDTCxFQUFFLE1BQU0sWUFBWSxNQUFNLHlDQUF5QztBQUFBLFFBQ25FLEVBQUUsTUFBTSwwQkFBMEIsTUFBTSx1REFBdUQ7QUFBQSxRQUMvRjtBQUFBLFVBQ0UsTUFBTTtBQUFBLFVBQ04sTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFlBQ0wsRUFBRSxNQUFNLHdCQUF3QixNQUFNLG1FQUFtRTtBQUFBLFlBQ3pHLEVBQUUsTUFBTSxvQkFBb0IsTUFBTSxpREFBaUQ7QUFBQSxZQUNuRixFQUFFLE1BQU0sMkJBQTJCLE1BQU0sd0RBQXdEO0FBQUEsWUFDakcsRUFBRSxNQUFNLDJCQUEyQixNQUFNLHdEQUF3RDtBQUFBLFlBQ2pHLEVBQUUsTUFBTSw0QkFBNEIsTUFBTSx5REFBeUQ7QUFBQSxZQUNuRyxFQUFFLE1BQU0sNkJBQTZCLE1BQU0sd0RBQXdEO0FBQUEsWUFDbkcsRUFBRSxNQUFNLDJCQUEyQixNQUFNLHdEQUF3RDtBQUFBLFlBQ2pHLEVBQUUsTUFBTSxxQkFBcUIsTUFBTSxrREFBa0Q7QUFBQSxVQUN2RjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLEVBQUUsTUFBTSxpQ0FBaUMsTUFBTSw2Q0FBNkM7QUFBQSxRQUM1RixFQUFFLE1BQU0sd0JBQXdCLE1BQU0sb0NBQW9DO0FBQUEsUUFDMUUsRUFBRSxNQUFNLDZCQUE2QixNQUFNLHlDQUF5QztBQUFBLE1BQ3RGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLFdBQVc7QUFBQSxNQUNYLE9BQU87QUFBQSxRQUNMO0FBQUEsVUFDRSxNQUFNO0FBQUEsVUFDTixXQUFXO0FBQUEsVUFDWCxPQUFPO0FBQUEsWUFDTDtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTyxDQUFDLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSx3Q0FBd0MsQ0FBQztBQUFBLFlBQ3BGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMLEVBQUUsTUFBTSxXQUFXLE1BQU0sNENBQTRDO0FBQUEsZ0JBQ3JFLEVBQUUsTUFBTSxRQUFRLE1BQU0sMENBQTBDO0FBQUEsZ0JBQ2hFLEVBQUUsTUFBTSxTQUFTLE1BQU0sMkNBQTJDO0FBQUEsZ0JBQ2xFLEVBQUUsTUFBTSxTQUFTLE1BQU0sMkNBQTJDO0FBQUEsY0FDcEU7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGdCQUNBO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsWUFDQTtBQUFBLGNBQ0UsTUFBTTtBQUFBLGNBQ04sT0FBTztBQUFBLGdCQUNMO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGtCQUNOLE9BQU87QUFBQSxvQkFDTDtBQUFBLHNCQUNFLE1B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
