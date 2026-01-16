/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server';
import { base, baseSepolia } from 'viem/chains';

// Mock the utility functions - these must be before the route import
jest.mock('apps/web/src/utils/basenames/getChain');
jest.mock('apps/web/src/utils/basenames/getDomain');
jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

// Mock urls utility to prevent is-ipfs import
jest.mock('apps/web/src/utils/urls', () => ({
  IsValidIpfsUrl: jest.fn().mockReturnValue(false),
  getIpfsGatewayUrl: jest.fn(),
  IsValidVercelBlobUrl: jest.fn().mockReturnValue(false),
}));

// Mock usernames with the functions we need
const mockGetBasenameNameExpires = jest.fn();
const mockFormatBaseEthDomain = jest.fn();
const mockFetchResolverAddressByNode = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  getBasenameNameExpires: (...args: unknown[]) => mockGetBasenameNameExpires(...args),
  formatBaseEthDomain: (...args: unknown[]) => mockFormatBaseEthDomain(...args),
  fetchResolverAddressByNode: (...args: unknown[]) => mockFetchResolverAddressByNode(...args),
  /* eslint-enable @typescript-eslint/no-unsafe-return */
  USERNAME_DOMAINS: {
    [8453]: 'base.eth',
    [84532]: 'basetest.eth',
  },
}));

// Mock useBasenameChain
const mockReadContract = jest.fn();
const mockGetBasenamePublicClient = jest.fn();
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  /* eslint-disable @typescript-eslint/no-unsafe-return */
  getBasenamePublicClient: (...args: unknown[]) => mockGetBasenamePublicClient(...args),
  /* eslint-enable @typescript-eslint/no-unsafe-return */
}));

// Mock premintMapping
jest.mock('apps/web/app/(basenames)/api/basenames/metadata/premintsMapping', () => ({
  premintMapping: {},
}));

import { GET } from './route';
import { getChain } from 'apps/web/src/utils/basenames/getChain';
import { getDomain } from 'apps/web/src/utils/basenames/getDomain';
import { premintMapping } from 'apps/web/app/(basenames)/api/basenames/metadata/premintsMapping';

const mockGetChain = getChain as jest.MockedFunction<typeof getChain>;
const mockGetDomain = getDomain as jest.MockedFunction<typeof getDomain>;
const mockPremintMapping = premintMapping as unknown as Record<string, string>;

type TokenMetadata = {
  image: string;
  external_url: string;
  description: string;
  name: string;
  nameExpires: number;
}

type ErrorResponse = {
  error: string;
}

describe('metadata/[tokenId] route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetDomain.mockReturnValue('https://www.base.org');
    mockGetChain.mockReturnValue(base.id);
    mockGetBasenamePublicClient.mockReturnValue({
      readContract: mockReadContract,
    });
    mockFetchResolverAddressByNode.mockResolvedValue('0x1234567890123456789012345678901234567890');
  });

  describe('GET', () => {
    it('should return 400 when tokenId is missing', async () => {
      const request = new NextRequest('https://www.base.org/api/basenames/metadata/');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '' }) });
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: tokenId is missing' });
    });

    it('should return 400 when chainId is missing', async () => {
      mockGetChain.mockReturnValue(0); // Falsy value

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: chainId is missing' });
    });

    it('should return 400 when base domain name is missing for unknown chainId', async () => {
      mockGetChain.mockReturnValue(999); // Unknown chain ID

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(400);
      expect(data).toEqual({ error: '400: base domain name is missing' });
    });

    it('should return 404 when basename is not found and no premint', async () => {
      mockReadContract.mockResolvedValue('');
      mockGetBasenameNameExpires.mockResolvedValue(undefined);

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: '404: Basename not found' });
    });

    it('should return token metadata for a valid basename', async () => {
      const basename = 'testname.base.eth';
      const nameExpires = BigInt(1735689600);

      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(nameExpires);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/metadata/12345?chainId=8453'
      );

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as TokenMetadata;

      expect(response.status).toBe(200);
      expect(data).toEqual({
        image: `https://www.base.org/api/basenames/${basename}/assets/cardImage.svg`,
        external_url: 'https://www.base.org/name/testname',
        description: `${basename}, a Basename`,
        name: basename,
        nameExpires: Number(nameExpires),
      });
    });

    it('should strip .json suffix from tokenId', async () => {
      const basename = 'testname.base.eth';
      const nameExpires = BigInt(1735689600);

      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(nameExpires);

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345.json');

      const response = await GET(request, {
        params: Promise.resolve({ tokenId: '12345.json' }),
      });
      const data = (await response.json()) as TokenMetadata;

      expect(response.status).toBe(200);
      expect(data.name).toBe(basename);
    });

    it('should use premint mapping when contract returns no basename', async () => {
      const premintName = 'coinbase-inc';
      const formattedName = 'coinbase-inc.base.eth';
      const tokenId =
        '37822892751006505573822118291273217378616098801247648661409594746449634517818';

      mockReadContract.mockRejectedValue(new Error('Not found'));
      mockPremintMapping[tokenId] = premintName;
      mockFormatBaseEthDomain.mockReturnValue(formattedName);

      const request = new NextRequest(
        `https://www.base.org/api/basenames/metadata/${tokenId}`
      );

      const response = await GET(request, { params: Promise.resolve({ tokenId }) });
      const data = (await response.json()) as TokenMetadata;

      expect(response.status).toBe(200);
      expect(mockFormatBaseEthDomain).toHaveBeenCalledWith(premintName, base.id);
      expect(data.name).toBe(formattedName);

      // Clean up
      delete mockPremintMapping[tokenId];
    });

    it('should use full basename for external_url on non-base chains', async () => {
      const basename = 'testname.basetest.eth';
      const nameExpires = BigInt(1735689600);

      mockGetChain.mockReturnValue(baseSepolia.id);
      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(nameExpires);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/metadata/12345?chainId=84532'
      );

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as TokenMetadata;

      expect(response.status).toBe(200);
      expect(data.external_url).toBe('https://www.base.org/name/testname.basetest.eth');
    });

    it('should use pure basename (without domain) for external_url on base mainnet', async () => {
      const basename = 'testname.base.eth';
      const nameExpires = BigInt(1735689600);

      mockGetChain.mockReturnValue(base.id);
      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(nameExpires);

      const request = new NextRequest(
        'https://www.base.org/api/basenames/metadata/12345?chainId=8453'
      );

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as TokenMetadata;

      expect(response.status).toBe(200);
      expect(data.external_url).toBe('https://www.base.org/name/testname');
    });

    it('should call getChain with the request', async () => {
      mockReadContract.mockResolvedValue('testname.base.eth');
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });

      expect(mockGetChain).toHaveBeenCalledWith(request);
    });

    it('should call getDomain with the request', async () => {
      mockReadContract.mockResolvedValue('testname.base.eth');
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });

      expect(mockGetDomain).toHaveBeenCalledWith(request);
    });

    it('should call getBasenamePublicClient with the chainId', async () => {
      mockReadContract.mockResolvedValue('testname.base.eth');
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });

      expect(mockGetBasenamePublicClient).toHaveBeenCalledWith(base.id);
    });

    it('should handle contract read errors gracefully and check premint', async () => {
      mockReadContract.mockRejectedValue(new Error('Contract error'));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as ErrorResponse;

      expect(response.status).toBe(404);
      expect(data).toEqual({ error: '404: Basename not found' });
    });

    it('should use local domain in development environment', async () => {
      mockGetDomain.mockReturnValue('http://localhost:3000');
      mockReadContract.mockResolvedValue('testname.base.eth');
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('http://localhost:3000/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as TokenMetadata;

      expect(response.status).toBe(200);
      expect(data.image).toBe(
        'http://localhost:3000/api/basenames/testname.base.eth/assets/cardImage.svg'
      );
      expect(data.external_url).toBe('http://localhost:3000/name/testname');
    });

    it('should return nameExpires as a number in the response', async () => {
      const basename = 'testname.base.eth';
      const nameExpires = BigInt(1735689600);

      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(nameExpires);

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as TokenMetadata;

      expect(typeof data.nameExpires).toBe('number');
      expect(data.nameExpires).toBe(1735689600);
    });

    it('should include description with basename', async () => {
      const basename = 'myname.base.eth';

      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      const response = await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });
      const data = (await response.json()) as TokenMetadata;

      expect(data.description).toBe('myname.base.eth, a Basename');
    });

    it('should call fetchResolverAddressByNode with chainId and namehash', async () => {
      mockReadContract.mockResolvedValue('testname.base.eth');
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });

      expect(mockFetchResolverAddressByNode).toHaveBeenCalledWith(base.id, expect.any(String));
    });

    it('should call getBasenameNameExpires with the formatted basename', async () => {
      const basename = 'testname.base.eth';
      mockReadContract.mockResolvedValue(basename);
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(1735689600));

      const request = new NextRequest('https://www.base.org/api/basenames/metadata/12345');

      await GET(request, { params: Promise.resolve({ tokenId: '12345' }) });

      expect(mockGetBasenameNameExpires).toHaveBeenCalledWith(basename);
    });
  });
});
