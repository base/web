/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsernameProfileSettingsName from './index';

// Mock values to be controlled per test
let mockProfileUsername = 'testuser.base.eth';
let mockProfileAddress: `0x${string}` = '0x1234567890abcdef1234567890abcdef12345678';
let mockCurrentWalletIsProfileEditor = true;

// Mock for useBaseEnsName
let mockPrimaryUsername: string | undefined = 'testuser.base.eth';

// Mock for useSetPrimaryBasename
const mockSetPrimaryName = jest.fn();
let mockSetPrimaryNameIsLoading = false;
let mockCanSetUsernameAsPrimary = true;

// Mock for useErrors
const mockLogError = jest.fn();

// Mock UsernameProfileContext
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    profileUsername: mockProfileUsername,
    profileAddress: mockProfileAddress,
    currentWalletIsProfileEditor: mockCurrentWalletIsProfileEditor,
  }),
}));

// Mock useBaseEnsName
jest.mock('apps/web/src/hooks/useBaseEnsName', () => ({
  __esModule: true,
  default: () => ({
    data: mockPrimaryUsername,
  }),
}));

// Mock useSetPrimaryBasename
jest.mock('apps/web/src/hooks/useSetPrimaryBasename', () => ({
  __esModule: true,
  default: () => ({
    setPrimaryName: mockSetPrimaryName,
    isLoading: mockSetPrimaryNameIsLoading,
    canSetUsernameAsPrimary: mockCanSetUsernameAsPrimary,
  }),
}));

// Mock useErrors context
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    isLoading,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
    isLoading: boolean;
  }) => (
    <button
      type="button"
      data-testid="set-primary-button"
      onClick={onClick}
      disabled={disabled}
      data-loading={isLoading}
    >
      {children}
    </button>
  ),
  ButtonSizes: {
    Small: 'small',
  },
  ButtonVariants: {
    Gray: 'gray',
  },
}));

describe('UsernameProfileSettingsName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockProfileUsername = 'testuser.base.eth';
    mockProfileAddress = '0x1234567890abcdef1234567890abcdef12345678';
    mockCurrentWalletIsProfileEditor = true;
    mockPrimaryUsername = 'testuser.base.eth';
    mockSetPrimaryNameIsLoading = false;
    mockCanSetUsernameAsPrimary = true;
    mockSetPrimaryName.mockResolvedValue(undefined);
  });

  describe('rendering', () => {
    it('should render the container div', () => {
      render(<UsernameProfileSettingsName />);

      const container = screen.getByText('testuser.base.eth').closest('div');
      expect(container).toBeInTheDocument();
    });

    it('should display the profile username', () => {
      render(<UsernameProfileSettingsName />);

      expect(screen.getByText('testuser.base.eth')).toBeInTheDocument();
    });

    it('should display different username when provided', () => {
      mockProfileUsername = 'anotheruser.base.eth';

      render(<UsernameProfileSettingsName />);

      expect(screen.getByText('anotheruser.base.eth')).toBeInTheDocument();
    });
  });

  describe('primary name badge', () => {
    it('should show Primary Name badge when username is primary and user is editor', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'primary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';

      render(<UsernameProfileSettingsName />);

      expect(screen.getByText('Primary Name')).toBeInTheDocument();
    });

    it('should not show Primary Name badge when username is not primary', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';

      render(<UsernameProfileSettingsName />);

      expect(screen.queryByText('Primary Name')).not.toBeInTheDocument();
    });

    it('should not show Primary Name badge when user is not editor', () => {
      mockCurrentWalletIsProfileEditor = false;
      mockProfileUsername = 'primary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';

      render(<UsernameProfileSettingsName />);

      expect(screen.queryByText('Primary Name')).not.toBeInTheDocument();
    });
  });

  describe('Set as Primary Name button', () => {
    it('should show button when username is secondary and can be set as primary', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';
      mockCanSetUsernameAsPrimary = true;

      render(<UsernameProfileSettingsName />);

      expect(screen.getByTestId('set-primary-button')).toBeInTheDocument();
      expect(screen.getByText('Set as Primary Name')).toBeInTheDocument();
    });

    it('should not show button when username is primary', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'primary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';
      mockCanSetUsernameAsPrimary = true;

      render(<UsernameProfileSettingsName />);

      expect(screen.queryByTestId('set-primary-button')).not.toBeInTheDocument();
    });

    it('should not show button when user is not editor', () => {
      mockCurrentWalletIsProfileEditor = false;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';
      mockCanSetUsernameAsPrimary = true;

      render(<UsernameProfileSettingsName />);

      expect(screen.queryByTestId('set-primary-button')).not.toBeInTheDocument();
    });

    it('should not show button when cannot set username as primary', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';
      mockCanSetUsernameAsPrimary = false;

      render(<UsernameProfileSettingsName />);

      expect(screen.queryByTestId('set-primary-button')).not.toBeInTheDocument();
    });
  });

  describe('button interaction', () => {
    beforeEach(() => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';
      mockCanSetUsernameAsPrimary = true;
    });

    it('should call setPrimaryName when button is clicked', async () => {
      render(<UsernameProfileSettingsName />);

      const button = screen.getByTestId('set-primary-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSetPrimaryName).toHaveBeenCalled();
      });
    });

    it('should disable button when loading', () => {
      mockSetPrimaryNameIsLoading = true;

      render(<UsernameProfileSettingsName />);

      const button = screen.getByTestId('set-primary-button');
      expect(button).toBeDisabled();
    });

    it('should show loading state when loading', () => {
      mockSetPrimaryNameIsLoading = true;

      render(<UsernameProfileSettingsName />);

      const button = screen.getByTestId('set-primary-button');
      expect(button).toHaveAttribute('data-loading', 'true');
    });

    it('should not be disabled when not loading', () => {
      mockSetPrimaryNameIsLoading = false;

      render(<UsernameProfileSettingsName />);

      const button = screen.getByTestId('set-primary-button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('error handling', () => {
    beforeEach(() => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = 'primary.base.eth';
      mockCanSetUsernameAsPrimary = true;
    });

    it('should log error when setPrimaryName fails', async () => {
      const error = new Error('Failed to set primary name');
      mockSetPrimaryName.mockRejectedValue(error);

      render(<UsernameProfileSettingsName />);

      const button = screen.getByTestId('set-primary-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to update primary name');
      });
    });

    it('should not log error when setPrimaryName succeeds', async () => {
      mockSetPrimaryName.mockResolvedValue(undefined);

      render(<UsernameProfileSettingsName />);

      const button = screen.getByTestId('set-primary-button');
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSetPrimaryName).toHaveBeenCalled();
      });

      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('edge cases', () => {
    it('should handle undefined primary username', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = 'secondary.base.eth';
      mockPrimaryUsername = undefined;
      mockCanSetUsernameAsPrimary = true;

      render(<UsernameProfileSettingsName />);

      // Should show the button since profileUsername !== undefined (primaryUsername)
      expect(screen.getByTestId('set-primary-button')).toBeInTheDocument();
      expect(screen.queryByText('Primary Name')).not.toBeInTheDocument();
    });

    it('should handle case when both are undefined/empty', () => {
      mockCurrentWalletIsProfileEditor = true;
      mockProfileUsername = '';
      mockPrimaryUsername = '';

      render(<UsernameProfileSettingsName />);

      // Both are equal, so it should be considered primary
      expect(screen.getByText('Primary Name')).toBeInTheDocument();
      expect(screen.queryByTestId('set-primary-button')).not.toBeInTheDocument();
    });
  });
});
