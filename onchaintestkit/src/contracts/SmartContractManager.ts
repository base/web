import * as fs from "fs"
import * as path from "path"
import {
  http,
  Abi,
  Address,
  Hex,
  concat,
  createPublicClient,
  createWalletClient,
  defineChain,
  encodeDeployData,
  getContractAddress,
} from "viem"
import type { PublicClient, WalletClient } from "viem"
import { privateKeyToAccount } from "viem/accounts"

import type { LocalNodeManager } from "../node/LocalNodeManager"
import { ProxyDeployer } from "./ProxyDeployer"
import type {
  ContractArtifact,
  ContractCall,
  ContractDeployment,
  SetupConfig,
} from "./types"

/**
 * SmartContractManager handles deploying contracts using CREATE2 and executing contract calls
 * using viem instead of ethers for improved performance and reliability.
 */
export class SmartContractManager {
  private projectRoot: string
  private publicClient?: PublicClient
  private walletClient?: WalletClient
  private deployedContracts = new Map<Address, Abi>() // Store deployed contract ABIs
  private proxyDeployer?: ProxyDeployer
  private chain?: ReturnType<typeof defineChain>

  constructor(projectRoot: string) {
    this.projectRoot = projectRoot
  }

  /**
   * Initialize the manager by setting up viem clients
   */
  async initialize(node: LocalNodeManager): Promise<void> {
    const rpcUrl = node.rpcUrl

    // Create a custom chain configuration based on the node's chain ID
    const nodeChainId = await this.getChainId(rpcUrl)
    this.chain = defineChain({
      id: nodeChainId,
      network: "localhost",
      name: "Local Test Network",
      nativeCurrency: {
        decimals: 18,
        name: "Ether",
        symbol: "ETH",
      },
      rpcUrls: {
        default: { http: [rpcUrl] },
        public: { http: [rpcUrl] },
      },
    })

    this.publicClient = createPublicClient({
      chain: this.chain,
      transport: http(rpcUrl),
    })

    // Use the first account from Anvil (the default test account)
    // default mnemonic: test test test test test test test test test test test junk
    const account = privateKeyToAccount(
      "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    )

    this.walletClient = createWalletClient({
      account,
      chain: this.chain,
      transport: http(rpcUrl),
    })

    // Initialize proxy deployer
    this.proxyDeployer = new ProxyDeployer(node)
    await this.proxyDeployer.ensureProxyDeployed()
  }

  /**
   * Get the chain ID from the RPC endpoint
   */
  private async getChainId(rpcUrl: string): Promise<number> {
    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        method: "eth_chainId",
        params: [],
        id: 1,
      }),
    })
    const data = await response.json()
    return parseInt(data.result, 16)
  }

  /**
   * Deploy a contract using CREATE2 for deterministic addresses
   */
  async deployContract(deployment: ContractDeployment): Promise<Address> {
    if (!this.walletClient || !this.publicClient || !this.proxyDeployer) {
      throw new Error(
        "SmartContractManager not initialized. Call initialize() first.",
      )
    }

    const artifact = this.loadArtifact(deployment.name)

    // Predict the deployment address
    const predictedAddress = this.predictContractAddress(
      deployment.salt,
      artifact.bytecode,
      deployment.args as readonly unknown[],
    )

    // Check if contract is already deployed
    const existingCode = await this.publicClient.getBytecode({
      address: predictedAddress,
    })
    if (existingCode && existingCode !== "0x") {
      console.log(
        `Contract ${deployment.name} already deployed at ${predictedAddress}`,
      )
      this.deployedContracts.set(predictedAddress, artifact.abi as Abi)
      return predictedAddress
    }

    // Encode deployment data
    const deploymentData = encodeDeployData({
      abi: artifact.abi,
      bytecode: artifact.bytecode as Hex,
      args: deployment.args,
    })

    // Prepare CREATE2 transaction data
    const proxyAddress = this.proxyDeployer.getProxyAddress()
    const create2Data = concat([deployment.salt as Hex, deploymentData])

    // Deploy the contract
    if (!this.walletClient.account) {
      throw new Error("Wallet client account not configured")
    }

    const hash = await this.walletClient.sendTransaction({
      to: proxyAddress,
      data: create2Data,
      account: this.walletClient.account,
      chain: this.chain,
    })

    // Wait for deployment
    await this.publicClient.waitForTransactionReceipt({ hash })

    // Store the ABI for later use
    this.deployedContracts.set(predictedAddress, artifact.abi as Abi)

    console.log(`Deployed ${deployment.name} to ${predictedAddress}`)
    return predictedAddress
  }

  /**
   * Execute a contract function call
   */
  async executeCall(call: ContractCall): Promise<Hex> {
    if (!this.walletClient || !this.publicClient) {
      throw new Error(
        "SmartContractManager not initialized. Call initialize() first.",
      )
    }

    // Get the ABI for the contract
    const abi = this.deployedContracts.get(call.target)
    if (!abi) {
      throw new Error(
        `ABI not found for contract at ${call.target}. Deploy the contract first or provide the ABI.`,
      )
    }

    // Execute the call
    if (!this.walletClient.account) {
      throw new Error("Wallet client account not configured")
    }

    const hash = await this.walletClient.writeContract({
      address: call.target,
      abi,
      functionName: call.functionName,
      args: call.args,
      account: this.walletClient.account,
      chain: this.chain,
      ...(call.value !== undefined && { value: call.value }),
    })

    console.log(`Executed ${call.functionName} on ${call.target}, tx: ${hash}`)
    return hash
  }

  /**
   * Set the complete contract state (deploy contracts and execute calls)
   */
  async setContractState(
    config: SetupConfig,
    node: LocalNodeManager,
  ): Promise<void> {
    if (!this.walletClient || !this.publicClient) {
      await this.initialize(node)
    }

    this.validateConfig(config)

    // Deploy contracts first
    if (config.deployments) {
      for (const deployment of config.deployments) {
        await this.deployContract(deployment)
      }
    }

    // Then execute calls
    if (config.calls) {
      for (const call of config.calls) {
        await this.executeCall(call)
      }
    }
  }

  /**
   * Predict the address where a contract will be deployed using CREATE2
   */
  private predictContractAddress(
    salt: Hex,
    bytecode: Hex,
    args: readonly unknown[],
  ): Address {
    if (!this.proxyDeployer) {
      throw new Error("ProxyDeployer not initialized")
    }

    const deploymentData = encodeDeployData({
      abi: [], // We don't need ABI for address prediction
      bytecode,
      args,
    })

    return getContractAddress({
      opcode: "CREATE2",
      from: this.proxyDeployer.getProxyAddress(),
      salt,
      bytecode: deploymentData,
    })
  }

  /**
   * Load contract artifact from the compiled contracts
   */
  private loadArtifact(contractName: string): ContractArtifact {
    const artifactPath = path.join(
      this.projectRoot,
      "out",
      `${contractName}.sol`,
      `${contractName}.json`,
    )

    if (!fs.existsSync(artifactPath)) {
      throw new Error(
        `Artifact not found: ${artifactPath}. Make sure to compile contracts with 'forge build'.`,
      )
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"))
    return {
      abi: artifact.abi,
      bytecode: artifact.bytecode.object,
    }
  }

  /**
   * Validate the setup configuration
   */
  private validateConfig(config: SetupConfig): void {
    if (!config.deployments && !config.calls) {
      throw new Error("Setup config must contain at least deployments or calls")
    }

    if (config.deployments) {
      for (const deployment of config.deployments) {
        if (!deployment.name || !deployment.salt || !deployment.deployer) {
          throw new Error("Each deployment must have name, salt, and deployer")
        }
      }
    }

    if (config.calls) {
      for (const call of config.calls) {
        if (!call.target || !call.functionName || !call.account) {
          throw new Error(
            "Each call must have target, functionName, and account",
          )
        }
      }
    }
  }
}
