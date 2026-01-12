/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';

// Define UsernameTextRecordKeys locally to avoid is-ipfs dependency
const UsernameTextRecordKeys = {
  Avatar: 'avatar',
  Description: 'description',
  Keywords: 'keywords',
  Url: 'url',
  Github: 'com.github',
  Email: 'email',
  Phone: 'phone',
  Twitter: 'com.twitter',
  Farcaster: 'xyz.farcaster',
  Lens: 'xyz.lens',
  Telegram: 'org.telegram',
  Discord: 'com.discord',
  Casts: 'casts',
};

// Mock the usernames module to avoid is-ipfs dependency issue
jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Avatar: 'avatar',
    Description: 'description',
    Keywords: 'keywords',
    Url: 'url',
    Github: 'com.github',
    Email: 'email',
    Phone: 'phone',
    Twitter: 'com.twitter',
    Farcaster: 'xyz.farcaster',
    Lens: 'xyz.lens',
    Telegram: 'org.telegram',
    Discord: 'com.discord',
    Casts: 'casts',
  },
}));

import UsernameProfileSettingsAvatar from './index';

// Mock dependencies
const mockLogEventWithContext = jest.fn();
const mockLogError = jest.fn();
const mockUpdateTextRecords = jest.fn();
const mockWriteTextRecords = jest.fn().mockResolvedValue(undefined);
let mockWriteTextRecordsIsPending = false;
let mockHasChanged = false;
let mockCurrentWalletIsProfileEditor = true;
let mockUpdatedTextRecords: Record<string, string> = {
  [UsernameTextRecordKeys.Avatar]: '',
};

jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    profileUsername: 'testuser.base.eth',
    currentWalletIsProfileEditor: mockCurrentWalletIsProfileEditor,
  }),
}));

jest.mock('apps/web/src/hooks/useWriteBaseEnsTextRecords', () => ({
  __esModule: true,
  default: jest.fn(({ onSuccess }: { onSuccess?: () => void }) => ({
    updateTextRecords: mockUpdateTextRecords,
    updatedTextRecords: mockUpdatedTextRecords,
    writeTextRecords: mockWriteTextRecords.mockImplementation(async () => {
      onSuccess?.();
      return Promise.resolve();
    }),
    writeTextRecordsIsPending: mockWriteTextRecordsIsPending,
    hasChanged: mockHasChanged,
  })),
}));

jest.mock('libs/base-ui/utils/logEvent', () => ({
  ActionType: {
    render: 'render',
    change: 'change',
    click: 'click',
    error: 'error',
  },
}));

jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name }: { name: string }) => (
    <span data-testid="icon" data-name={name}>
      Icon
    </span>
  ),
}));

// Helper functions for UsernameAvatarField mock
function handleTriggerFileChange(onChangeFile: (file: File | undefined) => void) {
  const file = new File(['test'], 'test.png', { type: 'image/png' });
  onChangeFile(file);
}

function handleClearFile(onChangeFile: (file: File | undefined) => void) {
  onChangeFile(undefined);
}

// Mock UsernameAvatarField component
const mockOnChangeFile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameAvatarField', () => ({
  __esModule: true,
  default: ({
    onChangeFile,
    currentAvatarUrl,
    disabled,
    username,
  }: {
    onChangeFile: (file: File | undefined) => void;
    onChange: (key: string, value: string) => void;
    currentAvatarUrl: string;
    disabled: boolean;
    username: string;
  }) => {
    mockOnChangeFile.mockImplementation(onChangeFile);
    return (
      <div
        data-testid="username-avatar-field"
        data-current-avatar-url={currentAvatarUrl}
        data-disabled={disabled}
        data-username={username}
      >
        <button
          type="button"
          data-testid="trigger-file-change"
          onClick={() => handleTriggerFileChange(onChangeFile)}
        >
          Trigger File Change
        </button>
        <button
          type="button"
          data-testid="trigger-clear-file"
          onClick={() => handleClearFile(onChangeFile)}
        >
          Clear File
        </button>
        UsernameAvatarField
      </div>
    );
  },
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
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
    isLoading: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid="save-button"
      data-loading={isLoading}
    >
      {children}
    </button>
  ),
  ButtonSizes: { Small: 'small' },
  ButtonVariants: { Gray: 'gray' },
}));

// Mock global fetch
global.fetch = jest.fn();

describe('UsernameProfileSettingsAvatar', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockWriteTextRecordsIsPending = false;
    mockHasChanged = false;
    mockCurrentWalletIsProfileEditor = true;
    mockUpdatedTextRecords = {
      [UsernameTextRecordKeys.Avatar]: '',
    };
    (global.fetch as jest.Mock).mockReset();
  });

  describe('loading state', () => {
    it('should display spinner when writeTextRecordsIsPending is true', () => {
      mockWriteTextRecordsIsPending = true;

      render(<UsernameProfileSettingsAvatar />);

      const icon = screen.getByTestId('icon');
      expect(icon).toHaveAttribute('data-name', 'spinner');
    });

    it('should not display avatar field when loading', () => {
      mockWriteTextRecordsIsPending = true;

      render(<UsernameProfileSettingsAvatar />);

      expect(screen.queryByTestId('username-avatar-field')).not.toBeInTheDocument();
    });
  });

  describe('normal render state', () => {
    it('should render UsernameAvatarField when not loading', () => {
      render(<UsernameProfileSettingsAvatar />);

      expect(screen.getByTestId('username-avatar-field')).toBeInTheDocument();
    });

    it('should pass correct props to UsernameAvatarField', () => {
      mockUpdatedTextRecords = {
        [UsernameTextRecordKeys.Avatar]: 'ipfs://test-hash',
      };

      render(<UsernameProfileSettingsAvatar />);

      const avatarField = screen.getByTestId('username-avatar-field');
      expect(avatarField).toHaveAttribute('data-current-avatar-url', 'ipfs://test-hash');
      expect(avatarField).toHaveAttribute('data-username', 'testuser.base.eth');
      expect(avatarField).toHaveAttribute('data-disabled', 'false');
    });

    it('should pass disabled=false when writeTextRecordsIsPending is false', () => {
      mockWriteTextRecordsIsPending = false;
      render(<UsernameProfileSettingsAvatar />);

      const avatarField = screen.getByTestId('username-avatar-field');
      expect(avatarField).toHaveAttribute('data-disabled', 'false');
    });
  });

  describe('save button visibility', () => {
    it('should not display save button when no changes and no file selected', () => {
      mockHasChanged = false;

      render(<UsernameProfileSettingsAvatar />);

      expect(screen.queryByTestId('save-button')).not.toBeInTheDocument();
    });

    it('should display save button when hasChanged is true', () => {
      mockHasChanged = true;

      render(<UsernameProfileSettingsAvatar />);

      expect(screen.getByTestId('save-button')).toBeInTheDocument();
      expect(screen.getByTestId('save-button')).toHaveTextContent('Save avatar');
    });

    it('should display save button when a file is selected', () => {
      mockHasChanged = false;

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      expect(screen.getByTestId('save-button')).toBeInTheDocument();
    });
  });

  describe('save functionality', () => {
    it('should call saveAvatar directly when no file is selected but hasChanged', async () => {
      mockHasChanged = true;

      render(<UsernameProfileSettingsAvatar />);

      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockWriteTextRecords).toHaveBeenCalled();
      });
    });

    it('should not save when currentWalletIsProfileEditor is false', () => {
      mockCurrentWalletIsProfileEditor = false;
      mockHasChanged = true;

      render(<UsernameProfileSettingsAvatar />);

      fireEvent.click(screen.getByTestId('save-button'));

      expect(mockWriteTextRecords).not.toHaveBeenCalled();
    });

    it('should upload file before saving when avatarFile is set', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => Promise.resolve({ IpfsHash: 'QmTestHash123' }),
      });

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      // Click save
      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(global.fetch).toHaveBeenCalledWith(
          '/api/basenames/avatar/ipfsUpload?username=testuser.base.eth',
          expect.objectContaining({
            method: 'POST',
            body: expect.any(FormData),
          }),
        );
      });
    });

    it('should update text records with IPFS hash after successful upload', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => Promise.resolve({ IpfsHash: 'QmTestHash123' }),
      });

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      // Click save
      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockUpdateTextRecords).toHaveBeenCalledWith(
          UsernameTextRecordKeys.Avatar,
          'ipfs://QmTestHash123',
        );
      });
    });

    it('should log success event after successful upload', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => Promise.resolve({ IpfsHash: 'QmTestHash123' }),
      });

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      // Click save
      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockLogEventWithContext).toHaveBeenCalledWith('avatar_upload_success', 'change');
      });
    });
  });

  describe('upload error handling', () => {
    it('should log error when upload fails with non-ok response', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Internal Server Error',
      });

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      // Click save
      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Internal Server Error');
        expect(mockLogError).toHaveBeenCalled();
      });

      alertSpy.mockRestore();
    });

    it('should show alert when upload throws an error', async () => {
      const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      // Click save
      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(alertSpy).toHaveBeenCalledWith('Trouble uploading file');
      });

      alertSpy.mockRestore();
    });
  });

  describe('onChangeAvatarFile callback', () => {
    it('should set avatar file when file is provided', () => {
      render(<UsernameProfileSettingsAvatar />);

      // Initially no save button
      expect(screen.queryByTestId('save-button')).not.toBeInTheDocument();

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));

      // Save button should appear
      expect(screen.getByTestId('save-button')).toBeInTheDocument();
    });

    it('should clear avatar file when undefined is provided', () => {
      mockHasChanged = false;

      render(<UsernameProfileSettingsAvatar />);

      // Trigger file selection
      fireEvent.click(screen.getByTestId('trigger-file-change'));
      expect(screen.getByTestId('save-button')).toBeInTheDocument();

      // Clear file
      fireEvent.click(screen.getByTestId('trigger-clear-file'));

      // Save button should disappear since hasChanged is false and file is cleared
      expect(screen.queryByTestId('save-button')).not.toBeInTheDocument();
    });
  });

  describe('writeTextRecords error handling', () => {
    it('should log error when writeTextRecords fails', async () => {
      mockHasChanged = true;
      const error = new Error('Write failed');
      mockWriteTextRecords.mockRejectedValueOnce(error);

      render(<UsernameProfileSettingsAvatar />);

      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to write text records');
      });
    });
  });

  describe('button disabled state', () => {
    it('should have enabled button when not loading', () => {
      mockHasChanged = true;

      render(<UsernameProfileSettingsAvatar />);

      const button = screen.getByTestId('save-button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('empty file handling', () => {
    it('should not upload when file is undefined', async () => {
      mockHasChanged = true;

      render(<UsernameProfileSettingsAvatar />);

      // Click save without selecting a file
      fireEvent.click(screen.getByTestId('save-button'));

      await waitFor(() => {
        expect(mockWriteTextRecords).toHaveBeenCalled();
      });

      // fetch should not be called since no file was selected
      expect(global.fetch).not.toHaveBeenCalled();
    });
  });
});
