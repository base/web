import type { Page } from "@playwright/test"
import { NetworkConfig } from "../../../../types"
import { closePopup, popupConfigs } from "../actions/handlePopups"

export async function addNetwork(page: Page, network: NetworkConfig) {
  const { name, rpcUrl, chainId, symbol, blockExplorerUrl } = network

  console.log(`Adding network "${name}" with RPC URL: ${rpcUrl}`)

  await page.locator('[data-testid="network-display"]').click()

  // click "Add a custom network" button
  await page.getByRole("button", { name: "Add a custom network" }).click()
  // fill the network name input with id="networkName"
  await page.locator("#networkName").fill(name)
  // fill chain id input with id="chainId"
  await page.locator("#chainId").fill(chainId.toString())
  // fill currency symbol input with id="nativeCurrency"
  await page.locator("#nativeCurrency").fill(symbol)
  // click the default rpc url dropdown button - label="Default RPC URL"
  await page.getByLabel("Default RPC URL").click()
  // click "Add RPC URL" button
  await page.getByRole("button", { name: "Add RPC URL" }).click()
  // fill rpc url input with id="rpcUrl"
  await page.locator("#rpcUrl").fill(rpcUrl)
  // fill rpc name input with id="rpcName"
  await page.locator("#rpcName").fill(name)
  // click "Add URL" button
  await page.getByRole("button", { name: "Add URL" }).click()

  if (blockExplorerUrl) {
    await page.locator("#blockExplorerUrl").fill(blockExplorerUrl)
  }

  // click "Save" button
  await page.getByRole("button", { name: "Save" }).click()

  await closePopup(page, popupConfigs.networkAdded)
  await closePopup(page, popupConfigs.networkInfo)
}
