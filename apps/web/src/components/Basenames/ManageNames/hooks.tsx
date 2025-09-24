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

  // Pagination state - need to maintain a stack of page tokens for proper back navigation
  const [currentPage, setCurrentPage] = useState<string | null>(null);
  const [pageStack, setPageStack] = useState<(string | null)[]>([null]); // Stack of page tokens for history
  const [pageNumber, setPageNumber] = useState<number>(1);

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
    placeholderData: (prev) => prev,
  });

  // Navigation functions
  const goToNextPage = useCallback(() => {
    if (namesData?.has_more && namesData?.next_page) {
      // Push current page to history stack and move to next page
      setPageStack((prev) => [...prev, currentPage]);
      setCurrentPage(namesData.next_page);
      setPageNumber((prev) => prev + 1);
    }
  }, [namesData?.has_more, namesData?.next_page, currentPage]);

  const goToPreviousPage = useCallback(() => {
    if (pageStack.length > 1) {
      // Pop from stack to get the page token to go back to
      const newStack = [...pageStack];
      const targetPageToken = newStack.pop(); // This is the page we want to go back to

      if (targetPageToken !== undefined) {
        setPageStack(newStack);
        setCurrentPage(targetPageToken);
        setPageNumber((prev) => prev - 1);
      }
    }
  }, [pageStack]);

  const resetPagination = useCallback(() => {
    setCurrentPage(null);
    setPageStack([null]);
    setPageNumber(1);
  }, []);

  // Pagination info
  const totalCount = namesData?.total_count ?? 0;
  const hasPrevious = pageStack.length > 1;
  const hasNext = namesData?.has_more ?? false;
  const currentPageNumber = pageNumber;

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

export function useRemoveNameFromUI() {
  const { address } = useAccount();
  const chainId = useChainId();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';
  const queryClient = useQueryClient();

  const removeNameFromUI = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ['usernames', address, network] });
  }, [address, network, queryClient]);

  return { removeNameFromUI };
}

export function useUpdatePrimaryName(domain: Basename) {
  const { address } = useAccount();
  const chainId = useChainId();
  const { logError } = useErrors();

  const queryClient = useQueryClient();

  const network = chainId === 8453 ? 'base-mainnet' : 'base-sepolia';

  // Hook to update primary name
  const { setPrimaryName, transactionIsSuccess, transactionPending } = useSetPrimaryBasename({
    secondaryUsername: domain,
  });

  const setPrimaryUsername = useCallback(async () => {
    try {
      await setPrimaryName();
      void queryClient.invalidateQueries({ queryKey: ['usernames', address, network] });
    } catch (error) {
      logError(error, 'Failed to update primary name');
      throw error;
    }
  }, [address, network, logError, queryClient, setPrimaryName]);

  useEffect(() => {
    if (transactionIsSuccess) {
      void queryClient.invalidateQueries({ queryKey: ['usernames', address, network] });
    }
  }, [transactionIsSuccess, address, network, queryClient]);

  return { setPrimaryUsername, isPending: transactionPending, transactionIsSuccess };
}
