import { useReadContract } from 'wagmi';
import { namehash, type Address } from 'viem';
import { type Basename } from '@coinbase/onchainkit/identity';
import { getChainForBasename } from 'apps/web/src/utils/usernames';
import { USERNAME_BASE_REGISTRY_ADDRESSES } from 'apps/web/src/addresses/usernames';
import RegistryAbi from 'apps/web/src/abis/RegistryAbi';

export type UseBasenameResolverProps = {
  username: Basename;
};

export type UseBasenameResolverReturn = {
  data: Address | undefined;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<unknown>;
};

/**
 * Hook to fetch the resolver contract address for a given basename from the registry contract
 */
export default function useBasenameResolver({
  username,
}: UseBasenameResolverProps): UseBasenameResolverReturn {
  const chain = getChainForBasename(username);
  const nodeHash = namehash(username as string);

  const {
    data: resolverAddress,
    isError,
    error,
    refetch,
  } = useReadContract({
    abi: RegistryAbi,
    address: USERNAME_BASE_REGISTRY_ADDRESSES[chain.id],
    functionName: 'resolver',
    args: [nodeHash],
    query: {
      enabled: !!username,
      refetchOnWindowFocus: false,
    },
  });

  return {
    data: resolverAddress as Address | undefined,
    isError,
    error,
    refetch,
  };
}
