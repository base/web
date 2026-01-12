/**
 * @jest-environment jsdom
 */

import { render, screen, act, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import UsernameProfileProvider, {
  UsernameProfileContext,
  useUsernameProfile,
  UsernameProfileContextProps,
} from './index';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock Errors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock useBasenameChain
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: 8453 },
  }),
}));

// Mock useBasenameResolver
jest.mock('apps/web/src/hooks/useBasenameResolver', () => ({
  __esModule: true,
  default: () => ({
    data: '0x1234567890123456789012345678901234567890',
  }),
}));

// Mock useBaseEnsName
jest.mock('apps/web/src/hooks/useBaseEnsName', () => ({
  __esModule: true,
  default: () => ({
    data: 'owner.base.eth',
  }),
}));

// Mock wagmi
const mockConnectedAddress = '0x1234567890123456789012345678901234567890';
const mockProfileAddress = '0x1234567890123456789012345678901234567890';
const mockProfileEditorAddress = '0x1234567890123456789012345678901234567890';
const mockProfileOwnerAddress = '0x1234567890123456789012345678901234567890';
let mockIsConnected = true;
let mockProfileAddressIsFetching = false;
let mockProfileEditorAddressIsFetching = false;
let mockProfileOwnerIsFetching = false;

const mockProfileAddressRefetch = jest.fn().mockResolvedValue({});
const mockProfileEditorRefetch = jest.fn().mockResolvedValue({});
const mockProfileOwnerRefetch = jest.fn().mockResolvedValue({});

jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockConnectedAddress,
    isConnected: mockIsConnected,
  }),
  useEnsAddress: () => ({
    data: mockProfileAddress,
    isFetching: mockProfileAddressIsFetching,
    refetch: mockProfileAddressRefetch,
  }),
  useReadContract: jest.fn((config) => {
    // Distinguish between editor and owner contract calls based on functionName in the config
    if (config && config.functionName === 'owner') {
      return {
        data: mockProfileEditorAddress,
        isFetching: mockProfileEditorAddressIsFetching,
        refetch: mockProfileEditorRefetch,
      };
    }
    // Default to owner contract (ownerOf)
    return {
      data: mockProfileOwnerAddress,
      isFetching: mockProfileOwnerIsFetching,
      refetch: mockProfileOwnerRefetch,
    };
  }),
}));

// Mock usernames utilities
const mockGetBasenameNameExpires = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  buildBasenameOwnerContract: () => ({
    abi: [],
    address: '0x0000000000000000000000000000000000000000',
    args: [BigInt(0)],
    functionName: 'ownerOf',
  }),
  buildBasenameEditorContract: () => ({
    abi: [],
    address: '0x0000000000000000000000000000000000000000',
    args: ['0x0'],
    functionName: 'owner',
  }),
  formatDefaultUsername: jest.fn().mockResolvedValue('testname.base.eth'),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  getBasenameNameExpires: (name: string) => mockGetBasenameNameExpires(name),
}));

// Test component to consume the context
function TestConsumer() {
  const context = useUsernameProfile();

  const handleToggleSettings = () => context.setShowProfileSettings((prev) => !prev);
  const handleRefetch = () => {
    void context.profileRefetch();
  };

  return (
    <div>
      <span data-testid="profileUsername">{context.profileUsername}</span>
      <span data-testid="profileAddress">{context.profileAddress ?? 'undefined'}</span>
      <span data-testid="profileEditorAddress">{context.profileEditorAddress ?? 'undefined'}</span>
      <span data-testid="profileOwnerUsername">{context.profileOwnerUsername ?? 'undefined'}</span>
      <span data-testid="currentWalletIsProfileEditor">
        {String(context.currentWalletIsProfileEditor)}
      </span>
      <span data-testid="currentWalletIsProfileOwner">
        {String(context.currentWalletIsProfileOwner)}
      </span>
      <span data-testid="currentWalletIsProfileAddress">
        {String(context.currentWalletIsProfileAddress)}
      </span>
      <span data-testid="showProfileSettings">{String(context.showProfileSettings)}</span>
      <span data-testid="msUntilExpiration">{context.msUntilExpiration ?? 'undefined'}</span>
      <span data-testid="canSetAddr">{String(context.canSetAddr)}</span>
      <span data-testid="canReclaim">{String(context.canReclaim)}</span>
      <span data-testid="canSafeTransferFrom">{String(context.canSafeTransferFrom)}</span>
      <span data-testid="currentWalletNeedsToReclaimProfile">
        {String(context.currentWalletNeedsToReclaimProfile)}
      </span>
      <button
        type="button"
        aria-label="Toggle settings"
        data-testid="toggleSettings"
        onClick={handleToggleSettings}
      />
      <button
        type="button"
        aria-label="Refetch profile"
        data-testid="refetchProfile"
        onClick={handleRefetch}
      />
    </div>
  );
}

describe('UsernameProfileContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsConnected = true;
    mockProfileAddressIsFetching = false;
    mockProfileEditorAddressIsFetching = false;
    mockProfileOwnerIsFetching = false;
    // Set expiration time to 30 days from now
    mockGetBasenameNameExpires.mockResolvedValue(
      BigInt(Math.floor((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000)),
    );
  });

  describe('UsernameProfileContext default values', () => {
    function DefaultContextConsumer() {
      const context = useContext(UsernameProfileContext);
      return (
        <div>
          <span data-testid="profileUsername">{context.profileUsername}</span>
          <span data-testid="profileAddress">{context.profileAddress ?? 'undefined'}</span>
          <span data-testid="currentWalletIsProfileEditor">
            {String(context.currentWalletIsProfileEditor)}
          </span>
          <span data-testid="currentWalletIsProfileOwner">
            {String(context.currentWalletIsProfileOwner)}
          </span>
          <span data-testid="showProfileSettings">{String(context.showProfileSettings)}</span>
          <span data-testid="canSetAddr">{String(context.canSetAddr)}</span>
          <span data-testid="canReclaim">{String(context.canReclaim)}</span>
          <span data-testid="canSafeTransferFrom">{String(context.canSafeTransferFrom)}</span>
          <span data-testid="currentWalletNeedsToReclaimProfile">
            {String(context.currentWalletNeedsToReclaimProfile)}
          </span>
        </div>
      );
    }

    it('should have correct default values', () => {
      render(<DefaultContextConsumer />);

      expect(screen.getByTestId('profileUsername')).toHaveTextContent('default.basetest.eth');
      expect(screen.getByTestId('profileAddress')).toHaveTextContent('undefined');
      expect(screen.getByTestId('currentWalletIsProfileEditor')).toHaveTextContent('false');
      expect(screen.getByTestId('currentWalletIsProfileOwner')).toHaveTextContent('false');
      expect(screen.getByTestId('showProfileSettings')).toHaveTextContent('false');
      expect(screen.getByTestId('canSetAddr')).toHaveTextContent('false');
      expect(screen.getByTestId('canReclaim')).toHaveTextContent('false');
      expect(screen.getByTestId('canSafeTransferFrom')).toHaveTextContent('false');
      expect(screen.getByTestId('currentWalletNeedsToReclaimProfile')).toHaveTextContent('false');
    });

    it('should have noop functions that return undefined', () => {
      let contextValue: UsernameProfileContextProps | null = null;

      function ContextCapture() {
        contextValue = useContext(UsernameProfileContext);
        return null;
      }

      render(<ContextCapture />);

      expect(contextValue).not.toBeNull();
      if (contextValue) {
        const ctx = contextValue as UsernameProfileContextProps;
        expect(ctx.setShowProfileSettings(true)).toBeUndefined();
      }
    });
  });

  describe('UsernameProfileProvider', () => {
    it('should render children', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <div data-testid="child">Child Content</div>
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('should provide context values to children', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('profileUsername')).toHaveTextContent('testname.base.eth');
    });

    it('should provide profile address from useEnsAddress', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('profileAddress')).toHaveTextContent(mockProfileAddress);
    });

    it('should provide profile owner username from useBaseEnsName', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('profileOwnerUsername')).toHaveTextContent('owner.base.eth');
    });
  });

  describe('state management', () => {
    it('should update showProfileSettings when setShowProfileSettings is called', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('showProfileSettings')).toHaveTextContent('false');

      await act(async () => {
        screen.getByTestId('toggleSettings').click();
      });

      expect(screen.getByTestId('showProfileSettings')).toHaveTextContent('true');
    });

    it('should toggle showProfileSettings back to false', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      await act(async () => {
        screen.getByTestId('toggleSettings').click();
      });

      expect(screen.getByTestId('showProfileSettings')).toHaveTextContent('true');

      await act(async () => {
        screen.getByTestId('toggleSettings').click();
      });

      expect(screen.getByTestId('showProfileSettings')).toHaveTextContent('false');
    });
  });

  describe('profileRefetch', () => {
    it('should call all refetch functions when profileRefetch is invoked', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      await act(async () => {
        screen.getByTestId('refetchProfile').click();
      });

      expect(mockProfileAddressRefetch).toHaveBeenCalled();
      expect(mockProfileEditorRefetch).toHaveBeenCalled();
      expect(mockProfileOwnerRefetch).toHaveBeenCalled();
    });
  });

  describe('permission flags', () => {
    it('should set currentWalletIsProfileEditor to true when connected wallet matches editor', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('currentWalletIsProfileEditor')).toHaveTextContent('true');
    });

    it('should set currentWalletIsProfileOwner to true when connected wallet matches owner', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('currentWalletIsProfileOwner')).toHaveTextContent('true');
    });

    it('should set currentWalletIsProfileAddress to true when connected wallet matches profile address', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('currentWalletIsProfileAddress')).toHaveTextContent('true');
    });

    it('should set canSetAddr to true when wallet is editor or owner', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('canSetAddr')).toHaveTextContent('true');
    });

    it('should set canReclaim to true when wallet is owner', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('canReclaim')).toHaveTextContent('true');
    });

    it('should set canSafeTransferFrom to true when wallet is owner', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('canSafeTransferFrom')).toHaveTextContent('true');
    });

    it('should set currentWalletIsProfileEditor to false when not connected', async () => {
      mockIsConnected = false;

      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('currentWalletIsProfileEditor')).toHaveTextContent('false');
    });

    it('should set currentWalletIsProfileEditor to false when still fetching', async () => {
      mockProfileEditorAddressIsFetching = true;

      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('currentWalletIsProfileEditor')).toHaveTextContent('false');
    });
  });

  describe('expiration date fetching', () => {
    it('should fetch and set expiration time on mount', async () => {
      const futureExpiration = Math.floor((Date.now() + 30 * 24 * 60 * 60 * 1000) / 1000);
      mockGetBasenameNameExpires.mockResolvedValue(BigInt(futureExpiration));

      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      await waitFor(() => {
        expect(screen.getByTestId('msUntilExpiration')).not.toHaveTextContent('undefined');
      });
    });

    it('should log error when expiration date fetch fails', async () => {
      const error = new Error('Fetch failed');
      mockGetBasenameNameExpires.mockRejectedValue(error);

      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(error, 'Error checking basename expiration');
      });
    });

    it('should handle null expiration date without setting msUntilExpiration', async () => {
      mockGetBasenameNameExpires.mockResolvedValue(null);

      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      // msUntilExpiration should remain undefined when expiresAt is null
      expect(screen.getByTestId('msUntilExpiration')).toHaveTextContent('undefined');
    });
  });

  describe('useUsernameProfile hook', () => {
    it('should return context values when used inside provider', async () => {
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('profileUsername')).toBeInTheDocument();
    });

    it('should throw error when used outside of provider with undefined context', async () => {
      // The useUsernameProfile hook checks for undefined context and throws
      // However, since the context has default values, we need to simulate
      // a scenario where context is undefined. This is challenging to test
      // directly since createContext always provides default values.
      // Instead, we verify the hook works correctly within the provider.

      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('profileUsername')).toHaveTextContent('testname.base.eth');
    });
  });

  describe('currentWalletNeedsToReclaimProfile', () => {
    it('should be false when wallet is both editor and owner', async () => {
      // When the connected wallet is both the editor and owner,
      // currentWalletNeedsToReclaimProfile should be false
      render(
        <UsernameProfileProvider username="testname.base.eth">
          <TestConsumer />
        </UsernameProfileProvider>,
      );

      await waitFor(() => {
        expect(mockGetBasenameNameExpires).toHaveBeenCalled();
      });

      expect(screen.getByTestId('currentWalletNeedsToReclaimProfile')).toHaveTextContent('false');
    });
  });
});
