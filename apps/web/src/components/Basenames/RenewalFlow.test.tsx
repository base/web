/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { RenewalFlow } from './RenewalFlow';
import { RenewalSteps } from './RenewalContext';
import { FlowBackgroundSteps } from './shared/types';
import { UsernamePillVariants } from './UsernamePill/types';

// Mock RenewalContext
let mockRenewalStep = RenewalSteps.Form;
let mockFormattedName = 'testname.base.eth';

jest.mock('./RenewalContext', () => ({
  RenewalSteps: {
    Form: 'form',
    Pending: 'pending',
    Success: 'success',
  },
  useRenewal: () => ({
    renewalStep: mockRenewalStep,
    formattedName: mockFormattedName,
  }),
  __esModule: true,
  default: function MockRenewalProvider({ children }: { children: React.ReactNode }) {
    return <div data-testid="renewal-provider">{children}</div>;
  },
}));

// Mock useBasenameChain
const mockBasenameChainId = 8453;
jest.mock('apps/web/src/hooks/useBasenameChain', () => ({
  __esModule: true,
  default: () => ({
    basenameChain: { id: mockBasenameChainId },
  }),
  supportedChainIds: [8453, 84532],
}));

// Mock wagmi hooks
let mockChainId: number | undefined = 8453;
const mockSwitchChain = jest.fn();
jest.mock('wagmi', () => ({
  useAccount: () => ({
    chain: mockChainId ? { id: mockChainId } : undefined,
  }),
  useSwitchChain: () => ({
    switchChain: mockSwitchChain,
  }),
}));

// Mock child components
jest.mock('./RegistrationBackground', () => {
  return function MockRegistrationBackground({ backgroundStep }: { backgroundStep: string }) {
    return <div data-testid="registration-background" data-step={backgroundStep} />;
  };
});

jest.mock('./RenewalForm', () => {
  return function MockRenewalForm() {
    return <div data-testid="renewal-form">Renewal Form</div>;
  };
});

jest.mock('./RenewalSuccessMessage', () => {
  return function MockRenewalSuccessMessage() {
    return <div data-testid="renewal-success-message">Renewal Success Message</div>;
  };
});

jest.mock('./UsernamePill', () => ({
  UsernamePill: function MockUsernamePill({
    variant,
    username,
    isRegistering,
  }: {
    variant: string;
    username: string;
    isRegistering: boolean;
  }) {
    return (
      <div
        data-testid="username-pill"
        data-variant={variant}
        data-username={username}
        data-is-registering={String(isRegistering)}
      >
        Username Pill
      </div>
    );
  },
}));

// Mock @headlessui/react Transition to render children immediately
jest.mock('@headlessui/react', () => ({
  Transition: function MockTransition({
    show,
    children,
    className,
  }: {
    show: boolean;
    children: React.ReactNode;
    className?: string;
  }) {
    if (!show) return null;
    return (
      <div data-testid="transition" className={className}>
        {children}
      </div>
    );
  },
}));

describe('RenewalFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRenewalStep = RenewalSteps.Form;
    mockFormattedName = 'testname.base.eth';
    mockChainId = 8453;
  });

  describe('rendering', () => {
    it('should render with RenewalProvider wrapper', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('renewal-provider')).toBeInTheDocument();
    });

    it('should render RegistrationBackground with correct step for Form', () => {
      render(<RenewalFlow name="testname" />);

      const background = screen.getByTestId('registration-background');
      expect(background).toBeInTheDocument();
      expect(background).toHaveAttribute('data-step', FlowBackgroundSteps.Form);
    });

    it('should render "EXTEND REGISTRATION" text in Form step', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByText('EXTEND REGISTRATION')).toBeInTheDocument();
    });

    it('should render UsernamePill in Form step', () => {
      render(<RenewalFlow name="testname" />);

      const pill = screen.getByTestId('username-pill');
      expect(pill).toBeInTheDocument();
      expect(pill).toHaveAttribute('data-variant', UsernamePillVariants.Inline);
      expect(pill).toHaveAttribute('data-username', 'testname.base.eth');
      expect(pill).toHaveAttribute('data-is-registering', 'false');
    });

    it('should render RenewalForm in Form step', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('renewal-form')).toBeInTheDocument();
    });
  });

  describe('Pending step', () => {
    beforeEach(() => {
      mockRenewalStep = RenewalSteps.Pending;
    });

    it('should render RegistrationBackground with Pending step', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('registration-background')).toHaveAttribute(
        'data-step',
        FlowBackgroundSteps.Pending,
      );
    });

    it('should render "Extending..." text', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByText('Extending...')).toBeInTheDocument();
    });

    it('should render UsernamePill with isRegistering=true', () => {
      render(<RenewalFlow name="testname" />);

      const pill = screen.getByTestId('username-pill');
      expect(pill).toHaveAttribute('data-is-registering', 'true');
    });

    it('should not render RenewalForm', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.queryByTestId('renewal-form')).not.toBeInTheDocument();
    });

    it('should not render RenewalSuccessMessage', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.queryByTestId('renewal-success-message')).not.toBeInTheDocument();
    });
  });

  describe('Success step', () => {
    beforeEach(() => {
      mockRenewalStep = RenewalSteps.Success;
    });

    it('should render RegistrationBackground with Success step', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('registration-background')).toHaveAttribute(
        'data-step',
        FlowBackgroundSteps.Success,
      );
    });

    it('should render RenewalSuccessMessage', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('renewal-success-message')).toBeInTheDocument();
    });

    it('should not render "EXTEND REGISTRATION" text', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.queryByText('EXTEND REGISTRATION')).not.toBeInTheDocument();
    });

    it('should not render UsernamePill', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.queryByTestId('username-pill')).not.toBeInTheDocument();
    });

    it('should not render RenewalForm', () => {
      render(<RenewalFlow name="testname" />);

      expect(screen.queryByTestId('renewal-form')).not.toBeInTheDocument();
    });
  });

  describe('network switching', () => {
    it('should switch to intended network when on unsupported chain', () => {
      mockChainId = 1; // Mainnet (unsupported)

      render(<RenewalFlow name="testname" />);

      expect(mockSwitchChain).toHaveBeenCalledWith({ chainId: 8453 });
    });

    it('should not switch network when already on supported chain', () => {
      mockChainId = 8453; // Base (supported)

      render(<RenewalFlow name="testname" />);

      expect(mockSwitchChain).not.toHaveBeenCalled();
    });

    it('should not attempt to switch when chain is undefined', () => {
      mockChainId = undefined;

      render(<RenewalFlow name="testname" />);

      expect(mockSwitchChain).not.toHaveBeenCalled();
    });
  });

  describe('background step mapping', () => {
    it('should map Form step to FlowBackgroundSteps.Form', () => {
      mockRenewalStep = RenewalSteps.Form;
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('registration-background')).toHaveAttribute(
        'data-step',
        FlowBackgroundSteps.Form,
      );
    });

    it('should map Pending step to FlowBackgroundSteps.Pending', () => {
      mockRenewalStep = RenewalSteps.Pending;
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('registration-background')).toHaveAttribute(
        'data-step',
        FlowBackgroundSteps.Pending,
      );
    });

    it('should map Success step to FlowBackgroundSteps.Success', () => {
      mockRenewalStep = RenewalSteps.Success;
      render(<RenewalFlow name="testname" />);

      expect(screen.getByTestId('registration-background')).toHaveAttribute(
        'data-step',
        FlowBackgroundSteps.Success,
      );
    });
  });

  describe('default export', () => {
    it('should export RenewalFlow as default', async () => {
      const importedModule = await import('./RenewalFlow');
      expect(importedModule.default).toBe(importedModule.RenewalFlow);
    });
  });
});
