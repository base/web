import { render, screen } from '@testing-library/react';
import ProfileProviders from './ProfileProviders';

// Mock the providers
const mockAnalyticsProviderContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  __esModule: true,
  default: ({ children, context }: { children: React.ReactNode; context: string }) => {
    mockAnalyticsProviderContext(context);
    return <div data-testid="analytics-provider" data-context={context}>{children}</div>;
  },
}));

const mockUsernameProfileProviderUsername = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  __esModule: true,
  default: ({ children, username }: { children: React.ReactNode; username: string }) => {
    mockUsernameProfileProviderUsername(username);
    return <div data-testid="username-profile-provider" data-username={username}>{children}</div>;
  },
}));

describe('ProfileProviders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render children', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div data-testid="test-child">Test Child Content</div>
        </ProfileProviders>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test Child Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </ProfileProviders>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('AnalyticsProvider', () => {
    it('should wrap children with AnalyticsProvider', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div data-testid="child">Child</div>
        </ProfileProviders>
      );

      expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
    });

    it('should pass username_profile context to AnalyticsProvider', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div>Child</div>
        </ProfileProviders>
      );

      expect(mockAnalyticsProviderContext).toHaveBeenCalledWith('username_profile');
      expect(screen.getByTestId('analytics-provider')).toHaveAttribute(
        'data-context',
        'username_profile'
      );
    });
  });

  describe('UsernameProfileProvider', () => {
    it('should wrap children with UsernameProfileProvider', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div data-testid="child">Child</div>
        </ProfileProviders>
      );

      expect(screen.getByTestId('username-profile-provider')).toBeInTheDocument();
    });

    it('should pass username prop to UsernameProfileProvider', () => {
      render(
        <ProfileProviders username="alice.base.eth">
          <div>Child</div>
        </ProfileProviders>
      );

      expect(mockUsernameProfileProviderUsername).toHaveBeenCalledWith('alice.base.eth');
      expect(screen.getByTestId('username-profile-provider')).toHaveAttribute(
        'data-username',
        'alice.base.eth'
      );
    });

    it('should handle different username formats', () => {
      render(
        <ProfileProviders username="bob.basetest.eth">
          <div>Child</div>
        </ProfileProviders>
      );

      expect(mockUsernameProfileProviderUsername).toHaveBeenCalledWith('bob.basetest.eth');
      expect(screen.getByTestId('username-profile-provider')).toHaveAttribute(
        'data-username',
        'bob.basetest.eth'
      );
    });
  });

  describe('provider nesting order', () => {
    it('should nest providers in correct order (AnalyticsProvider > UsernameProfileProvider)', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div data-testid="child">Child</div>
        </ProfileProviders>
      );

      const analyticsProvider = screen.getByTestId('analytics-provider');
      const usernameProfileProvider = screen.getByTestId('username-profile-provider');

      // AnalyticsProvider should contain UsernameProfileProvider
      expect(analyticsProvider).toContainElement(usernameProfileProvider);
    });

    it('should have children inside UsernameProfileProvider', () => {
      render(
        <ProfileProviders username="test.base.eth">
          <div data-testid="child">Child</div>
        </ProfileProviders>
      );

      const usernameProfileProvider = screen.getByTestId('username-profile-provider');
      const child = screen.getByTestId('child');

      expect(usernameProfileProvider).toContainElement(child);
    });
  });
});
