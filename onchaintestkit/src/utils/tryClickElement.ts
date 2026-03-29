import type { Locator } from "@playwright/test"
import { ConditionWatcher } from "./ConditionWatcher"

export async function tryClickElement(
  element: Locator,
  shouldClick: () => Promise<boolean>,
  timeoutMs = 3000,
) {
  try {
    // Convert boolean action to nullable result for ConditionWatcher
    const nullableAction = async (): Promise<boolean | null> => {
      const result = await shouldClick()
      return result ? true : null
    }

    await ConditionWatcher.waitForCondition(
      nullableAction,
      timeoutMs,
      "element click condition",
    )
    await element.click()
  } catch {
    // If condition fails, just don't click (same behavior as before)
  }
}
