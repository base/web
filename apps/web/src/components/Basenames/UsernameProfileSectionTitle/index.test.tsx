/**
 * @jest-environment jsdom
 */
import { render } from '@testing-library/react';
import UsernameProfileSectionTitle from './index';

// Mock the Icon component
jest.mock('apps/web/src/components/Icon/Icon', () => ({
  Icon: ({
    name,
    color,
    height,
  }: {
    name: string;
    color: string;
    height: string;
  }) => (
    <span data-testid="icon" data-name={name} data-color={color} data-height={height}>
      Icon
    </span>
  ),
}));

describe('UsernameProfileSectionTitle', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    it('should render an h3 heading element', () => {
      const { getByRole } = render(<UsernameProfileSectionTitle title="Test Title" />);

      const heading = getByRole('heading', { level: 3 });
      expect(heading).toBeInTheDocument();
    });

    it('should render the title text correctly', () => {
      const { getByText } = render(<UsernameProfileSectionTitle title="My Section" />);

      expect(getByText('My Section')).toBeInTheDocument();
    });

    it('should render different title texts', () => {
      const { rerender, getByText, queryByText } = render(
        <UsernameProfileSectionTitle title="First Title" />,
      );

      expect(getByText('First Title')).toBeInTheDocument();

      rerender(<UsernameProfileSectionTitle title="Second Title" />);

      expect(queryByText('First Title')).not.toBeInTheDocument();
      expect(getByText('Second Title')).toBeInTheDocument();
    });
  });

  describe('Icon component', () => {
    it('should render the Icon component', () => {
      const { getByTestId } = render(<UsernameProfileSectionTitle title="Test" />);

      const icon = getByTestId('icon');
      expect(icon).toBeInTheDocument();
    });

    it('should render the Icon with blueCircle name', () => {
      const { getByTestId } = render(<UsernameProfileSectionTitle title="Test" />);

      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-name', 'blueCircle');
    });

    it('should render the Icon with currentColor', () => {
      const { getByTestId } = render(<UsernameProfileSectionTitle title="Test" />);

      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-color', 'currentColor');
    });

    it('should render the Icon with height of 0.75rem', () => {
      const { getByTestId } = render(<UsernameProfileSectionTitle title="Test" />);

      const icon = getByTestId('icon');
      expect(icon).toHaveAttribute('data-height', '0.75rem');
    });
  });

  describe('styling', () => {
    it('should have flex styling on the heading', () => {
      const { container } = render(<UsernameProfileSectionTitle title="Test" />);

      const heading = container.querySelector('h3.flex');
      expect(heading).toBeInTheDocument();
    });

    it('should have blue text color on icon container', () => {
      const { container } = render(<UsernameProfileSectionTitle title="Test" />);

      const blueContainer = container.querySelector('.text-blue-600');
      expect(blueContainer).toBeInTheDocument();
    });

    it('should have medium font weight', () => {
      const { container } = render(<UsernameProfileSectionTitle title="Test" />);

      const fontMedium = container.querySelector('.font-medium');
      expect(fontMedium).toBeInTheDocument();
    });

    it('should have large text size', () => {
      const { container } = render(<UsernameProfileSectionTitle title="Test" />);

      const textLg = container.querySelector('.text-lg');
      expect(textLg).toBeInTheDocument();
    });

    it('should have items-baseline alignment for small screens', () => {
      const { container } = render(<UsernameProfileSectionTitle title="Test" />);

      const itemsBaseline = container.querySelector('.items-baseline');
      expect(itemsBaseline).toBeInTheDocument();
    });
  });

  describe('structure', () => {
    it('should contain two direct span children inside the heading', () => {
      const { container } = render(<UsernameProfileSectionTitle title="Test" />);

      const heading = container.querySelector('h3');
      const directSpans = heading?.querySelectorAll(':scope > span');
      expect(directSpans).toHaveLength(2);
    });

    it('should have the icon inside the first span', () => {
      const { container, getByTestId } = render(<UsernameProfileSectionTitle title="Test" />);

      const heading = container.querySelector('h3');
      const firstSpan = heading?.querySelector(':scope > span');
      const icon = getByTestId('icon');

      expect(firstSpan).toContainElement(icon);
    });

    it('should have the title text inside the second span', () => {
      const { container } = render(<UsernameProfileSectionTitle title="My Title" />);

      const heading = container.querySelector('h3');
      const directSpans = heading?.querySelectorAll(':scope > span');
      const secondSpan = directSpans?.[1];

      expect(secondSpan).toHaveTextContent('My Title');
    });
  });
});
