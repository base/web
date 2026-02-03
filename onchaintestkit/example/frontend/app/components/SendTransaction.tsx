"use client"

import * as React from "react"
import { parseEther } from "viem"
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi"

export function SendTransaction() {
  const { data, error, isPending, sendTransaction } = useSendTransaction()

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const to = formData.get("address") as `0x${string}`
    const value = formData.get("value") as string

    try {
      sendTransaction({
        to,
        value: parseEther(value),
      })
    } catch (err) {
      console.error("Failed to send transaction:", err)
    }
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: data,
    })

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={submit} className="flex flex-col gap-2">
        <input
          name="address"
          placeholder="0xA0Cf…251e"
          required
          className="px-4 py-2 border rounded"
          data-testid="send-address-input"
        />
        <input
          name="value"
          placeholder="0.05"
          required
          className="px-4 py-2 border rounded"
          data-testid="send-amount-input"
        />
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          data-testid="send-transaction-button"
        >
          {isPending ? "Confirming..." : "Send"}
        </button>
      </form>

      {data && (
        <div className="text-sm" data-testid="transaction-hash">
          Transaction Hash: <span className="font-mono">{data}</span>
        </div>
      )}

      {isConfirming && (
        <div
          className="text-sm text-yellow-600"
          data-testid="transaction-confirming"
        >
          Waiting for confirmation...
        </div>
      )}

      {isConfirmed && (
        <div
          className="text-sm text-green-600"
          data-testid="transaction-confirmed"
        >
          Transaction confirmed!
        </div>
      )}

      {error && (
        <div className="text-sm text-red-600" data-testid="transaction-error">
          Error: {error.message}
        </div>
      )}
    </div>
  )
}
