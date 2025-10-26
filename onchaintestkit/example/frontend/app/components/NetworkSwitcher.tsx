"use client"

import * as React from "react"
import { useChainId, useSwitchChain } from "wagmi"

export function NetworkSwitcher() {
  const { chains, switchChain, error, isSuccess, isPending, reset } =
    useSwitchChain()

  const chainId = useChainId()

  // Use React.useEffect to handle client-side updates
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])

  // Find the current chain details
  const currentChain = chains.find(chain => chain.id === chainId)

  // Return null during server-side rendering
  if (!mounted) {
    return (
      <div className="flex flex-col gap-2">
        <div className="text-sm font-medium" data-testid="network-loading">
          Loading network status...
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {/* Current chain display */}
      <div className="text-sm font-medium" data-testid="current-network">
        Current Network:{" "}
        {currentChain ? (
          <span className="text-blue-600">{currentChain.name}</span>
        ) : (
          <span className="text-gray-500">Not connected</span>
        )}
      </div>

      <div className="text-sm mb-2">Available networks:</div>
      <div className="flex flex-col gap-2">
        {chains.map(chain => (
          <button
            key={chain.id}
            onClick={() => {
              reset() // Reset the state before attempting a new switch
              switchChain({ chainId: chain.id })
            }}
            disabled={isPending || chain.id === chainId}
            className={`
              font-bold py-2 px-4 rounded
              ${
                chain.id === chainId
                  ? "bg-green-500 text-white cursor-not-allowed"
                  : "bg-purple-500 hover:bg-purple-700 text-white"
              }
              disabled:opacity-50
            `}
            data-testid={`switch-to-${chain.name
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            {chain.id === chainId
              ? `Connected to ${chain.name}`
              : `Switch to ${chain.name}`}
          </button>
        ))}
      </div>

      {/* Status messages */}
      {isPending && (
        <div
          className="text-sm text-yellow-600"
          data-testid="network-switching"
        >
          Switching network...
        </div>
      )}
      {isSuccess && (
        <div className="text-sm text-green-600" data-testid="network-switched">
          Successfully switched network!
        </div>
      )}
      {error && (
        <div className="text-sm text-red-600" data-testid="network-error">
          Error switching network: {error.message}
        </div>
      )}
    </div>
  )
}
