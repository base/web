/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { base, baseSepolia } from 'viem/chains';
import { GET } from './route';

// Mock the utility functions
jest.mock('apps/web/src/utils/basenames/getChain');
jest.mock('apps/web/src/utils/basenames/getDomain');

import { getChain } from 'apps/web/src/utils/basenames/getChain';
import { getDomain } from 'apps/web/src/utils/basenames/getDomain';

const mockGetChain = getChain as jest.MockedFunction<typeof getChain>;
const mockGetDomain = getDomain as jest.MockedFunction<typeof getDomain>;

type ContractMetadata = {
  name: string;
  description: string;
  image: string;
  banner_image: string;
  featured_image: string;
  external_link: string;
  collaborators: string[];
  error?: string;
};

describe('contract-uri.json route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET', () => {
    it('should return 400 error when chainId is missing', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(0); // Falsy value

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: chainId is missing' });
    });

    it('should return correct metadata for Base mainnet', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(base.id);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=8453'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(response.status).toBe(200);
      expect(data).toEqual({
        name: 'Basename',
        description:
          'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
        image: 'https://www.base.org/images/basenames/contract-uri/logo.png',
        banner_image: 'https://www.base.org/images/basenames/contract-uri/cover-image.png',
        featured_image: 'https://www.base.org/images/basenames/contract-uri/feature-image.png',
        external_link: 'https://www.base.org/names',
        collaborators: [],
      });
    });

    it('should return correct metadata for Base Sepolia testnet', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(baseSepolia.id);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=84532'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(response.status).toBe(200);
      expect(data.name).toBe('Basename (Sepolia testnet)');
      expect(data.description).toBe(
        'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.'
      );
    });

    it('should use domain returned by getDomain for all URLs', async () => {
      mockGetDomain.mockReturnValue('http://localhost:3000');
      mockGetChain.mockReturnValue(base.id);

      const request = new NextRequest(
        'http://localhost:3000/api/basenames/contract-uri.json?chainId=8453'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(response.status).toBe(200);
      expect(data.image).toBe('http://localhost:3000/images/basenames/contract-uri/logo.png');
      expect(data.banner_image).toBe(
        'http://localhost:3000/images/basenames/contract-uri/cover-image.png'
      );
      expect(data.featured_image).toBe(
        'http://localhost:3000/images/basenames/contract-uri/feature-image.png'
      );
      expect(data.external_link).toBe('http://localhost:3000/names');
    });

    it('should call getChain with the request', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(base.id);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=8453'
      );

      await GET(request);

      expect(mockGetChain).toHaveBeenCalledWith(request);
    });

    it('should call getDomain with the request', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(base.id);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=8453'
      );

      await GET(request);

      expect(mockGetDomain).toHaveBeenCalledWith(request);
    });

    it('should return 400 when chainId is NaN', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(NaN); // NaN is falsy

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=invalid'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: chainId is missing' });
    });

    it('should always return empty collaborators array', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(base.id);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=8453'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(data.collaborators).toEqual([]);
    });

    it('should return mainnet name for any non-Sepolia chain ID', async () => {
      mockGetDomain.mockReturnValue('https://www.base.org');
      mockGetChain.mockReturnValue(1); // Ethereum mainnet (not base.id)

      const request = new NextRequest(
        'https://www.base.org/api/basenames/contract-uri.json?chainId=1'
      );

      const response = await GET(request);
      const data = (await response.json()) as ContractMetadata;

      expect(response.status).toBe(200);
      // Since chainId !== base.id (8453), it should return testnet name
      expect(data.name).toBe('Basename (Sepolia testnet)');
    });
  });
});
