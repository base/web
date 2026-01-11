/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { PremiumExplainerModal } from './index';
import { parseEther } from 'viem';
import React from 'react';

// Mock the usernames module to avoid is-ipfs dependency issue
jest.mock('apps/web/src/utils/usernames', () => ({
  getTokenIdFromBasename: jest.fn(),
  formatBaseEthDomain: jest.fn(),
  GRACE_PERIOD_DURATION_SECONDS: 7776000,
}));

// Mock the Modal component
jest.mock('apps/web/src/components/Modal', () => {
  return function MockModal({
    isOpen,
    onClose,
    title,
    children,
  }: {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
  }) {
    if (!isOpen) return null;
    return (
      <div data-testid="modal" data-title={title}>
        <button type="button" data-testid="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    );
  };
});

// Store the captured tooltip content for testing
let capturedTooltipContent: React.ReactElement | null = null;

// Mock recharts components
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  LineChart: ({
    children,
    data,
  }: {
    children: React.ReactNode;
    data: { days: number; premium: number }[];
  }) => (
    <svg data-testid="line-chart" data-points={data?.length}>
      {children}
    </svg>
  ),
  Line: ({ dataKey }: { dataKey: string }) => <g data-testid="line" data-key={dataKey} />,
  CartesianGrid: () => <g data-testid="cartesian-grid" />,
  Tooltip: ({ content }: { content: React.ReactElement }) => {
    capturedTooltipContent = content;
    return <g data-testid="tooltip">{content}</g>;
  },
}));

// Mock the price decay data
jest.mock('apps/web/src/data/usernamePriceDecayTable.json', () => [
  { days: 0, premium: 100 },
  { days: 1, premium: 50 },
  { days: 21, premium: 0 },
]);

// Mock useErrors hook
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock useBasenamesNameExpiresWithGracePeriod hook
let mockHookReturn = {
  data: BigInt(1700000000),
  isLoading: false,
  isError: false,
  error: null as Error | null,
};

jest.mock('apps/web/src/hooks/useBasenamesNameExpiresWithGracePeriod', () => ({
  useBasenamesNameExpiresWithGracePeriod: () => mockHookReturn,
}));

describe('PremiumExplainerModal', () => {
  const defaultProps = {
    isOpen: true,
    toggleModal: jest.fn(),
    premiumEthAmount: parseEther('10'),
    baseSingleYearEthCost: parseEther('0.001'),
    name: 'testname',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    capturedTooltipContent = null;
    mockHookReturn = {
      data: BigInt(1700000000),
      isLoading: false,
      isError: false,
      error: null as Error | null,
    };
  });

  describe('when modal is closed', () => {
    it('should not render modal content when isOpen is false', () => {
      render(<PremiumExplainerModal {...defaultProps} isOpen={false} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('when modal is open', () => {
    it('should render modal when isOpen is true', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
    });

    it('should pass empty title to Modal', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('modal')).toHaveAttribute('data-title', '');
    });

    it('should display the heading about temporary premium', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText('This name has a temporary premium')).toBeInTheDocument();
    });

    it('should display explanation text about fair distribution', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(
        screen.getByText(/To ensure fair distribution of recently expired Basenames/),
      ).toBeInTheDocument();
    });

    it('should mention the 21 day decay period', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText(/decays exponentially to 0 over 21 days/)).toBeInTheDocument();
    });
  });

  describe('price display', () => {
    it('should display the current price section header', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText('current price')).toBeInTheDocument();
    });

    it('should display 1 year registration label', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText('1 year registration')).toBeInTheDocument();
    });

    it('should display temporary premium label', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText('Temporary premium')).toBeInTheDocument();
    });

    it('should display estimated total label', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText('Estimated total')).toBeInTheDocument();
    });

    it('should display formatted base cost in ETH', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      // 0.001 ETH formatted
      expect(screen.getByText('0.001 ETH')).toBeInTheDocument();
    });

    it('should display formatted premium in ETH', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      // 10 ETH premium formatted
      expect(screen.getByText('10 ETH')).toBeInTheDocument();
    });

    it('should display formatted total in ETH', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      // 10.001 ETH total formatted
      expect(screen.getByText('10.001 ETH')).toBeInTheDocument();
    });
  });

  describe('chart section', () => {
    it('should display price over time section header', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByText('See price over time')).toBeInTheDocument();
    });

    it('should render the responsive container', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
    });

    it('should render the line chart', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('line-chart')).toBeInTheDocument();
    });

    it('should render the line chart with data points', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('line-chart')).toHaveAttribute('data-points', '3');
    });

    it('should render the line with premium dataKey', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('line')).toHaveAttribute('data-key', 'premium');
    });

    it('should render the cartesian grid', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
    });

    it('should render the tooltip', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should not render modal when data is loading', () => {
      mockHookReturn = {
        data: BigInt(1700000000),
        isLoading: true,
        isError: false,
        error: null as Error | null,
      };

      render(<PremiumExplainerModal {...defaultProps} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('missing data states', () => {
    it('should not render modal when premiumEthAmount is undefined', () => {
      render(<PremiumExplainerModal {...defaultProps} premiumEthAmount={undefined} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('should not render modal when baseSingleYearEthCost is 0n', () => {
      render(<PremiumExplainerModal {...defaultProps} baseSingleYearEthCost={BigInt(0)} />);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('error handling', () => {
    it('should log error when hook returns an error', () => {
      const testError = new Error('Test error');
      mockHookReturn = {
        data: BigInt(1700000000),
        isLoading: false,
        isError: true,
        error: testError,
      };

      render(<PremiumExplainerModal {...defaultProps} />);

      expect(mockLogError).toHaveBeenCalledWith(
        testError,
        'Error fetching name expiration with grace period for: testname',
      );
    });

    it('should not log error when hook returns success', () => {
      mockHookReturn = {
        data: BigInt(1700000000),
        isLoading: false,
        isError: false,
        error: null as Error | null,
      };

      render(<PremiumExplainerModal {...defaultProps} />);

      expect(mockLogError).not.toHaveBeenCalled();
    });
  });

  describe('different price amounts', () => {
    it('should handle small premium amounts correctly', () => {
      render(<PremiumExplainerModal {...defaultProps} premiumEthAmount={parseEther('0.05')} />);

      expect(screen.getByText('0.05 ETH')).toBeInTheDocument();
    });

    it('should handle large premium amounts correctly', () => {
      render(<PremiumExplainerModal {...defaultProps} premiumEthAmount={parseEther('100')} />);

      expect(screen.getByText('100 ETH')).toBeInTheDocument();
    });

    it('should calculate correct total for different amounts', () => {
      render(
        <PremiumExplainerModal
          {...defaultProps}
          premiumEthAmount={parseEther('5')}
          baseSingleYearEthCost={parseEther('0.01')}
        />,
      );

      // 5 + 0.01 = 5.01 ETH
      expect(screen.getByText('5.01 ETH')).toBeInTheDocument();
    });
  });

  describe('toggleModal callback', () => {
    it('should pass toggleModal to Modal onClose', () => {
      const mockToggle = jest.fn();
      render(<PremiumExplainerModal {...defaultProps} toggleModal={mockToggle} />);

      // The mock Modal component has a close button that calls onClose
      const closeButton = screen.getByTestId('modal-close');
      closeButton.click();

      expect(mockToggle).toHaveBeenCalledTimes(1);
    });
  });

  describe('CustomTooltip component', () => {
    it('should capture tooltip content with correct props', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      // The tooltip content should have been captured
      expect(capturedTooltipContent).not.toBeNull();
      expect(capturedTooltipContent?.props.baseSingleYearEthCost).toBe(defaultProps.baseSingleYearEthCost);
      expect(capturedTooltipContent?.props.auctionStartTimeSeconds).toBe(mockHookReturn.data);
    });

    it('should render tooltip content when active with valid payload', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      // Render the captured tooltip content with simulated active state
      const tooltipProps = {
        active: true,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 5, premium: 50 },
            value: 50,
          },
        ],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      // Clone the captured content with new props
      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { getByText } = render(TooltipWithProps);

        // The tooltip should display the formatted values
        expect(getByText(/1 year registration:/)).toBeInTheDocument();
        expect(getByText(/Premium:/)).toBeInTheDocument();
        expect(getByText(/Estimated total:/)).toBeInTheDocument();
      }
    });

    it('should return null when tooltip is not active', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      // Render the captured tooltip content with inactive state
      const tooltipProps = {
        active: false,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 5, premium: 50 },
            value: 50,
          },
        ],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { container } = render(TooltipWithProps);

        // The tooltip should not render anything
        expect(container.firstChild).toBeNull();
      }
    });

    it('should return null when payload is empty', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      const tooltipProps = {
        active: true,
        payload: [],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { container } = render(TooltipWithProps);

        expect(container.firstChild).toBeNull();
      }
    });

    it('should return null when auctionStartTimeSeconds is undefined', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      const tooltipProps = {
        active: true,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 5, premium: 50 },
            value: 50,
          },
        ],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: undefined,
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { container } = render(TooltipWithProps);

        expect(container.firstChild).toBeNull();
      }
    });

    it('should return null when baseSingleYearEthCost is falsy', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      const tooltipProps = {
        active: true,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 5, premium: 50 },
            value: 50,
          },
        ],
        baseSingleYearEthCost: BigInt(0),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { container } = render(TooltipWithProps);

        expect(container.firstChild).toBeNull();
      }
    });

    it('should calculate and display correct time from auction start', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      const tooltipProps = {
        active: true,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 1, premium: 50 },
            value: 50,
          },
        ],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { container } = render(TooltipWithProps);

        // Should have a date displayed (the exact format depends on locale)
        // Match either "2023.*11.*15" (ISO-like) or "11/15/2023" (US format)
        expect(container.textContent).toMatch(/2023.*11.*15|11\/15\/2023/);
      }
    });

    it('should display premium value in tooltip', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      const tooltipProps = {
        active: true,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 1, premium: 25.5 },
            value: 25.5,
          },
        ],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { getByText } = render(TooltipWithProps);

        expect(getByText(/Premium: 25.5 ETH/)).toBeInTheDocument();
      }
    });

    it('should calculate correct total in tooltip', () => {
      render(<PremiumExplainerModal {...defaultProps} />);

      const tooltipProps = {
        active: true,
        payload: [
          {
            dataKey: 'premium' as const,
            name: 'premium' as const,
            payload: { days: 1, premium: 10 },
            value: 10,
          },
        ],
        baseSingleYearEthCost: parseEther('0.001'),
        auctionStartTimeSeconds: BigInt(1700000000),
      };

      if (capturedTooltipContent) {
        const TooltipWithProps = React.cloneElement(capturedTooltipContent, tooltipProps);
        const { getByText } = render(TooltipWithProps);

        // 10 + 0.001 = 10.001
        expect(getByText(/Estimated total: 10.001 ETH/)).toBeInTheDocument();
      }
    });
  });
});
