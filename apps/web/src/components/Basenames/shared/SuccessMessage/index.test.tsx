/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import SuccessMessage, { SuccessAction } from './index';
import { ButtonVariants } from 'apps/web/src/components/Button/Button';

// Mock the Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  ButtonVariants: {
    Primary: 'primary',
    Secondary: 'secondary',
    SecondaryDark: 'secondaryDark',
    SecondaryBounce: 'secondaryBounce',
    SecondaryDarkBounce: 'secondaryDarkBounce',
    Black: 'black',
    Gray: 'gray',
  },
  Button: ({
    children,
    onClick,
    variant,
    rounded,
    fullWidth,
  }: {
    children: React.ReactNode;
    onClick: () => void;
    variant: string;
    rounded: boolean;
    fullWidth: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      data-variant={variant}
      data-rounded={rounded}
      data-fullwidth={fullWidth}
    >
      {children}
    </button>
  ),
}));

// Mock classNames
jest.mock('classnames', () => (...args: (string | undefined | Record<string, boolean>)[]) =>
  args
    .filter(Boolean)
    .map((arg) => (typeof arg === 'string' ? arg : ''))
    .filter(Boolean)
    .join(' '),
);

describe('SuccessMessage', () => {
  const mockOnClick = jest.fn();
  const defaultActions: SuccessAction[] = [
    { label: 'Action 1', onClick: mockOnClick },
    { label: 'Action 2', onClick: mockOnClick, isPrimary: true },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the title correctly', () => {
      render(<SuccessMessage title="Test Title" actions={defaultActions} />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test Title');
    });

    it('should render the subtitle when provided', () => {
      render(<SuccessMessage title="Test Title" subtitle="Test Subtitle" actions={defaultActions} />);

      expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
    });

    it('should not render subtitle paragraph when subtitle is not provided', () => {
      const { container } = render(<SuccessMessage title="Test Title" actions={defaultActions} />);

      const paragraph = container.querySelector('p');
      expect(paragraph).not.toBeInTheDocument();
    });

    it('should render children when provided', () => {
      render(
        <SuccessMessage title="Test Title" actions={defaultActions}>
          <div data-testid="child-content">Child Content</div>
        </SuccessMessage>,
      );

      expect(screen.getByTestId('child-content')).toBeInTheDocument();
      expect(screen.getByText('Child Content')).toBeInTheDocument();
    });

    it('should apply custom className when provided', () => {
      const { container } = render(
        <SuccessMessage title="Test Title" actions={defaultActions} className="custom-class" />,
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper.className).toContain('custom-class');
    });
  });

  describe('actions', () => {
    it('should render all action buttons', () => {
      const actions: SuccessAction[] = [
        { label: 'First Action', onClick: mockOnClick },
        { label: 'Second Action', onClick: mockOnClick },
        { label: 'Third Action', onClick: mockOnClick },
      ];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      expect(screen.getByText('First Action')).toBeInTheDocument();
      expect(screen.getByText('Second Action')).toBeInTheDocument();
      expect(screen.getByText('Third Action')).toBeInTheDocument();
    });

    it('should call onClick when action button is clicked', () => {
      const mockClickHandler = jest.fn();
      const actions: SuccessAction[] = [{ label: 'Click Me', onClick: mockClickHandler }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      fireEvent.click(screen.getByText('Click Me'));

      expect(mockClickHandler).toHaveBeenCalledTimes(1);
    });

    it('should call correct onClick handler for each action', () => {
      const mockClickHandler1 = jest.fn();
      const mockClickHandler2 = jest.fn();
      const actions: SuccessAction[] = [
        { label: 'Action 1', onClick: mockClickHandler1 },
        { label: 'Action 2', onClick: mockClickHandler2 },
      ];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      fireEvent.click(screen.getByText('Action 1'));
      expect(mockClickHandler1).toHaveBeenCalledTimes(1);
      expect(mockClickHandler2).not.toHaveBeenCalled();

      fireEvent.click(screen.getByText('Action 2'));
      expect(mockClickHandler2).toHaveBeenCalledTimes(1);
    });

    it('should render an empty actions container when no actions provided', () => {
      const { container } = render(<SuccessMessage title="Test Title" actions={[]} />);

      const buttons = container.querySelectorAll('button');
      expect(buttons.length).toBe(0);
    });
  });

  describe('button variants', () => {
    it('should use Black variant when isPrimary is true and no variant specified', () => {
      const actions: SuccessAction[] = [{ label: 'Primary Action', onClick: mockOnClick, isPrimary: true }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Primary Action');
      expect(button).toHaveAttribute('data-variant', 'black');
    });

    it('should use Secondary variant when isPrimary is false and no variant specified', () => {
      const actions: SuccessAction[] = [{ label: 'Secondary Action', onClick: mockOnClick, isPrimary: false }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Secondary Action');
      expect(button).toHaveAttribute('data-variant', 'secondary');
    });

    it('should use Secondary variant by default when neither isPrimary nor variant is specified', () => {
      const actions: SuccessAction[] = [{ label: 'Default Action', onClick: mockOnClick }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Default Action');
      expect(button).toHaveAttribute('data-variant', 'secondary');
    });

    it('should use explicit variant when provided', () => {
      const actions: SuccessAction[] = [
        { label: 'Explicit Variant', onClick: mockOnClick, variant: ButtonVariants.Gray },
      ];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Explicit Variant');
      expect(button).toHaveAttribute('data-variant', 'gray');
    });

    it('should override isPrimary with explicit variant', () => {
      const actions: SuccessAction[] = [
        {
          label: 'Override Action',
          onClick: mockOnClick,
          isPrimary: true,
          variant: ButtonVariants.Secondary,
        },
      ];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Override Action');
      expect(button).toHaveAttribute('data-variant', 'secondary');
    });
  });

  describe('button properties', () => {
    it('should render buttons with rounded property', () => {
      const actions: SuccessAction[] = [{ label: 'Rounded Button', onClick: mockOnClick }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Rounded Button');
      expect(button).toHaveAttribute('data-rounded', 'true');
    });

    it('should render buttons with fullWidth property', () => {
      const actions: SuccessAction[] = [{ label: 'Full Width Button', onClick: mockOnClick }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Full Width Button');
      expect(button).toHaveAttribute('data-fullwidth', 'true');
    });
  });

  describe('complete component rendering', () => {
    it('should render all elements together correctly', () => {
      const actions: SuccessAction[] = [
        { label: 'View Profile', onClick: mockOnClick, isPrimary: true },
        { label: 'Extend Again', onClick: mockOnClick, variant: ButtonVariants.Secondary },
      ];

      render(
        <SuccessMessage
          title="Registration Complete!"
          subtitle="Your name has been registered successfully."
          actions={actions}
          className="test-class"
        >
          <span data-testid="bonus-content">Bonus content here</span>
        </SuccessMessage>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Registration Complete!');
      expect(screen.getByText('Your name has been registered successfully.')).toBeInTheDocument();
      expect(screen.getByText('View Profile')).toBeInTheDocument();
      expect(screen.getByText('Extend Again')).toBeInTheDocument();
      expect(screen.getByTestId('bonus-content')).toBeInTheDocument();
    });

    it('should maintain correct structure with title, children, and actions', () => {
      const { container } = render(
        <SuccessMessage title="Test" actions={[{ label: 'Action', onClick: mockOnClick }]}>
          <div data-testid="middle-child">Middle</div>
        </SuccessMessage>,
      );

      // The structure should be: wrapper > [text-container, children, actions-container]
      const wrapper = container.firstChild;
      expect(wrapper).toBeTruthy();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Test');
      expect(screen.getByTestId('middle-child')).toBeInTheDocument();
      expect(screen.getByText('Action')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle action with empty label', () => {
      const actions: SuccessAction[] = [{ label: '', onClick: mockOnClick }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const buttons = screen.getAllByRole('button');
      expect(buttons.length).toBe(1);
    });

    it('should handle multiple clicks on same action', () => {
      const mockClickHandler = jest.fn();
      const actions: SuccessAction[] = [{ label: 'Click Me', onClick: mockClickHandler }];

      render(<SuccessMessage title="Test Title" actions={actions} />);

      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(mockClickHandler).toHaveBeenCalledTimes(3);
    });

    it('should handle very long title text', () => {
      const longTitle = 'A'.repeat(200);

      render(<SuccessMessage title={longTitle} actions={[]} />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(longTitle);
    });

    it('should handle very long subtitle text', () => {
      const longSubtitle = 'B'.repeat(500);

      render(<SuccessMessage title="Test" subtitle={longSubtitle} actions={[]} />);

      expect(screen.getByText(longSubtitle)).toBeInTheDocument();
    });
  });
});
