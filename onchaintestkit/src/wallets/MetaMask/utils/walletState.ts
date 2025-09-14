import type { Page } from "@playwright/test"
import { LoadingStateDetector } from "../../../utils"

export enum WalletState {
  LOCKED = "locked",
  UNLOCKED = "unlocked",
  ONBOARDING = "onboarding",
}

export async function getWalletState(page: Page): Promise<WalletState> {
  // Wait for MetaMask UI to be fully loaded
  await page.waitForLoadState("domcontentloaded")
  await page.waitForLoadState("networkidle")

  // Wait for any loading indicators to disappear (including MetaMask-specific ones)
  await LoadingStateDetector.waitForPageLoadingComplete(page, 5000, [
    { selector: ".loading-logo", description: "MetaMask loading logo" },
    { selector: ".loading-overlay", description: "MetaMask loading overlay" },
  ])

  const selectors = {
    [WalletState.LOCKED]: ".unlock-page",
    [WalletState.ONBOARDING]: ".onboarding-flow",
    [WalletState.UNLOCKED]: ".home__container",
  }
  for (const [state, selector] of Object.entries(selectors)) {
    if (await page.locator(selector).isVisible()) {
      return state as WalletState
    }
  }
  throw new Error("Unable to determine wallet state")
}
