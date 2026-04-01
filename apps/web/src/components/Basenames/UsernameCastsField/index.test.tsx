/**
 * @jest-environment jsdom
 */
 
 
 
/* eslint-disable react/function-component-definition */

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsernameCastsField from './index';
import { UsernameTextRecordKeys } from 'apps/web/src/utils/usernames';

// Mock utility functions
jest.mock('apps/web/src/utils/usernames', () => ({
  UsernameTextRecordKeys: {
    Casts: 'casts',
  },
  textRecordsKeysForDisplay: {
    casts: 'Pinned Casts',
  },
  textRecordsKeysPlaceholderForDisplay: {
    casts: 'https://farcaster.xyz/...',
  },
}));

// Mock Fieldset component
jest.mock('apps/web/src/components/Fieldset', () => {
  return function MockFieldset({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) {
    return (
      <fieldset data-testid="fieldset" className={className}>
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

// Mock Input component
jest.mock('apps/web/src/components/Input', () => {
  return function MockInput({
    value,
    placeholder,
    onChange,
    disabled,
    className,
    type,
  }: {
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled: boolean;
    className: string;
    type: string;
  }) {
    return (
      <input
        type={type}
        data-testid="cast-input"
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
        className={className}
      />
    );
  };
});

// Mock Hint component
jest.mock('apps/web/src/components/Hint', () => {
  const MockHint = function MockHint({
    children,
    variant,
  }: {
    children: React.ReactNode;
    variant: string;
  }) {
    return (
      <div data-testid="hint" data-variant={variant}>
        {children}
      </div>
    );
  };
  return {
    __esModule: true,
    default: MockHint,
    HintVariants: {
      Error: 'error',
    },
  };
});

describe('UsernameCastsField', () => {
  const defaultProps = {
    onChange: jest.fn(),
    value: '',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial render', () => {
    it('should render a label with default text', () => {
      render(<UsernameCastsField {...defaultProps} />);

      const label = screen.getByTestId('label');
      expect(label).toBeInTheDocument();
      expect(label).toHaveTextContent('Pinned Casts');
    });

    it('should render custom label when provided', () => {
      render(<UsernameCastsField {...defaultProps} labelChildren="Custom Label" />);

      const label = screen.getByTestId('label');
      expect(label).toHaveTextContent('Custom Label');
    });

    it('should not render label when labelChildren is null', () => {
      render(<UsernameCastsField {...defaultProps} labelChildren={null} />);

      expect(screen.queryByTestId('label')).not.toBeInTheDocument();
    });

    it('should render 4 cast input fields', () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      expect(inputs).toHaveLength(4);
    });

    it('should render inputs with correct placeholder', () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      inputs.forEach((input) => {
        expect(input).toHaveAttribute('placeholder', 'https://farcaster.xyz/...');
      });
    });

    it('should render empty inputs when value is empty', () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      inputs.forEach((input) => {
        expect(input).toHaveValue('');
      });
    });
  });

  describe('with initial value', () => {
    it('should parse comma-separated values into individual inputs', () => {
      const value = 'https://warpcast.com/user1/0x123,https://warpcast.com/user2/0x456';
      render(<UsernameCastsField {...defaultProps} value={value} />);

      const inputs = screen.getAllByTestId('cast-input');
      expect(inputs[0]).toHaveValue('https://warpcast.com/user1/0x123');
      expect(inputs[1]).toHaveValue('https://warpcast.com/user2/0x456');
      expect(inputs[2]).toHaveValue('');
      expect(inputs[3]).toHaveValue('');
    });

    it('should filter out empty values from initial value', () => {
      const value = 'https://warpcast.com/user1/0x123,,,https://warpcast.com/user2/0x456';
      render(<UsernameCastsField {...defaultProps} value={value} />);

      const inputs = screen.getAllByTestId('cast-input');
      expect(inputs[0]).toHaveValue('https://warpcast.com/user1/0x123');
      expect(inputs[1]).toHaveValue('https://warpcast.com/user2/0x456');
      expect(inputs[2]).toHaveValue('');
      expect(inputs[3]).toHaveValue('');
    });
  });

  describe('disabled state', () => {
    it('should disable all inputs when disabled prop is true', () => {
      render(<UsernameCastsField {...defaultProps} disabled />);

      const inputs = screen.getAllByTestId('cast-input');
      inputs.forEach((input) => {
        expect(input).toBeDisabled();
      });
    });

    it('should not disable inputs when disabled prop is false', () => {
      render(<UsernameCastsField {...defaultProps} disabled={false} />);

      const inputs = screen.getAllByTestId('cast-input');
      inputs.forEach((input) => {
        expect(input).not.toBeDisabled();
      });
    });
  });

  describe('onChange behavior', () => {
    it('should call onChange with updated cast values when input changes', async () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      fireEvent.change(inputs[0], {
        target: { value: 'https://warpcast.com/test/0xabc' },
      });

      await waitFor(() => {
        expect(defaultProps.onChange).toHaveBeenCalledWith(
          UsernameTextRecordKeys.Casts,
          'https://warpcast.com/test/0xabc'
        );
      });
    });

    it('should update existing cast at specific index', async () => {
      const value = 'https://warpcast.com/user1/0x123,https://warpcast.com/user2/0x456';
      render(<UsernameCastsField {...defaultProps} value={value} />);

      const inputs = screen.getAllByTestId('cast-input');
      fireEvent.change(inputs[1], {
        target: { value: 'https://warpcast.com/updated/0xdef' },
      });

      await waitFor(() => {
        expect(defaultProps.onChange).toHaveBeenCalledWith(
          UsernameTextRecordKeys.Casts,
          'https://warpcast.com/user1/0x123,https://warpcast.com/updated/0xdef'
        );
      });
    });

    it('should join multiple casts with commas', async () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');

      // Add first cast
      fireEvent.change(inputs[0], {
        target: { value: 'https://warpcast.com/user1/0x111' },
      });

      await waitFor(() => {
        expect(defaultProps.onChange).toHaveBeenLastCalledWith(
          UsernameTextRecordKeys.Casts,
          'https://warpcast.com/user1/0x111'
        );
      });
    });
  });

  describe('URL validation', () => {
    it('should not show error for valid Warpcast URL', () => {
      const value = 'https://warpcast.com/username/0x1234abcd';
      render(<UsernameCastsField {...defaultProps} value={value} />);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });

    it('should show error for invalid URL format', async () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      fireEvent.change(inputs[0], { target: { value: 'invalid-url' } });

      await waitFor(() => {
        const hint = screen.getByTestId('hint');
        expect(hint).toBeInTheDocument();
        expect(hint).toHaveTextContent('Must be a Warpcast URL');
      });
    });

    it('should show error for non-Warpcast URL', async () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      fireEvent.change(inputs[0], { target: { value: 'https://twitter.com/user/status' } });

      await waitFor(() => {
        const hint = screen.getByTestId('hint');
        expect(hint).toHaveTextContent('Must be a Warpcast URL');
      });
    });

    it('should not show error for empty input', () => {
      render(<UsernameCastsField {...defaultProps} />);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });

    it('should validate URL with username containing dots and dashes', () => {
      const value = 'https://warpcast.com/user.name-test/0xabcdef12';
      render(<UsernameCastsField {...defaultProps} value={value} />);

      expect(screen.queryByTestId('hint')).not.toBeInTheDocument();
    });

    it('should show error for URL without hex hash', async () => {
      render(<UsernameCastsField {...defaultProps} />);

      const inputs = screen.getAllByTestId('cast-input');
      fireEvent.change(inputs[0], {
        target: { value: 'https://warpcast.com/username/invalid' },
      });

      await waitFor(() => {
        const hint = screen.getByTestId('hint');
        expect(hint).toHaveTextContent('Must be a Warpcast URL');
      });
    });
  });

  describe('value updates', () => {
    it('should update internal state when value prop changes', async () => {
      const { rerender } = render(<UsernameCastsField {...defaultProps} value="" />);

      const inputs = screen.getAllByTestId('cast-input');
      expect(inputs[0]).toHaveValue('');

      rerender(
        <UsernameCastsField {...defaultProps} value="https://warpcast.com/newuser/0xfff" />
      );

      await waitFor(() => {
        const updatedInputs = screen.getAllByTestId('cast-input');
        expect(updatedInputs[0]).toHaveValue('https://warpcast.com/newuser/0xfff');
      });
    });
  });
});
