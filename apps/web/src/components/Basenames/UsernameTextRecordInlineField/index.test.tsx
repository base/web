/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/function-component-definition */

import { render, screen, fireEvent } from '@testing-library/react';
import UsernameTextRecordInlineField, {
  validateTextRecordValue,
  textRecordHintForDisplay,
} from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock the username constants
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
  textRecordsKeysForDisplay: {
    url: 'Website',
    url2: 'Website',
    url3: 'Website',
    'com.github': 'Github',
    'com.twitter': 'Twitter / X',
    'xyz.farcaster': 'Farcaster',
    'xyz.lens': 'Lens',
    'org.telegram': 'Telegram',
    'com.discord': 'Discord',
    email: 'Email',
    description: 'Bio',
  },
  textRecordsKeysPlaceholderForDisplay: {
    url: 'www.name.com',
    url2: 'www.thingyoubuilt.com',
    url3: 'www.workyoureproudof.com',
    'com.github': 'Username',
    'com.twitter': 'Username',
    'xyz.farcaster': 'Username',
    'xyz.lens': 'name.lens',
    'org.telegram': 'Username',
    'com.discord': 'Username',
    email: 'Personal email',
    description: 'Tell us about yourself',
  },
}));

// Mock Fieldset component
jest.mock('apps/web/src/components/Fieldset', () => {
  return function MockFieldset({
    children,
    inline,
  }: {
    children: React.ReactNode;
    inline?: boolean;
  }) {
    return (
      <fieldset data-testid="fieldset" data-inline={inline}>
        {children}
      </fieldset>
    );
  };
});

// Mock Label component
jest.mock('apps/web/src/components/Label', () => {
  return function MockLabel({
    children,
    htmlFor,
    className,
  }: {
    children: React.ReactNode;
    htmlFor: string;
    className?: string;
  }) {
    return (
      <label data-testid="label" htmlFor={htmlFor} className={className}>
        {children}
      </label>
    );
  };
});

// Mock Input component
jest.mock('apps/web/src/components/Input', () => {
  return function MockInput({
    id,
    placeholder,
    className,
    disabled,
    value,
    autoComplete,
    autoCapitalize,
    type,
    onChange,
  }: {
    id: string;
    placeholder: string;
    className?: string;
    disabled: boolean;
    value: string;
    autoComplete?: string;
    autoCapitalize?: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  }) {
    return (
      <input
        data-testid="input"
        id={id}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        value={value}
        autoComplete={autoComplete}
        autoCapitalize={autoCapitalize}
        type={type}
        onChange={onChange}
      />
    );
  };
});

// Mock Hint component
jest.mock('apps/web/src/components/Hint', () => {
  const MockHint = ({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant?: string;
  }) => (
    <div data-testid="hint" data-variant={variant}>
      {children}
    </div>
  );
  return {
    __esModule: true,
    default: MockHint,
    HintVariants: {
      Error: 'error',
      Warning: 'warning',
      Success: 'success',
    },
  };
});

describe('UsernameTextRecordInlineField', () => {
  const defaultProps = {
    textRecordKey: UsernameTextRecordKeys.Github,
    onChange: jest.fn(),
    value: '',
    disabled: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('should render the fieldset container with inline prop', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const fieldset = screen.getByTestId('fieldset');
      expect(fieldset).toBeInTheDocument();
      expect(fieldset).toHaveAttribute('data-inline', 'true');
    });

    it('should render the label with correct display text for Github', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const label = screen.getByTestId('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Github');
    });

    it('should render the label with correct display text for Twitter', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Twitter}
        />,
      );

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Twitter / X');
    });

    it('should render the label with correct display text for URL', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Website');
    });

    it('should render input with correct placeholder', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('placeholder', 'Username');
    });

    it('should render input with correct placeholder for URL', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('placeholder', 'www.name.com');
    });

    it('should not show validation hint initially', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });
  });

  describe('input type', () => {
    it('should render input with type "text" for social fields', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('should render input with type "url" for Url field', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'url');
    });

    it('should render input with type "url" for Url2 field', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url2}
        />,
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'url');
    });

    it('should render input with type "url" for Url3 field', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url3}
        />,
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'url');
    });

    it('should render input with type "text" for Twitter field', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Twitter}
        />,
      );

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('type', 'text');
    });
  });

  describe('disabled state', () => {
    it('should disable input when disabled prop is true', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} disabled />);

      const input = screen.getByTestId('input');
      expect(input).toBeDisabled();
    });

    it('should not disable input when disabled prop is false', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} disabled={false} />);

      const input = screen.getByTestId('input');
      expect(input).not.toBeDisabled();
    });

    it('should not disable input by default', () => {
      render(
        <UsernameTextRecordInlineField
          textRecordKey={UsernameTextRecordKeys.Github}
          onChange={jest.fn()}
          value=""
        />,
      );

      const input = screen.getByTestId('input');
      expect(input).not.toBeDisabled();
    });
  });

  describe('value prop', () => {
    it('should display the value in the input', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} value="myusername" />);

      const input = screen.getByTestId('input');
      expect(input).toHaveValue('myusername');
    });

    it('should update displayed value when prop changes', () => {
      const { rerender } = render(
        <UsernameTextRecordInlineField {...defaultProps} value="initial" />,
      );

      expect(screen.getByTestId('input')).toHaveValue('initial');

      rerender(<UsernameTextRecordInlineField {...defaultProps} value="updated" />);

      expect(screen.getByTestId('input')).toHaveValue('updated');
    });
  });

  describe('onChange behavior', () => {
    it('should call onChange with key and value when text is entered', () => {
      const mockOnChange = jest.fn();
      render(<UsernameTextRecordInlineField {...defaultProps} onChange={mockOnChange} />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'myhandle' } });

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Github, 'myhandle');
    });

    it('should call onChange with empty string when cleared', () => {
      const mockOnChange = jest.fn();
      render(
        <UsernameTextRecordInlineField {...defaultProps} onChange={mockOnChange} value="test" />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: '' } });

      expect(mockOnChange).toHaveBeenCalledWith(UsernameTextRecordKeys.Github, '');
    });

    it('should call onChange with URL key when URL field is used', () => {
      const mockOnChange = jest.fn();
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          onChange={mockOnChange}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'https://example.com' } });

      expect(mockOnChange).toHaveBeenCalledWith(
        UsernameTextRecordKeys.Url,
        'https://example.com',
      );
    });
  });

  describe('validation - social fields', () => {
    it('should show error hint when @ is entered for Github', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: '@myhandle' } });

      const hint = screen.getByTestId('hint');
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent('Input username only');
    });

    it('should show error hint when URL is entered for Twitter', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Twitter}
        />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'https://twitter.com/user' } });

      const hint = screen.getByTestId('hint');
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent('Input username only');
    });

    it('should not show error hint for valid username', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'myhandle' } });

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });

    it('should clear error hint when valid input is entered after invalid', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');

      // First enter invalid value
      fireEvent.change(input, { target: { value: '@invalid' } });
      expect(screen.getByTestId('hint')).toBeInTheDocument();

      // Then enter valid value
      fireEvent.change(input, { target: { value: 'valid' } });
      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });
  });

  describe('validation - URL fields', () => {
    it('should not show error hint when URL starts with https://', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'https://example.com' } });

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });

    it('should show error hint when URL does not start with https://', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'http://example.com' } });

      const hint = screen.getByTestId('hint');
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent('Must be a valid https url');
    });

    it('should show error hint when URL is missing protocol', () => {
      render(
        <UsernameTextRecordInlineField
          {...defaultProps}
          textRecordKey={UsernameTextRecordKeys.Url}
        />,
      );

      const input = screen.getByTestId('input');
      fireEvent.change(input, { target: { value: 'example.com' } });

      const hint = screen.getByTestId('hint');
      expect(hint).toBeInTheDocument();
      expect(hint).toHaveTextContent('Must be a valid https url');
    });
  });

  describe('accessibility', () => {
    it('should associate label with input via htmlFor/id', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const label = screen.getByTestId('label');
      const input = screen.getByTestId('input');

      const htmlFor = label.getAttribute('for');
      const inputId = input.getAttribute('id');

      expect(htmlFor).toBeTruthy();
      expect(inputId).toBeTruthy();
      expect(htmlFor).toBe(inputId);
    });

    it('should have autoComplete set to off', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('autoComplete', 'off');
    });

    it('should have autoCapitalize set to none', () => {
      render(<UsernameTextRecordInlineField {...defaultProps} />);

      const input = screen.getByTestId('input');
      expect(input).toHaveAttribute('autoCapitalize', 'none');
    });
  });
});

describe('validateTextRecordValue', () => {
  describe('URL validation', () => {
    it('should return true for valid https URL', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Url, 'https://example.com')).toBe(
        true,
      );
    });

    it('should return false for http URL', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Url, 'http://example.com')).toBe(
        false,
      );
    });

    it('should return false for URL without protocol', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Url, 'example.com')).toBe(false);
    });
  });

  describe('social field validation', () => {
    it('should return true for plain username on Github', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Github, 'myhandle')).toBe(true);
    });

    it('should return false for @ prefixed username on Github', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Github, '@myhandle')).toBe(false);
    });

    it('should return false for URL on Github', () => {
      expect(
        validateTextRecordValue(UsernameTextRecordKeys.Github, 'https://github.com/user'),
      ).toBe(false);
    });

    it('should return true for plain username on Twitter', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Twitter, 'myhandle')).toBe(true);
    });

    it('should return false for @ prefixed username on Twitter', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Twitter, '@myhandle')).toBe(false);
    });

    it('should return true for plain username on Farcaster', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Farcaster, 'myhandle')).toBe(true);
    });

    it('should return true for plain username on Lens', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Lens, 'myhandle')).toBe(true);
    });

    it('should return true for plain username on Telegram', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Telegram, 'myhandle')).toBe(true);
    });

    it('should return true for plain username on Discord', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Discord, 'myhandle')).toBe(true);
    });
  });

  describe('other field types', () => {
    it('should return undefined for Email field', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Email, 'test@example.com')).toBe(
        undefined,
      );
    });

    it('should return undefined for Description field', () => {
      expect(validateTextRecordValue(UsernameTextRecordKeys.Description, 'some text')).toBe(
        undefined,
      );
    });
  });
});

describe('textRecordHintForDisplay', () => {
  describe('URL fields', () => {
    it('should return https hint for Url', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Url)).toBe(
        'Must be a valid https url',
      );
    });

    it('should return https hint for Url2', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Url2)).toBe(
        'Must be a valid https url',
      );
    });

    it('should return https hint for Url3', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Url3)).toBe(
        'Must be a valid https url',
      );
    });
  });

  describe('social fields', () => {
    it('should return username hint for Github', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Github)).toBe('Input username only');
    });

    it('should return username hint for Twitter', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Twitter)).toBe('Input username only');
    });

    it('should return username hint for Farcaster', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Farcaster)).toBe(
        'Input username only',
      );
    });

    it('should return username hint for Lens', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Lens)).toBe('Input username only');
    });

    it('should return username hint for Telegram', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Telegram)).toBe('Input username only');
    });

    it('should return username hint for Discord', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Discord)).toBe('Input username only');
    });
  });

  describe('other fields', () => {
    it('should return empty string for Email', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Email)).toBe('');
    });

    it('should return empty string for Description', () => {
      expect(textRecordHintForDisplay(UsernameTextRecordKeys.Description)).toBe('');
    });
  });
});
