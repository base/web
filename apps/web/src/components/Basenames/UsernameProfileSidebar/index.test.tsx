/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsernameProfileSidebar from './index';

// Mock the useUsernameProfile hook
const mockSetShowProfileSettings = jest.fn();
const mockProfileRefetch = jest.fn();
let mockUseUsernameProfileValue = {
  profileUsername: 'testuser.base.eth',
  profileAddress: '0x1234567890abcdef1234567890abcdef12345678',
  currentWalletIsProfileEditor: false,
  showProfileSettings: false,
  setShowProfileSettings: mockSetShowProfileSettings,
  profileRefetch: mockProfileRefetch,
  currentWalletNeedsToReclaimProfile: false,
};

jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => mockUseUsernameProfileValue,
}));

// Mock wagmi
const mockUseAccount = jest.fn();
jest.mock('wagmi', () => ({
  useAccount: () => mockUseAccount(),
}));

// Mock useBasenameChain
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: 8453, name: 'Base' },
  }),
}));

// Mock useErrors
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock Analytics
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock libs/base-ui/utils/logEvent
jest.mock('libs/base-ui/utils/logEvent', () => ({
  ActionType: {
    render: 'render',
    change: 'change',
    click: 'click',
  },
}));

// Mock next/navigation
const mockRouterPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock useReadBaseEnsTextRecords
const mockUseReadBaseEnsTextRecords = jest.fn();
jest.mock('apps/web/src/hooks/useReadBaseEnsTextRecords', () => ({
  __esModule: true,
  default: () => mockUseReadBaseEnsTextRecords(),
}));

// Mock useWriteContractWithReceipt
const mockInitiateTransaction = jest.fn();
let mockTransactionStatus = 'idle';
let mockTransactionIsLoading = false;

jest.mock('apps/web/src/hooks/useWriteContractWithReceipt', () => ({
  __esModule: true,
  default: () => ({
    initiateTransaction: mockInitiateTransaction,
    transactionStatus: mockTransactionStatus,
    transactionIsLoading: mockTransactionIsLoading,
  }),
  WriteTransactionWithReceiptStatus: {
    Idle: 'idle',
    Initiated: 'initiated',
    Canceled: 'canceled',
    Approved: 'approved',
    Processing: 'processing',
    Reverted: 'reverted',
    Success: 'success',
  },
}));

// Mock usernames utilities
const mockBuildBasenameReclaimContract = jest.fn();
let mockIsBasenameRenewalsKilled = false;

jest.mock('apps/web/src/utils/usernames', () => ({
  buildBasenameReclaimContract: (...args: unknown[]) => mockBuildBasenameReclaimContract(...args),
  get isBasenameRenewalsKilled() {
    return mockIsBasenameRenewalsKilled;
  },
  UsernameTextRecordKeys: {
    Description: 'description',
    Keywords: 'keywords',
    Url: 'url',
    Url2: 'url2',
    Url3: 'url3',
    Email: 'email',
    Phone: 'phone',
    Avatar: 'avatar',
    Location: 'location',
    Github: 'com.github',
    Twitter: 'com.twitter',
    Farcaster: 'xyz.farcaster',
    Lens: 'xyz.lens',
    Telegram: 'org.telegram',
    Discord: 'com.discord',
    Frames: 'frames',
    Casts: 'casts',
  },
}));

// Mock child components
jest.mock('apps/web/src/components/Basenames/UsernamePill', () => ({
  UsernamePill: ({
    variant,
    username,
    address,
  }: {
    variant: string;
    username: string;
    address: string;
  }) => (
    <div data-testid="username-pill" data-variant={variant} data-username={username} data-address={address}>
      UsernamePill
    </div>
  ),
}));

jest.mock('../UsernamePill/types', () => ({
  UsernamePillVariants: {
    Card: 'card',
  },
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileCard', () => ({
  __esModule: true,
  default: () => <div data-testid="username-profile-card">UsernameProfileCard</div>,
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileKeywords', () => ({
  __esModule: true,
  default: ({ keywords }: { keywords: string }) => (
    <div data-testid="username-profile-keywords" data-keywords={keywords}>
      UsernameProfileKeywords
    </div>
  ),
}));

jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({
    children,
    onClick,
    variant,
    rounded,
    fullWidth,
    isLoading,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    variant: string;
    rounded?: boolean;
    fullWidth?: boolean;
    isLoading?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      data-variant={variant}
      data-rounded={rounded}
      data-fullwidth={fullWidth}
      data-isloading={isLoading}
    >
      {children}
    </button>
  ),
  ButtonVariants: {
    Gray: 'gray',
  },
}));

describe('UsernameProfileSidebar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUsernameProfileValue = {
      profileUsername: 'testuser.base.eth',
      profileAddress: '0x1234567890abcdef1234567890abcdef12345678',
      currentWalletIsProfileEditor: false,
      showProfileSettings: false,
      setShowProfileSettings: mockSetShowProfileSettings,
      profileRefetch: mockProfileRefetch,
      currentWalletNeedsToReclaimProfile: false,
    };
    mockUseAccount.mockReturnValue({ address: '0x1234567890abcdef1234567890abcdef12345678' });
    mockUseReadBaseEnsTextRecords.mockReturnValue({
      existingTextRecords: {
        keywords: '',
      },
    });
    mockTransactionStatus = 'idle';
    mockTransactionIsLoading = false;
    mockIsBasenameRenewalsKilled = false;
    mockBuildBasenameReclaimContract.mockReturnValue({ abi: [], address: '0x123', args: [], functionName: 'reclaim' });
    mockProfileRefetch.mockResolvedValue({});
    mockInitiateTransaction.mockResolvedValue({});
  });

  describe('basic rendering', () => {
    it('should render the aside element', () => {
      const { container } = render(<UsernameProfileSidebar />);
      const aside = container.querySelector('aside');
      expect(aside).toBeInTheDocument();
    });

    it('should render UsernamePill with correct props', () => {
      render(<UsernameProfileSidebar />);
      const pill = screen.getByTestId('username-pill');
      expect(pill).toBeInTheDocument();
      expect(pill).toHaveAttribute('data-variant', 'card');
      expect(pill).toHaveAttribute('data-username', 'testuser.base.eth');
      expect(pill).toHaveAttribute('data-address', '0x1234567890abcdef1234567890abcdef12345678');
    });

    it('should render UsernameProfileCard', () => {
      render(<UsernameProfileSidebar />);
      expect(screen.getByTestId('username-profile-card')).toBeInTheDocument();
    });
  });

  describe('manage profile button (currentWalletIsProfileEditor)', () => {
    it('should not show manage profile buttons when user is not profile editor', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = false;
      render(<UsernameProfileSidebar />);
      expect(screen.queryByText('Manage Profile')).not.toBeInTheDocument();
      expect(screen.queryByText('Back to Profile')).not.toBeInTheDocument();
    });

    it('should show "Manage Profile" button when user is profile editor and settings are hidden', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockUseUsernameProfileValue.showProfileSettings = false;
      render(<UsernameProfileSidebar />);
      expect(screen.getByText('Manage Profile')).toBeInTheDocument();
    });

    it('should show "Back to Profile" button when user is profile editor and settings are shown', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockUseUsernameProfileValue.showProfileSettings = true;
      render(<UsernameProfileSidebar />);
      expect(screen.getByText('Back to Profile')).toBeInTheDocument();
    });

    it('should toggle settings and log analytics when clicking manage profile button', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockUseUsernameProfileValue.showProfileSettings = false;
      render(<UsernameProfileSidebar />);

      fireEvent.click(screen.getByText('Manage Profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('profile_edit_modal_open', 'render');
      expect(mockSetShowProfileSettings).toHaveBeenCalledWith(true);
    });

    it('should toggle settings when clicking "Back to Profile" button', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockUseUsernameProfileValue.showProfileSettings = true;
      render(<UsernameProfileSidebar />);

      fireEvent.click(screen.getByText('Back to Profile'));

      expect(mockSetShowProfileSettings).toHaveBeenCalledWith(false);
    });

    it('should not call setShowProfileSettings if user is not profile editor', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = false;
      render(<UsernameProfileSidebar />);
      // No button to click because user is not editor
      expect(mockSetShowProfileSettings).not.toHaveBeenCalled();
    });
  });

  describe('extend registration button', () => {
    it('should show extend registration button when user is profile editor and renewals are not killed', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockIsBasenameRenewalsKilled = false;
      render(<UsernameProfileSidebar />);
      expect(screen.getByText('Extend Registration')).toBeInTheDocument();
    });

    it('should not show extend registration button when renewals are killed', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockIsBasenameRenewalsKilled = true;
      render(<UsernameProfileSidebar />);
      expect(screen.queryByText('Extend Registration')).not.toBeInTheDocument();
    });

    it('should navigate to renew page and log analytics when clicking extend registration', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      mockIsBasenameRenewalsKilled = false;
      render(<UsernameProfileSidebar />);

      fireEvent.click(screen.getByText('Extend Registration'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('extend_registration_button_clicked', 'click', {
        context: 'profile_sidebar',
      });
      expect(mockRouterPush).toHaveBeenCalledWith('/name/testuser.base.eth/renew');
    });
  });

  describe('claim name button (reclaim profile)', () => {
    it('should not show claim name button when user does not need to reclaim', () => {
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = false;
      render(<UsernameProfileSidebar />);
      expect(screen.queryByText('Claim name')).not.toBeInTheDocument();
    });

    it('should show claim name button when user needs to reclaim profile', () => {
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = true;
      render(<UsernameProfileSidebar />);
      expect(screen.getByText('Claim name')).toBeInTheDocument();
    });

    it('should initiate reclaim transaction when clicking claim name', async () => {
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = true;
      render(<UsernameProfileSidebar />);

      fireEvent.click(screen.getByText('Claim name'));

      await waitFor(() => {
        expect(mockInitiateTransaction).toHaveBeenCalled();
      });
    });

    it('should show loading state on claim button when transaction is loading', () => {
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = true;
      mockTransactionIsLoading = true;
      render(<UsernameProfileSidebar />);

      const claimButton = screen.getByText('Claim name');
      expect(claimButton).toHaveAttribute('data-isloading', 'true');
    });

    it('should not initiate reclaim when reclaimContract is undefined', () => {
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = true;
      mockUseAccount.mockReturnValue({ address: undefined });
      render(<UsernameProfileSidebar />);

      fireEvent.click(screen.getByText('Claim name'));

      expect(mockInitiateTransaction).not.toHaveBeenCalled();
    });
  });

  describe('keywords section', () => {
    it('should not render keywords component when no keywords exist', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          keywords: '',
        },
      });
      render(<UsernameProfileSidebar />);
      expect(screen.queryByTestId('username-profile-keywords')).not.toBeInTheDocument();
    });

    it('should render keywords component when keywords exist', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          keywords: 'web3,blockchain,defi',
        },
      });
      render(<UsernameProfileSidebar />);
      const keywords = screen.getByTestId('username-profile-keywords');
      expect(keywords).toBeInTheDocument();
      expect(keywords).toHaveAttribute('data-keywords', 'web3,blockchain,defi');
    });
  });

  describe('layout structure', () => {
    it('should have flex column layout with gap', () => {
      const { container } = render(<UsernameProfileSidebar />);
      const aside = container.querySelector('aside');
      expect(aside).toHaveClass('flex');
      expect(aside).toHaveClass('flex-col');
      expect(aside).toHaveClass('gap-6');
    });

    it('should render buttons with correct variant', () => {
      mockUseUsernameProfileValue.currentWalletIsProfileEditor = true;
      render(<UsernameProfileSidebar />);

      const manageButton = screen.getByText('Manage Profile');
      expect(manageButton).toHaveAttribute('data-variant', 'gray');
      expect(manageButton).toHaveAttribute('data-rounded', 'true');
      expect(manageButton).toHaveAttribute('data-fullwidth', 'true');
    });
  });

  describe('reclaim profile effect on success', () => {
    it('should call profileRefetch when reclaim transaction succeeds', async () => {
      // This tests the useEffect that triggers profileRefetch on success
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = true;
      mockTransactionStatus = 'success';

      render(<UsernameProfileSidebar />);

      await waitFor(() => {
        expect(mockProfileRefetch).toHaveBeenCalled();
      });
    });
  });

  describe('error handling', () => {
    it('should log error when reclaim transaction fails', async () => {
      mockUseUsernameProfileValue.currentWalletNeedsToReclaimProfile = true;
      const error = new Error('Transaction failed');
      mockInitiateTransaction.mockRejectedValue(error);

      render(<UsernameProfileSidebar />);

      fireEvent.click(screen.getByText('Claim name'));

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to reclaim profile');
      });
    });
  });
});
