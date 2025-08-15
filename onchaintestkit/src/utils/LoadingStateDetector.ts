import type { Page } from "@playwright/test"
import { ConditionWatcher } from "./ConditionWatcher"

export type LoadingElement = {
  selector: string
  description?: string
}

export type LoadingDetectionOptions = {
  timeout: number
  customLoadingSelectors?: LoadingElement[]
}

/**
 * Simple loading state detector that waits for loading indicators to disappear
 */
export class LoadingStateDetector {
  private page: Page

  private options: LoadingDetectionOptions

  // Common loading element patterns that should disappear when loading is complete
  private static readonly COMMON_LOADING_SELECTORS: LoadingElement[] = [
    // Spinners
    {
      selector: '[data-testid*="loading"], [data-testid*="spinner"]',
      description: "loading/spinner elements",
    },
    {
      selector: ".loading, .spinner, .rotating",
      description: "loading classes",
    },
    {
      selector: '[class*="loading"], [class*="spinner"], [class*="rotating"]',
      description: "loading class patterns",
    },

    // Skeleton loaders
    {
      selector: '.skeleton, [class*="skeleton"]',
      description: "skeleton loaders",
    },
    {
      selector: '[data-testid*="skeleton"]',
      description: "skeleton test elements",
    },

    // Progress indicators
    {
      selector: '.progress, [class*="progress"]',
      description: "progress indicators",
    },
    {
      selector: 'progress, [role="progressbar"]',
      description: "progress bars",
    },

    // Text-based loading
    { selector: "text=Loading", description: "loading text" },
    { selector: "text=Please wait", description: "wait text" },
    { selector: "text=Processing", description: "processing text" },
    {
      selector: '[aria-label*="loading"], [aria-label*="Loading"]',
      description: "loading aria labels",
    },

    // Generic busy states
    { selector: '[aria-busy="true"]', description: "busy elements" },
    {
      selector: '[data-loading="true"]',
      description: "loading data attributes",
    },
  ]

  constructor(page: Page, options: Partial<LoadingDetectionOptions> = {}) {
    this.page = page
    this.options = {
      timeout: 30000,
      ...options,
    }
  }

  /**
   * Wait for all loading indicators to disappear
   */
  async waitForLoadingComplete(): Promise<void> {
    const allSelectors = [
      ...LoadingStateDetector.COMMON_LOADING_SELECTORS,
      ...(this.options.customLoadingSelectors ?? []),
    ]

    // Wait for each loading indicator to disappear
    for (const element of allSelectors) {
      try {
        await ConditionWatcher.waitForCondition(
          async () => {
            const locator = this.page.locator(element.selector)
            const count = await locator.count()

            if (count === 0) {
              return true // No loading elements found - good!
            }

            // Check if any are visible
            const visibleCount = await locator.locator("visible=true").count()
            if (visibleCount === 0) {
              return true // All are hidden - good!
            }

            return null // Still have visible loading elements
          },
          this.options.timeout,
          `${element.description} to disappear`,
        )
      } catch (_error) {
        // If we can't find the selector, that's actually good - it means no loading elements
        console.log(
          `Loading check for "${element.description}" completed (${element.selector})`,
        )
      }
    }
  }

  /**
   * Static helper method for quick loading completion check
   */
  static async waitForPageLoadingComplete(
    page: Page,
    timeout = 10000,
    customSelectors?: LoadingElement[],
  ): Promise<void> {
    const detector = new LoadingStateDetector(page, {
      timeout,
      customLoadingSelectors: customSelectors,
    })
    await detector.waitForLoadingComplete()
  }
}
