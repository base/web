import { useCallback, useEffect } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAccount, useChainId } from 'wagmi';
import { ManagedAddressesResponse } from 'apps/web/src/types/ManagedAddresses';
import useSetPrimaryBasename from 'apps/web/src/hooks/useSetPrimaryBasename';
import { Basename } from '@coinbase/onchainkit/identity';

export function useNameList() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { logError } = useErrors();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';

  const {
    data: namesData,
    isLoading,
    error,
    refetch,
  } = useQuery<ManagedAddressesResponse>({
    queryKey: ['usernames', address, network],
    queryFn: async (): Promise<ManagedAddressesResponse> => {
      try {
        const response = await fetch(
          `/api/basenames/getUsernames?address=${address}&network=${network}`,
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch usernames: ${response.statusText}`);
        }
        return (await response.json()) as ManagedAddressesResponse;
      } catch (err) {
        logError(err, 'Failed to fetch usernames');
        throw err;
      }
    },
    enabled: !!address,
  });

  return { namesData, isLoading, error, refetch };
}

export function useRemoveNameFromUI(domain: Basename) {
  const { address } = useAccount();
  const chainId = useChainId();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';
  const queryClient = useQueryClient();

  const removeNameFromUI = useCallback(() => {
    queryClient.setQueryData(
      ['usernames', address, network],
      (prevData: ManagedAddressesResponse) => {
        return { ...prevData, data: prevData.data.filter((name) => name.domain !== domain) };
      },
    );
  }, [address, domain, network, queryClient]);

  return { removeNameFromUI };
}

export function useUpdatePrimaryName(domain: Basename) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { logError } = useErrors();

  const queryClient = useQueryClient();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';

  // Hook to update primary name
  const { setPrimaryName, transactionIsSuccess } = useSetPrimaryBasename({
    secondaryUsername: domain,
  });

  const setPrimaryUsername = useCallback(async () => {
    try {
      await setPrimaryName();
    } catch (error) {
      logError(error, 'Failed to update primary name');
      throw error;
    }
  }, [logError, setPrimaryName]);

  useEffect(() => {
    if (transactionIsSuccess) {
      queryClient.setQueryData(
        ['usernames', address, network],
        (prevData: ManagedAddressesResponse) => {
          return {
            ...prevData,
            data: prevData.data.map((name) =>
              name.domain === domain
                ? { ...name, is_primary: true }
                : name.is_primary
                ? { ...name, is_primary: false }
                : name,
            ),
          };
        },
      );
    }
  }, [transactionIsSuccess, address, domain, network, queryClient]);

  return { setPrimaryUsername };
}
