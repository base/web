import type { Page } from "@playwright/test"

const approveTokenPermission = async (notificationPage: Page) => {
  // click "Confirm" button
  await notificationPage.getByRole("button", { name: "Confirm" }).click()
  // wait for the page to be closed
  await notificationPage
    .waitForSelector("*", { state: "detached" })
    .catch(() => {
      // Page is already closed, which is what we want
    })
}

const rejectTokenPermission = async (notificationPage: Page) => {
  await notificationPage.getByRole("button", { name: "Reject" }).click()
  // wait for the page to be closed
  await notificationPage
    .waitForSelector("*", { state: "detached" })
    .catch(() => {
      // Page is already closed, which is what we want
    })
}

export const approvePermission = {
  approve: approveTokenPermission,
  reject: rejectTokenPermission,
}
