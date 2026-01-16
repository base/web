/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useBasenamesNameExpiresWithGracePeriod } from './useBasenamesNameExpiresWithGracePeriod';
import { GRACE_PERIOD_DURATION_SECONDS } from 'apps/web/src/utils/usernames';
import { base, baseSepolia } from 'viem/chains';

// Mock useReadContract from wagmi
const mockUseReadContract = jest.fn();
jest.mock('wagmi', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useReadContract: (config: unknown) => mockUseReadContract(config),
}));

// Mock useBasenameChain
const mockUseBasenameChain = jest.fn();
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  default: () => mockUseBasenameChain(),
}));

// Mock usernames utilities
jest.mock('apps/web/src/utils/usernames', () => ({
  getTokenIdFromBasename: jest.fn((name: string) => {
    // Simulate generating a token ID from the basename
    return BigInt(name.length);
  }),
  formatBaseEthDomain: jest.fn((name: string, chainId: number) => {
    if (chainId === 84532) {
      return `${name}.basetest.eth`;
    }
    return `${name}.base.eth`;
  }),
  GRACE_PERIOD_DURATION_SECONDS: 90 * 24 * 60 * 60,
}));

// Mock addresses
jest.mock('apps/web/src/addresses/usernames', () => ({
  USERNAME_BASE_REGISTRAR_ADDRESSES: {
    [8453]: '0xBaseRegistrar8453',
    [84532]: '0xBaseRegistrar84532',
  },
}));

// Mock the ABI
jest.mock('apps/web/src/abis/BaseRegistrarAbi', () => []);

describe('useBasenamesNameExpiresWithGracePeriod', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default to Base mainnet
    mockUseBasenameChain.mockReturnValue({
      basenameChain: base,
    });
  });

  describe('when contract returns expiration time', () => {
    it('should add grace period to expiration time', () => {
      const expirationTime = BigInt(1700000000);
      mockUseReadContract.mockReturnValue({
        data: expirationTime,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      const expectedAuctionStart = expirationTime + BigInt(GRACE_PERIOD_DURATION_SECONDS);
      expect(result.current.data).toBe(expectedAuctionStart);
    });

    it('should return correct loading state', () => {
      mockUseReadContract.mockReturnValue({
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(result.current.isLoading).toBe(true);
      expect(result.current.data).toBeUndefined();
    });

    it('should return correct error state', () => {
      const mockError = new Error('Contract read failed');
      mockUseReadContract.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: true,
        error: mockError,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe(mockError);
      expect(result.current.data).toBeUndefined();
    });
  });

  describe('when data is undefined or null', () => {
    it('should return undefined when data is undefined', () => {
      mockUseReadContract.mockReturnValue({
        data: undefined,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(result.current.data).toBeUndefined();
    });

    it('should return undefined when data is null', () => {
      mockUseReadContract.mockReturnValue({
        data: null,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(result.current.data).toBeUndefined();
    });
  });

  describe('name formatting', () => {
    it('should use name as-is when it includes a dot', () => {
      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname.base.eth'));

      // The formatBaseEthDomain should not be called for names that already include a dot
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { getTokenIdFromBasename } = jest.requireMock('apps/web/src/utils/usernames');
      expect(getTokenIdFromBasename).toHaveBeenCalledWith('testname.base.eth');
    });

    it('should format name without dot using formatBaseEthDomain', () => {
      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { formatBaseEthDomain, getTokenIdFromBasename } = jest.requireMock(
        'apps/web/src/utils/usernames'
      );
      expect(formatBaseEthDomain).toHaveBeenCalledWith('testname', base.id);
      expect(getTokenIdFromBasename).toHaveBeenCalledWith('testname.base.eth');
    });
  });

  describe('chain handling', () => {
    it('should use Base mainnet chain', () => {
      mockUseBasenameChain.mockReturnValue({
        basenameChain: base,
      });

      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(mockUseReadContract).toHaveBeenCalledWith(
        expect.objectContaining({
          chainId: base.id,
          address: '0xBaseRegistrar8453',
        })
      );
    });

    it('should use Base Sepolia chain when on testnet', () => {
      mockUseBasenameChain.mockReturnValue({
        basenameChain: baseSepolia,
      });

      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(mockUseReadContract).toHaveBeenCalledWith(
        expect.objectContaining({
          chainId: baseSepolia.id,
          address: '0xBaseRegistrar84532',
        })
      );
    });
  });

  describe('refetch function', () => {
    it('should expose refetch function from contract result', () => {
      const mockRefetch = jest.fn();
      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: mockRefetch,
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(result.current.refetch).toBe(mockRefetch);
    });
  });

  describe('contract call configuration', () => {
    it('should call nameExpires function on the contract', () => {
      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(mockUseReadContract).toHaveBeenCalledWith(
        expect.objectContaining({
          functionName: 'nameExpires',
        })
      );
    });

    it('should pass token ID as argument', () => {
      mockUseReadContract.mockReturnValue({
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      // Token ID is calculated from the mock - 'testname.base.eth' has length 17
      expect(mockUseReadContract).toHaveBeenCalledWith(
        expect.objectContaining({
          args: [BigInt(17)],
        })
      );
    });
  });

  describe('grace period calculation', () => {
    it('should correctly add 90 days in seconds to expiration', () => {
      const expirationTime = BigInt(0);
      mockUseReadContract.mockReturnValue({
        data: expirationTime,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      // 90 days = 90 * 24 * 60 * 60 = 7776000 seconds
      expect(result.current.data).toBe(BigInt(7776000));
    });

    it('should handle large expiration timestamps correctly', () => {
      // A timestamp far in the future
      const expirationTime = BigInt(2000000000);
      mockUseReadContract.mockReturnValue({
        data: expirationTime,
        isLoading: false,
        isError: false,
        error: null,
        refetch: jest.fn(),
      });

      const { result } = renderHook(() => useBasenamesNameExpiresWithGracePeriod('testname'));

      expect(result.current.data).toBe(BigInt(2000000000 + 7776000));
    });
  });
});
