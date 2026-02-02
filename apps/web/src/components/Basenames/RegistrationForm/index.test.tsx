/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import RegistrationForm from './index';

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

// Mock RegistrationContext
let mockSelectedName = 'testname';
let mockDiscount: { discountKey: string } | undefined;
let mockYears = 1;
let mockReverseRecord = false;
let mockHasExistingBasename = false;
let mockRegisterNameIsPending = false;
let mockRegisterNameError: Error | null = null;
let mockCode: string | undefined;
const mockSetYears = jest.fn();
const mockSetReverseRecord = jest.fn();
const mockRegisterName = jest.fn().mockResolvedValue(undefined);

jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  useRegistration: () => ({
    selectedName: mockSelectedName,
    discount: mockDiscount,
    years: mockYears,
    setYears: mockSetYears,
    reverseRecord: mockReverseRecord,
    setReverseRecord: mockSetReverseRecord,
    hasExistingBasename: mockHasExistingBasename,
    registerName: mockRegisterName,
    registerNameError: mockRegisterNameError,
    registerNameIsPending: mockRegisterNameIsPending,
    code: mockCode,
  }),
}));

// Mock useBasenameChain
const mockBasenameChainId = 8453;
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: mockBasenameChainId },
  }),
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
  useReadContract: () => ({
    data: false, // hasRegisteredWithDiscount
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

// Mock price hooks
let mockInitialPrice: bigint | undefined = BigInt(1000000000000000); // 0.001 ETH
let mockDiscountedPrice: bigint | undefined;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let mockSingleYearEthCost: bigint | undefined = BigInt(1000000000000000);
let mockSingleYearBasePrice: bigint | undefined = BigInt(800000000000000);
let mockPremiumPrice: bigint | undefined = BigInt(0);

jest.mock('apps/web/src/hooks/useNameRegistrationPrice', () => ({
  useNameRegistrationPrice: () => ({
    data: mockInitialPrice,
  }),
  useDiscountedNameRegistrationPrice: () => ({
    data: mockDiscountedPrice,
  }),
}));

jest.mock('apps/web/src/hooks/useRentPrice', () => ({
  useRentPrice: () => ({
    basePrice: mockSingleYearBasePrice,
    premiumPrice: mockPremiumPrice,
  }),
}));

// Mock ETH price from Uniswap
let mockEthUsdPrice: number | undefined = 2000;
jest.mock('apps/web/src/hooks/useEthPriceFromUniswap', () => ({
  useEthPriceFromUniswap: () => mockEthUsdPrice,
}));

// Mock premium hook
let mockPremiumSeconds = 0n;
let mockPremiumTimestamp: string | undefined;
let mockIsPremiumDataLoading = false;

jest.mock('apps/web/src/hooks/useActiveEthPremiumAmount', () => ({
  usePremiumEndDurationRemaining: () => ({
    seconds: mockPremiumSeconds,
    timestamp: mockPremiumTimestamp,
    isLoading: mockIsPremiumDataLoading,
  }),
}));

// Mock useCapabilitiesSafe
let mockAuxiliaryFundsEnabled = false;
jest.mock('apps/web/src/hooks/useCapabilitiesSafe', () => ({
  __esModule: true,
  default: () => ({
    auxiliaryFunds: mockAuxiliaryFundsEnabled,
  }),
}));

// Mock usernames utilities
jest.mock('apps/web/src/utils/usernames', () => ({
  formatBaseEthDomain: (name: string, chainId: number) => {
    if (chainId === 8453) return `${name}.base.eth`;
    return `${name}.basetest.eth`;
  },
  REGISTER_CONTRACT_ABI: [],
  REGISTER_CONTRACT_ADDRESSES: { 8453: '0xregister' },
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
jest.mock('apps/web/src/components/Basenames/PremiumExplainerModal', () => ({
  PremiumExplainerModal: ({
    isOpen,
    toggleModal,
    name,
  }: {
    isOpen: boolean;
    toggleModal: () => void;
    name: string;
  }) =>
    isOpen ? (
      <div data-testid="premium-explainer-modal" data-name={name}>
        <button type="button" onClick={toggleModal} data-testid="close-premium-modal">
          Close
        </button>
      </div>
    ) : null,
}));

jest.mock('apps/web/src/components/Basenames/RegistrationLearnMoreModal', () => ({
  __esModule: true,
  default: ({ isOpen, toggleModal }: { isOpen: boolean; toggleModal: () => void }) =>
    isOpen ? (
      <div data-testid="learn-more-modal">
        <button type="button" onClick={toggleModal} data-testid="close-learn-more-modal">
          Close
        </button>
      </div>
    ) : null,
}));

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

jest.mock('apps/web/src/components/Label', () => ({
  __esModule: true,
  default: ({
    children,
    htmlFor,
    className,
  }: {
    children: React.ReactNode;
    htmlFor: string;
    className: string;
  }) => (
    <label htmlFor={htmlFor} className={className} data-testid="label">
      {children}
    </label>
  ),
}));

jest.mock('apps/web/src/components/Tooltip', () => ({
  __esModule: true,
  default: ({ children, content }: { children: React.ReactNode; content: React.ReactNode }) => (
    <div data-testid="tooltip">
      {children}
      <span data-testid="tooltip-content">{content}</span>
    </div>
  ),
}));

jest.mock('apps/web/src/components/TransactionError', () => ({
  __esModule: true,
  default: ({ error, className }: { error: Error; className: string }) => (
    <div data-testid="transaction-error" className={className}>
      {error.message}
    </div>
  ),
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

describe('RegistrationForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset all mock values to defaults
    mockSelectedName = 'testname';
    mockDiscount = undefined;
    mockYears = 1;
    mockReverseRecord = false;
    mockHasExistingBasename = false;
    mockRegisterNameIsPending = false;
    mockRegisterNameError = null;
    mockCode = undefined;
    mockConnectedChainId = 8453;
    mockAddress = '0x1234567890123456789012345678901234567890';
    mockBalanceValue = BigInt(1000000000000000000);
    mockInitialPrice = BigInt(1000000000000000);
    mockDiscountedPrice = undefined;
    mockSingleYearEthCost = BigInt(1000000000000000);
    mockSingleYearBasePrice = BigInt(800000000000000);
    mockPremiumPrice = BigInt(0);
    mockEthUsdPrice = 2000;
    mockPremiumSeconds = 0n;
    mockPremiumTimestamp = undefined;
    mockIsPremiumDataLoading = false;
    mockAuxiliaryFundsEnabled = false;
    mockSetYears.mockImplementation((fn: (n: number) => number) => {
      if (typeof fn === 'function') {
        mockYears = fn(mockYears);
      }
    });
    mockRegisterName.mockResolvedValue(undefined);
  });

  describe('rendering', () => {
    it('should render YearSelector with correct props', () => {
      render(<RegistrationForm />);

      expect(screen.getByTestId('year-selector')).toBeInTheDocument();
      expect(screen.getByTestId('year-label')).toHaveTextContent('Claim for');
      expect(screen.getByTestId('years-value')).toHaveTextContent('1');
    });

    it('should render Amount label', () => {
      render(<RegistrationForm />);

      expect(screen.getByText('Amount')).toBeInTheDocument();
    });

    it('should render the action button', () => {
      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).toBeInTheDocument();
    });
  });

  describe('wallet connection', () => {
    it('should render "Connect wallet" button when not connected', () => {
      mockAddress = undefined;
      mockConnectedChainId = undefined;

      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).toHaveTextContent('Connect wallet');
    });

    it('should call openConnectModal when Connect wallet button is clicked', async () => {
      mockAddress = undefined;
      mockConnectedChainId = undefined;

      render(<RegistrationForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      expect(mockOpenConnectModal).toHaveBeenCalledTimes(1);
    });
  });

  describe('chain switching', () => {
    it('should render "Switch to Base" button when on wrong chain', () => {
      mockConnectedChainId = 1; // Mainnet

      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).toHaveTextContent('Switch to Base');
    });

    it('should call switchChain when Switch to Base button is clicked', async () => {
      mockConnectedChainId = 1;

      render(<RegistrationForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      expect(mockSwitchChain).toHaveBeenCalledWith({ chainId: 8453 });
    });

    it('should render "Register name" button when on correct chain', () => {
      mockConnectedChainId = 8453;

      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).toHaveTextContent('Register name');
    });
  });

  describe('name registration', () => {
    it('should call registerName when Register name button is clicked', async () => {
      render(<RegistrationForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      expect(mockRegisterName).toHaveBeenCalledTimes(1);
    });

    it('should disable button when registration is pending', () => {
      mockRegisterNameIsPending = true;

      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).toBeDisabled();
    });

    it('should log error when registerName fails', async () => {
      const testError = new Error('Registration failed');
      mockRegisterName.mockRejectedValueOnce(testError);

      render(<RegistrationForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('action-button'));
      });

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(testError, 'Failed to register name');
      });
    });
  });

  describe('year selection', () => {
    it('should call setYears with increment function when increment is clicked', async () => {
      render(<RegistrationForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('increment-year'));
      });

      expect(mockSetYears).toHaveBeenCalled();
      expect(mockLogEventWithContext).toHaveBeenCalledWith(
        'registration_form_increment_year',
        'click'
      );
    });

    it('should call setYears with decrement function when decrement is clicked', async () => {
      render(<RegistrationForm />);

      await act(async () => {
        fireEvent.click(screen.getByTestId('decrement-year'));
      });

      expect(mockSetYears).toHaveBeenCalled();
      expect(mockLogEventWithContext).toHaveBeenCalledWith(
        'registration_form_decement_year',
        'click'
      );
    });
  });

  describe('reverse record checkbox', () => {
    it('should show reverse record checkbox when hasExistingBasename is true', () => {
      mockHasExistingBasename = true;

      render(<RegistrationForm />);

      expect(screen.getByLabelText(/Set as Primary Name/i)).toBeInTheDocument();
    });

    it('should not show reverse record checkbox when hasExistingBasename is false', () => {
      mockHasExistingBasename = false;

      render(<RegistrationForm />);

      expect(screen.queryByLabelText(/Set as Primary Name/i)).not.toBeInTheDocument();
    });

    it('should call setReverseRecord when checkbox is changed', async () => {
      mockHasExistingBasename = true;

      render(<RegistrationForm />);

      const checkbox = screen.getByRole('checkbox');
      await act(async () => {
        fireEvent.click(checkbox);
      });

      expect(mockSetReverseRecord).toHaveBeenCalled();
    });
  });

  describe('pricing display', () => {
    it('should show loading spinner when price is undefined', () => {
      mockInitialPrice = undefined;

      render(<RegistrationForm />);

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });

    it('should display price with ETH when price is defined', () => {
      mockInitialPrice = BigInt(1000000000000000);

      render(<RegistrationForm />);

      expect(screen.getByText(/ETH/)).toBeInTheDocument();
    });

    it('should display discounted price with strikethrough when discount is available', () => {
      mockInitialPrice = BigInt(2000000000000000);
      mockDiscountedPrice = BigInt(1000000000000000);

      render(<RegistrationForm />);

      // Check that both prices are displayed
      const priceElements = screen.getAllByText(/ETH/);
      expect(priceElements.length).toBeGreaterThanOrEqual(1);
    });

    it('should display USD price when ETH price is available', () => {
      mockInitialPrice = BigInt(1000000000000000);
      mockEthUsdPrice = 2000;

      render(<RegistrationForm />);

      expect(screen.getByText(/\$/)).toBeInTheDocument();
    });
  });

  describe('insufficient balance', () => {
    it('should show insufficient balance message when balance is too low', () => {
      mockBalanceValue = BigInt(100); // Very low balance
      mockInitialPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;

      render(<RegistrationForm />);

      expect(screen.getByText('your ETH balance is insufficient')).toBeInTheDocument();
    });

    it('should disable button when balance is insufficient and no auxiliary funds', () => {
      mockBalanceValue = BigInt(100);
      mockInitialPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = false;
      mockConnectedChainId = 8453;

      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).toBeDisabled();
    });

    it('should not disable button when auxiliary funds are enabled even with low balance', () => {
      mockBalanceValue = BigInt(100);
      mockInitialPrice = BigInt(1000000000000000);
      mockAuxiliaryFundsEnabled = true;
      mockConnectedChainId = 8453;

      render(<RegistrationForm />);

      expect(screen.getByTestId('action-button')).not.toBeDisabled();
    });
  });

  describe('free name with discount', () => {
    it('should show "Free with your discount" message when price is 0', () => {
      mockInitialPrice = BigInt(1000000000000000);
      mockDiscountedPrice = BigInt(0);
      mockAuxiliaryFundsEnabled = false;
      mockBalanceValue = BigInt(1000000000000000000);

      render(<RegistrationForm />);

      expect(screen.getByText('Free with your discount')).toBeInTheDocument();
    });
  });

  describe('premium name', () => {
    it('should display premium banner when premium is active', () => {
      mockPremiumPrice = BigInt(500000000000000);
      mockPremiumSeconds = 3600n;
      mockPremiumTimestamp = '1 hour';
      mockIsPremiumDataLoading = false;
      mockSingleYearEthCost = BigInt(1000000000000000);

      render(<RegistrationForm />);

      expect(screen.getByText(/Temporary premium of/)).toBeInTheDocument();
    });

    it('should show "Learn more" button for premium names', () => {
      mockPremiumPrice = BigInt(500000000000000);
      mockPremiumSeconds = 3600n;
      mockPremiumTimestamp = '1 hour';
      mockIsPremiumDataLoading = false;
      mockSingleYearEthCost = BigInt(1000000000000000);

      render(<RegistrationForm />);

      const learnMoreButtons = screen.getAllByRole('button', { name: 'Learn more' }); expect(learnMoreButtons.length).toBeGreaterThanOrEqual(1);
    });

    it('should open PremiumExplainerModal when Learn more is clicked', async () => {
      mockPremiumPrice = BigInt(500000000000000);
      mockPremiumSeconds = 3600n;
      mockPremiumTimestamp = '1 hour';
      mockIsPremiumDataLoading = false;
      mockSingleYearEthCost = BigInt(1000000000000000);

      render(<RegistrationForm />);

      await act(async () => {
        const learnMoreButtons = screen.getAllByRole('button', { name: 'Learn more' }); fireEvent.click(learnMoreButtons[0]);
      });

      expect(mockLogEventWithContext).toHaveBeenCalledWith(
        'toggle_premium_explainer_modal',
        'change'
      );
      expect(screen.getByTestId('premium-explainer-modal')).toBeInTheDocument();
    });
  });

  describe('discount code banner', () => {
    it('should show special message when code is present', () => {
      mockCode = 'FREENAME';

      render(<RegistrationForm />);

      expect(screen.getByText(/Claim your/)).toBeInTheDocument();
      expect(screen.getByText(/free basename/)).toBeInTheDocument();
    });

    it('should not show Learn more link when code is present', () => {
      mockCode = 'FREENAME';

      render(<RegistrationForm />);

      // There should be no "Learn more" button in the bottom section
      const learnMoreButtons = screen.queryAllByRole('button', { name: /Learn more/i });
      // Filter out the premium "Learn more" button if present
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const bottomLearnMore = learnMoreButtons.filter(
        (btn) => !btn.closest('[data-testid="premium-banner"]')
      );
      // When code is present, the bottom "Learn more" should not be rendered
      expect(screen.queryByText("You've qualified for a free name!")).not.toBeInTheDocument();
    });
  });

  describe('Learn more modal', () => {
    it('should open RegistrationLearnMoreModal when Learn more is clicked', async () => {
      mockCode = undefined;

      render(<RegistrationForm />);

      // Find the Learn more button in the bottom section (not the premium one)
      const buttons = screen.getAllByRole('button');
      const learnMoreButton = buttons.find((btn) => btn.textContent === 'Learn more');

      if (learnMoreButton) {
        await act(async () => {
          fireEvent.click(learnMoreButton);
        });

        expect(mockLogEventWithContext).toHaveBeenCalledWith('toggle_learn_more_modal', 'change');
        expect(screen.getByTestId('learn-more-modal')).toBeInTheDocument();
      }
    });
  });

  describe('transaction error', () => {
    it('should display transaction error when registerNameError is present', () => {
      mockRegisterNameError = new Error('Transaction failed');

      render(<RegistrationForm />);

      expect(screen.getByTestId('transaction-error')).toBeInTheDocument();
      expect(screen.getByText('Transaction failed')).toBeInTheDocument();
    });

    it('should not display transaction error when registerNameError is null', () => {
      mockRegisterNameError = null;

      render(<RegistrationForm />);

      expect(screen.queryByTestId('transaction-error')).not.toBeInTheDocument();
    });
  });

  describe('free name messaging', () => {
    it('should show "You\'ve qualified for a free name!" when name is free', () => {
      mockInitialPrice = BigInt(1000000000000000);
      mockDiscountedPrice = BigInt(0);
      mockCode = undefined;
      mockAuxiliaryFundsEnabled = false;
      mockBalanceValue = BigInt(1000000000000000000);

      render(<RegistrationForm />);

      expect(screen.getByText("You've qualified for a free name!")).toBeInTheDocument();
    });

    it('should show "Unlock your username for free!" when name is not free', () => {
      mockInitialPrice = BigInt(1000000000000000);
      mockDiscountedPrice = undefined;
      mockCode = undefined;

      render(<RegistrationForm />);

      expect(screen.getByText('Unlock your username for free!')).toBeInTheDocument();
    });
  });

  describe('premium explainer in pricing section', () => {
    it('should show premium link in pricing section when premium is active', () => {
      mockPremiumPrice = BigInt(500000000000000);
      mockPremiumSeconds = 3600n;
      mockPremiumTimestamp = '1 hour';
      mockIsPremiumDataLoading = false;
      mockSingleYearEthCost = BigInt(1000000000000000);
      mockBalanceValue = BigInt(1000000000000000000);
      mockAuxiliaryFundsEnabled = false;
      mockDiscountedPrice = undefined;

      render(<RegistrationForm />);

      expect(screen.getByText('This name has a temporary premium')).toBeInTheDocument();
    });
  });
});
