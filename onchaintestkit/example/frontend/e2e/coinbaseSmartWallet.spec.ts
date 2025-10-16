import { expect } from "@playwright/test"
import { createOnchainTest } from "../../../src/createOnchainTest"
import { CoinbaseSpecificActionType } from "../../../src/wallets/Coinbase"
import type { WebAuthnCredential } from "../../../src/wallets/Coinbase/PasskeyAuthenticator"
import { PasskeyAuthenticator } from "../../../src/wallets/Coinbase/PasskeyAuthenticator"
import { coinbaseWalletConfig } from "./walletConfig/coinbaseWalletConfig"

const test = createOnchainTest(coinbaseWalletConfig)

test.describe("Coinbase Smart Wallet - Passkey Registration", () => {
  test("should initialize virtual authenticator and have no credentials", async ({
    coinbase,
  }) => {
    if (!coinbase) throw new Error("Coinbase is not defined")
    // Manually initialize the authenticator for this test using the extension page
    coinbase.passkeyAuthenticator = new PasskeyAuthenticator(
      coinbase.walletPage,
    )
    const authenticator = coinbase.passkeyAuthenticator
    await authenticator.initialize()
    const credentials = await authenticator.getCredentials()
    expect(Array.isArray(credentials)).toBe(true)
    expect(credentials.length).toBe(0)
  })

  test("should register a passkey via SmartWallet and find it in the authenticator", async ({
    page,
    coinbase,
  }) => {
    if (!coinbase) throw new Error("Coinbase is not defined")
    await page.goto("https://onchainkit.xyz/playground")
    await page.waitForLoadState("networkidle")
    const passkeyConfig = {
      name: "Minimal Test Passkey",
      rpId: "keys.coinbase.com",
      rpName: "Coinbase Smart Wallet",
      userId: "test-user-123",
      isUserVerified: true,
    }
    // 1. Click to open the first popup
    const [firstPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      page.click("#wallet-type-smart"),
    ])
    await firstPopup.waitForLoadState("domcontentloaded")
    // Check notification type after registration popup
    // const notifType1 = await coinbase.notificationPage.identifyNotificationType(firstPopup)
    // console.log("Notification type after registration:", notifType1)

    // 2. Use handleAction to perform registration (handles switch-to-scw-link and popup internally)
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: firstPopup,
        passkeyAction: "registerWithCBExtension",
        passkeyConfig,
      },
    )

    const authenticator = coinbase.passkeyAuthenticator
      ? coinbase.passkeyAuthenticator
      : coinbase.authenticator
    if (!authenticator)
      throw new Error("Authenticator is null after registration")
    const credentials = await authenticator.getCredentials()
    expect(
      credentials.some(
        (c: WebAuthnCredential) => c.rpId === "keys.coinbase.com",
      ),
    ).toBe(true)
  })

  test("should register a passkey and complete a transaction (layout only)", async ({
    page,
    coinbase,
  }) => {
    if (!coinbase) throw new Error("Coinbase is not defined")
    await page.goto("https://onchainkit.xyz/playground")
    await page.waitForLoadState("networkidle")
    const passkeyConfig = {
      name: "Minimal Test Passkey",
      rpId: "keys.coinbase.com",
      rpName: "Coinbase Smart Wallet",
      userId: "test-user-123",
      isUserVerified: true,
    }
    // 1. Click to open the first popup
    const [firstPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      page.click("#wallet-type-smart"),
    ])
    await firstPopup.waitForLoadState("domcontentloaded")
    await firstPopup.waitForSelector('[data-testid="switch-to-scw-link"]', {
      timeout: 10000,
    })
    // Check notification type after registration popup
    // const notifType1 = await coinbase.notificationPage.identifyNotificationType(firstPopup)
    // console.log("Notification type after registration:", notifType1)

    // 2. Use handleAction to perform registration (handles switch-to-scw-link and popup internally)
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: firstPopup,
        passkeyAction: "registerWithCBExtension",
        passkeyConfig,
      },
    )

    const authenticator = coinbase.passkeyAuthenticator
      ? coinbase.passkeyAuthenticator
      : coinbase.authenticator
    if (!authenticator)
      throw new Error("Authenticator is null after registration")
    const credentials = await authenticator.getCredentials()
    expect(
      credentials.some(
        (c: WebAuthnCredential) => c.rpId === "keys.coinbase.com",
      ),
    ).toBe(true)

    // Add a 3 second pause before clicking the combobox
    await page.waitForTimeout(3000)
    await page.locator('button[role="combobox"]:has-text("Base")').click()
    await page.getByRole("option", { name: "Base Sepolia" }).click()

    const [popup] = await Promise.all([
      page.context().waitForEvent("page"),
      page.locator('[data-testid="ockTransactionButton_Button"]').click(),
    ])

    // Wait for the popup to load
    await popup.waitForLoadState("domcontentloaded")
    // Check notification type after transaction popup
    // const notifType2 = await coinbase.notificationPage.identifyNotificationType(popup)
    // console.log("Notification type after transaction:", notifType2)

    // Use handleAction to approve the transaction with passkey
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        popup: popup,
        passkeyAction: "approve",
        passkeyConfig,
      },
    )

    // Check for 'Successful' text on the main page after transaction
    await expect(
      page.getByTestId("ockToast").getByText("Successful"),
    ).toBeVisible({ timeout: 30000 })
  })
})

// New test suite for Coinbase Wallet SDK

test.describe("coinbase wallet sdk tests", () => {
  test("should register a passkey via SDK and find it in the authenticator", async ({
    page,
    coinbase,
  }) => {
    if (!coinbase) throw new Error("Coinbase is not defined")
    await page.goto("https://coinbase.github.io/coinbase-wallet-sdk/")
    await page.waitForLoadState("networkidle")
    const passkeyConfig = {
      name: "Minimal Test Passkey",
      rpId: "keys.coinbase.com",
      rpName: "Coinbase Smart Wallet",
      userId: "test-user-123",
      isUserVerified: true,
    }
    await page.getByRole("button", { name: "Option: all" }).click()
    await page.getByRole("menuitem", { name: "smartWalletOnly" }).click()
    await page
      .locator(
        'form:has(code:has-text("eth_requestAccounts")) button[type="submit"]',
      )
      .click()

    const [firstPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page
        .locator(
          'form:has(code:has-text("eth_requestAccounts")) button[type="submit"]',
        )
        .click(),
    ])
    await firstPopup.waitForLoadState("domcontentloaded")
    // No switch-to-scw-link click for SDK

    // 2. Use handleAction to perform registration with SDK (no switch-to-scw-link)
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: firstPopup,
        passkeyAction: "registerWithSmartWalletSDK",
        passkeyConfig,
      },
    )

    const authenticator = coinbase.passkeyAuthenticator
      ? coinbase.passkeyAuthenticator
      : coinbase.authenticator
    if (!authenticator)
      throw new Error("Authenticator is null after registration")
    const credentials = await authenticator.getCredentials()
    expect(credentials.some(c => c.rpId === "keys.coinbase.com")).toBe(true)
  })

  test("Full SDK test suite (import wallet, send transaction, sign message, grant spend permission)", async ({
    page,
    coinbase,
  }) => {
    if (!coinbase) throw new Error("Coinbase is not defined")
    await page.goto("https://coinbase.github.io/coinbase-wallet-sdk/")
    await page.waitForLoadState("networkidle")

    const passkeyConfig = {
      name: "Minimal Test Passkey",
      rpId: "keys.coinbase.com",
      rpName: "Coinbase Smart Wallet",
      userId: "test-user-123",
      isUserVerified: true,
    }

    await page.getByRole("button", { name: "Option: all" }).click()
    await page.getByRole("menuitem", { name: "smartWalletOnly" }).click()

    await page
      .locator(
        'form:has(code:has-text("eth_requestAccounts")) button[type="submit"]',
      )
      .click()

    const [firstPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page
        .locator(
          'form:has(code:has-text("eth_requestAccounts")) button[type="submit"]',
        )
        .click(),
    ])
    await firstPopup.waitForLoadState("domcontentloaded")
    // No switch-to-scw-link click for SDK

    // 2. Use handleAction to perform registration with SDK (no switch-to-scw-link)
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: firstPopup,
        passkeyAction: "registerWithSmartWalletSDK",
        passkeyConfig,
      },
    )

    const authenticator = coinbase.passkeyAuthenticator
      ? coinbase.passkeyAuthenticator
      : coinbase.authenticator
    if (!authenticator)
      throw new Error("Authenticator is null after registration")
    const credentials = await authenticator.getCredentials()
    expect(credentials.some(c => c.rpId === "keys.coinbase.com")).toBe(true)

    await page.waitForTimeout(3000)

    const [secondPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page.getByRole("button", { name: "Example Tx" }).click(),
    ])
    await secondPopup.waitForLoadState("domcontentloaded")
    // Check notification type after transaction popup
    const notifType2 =
      await coinbase.notificationPage.identifyNotificationType(secondPopup)
    console.log("Notification type after transaction:", notifType2)

    // Use handleAction to approve the transaction with passkey
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        popup: secondPopup,
        passkeyAction: "approve",
        passkeyConfig,
      },
    )

    await page.waitForTimeout(10000)

    const [thirdPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page
        .locator('.chakra-accordion__panel button:has-text("Example Message")')
        .first()
        .click(),
    ])
    await thirdPopup.waitForLoadState("domcontentloaded")
    // Check notification type after sign message popup
    const notifType3 =
      await coinbase.notificationPage.identifyNotificationType(thirdPopup)
    console.log("Notification type after sign message:", notifType3)
    // 3. Use handleAction to sign a message with the passkey
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: thirdPopup,
        passkeyAction: "signMessage",
        passkeyConfig,
      },
    )

    await page.waitForTimeout(6000)

    await page
      .getByRole("button", { name: /Env: https:\/\/keys\.coinbase\./ })
      .click()
    await page
      .getByRole("menuitem", { name: "https://keys-dev.coinbase.com/connect" })
      .click()

    await page.getByRole("button", { name: /Pages/ }).click()

    await page.waitForSelector('a[role="menuitem"]')

    await page.getByRole("menuitem", { name: "/add-sub-account" }).click()

    const [fourthPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page.getByRole("button", { name: "Connect", exact: true }).click(),
    ])
    await fourthPopup.waitForLoadState("domcontentloaded")

    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: fourthPopup,
        passkeyAction: "signIn",
      },
    )

    await page.waitForTimeout(3000)

    const [fifthPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page
        .getByRole("button", { name: "Add Address", exact: true })
        .click(),
    ])
    await fifthPopup.waitForLoadState("domcontentloaded")
    await fifthPopup
      .locator('[data-testid="create-sub-account-approve-button"]')
      .click()

    await page.waitForTimeout(3000)

    const [sixthPopup] = await Promise.all([
      page.context().waitForEvent("page"),
      await page
        .getByRole("button", { name: "Grant Spend Permission" })
        .click(),
    ])
    await sixthPopup.waitForLoadState("domcontentloaded")
    await sixthPopup.waitForSelector(
      '[data-testid="grant-permissions-approve-button"]',
      { state: "visible", timeout: 10000 },
    )

    const notifType6 =
      await coinbase.notificationPage.identifyNotificationType(sixthPopup)
    console.log("Notification type after grant permission:", notifType6)
    await coinbase.handleAction(
      CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP,
      {
        mainPage: page,
        popup: sixthPopup,
        passkeyAction: "grantSpendPermission",
        passkeyConfig,
      },
    )
  })
})
