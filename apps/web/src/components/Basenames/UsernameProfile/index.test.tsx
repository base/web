/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import UsernameProfile from './index';

// Mock the useUsernameProfile hook
const mockUseUsernameProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useUsernameProfile: () => mockUseUsernameProfile(),
}));

// Mock the useBasenameExpirationBanner hook
const mockUseBasenameExpirationBanner = jest.fn();
jest.mock('apps/web/src/hooks/useBasenameExpirationBanner', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useBasenameExpirationBanner: () => mockUseBasenameExpirationBanner(),
}));

// Mock UsernameProfileContent
jest.mock('apps/web/src/components/Basenames/UsernameProfileContent', () => ({
  __esModule: true,
  default: () => <div data-testid="username-profile-content">Profile Content</div>,
}));

// Mock UsernameProfileSidebar
jest.mock('apps/web/src/components/Basenames/UsernameProfileSidebar', () => ({
  __esModule: true,
  default: () => <div data-testid="username-profile-sidebar">Profile Sidebar</div>,
}));

// Mock UsernameProfileSettings
jest.mock('apps/web/src/components/Basenames/UsernameProfileSettings', () => ({
  __esModule: true,
  default: () => <div data-testid="username-profile-settings">Profile Settings</div>,
}));

// Mock UsernameProfileSettingsProvider
jest.mock('apps/web/src/components/Basenames/UsernameProfileSettingsContext', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="username-profile-settings-provider">{children}</div>
  ),
}));

describe('UsernameProfile', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Default mock values
    mockUseUsernameProfile.mockReturnValue({
      showProfileSettings: false,
    });
    mockUseBasenameExpirationBanner.mockReturnValue({
      expirationBanner: null,
    });
  });

  describe('when showProfileSettings is false', () => {
    it('should render the main profile view with sidebar and content', () => {
      render(<UsernameProfile />);

      expect(screen.getByTestId('username-profile-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('username-profile-content')).toBeInTheDocument();
    });

    it('should not render the settings view', () => {
      render(<UsernameProfile />);

      expect(screen.queryByTestId('username-profile-settings')).not.toBeInTheDocument();
      expect(screen.queryByTestId('username-profile-settings-provider')).not.toBeInTheDocument();
    });

    it('should render the disclaimer text', () => {
      render(<UsernameProfile />);

      expect(
        screen.getByText(
          /Content displayed on this profile page is rendered directly from the decentralized Basenames protocol/,
        ),
      ).toBeInTheDocument();
    });

    it('should include moderation disclaimer about Coinbase', () => {
      render(<UsernameProfile />);

      expect(
        screen.getByText(/not maintained or moderated by, nor under the control of, Coinbase/),
      ).toBeInTheDocument();
    });
  });

  describe('when showProfileSettings is true', () => {
    beforeEach(() => {
      mockUseUsernameProfile.mockReturnValue({
        showProfileSettings: true,
      });
    });

    it('should render the settings view', () => {
      render(<UsernameProfile />);

      expect(screen.getByTestId('username-profile-settings')).toBeInTheDocument();
    });

    it('should wrap settings in UsernameProfileSettingsProvider', () => {
      render(<UsernameProfile />);

      expect(screen.getByTestId('username-profile-settings-provider')).toBeInTheDocument();
      // Settings should be inside the provider
      const provider = screen.getByTestId('username-profile-settings-provider');
      expect(provider).toContainElement(screen.getByTestId('username-profile-settings'));
    });

    it('should not render the main profile view', () => {
      render(<UsernameProfile />);

      expect(screen.queryByTestId('username-profile-sidebar')).not.toBeInTheDocument();
      expect(screen.queryByTestId('username-profile-content')).not.toBeInTheDocument();
    });

    it('should not render the disclaimer text', () => {
      render(<UsernameProfile />);

      expect(
        screen.queryByText(/Content displayed on this profile page/),
      ).not.toBeInTheDocument();
    });
  });

  describe('expiration banner', () => {
    it('should render the expiration banner when provided', () => {
      const mockBanner = <div data-testid="expiration-banner">Expiration Warning</div>;
      mockUseBasenameExpirationBanner.mockReturnValue({
        expirationBanner: mockBanner,
      });

      render(<UsernameProfile />);

      expect(screen.getByTestId('expiration-banner')).toBeInTheDocument();
      expect(screen.getByText('Expiration Warning')).toBeInTheDocument();
    });

    it('should not render an expiration banner when null', () => {
      mockUseBasenameExpirationBanner.mockReturnValue({
        expirationBanner: null,
      });

      render(<UsernameProfile />);

      expect(screen.queryByTestId('expiration-banner')).not.toBeInTheDocument();
    });

    it('should render expiration banner alongside profile content', () => {
      const mockBanner = <div data-testid="expiration-banner">Expiration Warning</div>;
      mockUseBasenameExpirationBanner.mockReturnValue({
        expirationBanner: mockBanner,
      });

      render(<UsernameProfile />);

      // Both banner and profile content should be present
      expect(screen.getByTestId('expiration-banner')).toBeInTheDocument();
      expect(screen.getByTestId('username-profile-sidebar')).toBeInTheDocument();
      expect(screen.getByTestId('username-profile-content')).toBeInTheDocument();
    });

    it('should not show expiration banner when in settings mode', () => {
      mockUseUsernameProfile.mockReturnValue({
        showProfileSettings: true,
      });
      const mockBanner = <div data-testid="expiration-banner">Expiration Warning</div>;
      mockUseBasenameExpirationBanner.mockReturnValue({
        expirationBanner: mockBanner,
      });

      render(<UsernameProfile />);

      // Settings view does not render the banner (since it's rendered in the alternate return path)
      expect(screen.queryByTestId('expiration-banner')).not.toBeInTheDocument();
    });
  });

  describe('layout structure', () => {
    it('should render content in a grid layout', () => {
      const { container } = render(<UsernameProfile />);

      // Check for grid class
      const gridElement = container.querySelector('.grid');
      expect(gridElement).toBeInTheDocument();
      expect(gridElement).toHaveClass('grid-cols-1');
      expect(gridElement).toHaveClass('md:grid-cols-[25rem_minmax(0,1fr)]');
    });

    it('should have proper spacing between elements', () => {
      const { container } = render(<UsernameProfile />);

      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('gap-10');
    });

    it('should have minimum height set to screen', () => {
      const { container } = render(<UsernameProfile />);

      const gridElement = container.querySelector('.grid');
      expect(gridElement).toHaveClass('min-h-screen');
    });

    it('should center content with flex layout', () => {
      const { container } = render(<UsernameProfile />);

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toHaveClass('flex-col');
      expect(flexContainer).toHaveClass('items-center');
    });
  });

  describe('hook usage', () => {
    it('should call useUsernameProfile hook', () => {
      render(<UsernameProfile />);

      expect(mockUseUsernameProfile).toHaveBeenCalled();
    });

    it('should call useBasenameExpirationBanner hook', () => {
      render(<UsernameProfile />);

      expect(mockUseBasenameExpirationBanner).toHaveBeenCalled();
    });
  });
});
