import { generateImageMetadata } from './opengraph-image';
import OpenGraphImage from './opengraph-image';
import { UsernameProfileProps } from './page';
import { Basename } from '@coinbase/onchainkit/identity';

// Mock next/og ImageResponse
jest.mock('next/og', () => ({
  ImageResponse: jest.fn().mockImplementation((element: unknown, options: unknown) => ({
    element,
    options,
  })),
}));

// Mock font fetch
const mockFontArrayBuffer = new ArrayBuffer(8);
global.fetch = jest.fn().mockResolvedValue({
  arrayBuffer: jest.fn().mockResolvedValue(mockFontArrayBuffer),
});

// Mock usernames utils
const mockFormatBaseEthDomain = jest.fn();
const mockGetBasenameImage = jest.fn();
const mockGetChainForBasename = jest.fn();
const mockFetchResolverAddress = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  formatBaseEthDomain: (...args: unknown[]) => mockFormatBaseEthDomain(...args) as unknown,
  getBasenameImage: (...args: unknown[]) => mockGetBasenameImage(...args) as unknown,
  getChainForBasename: (...args: unknown[]) => mockGetChainForBasename(...args) as unknown,
  fetchResolverAddress: (...args: unknown[]) => mockFetchResolverAddress(...args) as unknown,
  USERNAME_DOMAINS: {
    8453: 'base.eth',
    84532: 'basetest.eth',
  },
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

// Mock the cover image background
jest.mock('apps/web/app/(basenames)/name/[username]/coverImageBackground.png', () => ({
  src: '/cover-image-background.png',
}));

// Mock logger
jest.mock('apps/web/src/utils/logger', () => ({
  logger: {
    error: jest.fn(),
  },
}));

describe('opengraph-image', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockFormatBaseEthDomain.mockImplementation((name: string) => `${name}.base.eth`);
    mockGetBasenameImage.mockReturnValue({ src: '/default-avatar.png' });
    mockGetChainForBasename.mockReturnValue({ id: 8453 });
    mockFetchResolverAddress.mockResolvedValue('0x1234567890123456789012345678901234567890');
    mockGetBasenamePublicClient.mockReturnValue({
      getEnsText: mockGetEnsText,
    });
    mockGetEnsText.mockResolvedValue(null);
  });

  describe('generateImageMetadata', () => {
    it('should return metadata with correct alt text for username', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice' as Basename }),
      };

      const result = await generateImageMetadata(props);

      expect(result).toHaveLength(1);
      expect(result[0].alt).toBe('Basenames | alice.base.eth');
    });

    it('should return correct content type', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'bob' as Basename }),
      };

      const result = await generateImageMetadata(props);

      expect(result[0].contentType).toBe('image/png');
    });

    it('should return correct size dimensions', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'charlie' as Basename }),
      };

      const result = await generateImageMetadata(props);

      expect(result[0].size).toEqual({
        width: 1200,
        height: 630,
      });
    });

    it('should sanitize username to alphanumeric for id', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'test-user_123' as Basename }),
      };

      const result = await generateImageMetadata(props);

      // ID should have special characters removed
      expect(result[0].id).toBe('testuser123baseeth');
    });

    it('should format username with base.eth domain if not already formatted', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice' as Basename }),
      };

      await generateImageMetadata(props);

      expect(mockFormatBaseEthDomain).toHaveBeenCalledWith('alice', 8453);
    });

    it('should not reformat username that already ends with base.eth', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice.base.eth' as Basename }),
      };

      const result = await generateImageMetadata(props);

      expect(mockFormatBaseEthDomain).not.toHaveBeenCalled();
      expect(result[0].alt).toBe('Basenames | alice.base.eth');
    });

    it('should not reformat username that already ends with basetest.eth', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice.basetest.eth' as Basename }),
      };

      const result = await generateImageMetadata(props);

      expect(mockFormatBaseEthDomain).not.toHaveBeenCalled();
      expect(result[0].alt).toBe('Basenames | alice.basetest.eth');
    });
  });

  describe('OpenGraphImage', () => {
    it('should decode URI-encoded usernames', async () => {
      const props = {
        id: 'test',
        params: { username: 'hello%20world' },
      };

      await OpenGraphImage(props);

      // The decoded username should be used
      expect(mockGetChainForBasename).toHaveBeenCalledWith('hello world.base.eth');
    });

    it('should fetch avatar from ENS text record', async () => {
      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      await OpenGraphImage(props);

      expect(mockGetBasenamePublicClient).toHaveBeenCalledWith(8453);
      expect(mockGetEnsText).toHaveBeenCalledWith({
        name: 'alice.base.eth',
        key: 'avatar',
        universalResolverAddress: '0x1234567890123456789012345678901234567890',
      });
    });

    it('should use default image when no avatar is set', async () => {
      mockGetEnsText.mockResolvedValue(null);

      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      await OpenGraphImage(props);

      expect(mockGetBasenameImage).toHaveBeenCalledWith('alice.base.eth');
    });

    it('should handle custom avatar URL', async () => {
       
      const { getCloudinaryMediaUrl } = require('apps/web/src/utils/images') as { getCloudinaryMediaUrl: jest.Mock };
      mockGetEnsText.mockResolvedValue('https://example.com/avatar.png');

      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      await OpenGraphImage(props);

      expect(getCloudinaryMediaUrl).toHaveBeenCalledWith({
        media: 'https://example.com/avatar.png',
        format: 'png',
        width: 80,
      });
    });

    it('should handle IPFS avatar URL', async () => {
       
      const { IsValidIpfsUrl, getIpfsGatewayUrl } = require('apps/web/src/utils/urls') as { IsValidIpfsUrl: jest.Mock; getIpfsGatewayUrl: jest.Mock };
       
      const { getCloudinaryMediaUrl } = require('apps/web/src/utils/images') as { getCloudinaryMediaUrl: jest.Mock };
      IsValidIpfsUrl.mockReturnValue(true);
      getIpfsGatewayUrl.mockReturnValue('https://ipfs.io/ipfs/Qm123');
      mockGetEnsText.mockResolvedValue('ipfs://Qm123');

      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      await OpenGraphImage(props);

      expect(IsValidIpfsUrl).toHaveBeenCalledWith('ipfs://Qm123');
      expect(getIpfsGatewayUrl).toHaveBeenCalledWith('ipfs://Qm123');
      expect(getCloudinaryMediaUrl).toHaveBeenCalledWith({
        media: 'https://ipfs.io/ipfs/Qm123',
        format: 'png',
        width: 80,
      });
    });

    it('should handle errors when fetching avatar gracefully', async () => {
       
      const { logger } = require('apps/web/src/utils/logger') as { logger: { error: jest.Mock } };
      const error = new Error('Failed to fetch avatar');
      mockGetEnsText.mockRejectedValue(error);

      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      // Should not throw
      await expect(OpenGraphImage(props)).resolves.toBeDefined();

      expect(logger.error).toHaveBeenCalledWith('Error fetching basename Avatar:', error);
    });

    it('should return an ImageResponse', async () => {
       
      const { ImageResponse } = require('next/og') as { ImageResponse: jest.Mock };

      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      const result = await OpenGraphImage(props);

      expect(ImageResponse).toHaveBeenCalled();
      expect(result).toBeDefined();
    });

    it('should include username in the image', async () => {
       
      const { ImageResponse } = require('next/og') as { ImageResponse: jest.Mock };

      const props = {
        id: 'test',
        params: { username: 'testuser' },
      };

      await OpenGraphImage(props);

      // Verify ImageResponse was called with proper dimensions
      const call = ImageResponse.mock.calls[0] as unknown[];
      expect(call[1]).toMatchObject({
        width: 1200,
        height: 630,
      });
    });

    it('should load custom font for the image', async () => {
       
      const { ImageResponse } = require('next/og') as { ImageResponse: jest.Mock };

      const props = {
        id: 'test',
        params: { username: 'alice' },
      };

      await OpenGraphImage(props);

      const call = ImageResponse.mock.calls[0] as { fonts: { name: string; style: string }[] }[];
      expect(call[1].fonts).toHaveLength(1);
      expect(call[1].fonts[0]).toMatchObject({
        name: 'CoinbaseDisplay',
        style: 'normal',
      });
    });

    it('should format username with base.eth if not already formatted', async () => {
      const props = {
        id: 'test',
        params: { username: 'bob' },
      };

      await OpenGraphImage(props);

      expect(mockFormatBaseEthDomain).toHaveBeenCalledWith('bob', 8453);
    });

    it('should not reformat username if already ends with base.eth', async () => {
      const props = {
        id: 'test',
        params: { username: 'bob.base.eth' },
      };

      await OpenGraphImage(props);

      expect(mockFormatBaseEthDomain).not.toHaveBeenCalled();
    });
  });
});
