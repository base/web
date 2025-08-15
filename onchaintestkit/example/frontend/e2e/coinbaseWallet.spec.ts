import { expect } from "@playwright/test"
import { Page } from "@playwright/test"
import { ethers } from "ethers"
import { createOnchainTest } from "../../../src/createOnchainTest"
import {
  ActionApprovalType,
  BaseActionType,
} from "../../../src/wallets/BaseWallet"
import { CoinbaseSpecificActionType } from "../../../src/wallets/Coinbase"
import { connectCoinbaseWallet } from "./appSession"
import { coinbaseWalletConfig } from "./walletConfig/coinbaseWalletConfig"

async function inputTransactionDetails(page: Page) {
  // Try to send a transaction
  await page.getByTestId("switch-to-base-sepolia").click()
  //input transaction address
  await page
    .getByTestId("send-address-input")
    .fill("0x83C2bbef5a09C4B46E049917a41E05fAf74b6275")

  //input transaction amount
  await page.getByTestId("send-amount-input").fill("0.0001")

  //send transaction button
  await page.getByTestId("send-transaction-button").click()
}

const test = createOnchainTest(coinbaseWalletConfig)

test.describe("Coinbase Wallet Setup", () => {
  test("should initialize and connect wallet", async ({ page, coinbase }) => {
    if (!coinbase) {
      throw new Error("Coinbase wallet is not defined")
    }

    // Verify coinbase wallet instance exists
    expect(coinbase).toBeDefined()

    // Connect to dapp using the UI flow
    await connectCoinbaseWallet(page, coinbase)
  })

  test("should import wallet from private key", async ({ coinbase }) => {
    if (!coinbase) {
      throw new Error("Coinbase wallet is not defined")
    }

    // Get the seed phrase from environment variable
    const seedPhrase = process.env.E2E_TEST_SEED_PHRASE
    if (!seedPhrase) {
      throw new Error("E2E_TEST_SEED_PHRASE environment variable is not set")
    }

    // Derive private key from seed phrase using BIP39
    const wallet = ethers.Wallet.fromMnemonic(seedPhrase)
    const privateKey = wallet.privateKey

    // Import wallet from private key
    await coinbase.handleAction(BaseActionType.IMPORT_WALLET_FROM_PRIVATE_KEY, {
      privateKey,
    })

    // Note: The password is already configured in the wallet config
    // and will be used automatically during the import process

    // Wait a bit to ensure the import process is complete
    await new Promise(resolve => setTimeout(resolve, 2000))
  })

  test("should add Linea Testnet network", async ({ coinbase }) => {
    if (!coinbase) {
      throw new Error("Coinbase wallet is not defined")
    }

    // Define the Linea Testnet network configuration
    const lineaTestnet = {
      name: "Linea Sepolia",
      chainId: 59141,
      symbol: "ETH",
      rpcUrl: "https://rpc.sepolia.linea.build",
      //   blockExplorerUrl: "https://goerli.lineascan.build",
      isTestnet: true,
    }

    // Add the Linea Testnet network
    await coinbase.handleAction(CoinbaseSpecificActionType.ADD_NETWORK, {
      network: lineaTestnet,
      isTestnet: true,
    })

    // Wait a bit to ensure the network is added
    await new Promise(resolve => setTimeout(resolve, 2000))
  })
})

test.describe("Coinbase Wallet Transaction Handling", () => {
  test("should be able to confirm a transaction", async ({
    page,
    coinbase,
  }) => {
    if (!coinbase) throw new Error("Coinbase wallet not initialized")

    await page.getByTestId("ockConnectButton").click()

    const [notificationPopup1] = await Promise.all([
      page.context().waitForEvent("page"),
      page
        .getByRole("button", { name: "Coinbase Wallet" })
        .click(),
      // trigger the transaction (e.g., click send, etc.)
    ])
    await notificationPopup1.waitForLoadState("domcontentloaded")
    await notificationPopup1.waitForSelector(
      '[data-testid="allow-authorize-button"]',
      { timeout: 10000 },
    )
    const notifType1 =
      await coinbase.notificationPage.identifyNotificationType(
        notificationPopup1,
      )
    console.log("Notification type after connecting:", notifType1)

    // First connect to the dapp
    await coinbase.handleAction(BaseActionType.CONNECT_TO_DAPP)
    await inputTransactionDetails(page)
    // Trigger the transaction, wait for the popup
    const [notificationPopup] = await Promise.all([
      page
        .context()
        .waitForEvent("page"),
      // trigger the transaction (e.g., click send, etc.)
    ])
    await notificationPopup.waitForLoadState("domcontentloaded")
    await notificationPopup.waitForSelector(
      '[data-testid="request-confirm-button"]',
      {
        state: "visible",
        timeout: 10000,
      },
    )

    // Identify the notification type BEFORE approving/rejecting
    const notifType =
      await coinbase.notificationPage.identifyNotificationType(
        notificationPopup,
      )
    console.log("Notification type after transaction:", notifType)
    await page.waitForTimeout(3000)

    await coinbase.handleAction(BaseActionType.HANDLE_TRANSACTION, {
      approvalType: ActionApprovalType.APPROVE,
    })
    // Verify the transaction was sent (check for success message)
    await page.getByText("Transaction confirmed!").waitFor()
  })

  test("should be able to reject a transaction", async ({ page, coinbase }) => {
    if (!coinbase) throw new Error("Coinbase wallet not initialized")
    //click connect button
    await page.getByTestId("ockConnectButton").click()

    await page.getByRole("button", { name: "Coinbase Wallet" }).click()

    // First connect to the dapp
    await coinbase.handleAction(BaseActionType.CONNECT_TO_DAPP)

    await inputTransactionDetails(page)

    const [notificationPopup] = await Promise.all([
      page
        .context()
        .waitForEvent("page"),
      // trigger the transaction (e.g., click send, etc.)
    ])
    await notificationPopup.waitForLoadState("domcontentloaded")
    await notificationPopup.waitForSelector(
      '[data-testid="request-cancel-button"]',
      {
        state: "visible",
        timeout: 10000,
      },
    )

    const notifType =
      await coinbase.notificationPage.identifyNotificationType(
        notificationPopup,
      )
    console.log("Notification type after transaction:", notifType)
    // Reject the transaction in Coinbase Wallet
    await coinbase.handleAction(BaseActionType.HANDLE_TRANSACTION, {
      approvalType: ActionApprovalType.REJECT,
    })

    // Verify the transaction was rejected (check for error message)
    await page.getByText("User rejected the request").waitFor()
  })
})
