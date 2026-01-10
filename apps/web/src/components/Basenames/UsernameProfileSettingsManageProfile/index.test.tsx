/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsernameProfileSettingsManageProfile from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock values to be controlled per test
const mockSetShowProfileSettings = jest.fn();
let mockCurrentWalletIsProfileEditor = true;
const mockProfileUsername = 'testuser.base.eth';

// Mock for useWriteBaseEnsTextRecords
const mockWriteTextRecords = jest.fn();
const mockUpdateTextRecords = jest.fn();
let mockWriteTextRecordsIsPending = false;
let mockWriteTextRecordsError: Error | null = null;
let mockHasChanged = false;
let mockUpdatedTextRecords: Record<string, string> = {};
let mockOnSuccessCallback: (() => void) | undefined;

// Mock context hooks
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    profileUsername: mockProfileUsername,
    currentWalletIsProfileEditor: mockCurrentWalletIsProfileEditor,
    setShowProfileSettings: mockSetShowProfileSettings,
  }),
}));

// Mock the Errors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock useWriteBaseEnsTextRecords hook
jest.mock('apps/web/src/hooks/useWriteBaseEnsTextRecords', () => ({
  __esModule: true,
  default: ({ onSuccess }: { onSuccess?: () => void }) => {
    mockOnSuccessCallback = onSuccess;
    return {
      updateTextRecords: mockUpdateTextRecords,
      updatedTextRecords: mockUpdatedTextRecords,
      writeTextRecords: mockWriteTextRecords,
      writeTextRecordsIsPending: mockWriteTextRecordsIsPending,
      writeTextRecordsError: mockWriteTextRecordsError,
      hasChanged: mockHasChanged,
    };
  },
}));

// Mock the usernames utilities
jest.mock('apps/web/src/utils/usernames', () => ({
  textRecordsSocialFieldsEnabled: [
    'com.twitter',
    'xyz.farcaster',
    'com.github',
    'url',
    'url2',
    'url3',
  ],
  USERNAMES_PINNED_CASTS_ENABLED: true,
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
jest.mock('apps/web/src/components/Basenames/UsernameDescriptionField', () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    disabled,
  }: {
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) => (
    <div data-testid="description-field" data-disabled={disabled} data-value={value}>
      <input
        data-testid="description-input"
        value={value}
        onChange={(e) => onChange('description', e.target.value)}
        disabled={disabled}
      />
    </div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/UsernameLocationField', () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    disabled,
  }: {
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) => (
    <div data-testid="location-field" data-disabled={disabled} data-value={value}>
      <input
        data-testid="location-input"
        value={value}
        onChange={(e) => onChange('location', e.target.value)}
        disabled={disabled}
      />
    </div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/UsernameKeywordsField', () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    disabled,
  }: {
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) => (
    <div data-testid="keywords-field" data-disabled={disabled} data-value={value}>
      <input
        data-testid="keywords-input"
        value={value}
        onChange={(e) => onChange('keywords', e.target.value)}
        disabled={disabled}
      />
    </div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/UsernameCastsField', () => ({
  __esModule: true,
  default: ({
    onChange,
    value,
    disabled,
  }: {
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) => (
    <div data-testid="casts-field" data-disabled={disabled} data-value={value}>
      <input
        data-testid="casts-input"
        value={value}
        onChange={(e) => onChange('casts', e.target.value)}
        disabled={disabled}
      />
    </div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/UsernameTextRecordInlineField', () => ({
  __esModule: true,
  default: ({
    textRecordKey,
    onChange,
    value,
    disabled,
  }: {
    textRecordKey: string;
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) => (
    <div
      data-testid={`social-field-${textRecordKey}`}
      data-disabled={disabled}
      data-value={value}
    >
      <input
        data-testid={`social-input-${textRecordKey}`}
        value={value}
        onChange={(e) => onChange(textRecordKey, e.target.value)}
        disabled={disabled}
      />
    </div>
  ),
}));

// Mock Fieldset and Label
jest.mock('apps/web/src/components/Fieldset', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <fieldset data-testid="fieldset">{children}</fieldset>
  ),
}));

jest.mock('apps/web/src/components/Label', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <span data-testid="label">{children}</span>
  ),
}));

// Mock TransactionError
jest.mock('apps/web/src/components/TransactionError', () => ({
  __esModule: true,
  default: ({ error }: { error: Error }) => (
    <div data-testid="transaction-error">{error?.message || 'Error'}</div>
  ),
}));

// Mock Button
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    isLoading,
    variant,
    rounded,
    className,
  }: {
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
    isLoading: boolean;
    variant: string;
    rounded: boolean;
    className: string;
  }) => (
    <button type="button"
      data-testid="save-button"
      onClick={onClick}
      disabled={disabled}
      data-loading={isLoading}
      data-variant={variant}
      data-rounded={rounded}
      className={className}
    >
      {children}
    </button>
  ),
  ButtonVariants: {
    Black: 'black',
    White: 'white',
    Gray: 'gray',
  },
}));

describe('UsernameProfileSettingsManageProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentWalletIsProfileEditor = true;
    mockWriteTextRecordsIsPending = false;
    mockWriteTextRecordsError = null;
    mockHasChanged = false;
    mockOnSuccessCallback = undefined;
    mockUpdatedTextRecords = {
      [UsernameTextRecordKeys.Description]: '',
      [UsernameTextRecordKeys.Location]: '',
      [UsernameTextRecordKeys.Keywords]: '',
      [UsernameTextRecordKeys.Casts]: '',
      [UsernameTextRecordKeys.Twitter]: '',
      [UsernameTextRecordKeys.Farcaster]: '',
      [UsernameTextRecordKeys.Github]: '',
      [UsernameTextRecordKeys.Url]: '',
      [UsernameTextRecordKeys.Url2]: '',
      [UsernameTextRecordKeys.Url3]: '',
    };
    // Default mock behavior: resolve successfully
    mockWriteTextRecords.mockResolvedValue(undefined);
  });

  describe('rendering', () => {
    it('should render the description field', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('description-field')).toBeInTheDocument();
    });

    it('should render the location field', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('location-field')).toBeInTheDocument();
    });

    it('should render the keywords field', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('keywords-field')).toBeInTheDocument();
    });

    it('should render the casts field when pinned casts are enabled', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('casts-field')).toBeInTheDocument();
    });

    it('should render the socials label', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByText('Socials')).toBeInTheDocument();
    });

    it('should render social fields for each enabled text record', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('social-field-com.twitter')).toBeInTheDocument();
      expect(screen.getByTestId('social-field-xyz.farcaster')).toBeInTheDocument();
      expect(screen.getByTestId('social-field-com.github')).toBeInTheDocument();
      expect(screen.getByTestId('social-field-url')).toBeInTheDocument();
      expect(screen.getByTestId('social-field-url2')).toBeInTheDocument();
      expect(screen.getByTestId('social-field-url3')).toBeInTheDocument();
    });

    it('should render the save button', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('save-button')).toBeInTheDocument();
      expect(screen.getByText('Save')).toBeInTheDocument();
    });

    it('should render the fieldset for socials', () => {
      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    });
  });

  describe('save button behavior', () => {
    it('should disable save button when no changes have been made', () => {
      mockHasChanged = false;

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toBeDisabled();
    });

    it('should enable save button when changes have been made', () => {
      mockHasChanged = true;

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).not.toBeDisabled();
    });

    it('should disable save button when write is pending', () => {
      mockHasChanged = true;
      mockWriteTextRecordsIsPending = true;

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toBeDisabled();
    });

    it('should show loading state when write is pending', () => {
      mockWriteTextRecordsIsPending = true;

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      expect(saveButton).toHaveAttribute('data-loading', 'true');
    });

    it('should call writeTextRecords when save button is clicked', async () => {
      mockHasChanged = true;
      mockCurrentWalletIsProfileEditor = true;

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockWriteTextRecords).toHaveBeenCalled();
      });
    });

    it('should not call writeTextRecords when user is not profile editor', () => {
      mockHasChanged = true;
      mockCurrentWalletIsProfileEditor = false;

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);

      expect(mockWriteTextRecords).not.toHaveBeenCalled();
    });
  });

  describe('error handling', () => {
    it('should display transaction error when writeTextRecordsError is set', () => {
      mockWriteTextRecordsError = new Error('Transaction failed');

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('transaction-error')).toBeInTheDocument();
      expect(screen.getByText('Transaction failed')).toBeInTheDocument();
    });

    it('should not display transaction error when there is no error', () => {
      mockWriteTextRecordsError = null;

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.queryByTestId('transaction-error')).not.toBeInTheDocument();
    });

    it('should log error when writeTextRecords fails', async () => {
      const error = new Error('Write failed');
      mockHasChanged = true;
      mockCurrentWalletIsProfileEditor = true;
      mockWriteTextRecords.mockRejectedValue(error);

      render(<UsernameProfileSettingsManageProfile />);

      const saveButton = screen.getByTestId('save-button');
      fireEvent.click(saveButton);

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to write text records');
      });
    });
  });

  describe('field interactions', () => {
    it('should call updateTextRecords when description field changes', () => {
      render(<UsernameProfileSettingsManageProfile />);

      const descriptionInput = screen.getByTestId('description-input');
      fireEvent.change(descriptionInput, { target: { value: 'New description' } });

      expect(mockUpdateTextRecords).toHaveBeenCalledWith('description', 'New description');
    });

    it('should call updateTextRecords when location field changes', () => {
      render(<UsernameProfileSettingsManageProfile />);

      const locationInput = screen.getByTestId('location-input');
      fireEvent.change(locationInput, { target: { value: 'New York' } });

      expect(mockUpdateTextRecords).toHaveBeenCalledWith('location', 'New York');
    });

    it('should call updateTextRecords when keywords field changes', () => {
      render(<UsernameProfileSettingsManageProfile />);

      const keywordsInput = screen.getByTestId('keywords-input');
      fireEvent.change(keywordsInput, { target: { value: 'blockchain, web3' } });

      expect(mockUpdateTextRecords).toHaveBeenCalledWith('keywords', 'blockchain, web3');
    });

    it('should call updateTextRecords when social field changes', () => {
      render(<UsernameProfileSettingsManageProfile />);

      const twitterInput = screen.getByTestId('social-input-com.twitter');
      fireEvent.change(twitterInput, { target: { value: '@myhandle' } });

      expect(mockUpdateTextRecords).toHaveBeenCalledWith('com.twitter', '@myhandle');
    });
  });

  describe('disabled state', () => {
    it('should disable all fields when write is pending', () => {
      mockWriteTextRecordsIsPending = true;

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('description-field')).toHaveAttribute('data-disabled', 'true');
      expect(screen.getByTestId('location-field')).toHaveAttribute('data-disabled', 'true');
      expect(screen.getByTestId('keywords-field')).toHaveAttribute('data-disabled', 'true');
      expect(screen.getByTestId('casts-field')).toHaveAttribute('data-disabled', 'true');
    });

    it('should enable all fields when write is not pending', () => {
      mockWriteTextRecordsIsPending = false;

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('description-field')).toHaveAttribute('data-disabled', 'false');
      expect(screen.getByTestId('location-field')).toHaveAttribute('data-disabled', 'false');
      expect(screen.getByTestId('keywords-field')).toHaveAttribute('data-disabled', 'false');
      expect(screen.getByTestId('casts-field')).toHaveAttribute('data-disabled', 'false');
    });
  });

  describe('onSuccess callback', () => {
    it('should pass closeSettings as onSuccess to useWriteBaseEnsTextRecords', () => {
      render(<UsernameProfileSettingsManageProfile />);

      // Verify that the callback was captured
      expect(mockOnSuccessCallback).toBeDefined();

      // Calling the captured callback should call setShowProfileSettings(false)
      mockOnSuccessCallback?.();

      expect(mockSetShowProfileSettings).toHaveBeenCalledWith(false);
    });
  });

  describe('field values', () => {
    it('should pass correct values to description field', () => {
      mockUpdatedTextRecords = {
        ...mockUpdatedTextRecords,
        [UsernameTextRecordKeys.Description]: 'Test description',
      };

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('description-field')).toHaveAttribute(
        'data-value',
        'Test description',
      );
    });

    it('should pass correct values to location field', () => {
      mockUpdatedTextRecords = {
        ...mockUpdatedTextRecords,
        [UsernameTextRecordKeys.Location]: 'San Francisco',
      };

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('location-field')).toHaveAttribute('data-value', 'San Francisco');
    });

    it('should pass correct values to keywords field', () => {
      mockUpdatedTextRecords = {
        ...mockUpdatedTextRecords,
        [UsernameTextRecordKeys.Keywords]: 'crypto, defi',
      };

      render(<UsernameProfileSettingsManageProfile />);

      expect(screen.getByTestId('keywords-field')).toHaveAttribute('data-value', 'crypto, defi');
    });
  });
});
