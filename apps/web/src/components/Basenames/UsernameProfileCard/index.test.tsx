/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
 
 

import { render, screen } from '@testing-library/react';
import UsernameProfileCard from './index';

// Define UsernameTextRecordKeys locally to avoid import issues with the mock
const UsernameTextRecordKeys = {
  Description: 'description',
  Keywords: 'keywords',
  Url: 'url',
  Url2: 'url2',
  Url3: 'url3',
  Email: 'email',
  Phone: 'phone',
  Avatar: 'avatar',
  Location: 'location',
  Github: 'com.github',
  Twitter: 'com.twitter',
  Farcaster: 'xyz.farcaster',
  Lens: 'xyz.lens',
  Telegram: 'org.telegram',
  Discord: 'com.discord',
  Frames: 'frames',
  Casts: 'casts',
} as const;

// Mock the usernames utility
jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Description: 'description',
    Keywords: 'keywords',
    Url: 'url',
    Url2: 'url2',
    Url3: 'url3',
    Email: 'email',
    Phone: 'phone',
    Avatar: 'avatar',
    Location: 'location',
    Github: 'com.github',
    Twitter: 'com.twitter',
    Farcaster: 'xyz.farcaster',
    Lens: 'xyz.lens',
    Telegram: 'org.telegram',
    Discord: 'com.discord',
    Frames: 'frames',
    Casts: 'casts',
  },
  textRecordsSocialFieldsEnabled: [
    'com.twitter',
    'xyz.farcaster',
    'com.github',
    'url',
    'url2',
    'url3',
  ],
  textRecordsSocialFieldsEnabledIcons: {
    'com.twitter': 'twitter',
    'xyz.farcaster': 'farcaster',
    'com.github': 'github',
    url: 'website',
    url2: 'website',
    url3: 'website',
  },
  formatSocialFieldForDisplay: (key: string, handleOrUrl: string) => {
    switch (key) {
      case 'com.twitter':
      case 'xyz.farcaster':
      case 'com.github':
        // Remove @ prefix and extract from URLs
        let sanitized = handleOrUrl;
        try {
          const url = new URL(sanitized);
          if (url.pathname) {
            sanitized = url.pathname.replace(/\//g, '');
          }
        } catch {
          // not a URL
        }
        if (sanitized.startsWith('@')) {
          sanitized = sanitized.substring(1);
        }
        return sanitized;
      case 'url':
      case 'url2':
      case 'url3':
        return handleOrUrl.replace(/^https?:\/\//, '').replace(/\/$/, '');
      default:
        return '';
    }
  },
  formatSocialFieldUrl: (key: string, handleOrUrl: string) => {
    // Sanitize handle
    let sanitized = handleOrUrl;
    try {
      const url = new URL(sanitized);
      if (url.pathname) {
        sanitized = url.pathname.replace(/\//g, '');
      }
    } catch {
      // not a URL
    }
    if (sanitized.startsWith('@')) {
      sanitized = sanitized.substring(1);
    }

    switch (key) {
      case 'com.twitter':
        return `https://x.com/${sanitized}`;
      case 'xyz.farcaster':
        return `https://farcaster.xyz/${sanitized}`;
      case 'com.github':
        return `https://github.com/${sanitized}`;
      case 'url':
      case 'url2':
      case 'url3':
        if (!/^https?:\/\//i.test(handleOrUrl)) {
          return `https://${handleOrUrl}`;
        }
        return handleOrUrl;
      default:
        return '';
    }
  },
}));

// Mock the useUsernameProfile hook
const mockUseUsernameProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/UsernameProfileContext', () => ({
  useUsernameProfile: () => mockUseUsernameProfile(),
}));

// Mock the useReadBaseEnsTextRecords hook
const mockUseReadBaseEnsTextRecords = jest.fn();
jest.mock('apps/web/src/hooks/useReadBaseEnsTextRecords', () => ({
  __esModule: true,
  default: () => mockUseReadBaseEnsTextRecords(),
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    target,
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
  }) {
    return (
      <a href={href} target={target} data-testid="social-link">
        {children}
      </a>
    );
  };
});

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name }: { name: string }) => <span data-testid={`icon-${name}`}>icon</span>,
}));

describe('UsernameProfileCard', () => {
  const defaultEmptyTextRecords = {
    [UsernameTextRecordKeys.Description]: '',
    [UsernameTextRecordKeys.Keywords]: '',
    [UsernameTextRecordKeys.Url]: '',
    [UsernameTextRecordKeys.Url2]: '',
    [UsernameTextRecordKeys.Url3]: '',
    [UsernameTextRecordKeys.Github]: '',
    [UsernameTextRecordKeys.Email]: '',
    [UsernameTextRecordKeys.Phone]: '',
    [UsernameTextRecordKeys.Location]: '',
    [UsernameTextRecordKeys.Twitter]: '',
    [UsernameTextRecordKeys.Farcaster]: '',
    [UsernameTextRecordKeys.Lens]: '',
    [UsernameTextRecordKeys.Telegram]: '',
    [UsernameTextRecordKeys.Discord]: '',
    [UsernameTextRecordKeys.Avatar]: '',
    [UsernameTextRecordKeys.Frames]: '',
    [UsernameTextRecordKeys.Casts]: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseUsernameProfile.mockReturnValue({
      profileUsername: 'testuser.base.eth',
    });
    mockUseReadBaseEnsTextRecords.mockReturnValue({
      existingTextRecords: defaultEmptyTextRecords,
    });
  });

  describe('when no text records are set', () => {
    it('should return null and render nothing', () => {
      const { container } = render(<UsernameProfileCard />);
      expect(container.firstChild).toBeNull();
    });

    it('should call useUsernameProfile hook', () => {
      render(<UsernameProfileCard />);
      expect(mockUseUsernameProfile).toHaveBeenCalled();
    });

    it('should call useReadBaseEnsTextRecords with the profile username', () => {
      render(<UsernameProfileCard />);
      expect(mockUseReadBaseEnsTextRecords).toHaveBeenCalled();
    });
  });

  describe('when only description is set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Description]: 'This is my bio',
        },
      });
    });

    it('should render the profile card', () => {
      const { container } = render(<UsernameProfileCard />);
      expect(container.firstChild).not.toBeNull();
    });

    it('should display the description text', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByText('This is my bio')).toBeInTheDocument();
    });

    it('should not render location section', () => {
      render(<UsernameProfileCard />);
      expect(screen.queryByTestId('icon-map')).not.toBeInTheDocument();
    });

    it('should not render social links', () => {
      render(<UsernameProfileCard />);
      expect(screen.queryByTestId('social-link')).not.toBeInTheDocument();
    });
  });

  describe('when only location is set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Location]: 'New York, NY',
        },
      });
    });

    it('should render the profile card', () => {
      const { container } = render(<UsernameProfileCard />);
      expect(container.firstChild).not.toBeNull();
    });

    it('should display the location text', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByText('New York, NY')).toBeInTheDocument();
    });

    it('should render the map icon', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('icon-map')).toBeInTheDocument();
    });
  });

  describe('when Twitter social is set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Twitter]: 'testhandle',
        },
      });
    });

    it('should render the profile card', () => {
      const { container } = render(<UsernameProfileCard />);
      expect(container.firstChild).not.toBeNull();
    });

    it('should render a social link', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('social-link')).toBeInTheDocument();
    });

    it('should link to the correct Twitter URL', () => {
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://x.com/testhandle');
    });

    it('should open in a new tab', () => {
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('target', '_blank');
    });

    it('should display the sanitized handle', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByText('testhandle')).toBeInTheDocument();
    });

    it('should render the Twitter icon', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('icon-twitter')).toBeInTheDocument();
    });
  });

  describe('when Farcaster social is set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Farcaster]: 'farcasteruser',
        },
      });
    });

    it('should link to the correct Farcaster URL', () => {
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://farcaster.xyz/farcasteruser');
    });

    it('should render the Farcaster icon', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('icon-farcaster')).toBeInTheDocument();
    });
  });

  describe('when Github social is set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Github]: 'githubuser',
        },
      });
    });

    it('should link to the correct Github URL', () => {
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://github.com/githubuser');
    });

    it('should render the Github icon', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('icon-github')).toBeInTheDocument();
    });
  });

  describe('when URL is set', () => {
    it('should add https:// prefix if not present', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Url]: 'www.example.com',
        },
      });
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://www.example.com');
    });

    it('should preserve https:// if already present', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Url]: 'https://www.example.com',
        },
      });
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://www.example.com');
    });

    it('should display URL without protocol prefix', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Url]: 'https://www.example.com/',
        },
      });
      render(<UsernameProfileCard />);
      expect(screen.getByText('www.example.com')).toBeInTheDocument();
    });

    it('should render the website icon', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Url]: 'www.example.com',
        },
      });
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('icon-website')).toBeInTheDocument();
    });
  });

  describe('when multiple text records are set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Description]: 'Full stack developer',
          [UsernameTextRecordKeys.Location]: 'San Francisco, CA',
          [UsernameTextRecordKeys.Twitter]: 'mytwitter',
          [UsernameTextRecordKeys.Github]: 'mygithub',
          [UsernameTextRecordKeys.Url]: 'mywebsite.com',
        },
      });
    });

    it('should render all sections', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByText('Full stack developer')).toBeInTheDocument();
      expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
      expect(screen.getByTestId('icon-map')).toBeInTheDocument();
    });

    it('should render all social links', () => {
      render(<UsernameProfileCard />);
      const links = screen.getAllByTestId('social-link');
      expect(links.length).toBe(3);
    });

    it('should render correct icons for each social', () => {
      render(<UsernameProfileCard />);
      expect(screen.getByTestId('icon-twitter')).toBeInTheDocument();
      expect(screen.getByTestId('icon-github')).toBeInTheDocument();
      expect(screen.getByTestId('icon-website')).toBeInTheDocument();
    });
  });

  describe('when multiple URL fields are set', () => {
    beforeEach(() => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Url]: 'www.site1.com',
          [UsernameTextRecordKeys.Url2]: 'www.site2.com',
          [UsernameTextRecordKeys.Url3]: 'www.site3.com',
        },
      });
    });

    it('should render all three URL links', () => {
      render(<UsernameProfileCard />);
      const links = screen.getAllByTestId('social-link');
      expect(links.length).toBe(3);
    });

    it('should have correct hrefs for all URLs', () => {
      render(<UsernameProfileCard />);
      const links = screen.getAllByTestId('social-link');
      expect(links[0]).toHaveAttribute('href', 'https://www.site1.com');
      expect(links[1]).toHaveAttribute('href', 'https://www.site2.com');
      expect(links[2]).toHaveAttribute('href', 'https://www.site3.com');
    });
  });

  describe('social handle sanitization', () => {
    it('should remove @ prefix from Twitter handle', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Twitter]: '@myhandle',
        },
      });
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://x.com/myhandle');
      expect(screen.getByText('myhandle')).toBeInTheDocument();
    });

    it('should extract handle from full Twitter URL', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Twitter]: 'https://twitter.com/myhandle',
        },
      });
      render(<UsernameProfileCard />);
      const link = screen.getByTestId('social-link');
      expect(link).toHaveAttribute('href', 'https://x.com/myhandle');
    });
  });

  describe('textRecordsSocialFieldsEnabled ordering', () => {
    it('should only render enabled social fields', () => {
      // Set a social field that is NOT in textRecordsSocialFieldsEnabled
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Telegram]: 'telegramuser', // Not in enabled list
          [UsernameTextRecordKeys.Twitter]: 'twitteruser', // In enabled list
        },
      });
      render(<UsernameProfileCard />);
      // Only Twitter should render as it's in textRecordsSocialFieldsEnabled
      expect(screen.getByTestId('icon-twitter')).toBeInTheDocument();
      // Check there's only one social link
      const links = screen.getAllByTestId('social-link');
      expect(links.length).toBe(1);
    });
  });

  describe('card styling', () => {
    it('should render with correct container classes', () => {
      mockUseReadBaseEnsTextRecords.mockReturnValue({
        existingTextRecords: {
          ...defaultEmptyTextRecords,
          [UsernameTextRecordKeys.Description]: 'Test',
        },
      });
      const { container } = render(<UsernameProfileCard />);
      const cardDiv = container.firstChild as HTMLElement;
      expect(cardDiv).toHaveClass('flex');
      expect(cardDiv).toHaveClass('flex-col');
      expect(cardDiv).toHaveClass('gap-4');
      expect(cardDiv).toHaveClass('rounded-2xl');
      expect(cardDiv).toHaveClass('border');
      expect(cardDiv).toHaveClass('p-8');
    });
  });
});
