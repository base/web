import { render, screen } from '@testing-library/react';
import Page, { generateMetadata, UsernameProfileProps } from './page';
import { Basename } from '@coinbase/onchainkit/identity';

// Mock next/navigation
const mockRedirect = jest.fn();
jest.mock('next/navigation', () => ({
  redirect: (...args: unknown[]) => {
    mockRedirect(...args);
    throw new Error('NEXT_REDIRECT');
  },
}));

// Mock usernames utils
const mockFormatDefaultUsername = jest.fn();
const mockGetBasenameTextRecord = jest.fn();
jest.mock('apps/web/src/utils/usernames', () => ({
  formatDefaultUsername: (...args: unknown[]) => mockFormatDefaultUsername(...args) as unknown,
  getBasenameTextRecord: (...args: unknown[]) => mockGetBasenameTextRecord(...args) as unknown,
  UsernameTextRecordKeys: {
    Description: 'description',
    Avatar: 'avatar',
    Keywords: 'keywords',
    Url: 'url',
    Email: 'email',
    Phone: 'phone',
    Github: 'com.github',
    Twitter: 'com.twitter',
    Farcaster: 'xyz.farcaster',
    Lens: 'xyz.lens',
    Telegram: 'org.telegram',
    Discord: 'com.discord',
    Name: 'name',
  },
}));

// Mock redirectIfNameDoesNotExist
const mockRedirectIfNameDoesNotExist = jest.fn();
jest.mock('apps/web/src/utils/redirectIfNameDoesNotExist', () => ({
  redirectIfNameDoesNotExist: (...args: unknown[]) => mockRedirectIfNameDoesNotExist(...args) as unknown,
}));

// Mock child components
jest.mock('apps/web/app/(basenames)/name/[username]/ProfileProviders', () => ({
  __esModule: true,
  default: ({ children, username }: { children: React.ReactNode; username: Basename }) => (
    <div data-testid="profile-providers" data-username={username}>
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

jest.mock('apps/web/src/components/Basenames/UsernameProfile', () => ({
  __esModule: true,
  default: () => <div data-testid="username-profile">UsernameProfile</div>,
}));

describe('Username Profile Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFormatDefaultUsername.mockImplementation(async (name: string) =>
      name.endsWith('.base.eth') ? name : `${name}.base.eth`
    );
    mockRedirectIfNameDoesNotExist.mockResolvedValue(undefined);
    mockGetBasenameTextRecord.mockResolvedValue(null);
  });

  describe('generateMetadata', () => {
    it('should return correct metadataBase', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice' as Basename }),
      };

      const metadata = await generateMetadata(props);

      expect(metadata.metadataBase).toEqual(new URL('https://base.org'));
    });

    it('should format the username correctly in title', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice' as Basename }),
      };

      const metadata = await generateMetadata(props);

      expect(metadata.title).toBe('Basenames | alice.base.eth');
    });

    it('should use description from text record when available', async () => {
      mockGetBasenameTextRecord.mockResolvedValue('A custom description for my profile');

      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'bob' as Basename }),
      };

      const metadata = await generateMetadata(props);

      expect(metadata.description).toBe('A custom description for my profile');
      expect(mockGetBasenameTextRecord).toHaveBeenCalledWith('bob.base.eth', 'description');
    });

    it('should use default description when text record is not available', async () => {
      mockGetBasenameTextRecord.mockResolvedValue(null);

      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'charlie' as Basename }),
      };

      const metadata = await generateMetadata(props);

      expect(metadata.description).toBe('charlie.base.eth, a Basename');
    });

    it('should have correct openGraph configuration', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'dave' as Basename }),
      };

      const metadata = await generateMetadata(props);

      expect(metadata.openGraph).toMatchObject({
        title: 'Basenames | dave.base.eth',
        url: '/name/dave',
      });
    });

    it('should have correct twitter configuration', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'eve' as Basename }),
      };

      const metadata = await generateMetadata(props);

      expect(metadata.twitter).toEqual({
        card: 'summary_large_image',
      });
    });

    it('should handle encoded username in params', async () => {
      const props: UsernameProfileProps = {
        params: Promise.resolve({ username: 'alice.base.eth' as Basename }),
      };

      await generateMetadata(props);

      expect(mockFormatDefaultUsername).toHaveBeenCalledWith('alice.base.eth');
    });
  });

  describe('Page component', () => {
    it('should render all child components', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' as Basename }),
      });
      render(page);

      expect(screen.getByTestId('errors-provider')).toBeInTheDocument();
      expect(screen.getByTestId('profile-providers')).toBeInTheDocument();
      expect(screen.getByTestId('username-profile')).toBeInTheDocument();
    });

    it('should wrap children with ErrorsProvider with profile context', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' as Basename }),
      });
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      expect(errorsProvider).toHaveAttribute('data-context', 'profile');
    });

    it('should pass formatted username to ProfileProviders', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'myname' as Basename }),
      });
      render(page);

      const profileProviders = screen.getByTestId('profile-providers');
      expect(profileProviders).toHaveAttribute('data-username', 'myname.base.eth');
    });

    it('should nest providers in correct order (ErrorsProvider > ProfileProviders)', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' as Basename }),
      });
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      const profileProviders = screen.getByTestId('profile-providers');

      expect(errorsProvider).toContainElement(profileProviders);
    });

    it('should render main element containing UsernameProfile', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' as Basename }),
      });
      render(page);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId('username-profile'));
    });

    it('should call redirectIfNameDoesNotExist with formatted username', async () => {
      await Page({
        params: Promise.resolve({ username: 'validname' as Basename }),
      });

      expect(mockRedirectIfNameDoesNotExist).toHaveBeenCalledWith('validname.base.eth');
    });

    it('should decode URI-encoded username', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'test%20user' as Basename }),
      });
      render(page);

      expect(mockFormatDefaultUsername).toHaveBeenCalledWith('test user');
    });

    it('should apply correct CSS classes to main element', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' as Basename }),
      });
      render(page);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('mx-auto');
      expect(main).toHaveClass('mt-32');
      expect(main).toHaveClass('min-h-screen');
      expect(main).toHaveClass('max-w-[1440px]');
    });

    it('should have responsive flex direction classes', async () => {
      const page = await Page({
        params: Promise.resolve({ username: 'testuser' as Basename }),
      });
      render(page);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('flex-col');
      expect(main).toHaveClass('md:flex-row');
    });
  });

  describe('redirect behavior', () => {
    it('should redirect when name does not exist', async () => {
      mockRedirectIfNameDoesNotExist.mockImplementation(() => {
        mockRedirect('/name/not-found?name=nonexistent.base.eth');
        throw new Error('NEXT_REDIRECT');
      });

      await expect(
        Page({ params: Promise.resolve({ username: 'nonexistent' as Basename }) })
      ).rejects.toThrow('NEXT_REDIRECT');

      expect(mockRedirectIfNameDoesNotExist).toHaveBeenCalledWith('nonexistent.base.eth');
    });

    it('should not redirect when name exists', async () => {
      mockRedirectIfNameDoesNotExist.mockResolvedValue(undefined);

      const page = await Page({
        params: Promise.resolve({ username: 'existingname' as Basename }),
      });
      render(page);

      expect(mockRedirect).not.toHaveBeenCalled();
      expect(screen.getByTestId('username-profile')).toBeInTheDocument();
    });
  });
});
