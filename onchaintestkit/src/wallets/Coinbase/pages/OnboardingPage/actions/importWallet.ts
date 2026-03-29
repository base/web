import type { Page } from "@playwright/test"

/**
 * Imports a wallet using a seed phrase and password
 * @param page - The Playwright page object
 * @param seedPhrase - The seed phrase to import
 * @param password - The password to set for the wallet
 */
export async function importWallet(
  page: Page,
  seedPhrase: string,
  password: string,
): Promise<void> {
  console.log("Starting wallet import process in extension...")

  try {
    // Wait for the extension UI to be ready
    await page.waitForLoadState("networkidle")
    await page.waitForSelector('[data-testid="btn-import-existing-wallet"]', {
      timeout: 10000,
    })

    // Click "I already have a wallet"
    await page.locator('[data-testid="btn-import-existing-wallet"]').click()
    await page.waitForLoadState("networkidle")

    // Click "Recovery phrase" option
    await page.locator('[data-testid="btn-import-recovery-phrase"]').click()
    await page.waitForLoadState("networkidle")

    // Click "Acknowledge" button if present
    try {
      await page.locator('button:has-text("Acknowledge")').click()
      await page.waitForLoadState("networkidle")
    } catch (_error) {
      console.log("No acknowledge button found, continuing...")
    }

    // Enter seed phrase in single input
    await page.locator('[data-testid="secret-input"]').fill(seedPhrase)
    await page.waitForTimeout(500) // Small delay to ensure input is registered

    // Import wallet button
    await page.locator('[data-testid="btn-import-wallet"]').click()
    await page.waitForLoadState("networkidle")

    // Enter and confirm password
    await page.locator('[data-testid="setPassword"]').fill(password)
    await page.waitForTimeout(500)
    await page.locator('[data-testid="setPasswordVerify"]').fill(password)
    await page.waitForTimeout(500)

    // Accept terms
    await page.locator('[data-testid="terms-and-privacy-policy"]').click()
    await page.waitForTimeout(500)

    // Click Submit/Import button
    await page.locator('[data-testid="btn-password-continue"]').click()

    // Wait for import to complete and wallet to be ready
    await page.waitForSelector('[data-testid="app-main"]', {
      timeout: 30000,
      state: "visible",
    })

    console.log("Wallet import completed successfully")
  } catch (error) {
    console.error("Error during wallet import:", error)
    throw error
  }
}
