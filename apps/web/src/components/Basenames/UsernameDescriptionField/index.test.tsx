/**
 * @jest-environment jsdom
 */
 
 
 
 

import { render, screen, fireEvent } from '@testing-library/react';
import UsernameDescriptionField from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock the username constants
jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Description: 'description',
    Avatar: 'avatar',
    Keywords: 'keywords',
  },
  textRecordsKeysPlaceholderForDisplay: {
    description: 'Tell us about yourself',
  },
  USERNAME_DESCRIPTION_MAX_LENGTH: 200,
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

// Mock TextArea component
jest.mock('apps/web/src/components/TextArea', () => {
  return function MockTextArea({
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
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    disabled: boolean;
    value: string;
  }) {
    return (
      <textarea
        data-testid="textarea"
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

// Mock Hint component
jest.mock('apps/web/src/components/Hint', () => {
  return function MockHint({ children }: { children: React.ReactNode }) {
    return <div data-testid="hint">{children}</div>;
  };
});

describe('UsernameDescriptionField', () => {
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
      render(<UsernameDescriptionField {...defaultProps} />);

      expect(screen.getByTestId('fieldset')).toBeInTheDocument();
    });

    it('should render the default "Description" label', () => {
      render(<UsernameDescriptionField {...defaultProps} />);

      const label = screen.getByTestId('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Description');
    });

    it('should render the textarea with correct placeholder', () => {
      render(<UsernameDescriptionField {...defaultProps} />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeInTheDocument();
      expect(textarea).toHaveAttribute('placeholder', 'Tell us about yourself');
    });

    it('should render the textarea with maxLength attribute', () => {
      render(<UsernameDescriptionField {...defaultProps} />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveAttribute('maxLength', '200');
    });

    it('should render the hint with characters remaining count', () => {
      render(<UsernameDescriptionField {...defaultProps} />);

      const hint = screen.getByTestId('hint');
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent('200 characters remaining');
    });

    it('should render the textarea with empty value initially', () => {
      render(<UsernameDescriptionField {...defaultProps} />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveValue('');
    });
  });

  describe('labelChildren prop', () => {
    it('should render custom label when labelChildren is provided', () => {
      render(<UsernameDescriptionField {...defaultProps} labelChildren="Bio" />);

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Bio');
    });

    it('should not render label when labelChildren is null', () => {
      render(<UsernameDescriptionField {...defaultProps} labelChildren={null} />);

      expect(screen.queryByTestId('label')).not.toBeInTheDocument();
    });

    it('should not render label when labelChildren is undefined', () => {
      render(<UsernameDescriptionField {...defaultProps} labelChildren={undefined} />);

      // Default is 'Description', so undefined means the default label should show
      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Description');
    });

    it('should render JSX element as label', () => {
      render(
        <UsernameDescriptionField
          {...defaultProps}
          labelChildren={<span data-testid="custom-label">Custom Label</span>}
        />,
      );

      expect(screen.getByTestId('custom-label')).toBeInTheDocument();
      expect(screen.getByTestId('custom-label')).toHaveTextContent('Custom Label');
    });
  });

  describe('onChange behavior', () => {
    it('should call onChange with description key and value when text is entered', () => {
      const mockOnChange = jest.fn();
      render(<UsernameDescriptionField {...defaultProps} onChange={mockOnChange} />);

      const textarea = screen.getByTestId('textarea');
      fireEvent.change(textarea, { target: { value: 'Hello world' } });

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Description, 'Hello world');
    });

    it('should call onChange with the full text for valid input', () => {
      const mockOnChange = jest.fn();
      render(<UsernameDescriptionField {...defaultProps} onChange={mockOnChange} />);

      const textarea = screen.getByTestId('textarea');
      fireEvent.change(textarea, {
        target: { value: 'This is a test description for my profile.' },
      });

      expect(mockOnChange).toHaveBeenCalledWith(
        UsernameTextRecordKeys.Description,
        'This is a test description for my profile.',
      );
    });

    it('should not call onChange when text exceeds max length', () => {
      const mockOnChange = jest.fn();
      render(<UsernameDescriptionField {...defaultProps} onChange={mockOnChange} />);

      // Create a string that is exactly at max length (200 characters)
      const maxLengthString = 'a'.repeat(200);
      // And one that exceeds it (201 characters)
      const overMaxLengthString = 'a'.repeat(201);

      const textarea = screen.getByTestId('textarea');

      // Valid input at max length should work
      fireEvent.change(textarea, { target: { value: maxLengthString } });
      expect(mockOnChange).toHaveBeenCalledWith(
        UsernameTextRecordKeys.Description,
        maxLengthString,
      );

      mockOnChange.mockClear();

      // Input exceeding max length should not trigger onChange
      fireEvent.change(textarea, { target: { value: overMaxLengthString } });
      expect(mockOnChange).not.toHaveBeenCalled();
    });

    it('should call onChange with empty string when cleared', () => {
      const mockOnChange = jest.fn();
      render(
        <UsernameDescriptionField {...defaultProps} onChange={mockOnChange} value="Some text" />,
      );

      const textarea = screen.getByTestId('textarea');
      fireEvent.change(textarea, { target: { value: '' } });

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Description, '');
    });
  });

  describe('characters remaining display', () => {
    it('should show correct characters remaining for empty value', () => {
      render(<UsernameDescriptionField {...defaultProps} value="" />);

      const hint = screen.getByTestId('hint');
      expect(hint).toHaveTextContent('200 characters remaining');
    });

    it('should show correct characters remaining when value has content', () => {
      render(<UsernameDescriptionField {...defaultProps} value="Hello" />);

      const hint = screen.getByTestId('hint');
      expect(hint).toHaveTextContent('195 characters remaining');
    });

    it('should show singular "character" when exactly 1 character remains', () => {
      // 199 characters used = 1 remaining
      const value = 'a'.repeat(199);
      render(<UsernameDescriptionField {...defaultProps} value={value} />);

      const hint = screen.getByTestId('hint');
      expect(hint).toHaveTextContent('1 character remaining');
    });

    it('should show plural "characters" when 0 characters remain', () => {
      const value = 'a'.repeat(200);
      render(<UsernameDescriptionField {...defaultProps} value={value} />);

      const hint = screen.getByTestId('hint');
      expect(hint).toHaveTextContent('0 characters remaining');
    });

    it('should show plural "characters" when more than 1 character remains', () => {
      const value = 'a'.repeat(198);
      render(<UsernameDescriptionField {...defaultProps} value={value} />);

      const hint = screen.getByTestId('hint');
      expect(hint).toHaveTextContent('2 characters remaining');
    });
  });

  describe('disabled state', () => {
    it('should disable textarea when disabled prop is true', () => {
      render(<UsernameDescriptionField {...defaultProps} disabled />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toBeDisabled();
    });

    it('should not disable textarea when disabled prop is false', () => {
      render(<UsernameDescriptionField {...defaultProps} disabled={false} />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).not.toBeDisabled();
    });

    it('should not disable textarea by default', () => {
      render(<UsernameDescriptionField onChange={jest.fn()} value="" />);

      const textarea = screen.getByTestId('textarea');
      expect(textarea).not.toBeDisabled();
    });
  });

  describe('value prop', () => {
    it('should display the value in the textarea', () => {
      render(
        <UsernameDescriptionField {...defaultProps} value="This is my description" />,
      );

      const textarea = screen.getByTestId('textarea');
      expect(textarea).toHaveValue('This is my description');
    });

    it('should update displayed value when prop changes', () => {
      const { rerender } = render(
        <UsernameDescriptionField {...defaultProps} value="Initial value" />,
      );

      expect(screen.getByTestId('textarea')).toHaveValue('Initial value');

      rerender(<UsernameDescriptionField {...defaultProps} value="Updated value" />);

      expect(screen.getByTestId('textarea')).toHaveValue('Updated value');
    });
  });

  describe('accessibility', () => {
    it('should associate label with textarea via htmlFor/id', () => {
      render(<UsernameDescriptionField {...defaultProps} />);

      const label = screen.getByTestId('label');
      const textarea = screen.getByTestId('textarea');

      const htmlFor = label.getAttribute('for');
      const textareaId = textarea.getAttribute('id');

      expect(htmlFor).toBeTruthy();
      expect(textareaId).toBeTruthy();
      expect(htmlFor).toBe(textareaId);
    });
  });
});
