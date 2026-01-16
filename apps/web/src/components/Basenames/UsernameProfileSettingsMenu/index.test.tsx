/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import UsernameProfileSettingsMenu from './index';
import { SettingsTabs } from 'apps/web/src/components/Basenames/UsernameProfileSettingsContext';

// Mock state values
let mockCurrentSettingsTab = SettingsTabs.ManageProfile;
const mockSetCurrentSettingsTab = jest.fn();

// Store original arrays to modify per test
let mockSettingsTabsEnabled: SettingsTabs[] = [SettingsTabs.ManageProfile, SettingsTabs.Ownership];
let mockAllSettingsTabs: SettingsTabs[] = [SettingsTabs.ManageProfile, SettingsTabs.Ownership];

// Mock the UsernameProfileSettingsContext
jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsContext', () => ({
  __esModule: true,
  SettingsTabs: {
    ManageProfile: 'manage-profile',
    Ownership: 'ownership',
  },
  settingTabsForDisplay: {
    'manage-profile': 'Manage Profile',
    ownership: 'Ownership',
  },
  get allSettingsTabs() {
    return mockAllSettingsTabs;
  },
  get settingsTabsEnabled() {
    return mockSettingsTabsEnabled;
  },
  useUsernameProfileSettings: () => ({
    currentSettingsTab: mockCurrentSettingsTab,
    setCurrentSettingsTab: mockSetCurrentSettingsTab,
  }),
}));

// Mock Tooltip
jest.mock('apps/web/src/components/Tooltip', () => ({
  __esModule: true,
  default: ({
    children,
    content,
    className,
  }: {
    children: React.ReactNode;
    content: string;
    className?: string;
  }) => (
    <div data-testid="tooltip" data-content={content} className={className}>
      {children}
    </div>
  ),
}));

// Mock classNames
jest.mock('classnames', () => ({
  __esModule: true,
  default: (...args: (string | Record<string, boolean>)[]) => {
    const result: string[] = [];
    args.forEach((arg) => {
      if (typeof arg === 'string') {
        result.push(arg);
      } else if (typeof arg === 'object') {
        Object.entries(arg).forEach(([key, value]) => {
          if (value) result.push(key);
        });
      }
    });
    return result.join(' ');
  },
}));

describe('UsernameProfileSettingsMenu', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockCurrentSettingsTab = SettingsTabs.ManageProfile;
    mockSettingsTabsEnabled = [SettingsTabs.ManageProfile, SettingsTabs.Ownership];
    mockAllSettingsTabs = [SettingsTabs.ManageProfile, SettingsTabs.Ownership];
  });

  describe('rendering', () => {
    it('should render the navigation element', () => {
      render(<UsernameProfileSettingsMenu />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should render a list with all settings tabs', () => {
      render(<UsernameProfileSettingsMenu />);

      expect(screen.getByRole('list')).toBeInTheDocument();
      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(2);
    });

    it('should render Manage Profile tab', () => {
      render(<UsernameProfileSettingsMenu />);

      expect(screen.getByText('Manage Profile')).toBeInTheDocument();
    });

    it('should render Ownership tab', () => {
      render(<UsernameProfileSettingsMenu />);

      expect(screen.getByText('Ownership')).toBeInTheDocument();
    });
  });

  describe('enabled tabs', () => {
    it('should render enabled tabs as buttons', () => {
      render(<UsernameProfileSettingsMenu />);

      const manageProfileButton = screen.getByRole('button', { name: 'Manage Profile' });
      expect(manageProfileButton).toBeInTheDocument();
    });

    it('should call setCurrentSettingsTab when clicking an enabled tab', () => {
      render(<UsernameProfileSettingsMenu />);

      const ownershipButton = screen.getByRole('button', { name: 'Ownership' });
      fireEvent.click(ownershipButton);

      expect(mockSetCurrentSettingsTab).toHaveBeenCalledWith(SettingsTabs.Ownership);
    });

    it('should call setCurrentSettingsTab when clicking Manage Profile tab', () => {
      mockCurrentSettingsTab = SettingsTabs.Ownership;

      render(<UsernameProfileSettingsMenu />);

      const manageProfileButton = screen.getByRole('button', { name: 'Manage Profile' });
      fireEvent.click(manageProfileButton);

      expect(mockSetCurrentSettingsTab).toHaveBeenCalledWith(SettingsTabs.ManageProfile);
    });
  });

  describe('disabled tabs (coming soon)', () => {
    beforeEach(() => {
      // Make Ownership disabled
      mockSettingsTabsEnabled = [SettingsTabs.ManageProfile];
    });

    it('should render disabled tabs with tooltip', () => {
      render(<UsernameProfileSettingsMenu />);

      const tooltip = screen.getByTestId('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveAttribute('data-content', 'Coming soon');
    });

    it('should render disabled tab as span instead of button', () => {
      render(<UsernameProfileSettingsMenu />);

      // Ownership should be a span, not a button
      const ownershipButton = screen.queryByRole('button', { name: 'Ownership' });
      expect(ownershipButton).not.toBeInTheDocument();

      // But the text should still be visible
      expect(screen.getByText('Ownership')).toBeInTheDocument();
    });

    it('should not call setCurrentSettingsTab for disabled tabs', () => {
      render(<UsernameProfileSettingsMenu />);

      // The span doesn't have onClick, but clicking won't trigger setCurrentSettingsTab
      const ownershipText = screen.getByText('Ownership');
      fireEvent.click(ownershipText);

      expect(mockSetCurrentSettingsTab).not.toHaveBeenCalled();
    });
  });

  describe('tab styling', () => {
    it('should apply active styling to current tab', () => {
      mockCurrentSettingsTab = SettingsTabs.ManageProfile;

      render(<UsernameProfileSettingsMenu />);

      const manageProfileButton = screen.getByRole('button', { name: 'Manage Profile' });
      expect(manageProfileButton.className).toContain('text-black');
    });

    it('should apply inactive styling to non-current tab', () => {
      mockCurrentSettingsTab = SettingsTabs.ManageProfile;

      render(<UsernameProfileSettingsMenu />);

      const ownershipButton = screen.getByRole('button', { name: 'Ownership' });
      expect(ownershipButton.className).toContain('text-gray-40');
    });

    it('should update styling when current tab changes', () => {
      mockCurrentSettingsTab = SettingsTabs.Ownership;

      render(<UsernameProfileSettingsMenu />);

      const manageProfileButton = screen.getByRole('button', { name: 'Manage Profile' });
      const ownershipButton = screen.getByRole('button', { name: 'Ownership' });

      expect(manageProfileButton.className).toContain('text-gray-40');
      expect(ownershipButton.className).toContain('text-black');
    });
  });

  describe('disabled tab styling', () => {
    beforeEach(() => {
      mockSettingsTabsEnabled = [SettingsTabs.ManageProfile];
    });

    it('should apply inactive styling to disabled non-current tab', () => {
      mockCurrentSettingsTab = SettingsTabs.ManageProfile;

      render(<UsernameProfileSettingsMenu />);

      const ownershipSpan = screen.getByText('Ownership');
      expect(ownershipSpan.className).toContain('text-gray-40');
    });
  });

  describe('multiple tabs', () => {
    it('should render all tabs from allSettingsTabs', () => {
      render(<UsernameProfileSettingsMenu />);

      expect(screen.getByText('Manage Profile')).toBeInTheDocument();
      expect(screen.getByText('Ownership')).toBeInTheDocument();
    });

    it('should maintain order of tabs', () => {
      render(<UsernameProfileSettingsMenu />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems[0]).toHaveTextContent('Manage Profile');
      expect(listItems[1]).toHaveTextContent('Ownership');
    });
  });
});
