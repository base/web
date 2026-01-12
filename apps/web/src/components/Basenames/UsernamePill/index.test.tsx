/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { type Basename } from '@coinbase/onchainkit/identity';
import { UsernamePill } from './index';
import { UsernamePillVariants } from './types';

// Mock BasenameAvatar component
jest.mock('apps/web/src/components/Basenames/BasenameAvatar', () => ({
  __esModule: true,
  default: ({
    basename,
    wrapperClassName,
    width,
    height,
  }: {
    basename: string;
    wrapperClassName: string;
    width: number;
    height: number;
  }) => (
    <div
      data-testid="basename-avatar"
      data-basename={basename}
      data-wrapper-class={wrapperClassName}
      data-width={width}
      data-height={height}
    />
  ),
}));

// Mock Dropdown components
jest.mock('apps/web/src/components/Dropdown', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown">{children}</div>
  ),
}));

jest.mock('apps/web/src/components/DropdownToggle', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-toggle">{children}</div>
  ),
}));

jest.mock('apps/web/src/components/DropdownMenu', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dropdown-menu">{children}</div>
  ),
}));

jest.mock('apps/web/src/components/DropdownItem', () => ({
  __esModule: true,
  default: ({ children, copyValue }: { children: React.ReactNode; copyValue: string }) => (
    <div data-testid="dropdown-item" data-copy-value={copyValue}>
      {children}
    </div>
  ),
}));

// Mock Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({ name, color, width, height }: { name: string; color: string; width: string; height: string }) => (
    <span
      data-testid={`icon-${name}`}
      data-color={color}
      data-width={width}
      data-height={height}
    />
  ),
}));

describe('UsernamePill', () => {
  const mockUsername = 'testuser.base.eth' as Basename;
  const mockAddress = '0x1234567890abcdef1234567890abcdef12345678' as `0x${string}`;

  describe('rendering with Inline variant', () => {
    it('should render the username correctly', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      expect(screen.getByText(mockUsername)).toBeInTheDocument();
    });

    it('should render BasenameAvatar with correct props', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      const avatar = screen.getByTestId('basename-avatar');
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute('data-basename', mockUsername);
      expect(avatar).toHaveAttribute('data-width', '64');
      expect(avatar).toHaveAttribute('data-height', '64');
    });

    it('should apply correct pill classes for Inline variant', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      const pillElement = container.firstChild as HTMLElement;
      expect(pillElement).toHaveClass('rounded-[5rem]');
      expect(pillElement).toHaveClass('w-fit');
    });

    it('should not render dropdown when address is not provided', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      expect(screen.queryByTestId('dropdown')).not.toBeInTheDocument();
    });
  });

  describe('rendering with Card variant', () => {
    it('should render the username correctly', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Card}
          username={mockUsername}
        />
      );

      expect(screen.getByText(mockUsername)).toBeInTheDocument();
    });

    it('should apply correct pill classes for Card variant', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Card}
          username={mockUsername}
        />
      );

      const pillElement = container.firstChild as HTMLElement;
      expect(pillElement).toHaveClass('rounded-[2rem]');
      expect(pillElement).toHaveClass('w-full');
      expect(pillElement).toHaveClass('pt-40');
    });
  });

  describe('address dropdown functionality', () => {
    it('should render dropdown when address is provided', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
          address={mockAddress}
        />
      );

      expect(screen.getByTestId('dropdown')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    });

    it('should render dropdown items with correct copy values', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
          address={mockAddress}
        />
      );

      const dropdownItems = screen.getAllByTestId('dropdown-item');
      expect(dropdownItems).toHaveLength(2);
      expect(dropdownItems[0]).toHaveAttribute('data-copy-value', mockUsername);
      expect(dropdownItems[1]).toHaveAttribute('data-copy-value', mockAddress);
    });

    it('should render caret icon in dropdown toggle', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
          address={mockAddress}
        />
      );

      expect(screen.getByTestId('icon-caret')).toBeInTheDocument();
    });
  });

  describe('isRegistering state', () => {
    it('should render animation overlay when isRegistering is true', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
          isRegistering
        />
      );

      const animationOverlay = container.querySelector('.animate-longslide');
      expect(animationOverlay).toBeInTheDocument();
    });

    it('should not render animation overlay when isRegistering is false', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
          isRegistering={false}
        />
      );

      const animationOverlay = container.querySelector('.animate-longslide');
      expect(animationOverlay).not.toBeInTheDocument();
    });

    it('should not render animation overlay when isRegistering is undefined', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      const animationOverlay = container.querySelector('.animate-longslide');
      expect(animationOverlay).not.toBeInTheDocument();
    });
  });

  describe('username length styling', () => {
    it('should apply largest font size for short usernames (<=15 chars)', () => {
      const shortUsername = 'short.base.eth' as Basename;
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={shortUsername}
        />
      );

      const usernameSpan = container.querySelector('span');
      expect(usernameSpan).toHaveClass('text-[clamp(2rem,5vw,3rem)]');
    });

    it('should apply medium font size for medium usernames (16-20 chars)', () => {
      const mediumUsername = 'mediumusername.base.eth' as Basename; // 23 chars
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mediumUsername}
        />
      );

      const usernameSpan = screen.getByText(mediumUsername);
      expect(usernameSpan).toHaveClass('text-[clamp(1rem,5vw,3rem)]');
    });

    it('should apply smaller font size for long usernames (21-25 chars)', () => {
      const longUsername = 'longerusernametest.base.eth' as Basename; // 27 chars
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={longUsername}
        />
      );

      const usernameSpan = screen.getByText(longUsername);
      expect(usernameSpan).toHaveClass('text-[clamp(0.8rem,5vw,3rem)]');
    });

    it('should apply smallest font size for very long usernames (>25 chars)', () => {
      const veryLongUsername = 'verylongusernamefortesting.base.eth' as Basename;
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={veryLongUsername}
        />
      );

      const usernameSpan = screen.getByText(veryLongUsername);
      expect(usernameSpan).toHaveClass('text-[clamp(0.8rem,5vw,3rem)]');
    });

    it('should not apply dynamic font sizing for Card variant', () => {
      const shortUsername = 'short.base.eth' as Basename;
      render(
        <UsernamePill
          variant={UsernamePillVariants.Card}
          username={shortUsername}
        />
      );

      const usernameSpan = screen.getByText(shortUsername);
      expect(usernameSpan).toHaveClass('text-3xl');
      expect(usernameSpan).not.toHaveClass('text-[clamp(2rem,5vw,3rem)]');
    });
  });

  describe('avatar positioning', () => {
    it('should apply correct avatar positioning for Inline variant', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      const avatar = screen.getByTestId('basename-avatar');
      const wrapperClass = avatar.getAttribute('data-wrapper-class');
      expect(wrapperClass).toContain('h-[2.5rem]');
      expect(wrapperClass).toContain('w-[2.5rem]');
      expect(wrapperClass).toContain('top-3');
      expect(wrapperClass).toContain('left-4');
    });

    it('should apply correct avatar positioning for Card variant', () => {
      render(
        <UsernamePill
          variant={UsernamePillVariants.Card}
          username={mockUsername}
        />
      );

      const avatar = screen.getByTestId('basename-avatar');
      const wrapperClass = avatar.getAttribute('data-wrapper-class');
      expect(wrapperClass).toContain('h-[3rem]');
      expect(wrapperClass).toContain('w-[3rem]');
      expect(wrapperClass).toContain('top-10');
      expect(wrapperClass).toContain('left-10');
    });
  });

  describe('common styling', () => {
    it('should apply transition classes', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      const pillElement = container.firstChild as HTMLElement;
      expect(pillElement).toHaveClass('transition-all');
      expect(pillElement).toHaveClass('duration-700');
      expect(pillElement).toHaveClass('ease-in-out');
    });

    it('should apply base pill styling', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
        />
      );

      const pillElement = container.firstChild as HTMLElement;
      expect(pillElement).toHaveClass('bg-blue-500');
      expect(pillElement).toHaveClass('text-white');
      expect(pillElement).toHaveClass('overflow-hidden');
    });
  });

  describe('different basename formats', () => {
    it('should handle mainnet basenames (.base.eth)', () => {
      const mainnetBasename = 'mainnetuser.base.eth' as Basename;

      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mainnetBasename}
        />
      );

      expect(screen.getByText(mainnetBasename)).toBeInTheDocument();
      const avatar = screen.getByTestId('basename-avatar');
      expect(avatar).toHaveAttribute('data-basename', mainnetBasename);
    });

    it('should handle testnet basenames (.basetest.eth)', () => {
      const testnetBasename = 'testnetuser.basetest.eth' as Basename;

      render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={testnetBasename}
        />
      );

      expect(screen.getByText(testnetBasename)).toBeInTheDocument();
      const avatar = screen.getByTestId('basename-avatar');
      expect(avatar).toHaveAttribute('data-basename', testnetBasename);
    });
  });

  describe('combination of props', () => {
    it('should render correctly with all props', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Inline}
          username={mockUsername}
          address={mockAddress}
          isRegistering
        />
      );

      // Username appears twice: once in the pill and once in the dropdown item
      expect(screen.getAllByText(mockUsername)).toHaveLength(2);
      expect(screen.getByTestId('basename-avatar')).toBeInTheDocument();
      expect(screen.getByTestId('dropdown')).toBeInTheDocument();
      expect(container.querySelector('.animate-longslide')).toBeInTheDocument();
    });

    it('should render Card variant with address and isRegistering', () => {
      const { container } = render(
        <UsernamePill
          variant={UsernamePillVariants.Card}
          username={mockUsername}
          address={mockAddress}
          isRegistering
        />
      );

      const pillElement = container.firstChild as HTMLElement;
      expect(pillElement).toHaveClass('rounded-[2rem]');
      expect(screen.getByTestId('dropdown')).toBeInTheDocument();
      expect(container.querySelector('.animate-longslide')).toBeInTheDocument();
    });
  });
});
