import { useCallback, useEffect, useState } from 'react';
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

  // Pagination state
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [pageHistory, setPageHistory] = useState<(string | null)[]>([null]); // Track page history for Previous button

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';

  const {
    data: namesData,
    isLoading,
    error,
    refetch,
  } = useQuery<ManagedAddressesResponse>({
    queryKey: ['usernames', address, network, currentPage],
    queryFn: async (): Promise<ManagedAddressesResponse> => {
      try {
        let url = `/api/basenames/getUsernames?address=${address}&network=${network}`;
        if (currentPage) {
          url += `&page=${currentPage}`;
        }

        const response = await fetch(url);
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

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (namesData?.has_more && namesData?.next_page) {
      setPageHistory((prev) => [...prev, currentPage]);
      setCurrentPage(namesData.next_page);
    }
  }, [namesData?.has_more, namesData?.next_page, currentPage]);

  const goToPreviousPage = useCallback(() => {
    if (pageHistory.length > 1) {
      const newHistory = [...pageHistory];
      const previousPage = newHistory.pop(); // Remove current page
      const targetPage = newHistory[newHistory.length - 1]; // Get previous page

      setPageHistory(newHistory);
      setCurrentPage(targetPage);
    }
  }, [pageHistory]);

  // Pagination info - moved above callbacks to avoid initialization issues
  const totalCount = namesData?.total_count ?? 0;
  const hasPrevious = pageHistory.length > 1;
  const hasNext = namesData?.has_more ?? false;
  const currentPageNumber = pageHistory.length; // Page numbers start from 1

  const resetPagination = useCallback(() => {
    setCurrentPage(null);
    setPageHistory([null]);
  }, []);

  // Reset pagination when component mounts or address/network changes
  useEffect(() => {
    resetPagination();
  }, [address, network, resetPagination]);

  return {
    namesData,
    isLoading,
    error,
    refetch,
    // Pagination
    goToNextPage,
    goToPreviousPage,
    resetPagination,
    hasPrevious,
    hasNext,
    totalCount,
    currentPageNumber,
  };
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
