import type { Page } from "@playwright/test"

const confirmRemoval = async (notificationPage: Page) => {
  await notificationPage.getByRole("button", { name: "Confirm" }).click()
}

const rejectRemoval = async (notificationPage: Page) => {
  await notificationPage.getByRole("button", { name: "Cancel" }).click()
}

export const spendingCapRemoval = {
  confirm: confirmRemoval,
  reject: rejectRemoval,
}
