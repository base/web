/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import PoweredByEns from './index';
import { RegistrationSteps } from 'apps/web/src/components/Basenames/RegistrationContext';

// Mock the RegistrationContext
const mockUseRegistration = jest.fn();
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  RegistrationSteps: {
    Search: 'search',
    Claim: 'claim',
    Pending: 'pending',
    Success: 'success',
    Profile: 'profile',
  },
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  useRegistration: () => mockUseRegistration(),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, className }: { src: string; alt: string; className: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img data-testid="next-image" src={src} alt={alt} className={className} />
  ),
}));

describe('PoweredByEns', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRegistration.mockReturnValue({
      registrationStep: RegistrationSteps.Search,
    });
  });

  describe('visibility based on registration step', () => {
    it('should be visible when registrationStep is Search', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).not.toHaveClass('hidden');
    });

    it('should be hidden when registrationStep is Claim', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Claim,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registrationStep is Pending', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Pending,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registrationStep is Success', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Success,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registrationStep is Profile', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Profile,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section');
      expect(section).toHaveClass('hidden');
    });
  });

  describe('content rendering', () => {
    it('should render the main heading text', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      expect(screen.getByText('Decentralized and open source')).toBeInTheDocument();
    });

    it('should render the description text', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      expect(
        screen.getByText(/Basenames are built on the decentralized, open source ENS protocol/),
      ).toBeInTheDocument();
    });

    it('should render Base and ENS images', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const images = screen.getAllByTestId('next-image');
      expect(images.length).toBe(2);
    });
  });

  describe('decorative circles', () => {
    it('should render multiple decorative circles', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      // The Circle component renders divs with absolute and rounded-full classes
      const circles = document.querySelectorAll('.absolute.rounded-full');
      // Should have 10 decorative circles based on the component
      expect(circles.length).toBe(10);
    });

    it('should render circles with gray-40 background color', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const grayCircles = document.querySelectorAll('.bg-gray-40');
      expect(grayCircles.length).toBe(3);
    });

    it('should render circles with pink-15 background color', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const pinkCircles = document.querySelectorAll('.bg-pink-15');
      expect(pinkCircles.length).toBe(3);
    });

    it('should render circles with green-15 background color', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const greenCircles = document.querySelectorAll('.bg-green-15');
      expect(greenCircles.length).toBe(2);
    });

    it('should render circles with blue-15 background color', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const blueCircles = document.querySelectorAll('.bg-blue-15');
      expect(blueCircles.length).toBe(2);
    });
  });

  describe('layout structure', () => {
    it('should have a section with z-10 class', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section.z-10');
      expect(section).toBeInTheDocument();
    });

    it('should have a flex container with column direction', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const flexContainer = document.querySelector('.flex.flex-col');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should have text content container with correct width classes', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const textContainer = document.querySelector('.w-full.px-4.text-left');
      expect(textContainer).toBeInTheDocument();
    });

    it('should have graphic container with order-last class on mobile', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const graphicContainer = document.querySelector('.order-last');
      expect(graphicContainer).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    it('should have max-w-7xl class on section', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section.max-w-7xl');
      expect(section).toBeInTheDocument();
    });

    it('should have mx-auto for centering', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section.mx-auto');
      expect(section).toBeInTheDocument();
    });

    it('should have responsive padding classes', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const section = document.querySelector('section');
      expect(section).toHaveClass('pt-[calc(20vh)]');
    });

    it('should have heading with correct text size classes', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const heading = document.querySelector('.text-5xl');
      expect(heading).toBeInTheDocument();
    });

    it('should have description with text-xl class', () => {
      mockUseRegistration.mockReturnValue({
        registrationStep: RegistrationSteps.Search,
      });

      render(<PoweredByEns />);

      const description = document.querySelector('.text-xl');
      expect(description).toBeInTheDocument();
    });
  });
});
