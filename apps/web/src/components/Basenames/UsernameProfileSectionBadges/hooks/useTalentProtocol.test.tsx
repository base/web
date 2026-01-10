/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { useTalentProtocol } from './useTalentProtocol';

type HexAddress = `0x${string}`;

// Create a wrapper with QueryClientProvider
function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
  };
}

describe('useTalentProtocol', () => {
  const mockFetch = jest.fn();
  const originalFetch = global.fetch;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  describe('when no address is provided', () => {
    it('should return undefined', () => {
      const { result } = renderHook(() => useTalentProtocol(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeUndefined();
    });

    it('should not call fetch when address is undefined', () => {
      renderHook(() => useTalentProtocol(undefined), {
        wrapper: createWrapper(),
      });

      expect(mockFetch).not.toHaveBeenCalled();
    });
  });

  describe('when address is provided', () => {
    const address: HexAddress = '0x1234567890abcdef1234567890abcdef12345678';

    it('should call fetch with the correct URL', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>({ score: { points: 50, v1_score: 40 } }),
      });

      renderHook(() => useTalentProtocol(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(`/api/basenames/talentprotocol/${address}`);
      });
    });

    it('should return the points value when fetch succeeds', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>({ score: { points: 75, v1_score: 60 } }),
      });

      const { result } = renderHook(() => useTalentProtocol(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current).toBe(75);
      });
    });

    it('should return undefined when response contains an error', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>({ score: { points: 50, v1_score: 40 }, error: 'Some error' }),
      });

      const { result } = renderHook(() => useTalentProtocol(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalled();
      });

      // Wait a bit for the hook to process the data
      await waitFor(() => {
        expect(result.current).toBeUndefined();
      });
    });

    it('should return undefined initially while loading', () => {
      mockFetch.mockReturnValue(new Promise(() => {})); // Never resolves

      const { result } = renderHook(() => useTalentProtocol(address), {
        wrapper: createWrapper(),
      });

      expect(result.current).toBeUndefined();
    });

    it('should return zero points when points is 0', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>({ score: { points: 0, v1_score: 0 } }),
      });

      const { result } = renderHook(() => useTalentProtocol(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current).toBe(0);
      });
    });

    it('should return high points value correctly', async () => {
      mockFetch.mockResolvedValue({
        json: async () =>({ score: { points: 1000, v1_score: 800 } }),
      });

      const { result } = renderHook(() => useTalentProtocol(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current).toBe(1000);
      });
    });
  });

  describe('with different addresses', () => {
    it('should call fetch with different addresses', async () => {
      const address1: HexAddress = '0x1111111111111111111111111111111111111111';
      const address2: HexAddress = '0x2222222222222222222222222222222222222222';

      mockFetch.mockResolvedValue({
        json: async () =>({ score: { points: 50, v1_score: 40 } }),
      });

      renderHook(() => useTalentProtocol(address1), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(`/api/basenames/talentprotocol/${address1}`);
      });

      renderHook(() => useTalentProtocol(address2), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(`/api/basenames/talentprotocol/${address2}`);
      });
    });
  });
});
