/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import useBaseGrant from './useBaseGrant';

// Mock wagmi's useReadContract hook
const mockUseReadContract = jest.fn();

jest.mock('wagmi', () => ({
  useReadContract: (...args: unknown[]) => mockUseReadContract(...args) as { data: bigint | undefined },
}));

const BASE_GRANT_NFT_ADDRESS = '0x1926a8090d558066ed26b6217e43d30493dc938e';

describe('useBaseGrant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReadContract.mockReturnValue({ data: undefined });
  });

  it('should return false when no address is provided', () => {
    const { result } = renderHook(() => useBaseGrant());

    expect(result.current).toBe(false);
  });

  it('should return false when address is undefined', () => {
    const { result } = renderHook(() => useBaseGrant(undefined));

    expect(result.current).toBe(false);
  });

  it('should return false when balanceOf returns 0', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(0) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBaseGrant(address));

    expect(result.current).toBe(false);
  });

  it('should return true when balanceOf returns a value greater than 0', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(1) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBaseGrant(address));

    expect(result.current).toBe(true);
  });

  it('should return true when balanceOf returns a large value', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(100) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBaseGrant(address));

    expect(result.current).toBe(true);
  });

  it('should return false when balanceOf data is undefined', () => {
    mockUseReadContract.mockReturnValue({ data: undefined });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBaseGrant(address));

    expect(result.current).toBe(false);
  });

  it('should call useReadContract with correct configuration when address is provided', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    renderHook(() => useBaseGrant(address));

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        address: BASE_GRANT_NFT_ADDRESS,
        functionName: 'balanceOf',
        args: [address],
        query: {
          enabled: true,
        },
      }),
    );
  });

  it('should disable the query when address is not provided', () => {
    renderHook(() => useBaseGrant());

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        query: {
          enabled: false,
        },
      }),
    );
  });

  it('should use fallback address 0x when address is not provided', () => {
    renderHook(() => useBaseGrant());

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ['0x'],
      }),
    );
  });

  it('should update return value when balanceOf changes from 0 to positive', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(0) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result, rerender } = renderHook(() => useBaseGrant(address));

    expect(result.current).toBe(false);

    mockUseReadContract.mockReturnValue({ data: BigInt(1) });
    rerender();

    expect(result.current).toBe(true);
  });
});
