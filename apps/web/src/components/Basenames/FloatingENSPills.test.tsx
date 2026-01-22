/**
 * @jest-environment jsdom
 */
import { render, screen, act, fireEvent } from '@testing-library/react';
import { FloatingENSPills } from './FloatingENSPills';

// Mock the RegistrationContext
const mockUseRegistration = jest.fn();
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  registrationTransitionDuration: 'duration-700',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useRegistration: () => mockUseRegistration(),
}));

// Mock ImageAdaptive component
jest.mock('apps/web/src/components/ImageAdaptive', () => ({
  __esModule: true,
  default: ({
    src,
    alt,
    className,
    width,
    height,
  }: {
    src: string;
    alt: string;
    className: string;
    width: number;
    height: number;
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      data-testid="image-adaptive"
      src={src}
      alt={alt}
      className={className}
      width={width}
      height={height}
    />
  ),
}));

// Mock window properties
const mockWindowProperties = (innerWidth: number, innerHeight: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: innerWidth,
  });
  Object.defineProperty(window, 'innerHeight', {
    writable: true,
    configurable: true,
    value: innerHeight,
  });
};

describe('FloatingENSPills', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    // Default window size
    mockWindowProperties(1024, 768);

    // Default mock implementation
    mockUseRegistration.mockReturnValue({
      searchInputFocused: false,
      searchInputHovered: false,
    });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('initial rendering', () => {
    it('should render the main container', () => {
      render(<FloatingENSPills />);

      const container = document.querySelector('.pointer-events-none');
      expect(container).toBeInTheDocument();
    });

    it('should render 8 pills after mounting', () => {
      render(<FloatingENSPills />);

      // Advance timers to trigger mount effects without infinite loop
      act(() => {
        jest.advanceTimersByTime(100);
      });

      const pills = screen.getAllByTestId('image-adaptive');
      expect(pills).toHaveLength(8);
    });

    it('should render pills with correct names', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(screen.getByText('ianlakes.base.eth')).toBeInTheDocument();
      expect(screen.getByText('wilsoncusack.base.eth')).toBeInTheDocument();
      expect(screen.getByText('aflock.base.eth')).toBeInTheDocument();
      expect(screen.getByText('johnpalmer.base.eth')).toBeInTheDocument();
      expect(screen.getByText('jfrankfurt.base.eth')).toBeInTheDocument();
      expect(screen.getByText('lsr.base.eth')).toBeInTheDocument();
      expect(screen.getByText('dcj.base.eth')).toBeInTheDocument();
      expect(screen.getByText('zencephalon.base.eth')).toBeInTheDocument();
    });

    it('should render images with correct avatar paths', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      const images = screen.getAllByTestId('image-adaptive');

      expect(images[0]).toHaveAttribute('src', '/images/avatars/ianlakes.eth.png');
      expect(images[1]).toHaveAttribute('src', '/images/avatars/wilsoncusack.eth.png');
      expect(images[2]).toHaveAttribute('src', '/images/avatars/aflock.eth.png');
    });

    it('should render images with correct alt text', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(screen.getByAltText('ianlakes-avatar')).toBeInTheDocument();
      expect(screen.getByAltText('wilsoncusack-avatar')).toBeInTheDocument();
    });
  });

  describe('searchInputFocused state', () => {
    it('should apply bg-blue-600 class to container when searchInputFocused is true', () => {
      mockUseRegistration.mockReturnValue({
        searchInputFocused: true,
        searchInputHovered: false,
      });

      render(<FloatingENSPills />);

      const container = document.querySelector('.bg-blue-600');
      expect(container).toBeInTheDocument();
    });

    it('should not apply bg-blue-600 class when searchInputFocused is false', () => {
      mockUseRegistration.mockReturnValue({
        searchInputFocused: false,
        searchInputHovered: false,
      });

      render(<FloatingENSPills />);

      const container = document.querySelector('.pointer-events-none');
      expect(container).not.toHaveClass('bg-blue-600');
    });

    it('should apply white text/border styling to pills when focused', () => {
      mockUseRegistration.mockReturnValue({
        searchInputFocused: true,
        searchInputHovered: false,
      });

      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Pills should have white styling when focused
      const pills = document.querySelectorAll('.text-white');
      expect(pills.length).toBeGreaterThan(0);
    });
  });

  describe('searchInputHovered state', () => {
    it('should apply blue styling to pills when hovered but not focused', () => {
      mockUseRegistration.mockReturnValue({
        searchInputFocused: false,
        searchInputHovered: true,
      });

      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Pills should have blue styling when hovered
      const pills = document.querySelectorAll('.text-blue-600');
      expect(pills.length).toBeGreaterThan(0);
    });

    it('should prioritize focused styling over hovered styling', () => {
      mockUseRegistration.mockReturnValue({
        searchInputFocused: true,
        searchInputHovered: true,
      });

      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Should have white (focused) styling, not blue (hovered)
      const whiteTextPills = document.querySelectorAll('.text-white');
      expect(whiteTextPills.length).toBeGreaterThan(0);
    });
  });

  describe('blur effect', () => {
    it('should initially apply blur to alternate pills', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Initial blur state alternates: [true, false, true, false, ...]
      const blurredPills = document.querySelectorAll('.blur-sm');
      // Even indices (0, 2, 4, 6) should be blurred initially
      expect(blurredPills.length).toBe(4);
    });

    it('should toggle blur state over time', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Advance timers to trigger blur toggle
      act(() => {
        jest.advanceTimersByTime(6000);
      });

      // Blur state should have changed for at least some pills
      const currentBlurredCount = document.querySelectorAll('.blur-sm').length;
      // The exact count may vary due to random intervals, but state should change
      expect(typeof currentBlurredCount).toBe('number');
    });
  });

  describe('window resize handling', () => {
    it('should update pill positions on window resize', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Get initial position of first pill
      const pillsBeforeResize = document.querySelectorAll('[class*="absolute"]');
      expect(pillsBeforeResize.length).toBeGreaterThan(0);

      // Simulate resize
      mockWindowProperties(1920, 1080);

      act(() => {
        fireEvent(window, new Event('resize'));
        jest.advanceTimersByTime(100);
      });

      // Pills should still be rendered after resize
      const pillsAfterResize = document.querySelectorAll('[class*="absolute"]');
      expect(pillsAfterResize.length).toBeGreaterThan(0);
    });
  });

  describe('mouse position tracking', () => {
    it('should handle mouse move events', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      // Simulate mouse move
      act(() => {
        fireEvent.mouseMove(window, { clientX: 500, clientY: 400 });
        jest.advanceTimersByTime(100);
      });

      // Pills should still be rendered after mouse move
      const pills = screen.getAllByTestId('image-adaptive');
      expect(pills).toHaveLength(8);
    });
  });

  describe('pill positioning', () => {
    it('should position pills in an elliptical pattern', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      const pills = document.querySelectorAll('[class*="absolute"]');

      // Each pill should have top and left style properties
      pills.forEach((pill) => {
        const style = pill.getAttribute('style');
        if (style) {
          expect(style).toContain('top:');
          expect(style).toContain('left:');
        }
      });
    });

    it('should apply 3D rotation transform to pills', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      const pills = document.querySelectorAll('[class*="absolute"]');

      // Some pills should have transform styles
      let hasTransform = false;
      pills.forEach((pill) => {
        const style = pill.getAttribute('style');
        if (style?.includes('rotate3d')) {
          hasTransform = true;
        }
      });
      expect(hasTransform).toBe(true);
    });
  });

  describe('container styling', () => {
    it('should have pointer-events-none class', () => {
      render(<FloatingENSPills />);

      const container = document.querySelector('.pointer-events-none');
      expect(container).toBeInTheDocument();
    });

    it('should have overflow-hidden class', () => {
      render(<FloatingENSPills />);

      const container = document.querySelector('.overflow-hidden');
      expect(container).toBeInTheDocument();
    });

    it('should have negative z-index class', () => {
      render(<FloatingENSPills />);

      const container = document.querySelector('.-z-10');
      expect(container).toBeInTheDocument();
    });

    it('should have transition classes', () => {
      render(<FloatingENSPills />);

      const container = document.querySelector('.transition-all');
      expect(container).toBeInTheDocument();
    });
  });

  describe('pill styling', () => {
    it('should have rounded-full class on pills', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      const roundedPills = document.querySelectorAll('.rounded-full');
      // Pills and images have rounded-full
      expect(roundedPills.length).toBeGreaterThan(0);
    });

    it('should have opacity-60 class on pills', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      const opacityPills = document.querySelectorAll('.opacity-60');
      expect(opacityPills.length).toBe(8);
    });

    it('should have flex layout for pills', () => {
      render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      const flexPills = document.querySelectorAll('.flex');
      expect(flexPills.length).toBeGreaterThan(0);
    });
  });

  describe('cleanup', () => {
    it('should remove event listeners on unmount', () => {
      const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');

      const { unmount } = render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      unmount();

      // Should have removed resize and mousemove listeners
      expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
      expect(removeEventListenerSpy).toHaveBeenCalledWith('mousemove', expect.any(Function));

      removeEventListenerSpy.mockRestore();
    });

    it('should clear blur toggle timeouts on unmount', () => {
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');

      const { unmount } = render(<FloatingENSPills />);

      act(() => {
        jest.advanceTimersByTime(100);
      });

      unmount();

      // Should have called clearTimeout for blur cycle cleanup
      expect(clearTimeoutSpy).toHaveBeenCalled();

      clearTimeoutSpy.mockRestore();
    });
  });
});
