import { SmartContractManager } from "./contracts/SmartContractManager"
import { LocalNodeManager } from "./node/LocalNodeManager"
import { NodeConfig } from "./node/types"
import { CoinbaseWallet } from "./wallets/Coinbase"
// import {
//   CoinbaseSmartWallet,
//   SmartWalletConfig,
// } from "./wallets/Coinbase/SmartWallet"
import { MetaMask } from "./wallets/MetaMask"
import { CoinbaseConfig, MetaMaskConfig } from "./wallets/types"

export type SupportedWallet = "metamask" | "coinbase"

export type WalletConfig = MetaMaskConfig | CoinbaseConfig

export type WalletFixtureOptions = {
  wallets: {
    metamask?: WalletConfig
    coinbase?: WalletConfig
    // "coinbase-smart"?: SmartWalletConfig
  }
  nodeConfig?: NodeConfig
}

export type OnchainFixtures = {
  metamask?: MetaMask
  coinbase?: CoinbaseWallet
  // coinbaseSmart?: CoinbaseSmartWallet
  node?: LocalNodeManager
  smartContractManager?: SmartContractManager
}
