/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';

// Mock the logger
jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

import { GET } from './route';
import { logger } from 'apps/web/src/utils/logger';

type TalentProtocolResponse = {
  score?: number;
  passport_id?: string;
  error?: string;
};

describe('talentprotocol/[address] route', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv, TALENT_PROTOCOL_API_KEY: 'test-api-key' };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('GET', () => {
    it('should return 400 when address is missing', async () => {
      const request = new NextRequest(
        'https://www.base.org/api/basenames/talentprotocol/'
      );

      const response = await GET(request, { params: Promise.resolve({ address: '' }) });
      const data = (await response.json()) as TalentProtocolResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: address is required' });
    });

    it('should call Talent Protocol API with correct URL and headers', async () => {
      const mockData = { score: 85, passport_id: 'abc123' };
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      await GET(request, { params: Promise.resolve({ address }) });

      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.talentprotocol.com/score?id=${encodeURIComponent(address)}`,
        {
          method: 'GET',
          headers: {
            'X-API-KEY': 'test-api-key',
          },
        }
      );
    });

    it('should return data from Talent Protocol API on success', async () => {
      const mockData = { score: 85, passport_id: 'abc123' };
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      const response = await GET(request, { params: Promise.resolve({ address }) });
      const data = (await response.json()) as TalentProtocolResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockData);
    });

    it('should return 404 when Talent Protocol API returns null data', async () => {
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(null),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      const response = await GET(request, { params: Promise.resolve({ address }) });
      const data = (await response.json()) as TalentProtocolResponse;

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: '404: address not found' });
    });

    it('should return 500 and log error when fetch throws an exception', async () => {
      const testError = new Error('Network error');
      mockFetch.mockRejectedValueOnce(testError);

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      const response = await GET(request, { params: Promise.resolve({ address }) });
      const data = (await response.json()) as TalentProtocolResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch data' });
      expect(logger.error).toHaveBeenCalledWith(
        'error getting talent protocol information',
        testError
      );
    });

    it('should encode the address in the URL', async () => {
      const mockData = { score: 85 };
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0xABC+special/chars';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      await GET(request, { params: Promise.resolve({ address }) });

      expect(mockFetch).toHaveBeenCalledWith(
        `https://api.talentprotocol.com/score?id=${encodeURIComponent(address)}`,
        expect.any(Object)
      );
    });

    it('should use API key from environment variable', async () => {
      process.env.TALENT_PROTOCOL_API_KEY = 'custom-api-key';
      const mockData = { score: 85 };
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      await GET(request, { params: Promise.resolve({ address }) });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        {
          method: 'GET',
          headers: {
            'X-API-KEY': 'custom-api-key',
          },
        }
      );
    });

    it('should return 500 when json parsing fails', async () => {
      const testError = new Error('JSON parse error');
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockRejectedValueOnce(testError),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      const response = await GET(request, { params: Promise.resolve({ address }) });
      const data = (await response.json()) as TalentProtocolResponse;

      expect(response.status).toBe(500);
      expect(data).toEqual({ error: 'Failed to fetch data' });
      expect(logger.error).toHaveBeenCalledWith(
        'error getting talent protocol information',
        testError
      );
    });

    it('should return data with various valid response structures', async () => {
      const mockData = { score: 0, passport_id: null, activity: { total: 100 } };
      mockFetch.mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const address = '0x1234567890123456789012345678901234567890';
      const request = new NextRequest(
        `https://www.base.org/api/basenames/talentprotocol/${address}`
      );

      const response = await GET(request, { params: Promise.resolve({ address }) });
      const data = (await response.json()) as TalentProtocolResponse;

      expect(response.status).toBe(200);
      expect(data).toEqual(mockData);
    });
  });
});
