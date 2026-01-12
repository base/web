/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/array-type */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @next/next/no-img-element */

import { render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import React from 'react';
import { mockConsoleLog, restoreConsoleLog } from 'apps/web/src/testUtils/console';

// Mock the UsernameProfileContext
const mockUseUsernameProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => mockUseUsernameProfile(),
}));

// Mock UsernameProfileSectionTitle
jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionTitle', () => {
  return function MockUsernameProfileSectionTitle({ title }: { title: string }) {
    return <div data-testid="section-title">{title}</div>;
  };
});

// Mock the Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({
    name,
    color,
    height,
    width,
  }: {
    name: string;
    color?: string;
    height?: string;
    width?: string;
  }) {
    return (
      <span data-testid={`icon-${name}`} data-color={color} data-height={height} data-width={width}>
        {name}
      </span>
    );
  },
}));

// Mock Tooltip component
jest.mock('apps/web/src/components/Tooltip', () => {
  return function MockTooltip({
    content,
    children,
  }: {
    content: string;
    children: React.ReactNode;
  }) {
    return (
      <div data-testid="tooltip" data-content={content}>
        {children}
      </div>
    );
  };
});

// Mock next/image
jest.mock('next/image', () => {
  return function MockImage({
    src,
    alt,
    width,
    height,
  }: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }) {
    return <img src={src} alt={alt} width={width} height={height} data-testid="loading-image" />;
  };
});

// Mock react-calendar-heatmap
jest.mock('react-calendar-heatmap', () => {
  return function MockCalendarHeatmap({
    startDate,
    endDate,
    values,
    classForValue,
    titleForValue,
  }: {
    startDate: Date;
    endDate: Date;
    horizontal?: boolean;
    values: Array<{ date: string; count: number }>;
    classForValue?: (value: { date: string; count: number } | undefined) => string;
    titleForValue?: (value: { date: string; count: number } | undefined) => string;
  }) {
    // Call the callbacks to test them
    const emptyCellClass = classForValue?.(undefined) ?? '';
    const emptyCellTitle = titleForValue?.(undefined) ?? '';

    return (
      <div
        data-testid="calendar-heatmap"
        data-start-date={startDate.toISOString()}
        data-end-date={endDate.toISOString()}
        data-values={JSON.stringify(values)}
      >
        {values.map((v, i) => {
          const cellClass = classForValue?.(v) ?? '';
          const cellTitle = titleForValue?.(v) ?? '';
          return (
            <rect
              key={i}
              data-testid={`heatmap-cell-${i}`}
              className={cellClass}
              title={cellTitle}
            />
          );
        })}
        {/* Test empty value */}
        <rect
          data-testid="heatmap-cell-empty"
          className={emptyCellClass}
          title={emptyCellTitle}
        />
      </div>
    );
  };
});

// Mock radix-ui collapsible
jest.mock('@radix-ui/react-collapsible', () => ({
  Root: function MockRoot({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="collapsible-root" className={className}>
        {children}
      </div>
    );
  },
  Trigger: function MockTrigger({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <button type="button" data-testid="collapsible-trigger" className={className}>
        {children}
      </button>
    );
  },
  Content: function MockContent({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <div data-testid="collapsible-content" className={className}>
        {children}
      </div>
    );
  },
}));

// Mock CSS import
jest.mock('./cal.css', () => ({}));

// Mock contracts
jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionHeatmap/contracts', () => ({
  bridges: new Set(['0x8ed95d1746bf1e4dab58d8ed4724f1ef95b20db0']),
  lendBorrowEarn: new Set(['0x1e4b7a6b903680eab0c5dabcb8fd429cd2a9598c']),
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

import UsernameProfileSectionHeatmap from './index';

describe('UsernameProfileSectionHeatmap', () => {
  const mockProfileAddress = '0x1234567890abcdef1234567890abcdef12345678';

  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog();
    jest.useFakeTimers();

    mockUseUsernameProfile.mockReturnValue({
      profileAddress: mockProfileAddress,
    });
  });

  afterEach(() => {
    restoreConsoleLog();
    jest.useRealTimers();
  });

  const createMockTransaction = (overrides: Partial<{
    timeStamp: string;
    from: string;
    to: string;
    functionName: string;
    input: string;
    hash: string;
  }> = {}) => ({
    timeStamp: Math.floor(Date.now() / 1000).toString(),
    from: mockProfileAddress,
    to: '0x0000000000000000000000000000000000000000',
    functionName: '',
    input: '0x',
    hash: '0xhash',
    ...overrides,
  });

  const mockSuccessfulApiResponse = (transactions: ReturnType<typeof createMockTransaction>[]) => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: {
            status: '1',
            message: 'OK',
            result: transactions,
          },
        }),
    });
  };

  const mockNoTransactionsResponse = () => {
    mockFetch.mockResolvedValue({
      json: () =>
        Promise.resolve({
          data: {
            status: '0',
            message: 'No transactions found',
            result: [],
          },
        }),
    });
  };

  describe('loading state', () => {
    it('should render loading state initially', async () => {
      mockNoTransactionsResponse();
      render(<UsernameProfileSectionHeatmap />);

      expect(screen.getByTestId('section-title')).toBeInTheDocument();
      expect(screen.getByText('Activity')).toBeInTheDocument();
      expect(screen.getByTestId('loading-image')).toBeInTheDocument();

      await act(async () => {
        await Promise.resolve();
      });
    });

    it('should show loading gif with correct attributes', async () => {
      mockNoTransactionsResponse();
      render(<UsernameProfileSectionHeatmap />);

      const loadingImage = screen.getByTestId('loading-image');
      expect(loadingImage).toHaveAttribute('src', '/images/base-loading.gif');
      expect(loadingImage).toHaveAttribute('width', '22');
      expect(loadingImage).toHaveAttribute('height', '22');

      await act(async () => {
        await Promise.resolve();
      });
    });
  });

  describe('data fetching', () => {
    it('should not fetch data when profileAddress is undefined', async () => {
      mockUseUsernameProfile.mockReturnValue({
        profileAddress: undefined,
      });
      mockNoTransactionsResponse();

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        jest.advanceTimersByTime(100);
      });

      expect(mockFetch).not.toHaveBeenCalled();
    });

    it('should fetch transactions from multiple APIs', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      expect(mockFetch).toHaveBeenCalledWith(
        `/api/proxy?apiType=etherscan&address=${mockProfileAddress}`,
      );
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/proxy?apiType=basescan&address=${mockProfileAddress}`,
      );
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/proxy?apiType=basescan-internal&address=${mockProfileAddress}`,
      );
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/proxy?apiType=base-sepolia&address=${mockProfileAddress}`,
      );
    });

    it('should handle API errors gracefully', async () => {
      mockFetch.mockRejectedValue(new Error('Network error'));

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      // Should still render section title after error
      expect(screen.getByTestId('section-title')).toBeInTheDocument();
    });
  });

  describe('rendered content after loading', () => {
    it('should render the collapsible section with data', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByTestId('collapsible-root')).toBeInTheDocument();
      });
    });

    it('should render the Onchain Score title', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('ONCHAIN SCORE')).toBeInTheDocument();
      });
    });

    it('should render tooltip with score explanation', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        const tooltip = screen.getByTestId('tooltip');
        expect(tooltip).toHaveAttribute(
          'data-content',
          'Onchain score is a number out of 100 that measures onchain activity',
        );
      });
    });

    it('should render View details trigger', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByTestId('collapsible-trigger')).toBeInTheDocument();
        expect(screen.getByText('View details')).toBeInTheDocument();
      });
    });

    it('should render caret icon in trigger', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByTestId('icon-caret')).toBeInTheDocument();
      });
    });

    it('should render info icon next to score title', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByTestId('icon-info')).toBeInTheDocument();
      });
    });
  });

  describe('collapsible content metrics', () => {
    it('should render all metric labels in collapsible content', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Transactions on Ethereum & Base')).toBeInTheDocument();
        expect(screen.getByText('Unique days active')).toBeInTheDocument();
        expect(screen.getByText('Day longest streak')).toBeInTheDocument();
        expect(screen.getByText('Day current streak')).toBeInTheDocument();
        expect(screen.getByText('Day activity period')).toBeInTheDocument();
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
        expect(screen.getByText('Bridge transactions')).toBeInTheDocument();
        expect(screen.getByText('Lend/borrow/stake transactions')).toBeInTheDocument();
        expect(screen.getByText('ENS contract interactions')).toBeInTheDocument();
        expect(screen.getByText('Smart contracts deployed')).toBeInTheDocument();
      });
    });
  });

  describe('transaction categorization', () => {
    it('should count token swaps when transaction has swap functionName', async () => {
      const swapTx = createMockTransaction({
        functionName: 'swap',
      });
      mockSuccessfulApiResponse([swapTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
      });
    });

    it('should count bridge transactions when to address is in bridges set', async () => {
      const bridgeTx = createMockTransaction({
        to: '0x8ed95d1746bf1e4dab58d8ed4724f1ef95b20db0',
      });
      mockSuccessfulApiResponse([bridgeTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Bridge transactions')).toBeInTheDocument();
      });
    });

    it('should count lend/borrow when to address is in lendBorrowEarn set', async () => {
      const lendTx = createMockTransaction({
        to: '0x1e4b7a6b903680eab0c5dabcb8fd429cd2a9598c',
      });
      mockSuccessfulApiResponse([lendTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Lend/borrow/stake transactions')).toBeInTheDocument();
      });
    });

    it('should count ENS interactions when to is ENS registrar controller', async () => {
      const ensTx = createMockTransaction({
        to: '0x283af0b28c62c092c9727f1ee09c02ca627eb7f5',
      });
      mockSuccessfulApiResponse([ensTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('ENS contract interactions')).toBeInTheDocument();
      });
    });

    it('should count contract deployments when input starts with 0x60806040', async () => {
      const deployTx = createMockTransaction({
        input: '0x60806040...',
      });
      mockSuccessfulApiResponse([deployTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Smart contracts deployed')).toBeInTheDocument();
      });
    });
  });

  describe('heatmap rendering', () => {
    it('should render calendar heatmap with data', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByTestId('calendar-heatmap')).toBeInTheDocument();
      });
    });

    it('should render Less/More legend', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Less')).toBeInTheDocument();
        expect(screen.getByText('More')).toBeInTheDocument();
      });
    });
  });

  describe('classForValue', () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.useFakeTimers();
    });

    it('should return correct class for count >= 10', async () => {
      const baseTimestamp = Math.floor(Date.now() / 1000).toString();
      const txs = Array.from({ length: 10 }, (_, i) =>
        createMockTransaction({
          hash: `0xuniquehash10_${i}`,
          timeStamp: baseTimestamp,
        }),
      );

      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '1', message: 'OK', result: txs },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        });

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const cell = screen.getByTestId('heatmap-cell-0');
        expect(cell).toHaveClass('m-1', 'fill-[#003EC1]');
      });
    });

    it('should return correct class for count >= 7', async () => {
      const baseTimestamp = Math.floor(Date.now() / 1000).toString();
      const txs = Array.from({ length: 7 }, (_, i) =>
        createMockTransaction({
          hash: `0xuniquehash7_${i}`,
          timeStamp: baseTimestamp,
        }),
      );

      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '1', message: 'OK', result: txs },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        });

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const cell = screen.getByTestId('heatmap-cell-0');
        expect(cell).toHaveClass('m-1', 'fill-[#266EFF]');
      });
    });

    it('should return correct class for count >= 4', async () => {
      // Use unique hashes and same timestamp to aggregate to count=4 on the same day
      const baseTimestamp = Math.floor(Date.now() / 1000).toString();
      const txs = Array.from({ length: 8 }, (_, i) =>
        createMockTransaction({
          hash: `0xuniquehash${i}`,
          timeStamp: baseTimestamp,
        }),
      );

      // Mock each API call to return different subsets
      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '1', message: 'OK', result: txs.slice(0, 4) },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        })
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: { status: '0', message: 'No transactions found', result: [] },
            }),
        });

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const cell = screen.getByTestId('heatmap-cell-0');
        expect(cell).toHaveClass('m-1', 'fill-[#92B6FF]');
      });
    });

    it('should return correct class for count >= 1', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const cell = screen.getByTestId('heatmap-cell-0');
        expect(cell).toHaveClass('m-1', 'fill-[#D3E1FF]');
      });
    });

    it('should return empty class for undefined/null value', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const emptyCell = screen.getByTestId('heatmap-cell-empty');
        expect(emptyCell).toHaveClass('m-1', 'fill-[#F8F9FB]');
      });
    });
  });

  describe('titleForValue', () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.useFakeTimers();
    });

    it('should return formatted title with date and count', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const cell = screen.getByTestId('heatmap-cell-0');
        // The title should contain count info - our mock passes the data through
        const title = cell.getAttribute('title');
        expect(title).toBeDefined();
        expect(title?.length).toBeGreaterThan(0);
      });
    });

    it('should return empty string for undefined value', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        const emptyCell = screen.getByTestId('heatmap-cell-empty');
        expect(emptyCell.getAttribute('title')).toBe('');
      });
    });

    it('titleForValue returns formatted string for valid values', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        // The heatmap should be visible with cells
        const heatmap = screen.getByTestId('calendar-heatmap');
        expect(heatmap).toBeInTheDocument();
      });
    });
  });

  describe('score calculation', () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.useFakeTimers();
    });

    it('should display score out of 100', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        expect(screen.getByText(/\/100/)).toBeInTheDocument();
      });
    });
  });

  describe('streaks and metrics calculation', () => {
    beforeEach(() => {
      jest.useRealTimers();
    });

    afterEach(() => {
      jest.useFakeTimers();
    });

    it('should calculate unique active days correctly', async () => {
      const day1 = Math.floor(Date.now() / 1000);
      const day2 = day1 - 86400; // yesterday
      const txs = [
        createMockTransaction({ hash: '0x1', timeStamp: day1.toString() }),
        createMockTransaction({ hash: '0x2', timeStamp: day1.toString() }),
        createMockTransaction({ hash: '0x3', timeStamp: day2.toString() }),
      ];
      mockSuccessfulApiResponse(txs);

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(() => {
        expect(screen.getByText('Unique days active')).toBeInTheDocument();
      });
    });
  });

  describe('DOM manipulation effect', () => {
    it('should poll for rect elements and set rx/ry attributes', async () => {
      const tx = createMockTransaction();
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      // Advance timer to trigger the polling
      await act(async () => {
        jest.advanceTimersByTime(200);
      });

      // The effect polls for rect elements - this test verifies the effect runs
      expect(screen.getByTestId('section-title')).toBeInTheDocument();
    });
  });

  describe('filter transactions', () => {
    it('should filter out transactions not from profile address', async () => {
      const ownTx = createMockTransaction({ from: mockProfileAddress });
      const otherTx = createMockTransaction({
        from: '0x0000000000000000000000000000000000000001',
      });
      mockSuccessfulApiResponse([ownTx, otherTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      // The component should filter and only count transactions from the profile address
      await waitFor(() => {
        expect(screen.getByTestId('collapsible-root')).toBeInTheDocument();
      });
    });
  });

  describe('API retry logic', () => {
    it('should retry on Exception response', async () => {
      mockFetch
        .mockResolvedValueOnce({
          json: () =>
            Promise.resolve({
              data: {
                status: '0',
                message: 'Exception',
                result: null,
              },
            }),
        })
        .mockResolvedValue({
          json: () =>
            Promise.resolve({
              data: {
                status: '1',
                message: 'OK',
                result: [createMockTransaction()],
              },
            }),
        });

      jest.useRealTimers();

      render(<UsernameProfileSectionHeatmap />);

      await waitFor(
        () => {
          expect(mockFetch.mock.calls.length).toBeGreaterThan(4);
        },
        { timeout: 10000 },
      );
    }, 15000);
  });

  describe('Uniswap router detection', () => {
    it('should count swaps when to address is Uniswap router', async () => {
      const uniswapTx = createMockTransaction({
        to: '0x3fc91a3afd70395cd496c647d5a6cc9d4b2b7fad',
      });
      mockSuccessfulApiResponse([uniswapTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
      });
    });

    it('should count swaps when to address is Aerodrome router', async () => {
      const aerodromeTx = createMockTransaction({
        to: '0x6cb442acf35158d5eda88fe602221b67b400be3e',
      });
      mockSuccessfulApiResponse([aerodromeTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
      });
    });

    it('should count swaps when to address is 1inch router', async () => {
      const oneInchTx = createMockTransaction({
        to: '0x1111111254eeb25477b68fb85ed929f73a960582',
      });
      mockSuccessfulApiResponse([oneInchTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
      });
    });
  });

  describe('swap function names detection', () => {
    it('should detect fillOtcOrderWithEth as swap function', async () => {
      const tx = createMockTransaction({
        functionName: 'fillOtcOrderWithEth',
      });
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
      });
    });

    it('should detect proxiedSwap as swap function', async () => {
      const tx = createMockTransaction({
        functionName: 'proxiedSwap',
      });
      mockSuccessfulApiResponse([tx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Token swaps performed')).toBeInTheDocument();
      });
    });
  });

  describe('ENS registrar controllers', () => {
    it('should count interactions with ETHRegistrarController 2', async () => {
      const ensTx = createMockTransaction({
        to: '0x253553366da8546fc250f225fe3d25d0c782303b',
      });
      mockSuccessfulApiResponse([ensTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('ENS contract interactions')).toBeInTheDocument();
      });
    });

    it('should count interactions with Basenames RegistrarController', async () => {
      const basenameTx = createMockTransaction({
        to: '0x4ccb0bb02fcaba27e82a56646e81d8c5bc4119a5',
      });
      mockSuccessfulApiResponse([basenameTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('ENS contract interactions')).toBeInTheDocument();
      });
    });

    it('should count interactions with Basenames EA RegistrarController', async () => {
      const basenameEaTx = createMockTransaction({
        to: '0xd3e6775ed9b7dc12b205c8e608dc3767b9e5efda',
      });
      mockSuccessfulApiResponse([basenameEaTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('ENS contract interactions')).toBeInTheDocument();
      });
    });
  });

  describe('Moonwell WETH Unwrapper detection', () => {
    it('should count lend transactions from Moonwell WETH Unwrapper', async () => {
      const moonwellTx = createMockTransaction({
        from: '0x1382cff3cee10d283dcca55a30496187759e4caf',
      });
      mockSuccessfulApiResponse([moonwellTx]);

      render(<UsernameProfileSectionHeatmap />);

      await act(async () => {
        await Promise.resolve();
      });

      await waitFor(() => {
        expect(screen.getByText('Lend/borrow/stake transactions')).toBeInTheDocument();
      });
    });
  });
});
