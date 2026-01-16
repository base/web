/**
 * @jest-environment jsdom
 */
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationFAQ from './index';

// Mock registration step value
let mockRegistrationStep = 'search';

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

// Mock base-ui Icon component
jest.mock('base-ui', () => ({
  Icon: ({
    name,
    width,
    height,
    color,
  }: {
    name: string;
    width: string;
    height: string;
    color: string;
  }) => (
    <span data-testid="icon" data-name={name} data-width={width} data-height={height} data-color={color}>
      Icon
    </span>
  ),
}));

function clickButton(element: HTMLElement | null) {
  if (element) {
    fireEvent.click(element);
  }
}

describe('RegistrationFAQ', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockRegistrationStep = 'search';
  });

  describe('visibility based on registration step', () => {
    it('should be visible when registration step is Search', () => {
      mockRegistrationStep = 'search';
      const { container } = render(<RegistrationFAQ />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).not.toHaveClass('hidden');
    });

    it('should be hidden when registration step is Claim', () => {
      mockRegistrationStep = 'claim';
      const { container } = render(<RegistrationFAQ />);

      const section = container.querySelector('section');
      expect(section).toBeInTheDocument();
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registration step is Pending', () => {
      mockRegistrationStep = 'pending';
      const { container } = render(<RegistrationFAQ />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registration step is Success', () => {
      mockRegistrationStep = 'success';
      const { container } = render(<RegistrationFAQ />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });

    it('should be hidden when registration step is Profile', () => {
      mockRegistrationStep = 'profile';
      const { container } = render(<RegistrationFAQ />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('hidden');
    });
  });

  describe('content rendering', () => {
    it('should render the FAQ heading', () => {
      render(<RegistrationFAQ />);

      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Questions?');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('See our FAQ');
    });

    it('should render the introductory paragraph', () => {
      render(<RegistrationFAQ />);

      expect(
        screen.getByText(/Get more answers in our FAQ, and view our developer docs/)
      ).toBeInTheDocument();
    });

    it('should render all FAQ questions', () => {
      render(<RegistrationFAQ />);

      expect(screen.getByText('What are Basenames?')).toBeInTheDocument();
      expect(screen.getByText('What are the Basename registration fees?')).toBeInTheDocument();
      expect(screen.getByText('How do I get a free or discounted Basename?')).toBeInTheDocument();
      expect(screen.getByText('How can I use Basenames?')).toBeInTheDocument();
      expect(screen.getByText('Is my profile information published onchain?')).toBeInTheDocument();
      expect(
        screen.getByText('I am a builder. How do I integrate Basenames to my app?')
      ).toBeInTheDocument();
      expect(screen.getByText('How do I get a Basename for my app or project?')).toBeInTheDocument();
    });

    it('should render FAQ items as buttons', () => {
      render(<RegistrationFAQ />);

      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(7);
    });
  });

  describe('FaqItem toggle behavior', () => {
    it('should start with answer hidden (max-h-0)', () => {
      const { container } = render(<RegistrationFAQ />);

      const answerContainers = container.querySelectorAll('.max-h-0');
      expect(answerContainers.length).toBeGreaterThan(0);
    });

    it('should expand answer when clicking the question button', () => {
      const { container } = render(<RegistrationFAQ />);

      const firstQuestion = screen.getByText('What are Basenames?');
      const firstButton = firstQuestion.closest('button');

      expect(firstButton).toBeInTheDocument();
      clickButton(firstButton);

      // After clicking, the answer container should have max-h-screen
      const expandedContainers = container.querySelectorAll('.max-h-screen');
      expect(expandedContainers.length).toBeGreaterThan(0);
    });

    it('should collapse answer when clicking the question button again', () => {
      const { container } = render(<RegistrationFAQ />);

      const firstQuestion = screen.getByText('What are Basenames?');
      const firstButton = firstQuestion.closest('button');

      // Click to expand
      clickButton(firstButton);
      expect(container.querySelectorAll('.max-h-screen').length).toBeGreaterThan(0);

      // Click to collapse
      clickButton(firstButton);

      // All items should be collapsed (max-h-0)
      const collapsedContainers = container.querySelectorAll('.max-h-0');
      expect(collapsedContainers.length).toBe(7);
    });

    it('should allow multiple FAQ items to be expanded independently', () => {
      const { container } = render(<RegistrationFAQ />);

      const firstQuestion = screen.getByText('What are Basenames?');
      const secondQuestion = screen.getByText('How can I use Basenames?');

      clickButton(firstQuestion.closest('button'));
      clickButton(secondQuestion.closest('button'));

      // Both should be expanded
      const expandedContainers = container.querySelectorAll('.max-h-screen');
      expect(expandedContainers.length).toBe(2);
    });
  });

  describe('FAQ answer content', () => {
    it('should contain answer content for What are Basenames when expanded', () => {
      render(<RegistrationFAQ />);

      const question = screen.getByText('What are Basenames?');
      clickButton(question.closest('button'));

      expect(
        screen.getByText(/Basenames are a core onchain building block/)
      ).toBeInTheDocument();
    });

    it('should contain price table for registration fees when expanded', () => {
      render(<RegistrationFAQ />);

      const question = screen.getByText('What are the Basename registration fees?');
      clickButton(question.closest('button'));

      expect(screen.getByText('3 characters')).toBeInTheDocument();
      expect(screen.getByText('0.1 ETH')).toBeInTheDocument();
      expect(screen.getByText('4 characters')).toBeInTheDocument();
      expect(screen.getByText('0.01 ETH')).toBeInTheDocument();
      expect(screen.getByText('5-9 characters')).toBeInTheDocument();
      expect(screen.getByText('0.001 ETH')).toBeInTheDocument();
      expect(screen.getByText('10+ characters')).toBeInTheDocument();
      expect(screen.getByText('0.0001 ETH')).toBeInTheDocument();
    });

    it('should contain links for discounts FAQ when expanded', () => {
      render(<RegistrationFAQ />);

      const question = screen.getByText('How do I get a free or discounted Basename?');
      clickButton(question.closest('button'));

      const coinbaseVerificationLink = screen.getAllByRole('link', {
        name: /Coinbase Verification/i,
      })[0];
      expect(coinbaseVerificationLink).toHaveAttribute('href', 'http://coinbase.com/onchain-verify');
    });

    it('should contain OnchainKit link for builder FAQ when expanded', () => {
      render(<RegistrationFAQ />);

      const question = screen.getByText('I am a builder. How do I integrate Basenames to my app?');
      clickButton(question.closest('button'));

      const onchainKitLink = screen.getByRole('link', { name: 'OnchainKit' });
      expect(onchainKitLink).toHaveAttribute('href', 'https://github.com/coinbase/onchainkit');
    });
  });

  describe('layout structure', () => {
    it('should have max-w-6xl container', () => {
      const { container } = render(<RegistrationFAQ />);

      const section = container.querySelector('section');
      expect(section).toHaveClass('max-w-6xl');
    });

    it('should have flex layout for content', () => {
      const { container } = render(<RegistrationFAQ />);

      const flexContainer = container.querySelector('.flex.flex-col');
      expect(flexContainer).toBeInTheDocument();
    });

    it('should render icon for each FAQ item button', () => {
      render(<RegistrationFAQ />);

      const icons = screen.getAllByTestId('icon');
      expect(icons).toHaveLength(7);
      icons.forEach((icon) => {
        expect(icon).toHaveAttribute('data-name', 'caret');
      });
    });
  });
});
