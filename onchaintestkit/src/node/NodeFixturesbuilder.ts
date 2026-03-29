import { test as base } from "@playwright/test"
import { OnchainFixtures } from "../types"
import { LocalNodeManager } from "./LocalNodeManager"
import { NodeConfig } from "./types"

export class NodeFixturesBuilder {
  private config: NodeConfig

  constructor(config: NodeConfig = {}) {
    this.config = config
  }

  /**
   * Creates a test fixture that manages a local Anvil node
   * The node will be started before the test and stopped after
   */
  build() {
    return base.extend<OnchainFixtures>({
      node: [
        async ({}, use) => {
          console.log("Starting node...")
          const node = new LocalNodeManager(this.config)
          await node.start()
          console.log("Node is ready")
          await use(node)
          await node.stop()
        },
        { scope: "test", auto: true },
      ],
    })
  }
}
