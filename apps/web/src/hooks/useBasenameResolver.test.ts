/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { type Address } from 'viem';
import { type Basename } from '@coinbase/onchainkit/identity';
import useBasenameResolver from './useBasenameResolver';

// Mock wagmi's useReadContract
const mockUseReadContract = jest.fn();
jest.mock('wagmi', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useReadContract: (params: unknown) => mockUseReadContract(params),
}));

// Mock the usernames utility
const mockBuildRegistryResolverReadParams = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  buildRegistryResolverReadParams: (username: Basename) =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    mockBuildRegistryResolverReadParams(username),
}));

describe('useBasenameResolver', () => {
  const mockResolverAddress = '0x1234567890123456789012345678901234567890' as Address;
  const mockUsername = 'testname.base.eth' as Basename;
  const mockRefetch = jest.fn().mockResolvedValue({});

  const defaultReadContractReturn = {
    data: undefined,
    isError: false,
    error: null,
    refetch: mockRefetch,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockBuildRegistryResolverReadParams.mockReturnValue({
      abi: [],
      address: '0xRegistry',
      functionName: 'resolver',
      args: ['0xnode'],
    });
    mockUseReadContract.mockReturnValue(defaultReadContractReturn);
  });

  describe('initialization', () => {
    it('should call buildRegistryResolverReadParams with the provided username', () => {
      renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(mockBuildRegistryResolverReadParams).toHaveBeenCalledWith(mockUsername);
    });

    it('should call useReadContract with the correct params', () => {
      const mockReadParams = {
        abi: [],
        address: '0xRegistry',
        functionName: 'resolver',
        args: ['0xnode'],
      };
      mockBuildRegistryResolverReadParams.mockReturnValue(mockReadParams);

      renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(mockUseReadContract).toHaveBeenCalledWith({
        ...mockReadParams,
        query: {
          enabled: true,
          refetchOnWindowFocus: false,
        },
      });
    });

    it('should disable the query when username is empty', () => {
      renderHook(() => useBasenameResolver({ username: '' as Basename }));

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const expectedQuery = expect.objectContaining({
        enabled: false,
      });

      expect(mockUseReadContract).toHaveBeenCalledWith(
        expect.objectContaining({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          query: expectedQuery,
        })
      );
    });
  });

  describe('return values', () => {
    it('should return undefined data when resolver has not loaded', () => {
      mockUseReadContract.mockReturnValue(defaultReadContractReturn);

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.data).toBeUndefined();
    });

    it('should return the resolver address when data is available', () => {
      mockUseReadContract.mockReturnValue({
        ...defaultReadContractReturn,
        data: mockResolverAddress,
      });

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.data).toBe(mockResolverAddress);
    });

    it('should return isError as false when there is no error', () => {
      mockUseReadContract.mockReturnValue(defaultReadContractReturn);

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.isError).toBe(false);
    });

    it('should return isError as true when there is an error', () => {
      mockUseReadContract.mockReturnValue({
        ...defaultReadContractReturn,
        isError: true,
        error: new Error('Contract read failed'),
      });

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.isError).toBe(true);
    });

    it('should return the error object when there is an error', () => {
      const mockError = new Error('Contract read failed');
      mockUseReadContract.mockReturnValue({
        ...defaultReadContractReturn,
        isError: true,
        error: mockError,
      });

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.error).toBe(mockError);
    });

    it('should return null error when there is no error', () => {
      mockUseReadContract.mockReturnValue(defaultReadContractReturn);

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.error).toBeNull();
    });

    it('should return a refetch function', () => {
      mockUseReadContract.mockReturnValue(defaultReadContractReturn);

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      expect(result.current.refetch).toBe(mockRefetch);
    });
  });

  describe('refetch functionality', () => {
    it('should call refetch when invoked', async () => {
      mockUseReadContract.mockReturnValue(defaultReadContractReturn);

      const { result } = renderHook(() => useBasenameResolver({ username: mockUsername }));

      await result.current.refetch();

      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  describe('different username formats', () => {
    it('should handle mainnet basenames (.base.eth)', () => {
      const mainnetUsername = 'myname.base.eth' as Basename;

      renderHook(() => useBasenameResolver({ username: mainnetUsername }));

      expect(mockBuildRegistryResolverReadParams).toHaveBeenCalledWith(mainnetUsername);
    });

    it('should handle testnet basenames (.basetest.eth)', () => {
      const testnetUsername = 'myname.basetest.eth' as Basename;

      renderHook(() => useBasenameResolver({ username: testnetUsername }));

      expect(mockBuildRegistryResolverReadParams).toHaveBeenCalledWith(testnetUsername);
    });
  });
});
