import type { Page } from "@playwright/test"
import { type ViewportSize, waitForPage } from "../../../../utils"
import { spendingCapRemoval } from "../../pages/NotificationPage/actions/spendingCap"
import {
  approvePermission,
  connectToDapp,
  network,
  token,
  transaction,
} from "./actions"

export enum NotificationPageType {
  SpendingCap = "spending-cap",
  Signature = "signature",
  Transaction = "transaction",
  RemoveSpendCap = "remove-spend-cap",
}

// Constants for MetaMask notification page
const NOTIFICATION_PAGE_PATH = "notification.html"
const DEFAULT_VIEWPORT: ViewportSize = { width: 360, height: 580 }

export class NotificationPage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  /**
   * Helper method to get notification page URL
   */
  private getNotificationUrl(extensionId: string): string {
    return `chrome-extension://${extensionId}/${NOTIFICATION_PAGE_PATH}`
  }

  /**
   * Helper method to wait for notification page
   */
  private async getNotificationPage(extensionId: string): Promise<Page> {
    return waitForPage(
      this.page.context(),
      this.getNotificationUrl(extensionId),
      DEFAULT_VIEWPORT,
    )
  }

  async connectToDapp(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await connectToDapp(notificationPage)
  }

  async approveNewNetwork(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await network.approveNewNetwork(notificationPage)
  }

  async rejectNewNetwork(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await network.rejectNewNetwork(notificationPage)
  }

  async approveSwitchNetwork(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await network.approveSwitchNetwork(notificationPage)
  }

  async rejectSwitchNetwork(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await network.rejectSwitchNetwork(notificationPage)
  }

  async approveAddNetwork(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await network.approveNewNetwork(notificationPage)
  }

  async rejectAddNetwork(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await network.rejectNewNetwork(notificationPage)
  }

  async confirmTransaction(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await transaction.confirm(notificationPage)
  }

  async rejectTransaction(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await transaction.reject(notificationPage)
  }

  async approveTokenPermission(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await approvePermission.approve(notificationPage)
  }

  async rejectTokenPermission(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await approvePermission.reject(notificationPage)
  }

  async confirmSpendingCapRemoval(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await spendingCapRemoval.confirm(notificationPage)
  }

  async rejectSpendingCapRemoval(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await spendingCapRemoval.reject(notificationPage)
  }

  async addNewToken(extensionId: string) {
    const notificationPage = await this.getNotificationPage(extensionId)
    await token.addNew(notificationPage)
  }

  async identifyNotificationType(
    extensionId: string,
    globalTimeout = 15000,
    checkTimeout = 10000,
  ): Promise<NotificationPageType> {
    // Get the notification page and wait for it to load fully
    const notificationPage = await this.getNotificationPage(extensionId)

    // Give the page an extra moment to fully render and stabilize
    await notificationPage.waitForTimeout(500)

    // Simple checks that should work
    const checks = [
      { type: NotificationPageType.SpendingCap, text: "Spending cap request" },
      { type: NotificationPageType.Signature, text: "Signature request" },
      { type: NotificationPageType.Transaction, text: "Network fee" },
      { type: NotificationPageType.RemoveSpendCap, text: "Remove Permission" },
    ]

    // Immediately log the full page content for comparison
    void (async () => {
      try {
        const pageContent =
          (await notificationPage.textContent("body"))?.substring(0, 100) ?? ""
        console.log("Page content at start of detection:", pageContent)

        // For each check, log if its text is present in the content
        checks.forEach(({ type, text }) => {
          const isPresent = pageContent.includes(text)
          console.log(
            `Check for "${text}" (${type}): ${
              isPresent ? "FOUND in content" : "NOT FOUND in content"
            }`,
          )
        })
      } catch (error) {
        console.error("Error capturing initial page content:", error)
      }
    })()

    // Create timeout ID for cleanup
    let timeoutId: NodeJS.Timeout | undefined

    // Create a promise that will reject after the global timeout
    const timeoutPromise = new Promise<NotificationPageType>((_, reject) => {
      timeoutId = setTimeout(() => {
        // Use an IIFE to capture page content, but properly void the promise
        void (function captureDebugInfo() {
          const capturePromise = (async () => {
            try {
              // Only capture info if page is still available
              if (notificationPage.isClosed()) {
                console.log("Page already closed, skipping debug capture")
                return
              }

              // When timeout occurs, log the entire page content to help debugging
              const pageContent =
                (await notificationPage.textContent("body"))?.substring(
                  0,
                  100,
                ) ?? ""
              console.log("Global timeout reached. Page content:", pageContent)

              // Take a screenshot for visual debugging
              await notificationPage.screenshot({
                path: "notification-timeout.png",
              })
              console.log("Screenshot saved as notification-timeout.png")

              // Debug each selector specifically
              for (const { type, text } of checks) {
                try {
                  // Try to get the element even if not visible
                  const element = notificationPage.getByText(text, {
                    exact: false,
                  })
                  const count = await element.count()
                  const isVisible =
                    count > 0
                      ? await element.isVisible().catch(() => false)
                      : false
                  console.log(
                    `Selector debug for "${text}" (${type}): count=${count}, visible=${isVisible}`,
                  )
                } catch (error) {
                  console.error(`Error checking selector for "${text}":`, error)
                }
              }
            } catch (error) {
              console.error("Error capturing page content on timeout:", error)
            }
          })()

          // Explicitly void the promise to satisfy linter
          void capturePromise
        })()

        reject(new Error("Timeout waiting for notification type"))
      }, globalTimeout)
    })

    // Create a promise that resolves with the first matching notification type
    const checkTypePromise = new Promise<NotificationPageType>(
      (resolve, _reject) => {
        // Check each notification type with debug logging
        checks.forEach(({ type, text }) => {
          void (async () => {
            try {
              const selector = notificationPage.getByText(text, {
                exact: false,
              })

              // Log when we start checking each selector
              console.log(`Starting check for "${text}" (${type})`)

              // Wait for the text to be visible with individual timeout
              const isVisible = await selector
                .isVisible({ timeout: checkTimeout })
                .catch((error: Error) => {
                  console.log(
                    `Selector for "${text}" timed out with error:`,
                    error.message,
                  )
                  return false
                })

              if (isVisible) {
                console.log(
                  `Found notification type: ${type} with text: "${text}"`,
                )
                resolve(type)
              } else {
                console.log(
                  `Selector for "${text}" didn't match any visible elements`,
                )
              }
            } catch (error) {
              console.error(`Error checking type ${type}:`, error)
            }
          })()
        })
      },
    )

    try {
      // Race between finding a match and the global timeout
      const result = await Promise.race([checkTypePromise, timeoutPromise])
      return result
    } finally {
      // Always clear the timeout to prevent it from running after page is closed
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }
}
