import type { Page } from "@playwright/test"

async function openSettings(page: Page) {
  await page.locator('[data-testid="account-options-menu-button"]').click()
  await page.locator('[data-testid="global-menu-settings"]').click()
}

export const settings = {
  openSettings,
}
