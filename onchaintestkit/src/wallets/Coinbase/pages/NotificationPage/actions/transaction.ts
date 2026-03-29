import type { Page } from "@playwright/test"

/**
 * Confirms a transaction in the Coinbase Wallet notification popup
 * @param page - The notification page
 */
export const confirmTransaction = async (page: Page): Promise<void> => {
  // Click the confirm/approve button
  await page.getByTestId("request-confirm-button").click()
}

/**
 * Rejects a transaction in the Coinbase Wallet notification popup
 * @param page - The notification page
 */
export const rejectTransaction = async (page: Page): Promise<void> => {
  // Click the reject/cancel button
  await page.getByTestId("request-cancel-button").click()
}
