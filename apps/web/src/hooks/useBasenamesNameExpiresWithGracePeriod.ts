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
import { logger } from 'apps/web/src/utils/logger';

export function useBasenamesNameExpiresWithGracePeriod(name: string) {
  const chain = useBasenameChain().basenameChain.id;
  const fullBasename = name.includes('.') ? (name as Basename) : formatBaseEthDomain(name, chain);
  const tokenId = getTokenIdFromBasename(fullBasename);

  const { data: nameExpiresTimestamp } = useReadContract({
    abi: BaseRegistrarAbi,
    address: USERNAME_BASE_REGISTRAR_ADDRESSES[chain],
    functionName: 'nameExpires',
    args: [tokenId],
    chainId: chain,
  });

  if (!nameExpiresTimestamp) {
    const errorMessage = `Unable to retrieve expiration timestamp for name: ${name}`;
    logger.error(errorMessage, {
      name,
      fullBasename,
      chain,
      context: 'useBasenamesNameExpiresWithGracePeriod',
    });
    throw new Error(errorMessage);
  }

  // Add 90 days (grace period) to get the auction start time
  const auctionStartTime = nameExpiresTimestamp + BigInt(GRACE_PERIOD_DURATION_SECONDS);

  return { data: auctionStartTime };
}
