import { Page, test as base } from "@playwright/test"
import { CoinbaseWallet } from "."
import { LocalNodeManager } from "../../node/LocalNodeManager"
import { NodeConfig } from "../../node/types"
import { createTempDir } from "../../utils/createTempDir"
import { getExtensionId } from "../../utils/extensionManager"
import { removeTempDir } from "../../utils/removeTempDir"
import { CoinbaseConfig } from "../../wallets/types"

type CoinbaseFixturesType = {
  _contextPath: string
  coinbase: CoinbaseWallet
  extensionId: string
  coinbasePage: Page
  setupWallet: null
  node: LocalNodeManager
}

let sharedCoinbasePage: Page

export function CoinbaseFixturesBuilder(
  walletConfig: CoinbaseConfig,
  nodeConfig: NodeConfig | undefined,
) {
  return base.extend<CoinbaseFixturesType>({
    // Add node fixture that will start before any wallet setup
    node: nodeConfig
      ? [
          async ({}, use) => {
            try {
              const node = new LocalNodeManager(nodeConfig)
              await node.start()

              console.log(`Node is ready on port ${node.port}`)

              await use(node)

              console.log("Node stopping...")
              await node.stop()
            } catch (error) {
              console.error("Error in node fixture:", error)
              throw error
            }
          },
          { scope: "test", auto: true },
        ]
      : undefined,
    _contextPath: async ({}, use, testInfo) => {
      const contextPath = await createTempDir(testInfo.testId)
      await use(contextPath)
      const error = await removeTempDir(contextPath)
      if (error) {
        console.error(error)
      }
    },
    context: async ({ context: currentContext, _contextPath }, use) => {
      try {
        const { coinbaseContext, coinbasePage } =
          await CoinbaseWallet.initialize(
            currentContext,
            _contextPath,
            walletConfig,
          )
        sharedCoinbasePage = coinbasePage
        await use(coinbaseContext)
        await coinbaseContext.close()
      } catch (error) {
        console.error("Error in context fixture:", error)
        throw error
      }
    },
    coinbasePage: async ({ context: _ }, use) => {
      await use(sharedCoinbasePage)
    },
    extensionId: async ({ context }, use) => {
      try {
        const extensionId = await getExtensionId(
          context,
          "Coinbase Wallet extension",
        )
        await use(extensionId)
      } catch (error) {
        console.error("Error in extensionId fixture:", error)
        throw error
      }
    },
    coinbase: [
      async ({ context, extensionId }, use) => {
        try {
          const coinbase = new CoinbaseWallet(
            walletConfig,
            context,
            sharedCoinbasePage,
            extensionId,
          )
          await use(coinbase)
        } catch (error) {
          console.error("Error in coinbase fixture:", error)
          throw error
        }
      },
      { scope: "test", auto: true },
    ],
    setupWallet: [
      async ({ coinbase, node }, use) => {
        try {
          console.log("Running wallet setup...")

          await walletConfig.walletSetup(coinbase, {
            localNodePort: node.port,
          })

          await use(null)
        } catch (error) {
          console.error("Error in setupWallet fixture:", error)
          throw error
        }
      },
      { scope: "test", auto: true },
    ],
    page: async ({ page }, use) => {
      try {
        await page.goto("/")
        await use(page)
      } catch (error) {
        console.error("Error in page fixture:", error)
        throw error
      }
    },
  })
}
