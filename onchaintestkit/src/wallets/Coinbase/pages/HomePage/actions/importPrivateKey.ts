import type { Page } from "@playwright/test"

export async function importPrivateKey(
  page: Page,
  privateKey: string,
  password: string,
): Promise<void> {
  console.log("Starting private key import process...")

  // Click settings button
  await page.getByTestId("settings-navigation-link").click()

  // Click manage all wallets button
  await page.getByTestId("manage-all-wallets-pressable").click()

  // Try both possible import buttons - one for first time import, one for subsequent imports
  try {
    // First try the button for when no private key is imported yet
    await page
      .getByTestId("add-and-manage-wallets--importNewSecret-cell-pressable")
      .click()
  } catch (error) {
    // If that fails, try the button for when a private key is already imported
    console.log(`${error}First·import·button·not·found,·trying·alternative...`)
    await page
      .getByTestId("manage-wallets-account-item--action-cell-pressable")
      .click()
  }

  // Fill in private key
  await page.getByTestId("secret-input").fill(privateKey)

  // Click import button
  await page.getByTestId("btn-import-wallet").click()

  // Fill in password for verification
  await page.getByTestId("verify-password-input").fill(password)

  // Click verify button
  await page.getByTestId("verify-password-next-btn").click()

  // Wait for success message "Wallet imported."
  try {
    await page.waitForSelector(
      'text="Wallet imported. Balances will appear momentarily."',
      { timeout: 5000 },
    )
    console.log("Private key successfully imported")
  } catch (error) {
    console.error("Failed to verify private key import:", error)
    throw new Error("Failed to verify private key was imported")
  }
}
