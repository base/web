import { Page } from "@playwright/test"
import { Network } from "../../type/Network"
import { addNetwork } from "./actions/addNetwork"

export class HomePage {
  private readonly page: Page

  constructor(page: Page) {
    this.page = page
  }

  async addNetwork(network: Network): Promise<void> {
    await addNetwork(this.page, network)
  }

  async importPrivateKey(_privateKey: string): Promise<void> {
    // TODO: a more stable implementation needed
  }

  async switchNetwork(networkName: string, isTestnet: boolean): Promise<void> {
    // Implementation would switch to the specified network
    console.log(`Switching to network: ${networkName}, isTestnet: ${isTestnet}`)
  }

  async switchAccount(accountName: string): Promise<void> {
    // Implementation would switch to the specified account
    console.log(`Switching to account: ${accountName}`)
  }
}
