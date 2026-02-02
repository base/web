/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationStateSwitcher, { DropdownItemSwitcher } from './index';
import { RegistrationSteps } from 'apps/web/src/components/Basenames/RegistrationContext';

// Mock the RegistrationContext
const mockSetRegistrationStep = jest.fn();
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  RegistrationSteps: {
    Search: 'search',
    Claim: 'claim',
    Pending: 'pending',
    Success: 'success',
    Profile: 'profile',
  },
  useRegistration: () => ({
    setRegistrationStep: mockSetRegistrationStep,
  }),
}));

// Mock the Dropdown components
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
  default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
    <button type="button" data-testid="dropdown-item" onClick={onClick}>
      {children}
    </button>
  ),
}));

// Mock the Button component
jest.mock('apps/web/src/components/Button/Button', () => ({
  Button: ({ children, variant }: { children: React.ReactNode; variant: string }) => (
    <button type="button" data-testid="button" data-variant={variant}>
      {children}
    </button>
  ),
  ButtonVariants: {
    Gray: 'gray',
  },
}));

describe('RegistrationStateSwitcher', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('when not in E2E test mode', () => {
    beforeEach(() => {
      process.env.NEXT_PUBLIC_E2E_TEST = 'false';
      process.env.E2E_TEST = 'false';
    });

    it('should render the dropdown component', () => {
      render(<RegistrationStateSwitcher />);

      expect(screen.getByTestId('dropdown')).toBeInTheDocument();
    });

    it('should render the dropdown toggle with button', () => {
      render(<RegistrationStateSwitcher />);

      expect(screen.getByTestId('dropdown-toggle')).toBeInTheDocument();
      expect(screen.getByTestId('button')).toBeInTheDocument();
      expect(screen.getByText('[DEV TEST] Change state')).toBeInTheDocument();
    });

    it('should render the dropdown menu', () => {
      render(<RegistrationStateSwitcher />);

      expect(screen.getByTestId('dropdown-menu')).toBeInTheDocument();
    });

    it('should render all registration step options', () => {
      render(<RegistrationStateSwitcher />);

      const dropdownItems = screen.getAllByTestId('dropdown-item');
      expect(dropdownItems).toHaveLength(5);

      expect(screen.getByText('search')).toBeInTheDocument();
      expect(screen.getByText('claim')).toBeInTheDocument();
      expect(screen.getByText('pending')).toBeInTheDocument();
      expect(screen.getByText('success')).toBeInTheDocument();
      expect(screen.getByText('profile')).toBeInTheDocument();
    });

    it('should use Gray button variant', () => {
      render(<RegistrationStateSwitcher />);

      const button = screen.getByTestId('button');
      expect(button).toHaveAttribute('data-variant', 'gray');
    });

    it('should have correct positioning styles', () => {
      render(<RegistrationStateSwitcher />);

      const wrapper = screen.getByTestId('dropdown').parentElement;
      expect(wrapper).toHaveClass('absolute');
      expect(wrapper).toHaveClass('right-10');
      expect(wrapper).toHaveClass('top-20');
      expect(wrapper).toHaveClass('z-50');
      expect(wrapper).toHaveClass('shadow-lg');
    });
  });

  describe('when in E2E test mode (NEXT_PUBLIC_E2E_TEST)', () => {
    it('should return null when NEXT_PUBLIC_E2E_TEST is true', () => {
      // Need to re-import the module with new env var
      jest.resetModules();
      process.env.NEXT_PUBLIC_E2E_TEST = 'true';

      // Re-mock the dependencies after resetting modules
      jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
        RegistrationSteps: {
          Search: 'search',
          Claim: 'claim',
          Pending: 'pending',
          Success: 'success',
          Profile: 'profile',
        },
        useRegistration: () => ({
          setRegistrationStep: mockSetRegistrationStep,
        }),
      }));

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
        default: ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => (
          <button type="button" data-testid="dropdown-item" onClick={onClick}>
            {children}
          </button>
        ),
      }));

      jest.mock('apps/web/src/components/Button/Button', () => ({
        Button: ({ children, variant }: { children: React.ReactNode; variant: string }) => (
          <button type="button" data-testid="button" data-variant={variant}>
            {children}
          </button>
        ),
        ButtonVariants: {
          Gray: 'gray',
        },
      }));

      const {
        default: RegistrationStateSwitcherWithE2E,
      } = require('./index') as typeof import('./index');

      const { container } = render(<RegistrationStateSwitcherWithE2E />);
      expect(container.firstChild).toBeNull();
    });
  });
});

describe('DropdownItemSwitcher', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the dropdown item with the registration step name', () => {
    render(<DropdownItemSwitcher registrationStep={RegistrationSteps.Search} />);

    expect(screen.getByTestId('dropdown-item')).toBeInTheDocument();
    expect(screen.getByText('search')).toBeInTheDocument();
  });

  it('should call setRegistrationStep with Search step when clicked', () => {
    render(<DropdownItemSwitcher registrationStep={RegistrationSteps.Search} />);

    fireEvent.click(screen.getByTestId('dropdown-item'));

    expect(mockSetRegistrationStep).toHaveBeenCalledTimes(1);
    expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Search);
  });

  it('should call setRegistrationStep with Claim step when clicked', () => {
    render(<DropdownItemSwitcher registrationStep={RegistrationSteps.Claim} />);

    fireEvent.click(screen.getByTestId('dropdown-item'));

    expect(mockSetRegistrationStep).toHaveBeenCalledTimes(1);
    expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Claim);
  });

  it('should call setRegistrationStep with Pending step when clicked', () => {
    render(<DropdownItemSwitcher registrationStep={RegistrationSteps.Pending} />);

    fireEvent.click(screen.getByTestId('dropdown-item'));

    expect(mockSetRegistrationStep).toHaveBeenCalledTimes(1);
    expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Pending);
  });

  it('should call setRegistrationStep with Success step when clicked', () => {
    render(<DropdownItemSwitcher registrationStep={RegistrationSteps.Success} />);

    fireEvent.click(screen.getByTestId('dropdown-item'));

    expect(mockSetRegistrationStep).toHaveBeenCalledTimes(1);
    expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Success);
  });

  it('should call setRegistrationStep with Profile step when clicked', () => {
    render(<DropdownItemSwitcher registrationStep={RegistrationSteps.Profile} />);

    fireEvent.click(screen.getByTestId('dropdown-item'));

    expect(mockSetRegistrationStep).toHaveBeenCalledTimes(1);
    expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Profile);
  });

  it('should display the correct step name for each registration step', () => {
    const steps = [
      { step: RegistrationSteps.Search, expected: 'search' },
      { step: RegistrationSteps.Claim, expected: 'claim' },
      { step: RegistrationSteps.Pending, expected: 'pending' },
      { step: RegistrationSteps.Success, expected: 'success' },
      { step: RegistrationSteps.Profile, expected: 'profile' },
    ];

    steps.forEach(({ step, expected }) => {
      const { unmount } = render(<DropdownItemSwitcher registrationStep={step} />);
      expect(screen.getByText(expected)).toBeInTheDocument();
      unmount();
    });
  });
});
