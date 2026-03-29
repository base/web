import { http, cookieStorage, createConfig, createStorage } from "wagmi"
import { baseSepolia, mainnet } from "wagmi/chains"

// Create and export the Wagmi config
export function getConfig() {
  return createConfig({
    chains: [mainnet, baseSepolia],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http("http://localhost:8545"),
      [baseSepolia.id]: http("http://localhost:8545"),
    },
  })
}

// Add type registration for better TypeScript support
declare module "wagmi" {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
