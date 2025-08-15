/**
 * Configuration options for LocalNodeManager
 */
export type NodeConfig = {
  /** Port number for RPC server */
  port?: number
  /** Port range for automatic port selection */
  portRange?: [number, number]
  /** Chain ID for the network */
  chainId?: number
  /** Mnemonic for the network */
  mnemonic?: string

  // Fork settings
  /** URL to fork from (e.g. mainnet) */
  forkUrl?: string
  /** Block number to fork from */
  forkBlockNumber?: bigint
  /** Retry interval for fork requests */
  forkRetryInterval?: number

  // Account settings
  /** Default balance for test accounts */
  defaultBalance?: bigint
  /** Number of test accounts to generate */
  totalAccounts?: number

  // Block settings
  /** Time between blocks (0 for instant) */
  blockTime?: number
  /** Gas limit per block */
  blockGasLimit?: bigint

  // Advanced options
  /** Disable automatic mining */
  noMining?: boolean
  /** Specific hardfork to use */
  hardfork?: "london" | "berlin" | "cancun"
}
