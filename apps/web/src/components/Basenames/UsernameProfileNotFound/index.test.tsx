/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { mockConsoleLog, restoreConsoleLog } from 'apps/web/src/testUtils/console';
import UsernameProfileNotFound from './index';

// Mock next/navigation
const mockRedirect = jest.fn();
const mockSearchParamsGet = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error('NEXT_REDIRECT');
  },
  useSearchParams: () => ({
    get: mockSearchParamsGet,
  }),
}));

// Mock useIsNameAvailable hook
const mockUseIsNameAvailable = jest.fn();
jest.mock('apps/web/src/hooks/useIsNameAvailable', () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useIsNameAvailable: (...args: unknown[]) => mockUseIsNameAvailable(...args),
}));

// Mock ImageWithLoading component
jest.mock('apps/web/src/components/ImageWithLoading', () => ({
  __esModule: true,
  // eslint-disable-next-line @next/next/no-img-element
  default: ({ alt }: { alt: string }) => <img data-testid="not-found-image" alt={alt} />,
}));

// Mock Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({ children }: { children: React.ReactNode }) => (
    <button type="button" data-testid="register-button">
      {children}
    </button>
  ),
  ButtonVariants: {
    Black: 'black',
  },
}));

// Mock libs/base-ui Icon
jest.mock('libs/base-ui', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>{name}</span>,
}));

// Mock the SVG import
jest.mock('./notFoundIllustration.svg', () => ({
  src: '/mock-not-found-illustration.svg',
  height: 100,
  width: 100,
}));

describe('UsernameProfileNotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog();
    // Default mock values - name exists in params and is available
    mockSearchParamsGet.mockReturnValue('testname.base.eth');
    mockUseIsNameAvailable.mockReturnValue({
      isLoading: false,
      data: true,
      isFetching: false,
    });
  });

  afterEach(() => {
    restoreConsoleLog();
  });

  describe('when no username is provided', () => {
    it('should redirect to /names when username is null', () => {
      mockSearchParamsGet.mockReturnValue(null);

      expect(() => render(<UsernameProfileNotFound />)).toThrow('NEXT_REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/names');
    });
  });

  describe('when loading name availability', () => {
    it('should render a spinner while fetching name availability', () => {
      mockUseIsNameAvailable.mockReturnValue({
        isLoading: true,
        data: undefined,
        isFetching: true,
      });

      render(<UsernameProfileNotFound />);

      expect(screen.getByTestId('icon-spinner')).toBeInTheDocument();
    });
  });

  describe('when name is not available (already registered by someone)', () => {
    it('should redirect to /names when name is not available', () => {
      mockUseIsNameAvailable.mockReturnValue({
        isLoading: false,
        data: false,
        isFetching: false,
      });

      expect(() => render(<UsernameProfileNotFound />)).toThrow('NEXT_REDIRECT');
      expect(mockRedirect).toHaveBeenCalledWith('/names');
    });
  });

  describe('when name is available', () => {
    beforeEach(() => {
      mockSearchParamsGet.mockReturnValue('testname.base.eth');
      mockUseIsNameAvailable.mockReturnValue({
        isLoading: false,
        data: true,
        isFetching: false,
      });
    });

    it('should render the not found illustration', () => {
      render(<UsernameProfileNotFound />);

      expect(screen.getByTestId('not-found-image')).toBeInTheDocument();
      expect(screen.getByTestId('not-found-image')).toHaveAttribute('alt', '404 Illustration');
    });

    it('should display the name not found title', () => {
      render(<UsernameProfileNotFound />);

      expect(screen.getByText('testname.base.eth is not found')).toBeInTheDocument();
    });

    it('should display description about claiming the name', () => {
      render(<UsernameProfileNotFound />);

      expect(
        screen.getByText("There's no profile associated with this name, but it could be yours!"),
      ).toBeInTheDocument();
    });

    it('should render a register button', () => {
      render(<UsernameProfileNotFound />);

      expect(screen.getByTestId('register-button')).toBeInTheDocument();
      expect(screen.getByText('Register name')).toBeInTheDocument();
    });

    it('should link to the names page with claim parameter', () => {
      render(<UsernameProfileNotFound />);

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/names?claim=testname.base.eth');
    });
  });

  describe('username stripping', () => {
    it('should strip .base.eth suffix when checking availability', () => {
      mockSearchParamsGet.mockReturnValue('myname.base.eth');

      render(<UsernameProfileNotFound />);

      expect(mockUseIsNameAvailable).toHaveBeenCalledWith('myname');
    });

    it('should handle names without .base.eth suffix', () => {
      mockSearchParamsGet.mockReturnValue('plainname');

      render(<UsernameProfileNotFound />);

      expect(mockUseIsNameAvailable).toHaveBeenCalledWith('plainname');
    });
  });

  describe('layout', () => {
    it('should center content with flex layout', () => {
      const { container } = render(<UsernameProfileNotFound />);

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toHaveClass('flex-col');
      expect(flexContainer).toHaveClass('items-center');
      expect(flexContainer).toHaveClass('text-center');
    });

    it('should have gap between elements', () => {
      const { container } = render(<UsernameProfileNotFound />);

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toHaveClass('gap-8');
    });

    it('should have full width', () => {
      const { container } = render(<UsernameProfileNotFound />);

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toHaveClass('w-full');
    });
  });

  describe('title styling', () => {
    it('should render title with correct heading level', () => {
      render(<UsernameProfileNotFound />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('testname.base.eth is not found');
    });

    it('should have word break styling for long names', () => {
      render(<UsernameProfileNotFound />);

      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveClass('break-all');
    });
  });
});
