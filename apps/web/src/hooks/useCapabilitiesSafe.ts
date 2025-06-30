/*
  A hook to safely check wallet_getCapabilities support

  Responsibilities:
  - Check for unsupported wallets (e.g: metamask)
  - Use experimental useCapabilities
  - Check atomicBatch (batchcall) and paymasterService for a given chain
  - Default to false
  - Provide utilities for constructing capabilities objects
*/

import { Chain } from 'viem';
import { base } from 'viem/chains';
import { useAccount } from 'wagmi';
import { useCapabilities } from 'wagmi/experimental';
import { useMemo } from 'react';

// To add a new capability, add it to this list
const CAPABILITIES_LIST = ['atomicBatch', 'paymasterService', 'auxiliaryFunds'] as const;

type ListedCapabilities = (typeof CAPABILITIES_LIST)[number];

export type UseCapabilitiesSafeProps = {
  chainId?: Chain['id'];
};

export type PaymasterCapabilities = {
  paymasterService?: {
    url: string;
  };
};

export default function useCapabilitiesSafe({ chainId }: UseCapabilitiesSafeProps) {
  const { connector, isConnected, chainId: currentChainId } = useAccount();

  // Metamask doesn't support wallet_getCapabilities
  const isMetamaskWallet = connector?.id === 'io.metamask';
  const enabled = isConnected && !isMetamaskWallet;

  const { data: rawCapabilities } = useCapabilities({ query: { enabled } });

  const featureChainId = chainId ?? currentChainId ?? base.id;

  function isCapabilitySupported(capability: ListedCapabilities) {
    return (
      (rawCapabilities && rawCapabilities[featureChainId]?.[capability]?.supported === true) ??
      false
    );
  }

  const capabilities = CAPABILITIES_LIST.reduce((acc, capability) => {
    acc[capability] = isCapabilitySupported(capability);
    return acc;
  }, {} as Record<ListedCapabilities, boolean>);

  // Construct paymaster capabilities object with URL
  const paymasterCapabilities = useMemo((): PaymasterCapabilities => {
    if (!capabilities.paymasterService || !rawCapabilities || !featureChainId) return {};

    const capabilitiesForChain = rawCapabilities[featureChainId];
    if (
      capabilitiesForChain?.['paymasterService'] &&
      capabilitiesForChain['paymasterService'].supported
    ) {
      // Use environment variable for paymaster URL
      const paymasterUrl =
        featureChainId === base.id
          ? process.env.NEXT_PUBLIC_BASE_PAYMASTER_SERVICE
          : process.env.NEXT_PUBLIC_BASE_SEPOLIA_PAYMASTER_SERVICE;

      if (paymasterUrl) {
        return {
          paymasterService: {
            url: paymasterUrl,
          },
        };
      } else {
        console.warn(
          `Paymaster service is supported but no URL configured for chain ${featureChainId}`,
        );
      }
    }
    return {};
  }, [capabilities.paymasterService, rawCapabilities, featureChainId]);

  return {
    ...capabilities,
    rawCapabilities,
    paymasterCapabilities,
  };
}
