import type { Page } from "@playwright/test"
import { NetworkConfig } from "../../../../types"

export async function addNetwork(page: Page, network: NetworkConfig) {
  const { name, rpcUrl, chainId, symbol, blockExplorerUrl } = network

  console.log(`Adding network "${name}" with RPC URL: ${rpcUrl}`)

  // Click settings button
  await page.getByTestId("settings-navigation-link").click()

  // Click networks section
  await page.getByTestId("network-setting-cell-pressable").click()

  // Click add network button
  await page.getByTestId("add-custom-network").click()

  const isTestnet =
    name.toLowerCase().includes("test") ||
    name.toLowerCase().includes("sepolia") ||
    name.toLowerCase().includes("goerli")
  if (isTestnet) {
    await page.getByTestId("custom-network-testnet-checkbox").click()
  }

  // Fill in network details
  await page.getByTestId("custom-network-name-input").fill(name)
  if (rpcUrl) {
    await page.getByTestId("custom-network-rpc-url-input").fill(rpcUrl)
  }
  await page
    .getByTestId("custom-network-chain-id-input")
    .fill(chainId.toString())
  await page.getByTestId("custom-network-currency-symbol-input").fill(symbol)

  if (blockExplorerUrl) {
    await page
      .getByTestId("custom-network-block-url-input")
      .fill(blockExplorerUrl)
  }

  // Check testnet checkbox if network is a testnet

  // Save network
  await page.getByTestId("custom-network-save").click()

  // Check if network already exists (handle both error messages)
  const testnetErrorMessage = await page
    .getByText(
      `Testnet chain id: ${chainId} already exists. Please enable testnets from settings.`,
    )
    .isVisible()
    .catch(() => false)
  const networkErrorMessage = await page
    .getByText(
      `Chain id: ${chainId} already exists. Select from default networks.`,
    )
    .isVisible()
    .catch(() => false)

  if (testnetErrorMessage || networkErrorMessage) {
    console.log(
      `Network with chain ID ${chainId} already exists. Editing existing network instead.`,
    )
    await page.waitForTimeout(5000)
    // Go back to the network list
    await page.getByTestId("nav-title-back").click()
    // Click the edit button for the existing network
    if (isTestnet) {
      await page.getByTestId("tabNavigation-tabLabel--testnets").click()
    }

    const testIdName = name.toLowerCase().replace(/\s+/g, "-")
    await page.getByTestId(`list-item-${testIdName}-edit-button`).click()
    await page.waitForTimeout(1000)
    // Edit the network details
    await page.getByTestId("custom-network-name-input").fill(name)
    if (rpcUrl) {
      await page.getByTestId("custom-network-rpc-url-input").fill(rpcUrl)
    }
    // Chain ID
    const chainIdInput = page.getByTestId("custom-network-chain-id-input")
    if (await chainIdInput.isEditable()) {
      await chainIdInput.fill(chainId.toString())
    }

    // Symbol
    const symbolInput = page.getByTestId("custom-network-currency-symbol-input")
    if (await symbolInput.isEditable()) {
      await symbolInput.fill(symbol)
    }
    if (blockExplorerUrl) {
      await page
        .getByTestId("custom-network-block-url-input")
        .fill(blockExplorerUrl)
    }
    // Save the updated network
    const saveButton = page.getByTestId("custom-network-save")
    await saveButton.scrollIntoViewIfNeeded()
    await saveButton.click()
    // No success message, just close the function
    return
  }

  //Click custom network bar
  await page.getByTestId("tabNavigation-tabLabel--custom").click()

  // Wait for success text indicating network was added
  try {
    await page.waitForSelector(`text=${name}`, { timeout: 5000 })
    console.log(`Network "${name}" was successfully added`)
  } catch (error) {
    console.error(`Failed to verify network "${name}" was added:`, error)
    throw new Error(`Failed to verify network "${name}" was added`)
  }
}
