/**
 * @jest-environment jsdom
 */
 
 
 
 

import { render, screen, fireEvent } from '@testing-library/react';
import UsernameLocationField from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock the username constants
jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Location: 'location',
  },
  textRecordsKeysPlaceholderForDisplay: {
    location: 'New York, NY, USA',
  },
  USERNAME_LOCATION_MAX_LENGTH: 100,
}));

// Mock Label component
jest.mock('apps/web/src/components/Label', () => {
  return function MockLabel({
    children,
    htmlFor,
  }: {
    children: React.ReactNode;
    htmlFor: string;
  }) {
    return (
      <label data-testid="label" htmlFor={htmlFor}>
        {children}
      </label>
    );
  };
});

// Mock Fieldset component
jest.mock('apps/web/src/components/Fieldset', () => {
  return function MockFieldset({ children }: { children: React.ReactNode }) {
    return <fieldset data-testid="fieldset">{children}</fieldset>;
  };
});

// Mock Input component
jest.mock('apps/web/src/components/Input', () => {
  return function MockInput({
    id,
    placeholder,
    maxLength,
    onChange,
    disabled,
    value,
  }: {
    id: string;
    placeholder: string;
    maxLength: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    value: string;
    className?: string;
  }) {
    return (
      <input
        data-testid="input"
        id={id}
        placeholder={placeholder}
        maxLength={maxLength}
        onChange={onChange}
        disabled={disabled}
        value={value}
      />
    );
  };
});

describe('UsernameLocationField', () => {
  const defaultProps = {
    onChange: jest.fn(),
    value: '',
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('should render the fieldset container', () => {
      render(<UsernameLocationField {...defaultProps} />);

      expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    });

    it('should render the default "Location" label', () => {
      render(<UsernameLocationField {...defaultProps} />);

      const label = screen.getByTestId('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Location');
    });

    it('should render the input with correct placeholder', () => {
      render(<UsernameLocationField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'New York, NY, USA');
    });

    it('should render the input with maxLength attribute', () => {
      render(<UsernameLocationField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('maxLength', '100');
    });

    it('should render the input with empty value initially', () => {
      render(<UsernameLocationField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toHaveValue('');
    });
  });

  describe('labelChildren prop', () => {
    it('should render custom label when labelChildren is provided', () => {
      render(<UsernameLocationField {...defaultProps} labelChildren="City" />);

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('City');
    });

    it('should not render label when labelChildren is null', () => {
      render(<UsernameLocationField {...defaultProps} labelChildren={null} />);

      expect(screen.queryByTestId('label')).not.toBeInTheDocument();
    });

    it('should not render label when labelChildren is empty string', () => {
      render(<UsernameLocationField {...defaultProps} labelChildren="" />);

      expect(screen.queryByTestId('label')).not.toBeInTheDocument();
    });

    it('should render default label when labelChildren is undefined', () => {
      render(<UsernameLocationField {...defaultProps} labelChildren={undefined} />);

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Location');
    });

    it('should render JSX element as label', () => {
      render(
        <UsernameLocationField
          {...defaultProps}
          labelChildren={<span data-testid="custom-label">Custom Label</span>}
        />,
      );

      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
      expect(screen.getByTestId('custom-label')).toHaveTextContent('Custom Label');
    });
  });

  describe('onChange behavior', () => {
    it('should call onChange with location key and value when text is entered', () => {
      const mockOnChange = jest.fn();
      render(<UsernameLocationField {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'San Francisco, CA' } });

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Location, 'San Francisco, CA');
    });

    it('should call onChange with the full text for valid input', () => {
      const mockOnChange = jest.fn();
      render(<UsernameLocationField {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, {
        target: { value: 'New York City, New York, United States' },
      });

      expect(mockOnChange).toHaveBeenCalledWith(
        UsernameTextRecordKeys.Location,
        'New York City, New York, United States',
      );
    });

    it('should not call onChange when text exceeds max length', () => {
      const mockOnChange = jest.fn();
      render(<UsernameLocationField {...defaultProps} onChange={mockOnChange} />);

      // Create a string that is exactly at max length (100 characters)
      const maxLengthString = 'a'.repeat(100);
      // And one that exceeds it (101 characters)
      const overMaxLengthString = 'a'.repeat(101);

      const input = screen.getByTestId('input');

      // Valid input at max length should work
      fireEvent.change(input, { target: { value: maxLengthString } });
      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Location, maxLengthString);

      mockOnChange.mockClear();

      // Input exceeding max length should not trigger onChange
      fireEvent.change(input, { target: { value: overMaxLengthString } });
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should call onChange with empty string when cleared', () => {
      const mockOnChange = jest.fn();
      render(
        <UsernameLocationField {...defaultProps} onChange={mockOnChange} value="Some location" />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: '' } });

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Location, '');
    });
  });

  describe('disabled state', () => {
    it('should disable input when disabled prop is true', () => {
      render(<UsernameLocationField {...defaultProps} disabled />);

      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });

    it('should not disable input when disabled prop is false', () => {
      render(<UsernameLocationField {...defaultProps} disabled={false} />);

      const input = screen.getByTestId('input');
      expect(input).not.toBeDisabled();
    });

    it('should not disable input by default', () => {
      render(<UsernameLocationField onChange={jest.fn()} value="" />);

      const input = screen.getByTestId('input');
      expect(input).not.toBeDisabled();
    });
  });

  describe('value prop', () => {
    it('should display the value in the input', () => {
      render(<UsernameLocationField {...defaultProps} value="Tokyo, Japan" />);

      const input = screen.getByTestId('input');
      expect(input).toHaveValue('Tokyo, Japan');
    });

    it('should update displayed value when prop changes', () => {
      const { rerender } = render(
        <UsernameLocationField {...defaultProps} value="Initial location" />,
      );

      expect(screen.getByTestId('input')).toHaveValue('Initial location');

      rerender(<UsernameLocationField {...defaultProps} value="Updated location" />);

      expect(screen.getByTestId('input')).toHaveValue('Updated location');
    });
  });

  describe('accessibility', () => {
    it('should associate label with input via htmlFor/id', () => {
      render(<UsernameLocationField {...defaultProps} />);

      const label = screen.getByTestId('label');
      const input = screen.getByTestId('input');

      const htmlFor = label.getAttribute('for');
      const inputId = input.getAttribute('id');

      expect(htmlFor).toBeTruthy();
      expect(inputId).toBeTruthy();
      expect(htmlFor).toBe(inputId);
    });
  });
});
