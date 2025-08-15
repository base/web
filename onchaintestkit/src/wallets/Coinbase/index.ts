import path from "node:path"
import type { BrowserContext, Page } from "@playwright/test"
import { chromium } from "@playwright/test"
import { getExtensionId } from "../../utils/extensionManager"
import {
  ActionApprovalType,
  ActionOptions,
  BaseActionType,
  BaseWallet,
} from "../BaseWallet"
import { CoinbaseConfig } from "../types"
import { NetworkConfig } from "../types"
import {
  PasskeyAuthenticator,
  WebAuthnCredential,
} from "./PasskeyAuthenticator"
import { HomePage, NotificationPage, OnboardingPage } from "./pages"

// Extend BaseActionType with Coinbase-specific actions
export enum CoinbaseSpecificActionType {
  LOCK = "lock",
  UNLOCK = "unlock",
  ADD_TOKEN = "addToken",
  ADD_ACCOUNT = "addAccount",
  SWITCH_ACCOUNT = "switchAccount",
  ADD_NETWORK = "addNetwork",
  SEND_TOKENS = "sendTokens",
  HANDLE_PASSKEY_POPUP = "handlePasskeyPopup",
}

type CoinbaseActionType = BaseActionType | CoinbaseSpecificActionType

const WALLET_CONNECTION_ERROR = new Error(
  "Coinbase Wallet extension connection not established",
)
const COINBASE_VERSION = "3.117.1"


const DEV_HARDCODED_CREDENTIAL: WebAuthnCredential = {
  credentialId: "LWE8QFe2si8y58AgG8o6DLJs4ZIKNnpD0/7NEsuBQnw=",
  isResidentCredential: true,
  rpId: "keys-dev.coinbase.com",
  privateKey:
    "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgTEa+O0Uztk3hi65nPXaaL4idLccOOlqCzBSiv+COKAuhRANCAAT2fO9Pi6ZnTi7LY2zUnHbyCuJFq/wMn+C864QzQcwwqFj7W++4QLMubCeKqZXAjs3q3F4hr2Q1arqpmNW75uwS",
  userHandle: "MTNjNzc3NjgtMmZlMC00NGZjLTk1MGMtMWViMjdjOWNmNmI0",
  signCount: 1,
}

// const PROD_HARDCODED_CREDENTIAL: WebAuthnCredential = {
//   credentialId: "juXp/DTyefEDgaWOH77ZK2R4xFIWOQnPFRuiZM3vgN8=",
//   isResidentCredential: true,
//   rpId: "keys.coinbase.com",
//   privateKey:
//     "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgzU+N8E45nnTg3N73nV+Ch+0jd5TIVB7UVbGnUMjJ/YWhRANCAATO+c9tlzPD/sbz83/8YVrNrqSIZxnIS9Ok/wYcaZDXA8Vz6aXYglEMri2tavv+mU6G0Xkk3NOQ+ghOxuWzH88P",
//   userHandle: "ZjY0ZDI4N2ItYjFhMy00ZmUxLWE1NzktODA2ODUyMWFlYmFl",
//   signCount: 1,
// }

function normalizeRpId(input?: string): string {
  return (input ?? "keys.coinbase.com").trim().toLowerCase()
}

export type PasskeyConfig = {
  name: string
  rpId: string
  rpName: string
  userId: string
  isUserVerified?: boolean
}

export class CoinbaseWallet extends BaseWallet {
  private readonly context: BrowserContext

  private readonly extensionId?: string

  public readonly config: CoinbaseConfig

  private readonly page: Page

  readonly onboardingPage: OnboardingPage

  readonly homePage: HomePage

  readonly notificationPage: NotificationPage

  // Passkey authenticator state
  public passkeyAuthenticator: PasskeyAuthenticator | null = null
  public passkeyCredentials: WebAuthnCredential[] = []
  public get authenticator(): PasskeyAuthenticator | null {
    return this.passkeyAuthenticator
  }

  constructor(
    walletConfig: CoinbaseConfig,
    context: BrowserContext,
    page: Page,
    extensionId?: string,
  ) {
    super()
    this.context = context
    this.extensionId = extensionId
    this.config = walletConfig
    this.page = page
    this.onboardingPage = new OnboardingPage(page)
    this.homePage = new HomePage(page)
    this.notificationPage = new NotificationPage(page)
  }

  static async initialize(
    currentContext: BrowserContext,
    contextPath: string,
    _walletConfig: CoinbaseConfig,
  ): Promise<{ coinbasePage: Page; coinbaseContext: BrowserContext }> {
    // Create browser context with Coinbase extension
    const context = await CoinbaseWallet.createContext(contextPath)

    // Handle cookie and storage transfer if currentContext exists
    if (currentContext) {
      const { cookies } = await currentContext.storageState()
      if (cookies) {
        await context.addCookies(cookies)
      }
    }

    // Wait for extension page to load and get extension ID
    const extensionId = await getExtensionId(
      context,
      "Coinbase Wallet extension",
    )

    // Get the extension page using the correct path from manifest.json
    const extensionUrl = `chrome-extension://${extensionId}/index.html?inPageRequest=false`

    const coinbasePage = await context.newPage()
    await coinbasePage.goto(extensionUrl, { waitUntil: "domcontentloaded" })

    // Wait for extension to be ready
    await coinbasePage.waitForLoadState("networkidle")

    // Close any other pages
    const pages = context.pages()
    for (const page of pages) {
      if (page !== coinbasePage) {
        await page.close()
      }
    }

    return { coinbasePage, coinbaseContext: context }
  }

  static async createContext(
    contextPath: string,
    slowMo = 0,
  ): Promise<BrowserContext> {
    // Use retry logic to handle potential race conditions when setting up extension
    const MAX_RETRIES = 3
    let lastError: Error | null = null

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          console.log(
            `Retrying Coinbase setup (attempt ${
              attempt + 1
            }/${MAX_RETRIES})...`,
          )
        }

        // Get coinbase extension path (assumes prepare-coinbase.mjs was run first)
        const cacheDir = path.join(
          process.cwd(),
          "e2e",
          ".cache",
          "coinbase-extension",
        )
        const coinbasePath = path.join(cacheDir, `coinbase-${COINBASE_VERSION}`)

        console.log("Coinbase extension prepared at:", coinbasePath)

        const browserArgs = [
          `--disable-extensions-except=${coinbasePath}`,
          "--enable-extensions",
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
          "--disable-accelerated-2d-canvas",
          "--no-first-run",
          "--no-zygote",
          "--disable-gpu",
          "--force-gpu-mem-available-mb=1024",
          "--disable-background-timer-throttling",
          "--disable-backgrounding-occluded-windows",
          "--disable-renderer-backgrounding",
          "--disable-features=IsolateOrigins,site-per-process", // Allow cross-origin iframes
        ]

        const context = await chromium.launchPersistentContext(contextPath, {
          headless: false,
          args: browserArgs,
          slowMo,
          viewport: { width: 1280, height: 800 },
          ignoreHTTPSErrors: true,
          acceptDownloads: true,
        })

        // Wait for extension to be ready
        await new Promise(resolve => setTimeout(resolve, 2000))
        return context
      } catch (error) {
        // If we failed at the setup stage
        if (attempt === MAX_RETRIES - 1) {
          const errorMessage =
            error instanceof Error ? error.message : String(error)
          throw new Error(`Failed to setup Coinbase: ${errorMessage}`)
        }

        // Save error for potential retry
        lastError = error instanceof Error ? error : new Error(String(error))

        // Short delay before retry
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }

    // If we reach here, all attempts failed
    throw lastError ?? new Error("Failed to create context after all retries")
  }



  private async ensureHardcodedCredential(rpId: string): Promise<void> {
    if (!this.passkeyAuthenticator) return
    const normalized = normalizeRpId(rpId)
    const target = DEV_HARDCODED_CREDENTIAL
    const existing = await this.passkeyAuthenticator.getCredentials().catch(() => [] as WebAuthnCredential[])
    if (existing.some((c) => c.credentialId === target.credentialId)) return
    await this.passkeyAuthenticator.importCredential({ ...target, rpId: normalized })
  }

  /**
   * Handle a passkey popup for registration or authentication.
   * For registration, receives the main page and the first popup, clicks the switch link, waits for the second popup, and registers there.
   * For approve, receives the transaction popup directly.
   * @param mainPage The Playwright Page for the main dapp (only needed for registration)
   * @param popup The Playwright Page for the popup (first popup for registration, transaction popup for approve)
   * @param action 'register' or 'approve'
   * @param config PasskeyConfig (required for 'register')
   */
  async handlePasskeyPopup(
    mainPageOrPopup: Page,
    popup: Page,
    action:
      | "registerWithCBExtension"
      | "registerWithSmartWalletSDK"
      | "signMessage"
      | "approve"
      | "grantSpendPermission"
      | "signIn"
      | "signInWithCBExtension",
    config?: PasskeyConfig,
  ): Promise<void> {
    if (action === "registerWithCBExtension") {
      const firstPopup = popup
      const [secondPopup] = await Promise.all([
        mainPageOrPopup.context().waitForEvent("page"),
        firstPopup.click('[data-testid="switch-to-scw-link"]'),
      ])
      await secondPopup.waitForLoadState("domcontentloaded")
      await secondPopup.waitForSelector(
        'button:has-text("Create an account")',
        {
          timeout: 10000,
        },
      )
      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(secondPopup)
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(secondPopup)
      }
      if (!config) throw new Error("PasskeyConfig required for registration")
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: config.isUserVerified ?? true,
        automaticPresenceSimulation: true,
      })
      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          await secondPopup
            .locator('button:has-text("Create an account")')
            .click()
          await secondPopup
            .locator('[data-testid="passkey-name-input"]')
            .fill(config.name)
          await secondPopup.locator('[data-testid="continue-button"]').click()
        },
      )
      this.passkeyCredentials =
        await this.passkeyAuthenticator.exportCredentials()

    } else if (action === "registerWithSmartWalletSDK") {
      const sdkPopup = popup
      await sdkPopup.waitForLoadState("domcontentloaded")
      await sdkPopup.waitForSelector('button:has-text("Create an account")', {
        timeout: 10000,
      })
      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(sdkPopup)
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(sdkPopup)
      }
      if (!config) throw new Error("PasskeyConfig required for registration")
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: config.isUserVerified ?? true,
        automaticPresenceSimulation: true,
      })
      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          await sdkPopup.locator('button:has-text("Create an account")').click()
          await sdkPopup
            .locator('[data-testid="passkey-name-input"]')
            .fill(config.name)
          await sdkPopup.locator('[data-testid="continue-button"]').click()
        },
      )

      const creds = await this.passkeyAuthenticator.exportCredentials()
      this.passkeyCredentials = creds
    } else if (action === "signMessage") {
      const signPopup = popup
      await signPopup.waitForLoadState("domcontentloaded")

      // Wait for the popup to reach the expected URL
      const host = (config?.rpId ?? "keys.coinbase.com").trim()
      const expectedUrl = `https://${host}/sign/personal-sign`
      let currentUrl = await signPopup.url()
      if (!String(currentUrl).startsWith(expectedUrl)) {
        await signPopup.waitForURL(url => String(url).startsWith(expectedUrl), {
          timeout: 15000,
        })
        currentUrl = await signPopup.url()
      }

      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(signPopup)
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(signPopup)
      }
      if (!config) throw new Error("PasskeyConfig required for signMessage")
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: config.isUserVerified ?? true,
        automaticPresenceSimulation: true,
      })
      for (const cred of this.passkeyCredentials) {
        await this.passkeyAuthenticator.importCredential(cred)
      }
      await popup.waitForLoadState("domcontentloaded")
      await popup.waitForLoadState("networkidle")

      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          await signPopup.waitForLoadState("domcontentloaded")
          await signPopup.locator('[data-testid="button-1"]').click()
        },
      )
    } else if (action === "grantSpendPermission") {
      // Handle grant spend permission popup
      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(popup)
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(popup)
      }

      const host = (config?.rpId ?? "keys-dev.coinbase.com").trim()
      await popup.waitForURL(
        url => String(url).startsWith(`https://${host}/sign/grant-permission`),
        { timeout: 15000 },
      )
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        automaticPresenceSimulation: true,
      })

      await this.ensureHardcodedCredential(config?.rpId ?? "keys-dev.coinbase.com")
      await popup.waitForLoadState("domcontentloaded")
      await popup.waitForLoadState("networkidle")
      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          await popup.getByTestId("grant-permissions-approve-button").click()
        },
      )
    } else if (action === "approve") {
      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(popup)
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(popup)
      }

      const host = (config?.rpId ?? "keys.coinbase.com").trim()
      const expectedUrls = [
        `https://${host}/sign/wallet-send-calls`,
        `https://${host}/sign/eth-send-transaction`,
      ]
      let currentUrl = await popup.url()
      if (!expectedUrls.some(prefix => String(currentUrl).startsWith(prefix))) {
        await popup.waitForURL(
          url => expectedUrls.some(prefix => String(url).startsWith(prefix)),
          { timeout: 15000 },
        )

        currentUrl = await popup.url()
      }
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        automaticPresenceSimulation: true,
      })
      // Ensure the appropriate hardcoded credential is present for this host
      await this.ensureHardcodedCredential(config?.rpId ?? "keys.coinbase.com")
      // Log available credentials for debugging
      try {
        const creds = await this.passkeyAuthenticator.getCredentials()
        console.log("[ONCHAINTESTKIT/PASSKEY_DEBUG] rpId=", normalizeRpId(config?.rpId), "credentials=", creds.map(c => ({ id: c.credentialId, rpId: c.rpId })))
      } catch {}
      await popup.waitForLoadState("domcontentloaded")
      await popup.waitForLoadState("networkidle")
      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          const approveSelector = '[data-testid="approve-transaction-button"], [data-testid="button-1"]'
          await popup.locator(approveSelector).first().click()
        },
      )
    } else if (action === "signIn") {
      const sdkPopup = popup
      await sdkPopup.waitForLoadState("domcontentloaded")

      await sdkPopup.waitForSelector('button:has-text("Sign in")', {
        timeout: 10000,
      })
      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(sdkPopup)
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(sdkPopup)
      }
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        automaticPresenceSimulation: true,
      })

      await this.ensureHardcodedCredential(config?.rpId ?? "keys-dev.coinbase.com")
      await sdkPopup.waitForLoadState("domcontentloaded")
      await sdkPopup.waitForLoadState("networkidle")

      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          await sdkPopup.locator('button:has-text("Sign in")').click()
        },
      )
      await sdkPopup
        .getByRole("button", { name: "Continue", exact: true })
        .click()
    } else if (action === "signInWithCBExtension") {
      const firstPopup = popup
      const [sdkPopup] = await Promise.all([
        mainPageOrPopup.context().waitForEvent("page"),
        firstPopup.click('[data-testid="switch-to-scw-link"]'),
      ])
      await sdkPopup.waitForLoadState("domcontentloaded")

      await sdkPopup.waitForSelector('button:has-text("Sign in")', {
        timeout: 10000,
      });
      if (this.passkeyAuthenticator) {
        await this.passkeyAuthenticator.setPage(sdkPopup);
      } else {
        this.passkeyAuthenticator = new PasskeyAuthenticator(sdkPopup);
      }
      await this.passkeyAuthenticator.initialize({
        protocol: "ctap2",
        transport: "internal",
        hasResidentKey: true,
        hasUserVerification: true,
        isUserVerified: true,
        automaticPresenceSimulation: true,
      });

      await this.ensureHardcodedCredential(config?.rpId ?? "keys-dev.coinbase.com");
      await sdkPopup.waitForLoadState("domcontentloaded");
      await sdkPopup.waitForLoadState("networkidle");

      await this.passkeyAuthenticator.simulateSuccessfulPasskeyInput(
        async () => {
          await sdkPopup.locator('button:has-text("Sign in")').click();
        },
      );
      await sdkPopup
        .getByRole("button", { name: "Continue", exact: true })
        .click();
    }
    
    else {
      throw new Error(`Unknown passkey popup action: ${action}`)
    }
  }

  async handleAction(
    action: CoinbaseActionType,
    options?: ActionOptions,
  ): Promise<void> {
    const { approvalType, ...additionalOptions } = options ?? {}

    if (!this.extensionId) {
      throw WALLET_CONNECTION_ERROR
    }

    // Passkey popup handling
    if (action === CoinbaseSpecificActionType.HANDLE_PASSKEY_POPUP) {
      // expects: options.mainPage, options.popup, options.passkeyAction, options.passkeyConfig
      const mainPage = additionalOptions.mainPage as Page
      const popup = additionalOptions.popup as Page
      const passkeyAction = additionalOptions.passkeyAction as
        | "registerWithCBExtension"
        | "registerWithSmartWalletSDK"
        | "signMessage"
        | "approve"
        | "grantSpendPermission"
        | "signIn"
        | "signInWithCBExtension"
      const passkeyConfig = additionalOptions.passkeyConfig as
        | PasskeyConfig
        | undefined
      await this.handlePasskeyPopup(
        mainPage,
        popup,
        passkeyAction,
        passkeyConfig,
      )
      return
    }

    switch (action) {
      // Basic setup actions
      case BaseActionType.IMPORT_WALLET_FROM_SEED:
        await this.onboardingPage.importWallet(
          additionalOptions.seedPhrase as string,
          additionalOptions.password as string,
        )
        break

      case BaseActionType.IMPORT_WALLET_FROM_PRIVATE_KEY:
        await this.homePage.importPrivateKey(
          additionalOptions.privateKey as string,
          this.config.password as string,
        )
        break

      // Network actions
      case CoinbaseSpecificActionType.ADD_NETWORK:
        if (!additionalOptions.network) {
          throw new Error("Network options not provided for ADD_NETWORK action")
        }
        await this.homePage.addNetwork(
          additionalOptions.network as NetworkConfig,
        )
        break

      case BaseActionType.SWITCH_NETWORK:
        await this.homePage.switchNetwork(
          additionalOptions.networkName as string,
          additionalOptions.isTestnet as boolean,
        )
        break

      // Account actions
      case CoinbaseSpecificActionType.ADD_ACCOUNT:
        await this.homePage.addNewAccount(
          additionalOptions.accountName as string,
        )
        break

      case CoinbaseSpecificActionType.SWITCH_ACCOUNT:
        await this.homePage.switchAccount(
          additionalOptions.accountName as string,
        )
        break

      // Dapp actions
      case BaseActionType.CONNECT_TO_DAPP:
        await this.notificationPage.connectToDapp(this.extensionId)
        break

      // Transaction actions
      case BaseActionType.HANDLE_TRANSACTION:
        if (approvalType === ActionApprovalType.APPROVE) {
          await this.notificationPage.confirmTransaction(this.extensionId)
        } else {
          await this.notificationPage.rejectTransaction(this.extensionId)
        }
        break

      // Token permission actions
      case BaseActionType.CHANGE_SPENDING_CAP:
        if (approvalType === ActionApprovalType.APPROVE) {
          await this.notificationPage.approveTokenPermission(this.extensionId)
        } else {
          await this.notificationPage.rejectTokenPermission(this.extensionId)
        }
        break

      case BaseActionType.REMOVE_SPENDING_CAP:
        if (approvalType === ActionApprovalType.APPROVE) {
          await this.notificationPage.confirmSpendingCapRemoval(
            this.extensionId,
          )
        } else {
          await this.notificationPage.rejectSpendingCapRemoval(this.extensionId)
        }
        break

      case CoinbaseSpecificActionType.SEND_TOKENS:
        // TODO: Implement token sending
        // if (!additionalOptions.recipientAddress || !additionalOptions.amount) {
        //   throw new Error(
        //     "Recipient address and amount are required for sending tokens",
        //   )
        // }
        // await this.homePage.sendTokens(
        //   additionalOptions.recipientAddress as string,
        //   additionalOptions.amount as string,
        //   additionalOptions.tokenSymbol as string | undefined,
        // )
        throw new Error("sendTokens not implemented for Coinbase Wallet")

      default:
        throw new Error(`Unsupported action: ${action}`)
    }
  }

  // Public getters for SmartWallet integration
  get walletContext(): BrowserContext {
    return this.context
  }

  get walletPage(): Page {
    return this.page
  }

  get walletExtensionId(): string | undefined {
    return this.extensionId
  }
}

export * from "./fixtures"
