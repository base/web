import { useReadContract } from 'wagmi';
import BaseRegistrarAbi from 'apps/web/src/abis/BaseRegistrarAbi';
import { USERNAME_BASE_REGISTRAR_ADDRESSES } from 'apps/web/src/addresses/usernames';
import {
  getTokenIdFromBasename,
  formatBaseEthDomain,
  getChainForBasename,
  GRACE_PERIOD_DURATION_SECONDS,
} from 'apps/web/src/utils/usernames';
import { Basename } from '@coinbase/onchainkit/identity';

export function useBasenamesNameExpires(name: string) {
  // Convert name to full basename format
  const fullBasename = name.includes('.') ? (name as Basename) : formatBaseEthDomain(name, 8453); // Base mainnet
  const chain = getChainForBasename(fullBasename);
  const tokenId = getTokenIdFromBasename(fullBasename);

  const { data: nameExpiresTimestamp } = useReadContract({
    abi: BaseRegistrarAbi,
    address: USERNAME_BASE_REGISTRAR_ADDRESSES[chain.id],
    functionName: 'nameExpires',
    args: [tokenId],
    chainId: chain.id,
  });

  // Add 90 days (grace period) to get the auction start time
  const auctionStartTime = nameExpiresTimestamp
    ? nameExpiresTimestamp + BigInt(GRACE_PERIOD_DURATION_SECONDS)
    : undefined;

  return { data: auctionStartTime };
}
