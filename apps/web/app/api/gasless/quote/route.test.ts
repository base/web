/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

// Store original env
const originalEnv = process.env;

// Set env before any imports
process.env = {
  ...originalEnv,
  ZERO_X_API_KEY: 'test-0x-api-key',
};

// Import after mocks are set up
import { GET } from './route';

// Reset modules to ensure fresh import with mocked env
beforeEach(() => {
  jest.clearAllMocks();
});

afterAll(() => {
  process.env = originalEnv;
});

type GaslessQuoteResponse = {
  data?: unknown;
  error?: string;
};

describe('api/gasless/quote route', () => {

  describe('GET - parameter validation', () => {
    it('should return 400 when chainId is missing', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing chainId parameter' });
    });

    it('should return 400 when sellToken is missing', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid sellToken parameter' });
    });

    it('should return 400 when sellToken is invalid', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=invalid-address&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid sellToken parameter' });
    });

    it('should return 400 when buyToken is missing', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid buyToken parameter' });
    });

    it('should return 400 when buyToken is invalid', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=invalid-address&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid buyToken parameter' });
    });

    it('should return 400 when sellAmount is missing', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing sellAmount parameter' });
    });

    it('should return 400 when taker is missing', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid taker parameter' });
    });

    it('should return 400 when taker is invalid', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=invalid-address'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: 'Missing or invalid taker parameter' });
    });
  });

  describe('GET - successful request', () => {
    it('should call 0x API with correct URL and headers', async () => {
      const mockData = {
        chainId: 1,
        price: '1000000',
        guaranteedPrice: '990000',
        estimatedPriceImpact: '0.01',
        to: '0x0000000000000000000000000000000000000001',
        data: '0x',
        value: '0',
        gas: '150000',
        gasPrice: '25000000000',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      await GET(request);

      expect(mockFetch).toHaveBeenCalledWith(
        'https://api.0x.org/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
        expect.objectContaining({
          method: 'GET',
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          headers: expect.objectContaining({
            '0x-api-key': 'test-0x-api-key',
            '0x-version': 'v2',
          }),
        })
      );
    });

    it('should return data on successful response', async () => {
      const mockData = {
        chainId: 1,
        price: '1000000',
        guaranteedPrice: '990000',
        estimatedPriceImpact: '0.01',
        to: '0x0000000000000000000000000000000000000001',
        data: '0x',
        value: '0',
        gas: '150000',
        gasPrice: '25000000000',
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockData });
    });

    it('should handle checksummed addresses', async () => {
      const mockData = { price: '1000000' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdAC17F958D2ee523a2206206994597C13D831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
    });
  });

  describe('GET - error handling', () => {
    it('should return error with status when 0x API returns non-OK response', async () => {
      const mockError = { code: 100, reason: 'Validation failed', validationErrors: [] };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockError),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: mockError });
    });

    it('should handle text response when content-type is not JSON', async () => {
      const mockTextData = 'Service temporarily unavailable';
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'text/plain' }),
        text: jest.fn().mockResolvedValueOnce(mockTextData),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual({ data: mockTextData });
    });

    it('should return 500 when fetch throws an exception', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch.mockRejectedValueOnce(new Error('Network error'));

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Internal server error' });
      expect(consoleSpy).toHaveBeenCalled();

      consoleSpy.mockRestore();
    });

    it('should return 500 when API key is not configured', async () => {
      // Temporarily remove API key
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      process.env.ZERO_X_API_KEY = '';

      // Re-import module with new env
      jest.resetModules();
      const { GET: GETWithoutKey } = await import('./route');

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GETWithoutKey(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'API key not configured' });
      expect(consoleSpy).toHaveBeenCalled();

      // Restore API key
      process.env.ZERO_X_API_KEY = 'test-0x-api-key';
      consoleSpy.mockRestore();
    });

    it('should handle rate limit error', async () => {
      const mockError = { code: 429, reason: 'Too many requests' };
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockError),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);
      const data = (await response.json()) as GaslessQuoteResponse;

      expect(response.status).toBe(429);
      expect(data).toEqual({ error: mockError });
    });
  });

  describe('GET - edge cases', () => {
    it('should handle different chain IDs', async () => {
      const mockData = { price: '1000000' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const request = new NextRequest(
        'https://www.base.org/api/gasless/quote?chainId=8453&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=1105553300749629440&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('chainId=8453'),
        expect.any(Object)
      );
    });

    it('should handle large sellAmount values', async () => {
      const mockData = { price: '1000000' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        headers: new Headers({ 'content-type': 'application/json' }),
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const largeAmount = '999999999999999999999999999999';
      const request = new NextRequest(
        `https://www.base.org/api/gasless/quote?chainId=1&sellToken=0xC18360217D8F7Ab5e7c516566761Ea12Ce7F9D72&buyToken=0xdac17f958d2ee523a2206206994597c13d831ec7&sellAmount=${largeAmount}&taker=0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
      );

      const response = await GET(request);

      expect(response.status).toBe(200);
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`sellAmount=${largeAmount}`),
        expect.any(Object)
      );
    });
  });
});
