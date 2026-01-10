/**
 * @jest-environment jsdom
 */
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import {
  useCoinbaseVerification,
  getCoinbaseVerifications,
  CoinbaseVerifications,
} from './useCoinbaseVerifications';

// Mock the getAttestations function from @coinbase/onchainkit/identity
const mockGetAttestations = jest.fn();

jest.mock('@coinbase/onchainkit/identity', () => ({
  getAttestations: async (...args: unknown[]) =>
    mockGetAttestations(...args) as Promise<unknown[]>,
}));

// Schema IDs used in the source
const COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID =
  '0xf8b05c79f090979bf4a80270aba232dff11a10d9ca55c4f88de95317970f0de9';
const COINBASE_VERIFIED_COUNTRY_SCHEMA_ID =
  '0x1801901fabd0e6189356b4fb52bb0ab855276d84f7ec140839fbd1f6801ca065';
const COINBASE_ONE_SCHEMA_ID =
  '0x254bd1b63e0591fefa66818ca054c78627306f253f86be6023725a67ee6bf9f4';

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

describe('getCoinbaseVerifications', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call getAttestations with the correct address and options', async () => {
    mockGetAttestations.mockResolvedValue([]);

    const address: HexAddress = '0x1234567890abcdef1234567890abcdef12345678';
    await getCoinbaseVerifications(address);

    expect(mockGetAttestations).toHaveBeenCalledWith(address, expect.anything(), {
      schemas: expect.arrayContaining([
        COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
        COINBASE_VERIFIED_COUNTRY_SCHEMA_ID,
        COINBASE_ONE_SCHEMA_ID,
      ]) as unknown,
    });
  });

  it('should parse decodedDataJson and return it as data field', async () => {
    const attestation = {
      schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
      decodedDataJson: JSON.stringify({ verified: true }),
      revoked: false,
    };
    mockGetAttestations.mockResolvedValue([attestation]);

    const address: HexAddress = '0x1234567890abcdef1234567890abcdef12345678';
    const result = await getCoinbaseVerifications(address);

    expect(result).toHaveLength(1);
    expect(result[0].data).toEqual({ verified: true });
    expect(result[0].schemaId).toBe(COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID);
    expect(result[0]).not.toHaveProperty('decodedDataJson');
  });

  it('should return an empty array when no attestations exist', async () => {
    mockGetAttestations.mockResolvedValue([]);

    const address: HexAddress = '0x1234567890abcdef1234567890abcdef12345678';
    const result = await getCoinbaseVerifications(address);

    expect(result).toEqual([]);
  });

  it('should handle multiple attestations', async () => {
    const attestations = [
      {
        schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
        decodedDataJson: JSON.stringify({ type: 'account' }),
        revoked: false,
      },
      {
        schemaId: COINBASE_VERIFIED_COUNTRY_SCHEMA_ID,
        decodedDataJson: JSON.stringify({ type: 'country' }),
        revoked: false,
      },
    ];
    mockGetAttestations.mockResolvedValue(attestations);

    const address: HexAddress = '0x1234567890abcdef1234567890abcdef12345678';
    const result = await getCoinbaseVerifications(address);

    expect(result).toHaveLength(2);
    expect(result[0].data).toEqual({ type: 'account' });
    expect(result[1].data).toEqual({ type: 'country' });
  });
});

describe('useCoinbaseVerification', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetAttestations.mockResolvedValue([]);
  });

  describe('when no address is provided', () => {
    it('should return all badges as false and empty as true', () => {
      const { result } = renderHook(() => useCoinbaseVerification(), {
        wrapper: createWrapper(),
      });

      expect(result.current.empty).toBe(true);
      expect(result.current.badges.VERIFIED_IDENTITY).toBe(false);
      expect(result.current.badges.VERIFIED_COUNTRY).toBe(false);
      expect(result.current.badges.VERIFIED_COINBASE_ONE).toBe(false);
    });

    it('should not call getAttestations when address is undefined', () => {
      renderHook(() => useCoinbaseVerification(undefined), {
        wrapper: createWrapper(),
      });

      expect(mockGetAttestations).not.toHaveBeenCalled();
    });
  });

  describe('when address is provided', () => {
    const address: HexAddress = '0x1234567890abcdef1234567890abcdef12345678';

    it('should call getAttestations with the address', async () => {
      mockGetAttestations.mockResolvedValue([]);

      renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(mockGetAttestations).toHaveBeenCalledWith(
          address,
          expect.anything(),
          expect.anything(),
        );
      });
    });

    it('should return empty true when no attestations exist', async () => {
      mockGetAttestations.mockResolvedValue([]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.empty).toBe(true);
      });
    });

    it('should set VERIFIED_IDENTITY badge to true when account attestation exists', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ verified: true }),
          revoked: false,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_IDENTITY).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should set VERIFIED_COUNTRY badge to true when country attestation exists', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: COINBASE_VERIFIED_COUNTRY_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ country: 'US' }),
          revoked: false,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_COUNTRY).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should set VERIFIED_COINBASE_ONE badge to true when Coinbase One attestation exists', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: COINBASE_ONE_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ member: true }),
          revoked: false,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_COINBASE_ONE).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should not set badge when attestation is revoked', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ verified: true }),
          revoked: true,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_IDENTITY).toBe(false);
        expect(result.current.empty).toBe(true);
      });
    });

    it('should set multiple badges when user has multiple attestations', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ verified: true }),
          revoked: false,
        },
        {
          schemaId: COINBASE_VERIFIED_COUNTRY_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ country: 'US' }),
          revoked: false,
        },
        {
          schemaId: COINBASE_ONE_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ member: true }),
          revoked: false,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_IDENTITY).toBe(true);
        expect(result.current.badges.VERIFIED_COUNTRY).toBe(true);
        expect(result.current.badges.VERIFIED_COINBASE_ONE).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should only set badges for non-revoked attestations in a mixed list', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: COINBASE_VERIFIED_ACCOUNT_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ verified: true }),
          revoked: false,
        },
        {
          schemaId: COINBASE_VERIFIED_COUNTRY_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ country: 'US' }),
          revoked: true,
        },
        {
          schemaId: COINBASE_ONE_SCHEMA_ID,
          decodedDataJson: JSON.stringify({ member: true }),
          revoked: false,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_IDENTITY).toBe(true);
        expect(result.current.badges.VERIFIED_COUNTRY).toBe(false);
        expect(result.current.badges.VERIFIED_COINBASE_ONE).toBe(true);
        expect(result.current.empty).toBe(false);
      });
    });

    it('should ignore attestations with unknown schemaIds', async () => {
      mockGetAttestations.mockResolvedValue([
        {
          schemaId: '0xunknownschema',
          decodedDataJson: JSON.stringify({ unknown: true }),
          revoked: false,
        },
      ]);

      const { result } = renderHook(() => useCoinbaseVerification(address), {
        wrapper: createWrapper(),
      });

      await waitFor(() => {
        expect(result.current.badges.VERIFIED_IDENTITY).toBe(false);
        expect(result.current.badges.VERIFIED_COUNTRY).toBe(false);
        expect(result.current.badges.VERIFIED_COINBASE_ONE).toBe(false);
        expect(result.current.empty).toBe(true);
      });
    });
  });

  describe('return type structure', () => {
    it('should return an object with badges and empty properties', () => {
      const { result } = renderHook(() => useCoinbaseVerification(), {
        wrapper: createWrapper(),
      });

      expect(result.current).toHaveProperty('badges');
      expect(result.current).toHaveProperty('empty');
    });

    it('should return badges object with all CoinbaseVerifications keys', () => {
      const { result } = renderHook(() => useCoinbaseVerification(), {
        wrapper: createWrapper(),
      });

      const expectedBadges: CoinbaseVerifications[] = [
        'VERIFIED_IDENTITY',
        'VERIFIED_COUNTRY',
        'VERIFIED_COINBASE_ONE',
      ];

      expectedBadges.forEach((badge) => {
        expect(result.current.badges).toHaveProperty(badge);
        expect(typeof result.current.badges[badge]).toBe('boolean');
      });
    });
  });
});
