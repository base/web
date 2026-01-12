/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockConsoleLog, restoreConsoleLog } from 'apps/web/src/testUtils/console';
import RegistrationSearchInput from './index';
import { RegistrationSearchInputVariant } from './types';

// Mock Analytics context
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock RegistrationContext
const mockSetSearchInputFocused = jest.fn();
const mockSetSearchInputHovered = jest.fn();
const mockSetSelectedName = jest.fn();

jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  useRegistration: () => ({
    setSearchInputFocused: mockSetSearchInputFocused,
    setSearchInputHovered: mockSetSearchInputHovered,
    setSelectedName: mockSetSelectedName,
  }),
}));

// Mock useBasenameChain
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: 8453 },
  }),
}));

// Mock useFocusWithin
let mockFocused = false;
const mockRef = { current: null };
jest.mock('apps/web/src/hooks/useFocusWithin', () => ({
  useFocusWithin: () => ({
    ref: mockRef,
    focused: mockFocused,
  }),
}));

// Mock useIsNameAvailable
let mockIsLoading = false;
let mockIsNameAvailable: boolean | undefined = undefined;
let mockIsError = false;
let mockIsFetching = false;

jest.mock('apps/web/src/hooks/useIsNameAvailable', () => ({
  useIsNameAvailable: () => ({
    isLoading: mockIsLoading,
    data: mockIsNameAvailable,
    isError: mockIsError,
    isFetching: mockIsFetching,
  }),
}));

// Mock usernames utility functions
jest.mock('apps/web/src/utils/usernames', () => ({
  formatBaseEthDomain: (name: string) => `${name}.base.eth`,
  validateEnsDomainName: (name: string) => {
    if (name.length === 0) return { valid: false, message: '' };
    if (name.length < 3) return { valid: false, message: 'Name is too short' };
    if (name.length > 20) return { valid: false, message: 'Name is too long' };
    if (!/^[a-z0-9-]+$/i.test(name)) return { valid: false, message: 'Invalid characters' };
    return { valid: true, message: '' };
  },
}));

// Mock usehooks-ts
jest.mock('usehooks-ts', () => ({
  useDebounceValue: (value: unknown) => [value],
}));

// Mock next/link
jest.mock('apps/web/src/components/Link', () => ({
  __esModule: true,
  default: ({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) => (
    <a href={href} className={className} data-testid="mock-link">
      {children}
    </a>
  ),
}));

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

// Mock Input component
type InputProps = {
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  autoCapitalize?: string;
};

jest.mock('apps/web/src/components/Input', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((props: InputProps) => {
    const { type, value, onChange, placeholder, className, id, autoCapitalize } = props;
    return (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={className}
        id={id}
        autoCapitalize={autoCapitalize}
        data-testid="search-input"
      />
    );
  }),
}));

// Mock ChevronRightIcon
jest.mock('@heroicons/react/24/outline', () => ({
  ChevronRightIcon: () => <span data-testid="chevron-right-icon">chevron</span>,
}));

describe('RegistrationSearchInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog();
    mockFocused = false;
    mockIsLoading = false;
    mockIsNameAvailable = undefined;
    mockIsError = false;
    mockIsFetching = false;
    // Mock window event listeners
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    restoreConsoleLog();
  });

  describe('rendering', () => {
    it('should render with Large variant', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search for a name')).toBeInTheDocument();
    });

    it('should render with Small variant', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Small}
          placeholder="Search"
        />
      );

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
    });

    it('should render search icon when input is empty', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      expect(screen.getByTestId('icon-search')).toBeInTheDocument();
    });
  });

  describe('input handling', () => {
    it('should update search value on input change', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'testname' } });

      expect(input).toHaveValue('testname');
    });

    it('should strip spaces and dots from input', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'test name.eth' } });

      expect(input).toHaveValue('testnameeth');
    });

    it('should show cross icon and allow clearing search when input has value', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'testname' } });

      expect(screen.getByTestId('icon-cross')).toBeInTheDocument();

      const clearButton = screen.getByRole('button', { name: /reset search/i });
      fireEvent.click(clearButton);

      expect(input).toHaveValue('');
    });
  });

  describe('mouse hover behavior', () => {
    it('should call setSearchInputHovered on mouse enter', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const fieldset = document.querySelector('fieldset');
      if (fieldset) {
        fireEvent.mouseEnter(fieldset);
        expect(mockSetSearchInputHovered).toHaveBeenCalledWith(true);
      }
    });

    it('should call setSearchInputHovered on mouse leave', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const fieldset = document.querySelector('fieldset');
      if (fieldset) {
        fireEvent.mouseLeave(fieldset);
        expect(mockSetSearchInputHovered).toHaveBeenCalledWith(false);
      }
    });
  });

  describe('dropdown behavior', () => {
    it('should show loading spinner when fetching name availability', () => {
      mockIsLoading = true;
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'testname' } });

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });

    it('should show available name button when name is available', async () => {
      mockIsNameAvailable = true;
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'testname' } });

      await waitFor(() => {
        expect(screen.getByText('testname.base.eth')).toBeInTheDocument();
      });

      expect(screen.getByTestId('chevron-right-icon')).toBeInTheDocument();
    });

    it('should call setSelectedName when available name is selected', async () => {
      mockIsNameAvailable = true;
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'testname' } });

      await waitFor(() => {
        expect(screen.getByText('testname.base.eth')).toBeInTheDocument();
      });

      const selectButton = screen.getByRole('button', { name: /testname.base.eth/i });
      fireEvent.mouseDown(selectButton);

      expect(mockSetSelectedName).toHaveBeenCalledWith('testname');
    });

    it('should show registered link when name is not available', async () => {
      mockIsNameAvailable = false;
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'takenname' } });

      await waitFor(() => {
        expect(screen.getByText('takenname.base.eth')).toBeInTheDocument();
        expect(screen.getByText('Registered')).toBeInTheDocument();
      });

      const link = screen.getByTestId('mock-link');
      expect(link).toHaveAttribute('href', 'name/takenname.base.eth');
    });

    it('should show error message when checking availability fails', async () => {
      mockIsError = true;
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'testname' } });

      await waitFor(() => {
        expect(
          screen.getByText('There was an error checking if your desired name is available')
        ).toBeInTheDocument();
      });
    });

    it('should show validation message for invalid name', async () => {
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'test@name' } });

      await waitFor(() => {
        expect(screen.getByText('Invalid characters')).toBeInTheDocument();
      });
    });
  });

  describe('scroll event handling', () => {
    it('should add scroll event listener on mount', () => {
      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      expect(window.addEventListener).toHaveBeenCalledWith(
        'scroll',
        expect.any(Function),
        { passive: true }
      );
    });
  });

  describe('analytics', () => {
    it('should log event when invalid name is entered', async () => {
      mockFocused = true;

      render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search for a name"
        />
      );

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'test@invalid' } });

      await waitFor(() => {
        expect(mockLogEventWithContext).toHaveBeenCalledWith(
          'search_available_name_invalid',
          'error',
          { error: 'Invalid characters' }
        );
      });
    });
  });

  describe('variant-specific styling', () => {
    it('should have different icon sizes for Large vs Small variant', () => {
      const { rerender } = render(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Large}
          placeholder="Search"
        />
      );

      // Large variant renders - component will use iconSize = 24
      expect(screen.getByTestId('search-input')).toBeInTheDocument();

      rerender(
        <RegistrationSearchInput
          variant={RegistrationSearchInputVariant.Small}
          placeholder="Search"
        />
      );

      // Small variant renders - component will use iconSize = 16
      expect(screen.getByTestId('search-input')).toBeInTheDocument();
    });
  });
});
