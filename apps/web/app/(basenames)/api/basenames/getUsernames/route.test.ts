/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from './route';
import type { ManagedAddressesResponse } from 'apps/web/src/types/ManagedAddresses';

// Mock the CDP constants
jest.mock('apps/web/src/cdp/constants', () => ({
  cdpBaseUri: 'api.coinbase.com',
}));

describe('getUsernames route', () => {
  const originalEnv = process.env;
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, CDP_BEARER_TOKEN: 'test-token' };
    global.fetch = mockFetch;
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const mockSuccessResponse: ManagedAddressesResponse = {
    data: [
      {
        domain: 'testuser.base.eth',
        expires_at: '2025-01-01T00:00:00Z',
        is_primary: true,
        manager_address: '0x1234567890123456789012345678901234567890',
        network_id: 'base-mainnet',
        owner_address: '0x1234567890123456789012345678901234567890',
        primary_address: '0x1234567890123456789012345678901234567890',
        token_id: '12345',
      },
    ],
    has_more: false,
    next_page: '',
    total_count: 1,
  };

  describe('GET', () => {
    it('should return 400 when no address is provided', async () => {
      const request = new NextRequest('https://www.base.org/api/basenames/getUsernames');

      const response = await GET(request);
      const data = (await response.json()) as ManagedAddressesResponse | { error: string };

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid address provided' });
    });

    it('should return 400 when an invalid address is provided', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x123'
      );

      const response = await GET(request);
      const data = (await response.json()) as ManagedAddressesResponse | { error: string };

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid address provided' });
    });

    it('should return 400 when an invalid network is provided', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890&network=invalid-network'
      );

      const response = await GET(request);
      const data = (await response.json()) as ManagedAddressesResponse | { error: string };

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid network provided' });
    });

    it('should default to base-mainnet when no network is provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.coinbase.com/platform/v1/networks/base-mainnet/addresses/0x1234567890123456789012345678901234567890/identity?limit=50',
        expect.objectContaining({
          headers: {
            Authorization: 'Bearer test-token',
            'Content-Type': 'application/json',
          },
        })
      );
    });

    it('should use base-mainnet when explicitly provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890&network=base-mainnet'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/networks/base-mainnet/'),
        expect.anything()
      );
    });

    it('should use base-sepolia when explicitly provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890&network=base-sepolia'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/networks/base-sepolia/'),
        expect.anything()
      );
    });

    it('should include page parameter in URL when provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890&page=abc123'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('&page=abc123'),
        expect.anything()
      );
    });

    it('should not include page parameter when not provided', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890'
      );

      await GET(request);

      const fetchUrl = mockFetch.mock.calls[0][0] as string;
      expect(fetchUrl).not.toContain('&page=');
    });

    it('should return the data from the CDP API with status 200', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890'
      );

      const response = await GET(request);
      const data = (await response.json()) as ManagedAddressesResponse | { error: string };

      expect(response.status).toBe(200);
      expect(data).toEqual(mockSuccessResponse);
    });

    it('should include authorization header with bearer token', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: 'Bearer test-token',
          }) as unknown,
        })
      );
    });

    it('should include Content-Type header as application/json', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }) as unknown,
        })
      );
    });

    it('should handle multiple data items in response', async () => {
      const multipleItemsResponse: ManagedAddressesResponse = {
        data: [
          {
            domain: 'user1.base.eth',
            expires_at: '2025-01-01T00:00:00Z',
            is_primary: true,
            manager_address: '0x1111111111111111111111111111111111111111',
            network_id: 'base-mainnet',
            owner_address: '0x1111111111111111111111111111111111111111',
            primary_address: '0x1111111111111111111111111111111111111111',
            token_id: '11111',
          },
          {
            domain: 'user2.base.eth',
            expires_at: '2025-06-01T00:00:00Z',
            is_primary: false,
            manager_address: '0x1111111111111111111111111111111111111111',
            network_id: 'base-mainnet',
            owner_address: '0x1111111111111111111111111111111111111111',
            primary_address: '0x1111111111111111111111111111111111111111',
            token_id: '22222',
          },
        ],
        has_more: true,
        next_page: 'next-page-token',
        total_count: 10,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(multipleItemsResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1111111111111111111111111111111111111111'
      );

      const response = await GET(request);
      const data = (await response.json()) as ManagedAddressesResponse | { error: string };

      expect(response.status).toBe(200);
      expect(data.data).toHaveLength(2);
      expect(data.has_more).toBe(true);
      expect(data.next_page).toBe('next-page-token');
      expect(data.total_count).toBe(10);
    });

    it('should handle empty data response', async () => {
      const emptyResponse: ManagedAddressesResponse = {
        data: [],
        has_more: false,
        next_page: '',
        total_count: 0,
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(emptyResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x0000000000000000000000000000000000000000'
      );

      const response = await GET(request);
      const data = (await response.json()) as ManagedAddressesResponse | { error: string };

      expect(response.status).toBe(200);
      expect(data.data).toHaveLength(0);
      expect(data.total_count).toBe(0);
    });

    it('should construct URL with limit parameter', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValue(mockSuccessResponse),
      });

      const request = new NextRequest(
        'https://www.base.org/api/basenames/getUsernames?address=0x1234567890123456789012345678901234567890'
      );

      await GET(request);

      const fetchUrl = mockFetch.mock.calls[0][0] as string;
      expect(fetchUrl).toContain('limit=50');
    });
  });
});
