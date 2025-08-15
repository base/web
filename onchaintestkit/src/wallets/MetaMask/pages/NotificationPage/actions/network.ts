import type { Page } from "@playwright/test"

const approveNewNetwork = async (notificationPage: Page) => {
  // click approve button
  await notificationPage.getByRole("button", { name: "Approve" }).click()
}

const rejectNewNetwork = async (notificationPage: Page) => {
  // click cancel button
  await notificationPage.getByRole("button", { name: "Cancel" }).click()
}

const approveSwitchNetwork = async (notificationPage: Page) => {
  // click switch network button
  await notificationPage.getByRole("button", { name: "Switch Network" }).click()
}

const rejectSwitchNetwork = async (notificationPage: Page) => {
  // click cancel button
  await notificationPage.getByRole("button", { name: "Cancel" }).click()
}

export const network = {
  approveNewNetwork,
  rejectNewNetwork,
  approveSwitchNetwork,
  rejectSwitchNetwork,
}
