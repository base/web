import type { CoinbaseWallet } from "./Coinbase"
import type { MetaMask } from "./MetaMask"

export type NetworkConfig = {
  name: string
  chainId: number
  rpcUrl: string
  symbol: string
  blockExplorerUrl?: string
}

export type BaseWalletConfig = {
  network?: NetworkConfig
  walletSetup: (wallet: MetaMask | CoinbaseWallet) => Promise<void>
}

export type MetaMaskConfig = {
  password: string
  walletSetup: (
    wallet: MetaMask,
    context: { localNodePort: number },
  ) => Promise<void>
} & BaseWalletConfig

export type CoinbaseConfig = {
  password: string
  walletSetup: (
    wallet: CoinbaseWallet,
    context: { localNodePort: number },
  ) => Promise<void>
} & BaseWalletConfig

export type WalletSetupFn<T extends MetaMask | CoinbaseWallet> = (
  wallet: T,
) => Promise<void>
