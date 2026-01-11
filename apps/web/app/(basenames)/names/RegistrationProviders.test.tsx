import { render, screen } from '@testing-library/react';
import RegistrationProviders from './RegistrationProviders';

// Mock the providers
const mockAnalyticsProviderContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  __esModule: true,
  default: ({ children, context }: { children: React.ReactNode; context: string }) => {
    mockAnalyticsProviderContext(context);
    return <div data-testid="analytics-provider" data-context={context}>{children}</div>;
  },
}));

const mockRegistrationProviderCode = jest.fn();
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  __esModule: true,
  default: ({ children, code }: { children: React.ReactNode; code?: string }) => {
    mockRegistrationProviderCode(code);
    return <div data-testid="registration-provider" data-code={code ?? ''}>{children}</div>;
  },
}));

describe('RegistrationProviders', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render children', () => {
      render(
        <RegistrationProviders>
          <div data-testid="test-child">Test Child Content</div>
        </RegistrationProviders>
      );

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test Child Content')).toBeInTheDocument();
    });

    it('should render multiple children', () => {
      render(
        <RegistrationProviders>
          <div data-testid="child-1">Child 1</div>
          <div data-testid="child-2">Child 2</div>
        </RegistrationProviders>
      );

      expect(screen.getByTestId('child-1')).toBeInTheDocument();
      expect(screen.getByTestId('child-2')).toBeInTheDocument();
    });
  });

  describe('AnalyticsProvider', () => {
    it('should wrap children with AnalyticsProvider', () => {
      render(
        <RegistrationProviders>
          <div data-testid="child">Child</div>
        </RegistrationProviders>
      );

      expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
    });

    it('should pass username_registration context to AnalyticsProvider', () => {
      render(
        <RegistrationProviders>
          <div>Child</div>
        </RegistrationProviders>
      );

      expect(mockAnalyticsProviderContext).toHaveBeenCalledWith('username_registration');
      expect(screen.getByTestId('analytics-provider')).toHaveAttribute(
        'data-context',
        'username_registration'
      );
    });
  });

  describe('RegistrationProvider', () => {
    it('should wrap children with RegistrationProvider', () => {
      render(
        <RegistrationProviders>
          <div data-testid="child">Child</div>
        </RegistrationProviders>
      );

      expect(screen.getByTestId('registration-provider')).toBeInTheDocument();
    });

    it('should pass code prop to RegistrationProvider when provided', () => {
      render(
        <RegistrationProviders code="test-discount-code">
          <div>Child</div>
        </RegistrationProviders>
      );

      expect(mockRegistrationProviderCode).toHaveBeenCalledWith('test-discount-code');
      expect(screen.getByTestId('registration-provider')).toHaveAttribute(
        'data-code',
        'test-discount-code'
      );
    });

    it('should not pass code to RegistrationProvider when not provided', () => {
      render(
        <RegistrationProviders>
          <div>Child</div>
        </RegistrationProviders>
      );

      expect(mockRegistrationProviderCode).toHaveBeenCalledWith(undefined);
      expect(screen.getByTestId('registration-provider')).toHaveAttribute('data-code', '');
    });

    it('should handle empty string code', () => {
      render(
        <RegistrationProviders code="">
          <div>Child</div>
        </RegistrationProviders>
      );

      expect(mockRegistrationProviderCode).toHaveBeenCalledWith('');
      expect(screen.getByTestId('registration-provider')).toHaveAttribute('data-code', '');
    });
  });

  describe('provider nesting order', () => {
    it('should nest providers in correct order (AnalyticsProvider > RegistrationProvider)', () => {
      render(
        <RegistrationProviders>
          <div data-testid="child">Child</div>
        </RegistrationProviders>
      );

      const analyticsProvider = screen.getByTestId('analytics-provider');
      const registrationProvider = screen.getByTestId('registration-provider');

      // AnalyticsProvider should contain RegistrationProvider
      expect(analyticsProvider).toContainElement(registrationProvider);
    });

    it('should have children inside RegistrationProvider', () => {
      render(
        <RegistrationProviders>
          <div data-testid="child">Child</div>
        </RegistrationProviders>
      );

      const registrationProvider = screen.getByTestId('registration-provider');
      const child = screen.getByTestId('child');

      expect(registrationProvider).toContainElement(child);
    });
  });
});
