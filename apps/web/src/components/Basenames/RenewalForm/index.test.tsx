/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import RenewalForm from './index';

// Mock Analytics context
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock Errors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock RenewalContext
let mockYears = 1;
let mockPrice: bigint | undefined = BigInt(1000000000000000); // 0.001 ETH
let mockIsPending = false;
let mockExpirationDate: string | undefined = '01/01/2025';
const mockSetYears = jest.fn();
const mockRenewBasename = jest.fn().mockResolvedValue(undefined);

jest.mock('apps/web/src/components/Basenames/RenewalContext', () => ({
  useRenewal: () => ({
    years: mockYears,
    setYears: mockSetYears,
    renewBasename: mockRenewBasename,
    price: mockPrice,
    isPending: mockIsPending,
    expirationDate: mockExpirationDate,
  }),
}));

// Mock useBasenameChain
const mockBasenameChainId = 8453;
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: mockBasenameChainId },
  }),
  supportedChainIds: [8453, 84532],
}));

// Mock wagmi hooks
let mockConnectedChainId: number | undefined = 8453;
let mockAddress: string | undefined = '0x1234567890123456789012345678901234567890';
let mockBalanceValue: bigint | undefined = BigInt(1000000000000000000); // 1 ETH
const mockSwitchChain = jest.fn();

jest.mock('wagmi', () => ({
  useAccount: () => ({
    chain: mockConnectedChainId ? { id: mockConnectedChainId } : undefined,
    address: mockAddress,
  }),
  useSwitchChain: () => ({
    switchChain: mockSwitchChain,
  }),
  useBalance: () => ({
    data: mockBalanceValue !== undefined ? { value: mockBalanceValue } : undefined,
  }),
}));

// Mock RainbowKit
const mockOpenConnectModal = jest.fn();
jest.mock('@rainbow-me/rainbowkit', () => ({
  useConnectModal: () => ({
    openConnectModal: mockOpenConnectModal,
  }),
  ConnectButton: {
    // eslint-disable-next-line @typescript-eslint/promise-function-async
    Custom: ({
      children,
    }: {
      children: (props: {
        account: { address: string } | undefined;
        chain: { id: number } | undefined;
        mounted: boolean;
      }) => React.ReactNode;
    }) =>
      children({
        account: mockAddress ? { address: mockAddress } : undefined,
        chain: mockConnectedChainId ? { id: mockConnectedChainId } : undefined,
        mounted: true,
      }),
  },
}));

// Mock ETH price from Uniswap
let mockEthUsdPrice: number | undefined = 2000;
jest.mock('apps/web/src/hooks/useEthPriceFromUniswap', () => ({
  useEthPriceFromUniswap: () => mockEthUsdPrice,
}));

// Mock useCapabilitiesSafe
let mockAuxiliaryFundsEnabled = false;
jest.mock('apps/web/src/hooks/useCapabilitiesSafe', () => ({
  __esModule: true,
  default: () => ({
    auxiliaryFunds: mockAuxiliaryFundsEnabled,
  }),
}));

// Mock formatEtherPrice
jest.mock('apps/web/src/utils/formatEtherPrice', () => ({
  formatEtherPrice: (price: bigint | undefined) => {
    if (price === undefined) return '0';
    return (Number(price) / 1e18).toFixed(4);
  },
}));

// Mock formatUsdPrice
jest.mock('apps/web/src/utils/formatUsdPrice', () => ({
  formatUsdPrice: (price: bigint, ethUsdPrice: number) => {
    const ethValue = Number(price) / 1e18;
    return (ethValue * ethUsdPrice).toFixed(2);
  },
}));

// Mock child components
jest.mock('apps/web/src/components/Basenames/YearSelector', () => ({
  __esModule: true,
  default: ({
    years,
    onIncrement,
    onDecrement,
    label,
  }: {
    years: number;
    onIncrement: () => void;
    onDecrement: () => void;
    label: string;
  }) => (
    <div data-testid="year-selector">
      <span data-testid="year-label">{label}</span>
      <span data-testid="years-value">{years}</span>
      <button type="button" onClick={onDecrement} data-testid="decrement-year">
        -
      </button>
      <button type="button" onClick={onIncrement} data-testid="increment-year">
        +
      </button>
    </div>
  ),
}));

jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({
    children,
    onClick,
    disabled,
    isLoading,
    type,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    isLoading?: boolean;
    type?: string;
  }) => (
    <button
      type={type === 'button' ? 'button' : 'submit'}
      onClick={onClick}
      disabled={disabled}
      data-testid="action-button"
      data-loading={isLoading}
    >
      {children}
    </button>
  ),
  ButtonSizes: { Medium: 'medium' },
  ButtonVariants: { Black: 'black' },
}));

// Mock heroicons
jest.mock('@heroicons/react/16/solid', () => ({
  ExclamationCircleIcon: ({ width, height }: { width: number; height: number }) => (
    <span data-testid="exclamation-icon" data-width={width} data-height={height} />
  ),
}));

describe('RenewalForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset all mock values to defaults
    mockYears = 1;
    mockPrice = BigInt(1000000000000000);
    mockIsPending = false;
    mockExpirationDate = '01/01/2025';
    mockConnectedChainId = 8453;
    mockAddress = '0x1234567890123456789012345678901234567890';
    mockBalanceValue = BigInt(1000000000000000000);
    mockEthUsdPrice = 2000;
    mockAuxiliaryFundsEnabled = false;
    mockSetYears.mockImplementation((fn: (n: number) => number) => {
      if (typeof fn === 'function') {
        mockYears = fn(mockYears);
      }
    });
    mockRenewBasename.mockResolvedValue(undefined);
  });

  describe('rendering', () => {
    it('should render YearSelector with correct props', () => {
      render(<RenewalForm />);

      expect(screen.getByTestId('year-selector')).toBeInTheDocument();
      expect(screen.getByTestId('year-label')).toHaveTextContent('Extend for');
      expect(screen.getByTestId('years-value')).toHaveTextContent('1');
    });

    it('should render Amount label', () => {
      render(<RenewalForm />);

      expect(screen.getByText('Amount')).toBeInTheDocument();
    });

    it('should render the action button', () => {
      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toBeInTheDocument();
    });

    it('should render expiration date when available', () => {
      mockExpirationDate = '12/31/2025';

      render(<RenewalForm />);

      expect(screen.getByText('Current expiration:')).toBeInTheDocument();
      expect(screen.getByText('12/31/2025')).toBeInTheDocument();
    });

    it('should not render expiration section when expirationDate is undefined', () => {
      mockExpirationDate = undefined;

      render(<RenewalForm />);

      expect(screen.queryByText('Current expiration:')).not.toBeInTheDocument();
    });
  });

  describe('unsupported network warning', () => {
    it('should render network switch prompt when on unsupported network', () => {
      mockConnectedChainId = 1; // Ethereum mainnet (unsupported)
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByText('Switch to Base to renew your name.')).toBeInTheDocument();
      expect(screen.getByTestId('exclamation-icon')).toBeInTheDocument();
    });

    it('should call switchChain when network switch button is clicked', async () => {
      mockConnectedChainId = 1;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      const switchButton = screen.getByRole('button');
      await act(async () => {
        fireEvent.click(switchButton);
      });

      expect(mockSwitchChain).toHaveBeenCalledWith({ chainId: 8453 });
    });

    it('should render normal form when on supported network (Base mainnet)', () => {
      mockConnectedChainId = 8453;

      render(<RenewalForm />);

      expect(screen.queryByText('Switch to Base to renew your name.')).not.toBeInTheDocument();
      expect(screen.getByTestId('year-selector')).toBeInTheDocument();
    });

    it('should render normal form when on supported network (Base Sepolia)', () => {
      mockConnectedChainId = 84532;

      render(<RenewalForm />);

      expect(screen.queryByText('Switch to Base to renew your name.')).not.toBeInTheDocument();
      expect(screen.getByTestId('year-selector')).toBeInTheDocument();
    });

    it('should render normal form when wallet is not connected', () => {
      mockAddress = undefined;
      mockConnectedChainId = undefined;

      render(<RenewalForm />);

      expect(screen.queryByText('Switch to Base to renew your name.')).not.toBeInTheDocument();
      expect(screen.getByTestId('year-selector')).toBeInTheDocument();
    });
  });

  describe('wallet connection', () => {
    it('should render "Connect wallet" button when not connected', () => {
      mockAddress = undefined;
      mockConnectedChainId = undefined;

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toHaveTextContent('Connect wallet');
    });

    it('should call openConnectModal when Connect wallet button is clicked', async () => {
      mockAddress = undefined;
      mockConnectedChainId = undefined;

      render(<RenewalForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      expect(mockOpenConnectModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('chain switching from button', () => {
    it('should render "Switch to Base" button when connected on wrong chain', () => {
      mockConnectedChainId = 84532; // Base Sepolia, but basename chain is Base mainnet
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toHaveTextContent('Switch to Base');
    });

    it('should call switchChain when Switch to Base button is clicked', async () => {
      mockConnectedChainId = 84532;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      expect(mockSwitchChain).toHaveBeenCalledWith({ chainId: 8453 });
    });

    it('should render "Renew name" button when on correct chain', () => {
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toHaveTextContent('Renew name');
    });
  });

  describe('name renewal', () => {
    it('should call renewBasename when Renew name button is clicked', async () => {
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      expect(mockLogEventWithContext).toHaveBeenCalledWith('renew_name_initiated', 'click');
      expect(mockRenewBasename).toHaveBeenCalledTimes(1);
    });

    it('should show loading state when renewal is pending', () => {
      mockIsPending = true;
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      // isPending is passed to RenewalButton as isLoading, not disabled
      expect(screen.getByTestId('action-button')).toHaveAttribute('data-loading', 'true');
    });

    it('should log error when renewBasename fails', async () => {
      const testError = new Error('Renewal failed');
      mockRenewBasename.mockRejectedValueOnce(testError);
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(testError, 'Failed to renew name');
      });
    });
  });

  describe('year selection', () => {
    it('should call setYears with increment function when increment is clicked', async () => {
      render(<RenewalForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('increment-year'));
      });

      expect(mockSetYears).toHaveBeenCalled();
    });

    it('should call setYears with decrement function when decrement is clicked', async () => {
      mockYears = 2; // Start at 2 so decrement is possible

      render(<RenewalForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('decrement-year'));
      });

      expect(mockSetYears).toHaveBeenCalled();
    });

    it('should not decrement below 1 year', () => {
      mockYears = 1;
      let decrementResult = 1;
      mockSetYears.mockImplementation((fn: (n: number) => number) => {
        decrementResult = fn(mockYears);
      });

      render(<RenewalForm />);

      fireEvent.click(screen.getByTestId('decrement-year'));

      expect(decrementResult).toBe(1);
    });
  });

  describe('pricing display', () => {
    it('should show loading spinner when price is undefined', () => {
      mockPrice = undefined;

      render(<RenewalForm />);

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });

    it('should display price with ETH when price is defined', () => {
      mockPrice = BigInt(1000000000000000);

      render(<RenewalForm />);

      expect(screen.getByText(/ETH/)).toBeInTheDocument();
    });

    it('should display USD price when ETH price is available', () => {
      mockPrice = BigInt(1000000000000000);
      mockEthUsdPrice = 2000;

      render(<RenewalForm />);

      expect(screen.getByText(/\$/)).toBeInTheDocument();
    });

    it('should display placeholder USD price when ETH USD price is undefined', () => {
      mockPrice = BigInt(1000000000000000);
      mockEthUsdPrice = undefined;

      render(<RenewalForm />);

      // Should not show dollar sign for the USD conversion
      const usdElements = screen.queryAllByText(/\$--\.--/);
      expect(usdElements.length).toBe(0);
    });
  });

  describe('insufficient balance', () => {
    it('should show insufficient balance message when balance is too low', () => {
      mockBalanceValue = BigInt(100); // Very low balance
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;

      render(<RenewalForm />);

      expect(screen.getByText('your ETH balance is insufficient')).toBeInTheDocument();
    });

    it('should apply error styling to price when balance is insufficient', () => {
      mockBalanceValue = BigInt(100);
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;

      render(<RenewalForm />);

      // Find the paragraph element containing the ETH price value
      const priceElement = screen.getByText(/0\.0010/);
      expect(priceElement).toHaveClass('text-state-n-hovered');
    });

    it('should disable button when balance is insufficient and no auxiliary funds', () => {
      mockBalanceValue = BigInt(100);
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toBeDisabled();
    });

    it('should not disable button when auxiliary funds are enabled even with low balance', () => {
      mockBalanceValue = BigInt(100);
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = true;
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).not.toBeDisabled();
    });

    it('should still show insufficient balance message when on wrong chain', () => {
      // The message is based on insufficientFundsAndNoAuxFunds which does not check chain
      mockBalanceValue = BigInt(100);
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;
      mockConnectedChainId = 84532; // Wrong chain (Base Sepolia, but basenames on Base)
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByText('your ETH balance is insufficient')).toBeInTheDocument();
    });

    it('should not disable button when on wrong chain even with insufficient balance', () => {
      // Button disabled state is based on insufficientFundsNoAuxFundsAndCorrectChain
      mockBalanceValue = BigInt(100);
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;
      mockConnectedChainId = 84532;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).not.toBeDisabled();
    });
  });

  describe('loading state', () => {
    it('should pass isLoading to RenewalButton when isPending is true', () => {
      mockIsPending = true;
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toHaveAttribute('data-loading', 'true');
    });

    it('should not show loading on button when isPending is false', () => {
      mockIsPending = false;
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      expect(screen.getByTestId('action-button')).toHaveAttribute('data-loading', 'false');
    });
  });

  describe('balance edge cases', () => {
    it('should handle undefined balance gracefully', () => {
      mockBalanceValue = undefined;
      mockPrice = BigInt(1000000000000000);

      render(<RenewalForm />);

      // Should not show insufficient balance message when balance is undefined
      expect(screen.queryByText('your ETH balance is insufficient')).not.toBeInTheDocument();
    });

    it('should handle exact balance equal to price', () => {
      mockBalanceValue = BigInt(1000000000000000);
      mockPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;
      mockConnectedChainId = 8453;
      mockAddress = '0x1234567890123456789012345678901234567890';

      render(<RenewalForm />);

      // Balance equals price, so not insufficient
      expect(screen.queryByText('your ETH balance is insufficient')).not.toBeInTheDocument();
      expect(screen.getByTestId('action-button')).not.toBeDisabled();
    });
  });
});
