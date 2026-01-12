/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { RegistrationButton } from './RegistrationButton';

// Mock wagmi useAccount hook
let mockIsConnected = true;
jest.mock('wagmi', () => ({
  useAccount: () => ({
    isConnected: mockIsConnected,
  }),
}));

// Mock OnchainKit ConnectWallet
jest.mock('@coinbase/onchainkit/wallet', () => ({
  ConnectWallet: ({ className, disconnectedLabel }: { className: string; disconnectedLabel: string }) => (
    <button type="button" className={className} data-testid="connect-wallet">
      {disconnectedLabel}
    </button>
  ),
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
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid="registration-button"
      data-loading={isLoading}
    >
      {children}
    </button>
  ),
  ButtonSizes: { Medium: 'medium' },
  ButtonVariants: { Black: 'black' },
}));

describe('RegistrationButton', () => {
  const defaultProps = {
    correctChain: true,
    registerNameCallback: jest.fn(),
    switchToIntendedNetwork: jest.fn(),
    insufficientFundsNoAuxFundsAndCorrectChain: false,
    registerNameIsPending: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockIsConnected = true;
  });

  describe('when wallet is not connected', () => {
    beforeEach(() => {
      mockIsConnected = false;
    });

    it('should render ConnectWallet component', () => {
      render(<RegistrationButton {...defaultProps} />);

      expect(screen.getByTestId('connect-wallet')).toBeInTheDocument();
      expect(screen.getByText('Connect wallet')).toBeInTheDocument();
    });

    it('should not render the registration button', () => {
      render(<RegistrationButton {...defaultProps} />);

      expect(screen.queryByTestId('registration-button')).not.toBeInTheDocument();
    });
  });

  describe('when wallet is connected', () => {
    beforeEach(() => {
      mockIsConnected = true;
    });

    it('should render the registration button', () => {
      render(<RegistrationButton {...defaultProps} />);

      expect(screen.getByTestId('registration-button')).toBeInTheDocument();
    });

    it('should not render ConnectWallet component', () => {
      render(<RegistrationButton {...defaultProps} />);

      expect(screen.queryByTestId('connect-wallet')).not.toBeInTheDocument();
    });

    describe('when on correct chain', () => {
      it('should display "Register name" text', () => {
        render(<RegistrationButton {...defaultProps} correctChain />);

        expect(screen.getByText('Register name')).toBeInTheDocument();
      });

      it('should call registerNameCallback when clicked', () => {
        const registerNameCallback = jest.fn();
        render(
          <RegistrationButton
            {...defaultProps}
            correctChain
            registerNameCallback={registerNameCallback}
          />
        );

        fireEvent.click(screen.getByTestId('registration-button'));

        expect(registerNameCallback).toHaveBeenCalledTimes(1);
      });

      it('should not call switchToIntendedNetwork when clicked', () => {
        const switchToIntendedNetwork = jest.fn();
        render(
          <RegistrationButton
            {...defaultProps}
            correctChain
            switchToIntendedNetwork={switchToIntendedNetwork}
          />
        );

        fireEvent.click(screen.getByTestId('registration-button'));

        expect(switchToIntendedNetwork).not.toHaveBeenCalled();
      });
    });

    describe('when on incorrect chain', () => {
      it('should display "Switch to Base" text', () => {
        render(<RegistrationButton {...defaultProps} correctChain={false} />);

        expect(screen.getByText('Switch to Base')).toBeInTheDocument();
      });

      it('should call switchToIntendedNetwork when clicked', () => {
        const switchToIntendedNetwork = jest.fn();
        render(
          <RegistrationButton
            {...defaultProps}
            correctChain={false}
            switchToIntendedNetwork={switchToIntendedNetwork}
          />
        );

        fireEvent.click(screen.getByTestId('registration-button'));

        expect(switchToIntendedNetwork).toHaveBeenCalledTimes(1);
      });

      it('should not call registerNameCallback when clicked', () => {
        const registerNameCallback = jest.fn();
        render(
          <RegistrationButton
            {...defaultProps}
            correctChain={false}
            registerNameCallback={registerNameCallback}
          />
        );

        fireEvent.click(screen.getByTestId('registration-button'));

        expect(registerNameCallback).not.toHaveBeenCalled();
      });
    });

    describe('button disabled state', () => {
      it('should be disabled when insufficientFundsNoAuxFundsAndCorrectChain is true', () => {
        render(
          <RegistrationButton
            {...defaultProps}
            insufficientFundsNoAuxFundsAndCorrectChain
          />
        );

        expect(screen.getByTestId('registration-button')).toBeDisabled();
      });

      it('should be disabled when registerNameIsPending is true', () => {
        render(<RegistrationButton {...defaultProps} registerNameIsPending />);

        expect(screen.getByTestId('registration-button')).toBeDisabled();
      });

      it('should be disabled when both insufficientFundsNoAuxFundsAndCorrectChain and registerNameIsPending are true', () => {
        render(
          <RegistrationButton
            {...defaultProps}
            insufficientFundsNoAuxFundsAndCorrectChain
            registerNameIsPending
          />
        );

        expect(screen.getByTestId('registration-button')).toBeDisabled();
      });

      it('should be enabled when both insufficientFundsNoAuxFundsAndCorrectChain and registerNameIsPending are false', () => {
        render(
          <RegistrationButton
            {...defaultProps}
            insufficientFundsNoAuxFundsAndCorrectChain={false}
            registerNameIsPending={false}
          />
        );

        expect(screen.getByTestId('registration-button')).not.toBeDisabled();
      });
    });

    describe('loading state', () => {
      it('should show loading state when registerNameIsPending is true', () => {
        render(<RegistrationButton {...defaultProps} registerNameIsPending />);

        expect(screen.getByTestId('registration-button')).toHaveAttribute('data-loading', 'true');
      });

      it('should not show loading state when registerNameIsPending is false', () => {
        render(<RegistrationButton {...defaultProps} registerNameIsPending={false} />);

        expect(screen.getByTestId('registration-button')).toHaveAttribute('data-loading', 'false');
      });
    });
  });
});
