/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import NamesList from './NamesList';
import React from 'react';

// Mock the hooks module
const mockRefetch = jest.fn().mockResolvedValue(undefined);
const mockGoToNextPage = jest.fn();
const mockGoToPreviousPage = jest.fn();

let mockNamesData: {
  data: {
    token_id: string;
    domain: string;
    is_primary: boolean;
    expires_at: string;
  }[];
} | null = null;
let mockIsLoading = false;
let mockError: Error | null = null;
let mockHasPrevious = false;
let mockHasNext = false;
let mockTotalCount = 0;
let mockCurrentPageNumber = 1;

jest.mock('apps/web/src/components/Basenames/ManageNames/hooks', () => ({
  useNameList: () => ({
    namesData: mockNamesData,
    isLoading: mockIsLoading,
    error: mockError,
    refetch: mockRefetch,
    goToNextPage: mockGoToNextPage,
    goToPreviousPage: mockGoToPreviousPage,
    hasPrevious: mockHasPrevious,
    hasNext: mockHasNext,
    totalCount: mockTotalCount,
    currentPageNumber: mockCurrentPageNumber,
  }),
}));

// Mock the Errors context
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock AnalyticsProvider
jest.mock('apps/web/contexts/Analytics', () => ({
  __esModule: true,
  default: function MockAnalyticsProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="analytics-provider">{children}</div>;
  },
}));

// Mock Link component
jest.mock('apps/web/src/components/Link', () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className} data-testid="mock-link">
        {children}
      </a>
    );
  };
});

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`} />;
  },
}));

// Mock NameDisplay component
jest.mock('./NameDisplay', () => {
  return function MockNameDisplay({
    domain,
    isPrimary,
    tokenId,
    expiresAt,
    refetchNames,
  }: {
    domain: string;
    isPrimary: boolean;
    tokenId: string;
    expiresAt: string;
    refetchNames: () => void;
  }) {
    return (
      <li
        data-testid={`name-display-${tokenId}`}
        data-domain={domain}
        data-is-primary={String(isPrimary)}
        data-expires-at={expiresAt}
      >
        <span>{domain}</span>
        <button type="button" onClick={refetchNames} data-testid={`refetch-btn-${tokenId}`}>
          Refetch
        </button>
      </li>
    );
  };
});

describe('NamesList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNamesData = null;
    mockIsLoading = false;
    mockError = null;
    mockHasPrevious = false;
    mockHasNext = false;
    mockTotalCount = 0;
    mockCurrentPageNumber = 1;
  });

  describe('NamesLayout wrapper', () => {
    it('should render with AnalyticsProvider context', () => {
      render(<NamesList />);

      expect(screen.getByTestId('analytics-provider')).toBeInTheDocument();
    });

    it('should render the "My Basenames" heading', () => {
      render(<NamesList />);

      expect(screen.getByRole('heading', { name: 'My Basenames' })).toBeInTheDocument();
    });

    it('should render a link to register new names with plus icon', () => {
      render(<NamesList />);

      const links = screen.getAllByTestId('mock-link');
      const addLink = links.find((link) => link.getAttribute('href') === '/names/');
      expect(addLink).toBeInTheDocument();
      expect(screen.getByTestId('icon-plus')).toBeInTheDocument();
    });
  });

  describe('loading state', () => {
    it('should display loading message when isLoading is true', () => {
      mockIsLoading = true;

      render(<NamesList />);

      expect(screen.getByText('Loading names...')).toBeInTheDocument();
    });
  });

  describe('error state', () => {
    it('should display error message when there is an error', () => {
      mockError = new Error('Failed to load');

      render(<NamesList />);

      expect(
        screen.getByText('Failed to load names. Please try again later.'),
      ).toBeInTheDocument();
    });
  });

  describe('empty state', () => {
    it('should display empty state when namesData is null', () => {
      mockNamesData = null;

      render(<NamesList />);

      expect(screen.getByText('No names found.')).toBeInTheDocument();
    });

    it('should display empty state when namesData.data is empty', () => {
      mockNamesData = { data: [] };

      render(<NamesList />);

      expect(screen.getByText('No names found.')).toBeInTheDocument();
    });

    it('should display link to get a Basename in empty state', () => {
      mockNamesData = { data: [] };

      render(<NamesList />);

      expect(screen.getByText('Get a Basename!')).toBeInTheDocument();
      const links = screen.getAllByTestId('mock-link');
      const getBasenameLink = links.find((link) => link.textContent === 'Get a Basename!');
      expect(getBasenameLink).toHaveAttribute('href', '/names/');
    });
  });

  describe('names list rendering', () => {
    it('should render NameDisplay components for each name', () => {
      mockNamesData = {
        data: [
          {
            token_id: '1',
            domain: 'alice.base.eth',
            is_primary: true,
            expires_at: '2025-12-31T00:00:00.000Z',
          },
          {
            token_id: '2',
            domain: 'bob.base.eth',
            is_primary: false,
            expires_at: '2025-06-15T00:00:00.000Z',
          },
        ],
      };

      render(<NamesList />);

      expect(screen.getByTestId('name-display-1')).toBeInTheDocument();
      expect(screen.getByTestId('name-display-2')).toBeInTheDocument();
      expect(screen.getByText('alice.base.eth')).toBeInTheDocument();
      expect(screen.getByText('bob.base.eth')).toBeInTheDocument();
    });

    it('should pass correct props to NameDisplay', () => {
      mockNamesData = {
        data: [
          {
            token_id: '123',
            domain: 'test.base.eth',
            is_primary: true,
            expires_at: '2025-12-31T00:00:00.000Z',
          },
        ],
      };

      render(<NamesList />);

      const nameDisplay = screen.getByTestId('name-display-123');
      expect(nameDisplay).toHaveAttribute('data-domain', 'test.base.eth');
      expect(nameDisplay).toHaveAttribute('data-is-primary', 'true');
      expect(nameDisplay).toHaveAttribute('data-expires-at', '2025-12-31T00:00:00.000Z');
    });

    it('should pass refetchNames callback to NameDisplay', async () => {
      mockNamesData = {
        data: [
          {
            token_id: '1',
            domain: 'test.base.eth',
            is_primary: false,
            expires_at: '2025-12-31T00:00:00.000Z',
          },
        ],
      };

      render(<NamesList />);

      const refetchButton = screen.getByTestId('refetch-btn-1');
      fireEvent.click(refetchButton);

      expect(mockRefetch).toHaveBeenCalledTimes(1);
    });

    it('should log error when refetch fails', async () => {
      const error = new Error('Refetch failed');
      mockRefetch.mockRejectedValueOnce(error);
      mockNamesData = {
        data: [
          {
            token_id: '1',
            domain: 'test.base.eth',
            is_primary: false,
            expires_at: '2025-12-31T00:00:00.000Z',
          },
        ],
      };

      render(<NamesList />);

      const refetchButton = screen.getByTestId('refetch-btn-1');
      fireEvent.click(refetchButton);

      // Wait for async error handling
      await new Promise((resolve) => setTimeout(resolve, 0));

      expect(mockLogError).toHaveBeenCalledWith(error, 'Failed to refetch names');
    });
  });

  describe('pagination controls', () => {
    beforeEach(() => {
      mockNamesData = {
        data: [
          {
            token_id: '1',
            domain: 'test.base.eth',
            is_primary: false,
            expires_at: '2025-12-31T00:00:00.000Z',
          },
        ],
      };
    });

    it('should not render pagination controls when there is no next or previous page', () => {
      mockHasPrevious = false;
      mockHasNext = false;

      render(<NamesList />);

      expect(screen.queryByText('Prev')).not.toBeInTheDocument();
      expect(screen.queryByText('Next')).not.toBeInTheDocument();
    });

    it('should render pagination controls when hasNext is true', () => {
      mockHasNext = true;
      mockTotalCount = 10;

      render(<NamesList />);

      expect(screen.getByText('Prev')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should render pagination controls when hasPrevious is true', () => {
      mockHasPrevious = true;
      mockTotalCount = 10;

      render(<NamesList />);

      expect(screen.getByText('Prev')).toBeInTheDocument();
      expect(screen.getByText('Next')).toBeInTheDocument();
    });

    it('should display page number and total count', () => {
      mockHasNext = true;
      mockTotalCount = 25;
      mockCurrentPageNumber = 2;

      render(<NamesList />);

      expect(screen.getByText('Page 2 • 25 total names')).toBeInTheDocument();
    });

    it('should disable Prev button when hasPrevious is false', () => {
      mockHasNext = true;
      mockHasPrevious = false;

      render(<NamesList />);

      const prevButton = screen.getByRole('button', { name: 'Prev' });
      expect(prevButton).toBeDisabled();
    });

    it('should enable Prev button when hasPrevious is true', () => {
      mockHasPrevious = true;

      render(<NamesList />);

      const prevButton = screen.getByRole('button', { name: 'Prev' });
      expect(prevButton).not.toBeDisabled();
    });

    it('should disable Next button when hasNext is false', () => {
      mockHasPrevious = true;
      mockHasNext = false;

      render(<NamesList />);

      const nextButton = screen.getByRole('button', { name: 'Next' });
      expect(nextButton).toBeDisabled();
    });

    it('should enable Next button when hasNext is true', () => {
      mockHasNext = true;

      render(<NamesList />);

      const nextButton = screen.getByRole('button', { name: 'Next' });
      expect(nextButton).not.toBeDisabled();
    });

    it('should call goToPreviousPage when Prev button is clicked', () => {
      mockHasPrevious = true;

      render(<NamesList />);

      const prevButton = screen.getByRole('button', { name: 'Prev' });
      fireEvent.click(prevButton);

      expect(mockGoToPreviousPage).toHaveBeenCalledTimes(1);
    });

    it('should call goToNextPage when Next button is clicked', () => {
      mockHasNext = true;

      render(<NamesList />);

      const nextButton = screen.getByRole('button', { name: 'Next' });
      fireEvent.click(nextButton);

      expect(mockGoToNextPage).toHaveBeenCalledTimes(1);
    });
  });

  describe('state priority', () => {
    it('should show error state over loading state', () => {
      mockIsLoading = true;
      mockError = new Error('Some error');

      render(<NamesList />);

      expect(
        screen.getByText('Failed to load names. Please try again later.'),
      ).toBeInTheDocument();
      expect(screen.queryByText('Loading names...')).not.toBeInTheDocument();
    });

    it('should show loading state over empty state', () => {
      mockIsLoading = true;
      mockNamesData = null;

      render(<NamesList />);

      expect(screen.getByText('Loading names...')).toBeInTheDocument();
      expect(screen.queryByText('No names found.')).not.toBeInTheDocument();
    });
  });
});
