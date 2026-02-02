/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import RenewalSuccessMessage from './index';
import { RenewalSteps } from 'apps/web/src/components/Basenames/RenewalContext';

// Mock variables that can be changed per test
const mockRedirectToProfile = jest.fn();
const mockSetRenewalStep = jest.fn();
const mockLogEventWithContext = jest.fn();
const mockRouterPush = jest.fn();
let mockExpirationDate: string | undefined = '01/15/2026';
let mockLoadingExpirationDate = false;

// Mock the RenewalContext
jest.mock('apps/web/src/components/Basenames/RenewalContext', () => ({
  RenewalSteps: {
    Form: 'form',
    Pending: 'pending',
    Success: 'success',
  },
  useRenewal: () => ({
    redirectToProfile: mockRedirectToProfile,
    setRenewalStep: mockSetRenewalStep,
    expirationDate: mockExpirationDate,
    loadingExpirationDate: mockLoadingExpirationDate,
  }),
}));

// Mock next/navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockRouterPush,
  }),
}));

// Mock Analytics
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

type MockAction = {
  label: string;
  onClick: () => void;
  isPrimary?: boolean;
  variant?: string;
};

// Mock the SuccessMessage component
jest.mock('apps/web/src/components/Basenames/shared/SuccessMessage', () => ({
  __esModule: true,
  default: ({
    title,
    subtitle,
    actions,
  }: {
    title: string;
    subtitle: string;
    actions: MockAction[];
  }) => {
    const handleActionClick = (action: MockAction) => () => action.onClick();
    return (
      <div data-testid="success-message">
        <h1 data-testid="success-title">{title}</h1>
        <p data-testid="success-subtitle">{subtitle}</p>
        <div data-testid="actions">
          {actions.map((action) => (
            <button
              key={action.label}
              data-testid={`action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
              data-primary={action.isPrimary}
              data-variant={action.variant}
              onClick={handleActionClick(action)}
              type="button"
            >
              {action.label}
            </button>
          ))}
        </div>
      </div>
    );
  },
}));

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  ButtonVariants: {
    Secondary: 'secondary',
    Black: 'black',
  },
}));

describe('RenewalSuccessMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockExpirationDate = '01/15/2026';
    mockLoadingExpirationDate = false;
  });

  describe('rendering', () => {
    it('should render the SuccessMessage with correct title', () => {
      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-message')).toBeInTheDocument();
      expect(screen.getByTestId('success-title')).toHaveTextContent('Extension Complete!');
    });

    it('should render subtitle with expiration date when available', () => {
      mockExpirationDate = '12/31/2025';

      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-subtitle')).toHaveTextContent(
        'Your name is now extended until 12/31/2025',
      );
    });

    it('should render loading message when loadingExpirationDate is true', () => {
      mockLoadingExpirationDate = true;
      mockExpirationDate = undefined;

      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-subtitle')).toHaveTextContent(
        'Loading new expiration date...',
      );
    });

    it('should render fallback message when no expiration date and not loading', () => {
      mockExpirationDate = undefined;
      mockLoadingExpirationDate = false;

      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-subtitle')).toHaveTextContent(
        'Your registration has been successfully extended!',
      );
    });

    it('should prioritize loading message over expiration date', () => {
      mockLoadingExpirationDate = true;
      mockExpirationDate = '12/31/2025';

      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-subtitle')).toHaveTextContent(
        'Loading new expiration date...',
      );
    });
  });

  describe('actions', () => {
    it('should render "View Profile" as primary action', () => {
      render(<RenewalSuccessMessage />);

      const viewProfileButton = screen.getByTestId('action-view-profile');
      expect(viewProfileButton).toBeInTheDocument();
      expect(viewProfileButton).toHaveAttribute('data-primary', 'true');
    });

    it('should render "Extend Again" button with secondary variant', () => {
      render(<RenewalSuccessMessage />);

      const extendAgainButton = screen.getByTestId('action-extend-again');
      expect(extendAgainButton).toBeInTheDocument();
      expect(extendAgainButton).toHaveAttribute('data-variant', 'secondary');
    });

    it('should render "Manage Names" button with secondary variant', () => {
      render(<RenewalSuccessMessage />);

      const manageNamesButton = screen.getByTestId('action-manage-names');
      expect(manageNamesButton).toBeInTheDocument();
      expect(manageNamesButton).toHaveAttribute('data-variant', 'secondary');
    });

    it('should render all three action buttons', () => {
      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('action-view-profile')).toBeInTheDocument();
      expect(screen.getByTestId('action-extend-again')).toBeInTheDocument();
      expect(screen.getByTestId('action-manage-names')).toBeInTheDocument();
    });
  });

  describe('action click handlers', () => {
    it('should call redirectToProfile and log event when "View Profile" is clicked', () => {
      render(<RenewalSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-view-profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_go_to_profile', 'click');
      expect(mockRedirectToProfile).toHaveBeenCalledTimes(1);
    });

    it('should call setRenewalStep with Form and log event when "Extend Again" is clicked', () => {
      render(<RenewalSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-extend-again'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_extend_again', 'click');
      expect(mockSetRenewalStep).toHaveBeenCalledWith(RenewalSteps.Form);
    });

    it('should navigate to /names and log event when "Manage Names" is clicked', () => {
      render(<RenewalSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-manage-names'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_manage_names', 'click');
      expect(mockRouterPush).toHaveBeenCalledWith('/names');
    });
  });

  describe('analytics logging', () => {
    it('should log renewal_go_to_profile event with click action type', () => {
      render(<RenewalSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-view-profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_go_to_profile', 'click');
    });

    it('should log renewal_extend_again event with click action type', () => {
      render(<RenewalSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-extend-again'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_extend_again', 'click');
    });

    it('should log renewal_manage_names event with click action type', () => {
      render(<RenewalSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-manage-names'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renewal_manage_names', 'click');
    });
  });

  describe('subtitle variations', () => {
    it('should show formatted date when expirationDate is set', () => {
      mockExpirationDate = '06/15/2027';
      mockLoadingExpirationDate = false;

      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-subtitle')).toHaveTextContent(
        'Your name is now extended until 06/15/2027',
      );
    });

    it('should handle different date formats correctly', () => {
      mockExpirationDate = '01/01/2030';
      mockLoadingExpirationDate = false;

      render(<RenewalSuccessMessage />);

      expect(screen.getByTestId('success-subtitle')).toHaveTextContent(
        'Your name is now extended until 01/01/2030',
      );
    });
  });
});
