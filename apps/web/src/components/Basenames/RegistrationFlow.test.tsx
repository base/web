/**
 * @jest-environment jsdom
 */

import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import { RegistrationFlow, claimQueryKey } from './RegistrationFlow';
import { RegistrationSteps } from './RegistrationContext';
import { FlowBackgroundSteps } from './shared/types';
import { UsernamePillVariants } from './UsernamePill/types';
import { RegistrationSearchInputVariant } from './RegistrationSearchInput/types';

// Mock next/dynamic to render components synchronously
jest.mock('next/dynamic', () => {
  return function mockDynamic() {
    // Return a placeholder for RegistrationStateSwitcher
    return function MockDynamicComponent() {
      return <div data-testid="registration-state-switcher">State Switcher</div>;
    };
  };
});

// Mock usehooks-ts
const mockSetIsModalOpen = jest.fn();
const mockSetIsBannerVisible = jest.fn();
const mockSetIsDocsBannerVisible = jest.fn();
jest.mock('usehooks-ts', () => ({
  useLocalStorage: jest.fn((key: string) => {
    if (key === 'BasenamesLaunchModalVisible') return [true, mockSetIsModalOpen];
    if (key === 'basenamesLaunchBannerVisible') return [true, mockSetIsBannerVisible];
    if (key === 'basenamesLaunchDocsBannerVisible') return [true, mockSetIsDocsBannerVisible];
    return [true, jest.fn()];
  }),
}));

// Mock RegistrationContext
let mockRegistrationStep = RegistrationSteps.Search;
let mockSearchInputFocused = false;
let mockSelectedName = '';
const mockSetSelectedName = jest.fn();
const mockSetRegistrationStep = jest.fn();

jest.mock('./RegistrationContext', () => ({
  RegistrationSteps: {
    Search: 'search',
    Claim: 'claim',
    Pending: 'pending',
    Success: 'success',
    Profile: 'profile',
  },
  registrationTransitionDuration: 'duration-700',
  useRegistration: () => ({
    registrationStep: mockRegistrationStep,
    searchInputFocused: mockSearchInputFocused,
    selectedName: mockSelectedName,
    setSelectedName: mockSetSelectedName,
    setRegistrationStep: mockSetRegistrationStep,
  }),
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

// Mock next/navigation
const mockSearchParamsGet = jest.fn();
jest.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: mockSearchParamsGet,
  }),
}));

// Mock base-ui constants
jest.mock('libs/base-ui/constants', () => ({
  isDevelopment: true,
}));

// Mock usernames utilities
jest.mock('apps/web/src/utils/usernames', () => ({
  formatBaseEthDomain: (name: string, chainId: number) => {
    if (chainId === 8453) return `${name}.base.eth`;
    return `${name}.basetest.eth`;
  },
  USERNAME_DOMAINS: {
    8453: 'base.eth',
    84532: 'basetest.eth',
  },
}));

// Mock child components
jest.mock('./RegistrationBackground', () => {
  return function MockRegistrationBackground({ backgroundStep }: { backgroundStep: string }) {
    return <div data-testid="registration-background" data-step={backgroundStep} />;
  };
});

jest.mock('./RegistrationBrand', () => {
  return function MockRegistrationBrand() {
    return <div data-testid="registration-brand">Brand</div>;
  };
});

jest.mock('./RegistrationForm', () => {
  return function MockRegistrationForm() {
    return <div data-testid="registration-form">Form</div>;
  };
});

jest.mock('./RegistrationProfileForm', () => {
  return function MockRegistrationProfileForm() {
    return <div data-testid="registration-profile-form">Profile Form</div>;
  };
});

jest.mock('./RegistrationSearchInput', () => {
  return function MockRegistrationSearchInput({
    variant,
    placeholder,
  }: {
    variant: number;
    placeholder: string;
  }) {
    return (
      <div data-testid="registration-search-input" data-variant={variant} data-placeholder={placeholder}>
        Search Input
      </div>
    );
  };
});

jest.mock('./RegistrationSuccessMessage', () => {
  return function MockRegistrationSuccessMessage() {
    return <div data-testid="registration-success-message">Success Message</div>;
  };
});

jest.mock('./RegistrationShareOnSocials', () => {
  return function MockRegistrationShareOnSocials() {
    return <div data-testid="registration-share-on-socials">Share on Socials</div>;
  };
});

jest.mock('./RegistrationLandingExplore', () => {
  return function MockRegistrationLandingExplore() {
    return <div data-testid="registration-landing-explore">Landing Explore</div>;
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

jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: function MockIcon({ name }: { name: string }) {
    return <span data-testid={`icon-${name}`}>{name}</span>;
  },
}));

describe('RegistrationFlow', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRegistrationStep = RegistrationSteps.Search;
    mockSearchInputFocused = false;
    mockSelectedName = '';
    mockChainId = 8453;
    mockSearchParamsGet.mockReset().mockReturnValue(null);
  });

  describe('claimQueryKey constant', () => {
    it('should have the correct value', () => {
      expect(claimQueryKey).toBe('claim');
    });
  });

  describe('rendering', () => {
    it('should render RegistrationBackground with correct step for Search', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const background = screen.getByTestId('registration-background');
        expect(background).toBeInTheDocument();
        expect(background).toHaveAttribute('data-step', FlowBackgroundSteps.Search);
      });
    });

    it('should render RegistrationBrand in Search step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-brand')).toBeInTheDocument();
      });
    });

    it('should render large RegistrationSearchInput in Search step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const searchInputs = screen.getAllByTestId('registration-search-input');
        const largeInput = searchInputs.find(
          (el) => el.getAttribute('data-variant') === String(RegistrationSearchInputVariant.Large)
        );
        expect(largeInput).toBeInTheDocument();
        expect(largeInput).toHaveAttribute('data-placeholder', 'Search for a name');
      });
    });

    it('should render RegistrationLandingExplore in Search step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-landing-explore')).toBeInTheDocument();
      });
    });

    it('should render RegistrationStateSwitcher in development mode', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-state-switcher')).toBeInTheDocument();
      });
    });
  });

  describe('Claim step', () => {
    beforeEach(() => {
      mockRegistrationStep = RegistrationSteps.Claim;
      mockSelectedName = 'testname';
    });

    it('should render RegistrationBackground with Form step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Form
        );
      });
    });

    it('should render RegistrationForm', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-form')).toBeInTheDocument();
      });
    });

    it('should render UsernamePill with Inline variant', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const pill = screen.getByTestId('username-pill');
        expect(pill).toBeInTheDocument();
        expect(pill).toHaveAttribute('data-variant', UsernamePillVariants.Inline);
        expect(pill).toHaveAttribute('data-username', 'testname.base.eth');
      });
    });

    it('should render small RegistrationSearchInput with "Find another name" placeholder', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const searchInputs = screen.getAllByTestId('registration-search-input');
        const smallInput = searchInputs.find(
          (el) => el.getAttribute('data-variant') === String(RegistrationSearchInputVariant.Small)
        );
        expect(smallInput).toBeInTheDocument();
        expect(smallInput).toHaveAttribute('data-placeholder', 'Find another name');
      });
    });

    it('should render back arrow button', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const backButton = screen.getByRole('button', { name: 'Find another name' });
        expect(backButton).toBeInTheDocument();
      });
    });

    it('should call setRegistrationStep and setSelectedName when back arrow is clicked', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByRole('button', { name: 'Find another name' })).toBeInTheDocument();
      });

      const backButton = screen.getByRole('button', { name: 'Find another name' });
      await act(async () => {
        fireEvent.click(backButton);
      });

      expect(mockSetRegistrationStep).toHaveBeenCalledWith(RegistrationSteps.Search);
      expect(mockSetSelectedName).toHaveBeenCalledWith('');
    });
  });

  describe('Pending step', () => {
    beforeEach(() => {
      mockRegistrationStep = RegistrationSteps.Pending;
      mockSelectedName = 'testname';
    });

    it('should render RegistrationBackground with Pending step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Pending
        );
      });
    });

    it('should render "Registering..." text', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByText('Registering...')).toBeInTheDocument();
      });
    });

    it('should render UsernamePill with isRegistering=true', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const pill = screen.getByTestId('username-pill');
        expect(pill).toHaveAttribute('data-is-registering', 'true');
      });
    });
  });

  describe('Success step', () => {
    beforeEach(() => {
      mockRegistrationStep = RegistrationSteps.Success;
      mockSelectedName = 'testname';
    });

    it('should render RegistrationBackground with Success step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Success
        );
      });
    });

    it('should render RegistrationSuccessMessage', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-success-message')).toBeInTheDocument();
      });
    });

    it('should render RegistrationShareOnSocials', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-share-on-socials')).toBeInTheDocument();
      });
    });

    it('should call localStorage setters to hide modals and banners', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(mockSetIsModalOpen).toHaveBeenCalledWith(false);
        expect(mockSetIsBannerVisible).toHaveBeenCalledWith(false);
        expect(mockSetIsDocsBannerVisible).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('Profile step', () => {
    beforeEach(() => {
      mockRegistrationStep = RegistrationSteps.Profile;
      mockSelectedName = 'testname';
    });

    it('should render RegistrationBackground with Success step', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Success
        );
      });
    });

    it('should render RegistrationProfileForm', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-profile-form')).toBeInTheDocument();
      });
    });

    it('should render UsernamePill with Card variant', async () => {
      render(<RegistrationFlow />);

      await waitFor(() => {
        const pill = screen.getByTestId('username-pill');
        expect(pill).toHaveAttribute('data-variant', UsernamePillVariants.Card);
      });
    });
  });

  describe('network switching', () => {
    it('should switch to intended network when on unsupported chain', async () => {
      mockChainId = 1; // Mainnet (unsupported)

      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(mockSwitchChain).toHaveBeenCalledWith({ chainId: 8453 });
      });
    });

    it('should not switch network when already on supported chain', async () => {
      mockChainId = 8453; // Base (supported)

      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toBeInTheDocument();
      });

      expect(mockSwitchChain).not.toHaveBeenCalled();
    });

    it('should not attempt to switch when chain is undefined', async () => {
      mockChainId = undefined;

      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toBeInTheDocument();
      });

      expect(mockSwitchChain).not.toHaveBeenCalled();
    });
  });

  describe('claim query parameter', () => {
    it('should set selected name from claim query parameter', async () => {
      mockSearchParamsGet.mockReturnValue('claimedname');

      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(mockSetSelectedName).toHaveBeenCalledWith('claimedname');
      });
    });

    it('should strip domain suffix from claim query parameter', async () => {
      mockSearchParamsGet.mockReturnValue('claimedname.base.eth');

      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(mockSetSelectedName).toHaveBeenCalledWith('claimedname');
      });
    });

    it('should not set selected name when claim query is not present', async () => {
      mockSearchParamsGet.mockReturnValue(null);

      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toBeInTheDocument();
      });

      expect(mockSetSelectedName).not.toHaveBeenCalled();
    });
  });

  describe('background step mapping', () => {
    it('should map Search step to FlowBackgroundSteps.Search', async () => {
      mockRegistrationStep = RegistrationSteps.Search;
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Search
        );
      });
    });

    it('should map Claim step to FlowBackgroundSteps.Form', async () => {
      mockRegistrationStep = RegistrationSteps.Claim;
      mockSelectedName = 'test';
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Form
        );
      });
    });

    it('should map Pending step to FlowBackgroundSteps.Pending', async () => {
      mockRegistrationStep = RegistrationSteps.Pending;
      mockSelectedName = 'test';
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Pending
        );
      });
    });

    it('should map Success step to FlowBackgroundSteps.Success', async () => {
      mockRegistrationStep = RegistrationSteps.Success;
      mockSelectedName = 'test';
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Success
        );
      });
    });

    it('should map Profile step to FlowBackgroundSteps.Success', async () => {
      mockRegistrationStep = RegistrationSteps.Profile;
      mockSelectedName = 'test';
      render(<RegistrationFlow />);

      await waitFor(() => {
        expect(screen.getByTestId('registration-background')).toHaveAttribute(
          'data-step',
          FlowBackgroundSteps.Success
        );
      });
    });
  });

  describe('default export', () => {
    it('should export RegistrationFlow as default', async () => {
      const importedModule = await import('./RegistrationFlow');
      expect(importedModule.default).toBe(importedModule.RegistrationFlow);
    });
  });
});
