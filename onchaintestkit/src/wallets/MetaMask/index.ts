import path from "node:path"
import { chromium } from "@playwright/test"
import type { BrowserContext, Page } from "@playwright/test"
import fs from "fs-extra"
import { getExtensionId } from "../../utils/extensionManager"
import {
  ActionApprovalType,
  ActionOptions,
  BaseActionType,
  BaseWallet,
} from "../BaseWallet"
import { MetaMaskConfig, NetworkConfig } from "../types"
import { HomePage, NotificationPage, OnboardingPage } from "./pages"

// Extend BaseActionType with MetaMask-specific actions
export enum MetaMaskSpecificActionType {
  LOCK = "lock",
  UNLOCK = "unlock",
  ADD_TOKEN = "addToken",
  ADD_ACCOUNT = "addAccount",
  RENAME_ACCOUNT = "renameAccount",
  REMOVE_ACCOUNT = "removeAccount",
  SWITCH_ACCOUNT = "switchAccount",
  ADD_NETWORK = "addNetwork",
  APPROVE_ADD_NETWORK = "approveAddNetwork",
}

type MetaMaskActionType = BaseActionType | MetaMaskSpecificActionType

const WALLET_CONNECTION_ERROR = new Error(
  "Wallet extension connection not established",
)

// MetaMask extension constants
const TARGET_EXTENSION_VERSION = "12.8.1"
const SETUP_COMPLETION_MARKER = ".extraction_complete"

export class MetaMask extends BaseWallet {
  readonly onboardingPage: OnboardingPage

  readonly homePage: HomePage

  readonly notificationPage: NotificationPage

  private readonly context: BrowserContext

  private readonly extensionId?: string

  // Expose the wallet config as a public property
  public readonly config: MetaMaskConfig

  constructor(
    walletConfig: MetaMaskConfig,
    context: BrowserContext,
    page: Page,
    extensionId?: string,
  ) {
    super()
    this.context = context
    this.extensionId = extensionId
    this.config = walletConfig
    this.onboardingPage = new OnboardingPage(page)
    this.homePage = new HomePage(page)
    this.notificationPage = new NotificationPage(page)
  }

  static async initialize(
    currentContext: BrowserContext,
    contextPath: string,
    walletConfig: MetaMaskConfig,
  ): Promise<{ metamaskPage: Page; metamaskContext: BrowserContext }> {
    // Create browser context with MetaMask extension
    const context = await MetaMask.createContext(contextPath)

    // Handle cookie and storage transfer if currentContext exists
    if (currentContext) {
      const { cookies } = await currentContext.storageState()
      if (cookies) {
        await context.addCookies(cookies)
      }
    }

    const metamaskPage = context.pages()[0]
    if (!metamaskPage) {
      throw new Error("MetaMask page not found")
    }
    const extensionId = await getExtensionId(context, "MetaMask")

    // create metamask instance without running setup yet
    const _metamask = new MetaMask(
      walletConfig,
      context,
      metamaskPage,
      extensionId,
    )

    return { metamaskPage, metamaskContext: context }
  }

  static async createContext(
    contextPath: string,
    slowMo = 0,
  ): Promise<BrowserContext> {
    console.log("Starting context creation...")

    // Use retry logic to handle potential race conditions when setting up extension
    const MAX_RETRIES = 3
    let lastError: Error | null = null

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
      try {
        if (attempt > 0) {
          console.log(
            `Retrying MetaMask setup (attempt ${
              attempt + 1
            }/${MAX_RETRIES})...`,
          )
        }

        // Get MetaMask extension path (assumes prepare-metamask.mjs was run first)
        const cacheDir = path.join(
          process.cwd(),
          "e2e",
          ".cache",
          "metamask-extension",
        )
        const metamaskPath = path.join(
          cacheDir,
          `metamask-${TARGET_EXTENSION_VERSION}`,
        )
        const flagPath = path.join(metamaskPath, SETUP_COMPLETION_MARKER)

        // Validate that extension exists and was properly extracted
        if (!(await fs.pathExists(flagPath))) {
          const manifestPath = path.join(metamaskPath, "manifest.json")
          if (!(await fs.pathExists(manifestPath))) {
            throw new Error(
              `MetaMask extension not found at ${metamaskPath}. Please run the extraction command before running tests:\nyarn e2e:metamask:prepare`,
            )
          }
        }

        console.log("MetaMask extension found at:", metamaskPath)

        const browserArgs = [
          `--disable-extensions-except=${metamaskPath}`,
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
        ]

        const context = await chromium.launchPersistentContext(contextPath, {
          headless: false,
          args: browserArgs,
          slowMo,
          viewport: { width: 1280, height: 800 },
          ignoreHTTPSErrors: true,
          acceptDownloads: true,
        })

        try {
          // Increase timeout to 20 seconds and add logging
          console.log("Waiting for MetaMask extension page to load...")
          await context.waitForEvent("page", { timeout: 20000 })
          console.log("MetaMask extension page loaded successfully")

          // Close the blank page
          const pages = context.pages()
          console.log(`Number of pages after extension load: ${pages.length}`)

          if (pages.length > 0) {
            const blankPage = pages[0]
            await blankPage.close()
            console.log("Closed blank page")
          }

          return context
        } catch (error) {
          // Clean up on failure
          await context.close()

          // On the last attempt, throw the error
          if (attempt === MAX_RETRIES - 1) {
            const errorMessage =
              error instanceof Error ? error.message : String(error)
            throw new Error(
              `Failed to initialize MetaMask extension: ${errorMessage}`,
            )
          }

          // Save error for potential retry
          lastError = error instanceof Error ? error : new Error(String(error))

          // Short delay before retry
          await new Promise(resolve => setTimeout(resolve, 2000))
        }
      } catch (error) {
        // If we failed at the setup stage
        if (attempt === MAX_RETRIES - 1) {
          const errorMessage =
            error instanceof Error ? error.message : String(error)
          throw new Error(`Failed to setup MetaMask: ${errorMessage}`)
        }

        // Save error for potential retry
        lastError = error instanceof Error ? error : new Error(String(error))

        // Short delay before retry
        await new Promise(resolve => setTimeout(resolve, 2000))
      }
    }

    // If we reach here, all attempts failed
    throw (
      lastError ??
      new Error("Failed to create MetaMask context after multiple attempts")
    )
  }

  async handleAction(
    action: MetaMaskActionType,
    options?: ActionOptions,
  ): Promise<void> {
    const { approvalType, ...additionalOptions } = options ?? {}

    if (!this.extensionId) {
      throw WALLET_CONNECTION_ERROR
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
        )
        break
      case MetaMaskSpecificActionType.LOCK:
        // TODO: Implement
        break
      case MetaMaskSpecificActionType.UNLOCK:
        // TODO: Implement
        break
      case MetaMaskSpecificActionType.SWITCH_ACCOUNT:
        await this.homePage.switchAccount(
          additionalOptions.accountName as string,
        )
        break
      case MetaMaskSpecificActionType.RENAME_ACCOUNT:
        // TODO: Implement
        break

      // dapp actions
      case BaseActionType.CONNECT_TO_DAPP:
        await this.notificationPage.connectToDapp(this.extensionId)
        break

      // Network actions
      case MetaMaskSpecificActionType.ADD_NETWORK:
        if (!this.extensionId) {
          throw WALLET_CONNECTION_ERROR
        }

        // Add type safety and validation for network
        if (!additionalOptions.network) {
          throw new Error("Network options not provided for ADD_NETWORK action")
        }

        await this.homePage.addNetwork(
          additionalOptions.network as NetworkConfig,
        )
        break
      case BaseActionType.SWITCH_NETWORK:
        if (!this.extensionId) {
          throw WALLET_CONNECTION_ERROR
        }
        await this.homePage.switchNetwork(
          additionalOptions.networkName as string,
          additionalOptions.isTestnet as boolean,
        )
        break
      case MetaMaskSpecificActionType.APPROVE_ADD_NETWORK:
        if (approvalType === ActionApprovalType.APPROVE) {
          await this.notificationPage.approveAddNetwork(this.extensionId)
        } else {
          await this.notificationPage.rejectAddNetwork(this.extensionId)
        }
        break
      // spending cap actions
      case BaseActionType.CHANGE_SPENDING_CAP:
        if (approvalType === ActionApprovalType.APPROVE) {
          await this.notificationPage.approveTokenPermission(this.extensionId)
        } else {
          await this.notificationPage.rejectTokenPermission(this.extensionId)
        }
        break

      // transaction and spending cap removal actions
      case BaseActionType.HANDLE_TRANSACTION:
        if (approvalType === ActionApprovalType.APPROVE) {
          await this.notificationPage.confirmTransaction(this.extensionId)
        } else {
          await this.notificationPage.rejectTransaction(this.extensionId)
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

      default:
        throw new Error(`Unsupported action: ${action}`)
    }
  }

  async identifyNotificationType(): Promise<string> {
    if (!this.extensionId) {
      throw WALLET_CONNECTION_ERROR
    }
    return this.notificationPage.identifyNotificationType(this.extensionId)
  }
}

export * from "./fixtures"
