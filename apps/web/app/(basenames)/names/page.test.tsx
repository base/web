import { render, screen } from '@testing-library/react';
import Page, { metadata } from './page';

// Mock next/navigation
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error('NEXT_REDIRECT');
  },
}));

// Mock getBasenameAvailable
const mockGetBasenameAvailable = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  getBasenameAvailable: (...args: unknown[]) => mockGetBasenameAvailable(...args) as unknown,
}));

// Mock the child components
jest.mock('apps/web/app/(basenames)/names/RegistrationProviders', () => ({
  __esModule: true,
  default: ({ children, code }: { children: React.ReactNode; code?: string }) => (
    <div data-testid="registration-providers" data-code={code ?? ''}>
      {children}
    </div>
  ),
}));

jest.mock('apps/web/contexts/Errors', () => ({
  __esModule: true,
  default: ({ children, context }: { children: React.ReactNode; context: string }) => (
    <div data-testid="errors-provider" data-context={context}>
      {children}
    </div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/PoweredByEns', () => ({
  __esModule: true,
  default: () => <div data-testid="powered-by-ens">PoweredByEns</div>,
}));

jest.mock('apps/web/src/components/Basenames/RegistrationFaq', () => ({
  __esModule: true,
  default: () => <div data-testid="registration-faq">RegistrationFAQ</div>,
}));

jest.mock('apps/web/src/components/Basenames/RegistrationFlow', () => ({
  __esModule: true,
  default: () => <div data-testid="registration-flow">RegistrationFlow</div>,
}));

jest.mock('apps/web/src/components/Basenames/RegistrationValueProp', () => ({
  __esModule: true,
  default: () => <div data-testid="registration-value-prop">RegistrationValueProp</div>,
}));

// Mock the static image import
jest.mock('./basename_cover.png', () => ({
  src: '/mock-basename-cover.png',
}));

describe('Names Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('metadata', () => {
    it('should have correct metadataBase', () => {
      expect(metadata.metadataBase).toEqual(new URL('https://base.org'));
    });

    it('should have correct title', () => {
      expect(metadata.title).toBe('Basenames');
    });

    it('should have correct description', () => {
      expect(metadata.description).toContain('Basenames are a core onchain building block');
      expect(metadata.description).toContain('ENS infrastructure deployed on Base');
    });

    it('should have correct openGraph configuration', () => {
      expect(metadata.openGraph).toMatchObject({
        title: 'Basenames',
        url: '/names',
      });
      expect(metadata.openGraph?.images).toBeDefined();
    });

    it('should have correct twitter configuration', () => {
      expect(metadata.twitter).toEqual({
        site: '@base',
        card: 'summary_large_image',
      });
    });
  });

  describe('Page component', () => {
    it('should render all child components without search params', async () => {
      const page = await Page({ searchParams: Promise.resolve({}) });
      render(page);

      expect(screen.getByTestId('errors-provider')).toBeInTheDocument();
      expect(screen.getByTestId('registration-providers')).toBeInTheDocument();
      expect(screen.getByTestId('registration-flow')).toBeInTheDocument();
      expect(screen.getByTestId('registration-value-prop')).toBeInTheDocument();
      expect(screen.getByTestId('powered-by-ens')).toBeInTheDocument();
      expect(screen.getByTestId('registration-faq')).toBeInTheDocument();
    });

    it('should render with undefined searchParams', async () => {
      const page = await Page({});
      render(page);

      expect(screen.getByTestId('errors-provider')).toBeInTheDocument();
      expect(screen.getByTestId('registration-providers')).toBeInTheDocument();
    });

    it('should wrap children with ErrorsProvider with registration context', async () => {
      const page = await Page({ searchParams: Promise.resolve({}) });
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      expect(errorsProvider).toHaveAttribute('data-context', 'registration');
    });

    it('should pass code to RegistrationProviders', async () => {
      const page = await Page({ searchParams: Promise.resolve({ code: 'test-code' }) });
      render(page);

      const registrationProviders = screen.getByTestId('registration-providers');
      expect(registrationProviders).toHaveAttribute('data-code', 'test-code');
    });

    it('should render without code when not provided', async () => {
      const page = await Page({ searchParams: Promise.resolve({}) });
      render(page);

      const registrationProviders = screen.getByTestId('registration-providers');
      expect(registrationProviders).toHaveAttribute('data-code', '');
    });

    it('should nest providers in correct order (ErrorsProvider > RegistrationProviders)', async () => {
      const page = await Page({ searchParams: Promise.resolve({}) });
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      const registrationProviders = screen.getByTestId('registration-providers');

      expect(errorsProvider).toContainElement(registrationProviders);
    });

    it('should render main element containing all components', async () => {
      const page = await Page({ searchParams: Promise.resolve({}) });
      render(page);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId('registration-flow'));
      expect(main).toContainElement(screen.getByTestId('registration-value-prop'));
      expect(main).toContainElement(screen.getByTestId('powered-by-ens'));
      expect(main).toContainElement(screen.getByTestId('registration-faq'));
    });
  });

  describe('claim parameter handling', () => {
    it('should check availability when claim param is provided', async () => {
      mockGetBasenameAvailable.mockResolvedValue(true);

      const page = await Page({ searchParams: Promise.resolve({ claim: 'testname' }) });
      render(page);

      expect(mockGetBasenameAvailable).toHaveBeenCalledWith('testname', expect.any(Object));
      expect(mockRedirect).not.toHaveBeenCalled();
    });

    it('should redirect to /names when claimed name is not available', async () => {
      mockGetBasenameAvailable.mockResolvedValue(false);

      await expect(
        Page({ searchParams: Promise.resolve({ claim: 'unavailable-name' }) })
      ).rejects.toThrow('NEXT_REDIRECT');

      expect(mockGetBasenameAvailable).toHaveBeenCalledWith('unavailable-name', expect.any(Object));
      expect(mockRedirect).toHaveBeenCalledWith('/names');
    });

    it('should redirect to /names when getBasenameAvailable throws an error', async () => {
      mockGetBasenameAvailable.mockRejectedValue(new Error('Network error'));

      await expect(
        Page({ searchParams: Promise.resolve({ claim: 'error-name' }) })
      ).rejects.toThrow('NEXT_REDIRECT');

      expect(mockGetBasenameAvailable).toHaveBeenCalledWith('error-name', expect.any(Object));
      expect(mockRedirect).toHaveBeenCalledWith('/names');
    });

    it('should not check availability when claim param is not provided', async () => {
      const page = await Page({ searchParams: Promise.resolve({}) });
      render(page);

      expect(mockGetBasenameAvailable).not.toHaveBeenCalled();
    });

    it('should handle both code and claim params together when name is available', async () => {
      mockGetBasenameAvailable.mockResolvedValue(true);

      const page = await Page({
        searchParams: Promise.resolve({ code: 'discount-code', claim: 'available-name' }),
      });
      render(page);

      expect(mockGetBasenameAvailable).toHaveBeenCalledWith('available-name', expect.any(Object));
      const registrationProviders = screen.getByTestId('registration-providers');
      expect(registrationProviders).toHaveAttribute('data-code', 'discount-code');
    });
  });
});
