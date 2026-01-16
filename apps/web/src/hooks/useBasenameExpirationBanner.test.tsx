/**
 * @jest-environment jsdom
 */
import { renderHook } from '@testing-library/react';
import { useBasenameExpirationBanner } from './useBasenameExpirationBanner';

// Constants matching the source file
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
const GRACE_PERIOD_DURATION_MS = 90 * 24 * 60 * 60 * 1000; // 90 days

// Mock the UsernameProfileContext
const mockUseUsernameProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useUsernameProfile: () => mockUseUsernameProfile(),
}));

// Mock the Banner component
jest.mock('apps/web/src/components/Banner', () => ({
  Banner: ({
    message,
    actionText,
    actionUrl,
    bgColor,
    textColor,
  }: {
    message: string;
    actionText: string;
    actionUrl: string;
    bgColor: string;
    textColor: string;
  }) => (
    <div data-testid="mock-banner">
      <span data-testid="banner-message">{message}</span>
      <span data-testid="banner-action-text">{actionText}</span>
      <span data-testid="banner-action-url">{actionUrl}</span>
      <span data-testid="banner-bg-color">{bgColor}</span>
      <span data-testid="banner-text-color">{textColor}</span>
    </div>
  ),
}));

// Mock the usernames utility
jest.mock('apps/web/src/utils/usernames', () => ({
  GRACE_PERIOD_DURATION_MS: 90 * 24 * 60 * 60 * 1000,
}));

describe('useBasenameExpirationBanner', () => {
  let portalElement: HTMLDivElement;

  beforeEach(() => {
    jest.clearAllMocks();
    // Create portal element
    portalElement = document.createElement('div');
    portalElement.id = 'name-expiration-banner-portal';
    document.body.appendChild(portalElement);

    // Default mock values
    mockUseUsernameProfile.mockReturnValue({
      currentWalletIsProfileEditor: true,
      msUntilExpiration: undefined,
      profileUsername: 'testuser.base.eth',
    });
  });

  afterEach(() => {
    // Clean up portal element
    portalElement?.parentNode?.removeChild(portalElement);
  });

  describe('when msUntilExpiration is undefined', () => {
    it('should return null expirationBanner', () => {
      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration: undefined,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });
  });

  describe('when user is not the profile editor', () => {
    it('should return null expirationBanner even if in expiration window', () => {
      const msUntilExpiration = 30 * MILLISECONDS_PER_DAY; // 30 days until expiration

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: false,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });

    it('should return null expirationBanner even if in grace period', () => {
      const msUntilExpiration = -10 * MILLISECONDS_PER_DAY; // Expired 10 days ago

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: false,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });
  });

  describe('when name is not close to expiring', () => {
    it('should return null expirationBanner when expiration is more than 90 days away', () => {
      const msUntilExpiration = 100 * MILLISECONDS_PER_DAY; // 100 days until expiration

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });

    it('should return null expirationBanner when expiration is exactly at threshold', () => {
      const msUntilExpiration = GRACE_PERIOD_DURATION_MS; // Exactly at threshold

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });

    it('should return null expirationBanner when expiration is just over threshold', () => {
      const msUntilExpiration = GRACE_PERIOD_DURATION_MS + 1; // Just over threshold

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });
  });

  describe('when name is in expiration window (not yet expired)', () => {
    it('should render banner when expiring in 30 days', () => {
      const msUntilExpiration = 30 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when expiring in 89 days (just inside threshold)', () => {
      const msUntilExpiration = 89 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when expiring in 1 day', () => {
      const msUntilExpiration = 1 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when less than 1 day remaining', () => {
      const msUntilExpiration = 0.5 * MILLISECONDS_PER_DAY; // Half a day

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when 1ms until expiration', () => {
      const msUntilExpiration = 1; // 1ms until expiration

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });
  });

  describe('when name is in grace period (expired)', () => {
    it('should render banner when expired 10 days ago', () => {
      const msUntilExpiration = -10 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when expired 1 day ago', () => {
      const msUntilExpiration = -1 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when just expired (1ms ago)', () => {
      const msUntilExpiration = -1;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });

    it('should render banner when 89 days into grace period', () => {
      const msUntilExpiration = -89 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });
  });

  describe('when name is beyond grace period', () => {
    it('should return null when expired beyond grace period (91 days)', () => {
      const msUntilExpiration = -91 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });

    it('should return null when exactly at grace period end', () => {
      const msUntilExpiration = -GRACE_PERIOD_DURATION_MS;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });

    it('should return null when well beyond grace period (180 days)', () => {
      const msUntilExpiration = -180 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });
  });

  describe('when portal element does not exist', () => {
    it('should return null expirationBanner even when conditions are met', () => {
      // Remove portal element
      portalElement?.parentNode?.removeChild(portalElement);

      const msUntilExpiration = 30 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });
  });

  describe('edge cases', () => {
    it('should return null when msUntilExpiration is exactly 0', () => {
      const msUntilExpiration = 0;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      // 0 is neither in expiration window (requires > 0) nor grace period (requires < 0)
      expect(result.current.expirationBanner).toBeNull();
    });

    it('should return null when msUntilExpiration is falsy (0)', () => {
      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration: 0,
        profileUsername: 'testuser.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).toBeNull();
    });
  });

  describe('with different profile usernames', () => {
    it('should render banner for any valid username in expiration window', () => {
      const msUntilExpiration = 30 * MILLISECONDS_PER_DAY;

      mockUseUsernameProfile.mockReturnValue({
        currentWalletIsProfileEditor: true,
        msUntilExpiration,
        profileUsername: 'different-user.base.eth',
      });

      const { result } = renderHook(() => useBasenameExpirationBanner());

      expect(result.current.expirationBanner).not.toBeNull();
    });
  });
});
