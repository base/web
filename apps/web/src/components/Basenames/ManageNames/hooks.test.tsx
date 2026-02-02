/**
 * @jest-environment jsdom
 */
import { renderHook, act, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useNameList, useRemoveNameFromUI, useUpdatePrimaryName } from './hooks';
import React from 'react';
import { Basename } from '@coinbase/onchainkit/identity';

// Mock wagmi hooks
const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
let mockChainId = 8453;

jest.mock('wagmi', () => ({
  useAccount: () => ({ address: mockAddress }),
  useChainId: () => mockChainId,
}));

// Mock Errors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock useSetPrimaryBasename
const mockSetPrimaryName = jest.fn();
let mockTransactionIsSuccess = false;
let mockTransactionPending = false;

jest.mock('apps/web/src/hooks/useSetPrimaryBasename', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    setPrimaryName: mockSetPrimaryName,
    transactionIsSuccess: mockTransactionIsSuccess,
    transactionPending: mockTransactionPending,
  })),
}));

// Setup mock fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Wrapper with QueryClient
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
    },
  });
  return function Wrapper({ children }: { children: React.ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useNameList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockChainId = 8453;
    mockFetch.mockReset();
  });

  it('should return initial state with empty data', () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], has_more: false, total_count: 0 }),
    });

    const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.hasPrevious).toBe(false);
    expect(result.current.hasNext).toBe(false);
    expect(result.current.totalCount).toBe(0);
    expect(result.current.currentPageNumber).toBe(1);
  });

  it('should fetch usernames from the API with correct URL for mainnet', async () => {
    mockChainId = 8453;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [{ domain: 'test.base.eth', token_id: '1' }],
        has_more: false,
        total_count: 1,
      }),
    });

    const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `/api/basenames/getUsernames?address=${mockAddress}&network=base-mainnet`,
    );
    expect(result.current.totalCount).toBe(1);
  });

  it('should use base-sepolia network when chain id is not 8453', async () => {
    mockChainId = 84532;
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], has_more: false, total_count: 0 }),
    });

    const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(mockFetch).toHaveBeenCalledWith(
      `/api/basenames/getUsernames?address=${mockAddress}&network=base-sepolia`,
    );
  });

  it('should handle fetch errors and log them', async () => {
    const fetchError = new Error('Network error');
    mockFetch.mockRejectedValue(fetchError);

    const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(mockLogError).toHaveBeenCalledWith(fetchError, 'Failed to fetch usernames');
  });

  it('should handle non-ok response and throw error', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      statusText: 'Not Found',
    });

    const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.error).toBeTruthy();
    });

    expect(mockLogError).toHaveBeenCalled();
  });

  describe('pagination', () => {
    it('should navigate to next page when goToNextPage is called', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page1.base.eth', token_id: '1' }],
            has_more: true,
            next_page: 'page2token',
            total_count: 10,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page2.base.eth', token_id: '2' }],
            has_more: false,
            total_count: 10,
          }),
        });

      const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.hasNext).toBe(true);
      });

      act(() => {
        result.current.goToNextPage();
      });

      await waitFor(() => {
        expect(result.current.currentPageNumber).toBe(2);
      });

      expect(mockFetch).toHaveBeenLastCalledWith(
        `/api/basenames/getUsernames?address=${mockAddress}&network=base-mainnet&page=page2token`,
      );
    });

    it('should navigate to previous page when goToPreviousPage is called', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page1.base.eth', token_id: '1' }],
            has_more: true,
            next_page: 'page2token',
            total_count: 10,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page2.base.eth', token_id: '2' }],
            has_more: false,
            total_count: 10,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page1.base.eth', token_id: '1' }],
            has_more: true,
            next_page: 'page2token',
            total_count: 10,
          }),
        });

      const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.hasNext).toBe(true);
      });

      // Go to page 2
      act(() => {
        result.current.goToNextPage();
      });

      await waitFor(() => {
        expect(result.current.currentPageNumber).toBe(2);
      });

      expect(result.current.hasPrevious).toBe(true);

      // Go back to page 1
      act(() => {
        result.current.goToPreviousPage();
      });

      await waitFor(() => {
        expect(result.current.currentPageNumber).toBe(1);
      });

      expect(result.current.hasPrevious).toBe(false);
    });

    it('should not go to previous page when on first page', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ domain: 'page1.base.eth', token_id: '1' }],
          has_more: false,
          total_count: 1,
        }),
      });

      const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.hasPrevious).toBe(false);

      act(() => {
        result.current.goToPreviousPage();
      });

      expect(result.current.currentPageNumber).toBe(1);
    });

    it('should not go to next page when there is no next page', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => ({
          data: [{ domain: 'page1.base.eth', token_id: '1' }],
          has_more: false,
          total_count: 1,
        }),
      });

      const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
      });

      expect(result.current.hasNext).toBe(false);

      const initialCallCount = mockFetch.mock.calls.length;

      act(() => {
        result.current.goToNextPage();
      });

      expect(result.current.currentPageNumber).toBe(1);
      // No additional fetch should be made
      expect(mockFetch.mock.calls.length).toBe(initialCallCount);
    });

    it('should reset pagination when resetPagination is called', async () => {
      mockFetch
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page1.base.eth', token_id: '1' }],
            has_more: true,
            next_page: 'page2token',
            total_count: 10,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page2.base.eth', token_id: '2' }],
            has_more: false,
            total_count: 10,
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            data: [{ domain: 'page1.base.eth', token_id: '1' }],
            has_more: true,
            next_page: 'page2token',
            total_count: 10,
          }),
        });

      const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

      await waitFor(() => {
        expect(result.current.hasNext).toBe(true);
      });

      // Go to page 2
      act(() => {
        result.current.goToNextPage();
      });

      await waitFor(() => {
        expect(result.current.currentPageNumber).toBe(2);
      });

      // Reset pagination
      act(() => {
        result.current.resetPagination();
      });

      await waitFor(() => {
        expect(result.current.currentPageNumber).toBe(1);
      });

      expect(result.current.hasPrevious).toBe(false);
    });
  });

  it('should return refetch function', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => ({ data: [], has_more: false, total_count: 0 }),
    });

    const { result } = renderHook(() => useNameList(), { wrapper: createWrapper() });

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(typeof result.current.refetch).toBe('function');
  });
});

describe('useRemoveNameFromUI', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockChainId = 8453;
  });

  it('should return removeNameFromUI function', () => {
    const { result } = renderHook(() => useRemoveNameFromUI(), { wrapper: createWrapper() });

    expect(typeof result.current.removeNameFromUI).toBe('function');
  });

  it('should invalidate queries when removeNameFromUI is called', () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }

    const { result } = renderHook(() => useRemoveNameFromUI(), { wrapper: Wrapper });

    act(() => {
      result.current.removeNameFromUI();
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['usernames', mockAddress, 'base-mainnet'],
    });

    invalidateSpy.mockRestore();
  });

  it('should use base-sepolia network when chain id is not 8453', () => {
    mockChainId = 84532;

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }

    const { result } = renderHook(() => useRemoveNameFromUI(), { wrapper: Wrapper });

    act(() => {
      result.current.removeNameFromUI();
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['usernames', mockAddress, 'base-sepolia'],
    });

    invalidateSpy.mockRestore();
  });
});

describe('useUpdatePrimaryName', () => {
  const testDomain: Basename = 'test.base.eth' as Basename;

  beforeEach(() => {
    jest.clearAllMocks();
    mockChainId = 8453;
    mockTransactionIsSuccess = false;
    mockTransactionPending = false;
    mockSetPrimaryName.mockReset();
  });

  it('should return setPrimaryUsername function and status flags', () => {
    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), {
      wrapper: createWrapper(),
    });

    expect(typeof result.current.setPrimaryUsername).toBe('function');
    expect(result.current.isPending).toBe(false);
    expect(result.current.transactionIsSuccess).toBe(false);
  });

  it('should call setPrimaryName when setPrimaryUsername is invoked', async () => {
    mockSetPrimaryName.mockResolvedValue(undefined);

    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), {
      wrapper: createWrapper(),
    });

    await act(async () => {
      await result.current.setPrimaryUsername();
    });

    expect(mockSetPrimaryName).toHaveBeenCalled();
  });

  it('should invalidate queries after successful setPrimaryUsername', async () => {
    mockSetPrimaryName.mockResolvedValue(undefined);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }

    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), { wrapper: Wrapper });

    await act(async () => {
      await result.current.setPrimaryUsername();
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['usernames', mockAddress, 'base-mainnet'],
    });

    invalidateSpy.mockRestore();
  });

  it('should log error and rethrow when setPrimaryName fails', async () => {
    const error = new Error('Transaction failed');
    mockSetPrimaryName.mockRejectedValue(error);

    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), {
      wrapper: createWrapper(),
    });

    await expect(
      act(async () => {
        await result.current.setPrimaryUsername();
      }),
    ).rejects.toThrow('Transaction failed');

    expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to update primary name');
  });

  it('should reflect isPending from transactionPending', () => {
    mockTransactionPending = true;

    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), {
      wrapper: createWrapper(),
    });

    expect(result.current.isPending).toBe(true);
  });

  it('should reflect transactionIsSuccess from the hook', () => {
    mockTransactionIsSuccess = true;

    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), {
      wrapper: createWrapper(),
    });

    expect(result.current.transactionIsSuccess).toBe(true);
  });

  it('should invalidate queries when transactionIsSuccess becomes true', async () => {
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }

    mockTransactionIsSuccess = false;

    const { rerender } = renderHook(() => useUpdatePrimaryName(testDomain), { wrapper: Wrapper });

    // Initially no invalidation from the effect (only from the first render and effect)
    invalidateSpy.mockClear();

    // Simulate transaction success
    mockTransactionIsSuccess = true;
    rerender();

    await waitFor(() => {
      expect(invalidateSpy).toHaveBeenCalledWith({
        queryKey: ['usernames', mockAddress, 'base-mainnet'],
      });
    });

    invalidateSpy.mockRestore();
  });

  it('should use base-sepolia network when chain id is not 8453', async () => {
    mockChainId = 84532;
    mockSetPrimaryName.mockResolvedValue(undefined);

    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });

    const invalidateSpy = jest.spyOn(queryClient, 'invalidateQueries');

    function Wrapper({ children }: { children: React.ReactNode }) {
      return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
    }

    const { result } = renderHook(() => useUpdatePrimaryName(testDomain), { wrapper: Wrapper });

    await act(async () => {
      await result.current.setPrimaryUsername();
    });

    expect(invalidateSpy).toHaveBeenCalledWith({
      queryKey: ['usernames', mockAddress, 'base-sepolia'],
    });

    invalidateSpy.mockRestore();
  });
});
