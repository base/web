/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import React from 'react';

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

// Mock the Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: function MockButton({
    children,
    variant,
    rounded,
    fullWidth,
  }: {
    children: React.ReactNode;
    variant?: string;
    rounded?: boolean;
    fullWidth?: boolean;
  }) {
    return (
      <button
        type="button"
        data-testid="button"
        data-variant={variant}
        data-rounded={rounded}
        data-fullwidth={fullWidth}
      >
        {children}
      </button>
    );
  },
  ButtonVariants: {
    Black: 'black',
  },
}));

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

// Mock ImageWithLoading component
jest.mock('apps/web/src/components/ImageWithLoading', () => {
  return function MockImageWithLoading({
    alt,
    title,
    wrapperClassName,
    backgroundClassName,
  }: {
    alt: string;
    title: string;
    wrapperClassName?: string;
    backgroundClassName?: string;
  }) {
    return (
      <div
        data-testid={`image-${alt.toLowerCase().replace(/\s+/g, '-')}`}
        data-alt={alt}
        data-title={title}
        data-wrapper-class={wrapperClassName}
        data-bg-class={backgroundClassName}
      />
    );
  };
});

// Mock Modal component
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
        <div data-testid="modal-content">{children}</div>
      </div>
    );
  };
});

// Mock the image imports
jest.mock('./images/baseGuildCard.png', () => ({ src: 'baseGuildCard.png', default: {} }));
jest.mock('./images/baseLearnCard.png', () => ({ src: 'baseLearnCard.png', default: {} }));
jest.mock('./images/grantsCard.png', () => ({ src: 'grantsCard.png', default: {} }));
jest.mock('./images/onChainSummerRegistryCard.png', () => ({
  src: 'onChainSummerRegistryCard.png',
  default: {},
}));
jest.mock('./images/roundsWftIllustration.svg', () => ({
  src: 'roundsWftIllustration.svg',
  default: {},
}));
jest.mock('./images/verificationCard.png', () => ({ src: 'verificationCard.png', default: {} }));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    href,
    children,
    target,
    className,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    target?: string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void;
  }) {
    return (
      <a href={href} target={target} className={className} onClick={onClick} data-testid="link">
        {children}
      </a>
    );
  };
});

import UsernameProfileSectionExplore from './index';

describe('UsernameProfileSectionExplore', () => {
  const mockProfileUsername = 'testuser.base.eth';

  beforeEach(() => {
    jest.clearAllMocks();

    // Default mock values
    mockUseUsernameProfile.mockReturnValue({
      profileUsername: mockProfileUsername,
    });
  });

  describe('basic rendering', () => {
    it('should render the section element', () => {
      const { container } = render(<UsernameProfileSectionExplore />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
    });

    it('should render the section title with correct text', () => {
      render(<UsernameProfileSectionExplore />);

      expect(screen.getByTestId('section-title')).toBeInTheDocument();
      expect(screen.getByText('Explore ways to build your profile')).toBeInTheDocument();
    });

    it('should render the list container with proper styling classes', () => {
      const { container } = render(<UsernameProfileSectionExplore />);

      const ul = container.querySelector('ul');
      expect(ul).toBeInTheDocument();
      expect(ul).toHaveClass('mt-6', 'grid', 'grid-cols-1', 'gap-8', 'md:grid-cols-2');
    });
  });

  describe('explore links rendering', () => {
    it('should render 5 explore links', () => {
      render(<UsernameProfileSectionExplore />);

      const listItems = screen.getAllByRole('listitem');
      expect(listItems).toHaveLength(5);
    });

    it('should render the Onchain Registry link with heading', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Add project to Onchain Registry/i });
      expect(heading).toBeInTheDocument();
    });

    it('should render the Base Guild link with heading', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Get roles on Base Guild/i });
      expect(heading).toBeInTheDocument();
    });

    it('should render the Rounds Grant link with heading', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Get a Rounds Grant/i });
      expect(heading).toBeInTheDocument();
    });

    it('should render the Verification link with heading', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Get a Verification/i });
      expect(heading).toBeInTheDocument();
    });

    it('should render the Base Learn link with heading', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Go to Base Learn/i });
      expect(heading).toBeInTheDocument();
    });

    it('should render arrow icons for each link', () => {
      render(<UsernameProfileSectionExplore />);

      const arrowIcons = screen.getAllByTestId('icon-arrowRight');
      expect(arrowIcons).toHaveLength(5);
    });
  });

  describe('link hrefs with UTM parameters', () => {
    it('should include UTM parameters with username in link hrefs', () => {
      render(<UsernameProfileSectionExplore />);

      const links = screen.getAllByTestId('link');
      const expectedUtm = `?utm_source=baseprofile&utm_medium=badge&utm_campaign=registry&utm_term=${mockProfileUsername}`;

      // Check Onchain Registry link
      const registryLink = links.find(
        (link) => link.getAttribute('href')?.includes('buildonbase.deform.cc/registry'),
      );
      expect(registryLink).toHaveAttribute(
        'href',
        `https://buildonbase.deform.cc/registry${expectedUtm}`,
      );
    });

    it('should include UTM parameters for Base Guild link', () => {
      render(<UsernameProfileSectionExplore />);

      const links = screen.getAllByTestId('link');
      const expectedUtm = `?utm_source=baseprofile&utm_medium=badge&utm_campaign=registry&utm_term=${mockProfileUsername}`;

      const guildLink = links.find((link) => link.getAttribute('href')?.includes('guild.xyz/base'));
      expect(guildLink).toHaveAttribute('href', `https://guild.xyz/base${expectedUtm}`);
    });

    it('should include UTM parameters for Verification link', () => {
      render(<UsernameProfileSectionExplore />);

      const links = screen.getAllByTestId('link');
      const expectedUtm = `?utm_source=baseprofile&utm_medium=badge&utm_campaign=registry&utm_term=${mockProfileUsername}`;

      const verificationLink = links.find((link) =>
        link.getAttribute('href')?.includes('coinbase.com/onchain-verify'),
      );
      expect(verificationLink).toHaveAttribute(
        'href',
        `https://www.coinbase.com/onchain-verify${expectedUtm}`,
      );
    });

    it('should include UTM parameters for Base Learn link', () => {
      render(<UsernameProfileSectionExplore />);

      const links = screen.getAllByTestId('link');
      const expectedUtm = `?utm_source=baseprofile&utm_medium=badge&utm_campaign=registry&utm_term=${mockProfileUsername}`;

      const learnLink = links.find((link) =>
        link.getAttribute('href')?.includes('docs.base.org/base-learn'),
      );
      expect(learnLink).toHaveAttribute(
        'href',
        `https://docs.base.org/base-learn/progress${expectedUtm}`,
      );
    });

    it('should update UTM parameters when profileUsername changes', () => {
      const newUsername = 'newuser.base.eth';
      mockUseUsernameProfile.mockReturnValue({
        profileUsername: newUsername,
      });

      render(<UsernameProfileSectionExplore />);

      const links = screen.getAllByTestId('link');
      const expectedUtm = `?utm_source=baseprofile&utm_medium=badge&utm_campaign=registry&utm_term=${newUsername}`;

      const guildLink = links.find((link) => link.getAttribute('href')?.includes('guild.xyz/base'));
      expect(guildLink).toHaveAttribute('href', `https://guild.xyz/base${expectedUtm}`);
    });
  });

  describe('links with target blank', () => {
    it('should open links in new tab (target=_blank)', () => {
      render(<UsernameProfileSectionExplore />);

      const links = screen.getAllByTestId('link');
      links.forEach((link) => {
        expect(link).toHaveAttribute('target', '_blank');
      });
    });
  });

  describe('Rounds Grant modal', () => {
    const findRoundsGrantLink = () => {
      const heading = screen.getByRole('heading', { name: /Get a Rounds Grant/i });
      return heading.closest('a') as HTMLAnchorElement;
    };

    it('should render Modal component', () => {
      render(<UsernameProfileSectionExplore />);

      // Modal should exist but initially closed (not rendered because isOpen=false)
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('should open modal when clicking Rounds Grant link', async () => {
      render(<UsernameProfileSectionExplore />);

      // Find the Rounds Grant link and click it
      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });
    });

    it('should prevent default navigation when clicking Rounds Grant link', async () => {
      render(<UsernameProfileSectionExplore />);

      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      // If modal opens, it means preventDefault was called and navigation was prevented
      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });

      // The link href should still be defined (not navigated away)
      expect(roundsGrantLink).toHaveAttribute('href');
    });

    it('should display modal content with rounds.wtf information', async () => {
      render(<UsernameProfileSectionExplore />);

      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(screen.getByTestId('modal-content')).toBeInTheDocument();
      });

      expect(screen.getByText(/rounds.wtf\/base-builds/)).toBeInTheDocument();
    });

    it('should display rounds eligibility information in modal', async () => {
      render(<UsernameProfileSectionExplore />);

      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(
          screen.getByText(/between every Friday and Monday to be eligible/),
        ).toBeInTheDocument();
      });
    });

    it('should display voting eligibility information in modal', async () => {
      render(<UsernameProfileSectionExplore />);

      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(screen.getByText(/Rewards are based on votes from eligible curators/)).toBeInTheDocument();
      });
    });

    it('should display Get a Rounds grant button in modal', async () => {
      render(<UsernameProfileSectionExplore />);

      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(screen.getByTestId('button')).toBeInTheDocument();
        expect(screen.getByText('Get a Rounds grant')).toBeInTheDocument();
      });
    });

    it('should include UTM parameters in modal link', async () => {
      render(<UsernameProfileSectionExplore />);

      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        const modalContent = screen.getByTestId('modal-content');
        const modalLinks = modalContent.querySelectorAll('a');

        modalLinks.forEach((link) => {
          if (link.getAttribute('href')?.includes('rounds.wtf')) {
            expect(link.getAttribute('href')).toContain(`utm_term=${mockProfileUsername}`);
          }
        });
      });
    });

    it('should close modal when close button is clicked', async () => {
      render(<UsernameProfileSectionExplore />);

      // Open modal
      const roundsGrantLink = findRoundsGrantLink();
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toBeInTheDocument();
      });

      // Close modal
      fireEvent.click(screen.getByTestId('modal-close'));

      await waitFor(() => {
        expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
      });
    });
  });

  describe('non-modal links behavior', () => {
    it('should not open modal for Onchain Registry link', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Add project to Onchain Registry/i });
      const registryLink = heading.closest('a') as HTMLAnchorElement;
      fireEvent.click(registryLink);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('should not open modal for Base Guild link', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Get roles on Base Guild/i });
      const guildLink = heading.closest('a') as HTMLAnchorElement;
      fireEvent.click(guildLink);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('should not open modal for Verification link', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Get a Verification/i });
      const verificationLink = heading.closest('a') as HTMLAnchorElement;
      fireEvent.click(verificationLink);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });

    it('should not open modal for Base Learn link', () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Go to Base Learn/i });
      const learnLink = heading.closest('a') as HTMLAnchorElement;
      fireEvent.click(learnLink);

      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    });
  });

  describe('images rendering', () => {
    it('should render images for each explore link', () => {
      render(<UsernameProfileSectionExplore />);

      expect(
        screen.getByTestId('image-add-project-to-onchain-registry'),
      ).toBeInTheDocument();
      expect(screen.getByTestId('image-get-roles-on-base-guild')).toBeInTheDocument();
      expect(screen.getByTestId('image-get-a-rounds-grant')).toBeInTheDocument();
      expect(screen.getByTestId('image-get-a-verification')).toBeInTheDocument();
      expect(screen.getByTestId('image-go-to-base-learn')).toBeInTheDocument();
    });
  });

  describe('Modal with empty title', () => {
    it('should pass empty string as title to modal', async () => {
      render(<UsernameProfileSectionExplore />);

      const heading = screen.getByRole('heading', { name: /Get a Rounds Grant/i });
      const roundsGrantLink = heading.closest('a') as HTMLAnchorElement;
      fireEvent.click(roundsGrantLink);

      await waitFor(() => {
        expect(screen.getByTestId('modal')).toHaveAttribute('data-title', '');
      });
    });
  });
});
