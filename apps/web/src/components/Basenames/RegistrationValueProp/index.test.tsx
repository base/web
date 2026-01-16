/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import RegistrationValueProp from './index';
import { RegistrationSteps } from 'apps/web/src/components/Basenames/RegistrationContext';

// Mock variables that can be changed per test
let mockRegistrationStep: RegistrationSteps = RegistrationSteps.Search;

// Mock the RegistrationContext
jest.mock('apps/web/src/components/Basenames/RegistrationContext', () => ({
  RegistrationSteps: {
    Search: 'search',
    Claim: 'claim',
    Pending: 'pending',
    Success: 'success',
    Profile: 'profile',
  },
  useRegistration: () => ({
    registrationStep: mockRegistrationStep,
  }),
}));

// Mock the ImageAdaptive component
jest.mock('apps/web/src/components/ImageAdaptive', () => ({
  __esModule: true,
  default: ({ alt, src }: { alt: string; src: string }) => (
    <img data-testid={`image-${alt.toLowerCase().replace(/\s+/g, '-')}`} alt={alt} src={src} />
  ),
}));

// Mock the asset imports
jest.mock('./assets/faceScan.svg', () => 'face-scan-mock.svg', { virtual: true });
jest.mock('./assets/currencies.svg', () => 'currencies-mock.svg', { virtual: true });
jest.mock('./assets/sofort.svg', () => 'sofort-mock.svg', { virtual: true });
jest.mock('./assets/globeWhite.webm', () => 'globe-mock.webm', { virtual: true });

describe('RegistrationValueProp', () => {
  beforeEach(() => {
    mockRegistrationStep = RegistrationSteps.Search;
  });

  describe('visibility based on registration step', () => {
    it('should be visible when registration step is Search', () => {
      mockRegistrationStep = RegistrationSteps.Search;

      const { container } = render(<RegistrationValueProp />);

      const section = container.querySelector('section');
      expect(section).not.toHaveClass('hidden');
    });

    it('should be hidden when registration step is Claim', () => {
      mockRegistrationStep = RegistrationSteps.Claim;

      const { container } = render(<RegistrationValueProp />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registration step is Pending', () => {
      mockRegistrationStep = RegistrationSteps.Pending;

      const { container } = render(<RegistrationValueProp />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registration step is Success', () => {
      mockRegistrationStep = RegistrationSteps.Success;

      const { container } = render(<RegistrationValueProp />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registration step is Profile', () => {
      mockRegistrationStep = RegistrationSteps.Profile;

      const { container } = render(<RegistrationValueProp />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });
  });

  describe('main heading', () => {
    it('should render the main heading text', () => {
      render(<RegistrationValueProp />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Get so much more on Base with your profile',
      );
    });
  });

  describe('value propositions', () => {
    it('should render "Build your onchain identity" value prop', () => {
      render(<RegistrationValueProp />);

      expect(
        screen.getByRole('heading', { level: 3, name: 'Build your onchain identity' }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Use your Basename as your onchain identity in the Base ecosystem.'),
      ).toBeInTheDocument();
    });

    it('should render "Simplify transactions" value prop', () => {
      render(<RegistrationValueProp />);

      expect(
        screen.getByRole('heading', { level: 3, name: 'Simplify transactions' }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Send and receive seamlessly with a readable and memorable Basename.'),
      ).toBeInTheDocument();
    });

    it('should render "Connect and collaborate" value prop', () => {
      render(<RegistrationValueProp />);

      expect(
        screen.getByRole('heading', { level: 3, name: 'Connect and collaborate' }),
      ).toBeInTheDocument();
      expect(
        screen.getByText('Easily find mentors and others to build with by seeing their profiles.'),
      ).toBeInTheDocument();
    });

    it('should render images for all three value props', () => {
      render(<RegistrationValueProp />);

      expect(screen.getByTestId('image-build-your-onchain-identity')).toBeInTheDocument();
      expect(screen.getByTestId('image-simplify-transactions')).toBeInTheDocument();
      expect(screen.getByTestId('image-connect-and-collaborate')).toBeInTheDocument();
    });

    it('should render all value props with correct image alt text', () => {
      render(<RegistrationValueProp />);

      expect(screen.getByAltText('Build your onchain identity')).toBeInTheDocument();
      expect(screen.getByAltText('Simplify transactions')).toBeInTheDocument();
      expect(screen.getByAltText('Connect and collaborate')).toBeInTheDocument();
    });
  });

  describe('background video', () => {
    it('should render a video element', () => {
      render(<RegistrationValueProp />);

      const video = document.querySelector('video');
      expect(video).toBeInTheDocument();
    });

    it('should have autoPlay attribute on video', () => {
      render(<RegistrationValueProp />);

      const video = document.querySelector('video');
      expect(video).toHaveAttribute('autoplay');
    });

    it('should have loop attribute on video', () => {
      render(<RegistrationValueProp />);

      const video = document.querySelector('video');
      expect(video).toHaveAttribute('loop');
    });

    it('should have muted attribute on video', () => {
      render(<RegistrationValueProp />);

      const video = document.querySelector('video');
      expect(video?.muted).toBe(true);
    });

    it('should have playsInline attribute on video', () => {
      render(<RegistrationValueProp />);

      const video = document.querySelector('video');
      expect(video).toHaveAttribute('playsinline');
    });

    it('should have motion-reduce:hidden class for accessibility', () => {
      render(<RegistrationValueProp />);

      const video = document.querySelector('video');
      expect(video).toHaveClass('motion-reduce:hidden');
    });
  });

  describe('layout structure', () => {
    it('should have correct grid layout structure', () => {
      render(<RegistrationValueProp />);

      // Check that the grid container has the expected classes
      const gridContainer = document.querySelector('.grid');
      expect(gridContainer).toBeInTheDocument();
      expect(gridContainer).toHaveClass('grid-cols-1');
      expect(gridContainer).toHaveClass('sm:grid-cols-2');
    });

    it('should render exactly three value prop cards', () => {
      render(<RegistrationValueProp />);

      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
    });
  });
});
