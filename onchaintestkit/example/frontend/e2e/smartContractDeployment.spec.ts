import { expect } from "@playwright/test"
import { http, createPublicClient } from "viem"
import type { Address, Hex } from "viem"
import { localhost } from "viem/chains"
import { createOnchainTest } from "../../../src/createOnchainTest"
import { BaseActionType } from "../../../src/wallets/BaseWallet"
import { metamaskWalletConfig } from "./walletConfig/metamaskWalletConfig"

const test = createOnchainTest(metamaskWalletConfig)

test.describe("Smart Contract Deployment with CREATE2", () => {
  let tokenAddress: Address

  // Test accounts
  const deployer = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266" as Address // Anvil's first account

  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto("/")
  })

  test("should deploy SimpleToken contract using CREATE2", async ({
    page,
    smartContractManager,
    node,
  }) => {
    if (!smartContractManager || !node) {
      throw new Error("SmartContractManager or node not initialized")
    }

    // Deploy the SimpleToken contract
    const salt =
      "0x0000000000000000000000000000000000000000000000000000000000000001" as Hex

    tokenAddress = await smartContractManager?.deployContract({
      name: "SimpleToken",
      args: [],
      salt,
      deployer,
    })

    // Verify the contract was deployed
    expect(tokenAddress).toBeDefined()
    expect(tokenAddress).toMatch(/^0x[a-fA-F0-9]{40}$/)

    // Create a public client to verify the deployment
    const publicClient = createPublicClient({
      chain: localhost,
      transport: http(`http://localhost:${node?.port}`),
    })

    // Check the contract code exists
    const code = await publicClient.getBytecode({ address: tokenAddress })
    expect(code).toBeDefined()
    expect(code).not.toBe("0x")

    // Log deployment info
    console.log(`SimpleToken deployed at: ${tokenAddress}`)
  })

  test("should deploy at deterministic address with same salt", async ({
    page,
    smartContractManager,
    node,
  }) => {
    if (!smartContractManager || !node) {
      throw new Error("SmartContractManager or node not initialized")
    }

    const salt =
      "0x0000000000000000000000000000000000000000000000000000000000000002" as Hex

    // Take a snapshot before deployment
    const snapshotId = await node?.snapshot()

    // Deploy first time
    const firstAddress = await smartContractManager?.deployContract({
      name: "SimpleToken",
      args: [],
      salt,
      deployer,
    })

    // Revert to snapshot to simulate a fresh chain
    await node?.revert(snapshotId)

    // Deploy again with same salt
    const secondAddress = await smartContractManager?.deployContract({
      name: "SimpleToken",
      args: [],
      salt,
      deployer,
    })

    // Addresses should be the same due to CREATE2
    expect(firstAddress).toBe(secondAddress)
  })

  test("should interact with deployed contract", async ({
    page,
    smartContractManager,
    node,
  }) => {
    if (!smartContractManager || !node) {
      throw new Error("SmartContractManager or node not initialized")
    }

    // Deploy the contract
    const salt =
      "0x0000000000000000000000000000000000000000000000000000000000000003" as Hex

    tokenAddress = await smartContractManager?.deployContract({
      name: "SimpleToken",
      args: [],
      salt,
      deployer,
    })

    // Create a public client to interact with the contract
    const publicClient = createPublicClient({
      chain: localhost,
      transport: http(`http://localhost:${node?.port}`),
    })

    // Check the owner of the contract
    const owner = (await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "owner",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "address" }],
        },
      ],
      functionName: "owner",
    })) as Address

    console.log(`Contract owner: ${owner}`)

    // Check the owner's balance (should have 10% of max supply from constructor)
    const ownerBalance = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "balanceOf",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "account", type: "address" }],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "balanceOf",
      args: [owner],
    })

    expect(ownerBalance).toBe(BigInt("100000000000000000000000")) // 100k tokens (10% of 1M)

    // Check the total supply
    const totalSupply = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "totalSupply",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "totalSupply",
    })

    expect(totalSupply).toBe(BigInt("100000000000000000000000")) // 100k tokens initially minted

    // Verify contract metadata
    const name = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "name",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "string" }],
        },
      ],
      functionName: "name",
    })

    expect(name).toBe("Simple Token")

    const symbol = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "symbol",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "string" }],
        },
      ],
      functionName: "symbol",
    })

    expect(symbol).toBe("STK")
  })

  test("should perform batch operations", async ({
    page,
    smartContractManager,
    node,
  }) => {
    if (!smartContractManager || !node) {
      throw new Error("SmartContractManager or node not initialized")
    }

    // Deploy multiple contracts and execute multiple calls
    await smartContractManager.setContractState(
      {
        deployments: [
          {
            name: "SimpleToken",
            args: [],
            salt: "0x0000000000000000000000000000000000000000000000000000000000000004" as Hex,
            deployer,
          },
        ],
        calls: [],
      },
      node,
    )

    // Get the deployed contract address
    const publicClient = createPublicClient({
      chain: localhost,
      transport: http(`http://localhost:${node.port}`),
    })

    // Verify deployment by checking for events or code
    const logs = await publicClient.getLogs({
      fromBlock: "latest",
      toBlock: "latest",
    })

    expect(logs.length).toBeGreaterThan(0)
  })

  test("should handle contract with constructor arguments", async ({
    page,
    smartContractManager,
    node,
  }) => {
    if (!smartContractManager || !node) {
      throw new Error("SmartContractManager or node not initialized")
    }

    // Note: SimpleToken doesn't have constructor args, but this shows the pattern
    const salt =
      "0x0000000000000000000000000000000000000000000000000000000000000005" as Hex

    tokenAddress = await smartContractManager.deployContract({
      name: "SimpleToken",
      args: [], // Would pass constructor args here if the contract had them
      salt,
      deployer,
    })

    // Verify deployment
    const publicClient = createPublicClient({
      chain: localhost,
      transport: http(`http://localhost:${node.port}`),
    })

    const code = await publicClient.getBytecode({ address: tokenAddress })
    expect(code).toBeDefined()
    expect(code).not.toBe("0x")
  })

  test("should connect wallet and interact with deployed contract", async ({
    page,
    metamask,
    smartContractManager,
    node,
  }) => {
    if (!metamask) {
      throw new Error("MetaMask is not defined")
    }

    // Deploy contract first
    const salt =
      "0x0000000000000000000000000000000000000000000000000000000000000006" as Hex

    tokenAddress = await smartContractManager.deployContract({
      name: "SimpleToken",
      args: [],
      salt,
      deployer,
    })

    // Connect wallet to the app
    await page.getByTestId("ockConnectButton").first().click()
    await page
      .getByTestId("ockModalOverlay")
      .first()
      .getByRole("button", { name: "MetaMask" })
      .click()

    // Handle MetaMask connection
    await metamask.handleAction(BaseActionType.CONNECT_TO_DAPP)

    // Verify wallet is connected
    await page.waitForSelector("text=/0x[a-fA-F0-9]{4}.*[a-fA-F0-9]{4}/", {
      timeout: 10000,
    })

    // Now the user could interact with the deployed contract through the UI
    console.log(`User can now interact with token at: ${tokenAddress}`)
  })

  test("should test contract state persistence across snapshots", async ({
    page,
    smartContractManager,
    node,
  }) => {
    if (!smartContractManager || !node) {
      throw new Error("SmartContractManager or node not initialized")
    }

    // Deploy contract
    const salt =
      "0x0000000000000000000000000000000000000000000000000000000000000007" as Hex

    tokenAddress = await smartContractManager.deployContract({
      name: "SimpleToken",
      args: [],
      salt,
      deployer,
    })

    // Instead of minting (which requires owner), let's test transfers
    // First get the owner address
    const publicClient = createPublicClient({
      chain: localhost,
      transport: http(`http://localhost:${node?.port}`),
    })

    const owner = (await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "owner",
          type: "function",
          stateMutability: "view",
          inputs: [],
          outputs: [{ name: "", type: "address" }],
        },
      ],
      functionName: "owner",
    })) as Address

    // Take a snapshot
    const snapshotId = await node?.snapshot()

    // Transfer tokens from owner to recipient
    // Note: We can't directly transfer from the proxy owner, so let's just verify state persistence
    const initialOwnerBalance = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "balanceOf",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "account", type: "address" }],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "balanceOf",
      args: [owner],
    })

    // Check the initial state
    expect(initialOwnerBalance).toBe(BigInt("100000000000000000000000")) // 100k tokens

    // Let's change some state by deploying another contract
    const salt2 =
      "0x0000000000000000000000000000000000000000000000000000000000000008" as Hex
    const secondTokenAddress = await smartContractManager?.deployContract({
      name: "SimpleToken",
      args: [],
      salt: salt2,
      deployer,
    })

    // Verify the second contract was deployed
    const secondContractCode = await publicClient.getBytecode({
      address: secondTokenAddress,
    })
    expect(secondContractCode).toBeDefined()
    expect(secondContractCode).not.toBe("0x")

    // Revert to snapshot
    await node?.revert(snapshotId)

    // Check that the second contract no longer exists
    const codeAfterRevert = await publicClient.getBytecode({
      address: secondTokenAddress,
    })
    expect(codeAfterRevert).toBeUndefined()

    // Verify the first contract still exists and has the same state
    const firstContractCodeAfterRevert = await publicClient.getBytecode({
      address: tokenAddress,
    })
    expect(firstContractCodeAfterRevert).toBeDefined()
    expect(firstContractCodeAfterRevert).not.toBe("0x")

    const ownerBalanceAfterRevert = await publicClient.readContract({
      address: tokenAddress,
      abi: [
        {
          name: "balanceOf",
          type: "function",
          stateMutability: "view",
          inputs: [{ name: "account", type: "address" }],
          outputs: [{ name: "", type: "uint256" }],
        },
      ],
      functionName: "balanceOf",
      args: [owner],
    })

    expect(ownerBalanceAfterRevert).toBe(initialOwnerBalance)
  })
})
