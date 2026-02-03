import type { Page } from "@playwright/test"

export async function connectToDapp(notificationPage: Page) {
  // Click `Connect` btn
  await notificationPage.getByRole("button", { name: "Connect" }).click()
  // wait till notification page is closed or context is closed
  await notificationPage.waitForEvent("close")
}
