/**
 * @jest-environment node
 */
import { GET } from './route';
import satori from 'satori';
import twemoji from 'twemoji';
import { readFile } from 'node:fs/promises';

// Mock satori
jest.mock('satori', () => jest.fn().mockResolvedValue('<svg>mock svg</svg>'));

// Mock twemoji
jest.mock('twemoji', () => ({
  convert: {
    toCodePoint: jest.fn().mockReturnValue('1f600'),
  },
}));

// Mock fs/promises for font loading
jest.mock('node:fs/promises', () => ({
  readFile: jest.fn().mockResolvedValue(Buffer.from('mock font data')),
}));

const mockSatori = satori as jest.MockedFunction<typeof satori>;
const mockReadFile = readFile as jest.MockedFunction<typeof readFile>;

// Mock usernames utils
const mockGetBasenameImage = jest.fn();
const mockGetChainForBasename = jest.fn();
const mockFetchResolverAddress = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  getBasenameImage: (...args: unknown[]) => mockGetBasenameImage(...args) as unknown,
  getChainForBasename: (...args: unknown[]) => mockGetChainForBasename(...args) as unknown,
  fetchResolverAddress: (...args: unknown[]) => mockFetchResolverAddress(...args) as unknown,
  UsernameTextRecordKeys: {
    Avatar: 'avatar',
  },
}));

// Mock useBasenameChain
const mockGetEnsText = jest.fn();
const mockGetBasenamePublicClient = jest.fn();
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  getBasenamePublicClient: (...args: unknown[]) => mockGetBasenamePublicClient(...args) as unknown,
}));

// Mock constants
jest.mock('apps/web/src/constants', () => ({
  isDevelopment: false,
}));

// Mock urls utility
jest.mock('apps/web/src/utils/urls', () => ({
  IsValidIpfsUrl: jest.fn().mockReturnValue(false),
  getIpfsGatewayUrl: jest.fn(),
}));

// Mock images utility
jest.mock('apps/web/src/utils/images', () => ({
  getCloudinaryMediaUrl: jest.fn(({ media }) => `https://cloudinary.com/${media}`),
}));

// Mock ImageRaw component
jest.mock('apps/web/src/components/ImageRaw', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => `ImageRaw: ${src} - ${alt}`,
}));

// Mock logger
jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('cardImage.svg route', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockGetBasenameImage.mockReturnValue({ src: '/default-avatar.png' });
    mockGetChainForBasename.mockReturnValue({ id: 8453 });
    mockFetchResolverAddress.mockResolvedValue('0x1234567890123456789012345678901234567890');
    mockGetBasenamePublicClient.mockReturnValue({
      getEnsText: mockGetEnsText,
    });
    mockGetEnsText.mockResolvedValue(null);
  });

  describe('GET', () => {
    it('should return an SVG response with correct content type', async () => {
      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      const response = await GET(request, { params });

      expect(response.headers.get('Content-Type')).toBe('image/svg+xml');
    });

    it('should return SVG content in the response body', async () => {
      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      const response = await GET(request, { params });
      const body = await response.text();

      expect(mockSatori).toHaveBeenCalled();
      expect(body).toBe('<svg>mock svg</svg>');
    });

    it('should use username from params', async () => {
      const request = new Request('https://www.base.org/api/basenames/testuser/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'testuser' });

      await GET(request, { params });

      expect(mockGetChainForBasename).toHaveBeenCalledWith('testuser');
    });

    it('should default to "yourname" when name param is missing', async () => {
      const request = new Request('https://www.base.org/api/basenames/assets/cardImage.svg');
      const params = Promise.resolve({ name: undefined as unknown as string });

      await GET(request, { params });

      expect(mockGetChainForBasename).toHaveBeenCalledWith('yourname');
    });

    it('should fetch avatar from ENS text record', async () => {
      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(mockGetBasenamePublicClient).toHaveBeenCalledWith(8453);
      expect(mockGetEnsText).toHaveBeenCalledWith({
        name: 'alice',
        key: 'avatar',
        universalResolverAddress: '0x1234567890123456789012345678901234567890',
      });
    });

    it('should use default image when no avatar is set', async () => {
      mockGetEnsText.mockResolvedValue(null);

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(mockGetBasenameImage).toHaveBeenCalledWith('alice');
    });

    it('should handle custom avatar URL', async () => {
       
      const { getCloudinaryMediaUrl } = require('apps/web/src/utils/images') as { getCloudinaryMediaUrl: jest.Mock };
      mockGetEnsText.mockResolvedValue('https://example.com/avatar.png');

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(getCloudinaryMediaUrl).toHaveBeenCalledWith({
        media: 'https://example.com/avatar.png',
        format: 'png',
        width: 120,
      });
    });

    it('should handle IPFS avatar URL', async () => {
       
      const { IsValidIpfsUrl, getIpfsGatewayUrl } = require('apps/web/src/utils/urls') as { IsValidIpfsUrl: jest.Mock; getIpfsGatewayUrl: jest.Mock };
       
      const { getCloudinaryMediaUrl } = require('apps/web/src/utils/images') as { getCloudinaryMediaUrl: jest.Mock };
      IsValidIpfsUrl.mockReturnValue(true);
      getIpfsGatewayUrl.mockReturnValue('https://ipfs.io/ipfs/Qm123');
      mockGetEnsText.mockResolvedValue('ipfs://Qm123');

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(IsValidIpfsUrl).toHaveBeenCalledWith('ipfs://Qm123');
      expect(getIpfsGatewayUrl).toHaveBeenCalledWith('ipfs://Qm123');
      expect(getCloudinaryMediaUrl).toHaveBeenCalledWith({
        media: 'https://ipfs.io/ipfs/Qm123',
        format: 'png',
        width: 120,
      });
    });

    it('should fallback to default image when IPFS gateway URL is null', async () => {
       
      const { IsValidIpfsUrl, getIpfsGatewayUrl } = require('apps/web/src/utils/urls') as { IsValidIpfsUrl: jest.Mock; getIpfsGatewayUrl: jest.Mock };
       
      const { getCloudinaryMediaUrl } = require('apps/web/src/utils/images') as { getCloudinaryMediaUrl: jest.Mock };
      IsValidIpfsUrl.mockReturnValue(true);
      getIpfsGatewayUrl.mockReturnValue(null);
      mockGetEnsText.mockResolvedValue('ipfs://Qm123');

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(IsValidIpfsUrl).toHaveBeenCalledWith('ipfs://Qm123');
      expect(getIpfsGatewayUrl).toHaveBeenCalledWith('ipfs://Qm123');
      // When gateway returns null, image source remains unchanged (default image with base.org domain prefix)
      expect(getCloudinaryMediaUrl).toHaveBeenCalledWith({
        media: 'https://www.base.org/default-avatar.png',
        format: 'png',
        width: 120,
      });
    });

    it('should handle errors when fetching avatar gracefully', async () => {
       
      const { logger } = require('apps/web/src/utils/logger') as { logger: { error: jest.Mock } };
      const error = new Error('Failed to fetch avatar');
      mockGetEnsText.mockRejectedValue(error);

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      // Should not throw
      const response = await GET(request, { params });
      expect(response).toBeDefined();
      expect(response.headers.get('Content-Type')).toBe('image/svg+xml');

      expect(logger.error).toHaveBeenCalledWith('Error fetching basename Avatar:', error);
    });

    it('should use development domain when isDevelopment is true', async () => {
      jest.resetModules();
      jest.doMock('apps/web/src/constants', () => ({
        isDevelopment: true,
      }));

      // Re-import the module to get fresh mocks
       
      const { GET: GETDev } = require('./route') as { GET: typeof GET };

      const request = new Request('http://localhost:3000/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GETDev(request, { params });

      // In development mode, the domain should be extracted from the request URL
      expect(mockGetBasenameImage).toHaveBeenCalledWith('alice');

      // Restore the original mock
      jest.resetModules();
      jest.doMock('apps/web/src/constants', () => ({
        isDevelopment: false,
      }));
    });

    it('should call satori with correct dimensions', async () => {
      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(mockSatori).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          width: 1000,
          height: 1000,
        })
      );
    });

    it('should load custom font for the image', async () => {
      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      expect(mockReadFile).toHaveBeenCalled();
      expect(mockSatori).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          fonts: expect.arrayContaining([
            expect.objectContaining({
              name: 'CoinbaseDisplay',
              weight: 500,
              style: 'normal',
            }),
          ]) as unknown,
        })
      );
    });

    it('should handle emoji loading in loadAdditionalAsset', async () => {
      // Mock fetch for emoji loading
      global.fetch = jest.fn().mockResolvedValue({
        text: jest.fn().mockResolvedValue('<svg>emoji svg</svg>'),
      });

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      const satoriCall = mockSatori.mock.calls[0];
      const loadAdditionalAsset = satoriCall[1].loadAdditionalAsset;

      // Test emoji loading
      const emojiResult = await loadAdditionalAsset('emoji', '😀');
      expect(twemoji.convert.toCodePoint).toHaveBeenCalledWith('😀');
      expect(global.fetch).toHaveBeenCalledWith(
        'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f600.svg'
      );
      expect(emojiResult).toBe('data:image/svg+xml;base64,' + btoa('<svg>emoji svg</svg>'));
    });

    it('should return code for non-emoji assets', async () => {
      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      const satoriCall = mockSatori.mock.calls[0];
      const loadAdditionalAsset = satoriCall[1].loadAdditionalAsset;

      // Test non-emoji asset loading
      const result = await loadAdditionalAsset('font', 'test');
      expect(result).toBe('font');
    });

    it('should cache emoji fetches', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        text: jest.fn().mockResolvedValue('<svg>emoji svg</svg>'),
      });

      const request = new Request('https://www.base.org/api/basenames/alice/assets/cardImage.svg');
      const params = Promise.resolve({ name: 'alice' });

      await GET(request, { params });

      const satoriCall = mockSatori.mock.calls[0];
      const loadAdditionalAsset = satoriCall[1].loadAdditionalAsset;

      // First call should fetch
      await loadAdditionalAsset('emoji', '😀');
      const fetchCallCount = (global.fetch as jest.Mock).mock.calls.length;

      // Second call with same emoji should use cache
      await loadAdditionalAsset('emoji', '😀');
      expect((global.fetch as jest.Mock).mock.calls.length).toBe(fetchCallCount);
    });
  });
});
