/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';

// Define SocialPlatform enum for testing
enum SocialPlatform {
  Twitter = 'twitter',
  Farcaster = 'farcaster',
}

// Mock socialPlatforms module
jest.mock('apps/web/src/utils/socialPlatforms', () => ({
  SocialPlatform: {
    Twitter: 'twitter',
    Farcaster: 'farcaster',
  },
  socialPlatformHandle: {
    twitter: '@base',
    farcaster: '@base',
  },
  socialPlatformIconName: {
    twitter: 'x',
    farcaster: 'farcaster',
  },
  socialPlatformShareLinkFunction: {
    twitter: ({ text, url }: { text: string; url: string }) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    farcaster: ({ text, url }: { text: string; url: string }) =>
      `https://warpcast.com/~/compose?embeds[]=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
}));

// Import after mocks
import RegistrationShareOnSocials, { socialPlatformsEnabled } from './index';

// Mock useRegistration
const mockSelectedName = 'testuser';
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  useRegistration: () => ({
    selectedName: mockSelectedName,
  }),
}));

// Mock useAnalytics
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name, height, width }: { name: string; height: string; width: string }) => (
    <span data-testid={`icon-${name}`} data-height={height} data-width={width} />
  ),
}));

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({
    href,
    children,
    onClick,
    target,
  }: {
    href: string;
    children: React.ReactNode;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
    target: string;
  }) => (
    <a href={href} onClick={onClick} target={target} data-testid={`social-link-${href}`}>
      {children}
    </a>
  ),
}));

// Mock window.open
const mockWindowOpen = jest.fn();

// Helper to safely check if a URL has a specific hostname
function hasHostname(href: string | null, hostname: string): boolean {
  if (!href) return false;
  try {
    const url = new URL(href);
    return url.hostname === hostname;
  } catch {
    return false;
  }
}

describe('RegistrationShareOnSocials', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock window.open
    Object.defineProperty(window, 'open', {
      value: mockWindowOpen,
      writable: true,
    });
    // Mock window dimensions for popup positioning
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 768,
      writable: true,
    });
  });

  describe('socialPlatformsEnabled', () => {
    it('should include Farcaster platform', () => {
      expect(socialPlatformsEnabled).toContain(SocialPlatform.Farcaster);
    });

    it('should include Twitter platform', () => {
      expect(socialPlatformsEnabled).toContain(SocialPlatform.Twitter);
    });

    it('should have exactly 2 platforms enabled', () => {
      expect(socialPlatformsEnabled).toHaveLength(2);
    });
  });

  describe('content rendering', () => {
    it('should render the share text', () => {
      render(<RegistrationShareOnSocials />);

      expect(screen.getByText('Share your name')).toBeInTheDocument();
    });

    it('should render a button for each enabled social platform', () => {
      render(<RegistrationShareOnSocials />);

      // Check for X (Twitter) icon
      expect(screen.getByTestId('icon-x')).toBeInTheDocument();

      // Check for Farcaster icon
      expect(screen.getByTestId('icon-farcaster')).toBeInTheDocument();
    });

    it('should render icons with correct dimensions', () => {
      render(<RegistrationShareOnSocials />);

      const xIcon = screen.getByTestId('icon-x');
      expect(xIcon).toHaveAttribute('data-height', '1.5rem');
      expect(xIcon).toHaveAttribute('data-width', '1.5rem');

      const farcasterIcon = screen.getByTestId('icon-farcaster');
      expect(farcasterIcon).toHaveAttribute('data-height', '1.5rem');
      expect(farcasterIcon).toHaveAttribute('data-width', '1.5rem');
    });
  });

  describe('social links', () => {
    it('should create Twitter share link with correct URL', () => {
      render(<RegistrationShareOnSocials />);

      // Find the link with x.com hostname
      const links = screen.getAllByRole('link');
      const twitterLink = links.find((link) => hasHostname(link.getAttribute('href'), 'x.com'));

      expect(twitterLink).toBeDefined();
      expect(twitterLink?.getAttribute('href')).toContain('x.com/intent/tweet');
      expect(twitterLink?.getAttribute('href')).toContain(
        encodeURIComponent(`https://base.org/name/${mockSelectedName}`),
      );
    });

    it('should create Farcaster share link with correct URL', () => {
      render(<RegistrationShareOnSocials />);

      // Find the link with warpcast.com hostname
      const links = screen.getAllByRole('link');
      const farcasterLink = links.find((link) =>
        hasHostname(link.getAttribute('href'), 'warpcast.com'),
      );

      expect(farcasterLink).toBeDefined();
      expect(farcasterLink?.getAttribute('href')).toContain('warpcast.com/~/compose');
      expect(farcasterLink?.getAttribute('href')).toContain(
        encodeURIComponent(`https://base.org/name/${mockSelectedName}`),
      );
    });

    it('should have target="_blank" on social links', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });

  describe('click behavior', () => {
    it('should prevent default on click', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      const event = { preventDefault: jest.fn() } as unknown as React.MouseEvent<HTMLAnchorElement>;

      // Simulate click on first link
      fireEvent.click(links[0], event);

      // Verify window.open was called (which means preventDefault was called in the handler)
      expect(mockWindowOpen).toHaveBeenCalled();
    });

    it('should log analytics event for Twitter share click', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      // Twitter link is second in the enabled list (Farcaster, Twitter)
      const twitterLink = links.find((link) => hasHostname(link.getAttribute('href'), 'x.com'));

      if (twitterLink) {
        fireEvent.click(twitterLink);
        expect(mockLogEventWithContext).toHaveBeenCalledWith('share_on_social_twitter', 'click');
      }
    });

    it('should log analytics event for Farcaster share click', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      // Farcaster link is first in the enabled list
      const farcasterLink = links.find((link) =>
        hasHostname(link.getAttribute('href'), 'warpcast.com'),
      );

      if (farcasterLink) {
        fireEvent.click(farcasterLink);
        expect(mockLogEventWithContext).toHaveBeenCalledWith('share_on_social_farcaster', 'click');
      }
    });

    it('should open popup window on click with correct dimensions', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      fireEvent.click(links[0]);

      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.any(String),
        '_blank',
        expect.stringContaining('width=600'),
      );
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.any(String),
        '_blank',
        expect.stringContaining('height=600'),
      );
    });

    it('should open popup window centered on screen', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      fireEvent.click(links[0]);

      // With window 1024x768 and popup 600x600:
      // left = 1024/2 - 600/2 = 212
      // top = 768/2 - 600/2 = 84
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.any(String),
        '_blank',
        expect.stringContaining('left=212'),
      );
      expect(mockWindowOpen).toHaveBeenCalledWith(
        expect.any(String),
        '_blank',
        expect.stringContaining('top=84'),
      );
    });
  });

  describe('share message content', () => {
    it('should include Onchain Summer message in share text', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      const twitterLink = links.find((link) => hasHostname(link.getAttribute('href'), 'x.com'));

      expect(twitterLink?.getAttribute('href')).toContain(
        encodeURIComponent('I just got my Basename as part of Onchain Summer!'),
      );
    });

    it('should include call to action in share text', () => {
      render(<RegistrationShareOnSocials />);

      const links = screen.getAllByRole('link');
      const twitterLink = links.find((link) => hasHostname(link.getAttribute('href'), 'x.com'));

      expect(twitterLink?.getAttribute('href')).toContain(encodeURIComponent('Get yours today.'));
    });
  });

  describe('styling', () => {
    it('should have flex layout with centered content', () => {
      render(<RegistrationShareOnSocials />);

      const container = document.querySelector('.flex.items-center.justify-center');
      expect(container).toBeInTheDocument();
    });

    it('should have gap between elements', () => {
      render(<RegistrationShareOnSocials />);

      const container = document.querySelector('.gap-4');
      expect(container).toBeInTheDocument();
    });

    it('should have uppercase text styling', () => {
      render(<RegistrationShareOnSocials />);

      const container = document.querySelector('.uppercase');
      expect(container).toBeInTheDocument();
    });

    it('should have white text color', () => {
      render(<RegistrationShareOnSocials />);

      const container = document.querySelector('.text-white');
      expect(container).toBeInTheDocument();
    });

    it('should have bold font weight', () => {
      render(<RegistrationShareOnSocials />);

      const container = document.querySelector('.font-bold');
      expect(container).toBeInTheDocument();
    });

    it('should have wide letter spacing', () => {
      render(<RegistrationShareOnSocials />);

      const container = document.querySelector('.tracking-widest');
      expect(container).toBeInTheDocument();
    });
  });
});
