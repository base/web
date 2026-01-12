/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { type Address } from 'viem';
import { type Basename } from '@coinbase/onchainkit/identity';
import BasenameIdentity from './index';

// Mock useBasenameChain
const mockUseBasenameChain = jest.fn();
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  default: () => mockUseBasenameChain(),
}));

// Mock useBasenameResolver
const mockUseBasenameResolver = jest.fn();
jest.mock('apps/web/src/hooks/useBasenameResolver', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  default: (params: unknown) => mockUseBasenameResolver(params),
}));

// Mock wagmi's useEnsAddress
const mockUseEnsAddress = jest.fn();
jest.mock('wagmi', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useEnsAddress: (params: unknown) => mockUseEnsAddress(params),
}));

// Mock BasenameAvatar component
jest.mock('apps/web/src/components/Basenames/BasenameAvatar', () => ({
  __esModule: true,
  default: ({
    basename,
    width,
    height,
    wrapperClassName,
  }: {
    basename: string;
    width: number;
    height: number;
    wrapperClassName: string;
  }) => (
    <div
      data-testid="basename-avatar"
      data-basename={basename}
      data-width={width}
      data-height={height}
      data-wrapper-class={wrapperClassName}
    />
  ),
}));

// Mock truncateMiddle
const mockTruncateMiddle = jest.fn();
jest.mock('libs/base-ui/utils/string', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  truncateMiddle: (...args: unknown[]) => mockTruncateMiddle(...args),
}));

describe('BasenameIdentity', () => {
  const mockUsername = 'testname.base.eth' as Basename;
  const mockResolverAddress = '0x1234567890123456789012345678901234567890' as Address;
  const mockBasenameAddress = '0xabcdef0123456789abcdef0123456789abcdef01' as Address;
  const mockTruncatedAddress = '0xabcd...ef01';

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock implementations
    mockUseBasenameChain.mockReturnValue({
      basenameChain: { id: 8453, name: 'Base' },
    });

    mockUseBasenameResolver.mockReturnValue({
      data: mockResolverAddress,
    });

    mockUseEnsAddress.mockReturnValue({
      data: mockBasenameAddress,
    });

    mockTruncateMiddle.mockReturnValue(mockTruncatedAddress);
  });

  describe('rendering', () => {
    it('should render the username', () => {
      render(<BasenameIdentity username={mockUsername} />);

      expect(screen.getByText(mockUsername)).toBeInTheDocument();
    });

    it('should render the BasenameAvatar with correct props', () => {
      render(<BasenameIdentity username={mockUsername} />);

      const avatar = screen.getByTestId('basename-avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-basename', mockUsername);
      expect(avatar).toHaveAttribute('data-width', '32');
      expect(avatar).toHaveAttribute('data-height', '32');
    });

    it('should render the truncated address when basenameAddress is available', () => {
      render(<BasenameIdentity username={mockUsername} />);

      expect(mockTruncateMiddle).toHaveBeenCalledWith(mockBasenameAddress, 6, 4);
      expect(screen.getByText(mockTruncatedAddress)).toBeInTheDocument();
    });

    it('should not render address when basenameAddress is undefined', () => {
      mockUseEnsAddress.mockReturnValue({
        data: undefined,
      });

      render(<BasenameIdentity username={mockUsername} />);

      expect(mockTruncateMiddle).not.toHaveBeenCalled();
      expect(screen.queryByText(mockTruncatedAddress)).not.toBeInTheDocument();
    });
  });

  describe('hook integration', () => {
    it('should call useBasenameChain without arguments', () => {
      render(<BasenameIdentity username={mockUsername} />);

      expect(mockUseBasenameChain).toHaveBeenCalled();
    });

    it('should call useBasenameResolver with the username', () => {
      render(<BasenameIdentity username={mockUsername} />);

      expect(mockUseBasenameResolver).toHaveBeenCalledWith({ username: mockUsername });
    });

    it('should call useEnsAddress with correct parameters', () => {
      render(<BasenameIdentity username={mockUsername} />);

      expect(mockUseEnsAddress).toHaveBeenCalledWith({
        name: mockUsername,
        universalResolverAddress: mockResolverAddress,
        chainId: 8453,
        query: { enabled: true },
      });
    });

    it('should disable useEnsAddress query when resolver address is undefined', () => {
      mockUseBasenameResolver.mockReturnValue({
        data: undefined,
      });

      render(<BasenameIdentity username={mockUsername} />);

      expect(mockUseEnsAddress).toHaveBeenCalledWith(
        expect.objectContaining({
          query: { enabled: false },
        })
      );
    });

    it('should use the chain id from useBasenameChain', () => {
      const testnetChainId = 84532;
      mockUseBasenameChain.mockReturnValue({
        basenameChain: { id: testnetChainId, name: 'Base Sepolia' },
      });

      render(<BasenameIdentity username={mockUsername} />);

      expect(mockUseEnsAddress).toHaveBeenCalledWith(
        expect.objectContaining({
          chainId: testnetChainId,
        })
      );
    });
  });

  describe('different username formats', () => {
    it('should handle mainnet basenames (.base.eth)', () => {
      const mainnetUsername = 'myname.base.eth' as Basename;

      render(<BasenameIdentity username={mainnetUsername} />);

      expect(screen.getByText(mainnetUsername)).toBeInTheDocument();
      expect(mockUseBasenameResolver).toHaveBeenCalledWith({ username: mainnetUsername });
    });

    it('should handle testnet basenames (.basetest.eth)', () => {
      const testnetUsername = 'myname.basetest.eth' as Basename;

      render(<BasenameIdentity username={testnetUsername} />);

      expect(screen.getByText(testnetUsername)).toBeInTheDocument();
      expect(mockUseBasenameResolver).toHaveBeenCalledWith({ username: testnetUsername });
    });
  });

  describe('layout and styling', () => {
    it('should render with flex layout and gap', () => {
      const { container } = render(<BasenameIdentity username={mockUsername} />);

      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('flex', 'items-center', 'gap-4');
    });

    it('should render username in a strong tag', () => {
      render(<BasenameIdentity username={mockUsername} />);

      const strong = screen.getByText(mockUsername).closest('strong');
      expect(strong).toBeInTheDocument();
    });

    it('should render address with gray styling', () => {
      render(<BasenameIdentity username={mockUsername} />);

      const addressElement = screen.getByText(mockTruncatedAddress);
      expect(addressElement).toHaveClass('text-gray-40');
    });
  });

  describe('edge cases', () => {
    it('should handle null basenameAddress', () => {
      mockUseEnsAddress.mockReturnValue({
        data: null,
      });

      render(<BasenameIdentity username={mockUsername} />);

      expect(mockTruncateMiddle).not.toHaveBeenCalled();
    });

    it('should handle empty string resolver address', () => {
      mockUseBasenameResolver.mockReturnValue({
        data: '' as Address,
      });

      render(<BasenameIdentity username={mockUsername} />);

      // Empty string is falsy, so query should be disabled
      expect(mockUseEnsAddress).toHaveBeenCalledWith(
        expect.objectContaining({
          query: { enabled: false },
        })
      );
    });
  });
});
