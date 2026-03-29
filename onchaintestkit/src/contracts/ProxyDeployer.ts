import { http, Address, PublicClient, createPublicClient } from "viem"
import { localhost } from "viem/chains"
import type { LocalNodeManager } from "../node/LocalNodeManager"

/**
 * The deterministic deployment proxy bytecode and deployment transaction
 * Source: https://github.com/Arachnid/deterministic-deployment-proxy
 */
const PROXY_DEPLOYMENT_TX =
  "0xf8a58085174876e800830186a08080b853604580600e600039806000f350fe7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf31ba02222222222222222222222222222222222222222222222222222222222222222a02222222222222222222222222222222222222222222222222222222222222222"
const PROXY_ADDRESS: Address = "0x4e59b44847b379578588920ca78fbf26c0b4956c"

/**
 * Utility class to deploy and manage the deterministic deployment proxy
 */
export class ProxyDeployer {
  private publicClient: PublicClient
  private rpcUrl: string

  constructor(node: LocalNodeManager) {
    this.rpcUrl = node.rpcUrl
    this.publicClient = createPublicClient({
      chain: localhost,
      transport: http(this.rpcUrl),
    })
  }

  /**
   * Check if the deterministic deployment proxy is already deployed
   */
  async isProxyDeployed(): Promise<boolean> {
    try {
      const code = await this.publicClient.getBytecode({
        address: PROXY_ADDRESS,
      })
      return code !== undefined && code !== "0x"
    } catch {
      return false
    }
  }

  /**
   * Deploy the deterministic deployment proxy if it's not already deployed
   */
  async ensureProxyDeployed(): Promise<void> {
    if (await this.isProxyDeployed()) {
      console.log(
        "Deterministic deployment proxy already deployed at:",
        PROXY_ADDRESS,
      )
      return
    }

    try {
      // Send the raw deployment transaction
      const hash = await this.publicClient.request({
        method: "eth_sendRawTransaction",
        params: [PROXY_DEPLOYMENT_TX],
      })

      console.log("Deploying deterministic deployment proxy, tx hash:", hash)

      // Wait for the transaction to be mined
      await this.publicClient.waitForTransactionReceipt({ hash })

      console.log("Deterministic deployment proxy deployed at:", PROXY_ADDRESS)
    } catch (error) {
      throw new Error(
        `Failed to deploy deterministic deployment proxy: ${error}`,
      )
    }
  }

  /**
   * Get the proxy address
   */
  getProxyAddress(): Address {
    return PROXY_ADDRESS
  }
}
