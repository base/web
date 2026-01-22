import { render, screen } from '@testing-library/react';
import Page from './page';

// Mock next/navigation
const mockNotFound = jest.fn();
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  notFound: () => {
    mockNotFound();
    throw new Error('NEXT_NOT_FOUND');
  },
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error('NEXT_REDIRECT');
  },
}));

// Mock usernames utils
const mockFormatDefaultUsername = jest.fn();
let mockIsBasenameRenewalsKilled = false;
jest.mock('apps/web/src/utils/usernames', () => ({
  formatDefaultUsername: (...args: unknown[]) => mockFormatDefaultUsername(...args) as unknown,
  get isBasenameRenewalsKilled() {
    return mockIsBasenameRenewalsKilled;
  },
}));

// Mock redirectIfNameDoesNotExist
const mockRedirectIfNameDoesNotExist = jest.fn();
jest.mock('apps/web/src/utils/redirectIfNameDoesNotExist', () => ({
  redirectIfNameDoesNotExist: (...args: unknown[]) => mockRedirectIfNameDoesNotExist(...args) as unknown,
}));

// Mock child components
jest.mock('apps/web/contexts/Errors', () => ({
  __esModule: true,
  default: ({ children, context }: { children: React.ReactNode; context: string }) => (
    <div data-testid="errors-provider" data-context={context}>
      {children}
    </div>
  ),
}));

jest.mock('apps/web/src/components/Basenames/RenewalFlow', () => ({
  __esModule: true,
  default: ({ name }: { name: string }) => (
    <div data-testid="renewal-flow" data-name={name}>
      RenewalFlow
    </div>
  ),
}));

describe('Renew Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockIsBasenameRenewalsKilled = false;
    mockFormatDefaultUsername.mockImplementation(async (name: string) =>
      name.endsWith('.base.eth') ? name : `${name}.base.eth`
    );
    mockRedirectIfNameDoesNotExist.mockResolvedValue(undefined);
  });

  describe('Page component', () => {
    it('should render ErrorsProvider with renewal context', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' }),
      });
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      expect(errorsProvider).toBeInTheDocument();
      expect(errorsProvider).toHaveAttribute('data-context', 'renewal');
    });

    it('should render RenewalFlow component', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' }),
      });
      render(page);

      expect(screen.getByTestId('renewal-flow')).toBeInTheDocument();
    });

    it('should pass the username (without domain) to RenewalFlow', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'myname' }),
      });
      render(page);

      const renewalFlow = screen.getByTestId('renewal-flow');
      expect(renewalFlow).toHaveAttribute('data-name', 'myname');
    });

    it('should render main element containing RenewalFlow', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' }),
      });
      render(page);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId('renewal-flow'));
    });

    it('should nest components in correct order (ErrorsProvider > main > RenewalFlow)', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' }),
      });
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      const main = screen.getByRole('main');
      const renewalFlow = screen.getByTestId('renewal-flow');

      expect(errorsProvider).toContainElement(main);
      expect(main).toContainElement(renewalFlow);
    });

    it('should call redirectIfNameDoesNotExist with formatted username', async () => {
      await Page({
        params: Promise.resolve({ username: 'validname' }),
      });

      expect(mockRedirectIfNameDoesNotExist).toHaveBeenCalledWith('validname.base.eth');
    });

    it('should decode URI-encoded username', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'test%2Ebase%2Eeth' }),
      });
      render(page);

      // The username passed to formatDefaultUsername should be decoded
      expect(mockFormatDefaultUsername).toHaveBeenCalledWith('test');
    });

    it('should extract name without domain from full basename', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'alice.base.eth' }),
      });
      render(page);

      const renewalFlow = screen.getByTestId('renewal-flow');
      expect(renewalFlow).toHaveAttribute('data-name', 'alice');
    });

    it('should call formatDefaultUsername with extracted name', async () => {
      await Page({
        params: Promise.resolve({ username: 'testname' }),
      });

      expect(mockFormatDefaultUsername).toHaveBeenCalledWith('testname');
    });
  });

  describe('renewals killed behavior', () => {
    it('should call notFound when renewals are killed', async () => {
      mockIsBasenameRenewalsKilled = true;

      await expect(
        Page({ params: Promise.resolve({ username: 'testuser' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');

      expect(mockNotFound).toHaveBeenCalled();
    });

    it('should not call redirectIfNameDoesNotExist when renewals are killed', async () => {
      mockIsBasenameRenewalsKilled = true;

      await expect(
        Page({ params: Promise.resolve({ username: 'testuser' }) })
      ).rejects.toThrow('NEXT_NOT_FOUND');

      expect(mockRedirectIfNameDoesNotExist).not.toHaveBeenCalled();
    });

    it('should render normally when renewals are not killed', async () => {
      mockIsBasenameRenewalsKilled = false;

      const page = await Page({
        params: Promise.resolve({ username: 'testuser' }),
      });
      render(page);

      expect(mockNotFound).not.toHaveBeenCalled();
      expect(screen.getByTestId('renewal-flow')).toBeInTheDocument();
    });
  });

  describe('redirect behavior', () => {
    it('should redirect when name does not exist', async () => {
      mockRedirectIfNameDoesNotExist.mockImplementation(() => {
        mockRedirect('/name/not-found?name=nonexistent.base.eth');
        throw new Error('NEXT_REDIRECT');
      });

      await expect(
        Page({ params: Promise.resolve({ username: 'nonexistent' }) })
      ).rejects.toThrow('NEXT_REDIRECT');

      expect(mockRedirectIfNameDoesNotExist).toHaveBeenCalledWith('nonexistent.base.eth');
    });

    it('should not redirect when name exists', async () => {
      mockRedirectIfNameDoesNotExist.mockResolvedValue(undefined);

      const page = await Page({
        params: Promise.resolve({ username: 'existingname' }),
      });
      render(page);

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(screen.getByTestId('renewal-flow')).toBeInTheDocument();
    });
  });
});
