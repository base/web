import type { Page } from "@playwright/test"

const confirmTransaction = async (notificationPage: Page) => {
  await notificationPage.getByRole("button", { name: "Confirm" }).click()
}

const rejectTransaction = async (notificationPage: Page) => {
  await notificationPage.getByRole("button", { name: "Cancel" }).click()
}

export const transaction = {
  confirm: confirmTransaction,
  reject: rejectTransaction,
}
