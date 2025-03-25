// vocs.config.tsx
import { defineConfig } from "file:///Users/mindapivessa/Desktop/web/apps/base-docs/node_modules/vocs/_lib/index.js";
import path from "path";
import crypto from "crypto";
import react from "file:///Users/mindapivessa/Desktop/web/node_modules/@vitejs/plugin-react/dist/index.mjs";
import svgr from "file:///Users/mindapivessa/Desktop/web/node_modules/vite-plugin-svgr/dist/index.js";

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
    text: "Bridges",
    link: "/chain/bridges-mainnet"
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
            items: [
              { text: "Getting Started", link: "/builderkits/onchainkit/getting-started" },
              { text: "Telemetry", link: "/builderkits/onchainkit/guides/telemetry" },
              { text: "Troubleshooting", link: "/builderkits/onchainkit/guides/troubleshooting" }
            ]
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
            collapsed: true,
            items: [
              {
                text: "OnchainKitProvider",
                link: "/builderkits/onchainkit/config/onchainkit-provider"
              },
              {
                text: "Custom Supplemental Providers",
                link: "/builderkits/onchainkit/config/supplemental-providers"
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
                text: "Use Basenames",
                link: "/builderkits/onchainkit/guides/use-basename-in-onchain-app"
              },
              {
                text: "Use AI-powered IDEs",
                link: "/builderkits/onchainkit/guides/using-ai-powered-ides"
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
                text: "Appchain",
                collapsed: true,
                items: [
                  {
                    text: "Bridge",
                    link: "/builderkits/onchainkit/appchain/bridge"
                  }
                ]
              },
              {
                text: "Buy",
                collapsed: true,
                items: [
                  {
                    text: "Buy",
                    link: "/builderkits/onchainkit/buy/buy"
                  }
                ]
              },
              {
                text: "Checkout",
                collapsed: true,
                items: [
                  {
                    text: "Checkout",
                    link: "/builderkits/onchainkit/checkout/checkout"
                  }
                ]
              },
              {
                text: "Earn",
                collapsed: true,
                items: [
                  {
                    text: "Earn",
                    link: "/builderkits/onchainkit/earn/earn"
                  }
                ]
              },
              {
                text: "Fund",
                collapsed: true,
                items: [
                  {
                    text: "FundButton",
                    link: "/builderkits/onchainkit/fund/fund-button"
                  },
                  {
                    text: "FundCard",
                    link: "/builderkits/onchainkit/fund/fund-card"
                  }
                ]
              },
              {
                text: "Identity",
                collapsed: true,
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
                collapsed: true,
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
                collapsed: true,
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
                collapsed: true,
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
                link: "/builderkits/onchainkit/transaction/transaction"
              },
              {
                text: "Wallet",
                collapsed: true,
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
                  },
                  {
                    text: "WalletIsland",
                    link: "/builderkits/onchainkit/wallet/wallet-island"
                  },
                  {
                    text: "WalletModal",
                    link: "/builderkits/onchainkit/wallet/wallet-modal"
                  }
                ]
              }
            ]
          },
          {
            text: "API",
            collapsed: true,
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
                    link: "/builderkits/onchainkit/api/get-tokens"
                  }
                ]
              },
              {
                text: "Wallet",
                items: [
                  {
                    text: "getPortfolios",
                    link: "/builderkits/onchainkit/api/get-portfolios"
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
                    link: "/builderkits/onchainkit/config/is-base"
                  },
                  {
                    text: "isEthereum",
                    link: "/builderkits/onchainkit/config/is-ethereum"
                  }
                ]
              },
              {
                text: "Earn",
                items: [
                  {
                    text: "buildDepositToMorphoTx",
                    link: "/builderkits/onchainkit/api/build-deposit-to-morpho-tx"
                  },
                  {
                    text: "buildWithdrawFromMorphoTx",
                    link: "/builderkits/onchainkit/api/build-withdraw-from-morpho-tx"
                  },
                  {
                    text: "useBuildDepositToMorphoTx",
                    link: "/builderkits/onchainkit/hooks/use-build-deposit-to-morpho-tx"
                  },
                  {
                    text: "useBuildWithdrawFromMorphoTx",
                    link: "/builderkits/onchainkit/hooks/use-build-withdraw-from-morpho-tx"
                  },
                  {
                    text: "useEarnContext",
                    link: "/builderkits/onchainkit/hooks/use-earn-context"
                  }
                ]
              },
              {
                text: "Fund",
                items: [
                  {
                    text: "getOnrampBuyUrl",
                    link: "/builderkits/onchainkit/fund/get-onramp-buy-url"
                  },
                  {
                    text: "fetchOnrampConfig",
                    link: "/builderkits/onchainkit/fund/fetch-onramp-config"
                  },
                  {
                    text: "fetchOnrampQuote",
                    link: "/builderkits/onchainkit/fund/fetch-onramp-quote"
                  },
                  {
                    text: "fetchOnrampOptions",
                    link: "/builderkits/onchainkit/fund/fetch-onramp-options"
                  },
                  {
                    text: "fetchOnrampTransactionStatus",
                    link: "/builderkits/onchainkit/fund/fetch-onramp-transaction-status"
                  },
                  {
                    text: "setupOnrampEventListeners",
                    link: "/builderkits/onchainkit/fund/setup-onramp-event-listeners"
                  }
                ]
              },
              {
                text: "Identity",
                items: [
                  {
                    text: "getAddress",
                    link: "/builderkits/onchainkit/identity/get-address"
                  },
                  {
                    text: "getAttestations",
                    link: "/builderkits/onchainkit/identity/get-attestations"
                  },
                  {
                    text: "getAvatar",
                    link: "/builderkits/onchainkit/identity/get-avatar"
                  },
                  {
                    text: "getAvatars",
                    link: "/builderkits/onchainkit/identity/get-avatars"
                  },
                  {
                    text: "getName",
                    link: "/builderkits/onchainkit/identity/get-name"
                  },
                  {
                    text: "getNames",
                    link: "/builderkits/onchainkit/identity/get-names"
                  },
                  {
                    text: "useAddress",
                    link: "/builderkits/onchainkit/identity/use-address"
                  },
                  {
                    text: "useAvatar",
                    link: "/builderkits/onchainkit/identity/use-avatar"
                  },
                  {
                    text: "useAvatars",
                    link: "/builderkits/onchainkit/identity/use-avatars"
                  },
                  {
                    text: "useName",
                    link: "/builderkits/onchainkit/identity/use-name"
                  },
                  {
                    text: "useNames",
                    link: "/builderkits/onchainkit/identity/use-names"
                  }
                ]
              },
              {
                text: "Mint",
                items: [
                  {
                    text: "useTokenDetails",
                    link: "/builderkits/onchainkit/hooks/use-token-details"
                  },
                  {
                    text: "useMintDetails",
                    link: "/builderkits/onchainkit/hooks/use-mint-details"
                  }
                ]
              },
              {
                text: "Token",
                items: [
                  {
                    text: "formatAmount",
                    link: "/builderkits/onchainkit/token/format-amount"
                  }
                ]
              },
              {
                text: "Wallet",
                items: [
                  {
                    text: "isValidAAEntrypoint",
                    link: "/builderkits/onchainkit/wallet/is-valid-aa-entrypoint"
                  },
                  {
                    text: "isWalletACoinbaseSmartWallet",
                    link: "/builderkits/onchainkit/wallet/is-wallet-a-coinbase-smart-wallet"
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
                link: "/builderkits/onchainkit/api/types"
              },
              {
                text: "Appchain",
                link: "/builderkits/onchainkit/appchain/types"
              },
              {
                text: "Checkout",
                link: "/builderkits/onchainkit/checkout/types"
              },
              {
                text: "Config",
                link: "/builderkits/onchainkit/config/types"
              },
              {
                text: "Earn",
                link: "/builderkits/onchainkit/earn/types"
              },
              {
                text: "Fund",
                link: "/builderkits/onchainkit/fund/types"
              },
              {
                text: "Identity",
                link: "/builderkits/onchainkit/identity/types"
              },
              {
                text: "Mint",
                link: "/builderkits/onchainkit/mint/types"
              },
              {
                text: "Swap",
                link: "/builderkits/onchainkit/swap/types"
              },
              {
                text: "Token",
                link: "/builderkits/onchainkit/token/types"
              },
              {
                text: "Transaction",
                link: "/builderkits/onchainkit/transaction/types"
              },
              {
                text: "Wallet",
                link: "/builderkits/onchainkit/wallet/types"
              }
            ]
          },
          {
            text: "Contribution",
            collapsed: true,
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
          }
        ]
      },
      {
        text: "MiniKit",
        link: "/builderkits/minikit/getting-started"
      },
      {
        text: "AgentKit (CDP) \u2197",
        link: "https://docs.cdp.coinbase.com/agentkit/docs/welcome"
      }
    ]
  },
  {
    text: "Blockspace Tools",
    items: [
      {
        text: "Paymaster (CDP) \u2197",
        link: "https://docs.cdp.coinbase.com/paymaster/docs/welcome"
      },
      {
        text: "Appchains \u2197",
        link: "https://docs.cdp.coinbase.com/appchains/docs/welcome"
      }
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
            text: "Introduction",
            items: [
              { text: "Install for Web", link: "/identity/smart-wallet/introduction/install-web" },
              {
                text: "Install for React Native",
                link: "/identity/smart-wallet/introduction/install-react-native"
              },
              {
                text: "Recommend Libraries",
                link: "/identity/smart-wallet/introduction/recommended-libraries"
              },
              { text: "Starter Templates", link: "/identity/smart-wallet/introduction/templates" },
              {
                text: "Base Gasless Campaign",
                link: "/identity/smart-wallet/introduction/base-gasless-campaign"
              }
            ]
          },
          {
            text: "Features",
            items: [
              {
                text: "Built-in Features",
                collapsed: true,
                items: [
                  {
                    text: "Single Sign On",
                    link: "/identity/smart-wallet/features/single-sign-on"
                  },
                  { text: "Networks", link: "/identity/smart-wallet/features/networks" },
                  { text: "Passkeys", link: "/identity/smart-wallet/features/passkeys" },
                  { text: "Recovery", link: "/identity/smart-wallet/features/recovery-keys" },
                  { text: "MagicSpend", link: "/identity/smart-wallet/features/MagicSpend" }
                ]
              },
              {
                text: "Optional Features",
                collapsed: true,
                items: [
                  {
                    text: "Gas-free Transactions",
                    link: "/identity/smart-wallet/features/gas-free-transactions"
                  },
                  {
                    text: "Spend Permissions",
                    link: "/identity/smart-wallet/features/spend-permissions"
                  },
                  {
                    text: "Batch Transactions",
                    link: "/identity/smart-wallet/features/batch-operations"
                  },
                  {
                    text: "Custom Gas Tokens",
                    link: "/identity/smart-wallet/features/custom-gas-tokens"
                  },
                  {
                    text: "Sub Accounts",
                    link: "/identity/smart-wallet/features/sub-accounts"
                  }
                ]
              }
            ]
          },
          {
            text: "Usage Details",
            items: [
              {
                text: "Signature Verification",
                link: "/identity/smart-wallet/usage-details/signature-verification"
              },
              { text: "Popups", link: "/identity/smart-wallet/usage-details/popups" },
              { text: "Simulations", link: "/identity/smart-wallet/usage-details/Simulations" },
              { text: "Gas Usage", link: "/identity/smart-wallet/usage-details/gas-usage" },
              { text: "Self Calls", link: "/identity/smart-wallet/usage-details/self-calls" }
            ]
          },
          {
            text: "SDK",
            items: [
              {
                text: "Install",
                link: "/identity/smart-wallet/sdk/install"
              },
              {
                text: "Setup",
                link: "/identity/smart-wallet/sdk/setup"
              },
              {
                text: "makeWeb3Provider",
                link: "/identity/smart-wallet/sdk/make-web3-provider"
              },
              {
                text: "Upgrading from 3.x",
                link: "/identity/smart-wallet/sdk/v3-to-v4-changes"
              },
              {
                text: "CoinbaseWalletProvider",
                collapsed: true,
                items: [
                  {
                    text: "Overview",
                    link: "/identity/smart-wallet/sdk/coinbasewalletprovider/overview"
                  },
                  {
                    text: "request",
                    items: [
                      {
                        text: "Overview",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/overview"
                      },
                      {
                        text: "eth_accounts",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_accounts"
                      },
                      {
                        text: "eth_blockNumber",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_blockNumber"
                      },
                      {
                        text: "eth_chainId",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_chainId"
                      },
                      {
                        text: "eth_coinbase",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_coinbase"
                      },
                      {
                        text: "eth_estimateGas",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_estimateGas"
                      },
                      {
                        text: "eth_feeHistory",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_feeHistory"
                      },
                      {
                        text: "eth_gasPrice",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_gasPrice"
                      },
                      {
                        text: "eth_getBalance",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getBalance"
                      },
                      {
                        text: "eth_getBlockByHash",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getBlockByHash"
                      },
                      {
                        text: "eth_getBlockByNumber",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getBlockByNumber"
                      },
                      {
                        text: "eth_getBlockTransactionCountByHash",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getBlockTransactionCountByHash"
                      },
                      {
                        text: "eth_getBlockTransactionCountByNumber",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getBlockTransactionCountByNumber"
                      },
                      {
                        text: "eth_getCode",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getCode"
                      },
                      {
                        text: "eth_getLogs",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getLogs"
                      },
                      {
                        text: "eth_getProof",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getProof"
                      },
                      {
                        text: "eth_getStorageAt",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getStorageAt"
                      },
                      {
                        text: "eth_getTransactionByBlockHashAndIndex",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getTransactionByBlockHashAndIndex"
                      },
                      {
                        text: "eth_getTransactionByBlockNumberAndIndex",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getTransactionByBlockNumberAndIndex"
                      },
                      {
                        text: "eth_getTransactionByHash",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getTransactionByHash"
                      },
                      {
                        text: "eth_getTransactionCount",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getTransactionCount"
                      },
                      {
                        text: "eth_getTransactionReceipt",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getTransactionReceipt"
                      },
                      {
                        text: "eth_getUncleCountByBlockHash",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getUncleCountByBlockHash"
                      },
                      {
                        text: "eth_getUncleCountByBlockNumber",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_getUncleCountByBlockNumber"
                      },
                      {
                        text: "eth_requestAccounts",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_requestAccounts"
                      },
                      {
                        text: "eth_sendRawTransaction",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_sendRawTransaction"
                      },
                      {
                        text: "eth_sendTransaction",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_sendTransaction"
                      },
                      {
                        text: "eth_signTypedData_v4",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/eth_signTypedData_v4"
                      },
                      {
                        text: "personal_sign",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/personal_sign"
                      },
                      {
                        text: "wallet_addEthereumChain",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/wallet_addEthereumChain"
                      },
                      {
                        text: "wallet_addSubAccount",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/wallet_addSubAccount"
                      },
                      {
                        text: "wallet_connect",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/wallet_connect"
                      },
                      {
                        text: "wallet_switchEthereumChain",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/wallet_switchEthereumChain"
                      },
                      {
                        text: "wallet_watchAsset",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/wallet_watchAsset"
                      },
                      {
                        text: "web3_clientVersion",
                        link: "/identity/smart-wallet/sdk/coinbasewalletprovider/request/web3_clientVersion"
                      }
                    ]
                  },
                  {
                    text: "Sub Account Reference",
                    link: "/identity/smart-wallet/sdk/sub-account-reference"
                  }
                ]
              }
            ]
          },
          {
            text: "Tutorials",
            collapsed: true,
            items: [
              {
                text: "Update Existing App",
                link: "/identity/smart-wallet/guides/update-existing-app"
              },
              {
                text: "React Native Integration",
                link: "/identity/smart-wallet/guides/react-native-integration"
              },
              {
                text: "Signing and Verifying Messages",
                link: "/identity/smart-wallet/guides/signing-and-verifying-messages"
              },
              { text: "Sign In With Ethereum", link: "/identity/smart-wallet/guides/siwe" },
              { text: "MagicSpend", link: "/identity/smart-wallet/guides/magic-spend" },
              {
                text: "Batch Transactions",
                link: "/identity/smart-wallet/guides/batch-transactions"
              },
              { text: "Paymasters", link: "/identity/smart-wallet/guides/paymasters" },
              { text: "ERC20 Paymasters", link: "/identity/smart-wallet/guides/erc20-paymasters" },
              {
                text: "Sub Accounts",
                collapsed: true,
                items: [
                  {
                    text: "Overview",
                    link: "/identity/smart-wallet/guides/sub-accounts/overview"
                  },
                  {
                    text: "Setup",
                    link: "/identity/smart-wallet/guides/sub-accounts/setup"
                  },
                  {
                    text: "Creating Sub Accounts",
                    link: "/identity/smart-wallet/guides/sub-accounts/creating-sub-accounts"
                  },
                  {
                    text: "Using Sub Accounts",
                    link: "/identity/smart-wallet/guides/sub-accounts/using-sub-accounts"
                  }
                ]
              },
              {
                text: "Spend Permissions",
                collapsed: true,
                items: [
                  {
                    text: "Overview",
                    link: "/identity/smart-wallet/guides/spend-permissions/overview"
                  },
                  {
                    text: "Quickstart",
                    link: "/identity/smart-wallet/guides/spend-permissions/quick-start"
                  },
                  {
                    text: "API Reference",
                    collapsed: true,
                    items: [
                      {
                        text: "Client Resources",
                        link: "/identity/smart-wallet/guides/spend-permissions/api-reference/client-resources"
                      },
                      {
                        text: "Coinbase Fetch Permissions",
                        link: "/identity/smart-wallet/guides/spend-permissions/api-reference/coinbase-fetchpermissions"
                      },
                      {
                        text: "Spend Permissions Manager",
                        link: "/identity/smart-wallet/guides/spend-permissions/api-reference/spendpermissionmanager"
                      }
                    ]
                  }
                ]
              }
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
              {
                text: "Basenames Wagmi Tutorial",
                link: "/identity/basenames/basenames-wagmi-tutorial"
              },
              {
                text: "Basenames OnchainKit Tutorial",
                link: "/identity/basenames/basenames-onchainkit-tutorial"
              }
            ]
          },
          {
            text: "FAQ & Troubleshooting",
            items: [{ text: "Basenames FAQ", link: "/identity/basenames/basenames-faq" }]
          }
        ]
      },
      {
        text: "Verifications (CDP)\u2197",
        link: "https://docs.cdp.coinbase.com/verifications/docs/welcome"
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
          { text: "Why Base?", link: "/chain/why-base" },
          { text: "Using Base", link: "/chain/using-base" },
          { text: "Deploy on Base", link: "/chain/deploy-on-base-quickstart" },
          { text: "Network Information", link: "/chain/network-information" },
          { text: "Fees", link: "/chain/fees" },
          {
            text: "Differences Between Ethereum and Base",
            link: "/chain/differences-between-ethereum-and-base"
          },
          { text: "Run a Base Node", link: "/chain/run-a-base-node" },
          { text: "Bridge an L1 Token to Base", link: "/chain/bridge-an-l1-token-to-base" },
          { text: "Adding tokens to Coinbase Wallet", link: "/chain/wallet" },
          {
            text: "Decentralizing Base with Optimism\u2197",
            link: "https://base.mirror.xyz/H_KPwV31M7OJT-THUnU7wYjOF16Sy7aWvaEr5cgHi8I"
          }
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
      },
      {
        text: "Security",
        collapsed: true,
        items: [
          { text: "Bug Bounty", link: "/chain/security/bounty" },
          { text: "Report a Vulnerability", link: "/chain/security/report" },
          {
            text: "How to avoid getting your app flagged as malicious",
            link: "/chain/security/app-blocklist"
          }
        ]
      },
      {
        text: "Base Contracts",
        link: "/chain/base-contracts"
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
        text: "By use case",
        collapsed: true,
        items: [
          {
            text: "Payments & Commerce",
            collapsed: true,
            items: [
              {
                text: "Build an E-commerce App",
                link: "/cookbook/use-case-guides/commerce/build-an-ecommerce-app"
              },
              {
                text: "Deploy a Shopify Storefront",
                link: "/cookbook/use-case-guides/commerce/deploy-a-shopify-storefront"
              },
              { text: "Transaction Guide", link: "/cookbook/use-case-guides/transactions" }
            ]
          },
          {
            text: "NFTs & Digital Assets",
            collapsed: true,
            items: [
              {
                text: "NFT Minting with Zora",
                link: "/cookbook/use-case-guides/creator/nft-minting-with-zora"
              },
              { text: "Simple Onchain NFTs", link: "/cookbook/nfts/simple-onchain-nfts" },
              { text: "Dynamic NFTs", link: "/cookbook/nfts/dynamic-nfts" },
              { text: "Complex Onchain NFTs", link: "/cookbook/nfts/complex-onchain-nfts" },
              { text: "Signature Mint", link: "/cookbook/nfts/signature-mint" },
              {
                text: "ThirdWeb Unreal NFT Items",
                link: "/cookbook/nfts/thirdweb-unreal-nft-items"
              }
            ]
          },
          {
            text: "Social",
            collapsed: true,
            items: [
              {
                text: "Farcaster No-Code NFT Minting",
                link: "/cookbook/use-case-guides/no-code-minting"
              },
              {
                text: "Farcaster NFT Minting Guide",
                link: "/cookbook/use-case-guides/nft-minting"
              },
              {
                text: "Convert Farcaster Frame to Open Frame",
                link: "/cookbook/use-case-guides/creator/convert-farcaster-frame-to-open-frame"
              }
            ]
          },
          {
            text: "DeFi & Financial Tools",
            collapsed: true,
            items: [
              {
                text: "Add In-App Funding (Onramp)",
                link: "/cookbook/use-case-guides/finance/build-a-smart-wallet-funding-app"
              },
              {
                text: "Access Real-World Data (Chainlink)",
                link: "/cookbook/use-case-guides/finance/access-real-world-data-chainlink"
              },
              {
                text: "Access Real-Time Asset Data (Pyth)",
                link: "/cookbook/use-case-guides/finance/access-real-time-asset-data-pyth-price-feeds"
              }
            ]
          },
          {
            text: "Growth & Distribution",
            collapsed: true,
            items: [
              { text: "Cast Actions", link: "/cookbook/use-case-guides/cast-actions" },
              { text: "Hyperframes", link: "/cookbook/use-case-guides/hyperframes" },
              { text: "Deploy to Vercel", link: "/cookbook/use-case-guides/deploy-to-vercel" },
              {
                text: "Gating and Redirects",
                link: "/cookbook/use-case-guides/gating-and-redirects"
              },
              { text: "Email Campaigns", link: "/cookbook/use-case-guides/create-email-campaigns" },
              { text: "Retaining Users", link: "/cookbook/use-case-guides/retaining-users" }
            ]
          }
        ]
      },
      {
        text: "By tool",
        collapsed: true,
        items: [
          {
            text: "Smart Contract Development",
            collapsed: true,
            items: [
              {
                text: "Hardhat",
                items: [
                  {
                    text: "Deploy with Hardhat",
                    link: "/cookbook/smart-contract-development/hardhat/deploy-with-hardhat"
                  },
                  {
                    text: "Debugging Smart Contracts",
                    link: "/cookbook/smart-contract-development/hardhat/debugging-smart-contracts"
                  },
                  {
                    text: "Optimizing Gas Usage",
                    link: "/cookbook/smart-contract-development/hardhat/optimizing-gas-usage"
                  },
                  {
                    text: "Reducing Contract Size",
                    link: "/cookbook/smart-contract-development/hardhat/reducing-contract-size"
                  },
                  {
                    text: "Analyzing Test Coverage",
                    link: "/cookbook/smart-contract-development/hardhat/analyzing-test-coverage"
                  }
                ]
              },
              {
                text: "Foundry",
                items: [
                  {
                    text: "Deploy with Foundry",
                    link: "/cookbook/smart-contract-development/foundry/deploy-with-foundry"
                  },
                  {
                    text: "Setup with Base",
                    link: "/cookbook/smart-contract-development/foundry/setup-with-base"
                  },
                  {
                    text: "Testing Smart Contracts",
                    link: "/cookbook/smart-contract-development/foundry/testing-smart-contracts"
                  },
                  {
                    text: "Verify Contract with Basescan",
                    link: "/cookbook/smart-contract-development/foundry/verify-contract-with-basescan"
                  },
                  {
                    text: "Generate Random Numbers",
                    link: "/cookbook/smart-contract-development/foundry/generate-random-numbers-contracts"
                  }
                ]
              },
              {
                text: "Remix",
                items: [
                  {
                    text: "Deploy with Remix",
                    link: "/cookbook/smart-contract-development/remix/deploy-with-remix"
                  }
                ]
              },
              {
                text: "Tenderly",
                items: [
                  {
                    text: "Deploy with Tenderly",
                    link: "/cookbook/smart-contract-development/tenderly/deploy-with-tenderly"
                  }
                ]
              },
              {
                text: "ThirdWeb",
                items: [
                  {
                    text: "Deploy with ThirdWeb",
                    link: "/cookbook/smart-contract-development/thirdweb/deploy-with-thirdweb"
                  },
                  {
                    text: "Build with ThirdWeb",
                    link: "/cookbook/smart-contract-development/thirdweb/build-with-thirdweb"
                  },
                  {
                    text: "ThirdWeb SDK",
                    link: "/cookbook/smart-contract-development/thirdweb/thirdweb-sdk"
                  },
                  {
                    text: "ThirdWeb CLI",
                    link: "/cookbook/smart-contract-development/thirdweb/thirdweb-cli"
                  }
                ]
              }
            ]
          },
          {
            text: "IPFS",
            items: [{ text: "Deploy with Fleek", link: "/cookbook/ipfs/deploy-with-fleek" }]
          },
          {
            text: "Token Gating",
            items: [
              {
                text: "Gate IRL Events with Nouns",
                link: "/cookbook/token-gating/gate-irl-events-with-nouns"
              }
            ]
          },
          {
            text: "Client-Side Development",
            items: [
              {
                text: "Introduction to Providers",
                link: "/cookbook/client-side-development/introduction-to-providers"
              }
            ]
          },
          {
            text: "Account Abstraction",
            items: [
              {
                text: "Using Biconomy",
                link: "/cookbook/account-abstraction/account-abstraction-on-base-using-biconomy"
              },
              {
                text: "Using Particle Network",
                link: "/cookbook/account-abstraction/account-abstraction-on-base-using-particle-network"
              },
              {
                text: "Using Privy and Base Paymaster",
                link: "/cookbook/account-abstraction/account-abstraction-on-base-using-privy-and-the-base-paymaster"
              },
              {
                text: "Gasless Transactions with Paymaster",
                link: "/cookbook/account-abstraction/gasless-transactions-with-paymaster"
              }
            ]
          },
          {
            text: "Cross-Chain",
            items: [
              {
                text: "Bridge Tokens with LayerZero",
                link: "/cookbook/cross-chain/bridge-tokens-with-layerzero"
              },
              {
                text: "Send Messages and Tokens from Base (Chainlink)",
                link: "/cookbook/cross-chain/send-messages-and-tokens-from-base-chainlink"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    text: "Learn",
    collapsed: true,
    items: [
      {
        text: "Welcome",
        link: "/learn/welcome"
      },
      {
        text: "Introduction to Ethereum",
        collapsed: true,
        items: [
          {
            text: "Intro to Ethereum",
            link: "/learn/introduction-to-ethereum/intro-to-ethereum-vid"
          },
          {
            text: "Ethereum Dev Overview",
            link: "/learn/introduction-to-ethereum/ethereum-dev-overview-vid"
          },
          {
            text: "Ethereum Applications",
            link: "/learn/introduction-to-ethereum/ethereum-applications"
          },
          {
            text: "Gas Use in ETH Transactions",
            link: "/learn/introduction-to-ethereum/gas-use-in-eth-transactions"
          },
          { text: "EVM Diagram", link: "/learn/introduction-to-ethereum/evm-diagram" },
          {
            text: "Guide to Base \u2197",
            link: "https://www.coinbase.com/cloud/discover/protocol-guides/guide-to-base"
          }
        ]
      },
      {
        text: "Development Tools",
        collapsed: true,
        items: [{ text: "Overview", link: "/learn/development-tools/overview" }]
      },
      {
        text: "Development with Hardhat",
        collapsed: true,
        items: [
          {
            text: "Hardhat Setup and Overview",
            items: [
              {
                text: "Hardhat Overview",
                link: "/learn/hardhat-setup-overview/hardhat-overview-vid"
              },
              {
                text: "Creating a Project",
                link: "/learn/hardhat-setup-overview/creating-a-project-vid"
              },
              {
                text: "Setup Overview",
                link: "/learn/hardhat-setup-overview/hardhat-setup-overview-sbs"
              }
            ]
          },
          {
            text: "Testing with Typescript",
            items: [
              { text: "Testing Overview", link: "/learn/hardhat-testing/testing-overview-vid" },
              { text: "Writing Tests", link: "/learn/hardhat-testing/writing-tests-vid" },
              {
                text: "Contract ABI and Testing",
                link: "/learn/hardhat-testing/contract-abi-and-testing-vid"
              },
              { text: "Testing Step by Step", link: "/learn/hardhat-testing/hardhat-testing-sbs" }
            ]
          },
          {
            text: "Etherscan",
            items: [
              { text: "Step by Step Guide", link: "/learn/etherscan/etherscan-sbs" },
              { text: "Video Tutorial", link: "/learn/etherscan/etherscan-vid" }
            ]
          },
          {
            text: "Deploying Smart Contracts",
            items: [
              {
                text: "Installing Hardhat Deploy",
                link: "/learn/hardhat-deploy/installing-hardhat-deploy-vid"
              },
              {
                text: "Setup Deploy Script",
                link: "/learn/hardhat-deploy/setup-deploy-script-vid"
              },
              {
                text: "Testing Deployment",
                link: "/learn/hardhat-deploy/testing-our-deployment-vid"
              },
              {
                text: "Network Configuration",
                link: "/learn/hardhat-deploy/test-network-configuration-vid"
              },
              { text: "Deployment", link: "/learn/hardhat-deploy/deployment-vid" },
              { text: "Step by Step Guide", link: "/learn/hardhat-deploy/hardhat-deploy-sbs" }
            ]
          },
          {
            text: "Verifying Smart Contracts",
            items: [
              { text: "Video Tutorial", link: "/learn/hardhat-verify/hardhat-verify-vid" },
              { text: "Step by Step Guide", link: "/learn/hardhat-verify/hardhat-verify-sbs" }
            ]
          },
          {
            text: "Mainnet Forking",
            items: [
              { text: "Video Tutorial", link: "/learn/hardhat-forking/mainnet-forking-vid" },
              { text: "Step by Step Guide", link: "/learn/hardhat-forking/hardhat-forking" }
            ]
          }
        ]
      },
      {
        text: "Development With Foundry",
        collapsed: true,
        items: [
          {
            text: "Introduction to Foundry \u2197",
            link: "https://docs.base.org/tutorials/intro-to-foundry-setup"
          },
          {
            text: "Testing Smart Contracts \u2197",
            link: "https://docs.base.org/tutorials/intro-to-foundry-testing"
          }
        ]
      },
      {
        text: "Smart Contract Development",
        collapsed: true,
        items: [
          {
            text: "Introduction to Solidity",
            link: "/learn/introduction-to-solidity/introduction-to-solidity-overview"
          },
          {
            text: "Anatomy of a Smart Contract",
            link: "/learn/introduction-to-solidity/anatomy-of-a-smart-contract-vid"
          },
          {
            text: "Introduction to Solidity",
            items: [
              {
                text: "Video Tutorial",
                link: "/learn/introduction-to-solidity/introduction-to-solidity-vid"
              },
              { text: "Overview", link: "/learn/introduction-to-solidity/solidity-overview" },
              {
                text: "Introduction to Remix",
                link: "/learn/introduction-to-solidity/introduction-to-remix-vid"
              },
              {
                text: "Remix Guide",
                link: "/learn/introduction-to-solidity/introduction-to-remix"
              },
              {
                text: "Deployment in Remix",
                link: "/learn/introduction-to-solidity/deployment-in-remix-vid"
              },
              {
                text: "Step by Step Guide",
                link: "/learn/introduction-to-solidity/deployment-in-remix"
              }
            ]
          },
          {
            text: "Contracts and Basic Functions",
            items: [
              {
                text: "Introduction to Contracts",
                link: "/learn/contracts-and-basic-functions/intro-to-contracts-vid"
              },
              {
                text: "Hello World Guide",
                link: "/learn/contracts-and-basic-functions/hello-world-step-by-step"
              },
              { text: "Basic Types", link: "/learn/contracts-and-basic-functions/basic-types" },
              {
                text: "Exercise",
                link: "/learn/contracts-and-basic-functions/basic-functions-exercise"
              }
            ]
          },
          {
            text: "Deploying to a Testnet",
            items: [
              {
                text: "Overview of Test Networks",
                link: "/learn/deployment-to-testnet/overview-of-test-networks-vid"
              },
              { text: "Test Networks", link: "/learn/deployment-to-testnet/test-networks" },
              {
                text: "Deploy to Base Sepolia",
                link: "/learn/deployment-to-testnet/deployment-to-base-sepolia-sbs"
              },
              {
                text: "Contract Verification",
                link: "/learn/deployment-to-testnet/contract-verification-sbs"
              },
              {
                text: "Exercise",
                link: "/learn/deployment-to-testnet/deployment-to-testnet-exercise"
              }
            ]
          },
          {
            text: "Control Structures",
            items: [
              {
                text: "Standard Control Structures",
                link: "/learn/control-structures/standard-control-structures-vid"
              },
              { text: "Loops", link: "/learn/control-structures/loops-vid" },
              {
                text: "Require, Revert, Error",
                link: "/learn/control-structures/require-revert-error-vid"
              },
              { text: "Overview", link: "/learn/control-structures/control-structures" },
              { text: "Exercise", link: "/learn/control-structures/control-structures-exercise" }
            ]
          },
          {
            text: "Storage in Solidity",
            items: [
              { text: "Simple Storage", link: "/learn/storage/simple-storage-video" },
              { text: "Step by Step Guide", link: "/learn/storage/simple-storage-sbs" },
              { text: "How Storage Works", link: "/learn/storage/how-storage-works-video" },
              { text: "Storage Overview", link: "/learn/storage/how-storage-works" },
              { text: "Exercise", link: "/learn/storage/storage-exercise" }
            ]
          },
          {
            text: "Arrays in Solidity",
            items: [
              { text: "Arrays Overview", link: "/learn/arrays/arrays-in-solidity-vid" },
              { text: "Writing Arrays", link: "/learn/arrays/writing-arrays-in-solidity-vid" },
              { text: "Arrays Guide", link: "/learn/arrays/arrays-in-solidity" },
              { text: "Filtering Arrays", link: "/learn/arrays/filtering-an-array-sbs" },
              { text: "Fixed Size Arrays", link: "/learn/arrays/fixed-size-arrays-vid" },
              { text: "Array Storage Layout", link: "/learn/arrays/array-storage-layout-vid" },
              { text: "Exercise", link: "/learn/arrays/arrays-exercise" }
            ]
          },
          {
            text: "The Mapping Type",
            items: [
              { text: "Mappings Overview", link: "/learn/mappings/mappings-vid" },
              { text: "Using msg.sender", link: "/learn/mappings/using-msg-sender-vid" },
              { text: "Step by Step Guide", link: "/learn/mappings/mappings-sbs" },
              {
                text: "How Mappings are Stored",
                link: "/learn/mappings/how-mappings-are-stored-vid"
              },
              { text: "Exercise", link: "/learn/mappings/mappings-exercise" }
            ]
          },
          {
            text: "Advanced Functions",
            items: [
              {
                text: "Function Visibility",
                link: "/learn/advanced-functions/function-visibility-vid"
              },
              {
                text: "Visibility Overview",
                link: "/learn/advanced-functions/function-visibility"
              },
              {
                text: "Function Modifiers",
                link: "/learn/advanced-functions/function-modifiers-vid"
              },
              { text: "Modifiers Guide", link: "/learn/advanced-functions/function-modifiers" }
            ]
          },
          {
            text: "Structs",
            items: [
              { text: "Structs Overview", link: "/learn/structs/structs-vid" },
              { text: "Step by Step Guide", link: "/learn/structs/structs-sbs" },
              { text: "Exercise", link: "/learn/structs/structs-exercise" }
            ]
          },
          {
            text: "Inheritance",
            items: [
              { text: "Inheritance Overview", link: "/learn/inheritance/inheritance-vid" },
              { text: "Step by Step Guide", link: "/learn/inheritance/inheritance-sbs" },
              { text: "Multiple Inheritance", link: "/learn/inheritance/multiple-inheritance-vid" },
              {
                text: "Multiple Inheritance Guide",
                link: "/learn/inheritance/multiple-inheritance"
              },
              { text: "Abstract Contracts", link: "/learn/inheritance/abstract-contracts-vid" },
              {
                text: "Abstract Contracts Guide",
                link: "/learn/inheritance/abstract-contracts-sbs"
              },
              { text: "Exercise", link: "/learn/inheritance/inheritance-exercise" }
            ]
          },
          {
            text: "Imports",
            items: [
              { text: "Imports Overview", link: "/learn/imports/imports-vid" },
              { text: "Step by Step Guide", link: "/learn/imports/imports-sbs" },
              { text: "Exercise", link: "/learn/imports/imports-exercise" }
            ]
          },
          {
            text: "Errors",
            items: [
              { text: "Error Triage", link: "/learn/error-triage/error-triage-vid" },
              { text: "Error Guide", link: "/learn/error-triage/error-triage" },
              { text: "Exercise", link: "/learn/error-triage/error-triage-exercise" }
            ]
          },
          {
            text: "The new Keyword",
            items: [
              {
                text: "Creating New Contracts",
                link: "/learn/new-keyword/creating-a-new-contract-vid"
              },
              { text: "Step by Step Guide", link: "/learn/new-keyword/new-keyword-sbs" },
              { text: "Exercise", link: "/learn/new-keyword/new-keyword-exercise" }
            ]
          },
          {
            text: "Contract to Contract Interactions",
            items: [
              { text: "Intro to Interfaces", link: "/learn/interfaces/intro-to-interfaces-vid" },
              {
                text: "Calling Another Contract",
                link: "/learn/interfaces/calling-another-contract-vid"
              },
              {
                text: "Testing the Interface",
                link: "/learn/interfaces/testing-the-interface-vid"
              },
              {
                text: "Step by Step Guide",
                link: "/learn/interfaces/contract-to-contract-interaction"
              }
            ]
          },
          {
            text: "Events",
            items: [{ text: "Step by Step Guide", link: "/learn/events/hardhat-events-sbs" }]
          },
          {
            text: "Address and Payable",
            items: [{ text: "Guide", link: "/learn/address-and-payable/address-and-payable" }]
          }
        ]
      },
      {
        text: "Token Development",
        collapsed: true,
        items: [
          {
            text: "Introduction to Tokens",
            items: [
              { text: "Tokens Overview", link: "/learn/intro-to-tokens/intro-to-tokens-vid" },
              {
                text: "Common Misconceptions",
                link: "/learn/intro-to-tokens/misconceptions-about-tokens-vid"
              },
              { text: "Overview Guide", link: "/learn/intro-to-tokens/tokens-overview" }
            ]
          },
          {
            text: "Minimal Tokens",
            items: [
              {
                text: "Creating a Minimal Token",
                link: "/learn/minimal-tokens/creating-a-minimal-token-vid"
              },
              {
                text: "Transferring Tokens",
                link: "/learn/minimal-tokens/transferring-a-minimal-token-vid"
              },
              { text: "Step by Step Guide", link: "/learn/minimal-tokens/minimal-token-sbs" },
              { text: "Exercise", link: "/learn/minimal-tokens/minimal-tokens-exercise" }
            ]
          },
          {
            text: "ERC-20 Tokens",
            items: [
              { text: "Analyzing ERC-20", link: "/learn/erc-20-token/analyzing-erc-20-vid" },
              { text: "ERC-20 Standard", link: "/learn/erc-20-token/erc-20-standard" },
              { text: "OpenZeppelin ERC-20", link: "/learn/erc-20-token/openzeppelin-erc-20-vid" },
              { text: "Testing ERC-20", link: "/learn/erc-20-token/erc-20-testing-vid" },
              { text: "Step by Step Guide", link: "/learn/erc-20-token/erc-20-token-sbs" },
              { text: "Exercise", link: "/learn/erc-20-token/erc-20-exercise" }
            ]
          },
          {
            text: "ERC-721 Tokens",
            items: [
              { text: "ERC-721 Standard", link: "/learn/erc-721-token/erc-721-standard-video" },
              { text: "Standard Overview", link: "/learn/erc-721-token/erc-721-standard" },
              { text: "OpenSea Integration", link: "/learn/erc-721-token/erc-721-on-opensea-vid" },
              {
                text: "OpenZeppelin ERC-721",
                link: "/learn/erc-721-token/openzeppelin-erc-721-vid"
              },
              {
                text: "Implementation Guide",
                link: "/learn/erc-721-token/implementing-an-erc-721-vid"
              },
              { text: "Step by Step Guide", link: "/learn/erc-721-token/erc-721-sbs" },
              { text: "Exercise", link: "/learn/erc-721-token/erc-721-exercise" }
            ]
          }
        ]
      },
      {
        text: "Hardhat Tools and Testing",
        collapsed: true,
        items: [
          { text: "Overview", link: "/learn/hardhat-tools-and-testing/overview" },
          {
            text: "Profiling Gas \u2197",
            link: "https://docs.base.org/tutorials/hardhat-profiling-gas"
          },
          {
            text: "Profiling Size \u2197",
            link: "https://docs.base.org/tutorials/hardhat-profiling-size"
          },
          { text: "Debugging \u2197", link: "https://docs.base.org/tutorials/hardhat-debugging" },
          {
            text: "Test Coverage \u2197",
            link: "https://docs.base.org/tutorials/hardhat-test-coverage"
          }
        ]
      },
      {
        text: "Onchain App Development",
        collapsed: true,
        items: [
          { text: "Overview", link: "/learn/frontend-setup/overview" },
          {
            text: "Frontend Setup",
            items: [
              { text: "Wallet Connectors", link: "/learn/frontend-setup/wallet-connectors" },
              {
                text: "Building an Onchain App",
                link: "/learn/frontend-setup/building-an-onchain-app"
              }
            ]
          },
          {
            text: "Connecting to the Blockchain \u2197",
            link: "https://docs.base.org/tutorials/intro-to-providers"
          },
          {
            text: "Reading and Displaying Data",
            items: [
              { text: "useAccount", link: "/learn/reading-and-displaying-data/useAccount" },
              {
                text: "useReadContract",
                link: "/learn/reading-and-displaying-data/useReadContract"
              },
              {
                text: "Configuring useReadContract",
                link: "/learn/reading-and-displaying-data/configuring-useReadContract"
              }
            ]
          },
          {
            text: "Writing to Contracts",
            items: [
              { text: "useWriteContract", link: "/learn/writing-to-contracts/useWriteContract" },
              {
                text: "useSimulateContract",
                link: "/learn/writing-to-contracts/useSimulateContract"
              }
            ]
          }
        ]
      },
      {
        text: "Exercise Contracts",
        link: "/learn/exercise-contracts"
      },
      {
        text: "Get help\u2197",
        link: "https://discord.com/invite/buildonbase"
      }
    ]
  },
  {
    text: "Buildathons",
    collapsed: true,
    items: [{ text: "2025-02-flash", link: "/buildathons/2025-02-flash" }]
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
import { Fragment, jsx, jsxs } from "file:///Users/mindapivessa/Desktop/web/node_modules/react/jsx-runtime.js";
var googleAnalyticsScript = {
  __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-TKCM02YFWN');
    `
};
var generateNonce = () => {
  return crypto.randomBytes(16).toString("base64");
};
var contentSecurityPolicy = {
  "default-src": ["'self'"],
  "frame-ancestors": ["'self'"],
  "form-action": ["'self'"],
  "script-src": [
    "'self'",
    "'unsafe-inline'",
    `'nonce-${generateNonce()}'`,
    "https://static-assets.coinbase.com/js/cca/v0.0.1.js",
    // CCA Lite
    "https://cca-lite.coinbase.com"
    // CCA Lite
  ],
  "style-src": ["'self'", "'unsafe-inline'"],
  "img-src": ["'self'", "data:"],
  "connect-src": [
    "'self'",
    "wss://www.walletlink.org/rpc",
    // Coinbase Wallet SDK
    "wss://relay.walletconnect.com",
    // WalletConnect
    "wss://relay.walletconnect.org",
    "https://goerli.base.org",
    // Base Goerli RPC
    "https://sepolia.base.org",
    // Base Sepolia RPC
    "https://cca-lite.coinbase.com",
    // CCA Lite
    "https://*.algolia.net",
    // Algolia Search
    "https://*.algolianet.com",
    // Algolia Search
    "https://api.mendable.ai/v1/newConversation",
    // Mendable API
    "https://api.mendable.ai/v1/mendableChat",
    // Mendable API
    "https://api.mendable.ai/v1/rateMessage",
    // Mendable API
    "https://api.sprig.com",
    // Sprig API
    "https://cdn.sprig.com",
    // Sprig API
    "https://flag.lab.amplitude.com/sdk/v2/flags",
    "https://api.lab.amplitude.com/sdk/v2/vardata",
    "https://browser-intake-datadoghq.com",
    // datadog
    "https://*.datadoghq.com",
    "https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com"
    // Google Analytics
  ],
  "frame-src": ["'self'", "https://player.vimeo.com", "https://verify.walletconnect.org"]
};
var vocs_config_default = defineConfig({
  async head() {
    const analytics = /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("meta", { property: "twitter:title", content: "Base | Docs" }),
      /* @__PURE__ */ jsx("meta", { property: "twitter:image", content: "https://docs.base.org/images/base-docs-og.png" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          property: "twitter:description",
          content: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2"
        }
      ),
      /* @__PURE__ */ jsx("meta", { property: "twitter:card", content: "summary_large_image" }),
      /* @__PURE__ */ jsx("meta", { property: "twitter:domain", content: "base.org" }),
      /* @__PURE__ */ jsx("script", { src: "https://www.googletagmanager.com/gtag/js?id=G-TKCM02YFWN", async: true, defer: true }),
      /* @__PURE__ */ jsx(
        "script",
        {
          id: "gtag-init",
          dangerouslySetInnerHTML: googleAnalyticsScript
        }
      )
    ] });
    return analytics;
  },
  baseUrl: "https://docs.base.org",
  title: "Base Docs",
  iconUrl: "/favicon.ico",
  logoUrl: "/logo.svg",
  ogImageUrl: "/images/base-docs-og.png",
  blogDir: "./blog",
  description: "Explore the documentation for Base, a secure, low-cost, builder-friendly Ethereum L2",
  theme: {
    colorScheme: "dark",
    accentColor: "#578BFA",
    variables: {
      color: {
        textAccent: "#578BFA"
      }
    }
  },
  topNav: [
    {
      text: "Get help",
      link: "https://discord.com/invite/buildonbase?utm_source=dotorg&utm_medium=nav"
    },
    {
      text: "base.org",
      link: "https://base.org"
    }
  ],
  socials: [
    {
      icon: "github",
      link: "https://github.com/base"
    },
    {
      icon: "x",
      link: "http://x.com/buildonbase"
    },
    {
      icon: "warpcast",
      link: "https://warpcast.com/buildonbase"
    },
    {
      icon: "discord",
      link: "https://discord.com/invite/buildonbase"
    }
  ],
  twoslash: {
    compilerOptions: {
      allowUmdGlobalAccess: true,
      esModuleInterop: true,
      module: 199,
      // ModuleKind.NodeNext
      moduleResolution: 99
      // ModuleResolutionKind.NodeNext
    }
  },
  markdown: {
    code: {
      themes: {
        light: "github-light",
        dark: "github-dark"
      }
    }
  },
  search: {
    fields: ["title", "content", "productLine", "docType", "userType"],
    // Fields to index
    fuzzy: 0.2,
    // Typo tolerance
    boost: {
      // Boosting by document type
      "docType.API": 2,
      "docType.Guide": 1.5
    },
    prefix: true
    // Autocomplete
  },
  sidebar,
  vite: {
    plugins: [react(), svgr()],
    build: {
      commonjsOptions: {
        include: [/node_modules/]
      }
    },
    optimizeDeps: {
      include: ["react", "react-dom", "@coinbase/cookie-banner"]
    },
    define: {
      Buffer: ["buffer", "Buffer"]
    },
    server: {
      headers: {
        "Content-Security-Policy": Object.entries(contentSecurityPolicy).map(([key, value]) => `${key} ${value.join(" ")}`).join("; ")
      }
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
      alias: {
        "@/": path.join(process.cwd(), "docs/"),
        "@/components": path.join(process.cwd(), "docs/components"),
        "@/pages": path.join(process.cwd(), "docs/pages"),
        "@/styles": path.join(process.cwd(), "docs/styles"),
        "@/lib": path.join(process.cwd(), "docs/lib"),
        "@/utils": path.join(process.cwd(), "docs/utils"),
        "@/types": path.join(process.cwd(), "docs/types"),
        "@/images": path.join(process.cwd(), "docs/public/images")
      }
    }
  }
});
export {
  vocs_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidm9jcy5jb25maWcudHN4IiwgInNpZGViYXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZvY3MnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgY3J5cHRvIGZyb20gJ2NyeXB0byc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHN2Z3IgZnJvbSAndml0ZS1wbHVnaW4tc3Zncic7XG5pbXBvcnQgeyBzaWRlYmFyIH0gZnJvbSAnLi9zaWRlYmFyLnRzJztcblxuY29uc3QgZ29vZ2xlQW5hbHl0aWNzU2NyaXB0ID0ge1xuICBfX2h0bWw6IGBcbiAgICAgIHdpbmRvdy5kYXRhTGF5ZXIgPSB3aW5kb3cuZGF0YUxheWVyIHx8IFtdO1xuICAgICAgZnVuY3Rpb24gZ3RhZygpe2RhdGFMYXllci5wdXNoKGFyZ3VtZW50cyk7fVxuICAgICAgZ3RhZygnanMnLCBuZXcgRGF0ZSgpKTtcbiAgICAgIGd0YWcoJ2NvbmZpZycsICdHLVRLQ00wMllGV04nKTtcbiAgICBgLFxufTtcblxuY29uc3QgZ2VuZXJhdGVOb25jZSA9ICgpID0+IHtcbiAgcmV0dXJuIGNyeXB0by5yYW5kb21CeXRlcygxNikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xufTtcblxuLy8gTk9URTogdGhpcyBDU1Agb25seSBhcHBsaWVzIGluIGxvY2FsIGRldmVsb3BtZW50LiBQcm9kIENTUCBpcyBzZXQgaW4gYHNlcnZlLmpzb25gXG5jb25zdCBjb250ZW50U2VjdXJpdHlQb2xpY3kgPSB7XG4gICdkZWZhdWx0LXNyYyc6IFtcIidzZWxmJ1wiXSxcbiAgJ2ZyYW1lLWFuY2VzdG9ycyc6IFtcIidzZWxmJ1wiXSxcbiAgJ2Zvcm0tYWN0aW9uJzogW1wiJ3NlbGYnXCJdLFxuICAnc2NyaXB0LXNyYyc6IFtcbiAgICBcIidzZWxmJ1wiLFxuICAgIFwiJ3Vuc2FmZS1pbmxpbmUnXCIsXG4gICAgYCdub25jZS0ke2dlbmVyYXRlTm9uY2UoKX0nYCxcbiAgICAnaHR0cHM6Ly9zdGF0aWMtYXNzZXRzLmNvaW5iYXNlLmNvbS9qcy9jY2EvdjAuMC4xLmpzJywgLy8gQ0NBIExpdGVcbiAgICAnaHR0cHM6Ly9jY2EtbGl0ZS5jb2luYmFzZS5jb20nLCAvLyBDQ0EgTGl0ZVxuICBdLFxuICAnc3R5bGUtc3JjJzogW1wiJ3NlbGYnXCIsIFwiJ3Vuc2FmZS1pbmxpbmUnXCJdLFxuICAnaW1nLXNyYyc6IFtcIidzZWxmJ1wiLCAnZGF0YTonXSxcbiAgJ2Nvbm5lY3Qtc3JjJzogW1xuICAgIFwiJ3NlbGYnXCIsXG4gICAgJ3dzczovL3d3dy53YWxsZXRsaW5rLm9yZy9ycGMnLCAvLyBDb2luYmFzZSBXYWxsZXQgU0RLXG4gICAgJ3dzczovL3JlbGF5LndhbGxldGNvbm5lY3QuY29tJywgLy8gV2FsbGV0Q29ubmVjdFxuICAgICd3c3M6Ly9yZWxheS53YWxsZXRjb25uZWN0Lm9yZycsXG4gICAgJ2h0dHBzOi8vZ29lcmxpLmJhc2Uub3JnJywgLy8gQmFzZSBHb2VybGkgUlBDXG4gICAgJ2h0dHBzOi8vc2Vwb2xpYS5iYXNlLm9yZycsIC8vIEJhc2UgU2Vwb2xpYSBSUENcbiAgICAnaHR0cHM6Ly9jY2EtbGl0ZS5jb2luYmFzZS5jb20nLCAvLyBDQ0EgTGl0ZVxuICAgICdodHRwczovLyouYWxnb2xpYS5uZXQnLCAvLyBBbGdvbGlhIFNlYXJjaFxuICAgICdodHRwczovLyouYWxnb2xpYW5ldC5jb20nLCAvLyBBbGdvbGlhIFNlYXJjaFxuICAgICdodHRwczovL2FwaS5tZW5kYWJsZS5haS92MS9uZXdDb252ZXJzYXRpb24nLCAvLyBNZW5kYWJsZSBBUElcbiAgICAnaHR0cHM6Ly9hcGkubWVuZGFibGUuYWkvdjEvbWVuZGFibGVDaGF0JywgLy8gTWVuZGFibGUgQVBJXG4gICAgJ2h0dHBzOi8vYXBpLm1lbmRhYmxlLmFpL3YxL3JhdGVNZXNzYWdlJywgLy8gTWVuZGFibGUgQVBJXG4gICAgJ2h0dHBzOi8vYXBpLnNwcmlnLmNvbScsIC8vIFNwcmlnIEFQSVxuICAgICdodHRwczovL2Nkbi5zcHJpZy5jb20nLCAvLyBTcHJpZyBBUElcbiAgICAnaHR0cHM6Ly9mbGFnLmxhYi5hbXBsaXR1ZGUuY29tL3Nkay92Mi9mbGFncycsXG4gICAgJ2h0dHBzOi8vYXBpLmxhYi5hbXBsaXR1ZGUuY29tL3Nkay92Mi92YXJkYXRhJyxcbiAgICAnaHR0cHM6Ly9icm93c2VyLWludGFrZS1kYXRhZG9naHEuY29tJywgLy8gZGF0YWRvZ1xuICAgICdodHRwczovLyouZGF0YWRvZ2hxLmNvbScsXG4gICAgJ2h0dHBzOi8vKi5nb29nbGUtYW5hbHl0aWNzLmNvbSBodHRwczovLyouYW5hbHl0aWNzLmdvb2dsZS5jb20gaHR0cHM6Ly8qLmdvb2dsZXRhZ21hbmFnZXIuY29tJywgLy8gR29vZ2xlIEFuYWx5dGljc1xuICBdLFxuICAnZnJhbWUtc3JjJzogW1wiJ3NlbGYnXCIsICdodHRwczovL3BsYXllci52aW1lby5jb20nLCAnaHR0cHM6Ly92ZXJpZnkud2FsbGV0Y29ubmVjdC5vcmcnXSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIGFzeW5jIGhlYWQoKSB7XG4gICAgY29uc3QgYW5hbHl0aWNzID0gKFxuICAgICAgPD5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOnRpdGxlXCIgY29udGVudD1cIkJhc2UgfCBEb2NzXCIgLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmltYWdlXCIgY29udGVudD1cImh0dHBzOi8vZG9jcy5iYXNlLm9yZy9pbWFnZXMvYmFzZS1kb2NzLW9nLnBuZ1wiIC8+XG4gICAgICAgIDxtZXRhXG4gICAgICAgICAgcHJvcGVydHk9XCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCJcbiAgICAgICAgICBjb250ZW50PVwiRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyXCJcbiAgICAgICAgLz5cbiAgICAgICAgPG1ldGEgcHJvcGVydHk9XCJ0d2l0dGVyOmNhcmRcIiBjb250ZW50PVwic3VtbWFyeV9sYXJnZV9pbWFnZVwiIC8+XG4gICAgICAgIDxtZXRhIHByb3BlcnR5PVwidHdpdHRlcjpkb21haW5cIiBjb250ZW50PVwiYmFzZS5vcmdcIiAvPlxuICAgICAgICA8c2NyaXB0IHNyYz1cImh0dHBzOi8vd3d3Lmdvb2dsZXRhZ21hbmFnZXIuY29tL2d0YWcvanM/aWQ9Ry1US0NNMDJZRldOXCIgYXN5bmMgZGVmZXIgLz5cbiAgICAgICAgPHNjcmlwdFxuICAgICAgICAgIGlkPVwiZ3RhZy1pbml0XCJcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tZGFuZ2VyIC0tIG5lZWQgdG8gc2V0IGlubmVySFRNTCBmb3IgR29vZ2xlIEFuYWx5dGljc1xuICAgICAgICAgIGRhbmdlcm91c2x5U2V0SW5uZXJIVE1MPXtnb29nbGVBbmFseXRpY3NTY3JpcHR9XG4gICAgICAgIC8+XG4gICAgICA8Lz5cbiAgICApO1xuICAgIHJldHVybiBhbmFseXRpY3M7XG4gIH0sXG4gIGJhc2VVcmw6ICdodHRwczovL2RvY3MuYmFzZS5vcmcnLFxuICB0aXRsZTogJ0Jhc2UgRG9jcycsXG4gIGljb25Vcmw6ICcvZmF2aWNvbi5pY28nLFxuICBsb2dvVXJsOiAnL2xvZ28uc3ZnJyxcbiAgb2dJbWFnZVVybDogJy9pbWFnZXMvYmFzZS1kb2NzLW9nLnBuZycsXG4gIGJsb2dEaXI6ICcuL2Jsb2cnLFxuICBkZXNjcmlwdGlvbjpcbiAgICAnRXhwbG9yZSB0aGUgZG9jdW1lbnRhdGlvbiBmb3IgQmFzZSwgYSBzZWN1cmUsIGxvdy1jb3N0LCBidWlsZGVyLWZyaWVuZGx5IEV0aGVyZXVtIEwyJyxcbiAgdGhlbWU6IHtcbiAgICBjb2xvclNjaGVtZTogJ2RhcmsnLFxuICAgIGFjY2VudENvbG9yOiAnIzU3OEJGQScsXG4gICAgdmFyaWFibGVzOiB7XG4gICAgICBjb2xvcjoge1xuICAgICAgICB0ZXh0QWNjZW50OiAnIzU3OEJGQScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHRvcE5hdjogW1xuICAgIHtcbiAgICAgIHRleHQ6ICdHZXQgaGVscCcsXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmNvbS9pbnZpdGUvYnVpbGRvbmJhc2U/dXRtX3NvdXJjZT1kb3RvcmcmdXRtX21lZGl1bT1uYXYnLFxuICAgIH0sXG4gICAge1xuICAgICAgdGV4dDogJ2Jhc2Uub3JnJyxcbiAgICAgIGxpbms6ICdodHRwczovL2Jhc2Uub3JnJyxcbiAgICB9LFxuICBdLFxuICBzb2NpYWxzOiBbXG4gICAge1xuICAgICAgaWNvbjogJ2dpdGh1YicsXG4gICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2Jhc2UnLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogJ3gnLFxuICAgICAgbGluazogJ2h0dHA6Ly94LmNvbS9idWlsZG9uYmFzZScsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiAnd2FycGNhc3QnLFxuICAgICAgbGluazogJ2h0dHBzOi8vd2FycGNhc3QuY29tL2J1aWxkb25iYXNlJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246ICdkaXNjb3JkJyxcbiAgICAgIGxpbms6ICdodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS9idWlsZG9uYmFzZScsXG4gICAgfSxcbiAgXSxcbiAgdHdvc2xhc2g6IHtcbiAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgIGFsbG93VW1kR2xvYmFsQWNjZXNzOiB0cnVlLFxuICAgICAgZXNNb2R1bGVJbnRlcm9wOiB0cnVlLFxuICAgICAgbW9kdWxlOiAxOTksIC8vIE1vZHVsZUtpbmQuTm9kZU5leHRcbiAgICAgIG1vZHVsZVJlc29sdXRpb246IDk5LCAvLyBNb2R1bGVSZXNvbHV0aW9uS2luZC5Ob2RlTmV4dFxuICAgIH0sXG4gIH0sXG4gIG1hcmtkb3duOiB7XG4gICAgY29kZToge1xuICAgICAgdGhlbWVzOiB7XG4gICAgICAgIGxpZ2h0OiAnZ2l0aHViLWxpZ2h0JyxcbiAgICAgICAgZGFyazogJ2dpdGh1Yi1kYXJrJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgc2VhcmNoOiB7XG4gICAgZmllbGRzOiBbJ3RpdGxlJywgJ2NvbnRlbnQnLCAncHJvZHVjdExpbmUnLCAnZG9jVHlwZScsICd1c2VyVHlwZSddLCAvLyBGaWVsZHMgdG8gaW5kZXhcbiAgICBmdXp6eTogMC4yLCAvLyBUeXBvIHRvbGVyYW5jZVxuICAgIGJvb3N0OiB7XG4gICAgICAvLyBCb29zdGluZyBieSBkb2N1bWVudCB0eXBlXG4gICAgICAnZG9jVHlwZS5BUEknOiAyLFxuICAgICAgJ2RvY1R5cGUuR3VpZGUnOiAxLjUsXG4gICAgfSxcbiAgICBwcmVmaXg6IHRydWUsIC8vIEF1dG9jb21wbGV0ZVxuICB9LFxuICBzaWRlYmFyLFxuICB2aXRlOiB7XG4gICAgcGx1Z2luczogW3JlYWN0KCksIHN2Z3IoKV0sXG4gICAgYnVpbGQ6IHtcbiAgICAgIGNvbW1vbmpzT3B0aW9uczoge1xuICAgICAgICBpbmNsdWRlOiBbL25vZGVfbW9kdWxlcy9dLFxuICAgICAgfSxcbiAgICB9LFxuICAgIG9wdGltaXplRGVwczoge1xuICAgICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAnQGNvaW5iYXNlL2Nvb2tpZS1iYW5uZXInXSxcbiAgICB9LFxuICAgIGRlZmluZToge1xuICAgICAgQnVmZmVyOiBbJ2J1ZmZlcicsICdCdWZmZXInXSxcbiAgICB9LFxuICAgIHNlcnZlcjoge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICAnQ29udGVudC1TZWN1cml0eS1Qb2xpY3knOiBPYmplY3QuZW50cmllcyhjb250ZW50U2VjdXJpdHlQb2xpY3kpXG4gICAgICAgICAgLm1hcCgoW2tleSwgdmFsdWVdKSA9PiBgJHtrZXl9ICR7dmFsdWUuam9pbignICcpfWApXG4gICAgICAgICAgLmpvaW4oJzsgJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmVzb2x2ZToge1xuICAgICAgZXh0ZW5zaW9uczogWycuanMnLCAnLmpzeCcsICcudHMnLCAnLnRzeCcsICcuanNvbiddLFxuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AvJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzLycpLFxuICAgICAgICAnQC9jb21wb25lbnRzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL2NvbXBvbmVudHMnKSxcbiAgICAgICAgJ0AvcGFnZXMnOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MvcGFnZXMnKSxcbiAgICAgICAgJ0Avc3R5bGVzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3N0eWxlcycpLFxuICAgICAgICAnQC9saWInOiBwYXRoLmpvaW4ocHJvY2Vzcy5jd2QoKSwgJ2RvY3MvbGliJyksXG4gICAgICAgICdAL3V0aWxzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3V0aWxzJyksXG4gICAgICAgICdAL3R5cGVzJzogcGF0aC5qb2luKHByb2Nlc3MuY3dkKCksICdkb2NzL3R5cGVzJyksXG4gICAgICAgICdAL2ltYWdlcyc6IHBhdGguam9pbihwcm9jZXNzLmN3ZCgpLCAnZG9jcy9wdWJsaWMvaW1hZ2VzJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL21pbmRhcGl2ZXNzYS9EZXNrdG9wL3dlYi9hcHBzL2Jhc2UtZG9jc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL21pbmRhcGl2ZXNzYS9EZXNrdG9wL3dlYi9hcHBzL2Jhc2UtZG9jcy9zaWRlYmFyLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9taW5kYXBpdmVzc2EvRGVza3RvcC93ZWIvYXBwcy9iYXNlLWRvY3Mvc2lkZWJhci50c1wiO2ltcG9ydCB0eXBlIHsgU2lkZWJhciB9IGZyb20gJ3ZvY3MnO1xuXG4vLyBOb3RlOiBjYXJlZnVsIG9mIG5hbWUgY2xhc2hpbmcgYmV0d2VlbiBzaWRlYmFyIGl0ZW1zIGFuZCBkb2NzIHBhZ2VzLlxuLy8gRm9yIGV4YW1wbGUsICdRdWlja3N0YXJ0JyBpcyB1c2VkIGZvciBib3RoIHNpZGViYXIgYW5kIHBhZ2UgbmFtZXMuXG4vLyBJZiBkb2NzIGFyZSBwYXJ0IG9mIGEgc2lkZWJhciBjb2xsZWN0aW9uLCB0aGV5IHNob3VsZCBiZSBpbiBhIHN1YmZvbGRlclxuZXhwb3J0IGNvbnN0IHNpZGViYXI6IFNpZGViYXIgPSBbXG4gIHtcbiAgICB0ZXh0OiAnT3ZlcnZpZXcnLFxuICAgIGxpbms6ICcvJyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdRdWlja3N0YXJ0JyxcbiAgICBsaW5rOiAnL3F1aWNrc3RhcnQnLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ0JyaWRnZXMnLFxuICAgIGxpbms6ICcvY2hhaW4vYnJpZGdlcy1tYWlubmV0JyxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdCdWlsZGVyIEtpdHMnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPbmNoYWluS2l0JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnR2V0dGluZyBTdGFydGVkJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2dldHRpbmctc3RhcnRlZCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVGVsZW1ldHJ5JywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy90ZWxlbWV0cnknIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1Ryb3VibGVzaG9vdGluZycsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdHJvdWJsZXNob290aW5nJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnN0YWxsYXRpb24nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTmV4dC5qcycsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vbmV4dGpzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdWaXRlJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi92aXRlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdSZW1peCcsIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pbnN0YWxsYXRpb24vcmVtaXgnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FzdHJvJywgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2luc3RhbGxhdGlvbi9hc3RybycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnT25jaGFpbktpdFByb3ZpZGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvY29uZmlnL29uY2hhaW5raXQtcHJvdmlkZXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0N1c3RvbSBTdXBwbGVtZW50YWwgUHJvdmlkZXJzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvY29uZmlnL3N1cHBsZW1lbnRhbC1wcm92aWRlcnMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdHdWlkZXMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdMaWZlY3ljbGUgU3RhdHVzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ3VpZGVzL2xpZmVjeWNsZS1zdGF0dXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RhaWx3aW5kIENTUyBJbnRlZ3JhdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy90YWlsd2luZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGhlbWUgQ3VzdG9taXphdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy90aGVtZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1VzZSBCYXNlbmFtZXMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ndWlkZXMvdXNlLWJhc2VuYW1lLWluLW9uY2hhaW4tYXBwJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdVc2UgQUktcG93ZXJlZCBJREVzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZ3VpZGVzL3VzaW5nLWFpLXBvd2VyZWQtaWRlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1RlbXBsYXRlcycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ09uY2hhaW4gTkZUIEFwcCBcdTIxOTcnLFxuICAgICAgICAgICAgICAgIGxpbms6ICdodHRwczovL29jay1taW50LnZlcmNlbC5hcHAvJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdPbmNoYWluIENvbW1lcmNlIEFwcCBcdTIxOTcnLFxuICAgICAgICAgICAgICAgIGxpbms6ICdodHRwczovL29uY2hhaW4tY29tbWVyY2UtdGVtcGxhdGUudmVyY2VsLmFwcC8nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ09uY2hhaW4gU29jaWFsIFByb2ZpbGUgXHUyMTk3JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL2Zha2VwaXhlbHMvb2NrLWlkZW50aXR5JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29tcG9uZW50cycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0FwcGNoYWluJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0JyaWRnZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcHBjaGFpbi9icmlkZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0J1eScsXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdCdXknLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYnV5L2J1eScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvY2hlY2tvdXQvY2hlY2tvdXQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0Vhcm4nLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRWFybicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9lYXJuL2Vhcm4nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0Z1bmQnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRnVuZEJ1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL2Z1bmQtYnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kQ2FyZCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL2Z1bmQtY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvaWRlbnRpdHknLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0FkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2F2YXRhcicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQmFkZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvYmFkZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5Q2FyZCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9pZGVudGl0eS1jYXJkJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L25hbWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1NvY2lhbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvc29jaWFscycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTWludCcsXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdORlRDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvbmZ0LWNhcmQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ05GVE1pbnRDYXJkJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvbmZ0LW1pbnQtY2FyZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcCcsXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTd2FwJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3N3YXAvc3dhcCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU3dhcFNldHRpbmdzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3N3YXAvc3dhcC1zZXR0aW5ncycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW4nLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5DaGlwJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLWNoaXAnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuSW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4taW1hZ2UnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuUm93JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLXJvdycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW5TZWFyY2gnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvdG9rZW4vdG9rZW4tc2VhcmNoJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlblNlbGVjdERyb3Bkb3duJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3Rva2VuLXNlbGVjdC1kcm9wZG93bicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC90cmFuc2FjdGlvbi90cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0JyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXREcm9wZG93bkJhc2VuYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3dhbGxldC93YWxsZXQtZHJvcGRvd24tYmFzZW5hbWUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRGlzY29ubmVjdCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWRpc2Nvbm5lY3QnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duRnVuZExpbmsnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L3dhbGxldC1kcm9wZG93bi1mdW5kLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldERyb3Bkb3duTGluaycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWRyb3Bkb3duLWxpbmsnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldElzbGFuZCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvd2FsbGV0LWlzbGFuZCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnV2FsbGV0TW9kYWwnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L3dhbGxldC1tb2RhbCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0FQSScsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRUb2tlbkRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2dldC10b2tlbi1kZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRNaW50RGV0YWlscycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcGkvZ2V0LW1pbnQtZGV0YWlscycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnYnVpbGRNaW50VHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLW1pbnQtdHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdidWlsZFN3YXBUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9hcGkvYnVpbGQtc3dhcC10cmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0U3dhcFF1b3RlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9nZXQtc3dhcC1xdW90ZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVG9rZW4nLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRUb2tlbnMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2dldC10b2tlbnMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldFBvcnRmb2xpb3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2dldC1wb3J0Zm9saW9zJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVXRpbGl0aWVzJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29uZmlnJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnaXNCYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2NvbmZpZy9pcy1iYXNlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdpc0V0aGVyZXVtJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2NvbmZpZy9pcy1ldGhlcmV1bScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRWFybicsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2J1aWxkRGVwb3NpdFRvTW9ycGhvVHgnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL2J1aWxkLWRlcG9zaXQtdG8tbW9ycGhvLXR4JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdidWlsZFdpdGhkcmF3RnJvbU1vcnBob1R4JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwaS9idWlsZC13aXRoZHJhdy1mcm9tLW1vcnBoby10eCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAndXNlQnVpbGREZXBvc2l0VG9Nb3JwaG9UeCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ob29rcy91c2UtYnVpbGQtZGVwb3NpdC10by1tb3JwaG8tdHgnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3VzZUJ1aWxkV2l0aGRyYXdGcm9tTW9ycGhvVHgnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaG9va3MvdXNlLWJ1aWxkLXdpdGhkcmF3LWZyb20tbW9ycGhvLXR4JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VFYXJuQ29udGV4dCcsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9ob29rcy91c2UtZWFybi1jb250ZXh0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0T25yYW1wQnV5VXJsJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2Z1bmQvZ2V0LW9ucmFtcC1idXktdXJsJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdmZXRjaE9ucmFtcENvbmZpZycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL2ZldGNoLW9ucmFtcC1jb25maWcnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2ZldGNoT25yYW1wUXVvdGUnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZnVuZC9mZXRjaC1vbnJhbXAtcXVvdGUnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2ZldGNoT25yYW1wT3B0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL2ZldGNoLW9ucmFtcC1vcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdmZXRjaE9ucmFtcFRyYW5zYWN0aW9uU3RhdHVzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2Z1bmQvZmV0Y2gtb25yYW1wLXRyYW5zYWN0aW9uLXN0YXR1cycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnc2V0dXBPbnJhbXBFdmVudExpc3RlbmVycycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9mdW5kL3NldHVwLW9ucmFtcC1ldmVudC1saXN0ZW5lcnMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0lkZW50aXR5JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0QWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYWRkcmVzcycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZ2V0QXR0ZXN0YXRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hdHRlc3RhdGlvbnMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2dldEF2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtYXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXRBdmF0YXJzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1hdmF0YXJzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXROYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L2dldC1uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdnZXROYW1lcycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS9nZXQtbmFtZXMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3VzZUFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaWRlbnRpdHkvdXNlLWFkZHJlc3MnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3VzZUF2YXRhcicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtYXZhdGFyJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VBdmF0YXJzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3VzZS1hdmF0YXJzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VOYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2lkZW50aXR5L3VzZS1uYW1lJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VOYW1lcycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS91c2UtbmFtZXMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ01pbnQnLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICd1c2VUb2tlbkRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvaG9va3MvdXNlLXRva2VuLWRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3VzZU1pbnREZXRhaWxzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2hvb2tzL3VzZS1taW50LWRldGFpbHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1Rva2VuJyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZm9ybWF0QW1vdW50JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL2Zvcm1hdC1hbW91bnQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1dhbGxldCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzVmFsaWRBQUVudHJ5cG9pbnQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L2lzLXZhbGlkLWFhLWVudHJ5cG9pbnQnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2lzV2FsbGV0QUNvaW5iYXNlU21hcnRXYWxsZXQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvd2FsbGV0L2lzLXdhbGxldC1hLWNvaW5iYXNlLXNtYXJ0LXdhbGxldCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1R5cGVzJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQVBJJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvYXBpL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdBcHBjaGFpbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2FwcGNoYWluL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDaGVja291dCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2NoZWNrb3V0L3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb25maWcnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9jb25maWcvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0Vhcm4nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9lYXJuL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5kJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2J1aWxkZXJraXRzL29uY2hhaW5raXQvZnVuZC90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSWRlbnRpdHknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9pZGVudGl0eS90eXBlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnTWludCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L21pbnQvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1N3YXAnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC9zd2FwL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUb2tlbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3Rva2VuL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L3RyYW5zYWN0aW9uL3R5cGVzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdXYWxsZXQnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvYnVpbGRlcmtpdHMvb25jaGFpbmtpdC93YWxsZXQvdHlwZXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb250cmlidXRpb24nLFxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdIb3cgdG8gQ29udHJpYnV0ZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9jb250cmlidXRpb24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlcG9ydCBhIEJ1ZycsXG4gICAgICAgICAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9vbmNoYWlua2l0L2d1aWRlcy9yZXBvcnRpbmctYnVnJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdNaW5pS2l0JyxcbiAgICAgICAgbGluazogJy9idWlsZGVya2l0cy9taW5pa2l0L2dldHRpbmctc3RhcnRlZCcsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQWdlbnRLaXQgKENEUCkgXHUyMTk3JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jcy5jZHAuY29pbmJhc2UuY29tL2FnZW50a2l0L2RvY3Mvd2VsY29tZScsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnQmxvY2tzcGFjZSBUb29scycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1BheW1hc3RlciAoQ0RQKSBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kb2NzLmNkcC5jb2luYmFzZS5jb20vcGF5bWFzdGVyL2RvY3Mvd2VsY29tZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQXBwY2hhaW5zIFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuY2RwLmNvaW5iYXNlLmNvbS9hcHBjaGFpbnMvZG9jcy93ZWxjb21lJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdJZGVudGl0eScsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1NtYXJ0IFdhbGxldCcsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0luc3RhbGwgZm9yIFdlYicsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ludHJvZHVjdGlvbi9pbnN0YWxsLXdlYicgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJbnN0YWxsIGZvciBSZWFjdCBOYXRpdmUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ludHJvZHVjdGlvbi9pbnN0YWxsLXJlYWN0LW5hdGl2ZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUmVjb21tZW5kIExpYnJhcmllcycsXG4gICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvaW50cm9kdWN0aW9uL3JlY29tbWVuZGVkLWxpYnJhcmllcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1N0YXJ0ZXIgVGVtcGxhdGVzJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvaW50cm9kdWN0aW9uL3RlbXBsYXRlcycgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdCYXNlIEdhc2xlc3MgQ2FtcGFpZ24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ludHJvZHVjdGlvbi9iYXNlLWdhc2xlc3MtY2FtcGFpZ24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0ZlYXR1cmVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQnVpbHQtaW4gRmVhdHVyZXMnLFxuICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU2luZ2xlIFNpZ24gT24nLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9zaW5nbGUtc2lnbi1vbicsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnTmV0d29ya3MnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9uZXR3b3JrcycgfSxcbiAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1Bhc3NrZXlzJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvcGFzc2tleXMnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdSZWNvdmVyeScsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL3JlY292ZXJ5LWtleXMnIH0sXG4gICAgICAgICAgICAgICAgICB7IHRleHQ6ICdNYWdpY1NwZW5kJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvTWFnaWNTcGVuZCcgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ09wdGlvbmFsIEZlYXR1cmVzJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0dhcy1mcmVlIFRyYW5zYWN0aW9ucycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2ZlYXR1cmVzL2dhcy1mcmVlLXRyYW5zYWN0aW9ucycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU3BlbmQgUGVybWlzc2lvbnMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9zcGVuZC1wZXJtaXNzaW9ucycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQmF0Y2ggVHJhbnNhY3Rpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvYmF0Y2gtb3BlcmF0aW9ucycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnQ3VzdG9tIEdhcyBUb2tlbnMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9mZWF0dXJlcy9jdXN0b20tZ2FzLXRva2VucycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU3ViIEFjY291bnRzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZmVhdHVyZXMvc3ViLWFjY291bnRzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVXNhZ2UgRGV0YWlscycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1NpZ25hdHVyZSBWZXJpZmljYXRpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3VzYWdlLWRldGFpbHMvc2lnbmF0dXJlLXZlcmlmaWNhdGlvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1BvcHVwcycsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3VzYWdlLWRldGFpbHMvcG9wdXBzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTaW11bGF0aW9ucycsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3VzYWdlLWRldGFpbHMvU2ltdWxhdGlvbnMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0dhcyBVc2FnZScsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3VzYWdlLWRldGFpbHMvZ2FzLXVzYWdlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTZWxmIENhbGxzJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvdXNhZ2UtZGV0YWlscy9zZWxmLWNhbGxzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdTREsnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJbnN0YWxsJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvaW5zdGFsbCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU2V0dXAnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9zZXR1cCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnbWFrZVdlYjNQcm92aWRlcicsXG4gICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL21ha2Utd2ViMy1wcm92aWRlcicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVXBncmFkaW5nIGZyb20gMy54JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvdjMtdG8tdjQtY2hhbmdlcycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29pbmJhc2VXYWxsZXRQcm92aWRlcicsXG4gICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdPdmVydmlldycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL292ZXJ2aWV3JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdyZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnT3ZlcnZpZXcnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9vdmVydmlldycsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2FjY291bnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2FjY291bnRzJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfYmxvY2tOdW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfYmxvY2tOdW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9jaGFpbklkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2NoYWluSWQnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9jb2luYmFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9jb2luYmFzZScsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2VzdGltYXRlR2FzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2VzdGltYXRlR2FzJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfZmVlSGlzdG9yeScsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9mZWVIaXN0b3J5JyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfZ2FzUHJpY2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfZ2FzUHJpY2UnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9nZXRCYWxhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2dldEJhbGFuY2UnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9nZXRCbG9ja0J5SGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRCbG9ja0J5SGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldEJsb2NrQnlOdW1iZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfZ2V0QmxvY2tCeU51bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldEJsb2NrVHJhbnNhY3Rpb25Db3VudEJ5SGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeUhhc2gnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeU51bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRCbG9ja1RyYW5zYWN0aW9uQ291bnRCeU51bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldENvZGUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfZ2V0Q29kZScsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldExvZ3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfZ2V0TG9ncycsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldFByb29mJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2dldFByb29mJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfZ2V0U3RvcmFnZUF0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2dldFN0b3JhZ2VBdCcsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldFRyYW5zYWN0aW9uQnlCbG9ja0hhc2hBbmRJbmRleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tIYXNoQW5kSW5kZXgnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tOdW1iZXJBbmRJbmRleCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRUcmFuc2FjdGlvbkJ5QmxvY2tOdW1iZXJBbmRJbmRleCcsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldFRyYW5zYWN0aW9uQnlIYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2dldFRyYW5zYWN0aW9uQnlIYXNoJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfZ2V0VHJhbnNhY3Rpb25Db3VudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRUcmFuc2FjdGlvbkNvdW50JyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfZ2V0VHJhbnNhY3Rpb25SZWNlaXB0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX2dldFRyYW5zYWN0aW9uUmVjZWlwdCcsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX2dldFVuY2xlQ291bnRCeUJsb2NrSGFzaCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRVbmNsZUNvdW50QnlCbG9ja0hhc2gnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9nZXRVbmNsZUNvdW50QnlCbG9ja051bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9nZXRVbmNsZUNvdW50QnlCbG9ja051bWJlcicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX3JlcXVlc3RBY2NvdW50cycsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L2V0aF9yZXF1ZXN0QWNjb3VudHMnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ2V0aF9zZW5kUmF3VHJhbnNhY3Rpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfc2VuZFJhd1RyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdldGhfc2VuZFRyYW5zYWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3QvZXRoX3NlbmRUcmFuc2FjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnZXRoX3NpZ25UeXBlZERhdGFfdjQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvc2RrL2NvaW5iYXNld2FsbGV0cHJvdmlkZXIvcmVxdWVzdC9ldGhfc2lnblR5cGVkRGF0YV92NCcsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZXh0OiAncGVyc29uYWxfc2lnbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L3BlcnNvbmFsX3NpZ24nLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3dhbGxldF9hZGRFdGhlcmV1bUNoYWluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3Qvd2FsbGV0X2FkZEV0aGVyZXVtQ2hhaW4nLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3dhbGxldF9hZGRTdWJBY2NvdW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3Qvd2FsbGV0X2FkZFN1YkFjY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3dhbGxldF9jb25uZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3Qvd2FsbGV0X2Nvbm5lY3QnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3dhbGxldF9zd2l0Y2hFdGhlcmV1bUNoYWluJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3Qvd2FsbGV0X3N3aXRjaEV0aGVyZXVtQ2hhaW4nLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3dhbGxldF93YXRjaEFzc2V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L3Nkay9jb2luYmFzZXdhbGxldHByb3ZpZGVyL3JlcXVlc3Qvd2FsbGV0X3dhdGNoQXNzZXQnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ3dlYjNfY2xpZW50VmVyc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvY29pbmJhc2V3YWxsZXRwcm92aWRlci9yZXF1ZXN0L3dlYjNfY2xpZW50VmVyc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdTdWIgQWNjb3VudCBSZWZlcmVuY2UnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9zZGsvc3ViLWFjY291bnQtcmVmZXJlbmNlJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVHV0b3JpYWxzJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVXBkYXRlIEV4aXN0aW5nIEFwcCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3VwZGF0ZS1leGlzdGluZy1hcHAnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlYWN0IE5hdGl2ZSBJbnRlZ3JhdGlvbicsXG4gICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3JlYWN0LW5hdGl2ZS1pbnRlZ3JhdGlvbicsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU2lnbmluZyBhbmQgVmVyaWZ5aW5nIE1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc2lnbmluZy1hbmQtdmVyaWZ5aW5nLW1lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU2lnbiBJbiBXaXRoIEV0aGVyZXVtJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3Npd2UnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ01hZ2ljU3BlbmQnLCBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvbWFnaWMtc3BlbmQnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQmF0Y2ggVHJhbnNhY3Rpb25zJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvYmF0Y2gtdHJhbnNhY3Rpb25zJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnUGF5bWFzdGVycycsIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9wYXltYXN0ZXJzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdFUkMyMCBQYXltYXN0ZXJzJywgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL2VyYzIwLXBheW1hc3RlcnMnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3ViIEFjY291bnRzJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ092ZXJ2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3N1Yi1hY2NvdW50cy9vdmVydmlldycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU2V0dXAnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3ViLWFjY291bnRzL3NldHVwJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDcmVhdGluZyBTdWIgQWNjb3VudHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2lkZW50aXR5L3NtYXJ0LXdhbGxldC9ndWlkZXMvc3ViLWFjY291bnRzL2NyZWF0aW5nLXN1Yi1hY2NvdW50cycsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVXNpbmcgU3ViIEFjY291bnRzJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3N1Yi1hY2NvdW50cy91c2luZy1zdWItYWNjb3VudHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1NwZW5kIFBlcm1pc3Npb25zJyxcbiAgICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ092ZXJ2aWV3JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL292ZXJ2aWV3JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdRdWlja3N0YXJ0JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL3F1aWNrLXN0YXJ0JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBUEkgUmVmZXJlbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6ICdDbGllbnQgUmVzb3VyY2VzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9hcGktcmVmZXJlbmNlL2NsaWVudC1yZXNvdXJjZXMnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0NvaW5iYXNlIEZldGNoIFBlcm1pc3Npb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpbms6ICcvaWRlbnRpdHkvc21hcnQtd2FsbGV0L2d1aWRlcy9zcGVuZC1wZXJtaXNzaW9ucy9hcGktcmVmZXJlbmNlL2NvaW5iYXNlLWZldGNocGVybWlzc2lvbnMnLFxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1NwZW5kIFBlcm1pc3Npb25zIE1hbmFnZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9zbWFydC13YWxsZXQvZ3VpZGVzL3NwZW5kLXBlcm1pc3Npb25zL2FwaS1yZWZlcmVuY2Uvc3BlbmRwZXJtaXNzaW9ubWFuYWdlcicsXG4gICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdCYXNlbmFtZXMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1R1dG9yaWFscycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0Jhc2VuYW1lcyBXYWdtaSBUdXRvcmlhbCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLXdhZ21pLXR1dG9yaWFsJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdCYXNlbmFtZXMgT25jaGFpbktpdCBUdXRvcmlhbCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLW9uY2hhaW5raXQtdHV0b3JpYWwnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdGQVEgJiBUcm91Ymxlc2hvb3RpbmcnLFxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdCYXNlbmFtZXMgRkFRJywgbGluazogJy9pZGVudGl0eS9iYXNlbmFtZXMvYmFzZW5hbWVzLWZhcScgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdWZXJpZmljYXRpb25zIChDRFApXHUyMTk3JyxcbiAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jcy5jZHAuY29pbmJhc2UuY29tL3ZlcmlmaWNhdGlvbnMvZG9jcy93ZWxjb21lJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdDaGFpbicsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dlbmVyYWwnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgeyB0ZXh0OiAnV2h5IEJhc2U/JywgbGluazogJy9jaGFpbi93aHktYmFzZScgfSxcbiAgICAgICAgICB7IHRleHQ6ICdVc2luZyBCYXNlJywgbGluazogJy9jaGFpbi91c2luZy1iYXNlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RlcGxveSBvbiBCYXNlJywgbGluazogJy9jaGFpbi9kZXBsb3ktb24tYmFzZS1xdWlja3N0YXJ0JyB9LFxuICAgICAgICAgIHsgdGV4dDogJ05ldHdvcmsgSW5mb3JtYXRpb24nLCBsaW5rOiAnL2NoYWluL25ldHdvcmstaW5mb3JtYXRpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnRmVlcycsIGxpbms6ICcvY2hhaW4vZmVlcycgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnRGlmZmVyZW5jZXMgQmV0d2VlbiBFdGhlcmV1bSBhbmQgQmFzZScsXG4gICAgICAgICAgICBsaW5rOiAnL2NoYWluL2RpZmZlcmVuY2VzLWJldHdlZW4tZXRoZXJldW0tYW5kLWJhc2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUnVuIGEgQmFzZSBOb2RlJywgbGluazogJy9jaGFpbi9ydW4tYS1iYXNlLW5vZGUnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQnJpZGdlIGFuIEwxIFRva2VuIHRvIEJhc2UnLCBsaW5rOiAnL2NoYWluL2JyaWRnZS1hbi1sMS10b2tlbi10by1iYXNlJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0FkZGluZyB0b2tlbnMgdG8gQ29pbmJhc2UgV2FsbGV0JywgbGluazogJy9jaGFpbi93YWxsZXQnIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0RlY2VudHJhbGl6aW5nIEJhc2Ugd2l0aCBPcHRpbWlzbVx1MjE5NycsXG4gICAgICAgICAgICBsaW5rOiAnaHR0cHM6Ly9iYXNlLm1pcnJvci54eXovSF9LUHdWMzFNN09KVC1USFVuVTd3WWpPRjE2U3k3YVd2YUVyNWNnSGk4SScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdUb29scycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdPbmNoYWluIFJlZ2lzdHJ5IEFQSScsIGxpbms6ICcvY2hhaW4vcmVnaXN0cnktYXBpJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ05vZGUgUHJvdmlkZXJzJywgbGluazogJy9jaGFpbi9ub2RlLXByb3ZpZGVycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdCbG9jayBFeHBsb3JlcnMnLCBsaW5rOiAnL2NoYWluL2Jsb2NrLWV4cGxvcmVycycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdOZXR3b3JrIEZhdWNldHMnLCBsaW5rOiAnL2NoYWluL25ldHdvcmstZmF1Y2V0cycgfSxcbiAgICAgICAgICB7IHRleHQ6ICdPcmFjbGVzJywgbGluazogJy9jaGFpbi9vcmFjbGVzJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0RhdGEgSW5kZXhlcnMnLCBsaW5rOiAnL2NoYWluL2RhdGEtaW5kZXhlcnMnIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnQ3Jvc3MtY2hhaW4nLCBsaW5rOiAnL2NoYWluL2Nyb3NzLWNoYWluJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ0FjY291bnQgQWJzdHJhY3Rpb24nLCBsaW5rOiAnL2NoYWluL2FjY291bnQtYWJzdHJhY3Rpb24nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnT25yYW1wcycsIGxpbms6ICcvY2hhaW4vb25yYW1wcycgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdTZWN1cml0eScsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdCdWcgQm91bnR5JywgbGluazogJy9jaGFpbi9zZWN1cml0eS9ib3VudHknIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnUmVwb3J0IGEgVnVsbmVyYWJpbGl0eScsIGxpbms6ICcvY2hhaW4vc2VjdXJpdHkvcmVwb3J0JyB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdIb3cgdG8gYXZvaWQgZ2V0dGluZyB5b3VyIGFwcCBmbGFnZ2VkIGFzIG1hbGljaW91cycsXG4gICAgICAgICAgICBsaW5rOiAnL2NoYWluL3NlY3VyaXR5L2FwcC1ibG9ja2xpc3QnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQmFzZSBDb250cmFjdHMnLFxuICAgICAgICBsaW5rOiAnL2NoYWluL2Jhc2UtY29udHJhY3RzJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdVc2UgQ2FzZXMnLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPbmJvYXJkIGFueSB1c2VyJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvb25ib2FyZC1hbnktdXNlcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQWNjZXB0IGNyeXB0byBwYXltZW50cycsXG4gICAgICAgIGxpbms6ICcvdXNlLWNhc2VzL2FjY2VwdC1jcnlwdG8tcGF5bWVudHMnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0xhdW5jaCBBSSBBZ2VudHMnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9sYXVuY2gtYWktYWdlbnRzJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdEZWNlbnRyYWxpemUgeW91ciBzb2NpYWwgYXBwJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvZGVjZW50cmFsaXplLXNvY2lhbC1hcHAnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0RlRmkgeW91ciBhcHAnLFxuICAgICAgICBsaW5rOiAnL3VzZS1jYXNlcy9kZWZpLXlvdXItYXBwJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdHbyBnYXNsZXNzJyxcbiAgICAgICAgbGluazogJy91c2UtY2FzZXMvZ28tZ2FzbGVzcycsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnQ29va2Jvb2snLFxuICAgIGl0ZW1zOiBbXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdCeSB1c2UgY2FzZScsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUGF5bWVudHMgJiBDb21tZXJjZScsXG4gICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0J1aWxkIGFuIEUtY29tbWVyY2UgQXBwJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jb21tZXJjZS9idWlsZC1hbi1lY29tbWVyY2UtYXBwJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdEZXBsb3kgYSBTaG9waWZ5IFN0b3JlZnJvbnQnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NvbW1lcmNlL2RlcGxveS1hLXNob3BpZnktc3RvcmVmcm9udCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1RyYW5zYWN0aW9uIEd1aWRlJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvdHJhbnNhY3Rpb25zJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdORlRzICYgRGlnaXRhbCBBc3NldHMnLFxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdORlQgTWludGluZyB3aXRoIFpvcmEnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2NyZWF0b3IvbmZ0LW1pbnRpbmctd2l0aC16b3JhJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU2ltcGxlIE9uY2hhaW4gTkZUcycsIGxpbms6ICcvY29va2Jvb2svbmZ0cy9zaW1wbGUtb25jaGFpbi1uZnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdEeW5hbWljIE5GVHMnLCBsaW5rOiAnL2Nvb2tib29rL25mdHMvZHluYW1pYy1uZnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdDb21wbGV4IE9uY2hhaW4gTkZUcycsIGxpbms6ICcvY29va2Jvb2svbmZ0cy9jb21wbGV4LW9uY2hhaW4tbmZ0cycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU2lnbmF0dXJlIE1pbnQnLCBsaW5rOiAnL2Nvb2tib29rL25mdHMvc2lnbmF0dXJlLW1pbnQnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGhpcmRXZWIgVW5yZWFsIE5GVCBJdGVtcycsXG4gICAgICAgICAgICAgICAgbGluazogJy9jb29rYm9vay9uZnRzL3RoaXJkd2ViLXVucmVhbC1uZnQtaXRlbXMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdTb2NpYWwnLFxuICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGYXJjYXN0ZXIgTm8tQ29kZSBORlQgTWludGluZycsXG4gICAgICAgICAgICAgICAgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvbm8tY29kZS1taW50aW5nJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGYXJjYXN0ZXIgTkZUIE1pbnRpbmcgR3VpZGUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL25mdC1taW50aW5nJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb252ZXJ0IEZhcmNhc3RlciBGcmFtZSB0byBPcGVuIEZyYW1lJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9jcmVhdG9yL2NvbnZlcnQtZmFyY2FzdGVyLWZyYW1lLXRvLW9wZW4tZnJhbWUnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdEZUZpICYgRmluYW5jaWFsIFRvb2xzJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQWRkIEluLUFwcCBGdW5kaW5nIChPbnJhbXApJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9maW5hbmNlL2J1aWxkLWEtc21hcnQtd2FsbGV0LWZ1bmRpbmctYXBwJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdBY2Nlc3MgUmVhbC1Xb3JsZCBEYXRhIChDaGFpbmxpbmspJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9maW5hbmNlL2FjY2Vzcy1yZWFsLXdvcmxkLWRhdGEtY2hhaW5saW5rJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdBY2Nlc3MgUmVhbC1UaW1lIEFzc2V0IERhdGEgKFB5dGgpJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9maW5hbmNlL2FjY2Vzcy1yZWFsLXRpbWUtYXNzZXQtZGF0YS1weXRoLXByaWNlLWZlZWRzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnR3Jvd3RoICYgRGlzdHJpYnV0aW9uJyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0Nhc3QgQWN0aW9ucycsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2Nhc3QtYWN0aW9ucycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnSHlwZXJmcmFtZXMnLCBsaW5rOiAnL2Nvb2tib29rL3VzZS1jYXNlLWd1aWRlcy9oeXBlcmZyYW1lcycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95IHRvIFZlcmNlbCcsIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2RlcGxveS10by12ZXJjZWwnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnR2F0aW5nIGFuZCBSZWRpcmVjdHMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svdXNlLWNhc2UtZ3VpZGVzL2dhdGluZy1hbmQtcmVkaXJlY3RzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRW1haWwgQ2FtcGFpZ25zJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvY3JlYXRlLWVtYWlsLWNhbXBhaWducycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnUmV0YWluaW5nIFVzZXJzJywgbGluazogJy9jb29rYm9vay91c2UtY2FzZS1ndWlkZXMvcmV0YWluaW5nLXVzZXJzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0J5IHRvb2wnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1NtYXJ0IENvbnRyYWN0IERldmVsb3BtZW50JyxcbiAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSGFyZGhhdCcsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveSB3aXRoIEhhcmRoYXQnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2hhcmRoYXQvZGVwbG95LXdpdGgtaGFyZGhhdCcsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRGVidWdnaW5nIFNtYXJ0IENvbnRyYWN0cycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9kZWJ1Z2dpbmctc21hcnQtY29udHJhY3RzJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdPcHRpbWl6aW5nIEdhcyBVc2FnZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9vcHRpbWl6aW5nLWdhcy11c2FnZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnUmVkdWNpbmcgQ29udHJhY3QgU2l6ZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9yZWR1Y2luZy1jb250cmFjdC1zaXplJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdBbmFseXppbmcgVGVzdCBDb3ZlcmFnZScsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvaGFyZGhhdC9hbmFseXppbmctdGVzdC1jb3ZlcmFnZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnRm91bmRyeScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveSB3aXRoIEZvdW5kcnknLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvZGVwbG95LXdpdGgtZm91bmRyeScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnU2V0dXAgd2l0aCBCYXNlJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9jb29rYm9vay9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9mb3VuZHJ5L3NldHVwLXdpdGgtYmFzZScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnVGVzdGluZyBTbWFydCBDb250cmFjdHMnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L2ZvdW5kcnkvdGVzdGluZy1zbWFydC1jb250cmFjdHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1ZlcmlmeSBDb250cmFjdCB3aXRoIEJhc2VzY2FuJyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9jb29rYm9vay9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC9mb3VuZHJ5L3ZlcmlmeS1jb250cmFjdC13aXRoLWJhc2VzY2FuJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdHZW5lcmF0ZSBSYW5kb20gTnVtYmVycycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvZm91bmRyeS9nZW5lcmF0ZS1yYW5kb20tbnVtYmVycy1jb250cmFjdHMnLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlbWl4JyxcbiAgICAgICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0OiAnRGVwbG95IHdpdGggUmVtaXgnLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3JlbWl4L2RlcGxveS13aXRoLXJlbWl4JyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdUZW5kZXJseScsXG4gICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveSB3aXRoIFRlbmRlcmx5JyxcbiAgICAgICAgICAgICAgICAgICAgbGluazogJy9jb29rYm9vay9zbWFydC1jb250cmFjdC1kZXZlbG9wbWVudC90ZW5kZXJseS9kZXBsb3ktd2l0aC10ZW5kZXJseScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGhpcmRXZWInLFxuICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdEZXBsb3kgd2l0aCBUaGlyZFdlYicsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGhpcmR3ZWIvZGVwbG95LXdpdGgtdGhpcmR3ZWInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ0J1aWxkIHdpdGggVGhpcmRXZWInLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL2J1aWxkLXdpdGgtdGhpcmR3ZWInLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogJ1RoaXJkV2ViIFNESycsXG4gICAgICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svc21hcnQtY29udHJhY3QtZGV2ZWxvcG1lbnQvdGhpcmR3ZWIvdGhpcmR3ZWItc2RrJyxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHRleHQ6ICdUaGlyZFdlYiBDTEknLFxuICAgICAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL3NtYXJ0LWNvbnRyYWN0LWRldmVsb3BtZW50L3RoaXJkd2ViL3RoaXJkd2ViLWNsaScsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0lQRlMnLFxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdEZXBsb3kgd2l0aCBGbGVlaycsIGxpbms6ICcvY29va2Jvb2svaXBmcy9kZXBsb3ktd2l0aC1mbGVlaycgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVG9rZW4gR2F0aW5nJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnR2F0ZSBJUkwgRXZlbnRzIHdpdGggTm91bnMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svdG9rZW4tZ2F0aW5nL2dhdGUtaXJsLWV2ZW50cy13aXRoLW5vdW5zJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ2xpZW50LVNpZGUgRGV2ZWxvcG1lbnQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24gdG8gUHJvdmlkZXJzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL2NsaWVudC1zaWRlLWRldmVsb3BtZW50L2ludHJvZHVjdGlvbi10by1wcm92aWRlcnMnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdBY2NvdW50IEFic3RyYWN0aW9uJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVXNpbmcgQmljb25vbXknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svYWNjb3VudC1hYnN0cmFjdGlvbi9hY2NvdW50LWFic3RyYWN0aW9uLW9uLWJhc2UtdXNpbmctYmljb25vbXknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1VzaW5nIFBhcnRpY2xlIE5ldHdvcmsnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svYWNjb3VudC1hYnN0cmFjdGlvbi9hY2NvdW50LWFic3RyYWN0aW9uLW9uLWJhc2UtdXNpbmctcGFydGljbGUtbmV0d29yaycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVXNpbmcgUHJpdnkgYW5kIEJhc2UgUGF5bWFzdGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL2FjY291bnQtYWJzdHJhY3Rpb24vYWNjb3VudC1hYnN0cmFjdGlvbi1vbi1iYXNlLXVzaW5nLXByaXZ5LWFuZC10aGUtYmFzZS1wYXltYXN0ZXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0dhc2xlc3MgVHJhbnNhY3Rpb25zIHdpdGggUGF5bWFzdGVyJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2Nvb2tib29rL2FjY291bnQtYWJzdHJhY3Rpb24vZ2FzbGVzcy10cmFuc2FjdGlvbnMtd2l0aC1wYXltYXN0ZXInLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDcm9zcy1DaGFpbicsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0JyaWRnZSBUb2tlbnMgd2l0aCBMYXllclplcm8nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvY29va2Jvb2svY3Jvc3MtY2hhaW4vYnJpZGdlLXRva2Vucy13aXRoLWxheWVyemVybycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU2VuZCBNZXNzYWdlcyBhbmQgVG9rZW5zIGZyb20gQmFzZSAoQ2hhaW5saW5rKScsXG4gICAgICAgICAgICAgICAgbGluazogJy9jb29rYm9vay9jcm9zcy1jaGFpbi9zZW5kLW1lc3NhZ2VzLWFuZC10b2tlbnMtZnJvbS1iYXNlLWNoYWlubGluaycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICB0ZXh0OiAnTGVhcm4nLFxuICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICBpdGVtczogW1xuICAgICAge1xuICAgICAgICB0ZXh0OiAnV2VsY29tZScsXG4gICAgICAgIGxpbms6ICcvbGVhcm4vd2VsY29tZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uIHRvIEV0aGVyZXVtJyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRybyB0byBFdGhlcmV1bScsXG4gICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludHJvZHVjdGlvbi10by1ldGhlcmV1bS9pbnRyby10by1ldGhlcmV1bS12aWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0V0aGVyZXVtIERldiBPdmVydmlldycsXG4gICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludHJvZHVjdGlvbi10by1ldGhlcmV1bS9ldGhlcmV1bS1kZXYtb3ZlcnZpZXctdmlkJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdFdGhlcmV1bSBBcHBsaWNhdGlvbnMnLFxuICAgICAgICAgICAgbGluazogJy9sZWFybi9pbnRyb2R1Y3Rpb24tdG8tZXRoZXJldW0vZXRoZXJldW0tYXBwbGljYXRpb25zJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdHYXMgVXNlIGluIEVUSCBUcmFuc2FjdGlvbnMnLFxuICAgICAgICAgICAgbGluazogJy9sZWFybi9pbnRyb2R1Y3Rpb24tdG8tZXRoZXJldW0vZ2FzLXVzZS1pbi1ldGgtdHJhbnNhY3Rpb25zJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHsgdGV4dDogJ0VWTSBEaWFncmFtJywgbGluazogJy9sZWFybi9pbnRyb2R1Y3Rpb24tdG8tZXRoZXJldW0vZXZtLWRpYWdyYW0nIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0d1aWRlIHRvIEJhc2UgXHUyMTk3JyxcbiAgICAgICAgICAgIGxpbms6ICdodHRwczovL3d3dy5jb2luYmFzZS5jb20vY2xvdWQvZGlzY292ZXIvcHJvdG9jb2wtZ3VpZGVzL2d1aWRlLXRvLWJhc2UnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnRGV2ZWxvcG1lbnQgVG9vbHMnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2xlYXJuL2RldmVsb3BtZW50LXRvb2xzL292ZXJ2aWV3JyB9XSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdEZXZlbG9wbWVudCB3aXRoIEhhcmRoYXQnLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0hhcmRoYXQgU2V0dXAgYW5kIE92ZXJ2aWV3JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSGFyZGhhdCBPdmVydmlldycsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9oYXJkaGF0LXNldHVwLW92ZXJ2aWV3L2hhcmRoYXQtb3ZlcnZpZXctdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDcmVhdGluZyBhIFByb2plY3QnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaGFyZGhhdC1zZXR1cC1vdmVydmlldy9jcmVhdGluZy1hLXByb2plY3QtdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTZXR1cCBPdmVydmlldycsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9oYXJkaGF0LXNldHVwLW92ZXJ2aWV3L2hhcmRoYXQtc2V0dXAtb3ZlcnZpZXctc2JzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVGVzdGluZyB3aXRoIFR5cGVzY3JpcHQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVGVzdGluZyBPdmVydmlldycsIGxpbms6ICcvbGVhcm4vaGFyZGhhdC10ZXN0aW5nL3Rlc3Rpbmctb3ZlcnZpZXctdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdXcml0aW5nIFRlc3RzJywgbGluazogJy9sZWFybi9oYXJkaGF0LXRlc3Rpbmcvd3JpdGluZy10ZXN0cy12aWQnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29udHJhY3QgQUJJIGFuZCBUZXN0aW5nJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2hhcmRoYXQtdGVzdGluZy9jb250cmFjdC1hYmktYW5kLXRlc3RpbmctdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVGVzdGluZyBTdGVwIGJ5IFN0ZXAnLCBsaW5rOiAnL2xlYXJuL2hhcmRoYXQtdGVzdGluZy9oYXJkaGF0LXRlc3Rpbmctc2JzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdFdGhlcnNjYW4nLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RlcCBieSBTdGVwIEd1aWRlJywgbGluazogJy9sZWFybi9ldGhlcnNjYW4vZXRoZXJzY2FuLXNicycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVmlkZW8gVHV0b3JpYWwnLCBsaW5rOiAnL2xlYXJuL2V0aGVyc2Nhbi9ldGhlcnNjYW4tdmlkJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdEZXBsb3lpbmcgU21hcnQgQ29udHJhY3RzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSW5zdGFsbGluZyBIYXJkaGF0IERlcGxveScsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9oYXJkaGF0LWRlcGxveS9pbnN0YWxsaW5nLWhhcmRoYXQtZGVwbG95LXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU2V0dXAgRGVwbG95IFNjcmlwdCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9oYXJkaGF0LWRlcGxveS9zZXR1cC1kZXBsb3ktc2NyaXB0LXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGVzdGluZyBEZXBsb3ltZW50JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2hhcmRoYXQtZGVwbG95L3Rlc3Rpbmctb3VyLWRlcGxveW1lbnQtdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdOZXR3b3JrIENvbmZpZ3VyYXRpb24nLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaGFyZGhhdC1kZXBsb3kvdGVzdC1uZXR3b3JrLWNvbmZpZ3VyYXRpb24tdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRGVwbG95bWVudCcsIGxpbms6ICcvbGVhcm4vaGFyZGhhdC1kZXBsb3kvZGVwbG95bWVudC12aWQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1N0ZXAgYnkgU3RlcCBHdWlkZScsIGxpbms6ICcvbGVhcm4vaGFyZGhhdC1kZXBsb3kvaGFyZGhhdC1kZXBsb3ktc2JzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdWZXJpZnlpbmcgU21hcnQgQ29udHJhY3RzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1ZpZGVvIFR1dG9yaWFsJywgbGluazogJy9sZWFybi9oYXJkaGF0LXZlcmlmeS9oYXJkaGF0LXZlcmlmeS12aWQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1N0ZXAgYnkgU3RlcCBHdWlkZScsIGxpbms6ICcvbGVhcm4vaGFyZGhhdC12ZXJpZnkvaGFyZGhhdC12ZXJpZnktc2JzJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdNYWlubmV0IEZvcmtpbmcnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVmlkZW8gVHV0b3JpYWwnLCBsaW5rOiAnL2xlYXJuL2hhcmRoYXQtZm9ya2luZy9tYWlubmV0LWZvcmtpbmctdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2hhcmRoYXQtZm9ya2luZy9oYXJkaGF0LWZvcmtpbmcnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnRGV2ZWxvcG1lbnQgV2l0aCBGb3VuZHJ5JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24gdG8gRm91bmRyeSBcdTIxOTcnLFxuICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jcy5iYXNlLm9yZy90dXRvcmlhbHMvaW50cm8tdG8tZm91bmRyeS1zZXR1cCcsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnVGVzdGluZyBTbWFydCBDb250cmFjdHMgXHUyMTk3JyxcbiAgICAgICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuYmFzZS5vcmcvdHV0b3JpYWxzL2ludHJvLXRvLWZvdW5kcnktdGVzdGluZycsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdTbWFydCBDb250cmFjdCBEZXZlbG9wbWVudCcsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnSW50cm9kdWN0aW9uIHRvIFNvbGlkaXR5JyxcbiAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaW50cm9kdWN0aW9uLXRvLXNvbGlkaXR5L2ludHJvZHVjdGlvbi10by1zb2xpZGl0eS1vdmVydmlldycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQW5hdG9teSBvZiBhIFNtYXJ0IENvbnRyYWN0JyxcbiAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaW50cm9kdWN0aW9uLXRvLXNvbGlkaXR5L2FuYXRvbXktb2YtYS1zbWFydC1jb250cmFjdC12aWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbiB0byBTb2xpZGl0eScsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1ZpZGVvIFR1dG9yaWFsJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludHJvZHVjdGlvbi10by1zb2xpZGl0eS9pbnRyb2R1Y3Rpb24tdG8tc29saWRpdHktdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2xlYXJuL2ludHJvZHVjdGlvbi10by1zb2xpZGl0eS9zb2xpZGl0eS1vdmVydmlldycgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24gdG8gUmVtaXgnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaW50cm9kdWN0aW9uLXRvLXNvbGlkaXR5L2ludHJvZHVjdGlvbi10by1yZW1peC12aWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1JlbWl4IEd1aWRlJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludHJvZHVjdGlvbi10by1zb2xpZGl0eS9pbnRyb2R1Y3Rpb24tdG8tcmVtaXgnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveW1lbnQgaW4gUmVtaXgnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaW50cm9kdWN0aW9uLXRvLXNvbGlkaXR5L2RlcGxveW1lbnQtaW4tcmVtaXgtdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaW50cm9kdWN0aW9uLXRvLXNvbGlkaXR5L2RlcGxveW1lbnQtaW4tcmVtaXgnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdDb250cmFjdHMgYW5kIEJhc2ljIEZ1bmN0aW9ucycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0ludHJvZHVjdGlvbiB0byBDb250cmFjdHMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vY29udHJhY3RzLWFuZC1iYXNpYy1mdW5jdGlvbnMvaW50cm8tdG8tY29udHJhY3RzLXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSGVsbG8gV29ybGQgR3VpZGUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vY29udHJhY3RzLWFuZC1iYXNpYy1mdW5jdGlvbnMvaGVsbG8td29ybGQtc3RlcC1ieS1zdGVwJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQmFzaWMgVHlwZXMnLCBsaW5rOiAnL2xlYXJuL2NvbnRyYWN0cy1hbmQtYmFzaWMtZnVuY3Rpb25zL2Jhc2ljLXR5cGVzJyB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0V4ZXJjaXNlJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2NvbnRyYWN0cy1hbmQtYmFzaWMtZnVuY3Rpb25zL2Jhc2ljLWZ1bmN0aW9ucy1leGVyY2lzZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0RlcGxveWluZyB0byBhIFRlc3RuZXQnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdPdmVydmlldyBvZiBUZXN0IE5ldHdvcmtzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2RlcGxveW1lbnQtdG8tdGVzdG5ldC9vdmVydmlldy1vZi10ZXN0LW5ldHdvcmtzLXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1Rlc3QgTmV0d29ya3MnLCBsaW5rOiAnL2xlYXJuL2RlcGxveW1lbnQtdG8tdGVzdG5ldC90ZXN0LW5ldHdvcmtzJyB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0RlcGxveSB0byBCYXNlIFNlcG9saWEnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vZGVwbG95bWVudC10by10ZXN0bmV0L2RlcGxveW1lbnQtdG8tYmFzZS1zZXBvbGlhLXNicycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29udHJhY3QgVmVyaWZpY2F0aW9uJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2RlcGxveW1lbnQtdG8tdGVzdG5ldC9jb250cmFjdC12ZXJpZmljYXRpb24tc2JzJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdFeGVyY2lzZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9kZXBsb3ltZW50LXRvLXRlc3RuZXQvZGVwbG95bWVudC10by10ZXN0bmV0LWV4ZXJjaXNlJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29udHJvbCBTdHJ1Y3R1cmVzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3RhbmRhcmQgQ29udHJvbCBTdHJ1Y3R1cmVzJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2NvbnRyb2wtc3RydWN0dXJlcy9zdGFuZGFyZC1jb250cm9sLXN0cnVjdHVyZXMtdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTG9vcHMnLCBsaW5rOiAnL2xlYXJuL2NvbnRyb2wtc3RydWN0dXJlcy9sb29wcy12aWQnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnUmVxdWlyZSwgUmV2ZXJ0LCBFcnJvcicsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9jb250cm9sLXN0cnVjdHVyZXMvcmVxdWlyZS1yZXZlcnQtZXJyb3ItdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcnLCBsaW5rOiAnL2xlYXJuL2NvbnRyb2wtc3RydWN0dXJlcy9jb250cm9sLXN0cnVjdHVyZXMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9jb250cm9sLXN0cnVjdHVyZXMvY29udHJvbC1zdHJ1Y3R1cmVzLWV4ZXJjaXNlJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdTdG9yYWdlIGluIFNvbGlkaXR5JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1NpbXBsZSBTdG9yYWdlJywgbGluazogJy9sZWFybi9zdG9yYWdlL3NpbXBsZS1zdG9yYWdlLXZpZGVvJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL3N0b3JhZ2Uvc2ltcGxlLXN0b3JhZ2Utc2JzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdIb3cgU3RvcmFnZSBXb3JrcycsIGxpbms6ICcvbGVhcm4vc3RvcmFnZS9ob3ctc3RvcmFnZS13b3Jrcy12aWRlbycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RvcmFnZSBPdmVydmlldycsIGxpbms6ICcvbGVhcm4vc3RvcmFnZS9ob3ctc3RvcmFnZS13b3JrcycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRXhlcmNpc2UnLCBsaW5rOiAnL2xlYXJuL3N0b3JhZ2Uvc3RvcmFnZS1leGVyY2lzZScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQXJyYXlzIGluIFNvbGlkaXR5JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0FycmF5cyBPdmVydmlldycsIGxpbms6ICcvbGVhcm4vYXJyYXlzL2FycmF5cy1pbi1zb2xpZGl0eS12aWQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1dyaXRpbmcgQXJyYXlzJywgbGluazogJy9sZWFybi9hcnJheXMvd3JpdGluZy1hcnJheXMtaW4tc29saWRpdHktdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdBcnJheXMgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2FycmF5cy9hcnJheXMtaW4tc29saWRpdHknIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0ZpbHRlcmluZyBBcnJheXMnLCBsaW5rOiAnL2xlYXJuL2FycmF5cy9maWx0ZXJpbmctYW4tYXJyYXktc2JzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdGaXhlZCBTaXplIEFycmF5cycsIGxpbms6ICcvbGVhcm4vYXJyYXlzL2ZpeGVkLXNpemUtYXJyYXlzLXZpZCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQXJyYXkgU3RvcmFnZSBMYXlvdXQnLCBsaW5rOiAnL2xlYXJuL2FycmF5cy9hcnJheS1zdG9yYWdlLWxheW91dC12aWQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9hcnJheXMvYXJyYXlzLWV4ZXJjaXNlJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdUaGUgTWFwcGluZyBUeXBlJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ01hcHBpbmdzIE92ZXJ2aWV3JywgbGluazogJy9sZWFybi9tYXBwaW5ncy9tYXBwaW5ncy12aWQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1VzaW5nIG1zZy5zZW5kZXInLCBsaW5rOiAnL2xlYXJuL21hcHBpbmdzL3VzaW5nLW1zZy1zZW5kZXItdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL21hcHBpbmdzL21hcHBpbmdzLXNicycgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdIb3cgTWFwcGluZ3MgYXJlIFN0b3JlZCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9tYXBwaW5ncy9ob3ctbWFwcGluZ3MtYXJlLXN0b3JlZC12aWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdFeGVyY2lzZScsIGxpbms6ICcvbGVhcm4vbWFwcGluZ3MvbWFwcGluZ3MtZXhlcmNpc2UnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0FkdmFuY2VkIEZ1bmN0aW9ucycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0Z1bmN0aW9uIFZpc2liaWxpdHknLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vYWR2YW5jZWQtZnVuY3Rpb25zL2Z1bmN0aW9uLXZpc2liaWxpdHktdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdWaXNpYmlsaXR5IE92ZXJ2aWV3JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2FkdmFuY2VkLWZ1bmN0aW9ucy9mdW5jdGlvbi12aXNpYmlsaXR5JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdGdW5jdGlvbiBNb2RpZmllcnMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vYWR2YW5jZWQtZnVuY3Rpb25zL2Z1bmN0aW9uLW1vZGlmaWVycy12aWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdNb2RpZmllcnMgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2FkdmFuY2VkLWZ1bmN0aW9ucy9mdW5jdGlvbi1tb2RpZmllcnMnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1N0cnVjdHMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RydWN0cyBPdmVydmlldycsIGxpbms6ICcvbGVhcm4vc3RydWN0cy9zdHJ1Y3RzLXZpZCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RlcCBieSBTdGVwIEd1aWRlJywgbGluazogJy9sZWFybi9zdHJ1Y3RzL3N0cnVjdHMtc2JzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdFeGVyY2lzZScsIGxpbms6ICcvbGVhcm4vc3RydWN0cy9zdHJ1Y3RzLWV4ZXJjaXNlJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbmhlcml0YW5jZScsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdJbmhlcml0YW5jZSBPdmVydmlldycsIGxpbms6ICcvbGVhcm4vaW5oZXJpdGFuY2UvaW5oZXJpdGFuY2UtdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2luaGVyaXRhbmNlL2luaGVyaXRhbmNlLXNicycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTXVsdGlwbGUgSW5oZXJpdGFuY2UnLCBsaW5rOiAnL2xlYXJuL2luaGVyaXRhbmNlL211bHRpcGxlLWluaGVyaXRhbmNlLXZpZCcgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdNdWx0aXBsZSBJbmhlcml0YW5jZSBHdWlkZScsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9pbmhlcml0YW5jZS9tdWx0aXBsZS1pbmhlcml0YW5jZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0Fic3RyYWN0IENvbnRyYWN0cycsIGxpbms6ICcvbGVhcm4vaW5oZXJpdGFuY2UvYWJzdHJhY3QtY29udHJhY3RzLXZpZCcgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdBYnN0cmFjdCBDb250cmFjdHMgR3VpZGUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vaW5oZXJpdGFuY2UvYWJzdHJhY3QtY29udHJhY3RzLXNicycsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9pbmhlcml0YW5jZS9pbmhlcml0YW5jZS1leGVyY2lzZScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnSW1wb3J0cycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdJbXBvcnRzIE92ZXJ2aWV3JywgbGluazogJy9sZWFybi9pbXBvcnRzL2ltcG9ydHMtdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2ltcG9ydHMvaW1wb3J0cy1zYnMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9pbXBvcnRzL2ltcG9ydHMtZXhlcmNpc2UnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0Vycm9ycycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdFcnJvciBUcmlhZ2UnLCBsaW5rOiAnL2xlYXJuL2Vycm9yLXRyaWFnZS9lcnJvci10cmlhZ2UtdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdFcnJvciBHdWlkZScsIGxpbms6ICcvbGVhcm4vZXJyb3ItdHJpYWdlL2Vycm9yLXRyaWFnZScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRXhlcmNpc2UnLCBsaW5rOiAnL2xlYXJuL2Vycm9yLXRyaWFnZS9lcnJvci10cmlhZ2UtZXhlcmNpc2UnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1RoZSBuZXcgS2V5d29yZCcsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ0NyZWF0aW5nIE5ldyBDb250cmFjdHMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vbmV3LWtleXdvcmQvY3JlYXRpbmctYS1uZXctY29udHJhY3QtdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnU3RlcCBieSBTdGVwIEd1aWRlJywgbGluazogJy9sZWFybi9uZXcta2V5d29yZC9uZXcta2V5d29yZC1zYnMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9uZXcta2V5d29yZC9uZXcta2V5d29yZC1leGVyY2lzZScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnQ29udHJhY3QgdG8gQ29udHJhY3QgSW50ZXJhY3Rpb25zJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0ludHJvIHRvIEludGVyZmFjZXMnLCBsaW5rOiAnL2xlYXJuL2ludGVyZmFjZXMvaW50cm8tdG8taW50ZXJmYWNlcy12aWQnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ2FsbGluZyBBbm90aGVyIENvbnRyYWN0JyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludGVyZmFjZXMvY2FsbGluZy1hbm90aGVyLWNvbnRyYWN0LXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnVGVzdGluZyB0aGUgSW50ZXJmYWNlJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludGVyZmFjZXMvdGVzdGluZy10aGUtaW50ZXJmYWNlLXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnU3RlcCBieSBTdGVwIEd1aWRlJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludGVyZmFjZXMvY29udHJhY3QtdG8tY29udHJhY3QtaW50ZXJhY3Rpb24nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdFdmVudHMnLFxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2V2ZW50cy9oYXJkaGF0LWV2ZW50cy1zYnMnIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0FkZHJlc3MgYW5kIFBheWFibGUnLFxuICAgICAgICAgICAgaXRlbXM6IFt7IHRleHQ6ICdHdWlkZScsIGxpbms6ICcvbGVhcm4vYWRkcmVzcy1hbmQtcGF5YWJsZS9hZGRyZXNzLWFuZC1wYXlhYmxlJyB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1Rva2VuIERldmVsb3BtZW50JyxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdJbnRyb2R1Y3Rpb24gdG8gVG9rZW5zJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1Rva2VucyBPdmVydmlldycsIGxpbms6ICcvbGVhcm4vaW50cm8tdG8tdG9rZW5zL2ludHJvLXRvLXRva2Vucy12aWQnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ29tbW9uIE1pc2NvbmNlcHRpb25zJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL2ludHJvLXRvLXRva2Vucy9taXNjb25jZXB0aW9ucy1hYm91dC10b2tlbnMtdmlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnT3ZlcnZpZXcgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2ludHJvLXRvLXRva2Vucy90b2tlbnMtb3ZlcnZpZXcnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ01pbmltYWwgVG9rZW5zJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnQ3JlYXRpbmcgYSBNaW5pbWFsIFRva2VuJyxcbiAgICAgICAgICAgICAgICBsaW5rOiAnL2xlYXJuL21pbmltYWwtdG9rZW5zL2NyZWF0aW5nLWEtbWluaW1hbC10b2tlbi12aWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ1RyYW5zZmVycmluZyBUb2tlbnMnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vbWluaW1hbC10b2tlbnMvdHJhbnNmZXJyaW5nLWEtbWluaW1hbC10b2tlbi12aWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL21pbmltYWwtdG9rZW5zL21pbmltYWwtdG9rZW4tc2JzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdFeGVyY2lzZScsIGxpbms6ICcvbGVhcm4vbWluaW1hbC10b2tlbnMvbWluaW1hbC10b2tlbnMtZXhlcmNpc2UnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0VSQy0yMCBUb2tlbnMnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnQW5hbHl6aW5nIEVSQy0yMCcsIGxpbms6ICcvbGVhcm4vZXJjLTIwLXRva2VuL2FuYWx5emluZy1lcmMtMjAtdmlkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdFUkMtMjAgU3RhbmRhcmQnLCBsaW5rOiAnL2xlYXJuL2VyYy0yMC10b2tlbi9lcmMtMjAtc3RhbmRhcmQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ09wZW5aZXBwZWxpbiBFUkMtMjAnLCBsaW5rOiAnL2xlYXJuL2VyYy0yMC10b2tlbi9vcGVuemVwcGVsaW4tZXJjLTIwLXZpZCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnVGVzdGluZyBFUkMtMjAnLCBsaW5rOiAnL2xlYXJuL2VyYy0yMC10b2tlbi9lcmMtMjAtdGVzdGluZy12aWQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1N0ZXAgYnkgU3RlcCBHdWlkZScsIGxpbms6ICcvbGVhcm4vZXJjLTIwLXRva2VuL2VyYy0yMC10b2tlbi1zYnMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9lcmMtMjAtdG9rZW4vZXJjLTIwLWV4ZXJjaXNlJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdFUkMtNzIxIFRva2VucycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICB7IHRleHQ6ICdFUkMtNzIxIFN0YW5kYXJkJywgbGluazogJy9sZWFybi9lcmMtNzIxLXRva2VuL2VyYy03MjEtc3RhbmRhcmQtdmlkZW8nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1N0YW5kYXJkIE92ZXJ2aWV3JywgbGluazogJy9sZWFybi9lcmMtNzIxLXRva2VuL2VyYy03MjEtc3RhbmRhcmQnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ09wZW5TZWEgSW50ZWdyYXRpb24nLCBsaW5rOiAnL2xlYXJuL2VyYy03MjEtdG9rZW4vZXJjLTcyMS1vbi1vcGVuc2VhLXZpZCcgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdPcGVuWmVwcGVsaW4gRVJDLTcyMScsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9lcmMtNzIxLXRva2VuL29wZW56ZXBwZWxpbi1lcmMtNzIxLXZpZCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAnSW1wbGVtZW50YXRpb24gR3VpZGUnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vZXJjLTcyMS10b2tlbi9pbXBsZW1lbnRpbmctYW4tZXJjLTcyMS12aWQnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdTdGVwIGJ5IFN0ZXAgR3VpZGUnLCBsaW5rOiAnL2xlYXJuL2VyYy03MjEtdG9rZW4vZXJjLTcyMS1zYnMnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0V4ZXJjaXNlJywgbGluazogJy9sZWFybi9lcmMtNzIxLXRva2VuL2VyYy03MjEtZXhlcmNpc2UnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnSGFyZGhhdCBUb29scyBhbmQgVGVzdGluZycsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvbGVhcm4vaGFyZGhhdC10b29scy1hbmQtdGVzdGluZy9vdmVydmlldycgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUHJvZmlsaW5nIEdhcyBcdTIxOTcnLFxuICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jcy5iYXNlLm9yZy90dXRvcmlhbHMvaGFyZGhhdC1wcm9maWxpbmctZ2FzJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6ICdQcm9maWxpbmcgU2l6ZSBcdTIxOTcnLFxuICAgICAgICAgICAgbGluazogJ2h0dHBzOi8vZG9jcy5iYXNlLm9yZy90dXRvcmlhbHMvaGFyZGhhdC1wcm9maWxpbmctc2l6ZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7IHRleHQ6ICdEZWJ1Z2dpbmcgXHUyMTk3JywgbGluazogJ2h0dHBzOi8vZG9jcy5iYXNlLm9yZy90dXRvcmlhbHMvaGFyZGhhdC1kZWJ1Z2dpbmcnIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1Rlc3QgQ292ZXJhZ2UgXHUyMTk3JyxcbiAgICAgICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuYmFzZS5vcmcvdHV0b3JpYWxzL2hhcmRoYXQtdGVzdC1jb3ZlcmFnZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdPbmNoYWluIEFwcCBEZXZlbG9wbWVudCcsXG4gICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICB7IHRleHQ6ICdPdmVydmlldycsIGxpbms6ICcvbGVhcm4vZnJvbnRlbmQtc2V0dXAvb3ZlcnZpZXcnIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0Zyb250ZW5kIFNldHVwJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1dhbGxldCBDb25uZWN0b3JzJywgbGluazogJy9sZWFybi9mcm9udGVuZC1zZXR1cC93YWxsZXQtY29ubmVjdG9ycycgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdCdWlsZGluZyBhbiBPbmNoYWluIEFwcCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9mcm9udGVuZC1zZXR1cC9idWlsZGluZy1hbi1vbmNoYWluLWFwcCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ0Nvbm5lY3RpbmcgdG8gdGhlIEJsb2NrY2hhaW4gXHUyMTk3JyxcbiAgICAgICAgICAgIGxpbms6ICdodHRwczovL2RvY3MuYmFzZS5vcmcvdHV0b3JpYWxzL2ludHJvLXRvLXByb3ZpZGVycycsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0ZXh0OiAnUmVhZGluZyBhbmQgRGlzcGxheWluZyBEYXRhJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ3VzZUFjY291bnQnLCBsaW5rOiAnL2xlYXJuL3JlYWRpbmctYW5kLWRpc3BsYXlpbmctZGF0YS91c2VBY2NvdW50JyB9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdGV4dDogJ3VzZVJlYWRDb250cmFjdCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi9yZWFkaW5nLWFuZC1kaXNwbGF5aW5nLWRhdGEvdXNlUmVhZENvbnRyYWN0JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHRleHQ6ICdDb25maWd1cmluZyB1c2VSZWFkQ29udHJhY3QnLFxuICAgICAgICAgICAgICAgIGxpbms6ICcvbGVhcm4vcmVhZGluZy1hbmQtZGlzcGxheWluZy1kYXRhL2NvbmZpZ3VyaW5nLXVzZVJlYWRDb250cmFjdCcsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgdGV4dDogJ1dyaXRpbmcgdG8gQ29udHJhY3RzJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ3VzZVdyaXRlQ29udHJhY3QnLCBsaW5rOiAnL2xlYXJuL3dyaXRpbmctdG8tY29udHJhY3RzL3VzZVdyaXRlQ29udHJhY3QnIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0ZXh0OiAndXNlU2ltdWxhdGVDb250cmFjdCcsXG4gICAgICAgICAgICAgICAgbGluazogJy9sZWFybi93cml0aW5nLXRvLWNvbnRyYWN0cy91c2VTaW11bGF0ZUNvbnRyYWN0JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRleHQ6ICdFeGVyY2lzZSBDb250cmFjdHMnLFxuICAgICAgICBsaW5rOiAnL2xlYXJuL2V4ZXJjaXNlLWNvbnRyYWN0cycsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnR2V0IGhlbHBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9kaXNjb3JkLmNvbS9pbnZpdGUvYnVpbGRvbmJhc2UnLFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgdGV4dDogJ0J1aWxkYXRob25zJyxcbiAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgaXRlbXM6IFt7IHRleHQ6ICcyMDI1LTAyLWZsYXNoJywgbGluazogJy9idWlsZGF0aG9ucy8yMDI1LTAyLWZsYXNoJyB9XSxcbiAgfSxcbiAge1xuICAgIHRleHQ6ICdGZWVkYmFjaycsXG4gICAgaXRlbXM6IFtcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ0dldCBoZWxwIFx1MjE5NycsXG4gICAgICAgIGxpbms6ICdodHRwczovL2Rpc2NvcmQuY29tL2ludml0ZS9idWlsZG9uYmFzZScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0ZXh0OiAnQnVnIGJvdW50eSBcdTIxOTcnLFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly9oYWNrZXJvbmUuY29tL2NvaW5iYXNlJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUEsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxVQUFVO0FBQ2pCLE9BQU8sWUFBWTtBQUNuQixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVOzs7QUNDVixJQUFNLFVBQW1CO0FBQUEsRUFDOUI7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxFQUNSO0FBQUEsRUFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxJQUNFLE1BQU07QUFBQSxJQUNO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QUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sT0FBTztBQUFBLGtCQUNMO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGtCQUNBO0FBQUEsb0JBQ0UsTUFBTTtBQUFBLG9CQUNOLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLGNBQ0E7QUFBQSxnQkFDRSxNQUFNO0FBQUEsZ0JBQ04sTUFBTTtBQUFBLGNBQ1I7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE1BQU07QUFBQSxjQUNSO0FBQUEsY0FDQTtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixNQUFNO0FBQUEsY0FDUjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsVUFDQTtBQUFBLFlBQ0UsTUFBTTtBQUFBLFlBQ04sV0FBVztBQUFBLFlBQ1gsT0FBTztBQUFBLGNBQ0w7QUFBQSxnQkFDRSxNQUFN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c0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFBTTtBQUFBLHNCQUNSO0FBQUEsc0JBQ0E7QUFBQSx3QkFDRSxNQUFNO0FBQUEsd0JBQ04sTUFB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QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxrQkFDQTtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0Y7QUFBQSxjQUNBO0FBQUEsZ0JBQ0UsTUFBTTtBQUFBLGdCQUNOLE9BQU87QUFBQSxrQkFDTDtBQUFBLG9CQUNFLE1BQU07QUFBQSxvQkFDTixNQUFNO0FBQUEsa0JBQ1I7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
