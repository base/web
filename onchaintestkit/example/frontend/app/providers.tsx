"use client"

import { OnchainKitProvider } from "@coinbase/onchainkit"
import type { ReactNode } from "react"
import { useState } from "react"
import { WagmiProvider } from "wagmi"
import { baseSepolia } from "wagmi/chains"
import { getConfig } from "./config"

export function Providers(props: { children: ReactNode }) {
  const [config] = useState(() => getConfig())

  return (
    <WagmiProvider config={config}>
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
        chain={baseSepolia}
        config={{
          appearance: {
            mode: "auto",
          },
          wallet: {
            display: "modal",
          },
        }}
      >
        {props.children}
      </OnchainKitProvider>
    </WagmiProvider>
  )
}
