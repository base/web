/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { GET } from './route';

// Mock the utility functions
jest.mock('apps/web/src/utils/basenames/getChain');
jest.mock('apps/web/src/utils/basenames/getDomain');

import { getChain } from 'apps/web/src/utils/basenames/getChain';
import { getDomain } from 'apps/web/src/utils/basenames/getDomain';

const mockGetChain = getChain as jest.MockedFunction<typeof getChain>;
const mockGetDomain = getDomain as jest.MockedFunction<typeof getDomain>;

describe('contract-uri route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return 400 error when chainId is missing', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(0); // Falsy value

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri'
      );

      const response = await GET(request);
      const data = (await response.json()) as { error: string };

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: chainId is missing' });
    });

    it('should redirect to contract-uri.json with chainId when chainId is provided', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(8453); // Base mainnet chain ID

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri?chainId=8453'
      );

      const response = await GET(request);

      expect(response.status).toBe(307); // NextResponse.redirect uses 307 by default
      expect(response.headers.get('location')).toBe(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=8453'
      );
    });

    it('should redirect with the correct chainId for Base Sepolia', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(84532); // Base Sepolia chain ID

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri?chainId=84532'
      );

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=84532'
      );
    });

    it('should use domain returned by getDomain', async () => {
      mockGetDomain.mockReturnValue('http://localhost:3000');
      mockGetChain.mockReturnValue(8453);

      const request = new NextRequest(
        'http://localhost:3000/api/basenames/contract-uri?chainId=8453'
      );

      const response = await GET(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe(
        'http://localhost:3000/api/basenames/contract-uri.json?chainId=8453'
      );
    });

    it('should call getChain with the request', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(8453);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri?chainId=8453'
      );

      await GET(request);

      expect(mockGetChain).toHaveBeenCalledWith(request);
    });

    it('should call getDomain with the request', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(8453);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri?chainId=8453'
      );

      await GET(request);

      expect(mockGetDomain).toHaveBeenCalledWith(request);
    });

    it('should return 400 when chainId is NaN (returned as 0 or falsy)', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(NaN); // NaN is falsy

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri?chainId=invalid'
      );

      const response = await GET(request);
      const data = (await response.json()) as { error: string };

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: chainId is missing' });
    });
  });
});
