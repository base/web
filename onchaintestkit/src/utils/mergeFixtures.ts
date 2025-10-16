import { mergeTests, test as base } from "@playwright/test"
import type { Fixtures, TestType } from "@playwright/test"

export function mergeFixtures<CustomFixtures extends Fixtures>(
  customFixtures: TestType<CustomFixtures, object>,
): TestType<CustomFixtures, object> {
  return mergeTests(base, customFixtures)
}
