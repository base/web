import { type ViewportSize, waitForPage } from "../../../../utils"
import { BasePage } from "../BasePage"
import { connectToDapp } from "./actions"
import { confirmTransaction, rejectTransaction } from "./actions/transaction"

/**
 * Types of notifications that can appear in the Coinbase Wallet
 */
export enum NotificationPageType {
  CONNECT = "connect",
  SIGNATURE = "signature",
  TOKEN_PERMISSION = "token_permission",
  SPENDING_CAP = "spending_cap",
}

// Constants for Coinbase notification page
const NOTIFICATION_PAGE_PATH = "index.html?inPageRequest=true"
const DEFAULT_VIEWPORT: ViewportSize = { width: 360, height: 580 }

/**
 * Represents the notification popup page in Coinbase Wallet
 * This page handles various notifications like:
 * - Connect to dapp requests
 * - Transaction approvals
 * - Token permissions
 * - Spending cap removals
 */
export class NotificationPage extends BasePage {
  /**
   * Helper method to get notification page URL
   */
  private getNotificationUrl(extensionId: string): string {
    return `chrome-extension://${extensionId}/${NOTIFICATION_PAGE_PATH}`
  }

  /**
   * Helper method to wait for notification page
   */
  private async getNotificationPage(
    extensionId: string,
  ): Promise<import("@playwright/test").Page> {
    return waitForPage(
      this.page.context(),
      this.getNotificationUrl(extensionId),
      DEFAULT_VIEWPORT,
    )
  }
  /**
   * Handles the connect to dapp notification
   */
  async connectToDapp(extensionId: string): Promise<void> {
    const notificationPage = await this.getNotificationPage(extensionId)
    await connectToDapp(notificationPage)
  }

  async confirmTransaction(extensionId: string): Promise<void> {
    const notificationPage = await this.getNotificationPage(extensionId)
    // TODO: Implement transaction confirmation
    await confirmTransaction(notificationPage)
  }

  async rejectTransaction(extensionId: string): Promise<void> {
    const notificationPage = await this.getNotificationPage(extensionId)
    // TODO: Implement transaction rejection
    await rejectTransaction(notificationPage)
  }

  async approveTokenPermission(_extensionId: string): Promise<void> {
    // TODO: Implement token permission approval for Coinbase
    // This should:
    // 1. Handle the token permission popup
    console.log("Approving token permission")
  }

  async rejectTokenPermission(_extensionId: string): Promise<void> {
    // TODO: Implement token permission rejection for Coinbase
    // This should:
    // 1. Handle the token permission popup
    console.log("Rejecting token permission")
  }

  async confirmSpendingCapRemoval(_extensionId: string): Promise<void> {
    // TODO: Implement spending cap removal confirmation for Coinbase
    // This should:
    // 1. Handle the spending cap removal popup
    console.log("Confirming spending cap removal")
  }

  async rejectSpendingCapRemoval(_extensionId: string): Promise<void> {
    // TODO: Implement spending cap removal rejection for Coinbase
    // This should:
    // 1. Handle the spending cap removal popup
    console.log("Rejecting spending cap removal")
  }

  async identifyNotificationType(
    notificationPage: import("@playwright/test").Page,
    _checkTimeout = 10000,
  ): Promise<NotificationPageType> {
    let pageContent = ""
    let mainText = ""
    try {
      // Poll for up to 3 seconds for non-empty body content
      for (let i = 0; i < 10; i++) {
        pageContent = (await notificationPage.textContent("body")) || ""
        if (pageContent.trim()) break
        await notificationPage.waitForTimeout(300)
      }
      // If still empty, try [data-testid="app-main"]
      if (!pageContent.trim()) {
        mainText =
          (await notificationPage.textContent('[data-testid="app-main"]')) || ""
      }
    } catch {
      console.warn(
        "Notification page was closed before type could be identified.",
      )
      throw new Error(
        "Notification popup closed before type could be identified.",
      )
    }

    const checks = [
      { type: NotificationPageType.SIGNATURE, text: "network fee" },
      {
        type: NotificationPageType.SIGNATURE,
        text: "previewing your transaction",
      },
      { type: NotificationPageType.SIGNATURE, text: "signing with" },
      { type: NotificationPageType.CONNECT, text: "connect" },
      // { type: NotificationPageType.TOKEN_PERMISSION, text: "token permission" },
      {
        type: NotificationPageType.SPENDING_CAP,
        text: "Allow Spend Permission",
      },
    ]

    // Case-insensitive search for each check
    for (const { type, text } of checks) {
      if (
        pageContent.toLowerCase().includes(text.toLowerCase()) ||
        mainText.toLowerCase().includes(text.toLowerCase())
      ) {
        return type
      }
    }

    throw new Error(
      `Unknown notification type: no known text found. Body text: ${pageContent.substring(
        0,
        200,
      )} Main text: ${mainText.substring(0, 200)}`,
    )
  }
}
