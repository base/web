import { NodeConfig } from "./node/types"
import { WalletFixtureOptions } from "./types"
import {
  BaseActionType,
  BaseWalletConfig,
  WalletSetupContext,
} from "./wallets/BaseWallet"
import { CoinbaseSpecificActionType, CoinbaseWallet } from "./wallets/Coinbase"
import { MetaMask, MetaMaskSpecificActionType } from "./wallets/MetaMask"
/**
 * Configuration builder for E2E testing with different wallet types.
 * Provides a fluent interface for configuring wallet behavior and setup.
 *
 * @example Basic Usage
 * ```typescript
 * const test = createOnchainTest(
 *   configure()
 *     .withLocalNode({ chainId: 1337 })
 *     .withMetaMask()
 *     .withNetwork({
 *       name: 'Base Sepolia',
 *       rpcUrl: 'https://sepolia.base.org',
 *       chainId: 84532,
 *       symbol: 'ETH',
 *     })
 *     .build()
 * );
 * ```
 *
 * @example Complete Setup
 * ```typescript
 * const test = createOnchainTest(
 *   configure()
 *     .withLocalNode({ chainId: 1337 })
 *     .withMetaMask()
 *     .withNetwork({
 *       name: 'Base Sepolia',
 *       rpcUrl: 'https://sepolia.base.org',
 *       chainId: 84532,
 *       symbol: 'ETH',
 *     })
 *     .withSeedPhrase({
 *       seedPhrase: 'your seed phrase',
 *       password: 'your password',
 *     })
 *     .withCustomSetup(async (wallet) => {
 *       await wallet.importToken('0x...');
 *     })
 *     .build()
 * );
 * ```
 */
import { NetworkConfig } from "./wallets/types"

type WalletType = MetaMask | CoinbaseWallet

/**
 * Helper function to determine if a network is a testnet
 * @param network - Network configuration
 * @returns boolean indicating if the network is a testnet
 */
function isTestNetwork(network: NetworkConfig): boolean {
  return (
    network.name.toLowerCase().includes("test") ||
    network.name.toLowerCase().includes("sepolia") ||
    network.name.toLowerCase().includes("goerli")
  )
}

/**
 * Base configuration builder that handles common wallet setup
 */
abstract class BaseWalletBuilder<T extends WalletType> {
  protected nodeConfig?: NodeConfig

  protected config: Partial<BaseWalletConfig>

  constructor(config: Partial<BaseWalletConfig>) {
    this.config = config
  }

  /**
   * Helper method to chain multiple setup functions together.
   * Ensures setup functions are executed in the order they were added.
   */
  protected chainSetup(
    newSetup: (wallet: T, context: WalletSetupContext) => Promise<void>,
  ): void {
    const existingSetup = this.config.walletSetup
    this.config.walletSetup = async (wallet: WalletType, context) => {
      if (existingSetup) {
        await existingSetup(wallet, context)
      }
      await newSetup(wallet as T, context)
    }
  }

  /**
   * Configure wallet with a seed phrase and optional password
   * @param seedPhrase - The wallet's seed phrase
   * @param password - Optional password for the wallet
   */
  withSeedPhrase({
    seedPhrase,
    password,
  }: { seedPhrase: string; password?: string }) {
    this.config.password = password
    this.chainSetup(async wallet => {
      await wallet.handleAction(BaseActionType.IMPORT_WALLET_FROM_SEED, {
        seedPhrase,
        password,
      })
    })
    return this
  }

  /**
   * Add custom setup steps to the wallet configuration
   * @param setupFn - Custom function to perform additional wallet setup
   */
  withCustomSetup(setupFn: (wallet: T) => Promise<void>) {
    this.chainSetup(setupFn)
    return this
  }

  setNodeConfig(config?: NodeConfig) {
    this.nodeConfig = config
  }

  /**
   * Build the final wallet configuration
   * @returns WalletFixtureOptions ready to be used with createOnchainTest
   */
  build(): WalletFixtureOptions {
    if (!this.config.type) {
      throw new Error("Wallet type must be specified")
    }

    const wallets = {
      [this.config.type]: this.config,
    }

    return { wallets, nodeConfig: this.nodeConfig } as WalletFixtureOptions
  }
}

/**
 * MetaMask-specific configuration builder
 * Extends base builder with MetaMask-specific functionality
 */
class MetaMaskConfigBuilder extends BaseWalletBuilder<MetaMask> {
  // Add MetaMask-specific methods here
  // add network and switch to it
  withNetwork(network: NetworkConfig) {
    this.chainSetup(async (wallet, context) => {
      if (context?.localNodePort) {
        // if the context has a localNodePort, use it to connect to the local node
        network.rpcUrl = `http://localhost:${context.localNodePort}`
      }
      console.log(`Adding network with RPC URL: ${network.rpcUrl}`)

      // Add the network with the possibly modified URL
      await wallet.handleAction(MetaMaskSpecificActionType.ADD_NETWORK, {
        network,
        isTestnet: isTestNetwork(network),
      })

      // Switch to the network
      await wallet.handleAction(BaseActionType.SWITCH_NETWORK, {
        networkName: network.name,
        isTestnet: isTestNetwork(network),
      })
    })
    return this
  }
}

/**
 * Coinbase-specific configuration builder
 * Extends base builder with Coinbase-specific functionality
 */
class CoinbaseConfigBuilder extends BaseWalletBuilder<CoinbaseWallet> {
  // Add Coinbase-specific methods here
  withNetwork(network: NetworkConfig) {
    this.chainSetup(async (wallet, context) => {
      if (context?.localNodePort) {
        // if the context has a localNodePort, use it to connect to the local node
        network.rpcUrl = `http://localhost:${context.localNodePort}`
      }
      console.log(`Adding network with RPC URL: ${network.rpcUrl}`)

      // Add the network with the possibly modified URL
      await wallet.handleAction(CoinbaseSpecificActionType.ADD_NETWORK, {
        network,
        isTestnet: isTestNetwork(network),
      })
    })
    return this
  }
}

/**
 * Main configuration builder that initializes wallet-specific builders
 */
export class ConfigBuilder {
  private config: Partial<BaseWalletConfig> = {}

  private nodeConfig?: NodeConfig

  /**
   * Initialize MetaMask configuration
   * @returns MetaMask-specific builder
   */
  withMetaMask() {
    this.config = { type: "metamask" }
    const builder = new MetaMaskConfigBuilder(this.config)
    if (this.nodeConfig) {
      builder.setNodeConfig(this.nodeConfig)
    }
    return builder
  }

  /**
   * Initialize Coinbase configuration
   * @returns Coinbase-specific builder
   */
  withCoinbase() {
    this.config = { type: "coinbase" }
    const builder = new CoinbaseConfigBuilder(this.config)
    if (this.nodeConfig) {
      builder.setNodeConfig(this.nodeConfig)
    }
    return builder
  }

  /**
   * Configure the local Anvil node
   * @param config - Node configuration options
   * @returns This builder for chaining
   */
  withLocalNode(config: NodeConfig = {}) {
    this.nodeConfig = config
    return this
  }

  /**
   * Build the final configuration
   * @returns Configuration object ready to be used with createOnchainTest
   */
  build(): { options: WalletFixtureOptions } {
    if (!this.config.type) {
      throw new Error("Wallet type must be specified")
    }

    const wallets = {
      [this.config.type]: this.config,
    }

    return {
      options: { wallets } as WalletFixtureOptions,
    }
  }
}

/**
 * Creates a new configuration builder
 * @returns ConfigBuilder instance
 */
export function configure() {
  return new ConfigBuilder()
}
