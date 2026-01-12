/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import { RenewalButton } from './RenewalButton';

// Track mock state for ConnectButton
let mockConnectButtonState = {
  account: { address: '0x123' },
  chain: { id: 1 },
  mounted: true,
};

const mockOpenConnectModal = jest.fn();

// Mock RainbowKit hooks and components
jest.mock('@rainbow-me/rainbowkit', () => ({
  ConnectButton: {
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    Custom: ({ children }: { children: (props: typeof mockConnectButtonState) => React.ReactNode }) =>
      children(mockConnectButtonState),
  },
  useConnectModal: () => ({
    openConnectModal: mockOpenConnectModal,
  }),
}));

// Mock Button component - use data-fullwidth to distinguish connect wallet button from renewal button
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    isLoading,
    fullWidth,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    fullWidth?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      data-testid={fullWidth ? 'renewal-button' : 'connect-wallet-button'}
      data-loading={isLoading}
      data-fullwidth={fullWidth}
    >
      {children}
    </button>
  ),
  ButtonSizes: { Medium: 'medium' },
  ButtonVariants: { Black: 'black' },
}));

describe('RenewalButton', () => {
  const defaultProps = {
    correctChain: true,
    renewNameCallback: jest.fn(),
    switchToIntendedNetwork: jest.fn(),
    disabled: false,
    isLoading: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset to connected state
    mockConnectButtonState = {
      account: { address: '0x123' },
      chain: { id: 1 },
      mounted: true,
    };
  });

  describe('when wallet is not connected', () => {
    beforeEach(() => {
      mockConnectButtonState = {
        account: undefined as unknown as { address: string },
        chain: undefined as unknown as { id: number },
        mounted: true,
      };
    });

    it('should render Connect wallet button', () => {
      render(<RenewalButton {...defaultProps} />);

      expect(screen.getByTestId('connect-wallet-button')).toBeInTheDocument();
      expect(screen.getByText('Connect wallet')).toBeInTheDocument();
    });

    it('should call openConnectModal when connect button is clicked', () => {
      render(<RenewalButton {...defaultProps} />);

      fireEvent.click(screen.getByTestId('connect-wallet-button'));

      expect(mockOpenConnectModal).toHaveBeenCalledTimes(1);
    });

    it('should not render the renewal button', () => {
      render(<RenewalButton {...defaultProps} />);

      // The connect wallet button is rendered, not the renewal button
      expect(screen.queryByTestId('renewal-button')).not.toBeInTheDocument();
    });
  });

  describe('when component is not mounted', () => {
    beforeEach(() => {
      mockConnectButtonState = {
        account: { address: '0x123' },
        chain: { id: 1 },
        mounted: false,
      };
    });

    it('should render Connect wallet button when not mounted', () => {
      render(<RenewalButton {...defaultProps} />);

      expect(screen.getByTestId('connect-wallet-button')).toBeInTheDocument();
      expect(screen.getByText('Connect wallet')).toBeInTheDocument();
    });
  });

  describe('when wallet is connected', () => {
    beforeEach(() => {
      mockConnectButtonState = {
        account: { address: '0x123' },
        chain: { id: 1 },
        mounted: true,
      };
    });

    it('should render the renewal button', () => {
      render(<RenewalButton {...defaultProps} />);

      expect(screen.getByTestId('renewal-button')).toBeInTheDocument();
    });

    describe('when on correct chain', () => {
      it('should display "Renew name" text', () => {
        render(<RenewalButton {...defaultProps} correctChain />);

        expect(screen.getByText('Renew name')).toBeInTheDocument();
      });

      it('should call renewNameCallback when clicked', () => {
        const renewNameCallback = jest.fn();
        render(
          <RenewalButton {...defaultProps} correctChain renewNameCallback={renewNameCallback} />,
        );

        fireEvent.click(screen.getByTestId('renewal-button'));

        expect(renewNameCallback).toHaveBeenCalledTimes(1);
      });

      it('should not call switchToIntendedNetwork when clicked', () => {
        const switchToIntendedNetwork = jest.fn();
        render(
          <RenewalButton
            {...defaultProps}
            correctChain
            switchToIntendedNetwork={switchToIntendedNetwork}
          />,
        );

        fireEvent.click(screen.getByTestId('renewal-button'));

        expect(switchToIntendedNetwork).not.toHaveBeenCalled();
      });
    });

    describe('when on incorrect chain', () => {
      it('should display "Switch to Base" text', () => {
        render(<RenewalButton {...defaultProps} correctChain={false} />);

        expect(screen.getByText('Switch to Base')).toBeInTheDocument();
      });

      it('should call switchToIntendedNetwork when clicked', () => {
        const switchToIntendedNetwork = jest.fn();
        render(
          <RenewalButton
            {...defaultProps}
            correctChain={false}
            switchToIntendedNetwork={switchToIntendedNetwork}
          />,
        );

        fireEvent.click(screen.getByTestId('renewal-button'));

        expect(switchToIntendedNetwork).toHaveBeenCalledTimes(1);
      });

      it('should not call renewNameCallback when clicked', () => {
        const renewNameCallback = jest.fn();
        render(
          <RenewalButton
            {...defaultProps}
            correctChain={false}
            renewNameCallback={renewNameCallback}
          />,
        );

        fireEvent.click(screen.getByTestId('renewal-button'));

        expect(renewNameCallback).not.toHaveBeenCalled();
      });
    });

    describe('button disabled state', () => {
      it('should be disabled when disabled prop is true', () => {
        render(<RenewalButton {...defaultProps} disabled />);

        expect(screen.getByTestId('renewal-button')).toBeDisabled();
      });

      it('should be enabled when disabled prop is false', () => {
        render(<RenewalButton {...defaultProps} disabled={false} />);

        expect(screen.getByTestId('renewal-button')).not.toBeDisabled();
      });
    });

    describe('loading state', () => {
      it('should show loading state when isLoading is true', () => {
        render(<RenewalButton {...defaultProps} isLoading />);

        expect(screen.getByTestId('renewal-button')).toHaveAttribute('data-loading', 'true');
      });

      it('should not show loading state when isLoading is false', () => {
        render(<RenewalButton {...defaultProps} isLoading={false} />);

        expect(screen.getByTestId('renewal-button')).toHaveAttribute('data-loading', 'false');
      });
    });

    describe('fullWidth prop', () => {
      it('should have fullWidth attribute', () => {
        render(<RenewalButton {...defaultProps} />);

        expect(screen.getByTestId('renewal-button')).toHaveAttribute('data-fullwidth', 'true');
      });
    });
  });
});
