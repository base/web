import { Page } from "@playwright/test"

/**
 * Handles the connect to dapp notification in Coinbase Wallet
 *
 * @param page - The Playwright page object representing the notification page
 */
export async function connectToDapp(page: Page): Promise<void> {
  // Wait for the notification to appear
  await page.waitForLoadState("domcontentloaded")

  // Click connect button
  await page.locator('[data-testid="allow-authorize-button"]').click()

  // Wait for notification page to close
  await page.waitForEvent("close")
}
