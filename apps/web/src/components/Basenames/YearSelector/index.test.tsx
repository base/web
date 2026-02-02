/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import YearSelector from './index';

describe('YearSelector', () => {
  const defaultProps = {
    years: 1,
    onIncrement: jest.fn(),
    onDecrement: jest.fn(),
    label: 'Registration Period',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render the label', () => {
      render(<YearSelector {...defaultProps} />);

      expect(screen.getByText('Registration Period')).toBeInTheDocument();
    });

    it('should render the years display with singular form for 1 year', () => {
      render(<YearSelector {...defaultProps} years={1} />);

      expect(screen.getByText('1 year')).toBeInTheDocument();
    });

    it('should render the years display with plural form for multiple years', () => {
      render(<YearSelector {...defaultProps} years={2} />);

      expect(screen.getByText('2 years')).toBeInTheDocument();
    });

    it('should render the years display with plural form for 5 years', () => {
      render(<YearSelector {...defaultProps} years={5} />);

      expect(screen.getByText('5 years')).toBeInTheDocument();
    });

    it('should render increment button with aria-label', () => {
      render(<YearSelector {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Increment years' })).toBeInTheDocument();
    });

    it('should render decrement button with aria-label', () => {
      render(<YearSelector {...defaultProps} />);

      expect(screen.getByRole('button', { name: 'Decrement years' })).toBeInTheDocument();
    });
  });

  describe('decrement button', () => {
    it('should be disabled when years is 1', () => {
      render(<YearSelector {...defaultProps} years={1} />);

      const decrementButton = screen.getByRole('button', { name: 'Decrement years' });
      expect(decrementButton).toBeDisabled();
    });

    it('should be enabled when years is greater than 1', () => {
      render(<YearSelector {...defaultProps} years={2} />);

      const decrementButton = screen.getByRole('button', { name: 'Decrement years' });
      expect(decrementButton).not.toBeDisabled();
    });

    it('should call onDecrement when clicked', () => {
      const onDecrement = jest.fn();
      render(<YearSelector {...defaultProps} years={2} onDecrement={onDecrement} />);

      const decrementButton = screen.getByRole('button', { name: 'Decrement years' });
      fireEvent.click(decrementButton);

      expect(onDecrement).toHaveBeenCalledTimes(1);
    });

    it('should not call onDecrement when clicked while disabled', () => {
      const onDecrement = jest.fn();
      render(<YearSelector {...defaultProps} years={1} onDecrement={onDecrement} />);

      const decrementButton = screen.getByRole('button', { name: 'Decrement years' });
      fireEvent.click(decrementButton);

      expect(onDecrement).not.toHaveBeenCalled();
    });
  });

  describe('increment button', () => {
    it('should always be enabled', () => {
      render(<YearSelector {...defaultProps} years={1} />);

      const incrementButton = screen.getByRole('button', { name: 'Increment years' });
      expect(incrementButton).not.toBeDisabled();
    });

    it('should call onIncrement when clicked', () => {
      const onIncrement = jest.fn();
      render(<YearSelector {...defaultProps} onIncrement={onIncrement} />);

      const incrementButton = screen.getByRole('button', { name: 'Increment years' });
      fireEvent.click(incrementButton);

      expect(onIncrement).toHaveBeenCalledTimes(1);
    });

    it('should call onIncrement multiple times when clicked multiple times', () => {
      const onIncrement = jest.fn();
      render(<YearSelector {...defaultProps} onIncrement={onIncrement} />);

      const incrementButton = screen.getByRole('button', { name: 'Increment years' });
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);

      expect(onIncrement).toHaveBeenCalledTimes(3);
    });
  });

  describe('styling', () => {
    it('should have self-start class on container', () => {
      const { container } = render(<YearSelector {...defaultProps} />);

      const rootDiv = container.firstChild;
      expect(rootDiv).toHaveClass('self-start');
    });

    it('should have max-width class on container', () => {
      const { container } = render(<YearSelector {...defaultProps} />);

      const rootDiv = container.firstChild;
      expect(rootDiv).toHaveClass('max-w-[14rem]');
    });

    it('should have uppercase label styling', () => {
      render(<YearSelector {...defaultProps} />);

      const label = screen.getByText('Registration Period');
      expect(label).toHaveClass('uppercase');
    });

    it('should have bold font on label', () => {
      render(<YearSelector {...defaultProps} />);

      const label = screen.getByText('Registration Period');
      expect(label).toHaveClass('font-bold');
    });

    it('should have rounded-full class on buttons', () => {
      render(<YearSelector {...defaultProps} />);

      const buttons = screen.getAllByRole('button');
      buttons.forEach((button) => {
        expect(button).toHaveClass('rounded-full');
      });
    });
  });

  describe('different label values', () => {
    it('should render custom label correctly', () => {
      render(<YearSelector {...defaultProps} label="Renewal Period" />);

      expect(screen.getByText('Renewal Period')).toBeInTheDocument();
    });

    it('should render empty label', () => {
      render(<YearSelector {...defaultProps} label="" />);

      const labelElement = document.querySelector('p.text-sm.font-bold');
      expect(labelElement).toBeInTheDocument();
      expect(labelElement?.textContent).toBe('');
    });
  });
});
