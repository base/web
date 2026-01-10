/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import RegistrationBrand from './index';

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
    width: number;
    height: number;
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

// Mock Typed.js
const mockTypedConstructor = jest.fn();
jest.mock('typed.js', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation((el: HTMLElement, config: object) => {
    mockTypedConstructor(el, config);
    return { destroy: jest.fn() };
  }),
}));

describe('RegistrationBrand', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockSearchInputFocused = false;
  });

  describe('rendering', () => {
    it('should render the Basenames heading', () => {
      const { getByRole } = render(<RegistrationBrand />);

      const heading = getByRole('heading', { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(heading).toHaveTextContent('Basenames');
    });

    it('should render the Icon component with correct props', () => {
      const { getByTestId } = render(<RegistrationBrand />);

      const icon = getByTestId('icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveAttribute('data-name', 'blueCircle');
      expect(icon).toHaveAttribute('data-color', 'currentColor');
      expect(icon).toHaveAttribute('data-width', '15');
      expect(icon).toHaveAttribute('data-height', '15');
    });

    it('should render a paragraph element for typed text', () => {
      const { container } = render(<RegistrationBrand />);

      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
    });
  });

  describe('styling when search input is not focused', () => {
    beforeEach(() => {
      mockSearchInputFocused = false;
    });

    it('should apply blue text color to icon container', () => {
      const { container } = render(<RegistrationBrand />);

      const iconContainer = container.querySelector('.text-blue-600');
      expect(iconContainer).toBeInTheDocument();
    });

    it('should not apply white text color to icon container', () => {
      const { container } = render(<RegistrationBrand />);

      const whiteContainer = container.querySelector('.text-white');
      expect(whiteContainer).not.toBeInTheDocument();
    });
  });

  describe('styling when search input is focused', () => {
    beforeEach(() => {
      mockSearchInputFocused = true;
    });

    it('should apply white text color to icon container', () => {
      const { container } = render(<RegistrationBrand />);

      const iconContainer = container.querySelector('.text-white');
      expect(iconContainer).toBeInTheDocument();
    });

    it('should not apply blue text color to icon container', () => {
      const { container } = render(<RegistrationBrand />);

      const blueContainer = container.querySelector('.text-blue-600');
      expect(blueContainer).not.toBeInTheDocument();
    });
  });

  describe('Typed.js initialization', () => {
    it('should initialize Typed.js on mount', () => {
      render(<RegistrationBrand />);

      expect(mockTypedConstructor).toHaveBeenCalledTimes(1);
    });

    it('should pass correct configuration to Typed.js', () => {
      render(<RegistrationBrand />);

      expect(mockTypedConstructor).toHaveBeenCalledWith(expect.any(HTMLParagraphElement), {
        strings: [
          'Build your Based profile',
          'Connect with Based builders',
          'Simplify onchain transactions',
        ],
        typeSpeed: 50,
        backDelay: 3000,
        backSpeed: 40,
        loop: true,
        showCursor: false,
        autoInsertCss: false,
      });
    });

    it('should not reinitialize Typed.js on re-render', () => {
      const { rerender } = render(<RegistrationBrand />);

      expect(mockTypedConstructor).toHaveBeenCalledTimes(1);

      rerender(<RegistrationBrand />);

      expect(mockTypedConstructor).toHaveBeenCalledTimes(1);
    });
  });

  describe('layout and structure', () => {
    it('should have a flex container as the root element', () => {
      const { container } = render(<RegistrationBrand />);

      const flexContainer = container.querySelector('.flex.flex-row');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should have justify-between on root container', () => {
      const { container } = render(<RegistrationBrand />);

      const justifyBetween = container.querySelector('.justify-between');
      expect(justifyBetween).toBeInTheDocument();
    });

    it('should have full width on root container', () => {
      const { container } = render(<RegistrationBrand />);

      const fullWidth = container.querySelector('.w-full');
      expect(fullWidth).toBeInTheDocument();
    });

    it('should have items centered within brand container', () => {
      const { container } = render(<RegistrationBrand />);

      const itemsCenter = container.querySelector('.items-center');
      expect(itemsCenter).toBeInTheDocument();
    });
  });
});
