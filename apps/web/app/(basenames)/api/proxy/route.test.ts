/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Store original env
const originalEnv = process.env;

// Reset modules to ensure fresh import with mocked env
beforeEach(() => {
  jest.resetModules();
  process.env = {
    ...originalEnv,
    ETHERSCAN_API_KEY: 'test-etherscan-key',
    TALENT_PROTOCOL_API_KEY: 'test-talent-key',
  };
});

afterAll(() => {
  process.env = originalEnv;
});

// Import after mocks are set up
import { GET } from './route';

type ProxyResponse = {
  data?: unknown;
  error?: string;
};

describe('api/proxy route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET - parameter validation', () => {
    it('should return 400 when address is missing', async () => {
      const request = new NextRequest('https://www.base.org/api/proxy?apiType=etherscan');

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid address parameter' });
    });

    it('should return 400 when address is invalid', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/proxy?address=invalid-address&apiType=etherscan'
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid address parameter' });
    });

    it('should return 400 when apiType is missing', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(`https://www.base.org/api/proxy?address=${address}`);

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid apiType parameter' });
    });

    it('should return 400 when apiType is invalid', async () => {
      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=invalid`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Invalid apiType parameter' });
    });
  });

  describe('GET - etherscan apiType', () => {
    it('should call etherscan API with correct URL for etherscan type', async () => {
      const mockData = { result: [{ hash: '0x123' }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${address}&chainid=1`
        ),
        expect.objectContaining({
          method: 'GET',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
          }),
        })
      );
    });

    it('should return data on successful etherscan response', async () => {
      const mockData = { result: [{ hash: '0x123' }] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockData });
    });
  });

  describe('GET - base-sepolia apiType', () => {
    it('should call etherscan API with correct URL for base-sepolia type', async () => {
      const mockData = { result: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=base-sepolia`
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://api.etherscan.io/v2/api?module=account&action=txlistinternal&address=${address}&chainid=84532`
        ),
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('GET - basescan apiType', () => {
    it('should call etherscan API with correct URL for basescan type', async () => {
      const mockData = { result: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=basescan`
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://api.etherscan.io/v2/api?module=account&action=txlist&address=${address}&chainid=8453`
        ),
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('GET - basescan-internal apiType', () => {
    it('should call etherscan API with correct URL for basescan-internal type', async () => {
      const mockData = { result: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=basescan-internal`
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          `https://api.etherscan.io/v2/api?module=account&action=txlistinternal&address=${address}&chainid=8453`
        ),
        expect.objectContaining({
          method: 'GET',
        })
      );
    });
  });

  describe('GET - response handling', () => {
    it('should handle text response when content-type is not JSON', async () => {
      const mockTextData = 'Some text response';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: jest.fn().mockResolvedValueOnce(mockTextData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockTextData });
    });

    it('should return error with status when external API returns non-OK response', async () => {
      const mockError = { message: 'Rate limit exceeded' };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockError),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(429);
      expect(data).toEqual({ error: mockError });
    });

    it('should return 500 when fetch throws an exception', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Internal server error' });
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should handle non-OK response with text content type', async () => {
      const mockErrorText = 'Error occurred';
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 503,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: jest.fn().mockResolvedValueOnce(mockErrorText),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=basescan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(503);
      expect(data).toEqual({ error: mockErrorText });
    });
  });

  describe('GET - edge cases', () => {
    it('should handle valid checksummed address', async () => {
      const mockData = { result: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockData });
    });

    it('should handle lowercase address', async () => {
      const mockData = { result: [] };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0xab5801a7d398351b8be11c439e05c5b3259aec9b';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=etherscan`
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
    });

    it('should handle empty result array from external API', async () => {
      const mockData = { result: [], status: '1', message: 'OK' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/proxy?address=${address}&apiType=basescan`
      );

      const response = await GET(request);
      const data = (await response.json()) as ProxyResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockData });
    });
  });
});
