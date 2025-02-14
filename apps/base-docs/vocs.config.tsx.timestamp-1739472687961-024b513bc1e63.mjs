// vocs.config.tsx
import { defineConfig } from "file:///Users/ericbrown/code/base/vocs-mvp/node_modules/vocs/_lib/index.js";

// sidebar.ts
var sidebar = [
  {
    text: "Overview",
    link: "/"
  },
  {
    text: "Quickstart",
    link: "/quickstart"
  },
  {
    text: "Builder Kits",
    items: [
      {
        text: "OnchainKit",
        collapsed: true,
        items: [
          {
            text: "Introduction",
            items: [{ text: "Getting Started", link: "/builderkits/onchainkit/getting-started" }]
          },
          {
            text: "Installation",
            items: [
              { text: "Next.js", link: "/builderkits/onchainkit/installation/nextjs" },
              { text: "Vite", link: "/builderkits/onchainkit/installation/vite" },
              { text: "Remix", link: "/builderkits/onchainkit/installation/remix" },
              { text: "Astro", link: "/builderkits/onchainkit/installation/astro" }
            ]
          },
          {
            text: "Config",
            items: [
              {
                text: "OnchainKitProvider",
                link: "/builderkits/onchainkit/config/onchainkit-provider"
              }
            ]
          },
          {
            text: "Contribution",
            items: [
              {
                text: "How to Contribute",
                link: "/builderkits/onchainkit/guides/contribution"
              },
              {
                text: "Report a Bug",
                link: "/builderkits/onchainkit/guides/reporting-bug"
              }
            ]
          },
          {
            text: "Guides",
            items: [
              {
                text: "Lifecycle Status",
                link: "/builderkits/onchainkit/guides/lifecycle-status"
              },
              {
                text: "Tailwind CSS Integration",
                link: "/builderkits/onchainkit/guides/tailwind"
              },
              {
                text: "Theme Customization",
                link: "/builderkits/onchainkit/guides/themes"
              },
              {
                text: "Use Basename",
                link: "/builderkits/onchainkit/guides/use-basename-in-onchain-app"
              }
            ]
          },
          {
            text: "Templates",
            items: [
              {
                text: "Onchain NFT App \u2197",
                link: "https://ock-mint.vercel.app/"
              },
              {
                text: "Onchain Commerce App \u2197",
                link: "https://onchain-commerce-template.vercel.app/"
              },
              {
                text: "Onchain Social Profile \u2197",
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
                    link: "/builderkits/onchainkit/checkout/checkout"
                  }
                ]
              },
              {
                text: "Frame",
                items: [
                  {
                    text: "FrameMetadata",
                    link: "/builderkits/onchainkit/frame/frame-metadata"
                  }
                ]
              },
              {
                text: "Fund",
                items: [
                  {
                    text: "FundButton",
                    link: "/builderkits/onchainkit/fund/fund-button"
                  }
                ]
              },
              {
                text: "Identity",
                items: [
                  {
                    text: "Identity",
                    link: "/builderkits/onchainkit/identity/identity"
                  },
                  {
                    text: "Address",
                    link: "/builderkits/onchainkit/identity/address"
                  },
                  {
                    text: "Avatar",
                    link: "/builderkits/onchainkit/identity/avatar"
                  },
                  {
                    text: "Badge",
                    link: "/builderkits/onchainkit/identity/badge"
                  },
                  {
                    text: "IdentityCard",
                    link: "/builderkits/onchainkit/identity/identity-card"
                  },
                  {
                    text: "Name",
                    link: "/builderkits/onchainkit/identity/name"
                  },
                  {
                    text: "Socials",
                    link: "/builderkits/onchainkit/identity/socials"
                  }
                ]
              },
              {
                text: "Mint",
                items: [
                  {
                    text: "NFTCard",
                    link: "/builderkits/onchainkit/mint/nft-card"
                  },
                  {
                    text: "NFTMintCard",
                    link: "/builderkits/onchainkit/mint/nft-mint-card"
                  }
                ]
              },
              {
                text: "Swap",
                items: [
                  {
                    text: "Swap",
                    link: "/builderkits/onchainkit/swap/swap"
                  },
                  {
                    text: "SwapSettings",
                    link: "/builderkits/onchainkit/swap/swap-settings"
                  }
                ]
              },
              {
                text: "Token",
                items: [
                  {
                    text: "TokenChip",
                    link: "/builderkits/onchainkit/token/token-chip"
                  },
                  {
                    text: "TokenImage",
                    link: "/builderkits/onchainkit/token/token-image"
                  },
                  {
                    text: "TokenRow",
                    link: "/builderkits/onchainkit/token/token-row"
                  },
                  {
                    text: "TokenSearch",
                    link: "/builderkits/onchainkit/token/token-search"
                  },
                  {
                    text: "TokenSelectDropdown",
                    link: "/builderkits/onchainkit/token/token-select-dropdown"
                  }
                ]
              },
              {
                text: "Transaction",
                items: [
                  {
                    text: "Transaction",
                    link: "/builderkits/onchainkit/transaction/transaction"
                  }
                ]
              },
              {
                text: "Wallet",
                items: [
                  {
                    text: "Wallet",
                    link: "/builderkits/onchainkit/wallet/wallet"
                  },
                  {
                    text: "WalletDropdownBasename",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-basename"
                  },
                  {
                    text: "WalletDropdownDisconnect",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-disconnect"
                  },
                  {
                    text: "WalletDropdownFundLink",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-fund-link"
                  },
                  {
                    text: "WalletDropdownLink",
                    link: "/builderkits/onchainkit/wallet/wallet-dropdown-link"
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
                    link: "/builderkits/onchainkit/api/get-token-details"
                  },
                  {
                    text: "getMintDetails",
                    link: "/builderkits/onchainkit/api/get-mint-details"
                  },
                  {
                    text: "buildMintTransaction",
                    link: "/builderkits/onchainkit/api/build-mint-transaction"
                  }
                ]
              },
              {
                text: "Swap",
                items: [
                  {
                    text: "buildSwapTransaction",
                    link: "/builderkits/onchainkit/api/build-swap-transaction"
                  },
                  {
                    text: "getSwapQuote",
                    link: "/builderkits/onchainkit/api/get-swap-quote"
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
        text: "AgentKit \u2197",
        link: "https://docs.cdp.coinbase.com/agentkit/docs/welcome"
      }
    ]
  },
  {
    text: "Blockspace Tools",
    items: [
      {
        text: "Paymaster \u2197",
        link: "https://docs.cdp.coinbase.com/paymaster/docs/welcome"
      }
      // { PENDING APPCHAIN RELEASE 2/25
      //   text: 'Appchains ↗',
      //   link: 'https://docs.cdp.coinbase.com/paymaster/docs/welcome',
      // },
    ]
  },
  {
    text: "Identity",
    items: [
      {
        text: "Smart Wallet",
        collapsed: true,
        items: [
          {
            text: "Quickstart Guide",
            items: [
              { text: "Quick Start", link: "/identity/smart-wallet/quick-start" }
            ]
          },
          {
            text: "Introduction",
            items: [
              { text: "Why Smart Wallet", link: "/identity/smart-wallet/why-smart-wallet" },
              { text: "Launch Ready Checklist", link: "/identity/smart-wallet/launch-ready-checklist" },
              { text: "Wallet Library Support", link: "/identity/smart-wallet/wallet-library-support" },
              { text: "Base Gasless Campaign", link: "/identity/smart-wallet/base-gasless-campaign" }
            ]
          },
          {
            text: "Tutorials",
            items: [
              {
                text: "Create a New Web App",
                items: [
                  { text: "Using Onchain App Template", link: "/identity/smart-wallet/guides/create-app/using-onchain-app-template" },
                  { text: "Using Wagmi", link: "/identity/smart-wallet/guides/create-app/using-wagmi" }
                ]
              },
              { text: "Update Existing App", link: "/identity/smart-wallet/guides/update-existing-app" },
              { text: "React Native Integration", link: "/identity/smart-wallet/guides/react-native-integration" },
              { text: "Create Wallet Button", link: "/identity/smart-wallet/guides/components/create-wallet-button" },
              { text: "Signature Verification", link: "/identity/smart-wallet/guides/signature-verification" },
              { text: "SIWE", link: "/identity/smart-wallet/guides/siwe" },
              { text: "Batch Transactions", link: "/identity/smart-wallet/guides/batch-transactions" },
              {
                text: "Spend Permissions",
                items: [
                  { text: "Overview", link: "/identity/smart-wallet/guides/spend-permissions/overview" },
                  { text: "Quick Start", link: "/identity/smart-wallet/guides/spend-permissions/quick-start" },
                  {
                    text: "API Reference",
                    items: [
                      { text: "Client Resources", link: "/identity/smart-wallet/guides/spend-permissions/api-reference/client-resources" },
                      { text: "SpendPermissionManager", link: "/identity/smart-wallet/guides/spend-permissions/api-reference/spendpermissionmanager" },
                      { text: "Wallet FetchPermissions", link: "/identity/smart-wallet/guides/spend-permissions/api-reference/wallet-fetchpermissions" }
                    ]
                  }
                ]
              },
              {
                text: "Tips & Tricks",
                items: [
                  { text: "Inspect Transaction Simulation", link: "/identity/smart-wallet/guides/tips/inspect-txn-simulation" },
                  { text: "Popup Tips", link: "/identity/smart-wallet/guides/tips/popup-tips" }
                ]
              }
            ]
          },
          {
            text: "SDK",
            items: [
              {
                text: "Getting Started",
                link: "/identity/smart-wallet/sdk/getting-started",
                items: [{ text: "createCoinbaseWalletSDK", link: "/identity/smart-wallet/sdk/create-coinbase-wallet-sdk" }]
              }
            ]
          },
          {
            text: "FAQ & Troubleshooting",
            items: [
              { text: "FAQ", link: "/identity/smart-wallet/FAQ" }
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
              { text: "Basenames Wagmi Tutorial", link: "/identity/basenames/basenames-wagmi-tutorial" },
              { text: "Basenames OnchainKit Tutorial", link: "/identity/basenames/basenames-onchainkit-tutorial" }
            ]
          },
          {
            text: "FAQ & Troubleshooting",
            items: [
              { text: "Basenames FAQ", link: "/identity/basenames/basenames-faq" }
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
              { text: "Quickstart", link: "/identity/verifications/quickstart" }
            ]
          },
          {
            text: "Introduction",
            items: [
              { text: "Welcome", link: "/identity/verifications/welcome" },
              { text: "Use Cases", link: "/identity/verifications/use-cases" }
            ]
          },
          {
            text: "Documentation",
            items: [
              { text: "Attestations", link: "/identity/verifications/attestations" }
            ]
          },
          { text: "FAQ & Troubleshooting", link: "/identity/verifications/faq-troubleshooting" },
          {
            text: "Support",
            items: [
              { text: "Discord Community", link: "/identity/verifications/verifications-discord" }
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
          { text: "Deploy on Base", link: "/chain/deploy-on-base-quickstart" },
          { text: "Network Information", link: "/chain/network-information" },
          { text: "Fees", link: "/chain/fees" },
          { text: "Differences Between Ethereum and Base", link: "/chain/differences-between-ethereum-and-base" },
          { text: "Run a Base Node", link: "/chain/run-a-base-node" },
          { text: "Bridge an L1 Token to Base", link: "/chain/bridge-an-l1-token-to-base" }
        ]
      },
      {
        text: "Contracts",
        collapsed: true,
        items: [
          { text: "Base Contracts", link: "/chain/base-contracts" }
        ]
      },
      {
        text: "Security",
        collapsed: true,
        items: [
          { text: "Security", link: "/chain/security" }
        ]
      },
      {
        text: "OP Stack",
        collapsed: true,
        items: [
          { text: "Decentralizing Base with Optimism", link: "/chain/decentralizing-base-with-optimism" }
        ]
      },
      {
        text: "Tools",
        collapsed: true,
        items: [
          { text: "Onchain Registry API", link: "/chain/registry-api" },
          { text: "Node Providers", link: "/chain/node-providers" },
          { text: "Block Explorers", link: "/chain/block-explorers" },
          { text: "Network Faucets", link: "/chain/network-faucets" },
          { text: "Oracles", link: "/chain/oracles" },
          { text: "Data Indexers", link: "/chain/data-indexers" },
          { text: "Cross-chain", link: "/chain/cross-chain" },
          { text: "Account Abstraction", link: "/chain/account-abstraction" },
          { text: "Onramps", link: "/chain/onramps" }
        ]
      }
    ]
  },
  {
    text: "Use Cases",
    items: [
      {
        text: "Onboard any user",
        link: "/use-cases/onboard-any-user"
      },
      {
        text: "Accept crypto payments",
        link: "/use-cases/accept-crypto-payments"
      },
      {
        text: "Launch AI Agents",
        link: "/use-cases/launch-ai-agents"
      },
      {
        text: "Decentralize your social app",
        link: "/use-cases/decentralize-social-app"
      },
      {
        text: "DeFi your app",
        link: "/use-cases/defi-your-app"
      },
      {
        text: "Go gasless",
        link: "/use-cases/go-gasless"
      }
    ]
  },
  {
    text: "Cookbook",
    items: [
      {
        text: "Use Case Guides",
        collapsed: true,
        items: [
          {
            text: "Payments & Commerce",
            items: [
              { text: "Accept Crypto Payments", link: "/cookbook/use-case-guides/commerce/accept-crypto-payments" },
              { text: "Build an E-commerce App", link: "/cookbook/use-case-guides/commerce/build-an-ecommerce-app" },
              { text: "Deploy a Shopify Storefront", link: "/cookbook/use-case-guides/commerce/deploy-a-shopify-storefront" },
              { text: "Transaction Guide", link: "/cookbook/life-cycle-guides/activating/transactions" }
            ]
          },
          {
            text: "NFTs & Digital Assets",
            items: [
              { text: "NFT Minting with Zora", link: "/cookbook/use-case-guides/creator/nft-minting-with-zora" },
              { text: "No-Code NFT Minting", link: "/cookbook/life-cycle-guides/activating/no-code-minting" },
              { text: "NFT Minting Guide", link: "/cookbook/life-cycle-guides/activating/nft-minting" },
              { text: "Convert Farcaster Frame to Open Frame", link: "/cookbook/use-case-guides/creator/convert-farcaster-frame-to-open-frame" }
            ]
          },
          {
            text: "DeFi & Financial Tools",
            items: [
              { text: "Add In-App Funding (Onramp)", link: "/cookbook/use-case-guides/finance/build-a-smart-wallet-funding-app" },
              { text: "Access Real-World Data (Chainlink)", link: "/cookbook/use-case-guides/finance/access-real-world-data-chainlink" },
              { text: "Access Real-Time Asset Data (Pyth)", link: "/cookbook/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds" }
            ]
          },
          {
            text: "Growth & Distribution",
            items: [
              {
                text: "Social & Distribution",
                items: [
                  { text: "Cast Actions", link: "/cookbook/life-cycle-guides/growing/cast-actions" },
                  { text: "Hyperframes", link: "/cookbook/life-cycle-guides/growing/hyperframes" }
                ]
              },
              {
                text: "Deployment & Access",
                items: [
                  { text: "Deploy to Vercel", link: "/cookbook/life-cycle-guides/growing/deploy-to-vercel" },
                  { text: "Gating and Redirects", link: "/cookbook/life-cycle-guides/growing/gating-and-redirects" }
                ]
              },
              {
                text: "User Engagement",
                items: [
                  { text: "Email Campaigns", link: "/cookbook/life-cycle-guides/retaining/create-email-campaigns" }
                ]
              }
            ]
          }
        ]
      },
      {
        text: "General Development",
        collapsed: true,
        items: [
          {
            text: "Smart Contract Development",
            items: [
              {
                text: "Hardhat",
                items: [
                  { text: "Deploy with Hardhat", link: "/cookbook/general-development/smart-contract-development/hardhat/deploy-with-hardhat" },
                  { text: "Debugging Smart Contracts", link: "/cookbook/general-development/smart-contract-development/hardhat/debugging-smart-contracts" },
                  { text: "Optimizing Gas Usage", link: "/cookbook/general-development/smart-contract-development/hardhat/optimizing-gas-usage" },
                  { text: "Reducing Contract Size", link: "/cookbook/general-development/smart-contract-development/hardhat/reducing-contract-size" },
                  { text: "Analyzing Test Coverage", link: "/cookbook/general-development/smart-contract-development/hardhat/analyzing-test-coverage" }
                ]
              },
              {
                text: "Foundry",
                items: [
                  { text: "Deploy with Foundry", link: "/cookbook/general-development/smart-contract-development/foundry/deploy-with-foundry" },
                  { text: "Setup with Base", link: "/cookbook/general-development/smart-contract-development/foundry/setup-with-base" },
                  { text: "Testing Smart Contracts", link: "/cookbook/general-development/smart-contract-development/foundry/testing-smart-contracts" }
                ]
              },
              {
                text: "Remix",
                items: [
                  { text: "Deploy with Remix", link: "/cookbook/general-development/smart-contract-development/remix/deploy-with-remix" }
                ]
              },
              {
                text: "Tenderly",
                items: [
                  { text: "Deploy with Tenderly", link: "/cookbook/general-development/smart-contract-development/tenderly/deploy-with-tenderly" }
                ]
              },
              {
                text: "ThirdWeb",
                items: [
                  { text: "Deploy with ThirdWeb", link: "/cookbook/general-development/smart-contract-development/thirdweb/deploy-with-thirdweb" },
                  { text: "Build with ThirdWeb", link: "/cookbook/general-development/smart-contract-development/thirdweb/build-with-thirdweb" },
                  { text: "ThirdWeb SDK", link: "/cookbook/general-development/smart-contract-development/thirdweb/thirdweb-sdk" },
                  { text: "ThirdWeb CLI", link: "/cookbook/general-development/smart-contract-development/thirdweb/thirdweb-cli" }
                ]
              }
            ]
          },
          {
            text: "NFTs",
            items: [
              { text: "Simple Onchain NFTs", link: "/cookbook/general-development/nfts/simple-onchain-nfts" },
              { text: "Dynamic NFTs", link: "/cookbook/general-development/nfts/dynamic-nfts" },
              { text: "Complex Onchain NFTs", link: "/cookbook/general-development/nfts/complex-onchain-nfts" },
              { text: "Signature Mint", link: "/cookbook/general-development/nfts/signature-mint" },
              { text: "ThirdWeb Unreal NFT Items", link: "/cookbook/general-development/nfts/thirdweb-unreal-nft-items" }
            ]
          },
          {
            text: "IPFS",
            items: [
              { text: "Deploy with Fleek", link: "/cookbook/general-development/ipfs/deploy-with-fleek" }
            ]
          },
          {
            text: "Token Gating",
            items: [
              { text: "Gate IRL Events with Nouns", link: "/cookbook/general-development/token-gating/gate-irl-events-with-nouns" }
            ]
          },
          {
            text: "Client-Side Development",
            items: [
              { text: "Introduction to Providers", link: "/cookbook/general-development/client-side-development/introduction-to-providers" }
            ]
          },
          {
            text: "Account Abstraction",
            items: [
              { text: "Using Biconomy", link: "/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-biconomy" },
              { text: "Using Particle Network", link: "/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-particle-network" },
              { text: "Using Privy and Base Paymaster", link: "/cookbook/general-development/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster" },
              { text: "Gasless Transactions with Paymaster", link: "/cookbook/general-development/account-abstraction/gasless-transactions-with-paymaster" }
            ]
          },
          {
            text: "Cross-Chain",
            items: [
              { text: "Bridge Tokens with LayerZero", link: "/cookbook/general-development/cross-chain/bridge-tokens-with-layerzero" },
              { text: "Send Messages and Tokens from Base (Chainlink)", link: "/cookbook/general-development/cross-chain/send-messages-and-tokens-chainlink" }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Feedback",
    items: [
      {
        text: "Get help \u2197",
        link: "https://discord.com/invite/buildonbase"
      },
      {
        text: "Bug bounty \u2197",
        link: "https://hackerone.com/coinbase"
      }
    ]
  }
];

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
    { text: "Get Help", link: "https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav" },
    {
      text: "base.org",
      link: "https://base.org"
    }
  ],
  layout: "right"
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHN4IiwgInNpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZvY3MnXG5pbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSAnLi9zaWRlYmFyLnRzJ1xuaW1wb3J0IHsgTW9kdWxlS2luZCwgTW9kdWxlUmVzb2x1dGlvbktpbmQgfSBmcm9tICd0eXBlc2NyaXB0J1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCdcblxuY29uc3QgYmFzZUNvbmZpZyA9IHtcbiAgLy9iYXNlUGF0aDogXCJodHRwczovL2RvY3MuYmFzZS5vcmcvZG9jc1wiLCAvLyBDb21tZW50IG91dCBpbiBsb2NhbCBkZXZcbiAgYmFzZVVybDogJy8nLFxuICB0aXRsZTogJ0Jhc2UgRG9jcycsXG4gIGRlc2NyaXB0aW9uOiAnRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyJyxcbiAgaWNvblVybDoge1xuICAgIGxpZ2h0OiAnaW1nL2Zhdmljb24uaWNvJyxcbiAgICBkYXJrOiAnaW1nL2Zhdmljb24uaWNvJyxcbiAgfSxcbiAgLy8gbG9nb1VybDoge1xuICAvLyAgIC8vIGxpZ2h0OiAsXG4gIC8vICAgLy8gZGFyazogLFxuICAvLyB9XG59XG5cbi8vIHVzZWQgZm9yIGdsb2JhbCBkaXNtaXNzYWJsZSBhbm5vdW5jZW1lbnRzLCBldGNcbmNvbnN0IGJhbm5lckNvbmZpZyA9IHtcbiAgLy8gSWYgd2UgZG9uJ3QgZm9yayB2b2NzLCB0aGUgYmFubmVyIGNhbiBiZSBvdmVycmlkZGVuIGFzIHNlZW4gYmVsb3cgdG8gYWRkIGEgaGVhZGVyXG4gIC8vIGJhbm5lcjoge1xuICAvLyAgIGNvbnRlbnQ6IChcbiAgLy8gICAgIDxkaXYgY2xhc3NOYW1lPVwidm9jc19iYW5uZXJfY29udGVudFwiPlxuICAvLyAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImxlZnQtY29sdW1uXCI+XG4gIC8vICAgICAgICAgey8qIE9wdGlvbmFsOiBBZGQgY29udGVudCBoZXJlIGlmIG5lZWRlZCBpbiB0aGUgZnV0dXJlICovfVxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgPGRpdiBjbGFzc05hbWU9XCJjZW50ZXItY29sdW1uXCI+XG4gIC8vICAgICAgICAgPG5hdiBjbGFzc05hbWU9XCJuYXZpZ2F0aW9uLWxpbmtzXCI+XG4gIC8vICAgICAgICAgICA8YSBocmVmPVwiL1wiPkFQSTwvYT5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvZG9jc1wiPlRvb2xzPC9hPlxuICAvLyAgICAgICAgICAgPGEgaHJlZj1cIi9ibG9nXCI+QmxvZzwvYT5cbiAgLy8gICAgICAgICAgIDxhIGhyZWY9XCIvY29tbXVuaXR5XCI+Q29tbXVuaXR5PC9hPlxuICAvLyAgICAgICAgIDwvbmF2PlxuICAvLyAgICAgICA8L2Rpdj5cbiAgLy8gICAgICAgPGRpdiBjbGFzc05hbWU9XCJyaWdodC1jb2x1bW5cIj5cbiAgLy8gICAgICAgICA8YnV0dG9uXG4gIC8vICAgICAgICAgICBjbGFzc05hbWU9XCJjb25uZWN0LXdhbGxldC1idXR0b25cIlxuICAvLyAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAvLyAgICAgICAgICAgICAvLyBBZGQgeW91ciB3YWxsZXQgY29ubmVjdGlvbiBsb2dpYyBoZXJlXG4gIC8vICAgICAgICAgICB9fVxuICAvLyAgICAgICAgID5cbiAgLy8gICAgICAgICAgIENvbm5lY3QgV2FsbGV0XG4gIC8vICAgICAgICAgPC9idXR0b24+XG4gIC8vICAgICAgIDwvZGl2PlxuICAvLyAgICAgPC9kaXY+XG4gIC8vICAgKSxcbiAgLy8gICBoZWlnaHQ6ICc5OXB4JywgLy8gTXVzdCBtYXRjaCBoZWlnaHQgaW4gQ1NTXG4gIC8vICAgZGlzbWlzc2FibGU6ICdmYWxzZScsIC8vIE1ha2UgaXQgcGVybWFuZW50XG4gIC8vICAgYmFja2dyb3VuZENvbG9yOiAnIzIzMjIyNScsIC8vIENoYXJjb2FsIGNvbG9yXG4gIC8vIH1cbn1cblxuLy8gUmV1c2FibGUgbmF2IGxpbmsgc3R5bGVzIChpZiBub3QgdXNpbmcgVGFpbHdpbmQpXG5jb25zdCBuYXZMaW5rU3R5bGU6IFJlYWN0LkNTU1Byb3BlcnRpZXMgPSB7XG4gIGNvbG9yOiAnaW5oZXJpdCcsXG4gIHRleHREZWNvcmF0aW9uOiAnbm9uZScsXG4gIHRyYW5zaXRpb246ICdvcGFjaXR5IDAuMnMnLFxuICAnOmhvdmVyJzogeyBvcGFjaXR5OiAwLjcgfSxcbn1cblxuY29uc3QgdHdvc2xhc2hDb25maWcgPSB7XG4gIHR3b3NsYXNoOiB7XG4gICAgY29tcGlsZXJPcHRpb25zOiB7XG4gICAgICBhbGxvd1VtZEdsb2JhbEFjY2VzczogdHJ1ZSxcbiAgICAgIGVzTW9kdWxlSW50ZXJvcDogdHJ1ZSxcbiAgICAgIG1vZHVsZTogTW9kdWxlS2luZC5Ob2RlTmV4dCwgLy9Nb2R1bGVLaW5kLlByZXNlcnZlXG4gICAgICBtb2R1bGVSZXNvbHV0aW9uOiBNb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlTmV4dCxcbiAgICB9LFxuICB9XG59XG5cbmNvbnN0IHNpZGViYXJDb25maWcgPSB7XG4gIHNpZGViYXI6IHNpZGViYXJcbn1cblxuY29uc3QgdG9wTmF2Q29uZmlnID0ge1xuICB0b3BOYXY6IFtcbiAgICB7IHRleHQ6ICdHZXQgSGVscCcsIGxpbms6ICdodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS9idWlsZG9uYmFzZT91dG1fc291cmNlPWRvdG9yZyZ1dG1fbWVkaXVtPW5hdid9LFxuICAgIHtcbiAgICAgIHRleHQ6ICdiYXNlLm9yZycsXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9iYXNlLm9yZycsXG4gICAgfVxuICBdLFxuICBsYXlvdXQ6ICdyaWdodCcsXG59XG5cbmNvbnN0IG1hcmtkb3duQ29uZmlnID0ge1xuICBjb2RlOiB7XG4gICAgdGhlbWVzOiB7XG4gICAgICBsaWdodDogJ2dpdGh1Yi1saWdodCcsXG4gICAgICBkYXJrOiAnZ2l0aHViLWRhcmsnLFxuICAgIH1cbiAgfVxufVxuXG4vLyBwbHVnaW5zIGZvciB0cmFuc2Zvcm1pbmcgbWFya2Rvd246IGh0dHBzOi8vZ2l0aHViLmNvbS9yZW1hcmtqcy9yZW1hcmsvYmxvYi9tYWluL2RvYy9wbHVnaW5zLm1kI2xpc3Qtb2YtcGx1Z2luc1xuY29uc3QgcGx1Z2dhYmxlQ29uZmlnID17XG4gIG1hcmtkb3duOiB7XG4gICAgcmVtYXJrUGx1Z2luczogW1xuICAgICAgLy8gQWRkIHlvdXIgcmVtYXJrIHBsdWdpbnMgaGVyZVxuICAgIF1cbiAgfVxufVxuXG5cbmNvbnN0IGJsb2dDb25maWcgPSB7XG4gIGJsb2dEaXI6IFwiLi9ibG9nXCJcbn1cblxuLy8gQ2FuIGRlZmluZSBwYXRoIG9iamVjdHMgd2hpY2ggcmV0dXJuIGRpZmZlcmVudCBtZXRhIHRhZ3MgZm9yIG1vcmUgY29udHJvbFxuY29uc3QgaGVhZENvbmZpZyA9IHtcbiAgaGVhZDogKFxuICAgIDw+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnR5cGVcIiBjb250ZW50PVwid2Vic2l0ZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cIm9nOnRpdGxlXCIgY29udGVudD1cIkJhc2UgfCBEb2NzXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9kb2NzLmJhc2Uub3JnL2ltZy9iYXNlLW9wZW4tZ3JhcGgucG5nXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwib2c6ZGVzY3JpcHRpb25cIiBjb250ZW50PVwiRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjp0aXRsZVwiIGNvbnRlbnQ9XCJCYXNlIHwgRG9jc1wiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6aW1hZ2VcIiBjb250ZW50PVwiaHR0cHM6Ly9kb2NzLmJhc2Uub3JnL2ltZy9iYXNlLW9wZW4tZ3JhcGgucG5nXCIgLz5cbiAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjpkZXNjcmlwdGlvblwiIGNvbnRlbnQ9XCJFeHBsb3JlIHRoZSBkb2N1bWVudGF0aW9uIGZvciBCYXNlLCBhIHNlY3VyZSwgbG93LWNvc3QsIGJ1aWxkZXItZnJpZW5kbHkgRXRoZXJldW0gTDJcIiAvPlxuICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIC8+XG4gICAgICA8bWV0YSBwcm9wZXJ0eT1cInR3aXR0ZXI6ZG9tYWluXCIgY29udGVudD1cImJhc2Uub3JnXCIgLz5cbiAgICA8Lz5cbiAgKSxcbn1cblxuLy8gdm9jcyB1c2VzIE1pbmlTZWFyY2gsIGNoZWNrIGNvbmZpZ3NcbmNvbnN0IHNlYXJjaENvbmZpZyA9IHsgXG4gIHNlYXJjaDoge1xuICAgIGZpZWxkczogWyd0aXRsZScsICdjb250ZW50JywgJ3Byb2R1Y3RMaW5lJywgJ2RvY1R5cGUnLCAndXNlclR5cGUnXSwgIC8vIEZpZWxkcyB0byBpbmRleFxuICAgIHN0b3JlRmllbGRzOiBbJ3RpdGxlJywgJ3NuaXBwZXQnLCAncHJvZHVjdExpbmUnLCAnZG9jVHlwZSddLCAvLyBGaWVsZHMgdG8gcmV0dXJuIGluIHJlc3VsdHNcbiAgICBzZWFyY2hPcHRpb25zOiB7XG4gICAgICBwcmVmaXg6IHRydWUsIC8vIEF1dG9jb21wbGV0ZVxuICAgICAgZnV6enk6IDAuMiwgIC8vIFR5cG8gdG9sZXJhbmNlXG4gICAgICBib29zdDogeyBkb2NUeXBlOiB7ICdBUEknOiAyLCAnR3VpZGUnOiAxLjUgfSwgcmVjZW5jeVNjb3JlOiAyIH0sIC8vIEJvb3N0aW5nIGJ5IGRvY3VtZW50IHR5cGUgYW5kIHJlY2VuY3lcbiAgICAgIGZpbHRlcjogKGRvYzogeyBwcm9kdWN0TGluZTogc3RyaW5nIH0pID0+IFxuICAgICAgICBkb2MucHJvZHVjdExpbmUgPT09ICdCYXNlIFByb3RvY29sJyB8fCBkb2MucHJvZHVjdExpbmUgPT09ICdPbmNoYWluS2l0JywgLy8gRmFjZXRlZCBzZWFyY2hcbiAgICAgIGhpZ2hsaWdodDogdHJ1ZSwgLy8gSW5zdGFudCBzZWFyY2ggcmVzdWx0IHByZXZpZXdcbiAgICAgIGxpbWl0OiAxMCAvLyBQYWdpbmF0aW9uXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIC4uLmJhc2VDb25maWcsXG4gIC4uLmJhbm5lckNvbmZpZyxcbiAgLi4uc2lkZWJhckNvbmZpZyxcbiAgLi4udG9wTmF2Q29uZmlnLFxuICAuLi5ibG9nQ29uZmlnLFxuICAuLi5oZWFkQ29uZmlnLFxuICAuLi5tYXJrZG93bkNvbmZpZyxcbiAgLi4ucGx1Z2dhYmxlQ29uZmlnLFxuICAuLi5zZWFyY2hDb25maWcsXG4gIC4uLnR3b3NsYXNoQ29uZmlnLFxuICB2aXRlOiB7XG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MnKSxcbiAgICAgICAgJ0AvY29tcG9uZW50cyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy9jb21wb25lbnRzJyksXG4gICAgICAgICdAL3BhZ2VzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3BhZ2VzJyksXG4gICAgICAgICdAL3N0eWxlcyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy9zdHlsZXMnKSxcbiAgICAgICAgJ0AvbGliJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL2xpYicpLFxuICAgICAgICAnQC91dGlscyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy91dGlscycpLFxuICAgICAgICAnQC90eXBlcyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy90eXBlcycpXG4gICAgICB9XG4gICAgfVxuICB9XG59KVxuXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9lcmljYnJvd24vY29kZS9iYXNlL3ZvY3MtbXZwXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvZXJpY2Jyb3duL2NvZGUvYmFzZS92b2NzLW12cC9zaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9lcmljYnJvd24vY29kZS9iYXNlL3ZvY3MtbXZwL3NpZGViYXIudHNcIjtpbXBvcnQgdHlwZSB7IFNpZGViYXIgfSBmcm9tICd2b2NzJ1xuXG4vLyBOb3RlOiBjYXJlZnVsIG9mIG5hbWUgY2xhc2hpbmcgYmV0d2VlbiBzaWRlYmFyIGl0ZW1zIGFuZCBkb2NzIHBhZ2VzLiBcbi8vIEZvciBleGFtcGxlLCAnUXVpY2tzdGFydCcgaXMgdXNlZCBmb3IgYm90aCBzaWRlYmFyIGFuZCBwYWdlIG5hbWVzLlxuLy8gSWYgZG9jcyBhcmUgcGFydCBvZiBhIHNpZGViYXIgY29sbGVjdGlvbiwgdGhleSBzaG91bGQgYmUgaW4gYSBzdWJmb2xkZXJcbmV4cG9ydCBjb25zdCBzaWRlYmFyOiBTaWRlYmFyID0gW1xuICB7XG4gICAgdGV4dDogJ092ZXJ2aWV3JyxcbiAgICBsaW5rOiAnLycsXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnUXVpY2tzdGFydCcsXG4gICAgbGluazogJy9xdWlja3N0YXJ0JyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdCdWlsZGVyIEtpdHMnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPbmNoYWluS2l0JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdHZXR0aW5nIFN0YXJ0ZWQnLCBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ2V0dGluZy1zdGFydGVkJyB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnN0YWxsYXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTmV4dC5qcycsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vbmV4dGpzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdWaXRlJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi92aXRlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdSZW1peCcsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vcmVtaXgnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FzdHJvJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi9hc3RybycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbktpdFByb3ZpZGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvY29uZmlnL29uY2hhaW5raXQtcHJvdmlkZXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb250cmlidXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdIb3cgdG8gQ29udHJpYnV0ZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9jb250cmlidXRpb24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlcG9ydCBhIEJ1ZycsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9yZXBvcnRpbmctYnVnJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnR3VpZGVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTGlmZWN5Y2xlIFN0YXR1cycsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9saWZlY3ljbGUtc3RhdHVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUYWlsd2luZCBDU1MgSW50ZWdyYXRpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdGFpbHdpbmQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RoZW1lIEN1c3RvbWl6YXRpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdGhlbWVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdVc2UgQmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdXNlLWJhc2VuYW1lLWluLW9uY2hhaW4tYXBwJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVGVtcGxhdGVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbiBORlQgQXBwIFx1MjE5NycsXG4gICAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vb2NrLW1pbnQudmVyY2VsLmFwcC8nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ09uY2hhaW4gQ29tbWVyY2UgQXBwIFx1MjE5NycsXG4gICAgICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vb25jaGFpbi1jb21tZXJjZS10ZW1wbGF0ZS52ZXJjZWwuYXBwLycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbiBTb2NpYWwgUHJvZmlsZSBcdTIxOTcnLFxuICAgICAgICAgICAgICAgIGxpbms6ICdodHRwczovL2dpdGh1Yi5jb20vZmFrZXBpeGVscy9vY2staWRlbnRpdHknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb21wb25lbnRzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDaGVja291dCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9jaGVja291dC9jaGVja291dCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnJhbWUnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdGcmFtZU1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2ZyYW1lL2ZyYW1lLW1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZEJ1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL2Z1bmQtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2FkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0F2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9hdmF0YXInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0JhZGdlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2JhZGdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdJZGVudGl0eUNhcmQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvaWRlbnRpdHktY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnTmFtZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTb2NpYWxzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3NvY2lhbHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdORlRDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvbmZ0LWNhcmQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05GVE1pbnRDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvbmZ0LW1pbnQtY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvc3dhcC9zd2FwJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwU2V0dGluZ3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvc3dhcC9zd2FwLXNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuQ2hpcCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1jaGlwJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbkltYWdlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLWltYWdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlblJvdycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1yb3cnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuU2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLXNlYXJjaCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5TZWxlY3REcm9wZG93bicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90b2tlbi90b2tlbi1zZWxlY3QtZHJvcGRvd24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvdHJhbnNhY3Rpb24vdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXREcm9wZG93bkJhc2VuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQtZHJvcGRvd24tYmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRGlzY29ubmVjdCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWRpc2Nvbm5lY3QnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRnVuZExpbmsnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L3dhbGxldC1kcm9wZG93bi1mdW5kLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duTGluaycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdBUEknLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdNaW50JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0VG9rZW5EZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9nZXQtdG9rZW4tZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0TWludERldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2dldC1taW50LWRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2J1aWxkTWludFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9idWlsZC1taW50LXRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnYnVpbGRTd2FwVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLXN3YXAtdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFN3YXBRdW90ZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LXN3YXAtcXVvdGUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0VG9rZW5zJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LXRva2VucycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1V0aWxpdGllcycsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NvbmZpZycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzQmFzZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvY29uZmlnL2lzLWJhc2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzRXRoZXJldW0nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2NvbmZpZy9pcy1ldGhlcmV1bScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldE9ucmFtcEJ1eVVybCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvZnVuZC9nZXQtb25yYW1wLWJ1eS11cmwnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0ZyYW1lJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0RmFyY2FzdGVyVXNlckFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZhcmNhc3Rlci9nZXQtZmFyY2FzdGVyLXVzZXItYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0RnJhbWVIdG1sUmVzcG9uc2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1odG1sLXJlc3BvbnNlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZU1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZyYW1lL2dldC1mcmFtZS1tZXNzYWdlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRGcmFtZU1ldGFkYXRhJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mcmFtZS9nZXQtZnJhbWUtbWV0YWRhdGEnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFhtdHBGcmFtZU1lc3NhZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3htdHAvZ2V0LXhtdHAtZnJhbWUtbWVzc2FnZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnaXNYbXRwRnJhbWVSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC94bXRwL2lzLXhtdHAtZnJhbWUtcmVxdWVzdCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0QXR0ZXN0YXRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYXR0ZXN0YXRpb25zJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRBdmF0YXInLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hdmF0YXInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldE5hbWUnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VBZGRyZXNzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAndXNlQXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtYXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtbmFtZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW4nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdmb3JtYXRBbW91bnQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3Rva2VuL2Zvcm1hdC1hbW91bnQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzVmFsaWRBQUVudHJ5cG9pbnQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L3dhbGxldC9pcy12YWxpZC1hYS1lbnRyeXBvaW50JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc1dhbGxldEFDb2luYmFzZVNtYXJ0V2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvaXMtd2FsbGV0LWEtY29pbmJhc2Utc21hcnQtd2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVHlwZXMnLFxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdBUEknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvYXBpL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDaGVja291dCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9jaGVja291dC90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2NvbmZpZy90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRmFyY2FzdGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2RvY3Mva2l0cy9vbmNoYWlua2l0L2ZhcmNhc3Rlci90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mdW5kL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGcmFtZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9mcmFtZS90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvaWRlbnRpdHkvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvbWludC90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC9zd2FwL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC90b2tlbi90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvZG9jcy9raXRzL29uY2hhaW5raXQvdHJhbnNhY3Rpb24vdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9kb2NzL2tpdHMvb25jaGFpbmtpdC93YWxsZXQvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0FnZW50S2l0IFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9hZ2VudGtpdC9kb2NzL3dlbGNvbWUnLFxuICAgICAgfSxcbiAgICBdXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnQmxvY2tzcGFjZSBUb29scycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1BheW1hc3RlciBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2NzLmNkcC5jb2luYmFzZS5jb20vcGF5bWFzdGVyL2RvY3Mvd2VsY29tZScsXG4gICAgICB9LFxuICAgICAgLy8geyBQRU5ESU5HIEFQUENIQUlOIFJFTEVBU0UgMi8yNVxuICAgICAgLy8gICB0ZXh0OiAnQXBwY2hhaW5zIFx1MjE5NycsXG4gICAgICAvLyAgIGxpbms6ICdodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9wYXltYXN0ZXIvZG9jcy93ZWxjb21lJyxcbiAgICAgIC8vIH0sXG4gICAgXVxuICB9LFxuICB7XG4gICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnU21hcnQgV2FsbGV0JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdRdWlja3N0YXJ0IEd1aWRlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1F1aWNrIFN0YXJ0JywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvcXVpY2stc3RhcnQnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdXaHkgU21hcnQgV2FsbGV0JywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvd2h5LXNtYXJ0LXdhbGxldCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTGF1bmNoIFJlYWR5IENoZWNrbGlzdCcsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2xhdW5jaC1yZWFkeS1jaGVja2xpc3QnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1dhbGxldCBMaWJyYXJ5IFN1cHBvcnQnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC93YWxsZXQtbGlicmFyeS1zdXBwb3J0JyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdCYXNlIEdhc2xlc3MgQ2FtcGFpZ24nLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9iYXNlLWdhc2xlc3MtY2FtcGFpZ24nIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NyZWF0ZSBhIE5ldyBXZWIgQXBwJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgT25jaGFpbiBBcHAgVGVtcGxhdGUnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvY3JlYXRlLWFwcC91c2luZy1vbmNoYWluLWFwcC10ZW1wbGF0ZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIFdhZ21pJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2NyZWF0ZS1hcHAvdXNpbmctd2FnbWknIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVXBkYXRlIEV4aXN0aW5nIEFwcCcsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy91cGRhdGUtZXhpc3RpbmctYXBwJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdSZWFjdCBOYXRpdmUgSW50ZWdyYXRpb24nLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvcmVhY3QtbmF0aXZlLWludGVncmF0aW9uJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdDcmVhdGUgV2FsbGV0IEJ1dHRvbicsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9jb21wb25lbnRzL2NyZWF0ZS13YWxsZXQtYnV0dG9uJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTaWduYXR1cmUgVmVyaWZpY2F0aW9uJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NpZ25hdHVyZS12ZXJpZmljYXRpb24nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NJV0UnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc2l3ZScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQmF0Y2ggVHJhbnNhY3Rpb25zJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2JhdGNoLXRyYW5zYWN0aW9ucycgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTcGVuZCBQZXJtaXNzaW9ucycsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ092ZXJ2aWV3JywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL292ZXJ2aWV3JyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUXVpY2sgU3RhcnQnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3BlbmQtcGVybWlzc2lvbnMvcXVpY2stc3RhcnQnIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBUEkgUmVmZXJlbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdDbGllbnQgUmVzb3VyY2VzJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2UvY2xpZW50LXJlc291cmNlcycgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdTcGVuZFBlcm1pc3Npb25NYW5hZ2VyJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2Uvc3BlbmRwZXJtaXNzaW9ubWFuYWdlcicgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7IHRleHQ6ICdXYWxsZXQgRmV0Y2hQZXJtaXNzaW9ucycsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9hcGktcmVmZXJlbmNlL3dhbGxldC1mZXRjaHBlcm1pc3Npb25zJyB9LFxuICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RpcHMgJiBUcmlja3MnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdJbnNwZWN0IFRyYW5zYWN0aW9uIFNpbXVsYXRpb24nLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvdGlwcy9pbnNwZWN0LXR4bi1zaW11bGF0aW9uJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnUG9wdXAgVGlwcycsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy90aXBzL3BvcHVwLXRpcHMnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnU0RLJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvZ2V0dGluZy1zdGFydGVkJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW3sgdGV4dDogJ2NyZWF0ZUNvaW5iYXNlV2FsbGV0U0RLJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NyZWF0ZS1jb2luYmFzZS13YWxsZXQtc2RrJyB9XSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnRkFRICYgVHJvdWJsZXNob290aW5nJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0ZBUScsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L0ZBUScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdCYXNlbmFtZXMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdCYXNlbmFtZXMgV2FnbWkgVHV0b3JpYWwnLCBsaW5rOiAnL2lkZW50aXR5L2Jhc2VuYW1lcy9iYXNlbmFtZXMtd2FnbWktdHV0b3JpYWwnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0Jhc2VuYW1lcyBPbmNoYWluS2l0IFR1dG9yaWFsJywgbGluazogJy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLW9uY2hhaW5raXQtdHV0b3JpYWwnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0ZBUSAmIFRyb3VibGVzaG9vdGluZycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdCYXNlbmFtZXMgRkFRJywgbGluazogJy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLWZhcScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdWZXJpZmljYXRpb25zJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdRdWlja3N0YXJ0JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1F1aWNrc3RhcnQnLCBsaW5rOiAnL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvcXVpY2tzdGFydCcgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1dlbGNvbWUnLCBsaW5rOiAnL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvd2VsY29tZScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNlIENhc2VzJywgbGluazogJy9pZGVudGl0eS92ZXJpZmljYXRpb25zL3VzZS1jYXNlcycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnRG9jdW1lbnRhdGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdBdHRlc3RhdGlvbnMnLCBsaW5rOiAnL2lkZW50aXR5L3ZlcmlmaWNhdGlvbnMvYXR0ZXN0YXRpb25zJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgdGV4dDogJ0ZBUSAmIFRyb3VibGVzaG9vdGluZycsIGxpbms6ICcvaWRlbnRpdHkvdmVyaWZpY2F0aW9ucy9mYXEtdHJvdWJsZXNob290aW5nJyB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdTdXBwb3J0JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0Rpc2NvcmQgQ29tbXVuaXR5JywgbGluazogJy9pZGVudGl0eS92ZXJpZmljYXRpb25zL3ZlcmlmaWNhdGlvbnMtZGlzY29yZCcgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdDaGFpbicsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dlbmVyYWwnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IG9uIEJhc2UnLCBsaW5rOiAnL2NoYWluL2RlcGxveS1vbi1iYXNlLXF1aWNrc3RhcnQnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTmV0d29yayBJbmZvcm1hdGlvbicsIGxpbms6ICcvY2hhaW4vbmV0d29yay1pbmZvcm1hdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdGZWVzJywgbGluazogJy9jaGFpbi9mZWVzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RpZmZlcmVuY2VzIEJldHdlZW4gRXRoZXJldW0gYW5kIEJhc2UnLCBsaW5rOiAnL2NoYWluL2RpZmZlcmVuY2VzLWJldHdlZW4tZXRoZXJldW0tYW5kLWJhc2UnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUnVuIGEgQmFzZSBOb2RlJywgbGluazogJy9jaGFpbi9ydW4tYS1iYXNlLW5vZGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQnJpZGdlIGFuIEwxIFRva2VuIHRvIEJhc2UnLCBsaW5rOiAnL2NoYWluL2JyaWRnZS1hbi1sMS10b2tlbi10by1iYXNlJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0NvbnRyYWN0cycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdCYXNlIENvbnRyYWN0cycsIGxpbms6ICcvY2hhaW4vYmFzZS1jb250cmFjdHMnIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnU2VjdXJpdHknLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnU2VjdXJpdHknLCBsaW5rOiAnL2NoYWluL3NlY3VyaXR5JyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ09QIFN0YWNrJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ0RlY2VudHJhbGl6aW5nIEJhc2Ugd2l0aCBPcHRpbWlzbScsIGxpbms6ICcvY2hhaW4vZGVjZW50cmFsaXppbmctYmFzZS13aXRoLW9wdGltaXNtJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1Rvb2xzJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ09uY2hhaW4gUmVnaXN0cnkgQVBJJywgbGluazogJy9jaGFpbi9yZWdpc3RyeS1hcGknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnTm9kZSBQcm92aWRlcnMnLCBsaW5rOiAnL2NoYWluL25vZGUtcHJvdmlkZXJzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0Jsb2NrIEV4cGxvcmVycycsIGxpbms6ICcvY2hhaW4vYmxvY2stZXhwbG9yZXJzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ05ldHdvcmsgRmF1Y2V0cycsIGxpbms6ICcvY2hhaW4vbmV0d29yay1mYXVjZXRzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ09yYWNsZXMnLCBsaW5rOiAnL2NoYWluL29yYWNsZXMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRGF0YSBJbmRleGVycycsIGxpbms6ICcvY2hhaW4vZGF0YS1pbmRleGVycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdDcm9zcy1jaGFpbicsIGxpbms6ICcvY2hhaW4vY3Jvc3MtY2hhaW4nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQWNjb3VudCBBYnN0cmFjdGlvbicsIGxpbms6ICcvY2hhaW4vYWNjb3VudC1hYnN0cmFjdGlvbicgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPbnJhbXBzJywgbGluazogJy9jaGFpbi9vbnJhbXBzJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ1VzZSBDYXNlcycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ09uYm9hcmQgYW55IHVzZXInLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9vbmJvYXJkLWFueS11c2VyJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdBY2NlcHQgY3J5cHRvIHBheW1lbnRzJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvYWNjZXB0LWNyeXB0by1wYXltZW50cycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnTGF1bmNoIEFJIEFnZW50cycsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL2xhdW5jaC1haS1hZ2VudHMnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0RlY2VudHJhbGl6ZSB5b3VyIHNvY2lhbCBhcHAnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9kZWNlbnRyYWxpemUtc29jaWFsLWFwcCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnRGVGaSB5b3VyIGFwcCcsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL2RlZmkteW91ci1hcHAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dvIGdhc2xlc3MnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9nby1nYXNsZXNzJyxcbiAgICAgIH1cbiAgICBdXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnQ29va2Jvb2snLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdVc2UgQ2FzZSBHdWlkZXMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsIFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdQYXltZW50cyAmIENvbW1lcmNlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FjY2VwdCBDcnlwdG8gUGF5bWVudHMnLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jb21tZXJjZS9hY2NlcHQtY3J5cHRvLXBheW1lbnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdCdWlsZCBhbiBFLWNvbW1lcmNlIEFwcCcsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NvbW1lcmNlL2J1aWxkLWFuLWVjb21tZXJjZS1hcHAnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSBhIFNob3BpZnkgU3RvcmVmcm9udCcsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NvbW1lcmNlL2RlcGxveS1hLXNob3BpZnktc3RvcmVmcm9udCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVHJhbnNhY3Rpb24gR3VpZGUnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2FjdGl2YXRpbmcvdHJhbnNhY3Rpb25zJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdORlRzICYgRGlnaXRhbCBBc3NldHMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTkZUIE1pbnRpbmcgd2l0aCBab3JhJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvY3JlYXRvci9uZnQtbWludGluZy13aXRoLXpvcmEnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ05vLUNvZGUgTkZUIE1pbnRpbmcnLCBsaW5rOiAnL2Nvb2tib29rL2xpZmUtY3ljbGUtZ3VpZGVzL2FjdGl2YXRpbmcvbm8tY29kZS1taW50aW5nJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdORlQgTWludGluZyBHdWlkZScsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvYWN0aXZhdGluZy9uZnQtbWludGluZycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQ29udmVydCBGYXJjYXN0ZXIgRnJhbWUgdG8gT3BlbiBGcmFtZScsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NyZWF0b3IvY29udmVydC1mYXJjYXN0ZXItZnJhbWUtdG8tb3Blbi1mcmFtZScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnRGVGaSAmIEZpbmFuY2lhbCBUb29scycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdBZGQgSW4tQXBwIEZ1bmRpbmcgKE9ucmFtcCknLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9maW5hbmNlL2J1aWxkLWEtc21hcnQtd2FsbGV0LWZ1bmRpbmctYXBwJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdBY2Nlc3MgUmVhbC1Xb3JsZCBEYXRhIChDaGFpbmxpbmspJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvZmluYW5jZS9hY2Nlc3MtcmVhbC13b3JsZC1kYXRhLWNoYWlubGluaycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQWNjZXNzIFJlYWwtVGltZSBBc3NldCBEYXRhIChQeXRoKScsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2ZpbmFuY2UvYWNjZXNzLXJlYWwtdGltZS1hc3NldC1kYXRhLXB5dGgtcHJpY2UtZmVlZHMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0dyb3d0aCAmIERpc3RyaWJ1dGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1NvY2lhbCAmIERpc3RyaWJ1dGlvbicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0Nhc3QgQWN0aW9ucycsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvZ3Jvd2luZy9jYXN0LWFjdGlvbnMnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdIeXBlcmZyYW1lcycsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvZ3Jvd2luZy9oeXBlcmZyYW1lcycgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveW1lbnQgJiBBY2Nlc3MnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgdG8gVmVyY2VsJywgbGluazogJy9jb29rYm9vay9saWZlLWN5Y2xlLWd1aWRlcy9ncm93aW5nL2RlcGxveS10by12ZXJjZWwnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdHYXRpbmcgYW5kIFJlZGlyZWN0cycsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvZ3Jvd2luZy9nYXRpbmctYW5kLXJlZGlyZWN0cycgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1VzZXIgRW5nYWdlbWVudCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0VtYWlsIENhbXBhaWducycsIGxpbms6ICcvY29va2Jvb2svbGlmZS1jeWNsZS1ndWlkZXMvcmV0YWluaW5nL2NyZWF0ZS1lbWFpbC1jYW1wYWlnbnMnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHZW5lcmFsIERldmVsb3BtZW50JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdTbWFydCBDb250cmFjdCBEZXZlbG9wbWVudCcsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0hhcmRoYXQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBIYXJkaGF0JywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvZGVwbG95LXdpdGgtaGFyZGhhdCcgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlYnVnZ2luZyBTbWFydCBDb250cmFjdHMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9kZWJ1Z2dpbmctc21hcnQtY29udHJhY3RzJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnT3B0aW1pemluZyBHYXMgVXNhZ2UnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9vcHRpbWl6aW5nLWdhcy11c2FnZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1JlZHVjaW5nIENvbnRyYWN0IFNpemUnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9yZWR1Y2luZy1jb250cmFjdC1zaXplJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnQW5hbHl6aW5nIFRlc3QgQ292ZXJhZ2UnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9hbmFseXppbmctdGVzdC1jb3ZlcmFnZScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0ZvdW5kcnknLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBGb3VuZHJ5JywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvZGVwbG95LXdpdGgtZm91bmRyeScgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1NldHVwIHdpdGggQmFzZScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9mb3VuZHJ5L3NldHVwLXdpdGgtYmFzZScgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1Rlc3RpbmcgU21hcnQgQ29udHJhY3RzJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvdGVzdGluZy1zbWFydC1jb250cmFjdHMnIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdSZW1peCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIFJlbWl4JywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3JlbWl4L2RlcGxveS13aXRoLXJlbWl4JyB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGVuZGVybHknLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdEZXBsb3kgd2l0aCBUZW5kZXJseScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90ZW5kZXJseS9kZXBsb3ktd2l0aC10ZW5kZXJseScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RoaXJkV2ViJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHdpdGggVGhpcmRXZWInLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGhpcmR3ZWIvZGVwbG95LXdpdGgtdGhpcmR3ZWInIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdCdWlsZCB3aXRoIFRoaXJkV2ViJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL2J1aWxkLXdpdGgtdGhpcmR3ZWInIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdUaGlyZFdlYiBTREsnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGhpcmR3ZWIvdGhpcmR3ZWItc2RrJyB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnVGhpcmRXZWIgQ0xJJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL3RoaXJkd2ViLWNsaScgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdORlRzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NpbXBsZSBPbmNoYWluIE5GVHMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy9zaW1wbGUtb25jaGFpbi1uZnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdEeW5hbWljIE5GVHMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy9keW5hbWljLW5mdHMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0NvbXBsZXggT25jaGFpbiBORlRzJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L25mdHMvY29tcGxleC1vbmNoYWluLW5mdHMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NpZ25hdHVyZSBNaW50JywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L25mdHMvc2lnbmF0dXJlLW1pbnQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1RoaXJkV2ViIFVucmVhbCBORlQgSXRlbXMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvbmZ0cy90aGlyZHdlYi11bnJlYWwtbmZ0LWl0ZW1zJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJUEZTJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSB3aXRoIEZsZWVrJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2lwZnMvZGVwbG95LXdpdGgtZmxlZWsnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1Rva2VuIEdhdGluZycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdHYXRlIElSTCBFdmVudHMgd2l0aCBOb3VucycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC90b2tlbi1nYXRpbmcvZ2F0ZS1pcmwtZXZlbnRzLXdpdGgtbm91bnMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0NsaWVudC1TaWRlIERldmVsb3BtZW50JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0ludHJvZHVjdGlvbiB0byBQcm92aWRlcnMnLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvY2xpZW50LXNpZGUtZGV2ZWxvcG1lbnQvaW50cm9kdWN0aW9uLXRvLXByb3ZpZGVycycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQWNjb3VudCBBYnN0cmFjdGlvbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBCaWNvbm9teScsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9hY2NvdW50LWFic3RyYWN0aW9uL2FjY291bnQtYWJzdHJhY3Rpb24tb24tYmFzZS11c2luZy1iaWNvbm9teScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVXNpbmcgUGFydGljbGUgTmV0d29yaycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9hY2NvdW50LWFic3RyYWN0aW9uL2FjY291bnQtYWJzdHJhY3Rpb24tb24tYmFzZS11c2luZy1wYXJ0aWNsZS1uZXR3b3JrJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdVc2luZyBQcml2eSBhbmQgQmFzZSBQYXltYXN0ZXInLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvYWNjb3VudC1hYnN0cmFjdGlvbi9hY2NvdW50LWFic3RyYWN0aW9uLW9uLWJhc2UtdXNpbmctcHJpdnktYW5kLXRoZS1iYXNlLXBheW1hc3RlcicgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnR2FzbGVzcyBUcmFuc2FjdGlvbnMgd2l0aCBQYXltYXN0ZXInLCBsaW5rOiAnL2Nvb2tib29rL2dlbmVyYWwtZGV2ZWxvcG1lbnQvYWNjb3VudC1hYnN0cmFjdGlvbi9nYXNsZXNzLXRyYW5zYWN0aW9ucy13aXRoLXBheW1hc3RlcicgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ3Jvc3MtQ2hhaW4nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQnJpZGdlIFRva2VucyB3aXRoIExheWVyWmVybycsIGxpbms6ICcvY29va2Jvb2svZ2VuZXJhbC1kZXZlbG9wbWVudC9jcm9zcy1jaGFpbi9icmlkZ2UtdG9rZW5zLXdpdGgtbGF5ZXJ6ZXJvJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTZW5kIE1lc3NhZ2VzIGFuZCBUb2tlbnMgZnJvbSBCYXNlIChDaGFpbmxpbmspJywgbGluazogJy9jb29rYm9vay9nZW5lcmFsLWRldmVsb3BtZW50L2Nyb3NzLWNoYWluL3NlbmQtbWVzc2FnZXMtYW5kLXRva2Vucy1jaGFpbmxpbmsnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF1cbiAgfSxcbiAge1xuICAgIHRleHQ6ICdGZWVkYmFjaycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldCBoZWxwIFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS9idWlsZG9uYmFzZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQnVnIGJvdW50eSBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9oYWNrZXJvbmUuY29tL2NvaW5iYXNlJ1xuICAgICAgfVxuICAgIF1cbiAgfVxuXSJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjs7O0FDS3RCLElBQU0sVUFBbUI7QUFBQSxFQUM5QjtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTyxDQUFDLEVBQUUsTUFBTSxtQkFBbUIsTUFBTSwwQ0FBMEMsQ0FBQztBQUFBLFVBQ3RGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLFdBQVcsTUFBTSw4Q0FBOEM7QUFBQSxjQUN2RSxFQUFFLE1BQU0sUUFBUSxNQUFNLDRDQUE0QztBQUFBLGNBQ2xFLEVBQUUsTUFBTSxTQUFTLE1BQU0sNkNBQTZDO0FBQUEsY0FDcEUsRUFBRSxNQUFNLFNBQVMsTUFBTSw2Q0FBNkM7QUFBQSxZQUN0RTtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sT0FBTztBQUFBLE1BQ0w7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLGVBQWUsTUFBTSxxQ0FBcUM7QUFBQSxZQUNwRTtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sb0JBQW9CLE1BQU0sMENBQTBDO0FBQUEsY0FDNUUsRUFBRSxNQUFNLDBCQUEwQixNQUFNLGdEQUFnRDtBQUFBLGNBQ3hGLEVBQUUsTUFBTSwwQkFBMEIsTUFBTSxnREFBZ0Q7QUFBQSxjQUN4RixFQUFFLE1BQU0seUJBQXlCLE1BQU0sK0NBQStDO0FBQUEsWUFDeEY7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMLEVBQUUsTUFBTSw4QkFBOEIsTUFBTSxzRUFBc0U7QUFBQSxrQkFDbEgsRUFBRSxNQUFNLGVBQWUsTUFBTSx1REFBdUQ7QUFBQSxnQkFDdEY7QUFBQSxjQUNGO0FBQUEsY0FDQSxFQUFFLE1BQU0sdUJBQXVCLE1BQU0sb0RBQW9EO0FBQUEsY0FDekYsRUFBRSxNQUFNLDRCQUE0QixNQUFNLHlEQUF5RDtBQUFBLGNBQ25HLEVBQUUsTUFBTSx3QkFBd0IsTUFBTSxnRUFBZ0U7QUFBQSxjQUN0RyxFQUFFLE1BQU0sMEJBQTBCLE1BQU0sdURBQXVEO0FBQUEsY0FDL0YsRUFBRSxNQUFNLFFBQVEsTUFBTSxxQ0FBcUM7QUFBQSxjQUMzRCxFQUFFLE1BQU0sc0JBQXNCLE1BQU0sbURBQW1EO0FBQUEsY0FDdkY7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMLEVBQUUsTUFBTSxZQUFZLE1BQU0sMkRBQTJEO0FBQUEsa0JBQ3JGLEVBQUUsTUFBTSxlQUFlLE1BQU0sOERBQThEO0FBQUEsa0JBQzNGO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE9BQU87QUFBQSxzQkFDTCxFQUFFLE1BQU0sb0JBQW9CLE1BQU0saUZBQWlGO0FBQUEsc0JBQ25ILEVBQUUsTUFBTSwwQkFBMEIsTUFBTSx1RkFBdUY7QUFBQSxzQkFDL0gsRUFBRSxNQUFNLDJCQUEyQixNQUFNLHdGQUF3RjtBQUFBLG9CQUNuSTtBQUFBLGtCQUNGO0FBQUEsZ0JBQ0Y7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0wsRUFBRSxNQUFNLGtDQUFrQyxNQUFNLDREQUE0RDtBQUFBLGtCQUM1RyxFQUFFLE1BQU0sY0FBYyxNQUFNLGdEQUFnRDtBQUFBLGdCQUM5RTtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxnQkFDTixPQUFPLENBQUMsRUFBRSxNQUFNLDJCQUEyQixNQUFNLHdEQUF3RCxDQUFDO0FBQUEsY0FDNUc7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMLEVBQUUsTUFBTSxPQUFPLE1BQU0sNkJBQTZCO0FBQUEsWUFDcEQ7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLDRCQUE0QixNQUFNLCtDQUErQztBQUFBLGNBQ3pGLEVBQUUsTUFBTSxpQ0FBaUMsTUFBTSxvREFBb0Q7QUFBQSxZQUNyRztBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0saUJBQWlCLE1BQU0sb0NBQW9DO0FBQUEsWUFDckU7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLGNBQWMsTUFBTSxxQ0FBcUM7QUFBQSxZQUNuRTtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sV0FBVyxNQUFNLGtDQUFrQztBQUFBLGNBQzNELEVBQUUsTUFBTSxhQUFhLE1BQU0sb0NBQW9DO0FBQUEsWUFDakU7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLGdCQUFnQixNQUFNLHVDQUF1QztBQUFBLFlBQ3ZFO0FBQUEsVUFDRjtBQUFBLFVBQ0EsRUFBRSxNQUFNLHlCQUF5QixNQUFNLDhDQUE4QztBQUFBLFVBQ3JGO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0scUJBQXFCLE1BQU0sZ0RBQWdEO0FBQUEsWUFDckY7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTCxFQUFFLE1BQU0sa0JBQWtCLE1BQU0sbUNBQW1DO0FBQUEsVUFDbkUsRUFBRSxNQUFNLHVCQUF1QixNQUFNLDZCQUE2QjtBQUFBLFVBQ2xFLEVBQUUsTUFBTSxRQUFRLE1BQU0sY0FBYztBQUFBLFVBQ3BDLEVBQUUsTUFBTSx5Q0FBeUMsTUFBTSwrQ0FBK0M7QUFBQSxVQUN0RyxFQUFFLE1BQU0sbUJBQW1CLE1BQU0seUJBQXlCO0FBQUEsVUFDMUQsRUFBRSxNQUFNLDhCQUE4QixNQUFNLG9DQUFvQztBQUFBLFFBQ2xGO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxrQkFBa0IsTUFBTSx3QkFBd0I7QUFBQSxRQUMxRDtBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTCxFQUFFLE1BQU0sWUFBWSxNQUFNLGtCQUFrQjtBQUFBLFFBQzlDO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLFdBQVc7QUFBQSxRQUNYLE9BQU87QUFBQSxVQUNMLEVBQUUsTUFBTSxxQ0FBcUMsTUFBTSwyQ0FBMkM7QUFBQSxRQUNoRztBQUFBLE1BQ0Y7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTCxFQUFFLE1BQU0sd0JBQXdCLE1BQU0sc0JBQXNCO0FBQUEsVUFDNUQsRUFBRSxNQUFNLGtCQUFrQixNQUFNLHdCQUF3QjtBQUFBLFVBQ3hELEVBQUUsTUFBTSxtQkFBbUIsTUFBTSx5QkFBeUI7QUFBQSxVQUMxRCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0seUJBQXlCO0FBQUEsVUFDMUQsRUFBRSxNQUFNLFdBQVcsTUFBTSxpQkFBaUI7QUFBQSxVQUMxQyxFQUFFLE1BQU0saUJBQWlCLE1BQU0sdUJBQXVCO0FBQUEsVUFDdEQsRUFBRSxNQUFNLGVBQWUsTUFBTSxxQkFBcUI7QUFBQSxVQUNsRCxFQUFFLE1BQU0sdUJBQXVCLE1BQU0sNkJBQTZCO0FBQUEsVUFDbEUsRUFBRSxNQUFNLFdBQVcsTUFBTSxpQkFBaUI7QUFBQSxRQUM1QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE9BQU87QUFBQSxNQUNMO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixXQUFXO0FBQUEsUUFDWCxPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLDBCQUEwQixNQUFNLDREQUE0RDtBQUFBLGNBQ3BHLEVBQUUsTUFBTSwyQkFBMkIsTUFBTSw0REFBNEQ7QUFBQSxjQUNyRyxFQUFFLE1BQU0sK0JBQStCLE1BQU0saUVBQWlFO0FBQUEsY0FDOUcsRUFBRSxNQUFNLHFCQUFxQixNQUFNLHNEQUFzRDtBQUFBLFlBQzNGO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMLEVBQUUsTUFBTSx5QkFBeUIsTUFBTSwwREFBMEQ7QUFBQSxjQUNqRyxFQUFFLE1BQU0sdUJBQXVCLE1BQU0seURBQXlEO0FBQUEsY0FDOUYsRUFBRSxNQUFNLHFCQUFxQixNQUFNLHFEQUFxRDtBQUFBLGNBQ3hGLEVBQUUsTUFBTSx5Q0FBeUMsTUFBTSwwRUFBMEU7QUFBQSxZQUNuSTtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sK0JBQStCLE1BQU0scUVBQXFFO0FBQUEsY0FDbEgsRUFBRSxNQUFNLHNDQUFzQyxNQUFNLHFFQUFxRTtBQUFBLGNBQ3pILEVBQUUsTUFBTSxzQ0FBc0MsTUFBTSxpRkFBaUY7QUFBQSxZQUN2STtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTDtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0wsRUFBRSxNQUFNLGdCQUFnQixNQUFNLG1EQUFtRDtBQUFBLGtCQUNqRixFQUFFLE1BQU0sZUFBZSxNQUFNLGtEQUFrRDtBQUFBLGdCQUNqRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTCxFQUFFLE1BQU0sb0JBQW9CLE1BQU0sdURBQXVEO0FBQUEsa0JBQ3pGLEVBQUUsTUFBTSx3QkFBd0IsTUFBTSwyREFBMkQ7QUFBQSxnQkFDbkc7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0wsRUFBRSxNQUFNLG1CQUFtQixNQUFNLCtEQUErRDtBQUFBLGdCQUNsRztBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsTUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sV0FBVztBQUFBLFFBQ1gsT0FBTztBQUFBLFVBQ0w7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTCxFQUFFLE1BQU0sdUJBQXVCLE1BQU0sdUZBQXVGO0FBQUEsa0JBQzVILEVBQUUsTUFBTSw2QkFBNkIsTUFBTSw2RkFBNkY7QUFBQSxrQkFDeEksRUFBRSxNQUFNLHdCQUF3QixNQUFNLHdGQUF3RjtBQUFBLGtCQUM5SCxFQUFFLE1BQU0sMEJBQTBCLE1BQU0sMEZBQTBGO0FBQUEsa0JBQ2xJLEVBQUUsTUFBTSwyQkFBMkIsTUFBTSwyRkFBMkY7QUFBQSxnQkFDdEk7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0wsRUFBRSxNQUFNLHVCQUF1QixNQUFNLHVGQUF1RjtBQUFBLGtCQUM1SCxFQUFFLE1BQU0sbUJBQW1CLE1BQU0sbUZBQW1GO0FBQUEsa0JBQ3BILEVBQUUsTUFBTSwyQkFBMkIsTUFBTSwyRkFBMkY7QUFBQSxnQkFDdEk7QUFBQSxjQUNGO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixPQUFPO0FBQUEsa0JBQ0wsRUFBRSxNQUFNLHFCQUFxQixNQUFNLG1GQUFtRjtBQUFBLGdCQUN4SDtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTCxFQUFFLE1BQU0sd0JBQXdCLE1BQU0seUZBQXlGO0FBQUEsZ0JBQ2pJO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMLEVBQUUsTUFBTSx3QkFBd0IsTUFBTSx5RkFBeUY7QUFBQSxrQkFDL0gsRUFBRSxNQUFNLHVCQUF1QixNQUFNLHdGQUF3RjtBQUFBLGtCQUM3SCxFQUFFLE1BQU0sZ0JBQWdCLE1BQU0saUZBQWlGO0FBQUEsa0JBQy9HLEVBQUUsTUFBTSxnQkFBZ0IsTUFBTSxpRkFBaUY7QUFBQSxnQkFDakg7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sdUJBQXVCLE1BQU0seURBQXlEO0FBQUEsY0FDOUYsRUFBRSxNQUFNLGdCQUFnQixNQUFNLGtEQUFrRDtBQUFBLGNBQ2hGLEVBQUUsTUFBTSx3QkFBd0IsTUFBTSwwREFBMEQ7QUFBQSxjQUNoRyxFQUFFLE1BQU0sa0JBQWtCLE1BQU0sb0RBQW9EO0FBQUEsY0FDcEYsRUFBRSxNQUFNLDZCQUE2QixNQUFNLCtEQUErRDtBQUFBLFlBQzVHO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMLEVBQUUsTUFBTSxxQkFBcUIsTUFBTSx1REFBdUQ7QUFBQSxZQUM1RjtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sOEJBQThCLE1BQU0sd0VBQXdFO0FBQUEsWUFDdEg7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sT0FBTztBQUFBLGNBQ0wsRUFBRSxNQUFNLDZCQUE2QixNQUFNLGtGQUFrRjtBQUFBLFlBQy9IO0FBQUEsVUFDRjtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxjQUNMLEVBQUUsTUFBTSxrQkFBa0IsTUFBTSwrRkFBK0Y7QUFBQSxjQUMvSCxFQUFFLE1BQU0sMEJBQTBCLE1BQU0sdUdBQXVHO0FBQUEsY0FDL0ksRUFBRSxNQUFNLGtDQUFrQyxNQUFNLG1IQUFtSDtBQUFBLGNBQ25LLEVBQUUsTUFBTSx1Q0FBdUMsTUFBTSx3RkFBd0Y7QUFBQSxZQUMvSTtBQUFBLFVBQ0Y7QUFBQSxVQUNBO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsY0FDTCxFQUFFLE1BQU0sZ0NBQWdDLE1BQU0seUVBQXlFO0FBQUEsY0FDdkgsRUFBRSxNQUFNLGtEQUFrRCxNQUFNLCtFQUErRTtBQUFBLFlBQ2pKO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsTUFDTDtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQ1I7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7OztBRHoxQkEsU0FBUyxZQUFZLDRCQUE0QjtBQUVqRCxPQUFPLFVBQVU7QUFnSGIsbUJBQ0UsS0FERjtBQTlHSixJQUFNLGFBQWE7QUFBQTtBQUFBLEVBRWpCLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLGFBQWE7QUFBQSxFQUNiLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxJQUNQLE1BQU07QUFBQSxFQUNSO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLRjtBQUdBLElBQU0sZUFBZTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBZ0NyQjtBQVVBLElBQU0saUJBQWlCO0FBQUEsRUFDckIsVUFBVTtBQUFBLElBQ1IsaUJBQWlCO0FBQUEsTUFDZixzQkFBc0I7QUFBQSxNQUN0QixpQkFBaUI7QUFBQSxNQUNqQixRQUFRLFdBQVc7QUFBQTtBQUFBLE1BQ25CLGtCQUFrQixxQkFBcUI7QUFBQSxJQUN6QztBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sZ0JBQWdCO0FBQUEsRUFDcEI7QUFDRjtBQUVBLElBQU0sZUFBZTtBQUFBLEVBQ25CLFFBQVE7QUFBQSxJQUNOLEVBQUUsTUFBTSxZQUFZLE1BQU0sMEVBQXlFO0FBQUEsSUFDbkc7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUFBLEVBQ0EsUUFBUTtBQUNWO0FBRUEsSUFBTSxpQkFBaUI7QUFBQSxFQUNyQixNQUFNO0FBQUEsSUFDSixRQUFRO0FBQUEsTUFDTixPQUFPO0FBQUEsTUFDUCxNQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU0sa0JBQWlCO0FBQUEsRUFDckIsVUFBVTtBQUFBLElBQ1IsZUFBZTtBQUFBO0FBQUEsSUFFZjtBQUFBLEVBQ0Y7QUFDRjtBQUdBLElBQU0sYUFBYTtBQUFBLEVBQ2pCLFNBQVM7QUFDWDtBQUdBLElBQU0sYUFBYTtBQUFBLEVBQ2pCLE1BQ0UsaUNBQ0U7QUFBQSx3QkFBQyxVQUFLLFVBQVMsV0FBVSxTQUFRLFdBQVU7QUFBQSxJQUMzQyxvQkFBQyxVQUFLLFVBQVMsWUFBVyxTQUFRLGVBQWM7QUFBQSxJQUNoRCxvQkFBQyxVQUFLLFVBQVMsWUFBVyxTQUFRLGlEQUFnRDtBQUFBLElBQ2xGLG9CQUFDLFVBQUssVUFBUyxrQkFBaUIsU0FBUSx3RkFBdUY7QUFBQSxJQUMvSCxvQkFBQyxVQUFLLFVBQVMsaUJBQWdCLFNBQVEsZUFBYztBQUFBLElBQ3JELG9CQUFDLFVBQUssVUFBUyxpQkFBZ0IsU0FBUSxpREFBZ0Q7QUFBQSxJQUN2RixvQkFBQyxVQUFLLFVBQVMsdUJBQXNCLFNBQVEsd0ZBQXVGO0FBQUEsSUFDcEksb0JBQUMsVUFBSyxVQUFTLGdCQUFlLFNBQVEsdUJBQXNCO0FBQUEsSUFDNUQsb0JBQUMsVUFBSyxVQUFTLGtCQUFpQixTQUFRLFlBQVc7QUFBQSxLQUNyRDtBQUVKO0FBR0EsSUFBTSxlQUFlO0FBQUEsRUFDbkIsUUFBUTtBQUFBLElBQ04sUUFBUSxDQUFDLFNBQVMsV0FBVyxlQUFlLFdBQVcsVUFBVTtBQUFBO0FBQUEsSUFDakUsYUFBYSxDQUFDLFNBQVMsV0FBVyxlQUFlLFNBQVM7QUFBQTtBQUFBLElBQzFELGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQTtBQUFBLE1BQ1IsT0FBTztBQUFBO0FBQUEsTUFDUCxPQUFPLEVBQUUsU0FBUyxFQUFFLE9BQU8sR0FBRyxTQUFTLElBQUksR0FBRyxjQUFjLEVBQUU7QUFBQTtBQUFBLE1BQzlELFFBQVEsQ0FBQyxRQUNQLElBQUksZ0JBQWdCLG1CQUFtQixJQUFJLGdCQUFnQjtBQUFBO0FBQUEsTUFDN0QsV0FBVztBQUFBO0FBQUEsTUFDWCxPQUFPO0FBQUE7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsR0FBRztBQUFBLEVBQ0gsTUFBTTtBQUFBLElBQ0osU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsTUFBTTtBQUFBLFFBQ3BDLGdCQUFnQixLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsaUJBQWlCO0FBQUEsUUFDMUQsV0FBVyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsWUFBWTtBQUFBLFFBQ2hELFlBQVksS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLGFBQWE7QUFBQSxRQUNsRCxTQUFTLEtBQUssS0FBSyxRQUFRLElBQUksR0FBRyxVQUFVO0FBQUEsUUFDNUMsV0FBVyxLQUFLLEtBQUssUUFBUSxJQUFJLEdBQUcsWUFBWTtBQUFBLFFBQ2hELFdBQVcsS0FBSyxLQUFLLFFBQVEsSUFBSSxHQUFHLFlBQVk7QUFBQSxNQUNsRDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
