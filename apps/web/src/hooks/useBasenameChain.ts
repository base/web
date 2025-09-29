import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import { base, baseSepolia, Chain } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { cdpBaseRpcEndpoint, cdpBaseSepoliaRpcEndpoint } from 'apps/web/src/cdp/constants';
import { Basename } from '@coinbase/onchainkit/identity';
import { getChainForBasename } from 'apps/web/src/utils/usernames';
import { isDevelopment } from 'apps/web/src/constants';

// Detect automated E2E environment (client or server).
const isE2ETest = process.env.NEXT_PUBLIC_E2E_TEST === 'true' || process.env.E2E_TEST === 'true';

export function getBasenamePublicClient(chainId: number) {
  const rpcEndpoint = chainId === baseSepolia.id ? cdpBaseSepoliaRpcEndpoint : cdpBaseRpcEndpoint;
  const chain = chainId === baseSepolia.id ? baseSepolia : base;

  return createPublicClient({
    chain: chain,
    transport: http(rpcEndpoint),
  });
}

export const supportedChainIds: number[] = [base.id, baseSepolia.id];
export function isBasenameSupportedChain(chainId: number) {
  return supportedChainIds.includes(chainId);
}

export default function useBasenameChain(username?: Basename) {
  const { chain: connectedChain } = useAccount();

  const basenameChain: Chain = useMemo(() => {
    // Assume chain based on name
    if (username) return getChainForBasename(username);

    // User is connected to a valid chain, return the connected chain
    if (connectedChain && supportedChainIds.includes(connectedChain.id)) {
      return connectedChain;
    }

    // Not connected: use Base mainnet when running E2E tests; otherwise default as before
    if (isE2ETest) return base;

    return isDevelopment ? baseSepolia : base;
  }, [connectedChain, username]);

  const basenamePublicClient = getBasenamePublicClient(basenameChain.id);

  return {
    basenameChain,
    basenamePublicClient,
  };
}
