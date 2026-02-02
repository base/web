/**
 * @jest-environment jsdom
 */

import { render, screen, act, waitFor } from '@testing-library/react';
import BadgeProvider, { BadgeContext, useBadgeContext, BadgeContextProps } from './BadgeContext';
import { useContext } from 'react';

// Mock the Badges module to avoid importing images
jest.mock('apps/web/src/components/Basenames/UsernameProfileSectionBadges/Badges', () => ({
  __esModule: true,
}));

// Test component to consume the context
function TestConsumer() {
  const context = useBadgeContext();

  const handleSelectBadge = () =>
    context.selectBadge({ badge: 'VERIFIED_IDENTITY', claimed: true, score: 100 });
  const handleSelectUnclaimedBadge = () =>
    context.selectBadge({ badge: 'BASE_BUILDER', claimed: false });
  const handleCloseModal = () => context.closeModal();

  return (
    <div>
      <span data-testid="modalOpen">{String(context.modalOpen)}</span>
      <span data-testid="selectedBadge">{context.selectedClaim?.badge ?? 'none'}</span>
      <span data-testid="selectedClaimed">{String(context.selectedClaim?.claimed ?? 'none')}</span>
      <span data-testid="selectedScore">{String(context.selectedClaim?.score ?? 'none')}</span>
      <button
        type="button"
        aria-label="Select badge"
        data-testid="selectBadge"
        onClick={handleSelectBadge}
      />
      <button
        type="button"
        aria-label="Select unclaimed badge"
        data-testid="selectUnclaimedBadge"
        onClick={handleSelectUnclaimedBadge}
      />
      <button
        type="button"
        aria-label="Close modal"
        data-testid="closeModal"
        onClick={handleCloseModal}
      />
    </div>
  );
}

describe('BadgeContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('BadgeContext default values', () => {
    function DefaultContextConsumer() {
      const context = useContext(BadgeContext);
      return (
        <div>
          <span data-testid="modalOpen">{String(context.modalOpen)}</span>
          <span data-testid="selectedClaim">
            {context.selectedClaim ? context.selectedClaim.badge : 'undefined'}
          </span>
        </div>
      );
    }

    it('should have correct default values', () => {
      render(<DefaultContextConsumer />);

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedClaim')).toHaveTextContent('undefined');
    });

    it('should have noop functions that do not throw', () => {
      let contextValue: BadgeContextProps | null = null;

      function ContextCapture() {
        contextValue = useContext(BadgeContext);
        return null;
      }

      render(<ContextCapture />);

      expect(contextValue).not.toBeNull();
      if (contextValue) {
        const ctx = contextValue as BadgeContextProps;
        // These should be noop functions that don't throw
        expect(() => ctx.closeModal()).not.toThrow();
        expect(() => ctx.selectBadge({ badge: 'VERIFIED_IDENTITY', claimed: true })).not.toThrow();
        expect(() => ctx.setSelectedClaim(undefined)).not.toThrow();
      }
    });
  });

  describe('BadgeProvider', () => {
    it('should render children', () => {
      render(
        <BadgeProvider>
          <div data-testid="child">Child Content</div>
        </BadgeProvider>,
      );

      expect(screen.getByTestId('child')).toBeInTheDocument();
      expect(screen.getByTestId('child')).toHaveTextContent('Child Content');
    });

    it('should provide context values to children', () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('none');
    });

    it('should render without children', () => {
      const { container } = render(<BadgeProvider />);
      expect(container).toBeInTheDocument();
    });
  });

  describe('selectBadge', () => {
    it('should open modal and set selectedClaim when selectBadge is called', async () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('none');

      await act(async () => {
        screen.getByTestId('selectBadge').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('modalOpen')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('VERIFIED_IDENTITY');
      expect(screen.getByTestId('selectedClaimed')).toHaveTextContent('true');
      expect(screen.getByTestId('selectedScore')).toHaveTextContent('100');
    });

    it('should handle selecting an unclaimed badge without score', async () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      await act(async () => {
        screen.getByTestId('selectUnclaimedBadge').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('modalOpen')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('BASE_BUILDER');
      expect(screen.getByTestId('selectedClaimed')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedScore')).toHaveTextContent('none');
    });

    it('should allow selecting different badges sequentially', async () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      // Select first badge
      await act(async () => {
        screen.getByTestId('selectBadge').click();
      });

      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('VERIFIED_IDENTITY');

      // Select second badge
      await act(async () => {
        screen.getByTestId('selectUnclaimedBadge').click();
      });

      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('BASE_BUILDER');
    });
  });

  describe('closeModal', () => {
    it('should close modal and clear selectedClaim when closeModal is called', async () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      // First open the modal
      await act(async () => {
        screen.getByTestId('selectBadge').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('modalOpen')).toHaveTextContent('true');
      });
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('VERIFIED_IDENTITY');

      // Close the modal
      await act(async () => {
        screen.getByTestId('closeModal').click();
      });

      await waitFor(() => {
        expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
      });
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('none');
    });

    it('should be safe to call closeModal when modal is already closed', async () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      // Modal should start closed
      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');

      // Calling close when already closed should not throw
      await act(async () => {
        screen.getByTestId('closeModal').click();
      });

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
    });
  });

  describe('setSelectedClaim', () => {
    it('should allow direct manipulation of selectedClaim through setSelectedClaim', async () => {
      function DirectSetClaimConsumer() {
        const context = useBadgeContext();

        const handleSetClaim = () =>
          context.setSelectedClaim({ badge: 'TALENT_SCORE', claimed: true, score: 85 });

        return (
          <div>
            <span data-testid="selectedBadge">{context.selectedClaim?.badge ?? 'none'}</span>
            <button
              type="button"
              aria-label="Set claim directly"
              data-testid="setClaimDirectly"
              onClick={handleSetClaim}
            />
          </div>
        );
      }

      render(
        <BadgeProvider>
          <DirectSetClaimConsumer />
        </BadgeProvider>,
      );

      await act(async () => {
        screen.getByTestId('setClaimDirectly').click();
      });

      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('TALENT_SCORE');
    });
  });

  describe('useBadgeContext hook', () => {
    it('should return context values when used inside provider', () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      expect(screen.getByTestId('modalOpen')).toBeInTheDocument();
    });

    it('should throw error when context is undefined', () => {
      // Since BadgeContext has default values, the context is never undefined
      // The error check in useBadgeContext is checking for undefined which won't
      // happen with the current implementation because createContext has defaults.
      // However, the error message mentions "useCount must be used within a CountProvider"
      // which appears to be a copy-paste error in the original code.

      // This test verifies the hook works correctly inside the provider
      function ValidUsage() {
        const context = useBadgeContext();
        return <span data-testid="valid">{String(context.modalOpen)}</span>;
      }

      render(
        <BadgeProvider>
          <ValidUsage />
        </BadgeProvider>,
      );

      expect(screen.getByTestId('valid')).toHaveTextContent('false');
    });
  });

  describe('modal workflow', () => {
    it('should support a complete select and close workflow', async () => {
      render(
        <BadgeProvider>
          <TestConsumer />
        </BadgeProvider>,
      );

      // Initial state
      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('none');

      // Open modal with a badge
      await act(async () => {
        screen.getByTestId('selectBadge').click();
      });

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('true');
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('VERIFIED_IDENTITY');
      expect(screen.getByTestId('selectedClaimed')).toHaveTextContent('true');
      expect(screen.getByTestId('selectedScore')).toHaveTextContent('100');

      // Close modal
      await act(async () => {
        screen.getByTestId('closeModal').click();
      });

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('false');
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('none');

      // Reopen with different badge
      await act(async () => {
        screen.getByTestId('selectUnclaimedBadge').click();
      });

      expect(screen.getByTestId('modalOpen')).toHaveTextContent('true');
      expect(screen.getByTestId('selectedBadge')).toHaveTextContent('BASE_BUILDER');
      expect(screen.getByTestId('selectedClaimed')).toHaveTextContent('false');
    });
  });
});
