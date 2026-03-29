import { baseSepolia } from "wagmi/chains"
import { configure } from "../../../../src/configBuilder"

export const DEFAULT_PASSWORD = "COMPLEXPASSWORD1"
export const DEFAULT_SEED_PHRASE = process.env.E2E_TEST_SEED_PHRASE

// Configure the test with Coinbase setup
const baseConfig = configure()
  .withLocalNode({
    chainId: baseSepolia.id,
    forkUrl: process.env.E2E_TEST_FORK_URL,
    forkBlockNumber: BigInt(process.env.E2E_TEST_FORK_BLOCK_NUMBER ?? "0"),
    hardfork: "cancun",
  })
  .withCoinbase()
  .withSeedPhrase({
    seedPhrase: DEFAULT_SEED_PHRASE ?? "",
    password: DEFAULT_PASSWORD,
  })
  // Add the network with the actual port in a custom setup
  .withNetwork({
    name: "Base Sepolia",
    chainId: baseSepolia.id,
    symbol: "ETH",
    // placeholder for the actual rpcUrl, which is auto injected by the node fixture
    rpcUrl: "http://localhost:8545",
  })

// Build the config
const config = baseConfig.build()

export const coinbaseWalletConfig = config
