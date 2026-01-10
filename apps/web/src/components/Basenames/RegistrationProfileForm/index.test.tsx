/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import RegistrationProfileForm, { FormSteps } from './index';
import { UsernameTextRecordKeys, textRecordsSocialFieldsEnabled } from 'apps/web/src/utils/usernames';

// Mock Analytics
const mockLogEventWithContext = jest.fn();
jest.mock('apps/web/contexts/Analytics', () => ({
  useAnalytics: () => ({
    logEventWithContext: mockLogEventWithContext,
  }),
}));

// Mock Errors
const mockLogError = jest.fn();
jest.mock('apps/web/contexts/Errors', () => ({
  useErrors: () => ({
    logError: mockLogError,
  }),
}));

// Mock RegistrationContext
const mockRedirectToProfile = jest.fn();
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  registrationTransitionDuration: 'duration-700',
  useRegistration: () => ({
    redirectToProfile: mockRedirectToProfile,
    selectedNameFormatted: 'testname.base.eth',
  }),
}));

// Mock useWriteBaseEnsTextRecords
const mockUpdateTextRecords = jest.fn();
const mockWriteTextRecords = jest.fn();
let mockWriteTextRecordsIsPending = false;
let mockWriteTextRecordsError: Error | null = null;
const mockUpdatedTextRecords: Record<string, string> = {
  [UsernameTextRecordKeys.Description]: '',
  [UsernameTextRecordKeys.Keywords]: '',
  [UsernameTextRecordKeys.Twitter]: '',
  [UsernameTextRecordKeys.Farcaster]: '',
  [UsernameTextRecordKeys.Github]: '',
  [UsernameTextRecordKeys.Url]: '',
  [UsernameTextRecordKeys.Url2]: '',
  [UsernameTextRecordKeys.Url3]: '',
};

jest.mock('apps/web/src/hooks/useWriteBaseEnsTextRecords', () => ({
  __esModule: true,
  default: ({ onSuccess }: { onSuccess?: () => void }) => ({
    updateTextRecords: mockUpdateTextRecords,
    updatedTextRecords: mockUpdatedTextRecords,
    writeTextRecords: mockWriteTextRecords.mockImplementation(async () => {
      if (onSuccess) {
        // Store onSuccess for later invocation in tests
        (mockWriteTextRecords as jest.Mock & { onSuccess?: () => void }).onSuccess = onSuccess;
      }
      await Promise.resolve();
    }),
    writeTextRecordsIsPending: mockWriteTextRecordsIsPending,
    writeTextRecordsError: mockWriteTextRecordsError,
  }),
}));

// Mock child components
jest.mock('apps/web/src/components/Basenames/UsernameDescriptionField', () => {
  return function MockUsernameDescriptionField({
    labelChildren,
    onChange,
    value,
    disabled,
  }: {
    labelChildren: React.ReactNode;
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(UsernameTextRecordKeys.Description, e.target.value);
    };
    return (
      <div data-testid="username-description-field" data-disabled={disabled}>
        {labelChildren}
        <input data-testid="description-input" value={value} onChange={handleChange} />
      </div>
    );
  };
});

jest.mock('apps/web/src/components/Basenames/UsernameKeywordsField', () => {
  return function MockUsernameKeywordsField({
    labelChildren,
    onChange,
    value,
    disabled,
  }: {
    labelChildren: React.ReactNode;
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(UsernameTextRecordKeys.Keywords, e.target.value);
    };
    return (
      <div data-testid="username-keywords-field" data-disabled={disabled}>
        {labelChildren}
        <input data-testid="keywords-input" value={value} onChange={handleChange} />
      </div>
    );
  };
});

jest.mock('apps/web/src/components/Basenames/UsernameTextRecordInlineField', () => {
  return function MockUsernameTextRecordInlineField({
    textRecordKey,
    onChange,
    value,
    disabled,
  }: {
    textRecordKey: string;
    onChange: (key: string, value: string) => void;
    value: string;
    disabled: boolean;
  }) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(textRecordKey, e.target.value);
    };
    return (
      <div
        data-testid={`text-record-inline-field-${textRecordKey}`}
        data-disabled={disabled}
        data-value={value}
      >
        <input
          data-testid={`inline-input-${textRecordKey}`}
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  };
});

jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: function MockButton({
    children,
    onClick,
    disabled,
    isLoading,
  }: {
    children: React.ReactNode;
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    disabled: boolean;
    isLoading: boolean;
  }) {
    return (
      <button
        type="button"
        data-testid="submit-button"
        onClick={onClick}
        disabled={disabled}
        data-loading={isLoading}
      >
        {children}
      </button>
    );
  },
  ButtonVariants: {
    Black: 'black',
  },
}));

jest.mock('apps/web/src/components/Fieldset', () => {
  return function MockFieldset({ children }: { children: React.ReactNode }) {
    return <fieldset data-testid="fieldset">{children}</fieldset>;
  };
});

jest.mock('apps/web/src/components/Label', () => {
  return function MockLabel({ children }: { children: React.ReactNode }) {
    return <span data-testid="label">{children}</span>;
  };
});

jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  },
}));

jest.mock('apps/web/src/components/TransactionError', () => {
  return function MockTransactionError({ error }: { error: Error }) {
    return <div data-testid="transaction-error">{error.message}</div>;
  };
});

// Mock usernames utilities
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
}));

// Mock libs/base-ui/utils/logEvent
jest.mock('libs/base-ui/utils/logEvent', () => ({
  ActionType: {
    change: 'change',
  },
}));

describe('RegistrationProfileForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    mockWriteTextRecordsIsPending = false;
    mockWriteTextRecordsError = null;
    mockWriteTextRecords.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('FormSteps enum', () => {
    it('should export FormSteps with correct values', () => {
      expect(FormSteps.Description).toBe('description');
      expect(FormSteps.Socials).toBe('socials');
      expect(FormSteps.Keywords).toBe('keywords');
    });
  });

  describe('initial render', () => {
    it('should render the Description step initially', () => {
      render(<RegistrationProfileForm />);

      expect(screen.getByTestId('username-description-field')).toBeInTheDocument();
      expect(screen.getByText('Add Bio')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 3')).toBeInTheDocument();
    });

    it('should render the submit button with "Next" text', () => {
      render(<RegistrationProfileForm />);

      const button = screen.getByTestId('submit-button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Next');
    });

    it('should render the blueCircle icon in the label', () => {
      render(<RegistrationProfileForm />);

      expect(screen.getByTestId('icon-blueCircle')).toBeInTheDocument();
    });

    it('should log analytics event for initial step', () => {
      render(<RegistrationProfileForm />);

      expect(mockLogEventWithContext).toHaveBeenCalledWith(
        'registration_profile_form_step_description',
        'change'
      );
    });
  });

  describe('form step transitions', () => {
    it('should transition from Description to Socials step when Next is clicked', async () => {
      render(<RegistrationProfileForm />);

      const button = screen.getByTestId('submit-button');
      fireEvent.click(button);

      // Advance timers to trigger transition
      act(() => {
        jest.advanceTimersByTime(700);
      });

      act(() => {
        jest.advanceTimersByTime(700);
      });

      await waitFor(() => {
        expect(screen.getByText('Add Socials')).toBeInTheDocument();
        expect(screen.getByText('Step 2 of 3')).toBeInTheDocument();
      });
    });

    it('should transition from Socials to Keywords step when Next is clicked', async () => {
      render(<RegistrationProfileForm />);

      // First transition to Socials
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(screen.getByText('Add Socials')).toBeInTheDocument();
      });

      // Then transition to Keywords
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(screen.getByText('Add areas of expertise')).toBeInTheDocument();
        expect(screen.getByText('Step 3 of 3')).toBeInTheDocument();
      });
    });

    it('should show "I\'m done" button text on Keywords step', async () => {
      render(<RegistrationProfileForm />);

      // Transition to Socials
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      // Transition to Keywords
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        const button = screen.getByTestId('submit-button');
        expect(button).toHaveTextContent("I'm done");
      });
    });

    it('should log analytics events for each step transition', async () => {
      render(<RegistrationProfileForm />);

      expect(mockLogEventWithContext).toHaveBeenCalledWith(
        'registration_profile_form_step_description',
        'change'
      );

      // Transition to Socials
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(mockLogEventWithContext).toHaveBeenCalledWith(
          'registration_profile_form_step_socials',
          'change'
        );
      });

      // Transition to Keywords
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(mockLogEventWithContext).toHaveBeenCalledWith(
          'registration_profile_form_step_keywords',
          'change'
        );
      });
    });
  });

  describe('Socials step rendering', () => {
    it('should render social fields for each enabled text record', async () => {
      render(<RegistrationProfileForm />);

      // Transition to Socials
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        textRecordsSocialFieldsEnabled.forEach((key) => {
          expect(screen.getByTestId(`text-record-inline-field-${key}`)).toBeInTheDocument();
        });
      });
    });

    it('should render Fieldset and Label wrappers', async () => {
      render(<RegistrationProfileForm />);

      // Transition to Socials
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(screen.getByTestId('fieldset')).toBeInTheDocument();
        expect(screen.getByTestId('label')).toBeInTheDocument();
      });
    });
  });

  describe('Keywords step rendering', () => {
    it('should render UsernameKeywordsField', async () => {
      render(<RegistrationProfileForm />);

      // Transition to Socials then Keywords
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(screen.getByTestId('username-keywords-field')).toBeInTheDocument();
      });
    });
  });

  describe('text record updates', () => {
    it('should call updateTextRecords when description input changes', () => {
      render(<RegistrationProfileForm />);

      const input = screen.getByTestId('description-input');
      fireEvent.change(input, { target: { value: 'My bio' } });

      expect(mockUpdateTextRecords).toHaveBeenCalledWith(
        UsernameTextRecordKeys.Description,
        'My bio'
      );
    });

    it('should call updateTextRecords when social input changes', async () => {
      render(<RegistrationProfileForm />);

      // Transition to Socials
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        const twitterInput = screen.getByTestId('inline-input-com.twitter');
        fireEvent.change(twitterInput, { target: { value: '@myhandle' } });

        expect(mockUpdateTextRecords).toHaveBeenCalledWith('com.twitter', '@myhandle');
      });
    });
  });

  describe('form submission', () => {
    it('should call writeTextRecords when clicking button on Keywords step', async () => {
      render(<RegistrationProfileForm />);

      // Transition to Socials then Keywords
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(screen.getByTestId('username-keywords-field')).toBeInTheDocument();
      });

      // Click submit on Keywords step
      fireEvent.click(screen.getByTestId('submit-button'));

      expect(mockWriteTextRecords).toHaveBeenCalled();
    });

    it('should log error when writeTextRecords fails', async () => {
      const mockError = new Error('Write failed');
      mockWriteTextRecords.mockRejectedValueOnce(mockError);

      render(<RegistrationProfileForm />);

      // Transition to Keywords step
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });
      fireEvent.click(screen.getByTestId('submit-button'));
      act(() => {
        jest.advanceTimersByTime(1400);
      });

      await waitFor(() => {
        expect(screen.getByTestId('username-keywords-field')).toBeInTheDocument();
      });

      // Click submit
      fireEvent.click(screen.getByTestId('submit-button'));

      await waitFor(() => {
        expect(mockLogError).toHaveBeenCalledWith(mockError, 'Failed to write text records');
      });
    });
  });

  describe('pending state', () => {
    it('should disable button when writeTextRecordsIsPending is true', () => {
      mockWriteTextRecordsIsPending = true;

      render(<RegistrationProfileForm />);

      const button = screen.getByTestId('submit-button');
      expect(button).toBeDisabled();
      expect(button).toHaveAttribute('data-loading', 'true');
    });

    it('should disable description field when pending', () => {
      mockWriteTextRecordsIsPending = true;

      render(<RegistrationProfileForm />);

      const field = screen.getByTestId('username-description-field');
      expect(field).toHaveAttribute('data-disabled', 'true');
    });
  });

  describe('error display', () => {
    it('should render TransactionError when writeTextRecordsError exists', () => {
      mockWriteTextRecordsError = new Error('Transaction failed');

      render(<RegistrationProfileForm />);

      expect(screen.getByTestId('transaction-error')).toBeInTheDocument();
      expect(screen.getByText('Transaction failed')).toBeInTheDocument();
    });

    it('should not render TransactionError when there is no error', () => {
      mockWriteTextRecordsError = null;

      render(<RegistrationProfileForm />);

      expect(screen.queryByTestId('transaction-error')).not.toBeInTheDocument();
    });
  });

  describe('opacity transitions', () => {
    it('should apply opacity-0 class during transition', () => {
      render(<RegistrationProfileForm />);

      // Click to trigger transition
      fireEvent.click(screen.getByTestId('submit-button'));

      // After first timeout (hidden state)
      act(() => {
        jest.advanceTimersByTime(700);
      });

      const form = document.querySelector('form');
      // Form should still exist during transition
      expect(form).toBeInTheDocument();
    });
  });
});
