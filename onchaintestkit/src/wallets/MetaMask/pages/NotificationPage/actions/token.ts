import type { Page } from "@playwright/test"

async function addNew(notificationPage: Page) {
  // click confirm button
  await notificationPage.getByRole("button", { name: "Confirm" }).click()
}

export const token = {
  addNew,
}
