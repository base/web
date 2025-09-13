import { ChildProcess, spawn } from "child_process"
import * as net from "net"
import { ethers } from "ethers"
import { NodeConfig } from "./types"

/**
 * LocalNodeManager provides a comprehensive interface for managing a local Anvil Ethereum node.
 * It handles node lifecycle, state management, and provides methods for manipulating blockchain state.
 *
 * Features:
 * - Node lifecycle management (start/stop)
 * - Chain state manipulation (snapshots, revert, reset)
 * - Time control (time travel, block mining)
 * - Account management (balance setting, impersonation)
 * - Network configuration (gas prices, chain ID)
 * - Automatic port allocation for parallel test execution
 *
 * @example
 * ```typescript
 * const node = new LocalNodeManager({
 *   chainId: 1337,
 *   forkUrl: process.env.MAINNET_RPC_URL
 * });
 *
 * await node.start();
 * const snapshot = await node.snapshot();
 * // Run tests...
 * await node.revert(snapshot);
 * await node.stop();
 * ```
 */
export class LocalNodeManager {
  private process: ChildProcess | null = null

  private provider: ethers.providers.JsonRpcProvider | null = null

  private config: NodeConfig

  private allocatedPort: number | null = null

  // Using a much larger port range to minimize allocation conflicts
  private static DEFAULT_PORT_RANGE: [number, number] = [10000, 20000]

  // Maximum retries for port allocation
  private static MAX_PORT_ALLOCATION_RETRIES = 5

  /**
   * Creates a new LocalNodeManager instance with the specified configuration
   * @param config - Node configuration options
   */
  constructor(config: NodeConfig = {}) {
    this.config = {
      // default to base sepolia
      chainId: 84532,
      blockTime: 0,
      // Use port range if specified, otherwise use default range
      portRange: config.portRange ?? LocalNodeManager.DEFAULT_PORT_RANGE,
      ...config,
    }
  }

  /**
   * Checks if a port is available for use
   * @param port - The port to check
   * @returns Promise that resolves to true if port is available, false otherwise
   * @private
   */
  private async isPortAvailable(port: number): Promise<boolean> {
    // Store the result for logging purposes if needed
    let result = false

    return new Promise(resolve => {
      const server = net.createServer()

      // Handle connection errors (likely port in use)
      server.once("error", err => {
        const e = err as NodeJS.ErrnoException
        if (e.code === "EADDRINUSE") {
          server.close()
          result = false
          resolve(result)
        }
      })

      // Handle successful binding (port is available)
      server.once("listening", () => {
        server.close()
        result = true
        resolve(result)
      })

      // Try to bind to the port
      server.listen(port, "127.0.0.1")
    })
  }

  /**
   * Finds an available port within the configured range
   * @returns Promise that resolves to an available port number
   * @private
   */
  private async findAvailablePort(): Promise<number> {
    // If a specific port was requested, check if it's available
    if (this.config.port) {
      const isAvailable = await this.isPortAvailable(this.config.port)
      if (isAvailable) {
        return this.config.port
      }
      console.warn(
        `Port ${this.config.port} is already in use. Will try to find another port.`,
      )
    }

    // Find an available port in the range
    const [minPort, maxPort] =
      this.config.portRange ?? LocalNodeManager.DEFAULT_PORT_RANGE
    const range = maxPort - minPort + 1

    // With a large range, we can simply try random ports until we find an available one
    // Try up to 20 times to find an available port (should be plenty with a large range)
    const maxAttempts = 20
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      const randomPort = minPort + Math.floor(Math.random() * range)
      const isAvailable = await this.isPortAvailable(randomPort)
      if (isAvailable) {
        return randomPort
      }
      console.log(`Port ${randomPort} is already in use. Trying another port.`)
    }

    throw new Error(
      `No available ports found in range ${minPort}-${maxPort} after ${maxAttempts} attempts`,
    )
  }

  /**
   * Starts the Anvil node with the configured options
   * @throws Error if node is already running or no available ports
   */
  async start(): Promise<void> {
    if (this.process) {
      throw new Error("Node is already running")
    }

    let retries = 0
    let started = false

    while (!started && retries < LocalNodeManager.MAX_PORT_ALLOCATION_RETRIES) {
      try {
        // Allocate port before starting the node
        this.allocatedPort = await this.findAvailablePort()

        const args = this.buildAnvilArgs()

        this.process = spawn("anvil", args, {
          stdio: ["ignore", "pipe", "pipe"],
        })

        // Handle process errors
        this.process.on("error", error => {
          console.error(`[Anvil:${this.allocatedPort}] process error:`, error)
          this.cleanup()
        })

        // Add debug listeners
        this.process.stdout?.on("data", (data: Buffer) => {
          console.log(
            `[Anvil:${this.allocatedPort}] stdout: ${data.toString().trim()}`,
          )
        })

        this.process.stderr?.on("data", (data: Buffer) => {
          console.error(
            `[Anvil:${this.allocatedPort}] stderr: ${data.toString().trim()}`,
          )
        })

        // Handle process exit
        this.process.on("exit", code => {
          if (code !== 0) {
            console.error(
              `[Anvil:${this.allocatedPort}] process exited with code ${code}`,
            )
          }
          this.cleanup()
        })

        // Wait for node to be ready
        await this.waitForNodeReady()

        // Initialize provider
        this.provider = new ethers.providers.JsonRpcProvider(
          `http://localhost:${this.allocatedPort}`,
        )

        started = true
      } catch (error) {
        retries++
        console.warn(
          `Failed to start Anvil node (attempt ${retries}/${LocalNodeManager.MAX_PORT_ALLOCATION_RETRIES}):`,
          error,
        )

        // Clean up if the node process was created but failed to start properly
        this.cleanup()

        // Wait before retrying to avoid race conditions
        if (retries < LocalNodeManager.MAX_PORT_ALLOCATION_RETRIES) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }
    }

    if (!started) {
      throw new Error(
        `Failed to start Anvil node after ${LocalNodeManager.MAX_PORT_ALLOCATION_RETRIES} attempts`,
      )
    }
  }

  /**
   * Stops the running Anvil node and cleans up resources
   */
  async stop(): Promise<void> {
    this.cleanup()
  }

  /**
   * Internal cleanup method to ensure proper resource cleanup
   * @private
   */
  private cleanup(): void {
    if (this.process) {
      this.process.kill()
      this.process = null
    }
    this.provider = null
    this.allocatedPort = null
  }

  /**
   * Get the allocated port for this node instance
   * @returns Port number or null if node is not started
   */
  getPort(): number | null {
    return this.allocatedPort
  }

  /**
   * Port getter for easier access
   * @returns The allocated port number or -1 if not started
   */
  get port(): number {
    return this.allocatedPort ?? -1
  }

  get rpcUrl(): string {
    return `http://localhost:${this.allocatedPort}`
  }

  // Chain State Management

  /**
   * Takes a snapshot of the current chain state
   * @returns Snapshot ID that can be used with revert()
   */
  async snapshot(): Promise<string> {
    return this.send("anvil_snapshot", []) as Promise<string>
  }

  /**
   * Reverts the chain state to a previous snapshot
   * @param snapshotId - ID returned from snapshot()
   */
  async revert(snapshotId: string): Promise<void> {
    await this.send("anvil_revert", [snapshotId])
  }

  /**
   * Resets the chain state to initial state or specified fork block
   * @param forkBlock - Optional block number to reset to when in fork mode
   */
  async reset(forkBlock?: bigint): Promise<void> {
    await this.send(
      "anvil_reset",
      forkBlock
        ? [{ forking: { blockNumber: `0x${forkBlock.toString(16)}` } }]
        : [],
    )
  }

  // Block Management

  /**
   * Mines a specified number of blocks
   * @param blocks - Number of blocks to mine (default: 1)
   */
  async mine(blocks = 1): Promise<void> {
    await this.send("anvil_mine", [blocks])
  }

  /**
   * Enables or disables automatic block mining
   * @param enabled - Whether to enable auto-mining
   */
  async setAutomine(enabled: boolean): Promise<void> {
    await this.send("anvil_setAutomine", [enabled])
  }

  // Time Management

  /**
   * Sets the timestamp for the next block
   * @param timestamp - Unix timestamp in seconds
   */
  async setNextBlockTimestamp(timestamp: number): Promise<void> {
    await this.send("anvil_setNextBlockTimestamp", [timestamp])
  }

  /**
   * Increases chain time by specified seconds
   * @param seconds - Number of seconds to move forward
   */
  async increaseTime(seconds: number): Promise<void> {
    await this.send("anvil_increaseTime", [seconds])
  }

  /**
   * Sets absolute chain time
   * @param timestamp - Unix timestamp in seconds
   */
  async setTime(timestamp: number): Promise<void> {
    await this.send("anvil_setTime", [timestamp])
  }

  // Account Management

  /**
   * Gets list of available accounts
   * @returns Array of account addresses
   */
  async getAccounts(): Promise<string[]> {
    return this.send("eth_accounts", []) as Promise<string[]>
  }

  /**
   * Sets balance for specified address
   * @param address - Account address
   * @param balance - New balance in wei
   */
  async setBalance(address: string, balance: bigint): Promise<void> {
    await this.send("anvil_setBalance", [address, `0x${balance.toString(16)}`])
  }

  /**
   * Sets nonce for specified address
   * @param address - Account address
   * @param nonce - New nonce value
   */
  async setNonce(address: string, nonce: number): Promise<void> {
    await this.send("anvil_setNonce", [address, nonce])
  }

  /**
   * Sets contract code at specified address
   * @param address - Contract address
   * @param code - Contract bytecode
   */
  async setCode(address: string, code: string): Promise<void> {
    await this.send("anvil_setCode", [address, code])
  }

  // Contract State Management

  /**
   * Sets storage value at specified slot
   * @param address - Contract address
   * @param slot - Storage slot
   * @param value - New value
   */
  async setStorageAt(
    address: string,
    slot: string,
    value: string,
  ): Promise<void> {
    await this.send("anvil_setStorageAt", [address, slot, value])
  }

  // Fee Management

  /**
   * Sets base fee for next block (EIP-1559)
   * @param fee - Base fee in wei
   */
  async setNextBlockBaseFeePerGas(fee: bigint): Promise<void> {
    await this.send("anvil_setNextBlockBaseFeePerGas", [
      `0x${fee.toString(16)}`,
    ])
  }

  /**
   * Sets minimum gas price
   * @param price - Min gas price in wei
   */
  async setMinGasPrice(price: bigint): Promise<void> {
    await this.send("anvil_setMinGasPrice", [`0x${price.toString(16)}`])
  }

  // Chain Management

  /**
   * Sets chain ID
   * @param chainId - New chain ID
   */
  async setChainId(chainId: number): Promise<void> {
    await this.send("anvil_setChainId", [chainId])
  }

  // Impersonation

  /**
   * Enables impersonation of specified account
   * @param address - Address to impersonate
   */
  async impersonateAccount(address: string): Promise<void> {
    await this.send("anvil_impersonateAccount", [address])
  }

  /**
   * Disables impersonation of specified account
   * @param address - Address to stop impersonating
   */
  async stopImpersonatingAccount(address: string): Promise<void> {
    await this.send("anvil_stopImpersonatingAccount", [address])
  }

  /**
   * Builds command line arguments for Anvil based on configuration
   * @returns Array of command line arguments
   * @private
   */
  private buildAnvilArgs(): string[] {
    const args: string[] = []

    // Use allocated port instead of config.port
    if (this.allocatedPort) args.push("--port", this.allocatedPort.toString())
    if (this.config.chainId)
      args.push("--chain-id", this.config.chainId.toString())
    if (this.config.blockTime)
      args.push("--block-time", this.config.blockTime.toString())
    if (this.config.forkUrl) args.push("--fork-url", this.config.forkUrl)
    if (this.config.forkBlockNumber)
      args.push("--fork-block-number", this.config.forkBlockNumber.toString())
    if (this.config.noMining) args.push("--no-mining")
    if (this.config.hardfork) args.push("--hardfork", this.config.hardfork)
    if (this.config.mnemonic) args.push("--mnemonic", this.config.mnemonic)

    return args
  }

  /**
   * Waits for Anvil node to be ready to accept connections
   * @returns Promise that resolves when node is ready
   * @private
   */
  private async waitForNodeReady(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.process) {
        reject(new Error("Node process not started"))
        return
      }

      const timeout = setTimeout(() => {
        reject(new Error("Timeout waiting for node to start"))
      }, 30000)

      // We already have listeners for stdout/stderr in start(),
      // so we're only setting up a variable to track if we've seen the ready message
      let isReady = false

      const checkReadyMessage = (data: Buffer) => {
        if (data.toString().includes("Listening on") && !isReady) {
          isReady = true
          clearTimeout(timeout)
          resolve()
        }
      }

      // Add one-time listener for the ready message
      this.process.stdout?.on("data", checkReadyMessage)
    })
  }

  /**
   * Sends JSON-RPC request to Anvil node
   * @param method - RPC method name
   * @param params - RPC method parameters
   * @returns Promise that resolves with RPC response
   * @private
   */
  private async send(method: string, params: unknown[]): Promise<unknown> {
    if (!this.provider) {
      throw new Error("Node not started")
    }

    // BigInts must be converted to hex strings for Anvil's RPC methods
    return this.provider.send(method, params)
  }
}
