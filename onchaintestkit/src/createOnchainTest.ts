import { test as base } from "@playwright/test"
import { mergeTests } from "@playwright/test"
import { setupRpcPortInterceptor } from "./node/NetworkInterceptor"
import { OnchainFixtures, WalletFixtureOptions } from "./types"
import { CoinbaseFixturesBuilder } from "./wallets/Coinbase"
import { MetaMaskFixturesBuilder } from "./wallets/MetaMask"
import { CoinbaseConfig, MetaMaskConfig } from "./wallets/types"

/**
 * Map of wallet names to their corresponding fixture builders.
 * Each builder creates test fixtures specific to that wallet type.
 */
const fixtureBuilderMap = {
  metamask: MetaMaskFixturesBuilder,
  coinbase: CoinbaseFixturesBuilder,
} as const

/**
 * Creates network interceptor fixture that redirects localhost:8545 requests
 * to the actual dynamic port of the local node
 *
 * Note that this is necessary to enable parallel execution because all the anvil nodes cannot
 * be started on the same port.
 */
const createNetworkInterceptorFixture = () => {
  return base.extend<OnchainFixtures>({
    context: async ({ context, node }, use) => {
      // Get the dynamic port from the node fixture
      const localNodePort =
        node && "port" in node ? (node as { port: number }).port : null

      if (localNodePort) {
        // Apply interception at the context level so it works for all pages
        await setupRpcPortInterceptor(context, localNodePort)
      } else {
        console.warn(
          "Local node port not available. RPC URL interception not set up.",
        )
      }

      await use(context)
    },
  })
}

/**
 * Creates a Playwright test instance with wallet-specific fixtures based on provided options.
 *
 * This function enables testing with different web3 wallets (MetaMask, Coinbase) by:
 * 1. Taking wallet configuration options
 * 2. Creating appropriate test fixtures for each enabled wallet
 * 3. Combining multiple wallet fixtures if needed
 * 4. Automatically including network interception when a local node is configured
 *
 * @param config - Configuration object from the config builder
 * @param config.options - Wallet configuration options
 * @param config.skipNodeFixture - When true, doesn't create a node fixture (useful when nodes are created in wallet fixtures)
 * @returns A Playwright test instance extended with wallet-specific fixtures
 * @throws Error if no wallet fixtures are found in the options
 *
 * @example
 * ```typescript
 * import { metamaskWalletConfig } from './walletConfig/metamaskWalletConfig';
 * import { createOnchainTest, configure } from './onchainTestKit';
 *
 * const test = createOnchainTest(
 *   configure()
 *     .withLocalNode({ chainId: 1337 })
 *     .withMetaMask()
 *     .withNetwork({
 *       name: 'Base Sepolia',
 *       chainId: baseSepolia.id,
 *       symbol: 'ETH',
 *       rpcUrl: 'http://localhost:8545',
 *     })
 *     .build()
 * );
 *
 * test('connect wallet and swap', async ({ page, metamask, node }) => {
 *   await metamask.handleAction(BaseActionType.CONNECT_TO_DAPP);
 * });
 * ```
 */
export function createOnchainTest(
  options: WalletFixtureOptions,
): ReturnType<typeof base.extend<OnchainFixtures>> {
  if (!options.wallets) {
    throw new Error("Wallet configuration is required")
  }

  const walletBuilders = {
    metamask: (walletConfig: MetaMaskConfig) =>
      fixtureBuilderMap.metamask(walletConfig, options.nodeConfig),
    coinbase: (walletConfig: CoinbaseConfig) =>
      fixtureBuilderMap.coinbase(walletConfig, options.nodeConfig),
  }

  // Start with the base test - no node fixture from createOnchainTest
  // Node fixture is now created in the wallet fixtures
  const baseTest = base

  // Create wallet fixtures array
  const walletFixtures: ReturnType<typeof base.extend<OnchainFixtures>>[] = []

  // Add wallet fixtures
  Object.entries(options.wallets).forEach(([walletName, walletConfig]) => {
    if (!walletConfig) return

    if (walletName === "metamask") {
      walletFixtures.push(
        walletBuilders.metamask(walletConfig as MetaMaskConfig),
      )
    } else if (walletName === "coinbase") {
      walletFixtures.push(
        walletBuilders.coinbase(walletConfig as CoinbaseConfig),
      )
    }
  })

  if (!walletFixtures.length) {
    throw new Error("No fixtures found")
  }

  // Merge wallet fixtures into the base test
  let test = walletFixtures.reduce(
    (acc, fixture) => mergeTests(acc, fixture),
    baseTest,
  )

  // If a local node is configured, add the network interceptor fixture
  if (options.nodeConfig) {
    console.log(
      "Local node config detected, adding network interception fixture",
    )
    const networkInterceptorFixture = createNetworkInterceptorFixture()
    test = mergeTests(test, networkInterceptorFixture)
  }

  return test
}
