import { useReadContract } from 'wagmi';
import useBasenameChain from 'apps/web/src/hooks/useBasenameChain';
import BaseRegistrarAbi from 'apps/web/src/abis/BaseRegistrarAbi';
import { USERNAME_BASE_REGISTRAR_ADDRESSES } from 'apps/web/src/addresses/usernames';
import {
  getTokenIdFromBasename,
  formatBaseEthDomain,
  GRACE_PERIOD_DURATION_SECONDS,
} from 'apps/web/src/utils/usernames';
import { Basename } from '@coinbase/onchainkit/identity';
import { useMemo } from 'react';

export function useBasenamesNameExpiresWithGracePeriod(name: string) {
  const chain = useBasenameChain().basenameChain.id;
  const fullBasename = name.includes('.') ? (name as Basename) : formatBaseEthDomain(name, chain);
  const tokenId = getTokenIdFromBasename(fullBasename);

  const contractResult = useReadContract({
    abi: BaseRegistrarAbi,
    address: USERNAME_BASE_REGISTRAR_ADDRESSES[chain],
    functionName: 'nameExpires',
    args: [tokenId],
    chainId: chain,
  });

  // Add 90 days (grace period) to get the auction start time
  const auctionStartTime = useMemo(() => {
    if (contractResult.data === undefined || contractResult.data === null) {
      return undefined;
    }
    return contractResult.data + BigInt(GRACE_PERIOD_DURATION_SECONDS);
  }, [contractResult.data]);

  return {
    data: auctionStartTime,
    isLoading: contractResult.isLoading,
    isError: contractResult.isError,
    error: contractResult.error,
    refetch: contractResult.refetch,
  };
}
