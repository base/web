import type { BrowserContext, Page } from "@playwright/test"
import { LoadingStateDetector } from "./LoadingStateDetector"

export interface ViewportSize {
  width: number
  height: number
}

/**
 * Generic utility to wait for and configure a page by URL
 *
 * @param context - Browser context to search for pages
 * @param pageUrl - Full URL of the page to wait for (e.g., 'chrome-extension://extensionId/notification.html')
 * @param viewport - Optional viewport size (defaults to 360x592 for extension popups)
 * @returns Promise that resolves to the found and configured page
 */
export async function waitForPage(
  context: BrowserContext,
  pageUrl: string,
  viewport?: ViewportSize,
): Promise<Page> {
  const isTargetPage = (page: Page) => page.url().includes(pageUrl)

  let targetPage = context.pages().find(isTargetPage)

  if (!targetPage) {
    targetPage = await context.waitForEvent("page", {
      predicate: isTargetPage,
    })
  }

  // Wait for DOM content to load
  await targetPage.waitForLoadState("domcontentloaded")

  if (viewport) {
    await targetPage.setViewportSize(viewport)
  }

  // Wait for loading indicators to disappear
  await LoadingStateDetector.waitForPageLoadingComplete(targetPage, 10000)

  return targetPage
}
