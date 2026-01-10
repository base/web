/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import useBuildathonParticipant from './useBuildathon';

// Mock wagmi's useReadContract hook
const mockUseReadContract = jest.fn();

jest.mock('wagmi', () => ({
  useReadContract: (...args: unknown[]) =>
    mockUseReadContract(...args) as { data: bigint | undefined },
}));

const PARTICIPANT_SBT_ADDRESS = '0x59ca61566C03a7Fb8e4280d97bFA2e8e691DA3a6';

describe('useBuildathonParticipant', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseReadContract.mockReturnValue({ data: undefined });
  });

  it('should return isParticipant: false and isWinner: false when no address is provided', () => {
    const { result } = renderHook(() => useBuildathonParticipant());

    expect(result.current).toEqual({ isParticipant: false, isWinner: false });
  });

  it('should return isParticipant: false and isWinner: false when address is undefined', () => {
    const { result } = renderHook(() => useBuildathonParticipant(undefined));

    expect(result.current).toEqual({ isParticipant: false, isWinner: false });
  });

  it('should return isParticipant: false and isWinner: false when balanceOf returns 0', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(0) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: false, isWinner: false });
  });

  it('should return isParticipant: true and isWinner: false when balanceOf returns 1', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(1) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: true, isWinner: false });
  });

  it('should return isParticipant: true and isWinner: true when balanceOf returns 2', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(2) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: true, isWinner: true });
  });

  it('should return isParticipant: true and isWinner: true when balanceOf returns a large value', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(100) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: true, isWinner: true });
  });

  it('should return isParticipant: false and isWinner: false when balanceOf data is undefined', () => {
    mockUseReadContract.mockReturnValue({ data: undefined });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: false, isWinner: false });
  });

  it('should call useReadContract with correct configuration when address is provided', () => {
    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    renderHook(() => useBuildathonParticipant(address));

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        address: PARTICIPANT_SBT_ADDRESS,
        functionName: 'balanceOf',
        args: [address],
        query: {
          enabled: true,
        },
      }),
    );
  });

  it('should disable the query when address is not provided', () => {
    renderHook(() => useBuildathonParticipant());

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        query: {
          enabled: false,
        },
      }),
    );
  });

  it('should use fallback address 0x when address is not provided', () => {
    renderHook(() => useBuildathonParticipant());

    expect(mockUseReadContract).toHaveBeenCalledWith(
      expect.objectContaining({
        args: ['0x'],
      }),
    );
  });

  it('should update return value when balanceOf changes from 0 to 1', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(0) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result, rerender } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: false, isWinner: false });

    mockUseReadContract.mockReturnValue({ data: BigInt(1) });
    rerender();

    expect(result.current).toEqual({ isParticipant: true, isWinner: false });
  });

  it('should update return value when balanceOf changes from 1 to 2', () => {
    mockUseReadContract.mockReturnValue({ data: BigInt(1) });

    const address = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;
    const { result, rerender } = renderHook(() => useBuildathonParticipant(address));

    expect(result.current).toEqual({ isParticipant: true, isWinner: false });

    mockUseReadContract.mockReturnValue({ data: BigInt(2) });
    rerender();

    expect(result.current).toEqual({ isParticipant: true, isWinner: true });
  });
});
