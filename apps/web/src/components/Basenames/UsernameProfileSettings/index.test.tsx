/**
 * @jest-environment jsdom
 */
import { render, fireEvent } from '@testing-library/react';
import UsernameProfileSettings from './index';
import { SettingsTabs } from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';

// Mock the context hooks
const mockSetShowProfileSettings = jest.fn();
let mockCurrentWalletIsProfileEditor = true;
let mockCurrentSettingsTab = SettingsTabs.ManageProfile;

jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => ({
    currentWalletIsProfileEditor: mockCurrentWalletIsProfileEditor,
    setShowProfileSettings: mockSetShowProfileSettings,
  }),
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsContext', () => ({
  useUsernameProfileSettings: () => ({
    currentSettingsTab: mockCurrentSettingsTab,
  }),
  SettingsTabs: {
    ManageProfile: 'manage-profile',
    Ownership: 'ownership',
  },
  settingTabsForDisplay: {
    'manage-profile': 'Manage Profile',
    ownership: 'Ownership',
  },
}));

// Mock the Analytics context
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

// Mock the Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({
    name,
    color,
    height,
    width,
  }: {
    name: string;
    color: string;
    height: string;
    width: string;
  }) => (
    <span
      data-testid="icon"
      data-name={name}
      data-color={color}
      data-height={height}
      data-width={width}
    >
      Icon
    </span>
  ),
}));

// Mock child components
jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsMenu', () => ({
  __esModule: true,
  default: () => <div data-testid="settings-menu">UsernameProfileSettingsMenu</div>,
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsName', () => ({
  __esModule: true,
  default: () => <div data-testid="settings-name">UsernameProfileSettingsName</div>,
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsManageProfile', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="settings-manage-profile">UsernameProfileSettingsManageProfile</div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsAvatar', () => ({
  __esModule: true,
  default: () => <div data-testid="settings-avatar">UsernameProfileSettingsAvatar</div>,
}));

jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsOwnership', () => ({
  __esModule: true,
  default: () => <div data-testid="settings-ownership">UsernameProfileSettingsOwnership</div>,
}));

describe('UsernameProfileSettings', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentWalletIsProfileEditor = true;
    mockCurrentSettingsTab = SettingsTabs.ManageProfile;
  });

  describe('permission check', () => {
    it('should display permission denied message when user is not profile editor', () => {
      mockCurrentWalletIsProfileEditor = false;

      const { getByText, queryByTestId } = render(<UsernameProfileSettings />);

      expect(getByText("You don't have the permission to edit this profile")).toBeInTheDocument();
      expect(queryByTestId('settings-menu')).not.toBeInTheDocument();
    });

    it('should display settings UI when user is profile editor', () => {
      mockCurrentWalletIsProfileEditor = true;

      const { getByTestId, queryByText } = render(<UsernameProfileSettings />);

      expect(queryByText("You don't have the permission to edit this profile")).not.toBeInTheDocument();
      expect(getByTestId('settings-menu')).toBeInTheDocument();
    });
  });

  describe('analytics logging', () => {
    it('should log settings_loaded event on render', () => {
      render(<UsernameProfileSettings />);

      expect(mockLogEventWithContext).toHaveBeenCalledWith('settings_loaded', 'render');
    });
  });

  describe('back button', () => {
    it('should render the back button with text', () => {
      const { getByRole } = render(<UsernameProfileSettings />);

      const backButton = getByRole('button', { name: /back to profile/i });
      expect(backButton).toBeInTheDocument();
    });

    it('should call setShowProfileSettings(false) when back button is clicked', () => {
      const { getByRole } = render(<UsernameProfileSettings />);

      const backButton = getByRole('button', { name: /back to profile/i });
      fireEvent.click(backButton);

      expect(mockSetShowProfileSettings).toHaveBeenCalledWith(false);
    });

    it('should render the backArrow icon in the back button', () => {
      const { getByTestId } = render(<UsernameProfileSettings />);

      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-name', 'backArrow');
      expect(icon).toHaveAttribute('data-color', 'currentColor');
      expect(icon).toHaveAttribute('data-height', '1rem');
      expect(icon).toHaveAttribute('data-width', '1rem');
    });
  });

  describe('settings layout components', () => {
    it('should render UsernameProfileSettingsAvatar', () => {
      const { getByTestId } = render(<UsernameProfileSettings />);

      expect(getByTestId('settings-avatar')).toBeInTheDocument();
    });

    it('should render UsernameProfileSettingsName', () => {
      const { getByTestId } = render(<UsernameProfileSettings />);

      expect(getByTestId('settings-name')).toBeInTheDocument();
    });

    it('should render UsernameProfileSettingsMenu', () => {
      const { getByTestId } = render(<UsernameProfileSettings />);

      expect(getByTestId('settings-menu')).toBeInTheDocument();
    });
  });

  describe('tab display title', () => {
    it('should display "Manage Profile" when ManageProfile tab is selected', () => {
      mockCurrentSettingsTab = SettingsTabs.ManageProfile;

      const { getByText } = render(<UsernameProfileSettings />);

      expect(getByText('Manage Profile')).toBeInTheDocument();
    });

    it('should display "Ownership" when Ownership tab is selected', () => {
      mockCurrentSettingsTab = SettingsTabs.Ownership;

      const { getByText } = render(<UsernameProfileSettings />);

      expect(getByText('Ownership')).toBeInTheDocument();
    });
  });

  describe('conditional tab content', () => {
    it('should render UsernameProfileSettingsManageProfile when ManageProfile tab is selected', () => {
      mockCurrentSettingsTab = SettingsTabs.ManageProfile;

      const { getByTestId, queryByTestId } = render(<UsernameProfileSettings />);

      expect(getByTestId('settings-manage-profile')).toBeInTheDocument();
      expect(queryByTestId('settings-ownership')).not.toBeInTheDocument();
    });

    it('should render UsernameProfileSettingsOwnership when Ownership tab is selected', () => {
      mockCurrentSettingsTab = SettingsTabs.Ownership;

      const { getByTestId, queryByTestId } = render(<UsernameProfileSettings />);

      expect(getByTestId('settings-ownership')).toBeInTheDocument();
      expect(queryByTestId('settings-manage-profile')).not.toBeInTheDocument();
    });
  });

  describe('layout structure', () => {
    it('should have a main container with proper max width', () => {
      const { container } = render(<UsernameProfileSettings />);

      const mainContainer = container.querySelector('.max-w-\\[60rem\\]');
      expect(mainContainer).toBeInTheDocument();
    });

    it('should have the settings panel with rounded border', () => {
      const { container } = render(<UsernameProfileSettings />);

      const settingsPanel = container.querySelector('.rounded-2xl');
      expect(settingsPanel).toBeInTheDocument();
    });

    it('should have a flex column layout', () => {
      const { container } = render(<UsernameProfileSettings />);

      const flexColContainer = container.querySelector('.flex-col');
      expect(flexColContainer).toBeInTheDocument();
    });
  });

  describe('heading element', () => {
    it('should render the tab title as an h2 heading', () => {
      const { getByRole } = render(<UsernameProfileSettings />);

      const heading = getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
    });

    it('should display the correct heading based on current tab', () => {
      mockCurrentSettingsTab = SettingsTabs.ManageProfile;

      const { getByRole } = render(<UsernameProfileSettings />);

      const heading = getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Manage Profile');
    });
  });
});
