/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockConsoleLog, restoreConsoleLog } from 'apps/web/src/testUtils/console';
import RegistrationSuccessMessage from './index';
import { RegistrationSteps } from 'apps/web/src/components/Basenames/RegistrationContext';

// Mock variables that can be changed per test
const mockSetRegistrationStep = jest.fn();
const mockRedirectToProfile = jest.fn();
const mockLogEventWithContext = jest.fn();
let mockCode: string | undefined = undefined;
let mockAddress: string | undefined = '0x1234567890abcdef1234567890abcdef12345678';

// Mock the RegistrationContext
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  RegistrationSteps: {
    Search: 'search',
    Claim: 'claim',
    Pending: 'pending',
    Success: 'success',
    Profile: 'profile',
  },
  useRegistration: () => ({
    setRegistrationStep: mockSetRegistrationStep,
    redirectToProfile: mockRedirectToProfile,
    code: mockCode,
  }),
}));

// Mock wagmi
jest.mock('wagmi', () => ({
  useAccount: () => ({
    address: mockAddress,
  }),
}));

// Mock Analytics
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

type MockAction = { label: string; onClick: () => void; isPrimary?: boolean };

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

// Mock the USDCClaimModal component
jest.mock('./USDCClaimModal', () => ({
  __esModule: true,
  default: ({ message, onClose }: { message: string; onClose: () => void }) => {
    const handleClose = () => onClose();
    return (
      <div data-testid="usdc-claim-modal">
        <p data-testid="modal-message">{message}</p>
        <button data-testid="modal-close" onClick={handleClose} type="button">
          Close
        </button>
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

describe('RegistrationSuccessMessage', () => {
  const originalEnv = process.env;
  const mockFetch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog();
    mockCode = undefined;
    mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    process.env = { ...originalEnv, NEXT_PUBLIC_USDC_URL: 'https://api.example.com/usdc' };
    global.fetch = mockFetch;
  });

  afterEach(() => {
    restoreConsoleLog();
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('rendering', () => {
    it('should render the SuccessMessage with correct title and subtitle', () => {
      render(<RegistrationSuccessMessage />);

      expect(screen.getByTestId('success-message')).toBeInTheDocument();
      expect(screen.getByTestId('success-title')).toHaveTextContent('Congrats!');
      expect(screen.getByTestId('success-subtitle')).toHaveTextContent('This name is yours!');
    });

    it('should not render USDCClaimModal initially', () => {
      render(<RegistrationSuccessMessage />);

      expect(screen.queryByTestId('usdc-claim-modal')).not.toBeInTheDocument();
    });
  });

  describe('actions without discount code', () => {
    beforeEach(() => {
      mockCode = undefined;
    });

    it('should render "Customize Profile" as primary action when no code', () => {
      render(<RegistrationSuccessMessage />);

      const customizeButton = screen.getByTestId('action-customize-profile');
      expect(customizeButton).toBeInTheDocument();
      expect(customizeButton).toHaveAttribute('data-primary', 'true');
    });

    it('should render "Go to Profile" as secondary action', () => {
      render(<RegistrationSuccessMessage />);

      const goToProfileButton = screen.getByTestId('action-go-to-profile');
      expect(goToProfileButton).toBeInTheDocument();
    });

    it('should not render "Claim USDC" button when no code', () => {
      render(<RegistrationSuccessMessage />);

      expect(screen.queryByTestId('action-claim-usdc')).not.toBeInTheDocument();
    });

    it('should call setRegistrationStep with Profile when "Customize Profile" is clicked', () => {
      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-customize-profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('customize_profile', 'click');
      expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Profile);
    });

    it('should call redirectToProfile when "Go to Profile" is clicked', () => {
      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-go-to-profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('go_to_profile', 'click');
      expect(mockRedirectToProfile).toHaveBeenCalledTimes(1);
    });
  });

  describe('actions with discount code', () => {
    beforeEach(() => {
      mockCode = 'TEST_CODE';
    });

    it('should render "Claim USDC" as primary action when code is present', () => {
      render(<RegistrationSuccessMessage />);

      const claimButton = screen.getByTestId('action-claim-usdc');
      expect(claimButton).toBeInTheDocument();
      expect(claimButton).toHaveAttribute('data-primary', 'true');
    });

    it('should render "Go to Profile" as secondary action', () => {
      render(<RegistrationSuccessMessage />);

      const goToProfileButton = screen.getByTestId('action-go-to-profile');
      expect(goToProfileButton).toBeInTheDocument();
    });

    it('should not render "Customize Profile" button when code is present', () => {
      render(<RegistrationSuccessMessage />);

      expect(screen.queryByTestId('action-customize-profile')).not.toBeInTheDocument();
    });
  });

  describe('USDC claim functionality', () => {
    beforeEach(() => {
      mockCode = 'TEST_CODE';
    });

    it('should show modal with loading message when USDC claim is initiated', async () => {
      mockFetch.mockImplementation(async () => new Promise(() => {})); // Never resolves

      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-claim-usdc'));

      await waitFor(() => {
        expect(screen.getByTestId('usdc-claim-modal')).toBeInTheDocument();
      });
      expect(screen.getByTestId('modal-message')).toHaveTextContent(
        'USDC is being sent to your wallet',
      );
    });

    it('should call fetch with correct URL when claiming USDC', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });

      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-claim-usdc'));

      await waitFor(() => {
        expect(mockFetch).toHaveBeenCalledWith(
          `https://api.example.com/usdc?address=${mockAddress}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          },
        );
      });
    });

    it('should show success message when USDC claim succeeds', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });

      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-claim-usdc'));

      await waitFor(() => {
        expect(screen.getByTestId('modal-message')).toHaveTextContent('USDC claimed successfully!');
      });
    });

    it('should show error message when USDC claim fails with error response', async () => {
      mockFetch.mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({ error: 'Claim limit reached' }),
      });

      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-claim-usdc'));

      await waitFor(() => {
        expect(screen.getByTestId('modal-message')).toHaveTextContent('Claim limit reached');
      });
    });

    it('should show error message when fetch throws', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-claim-usdc'));

      await waitFor(() => {
        expect(screen.getByTestId('modal-message')).toHaveTextContent('Network error');
      });

      expect(consoleErrorSpy).toHaveBeenCalled();
      consoleErrorSpy.mockRestore();
    });

    it('should close modal when close button is clicked', async () => {
      mockFetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({}),
      });

      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-claim-usdc'));

      await waitFor(() => {
        expect(screen.getByTestId('usdc-claim-modal')).toBeInTheDocument();
      });

      fireEvent.click(screen.getByTestId('modal-close'));

      await waitFor(() => {
        expect(screen.queryByTestId('usdc-claim-modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('analytics logging', () => {
    it('should log customize_profile event with click action type', () => {
      mockCode = undefined;
      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-customize-profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('customize_profile', 'click');
    });

    it('should log go_to_profile event with click action type', () => {
      render(<RegistrationSuccessMessage />);

      fireEvent.click(screen.getByTestId('action-go-to-profile'));

      expect(mockLogEventWithContext).toHaveBeenCalledWith('go_to_profile', 'click');
    });
  });
});
