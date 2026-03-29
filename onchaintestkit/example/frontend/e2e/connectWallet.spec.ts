import { createOnchainTest } from "@coinbase/onchaintestkit"
import { connectWallet } from "./appSession"
import { metamaskWalletConfig } from "./walletConfig/metamaskWalletConfig"

const test = createOnchainTest(metamaskWalletConfig)

test.describe("Connect Wallet", () => {
  test("should connect to wallet", async ({ page, metamask }) => {
    if (!metamask) {
      throw new Error("Metamask is not defined")
    }

    await connectWallet(page, metamask)
  })
})
