import { useAccount } from 'wagmi';
import { useMemo } from 'react';
import { base, baseSepolia, Chain } from 'viem/chains';
import { createPublicClient, http } from 'viem';
import { cdpBaseRpcEndpoint, cdpBaseSepoliaRpcEndpoint } from 'apps/web/src/cdp/constants';
import { Basename } from '@coinbase/onchainkit/identity';
import { getChainForBasename } from 'apps/web/src/utils/usernames';
import { isDevelopment } from 'apps/web/src/constants';

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

    // Not connected, default to Sepolia for development, base for other envs
    return isDevelopment ? baseSepolia : base;
  }, [connectedChain, username]);

  const basenamePublicClient = getBasenamePublicClient(basenameChain.id);

  return {
    basenameChain,
    basenamePublicClient,
  };
}
