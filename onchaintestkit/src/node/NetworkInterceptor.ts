import { BrowserContext, Page } from "@playwright/test"
import { spawn } from "child_process"
import { writeFileSync } from "fs"
import * as path from "path"

/**
 * Interface for JSON-RPC request structure
 */
type JsonRpcRequest = {
  jsonrpc: string
  id: number
  method: string
  params: any[]
}

export async function startAltoWithDynamicPort(nodePort: number): Promise<void> {
  const projectRoot = process.cwd().includes('/apps/web')
    ? path.join(process.cwd(), '../..')
    : process.cwd()
  const altoPath = path.join(projectRoot, "alto")
  const configPath = path.join(altoPath, "alto-dynamic-config.json")

  const altoConfig = {
    "entrypoints": "0x0000000071727De22E5E9d8BAf0edAc6f37da032,0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    "executor-private-keys": "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    "utility-private-key": "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
    "rpc-url": `http://localhost:${nodePort}`,
    "safe-mode": false,
    "port": 4337
  }

  writeFileSync(configPath, JSON.stringify(altoConfig, null, 2))

  const g = global as any
  try {
    const existing: any = g.__altoProcess
    if (existing && typeof existing.pid === 'number') {
      try { process.kill(existing.pid) } catch {}
    }
  } catch {}

  const altoProcess = spawn("./alto", ["run", "--config", "alto-dynamic-config.json"], {
    cwd: altoPath,
    stdio: "inherit",
    detached: true
  })

  try {
    (global as any).__altoProcess = altoProcess
    altoProcess.on('exit', () => {
      try { if ((global as any).__altoProcess === altoProcess) (global as any).__altoProcess = undefined } catch {}
    })
  } catch {}

  altoProcess.unref()
}

/**
 * Sets up request interception to replace the default localhost port in RPC URLs
 * with the dynamic port provided by localNodeManager
 *
 * @param pageOrContext - Playwright Page or BrowserContext to apply the route to
 * @param localNodePort - The actual port number from localNodeManager
 */
export async function setupRpcPortInterceptor(
  pageOrContext: Page | BrowserContext,
  localNodePort: number,
): Promise<void> {
  console.log("🔧 NetworkInterceptor.setupRpcPortInterceptor called with port:", localNodePort)
  console.log("🔧 pageOrContext type:", pageOrContext.constructor.name)

  // Ensure Alto is started against the current Anvil port
  await startAltoWithDynamicPort(localNodePort)
  
  // Redirect localhost:8545 to actual local node port
  await pageOrContext.route("http://localhost:8545", async route => {
    try {
      const newUrl = `http://localhost:${localNodePort}`
      await route.continue({ url: newUrl })
    } catch (error) {
      console.log("Route handler error (localhost:8545):", error instanceof Error ? error.message : String(error))
      // Ignore errors when page/context is closed
    }
  })

  // Log coinbase requests specifically (no catch-all to avoid conflicts)
  await pageOrContext.route("**/keys.coinbase.com/**", async route => {
    try {
      const url = route.request().url()
      console.log("request.url()", url)
      const postData = route.request().postDataJSON()
      if (postData) {
        console.log("request.postDataJSON()", postData)
      }
      await route.continue()
    } catch (error) {
      console.log("Route handler error (keys.coinbase.com):", error instanceof Error ? error.message : String(error))
      // Ignore errors when page/context is closed
    }
  })

  // Main Coinbase chain proxy interception - CATCH ALL TARGETS
  await pageOrContext.route("https://chain-proxy.wallet.coinbase.com/**", async route => {
    try {
      const request = route.request()
      const postData = request.postDataJSON() as JsonRpcRequest | null
      const url = request.url()
      
      console.log("Intercepting Coinbase chain proxy request:", url)
      console.log("Request data:", postData)
      
      // if the request is to http://localhost:8545, then we need to redirect it to http://localhost:${localNodePort}
      if (url.includes("http://localhost:8545")) {
        const newUrl = `http://localhost:${localNodePort}`
        await route.continue({ url: newUrl })
      } else {
        // Continue with original request if not redirecting
        await route.continue()
      }
    } catch (error) {
      console.log("Route handler error (chain-proxy):", error instanceof Error ? error.message : String(error))
      // Ignore errors when page/context is closed
    }
  })

  console.log(`✅ RPC interception set up: localhost:8545 → localhost:${localNodePort}`)
}
