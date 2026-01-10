/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import RegistrationLandingExplore from './index';

// Mock the RegistrationContext
let mockSearchInputFocused = false;
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  useRegistration: () => ({
    searchInputFocused: mockSearchInputFocused,
  }),
}));

// Mock the Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({
    name,
    color,
    width,
    height,
  }: {
    name: string;
    color: string;
    width: string;
    height: string;
  }) => (
    <span
      data-testid="icon"
      data-name={name}
      data-color={color}
      data-width={width}
      data-height={height}
    >
      Icon
    </span>
  ),
}));

describe('RegistrationLandingExplore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchInputFocused = false;
  });

  describe('rendering', () => {
    it('should render the "Scroll to explore" text', () => {
      render(<RegistrationLandingExplore />);

      expect(screen.getByText(/Scroll to explore/)).toBeInTheDocument();
    });

    it('should render the Icon component with correct props', () => {
      render(<RegistrationLandingExplore />);

      const icon = screen.getByTestId('icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-name', 'caret');
      expect(icon).toHaveAttribute('data-color', 'black');
      expect(icon).toHaveAttribute('data-width', '12');
      expect(icon).toHaveAttribute('data-height', '12');
    });
  });

  describe('styling when search input is not focused', () => {
    beforeEach(() => {
      mockSearchInputFocused = false;
    });

    it('should apply dark text color to the scroll text', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const darkTextSpan = container.querySelector('span.text-\\[\\#454545\\]');
      expect(darkTextSpan).toBeInTheDocument();
      expect(darkTextSpan).toHaveTextContent('Scroll to explore');
    });

    it('should not apply white text color when not focused', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const scrollTextSpan = container.querySelector('span.text-white');
      expect(scrollTextSpan).not.toBeInTheDocument();
    });
  });

  describe('styling when search input is focused', () => {
    beforeEach(() => {
      mockSearchInputFocused = true;
    });

    it('should apply white text color to the scroll text', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const whiteTextSpan = container.querySelector('span.text-white');
      expect(whiteTextSpan).toBeInTheDocument();
      expect(whiteTextSpan).toHaveTextContent('Scroll to explore');
    });

    it('should not apply dark text color when focused', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const darkTextSpan = container.querySelector('span.text-\\[\\#454545\\]');
      expect(darkTextSpan).not.toBeInTheDocument();
    });
  });

  describe('layout and structure', () => {
    it('should have an absolute positioned root container', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const absoluteContainer = container.querySelector('.absolute');
      expect(absoluteContainer).toBeInTheDocument();
    });

    it('should have a flex container for centering', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const flexContainer = container.querySelector('.flex');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should have justify-center on root container', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const justifyCenter = container.querySelector('.justify-center');
      expect(justifyCenter).toBeInTheDocument();
    });

    it('should have full width on root container', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const fullWidth = container.querySelector('.w-full');
      expect(fullWidth).toBeInTheDocument();
    });

    it('should have left-1/2 positioning', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const leftHalf = container.querySelector('.left-1\\/2');
      expect(leftHalf).toBeInTheDocument();
    });

    it('should have horizontal transform for centering', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const translateX = container.querySelector('.-translate-x-1\\/2');
      expect(translateX).toBeInTheDocument();
    });

    it('should have vertical transform for positioning', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const translateY = container.querySelector('.-translate-y-1\\/2');
      expect(translateY).toBeInTheDocument();
    });
  });

  describe('icon container styling', () => {
    it('should have rounded background on icon container', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const roundedContainer = container.querySelector('.rounded-lg');
      expect(roundedContainer).toBeInTheDocument();
    });

    it('should have pulsate animation on icon container', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const pulsateAnimation = container.querySelector('.animate-pulsate');
      expect(pulsateAnimation).toBeInTheDocument();
    });

    it('should have vertical slide animation on icon wrapper', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const verticalSlide = container.querySelector('.animate-verticalSlide');
      expect(verticalSlide).toBeInTheDocument();
    });

    it('should have beige background color on icon container', () => {
      const { container } = render(<RegistrationLandingExplore />);

      const bgColor = container.querySelector('.bg-\\[\\#e7e6e2\\]');
      expect(bgColor).toBeInTheDocument();
    });
  });
});
