import { Locator } from "@playwright/test"

/**
 * Get all text contents from an array of locators
 */
export async function allTextContents(locators: Locator[]): Promise<string[]> {
  const textContents: string[] = []

  for (const locator of locators) {
    const text = await locator.textContent()
    if (text) {
      textContents.push(text)
    }
  }

  return textContents
}
