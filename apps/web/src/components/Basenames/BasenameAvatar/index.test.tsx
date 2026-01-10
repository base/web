/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { type Basename } from '@coinbase/onchainkit/identity';
import BasenameAvatar from './index';

// Mock useBaseEnsAvatar hook
const mockUseBaseEnsAvatar = jest.fn();
jest.mock('apps/web/src/hooks/useBaseEnsAvatar', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  default: (params: unknown) => mockUseBaseEnsAvatar(params),
}));

// Mock ImageWithLoading component
jest.mock('apps/web/src/components/ImageWithLoading', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    title,
    wrapperClassName,
    imageClassName,
    backgroundClassName,
    width,
    height,
    forceIsLoading,
  }: {
    src: unknown;
    alt: string;
    title: string;
    wrapperClassName: string;
    imageClassName: string;
    backgroundClassName: string;
    width?: number;
    height?: number;
    forceIsLoading: boolean;
  }) => (
    <div
      data-testid="image-with-loading"
      data-src={typeof src === 'string' ? src : 'static-image'}
      data-alt={alt}
      data-title={title}
      data-wrapper-class={wrapperClassName}
      data-image-class={imageClassName}
      data-background-class={backgroundClassName}
      data-width={width}
      data-height={height}
      data-force-is-loading={String(forceIsLoading)}
    />
  ),
}));

// Mock LottieAnimation component
jest.mock('apps/web/src/components/LottieAnimation', () => ({
  __esModule: true,
  default: ({
    data,
    wrapperClassName,
  }: {
    data: unknown;
    wrapperClassName: string;
  }) => (
    <div
      data-testid="lottie-animation"
      data-has-data={String(!!data)}
      data-wrapper-class={wrapperClassName}
    />
  ),
}));

// Mock getBasenameAnimation and getBasenameImage utilities
const mockGetBasenameImage = jest.fn();
const mockGetBasenameAnimation = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getBasenameImage: (...args: unknown[]) => mockGetBasenameImage(...args),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getBasenameAnimation: (...args: unknown[]) => mockGetBasenameAnimation(...args),
}));

describe('BasenameAvatar', () => {
  const mockBasename = 'testuser.base.eth' as Basename;
  const mockAvatarUrl = 'https://example.com/avatar.png';
  const mockDefaultImage = { src: '/images/default.svg', blurDataURL: '' };
  const mockAnimationData = { v: '5.0.0', layers: [] };

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockUseBaseEnsAvatar.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    mockGetBasenameImage.mockReturnValue(mockDefaultImage);
    mockGetBasenameAnimation.mockReturnValue(mockAnimationData);
  });

  describe('rendering with custom avatar', () => {
    it('should render ImageWithLoading when user has a custom avatar', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('data-src', mockAvatarUrl);
      expect(imageElement).toHaveAttribute('data-alt', mockBasename);
      expect(imageElement).toHaveAttribute('data-title', mockBasename);
    });

    it('should render ImageWithLoading with custom avatar even when animate is true', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('data-src', mockAvatarUrl);
    });

    it('should not render LottieAnimation when user has a custom avatar', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate />);

      expect(screen.queryByTestId('lottie-animation')).not.toBeInTheDocument();
    });
  });

  describe('rendering without custom avatar', () => {
    it('should render ImageWithLoading with default image when no avatar and animate is false', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate={false} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toBeInTheDocument();
      expect(imageElement).toHaveAttribute('data-src', 'static-image');
      expect(mockGetBasenameImage).toHaveBeenCalledWith(mockBasename);
    });

    it('should render LottieAnimation when no avatar and animate is true', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate />);

      const lottieElement = screen.getByTestId('lottie-animation');
      expect(lottieElement).toBeInTheDocument();
      expect(lottieElement).toHaveAttribute('data-has-data', 'true');
      expect(mockGetBasenameAnimation).toHaveBeenCalledWith(mockBasename);
    });

    it('should not render ImageWithLoading when no avatar and animate is true', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate />);

      expect(screen.queryByTestId('image-with-loading')).not.toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should pass isLoading to ImageWithLoading forceIsLoading prop', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: true,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-force-is-loading', 'true');
    });

    it('should pass false to forceIsLoading when not loading', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-force-is-loading', 'false');
    });
  });

  describe('wrapperClassName prop', () => {
    it('should use default wrapperClassName when not provided', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute(
        'data-wrapper-class',
        'h-8 w-8 overflow-hidden rounded-full'
      );
    });

    it('should pass custom wrapperClassName to ImageWithLoading', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      const customClassName = 'h-16 w-16 rounded-lg';
      render(<BasenameAvatar basename={mockBasename} wrapperClassName={customClassName} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-wrapper-class', customClassName);
    });

    it('should pass custom wrapperClassName to LottieAnimation', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      const customClassName = 'h-20 w-20';
      render(<BasenameAvatar basename={mockBasename} animate wrapperClassName={customClassName} />);

      const lottieElement = screen.getByTestId('lottie-animation');
      expect(lottieElement).toHaveAttribute('data-wrapper-class', customClassName);
    });
  });

  describe('width and height props', () => {
    it('should pass width and height to ImageWithLoading', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} width={64} height={64} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-width', '64');
      expect(imageElement).toHaveAttribute('data-height', '64');
    });

    it('should pass string number format for width and height', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} width="100" height="100" />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-width', '100');
      expect(imageElement).toHaveAttribute('data-height', '100');
    });

    it('should handle undefined width and height', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      // undefined values result in null when using getAttribute
      expect(imageElement.getAttribute('data-width')).toBeNull();
      expect(imageElement.getAttribute('data-height')).toBeNull();
    });
  });

  describe('hook integration', () => {
    it('should call useBaseEnsAvatar with the basename', () => {
      render(<BasenameAvatar basename={mockBasename} />);

      expect(mockUseBaseEnsAvatar).toHaveBeenCalledWith({ name: mockBasename });
    });

    it('should call useBaseEnsAvatar with different basenames', () => {
      const differentBasename = 'anotheruser.base.eth' as Basename;

      render(<BasenameAvatar basename={differentBasename} />);

      expect(mockUseBaseEnsAvatar).toHaveBeenCalledWith({ name: differentBasename });
    });
  });

  describe('ImageWithLoading styling props', () => {
    it('should pass correct imageClassName to ImageWithLoading', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-image-class', 'object-cover w-full h-full');
    });

    it('should pass correct backgroundClassName to ImageWithLoading', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: mockAvatarUrl,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toHaveAttribute('data-background-class', 'bg-blue-500');
    });
  });

  describe('different basename formats', () => {
    it('should handle mainnet basenames (.base.eth)', () => {
      const mainnetBasename = 'mainnetuser.base.eth' as Basename;
      mockUseBaseEnsAvatar.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mainnetBasename} />);

      expect(mockUseBaseEnsAvatar).toHaveBeenCalledWith({ name: mainnetBasename });
      expect(mockGetBasenameImage).toHaveBeenCalledWith(mainnetBasename);
    });

    it('should handle testnet basenames (.basetest.eth)', () => {
      const testnetBasename = 'testnetuser.basetest.eth' as Basename;
      mockUseBaseEnsAvatar.mockReturnValue({
        data: undefined,
        isLoading: false,
      });

      render(<BasenameAvatar basename={testnetBasename} />);

      expect(mockUseBaseEnsAvatar).toHaveBeenCalledWith({ name: testnetBasename });
      expect(mockGetBasenameImage).toHaveBeenCalledWith(testnetBasename);
    });
  });

  describe('edge cases', () => {
    it('should render LottieAnimation with empty string avatar url when animate is true', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: '',
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate />);

      // Empty string is not nullish, so `basenameAvatar ?? !animate` returns ''
      // which is falsy, leading to the LottieAnimation branch
      const lottieElement = screen.getByTestId('lottie-animation');
      expect(lottieElement).toBeInTheDocument();
    });

    it('should handle null avatar data by using default image', () => {
      mockUseBaseEnsAvatar.mockReturnValue({
        data: null,
        isLoading: false,
      });

      render(<BasenameAvatar basename={mockBasename} animate={false} />);

      const imageElement = screen.getByTestId('image-with-loading');
      expect(imageElement).toBeInTheDocument();
    });
  });
});
