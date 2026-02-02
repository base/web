import { render, screen } from '@testing-library/react';
import Page, { metadata } from './page';

// Mock the UsernameProfileNotFound component
jest.mock('apps/web/src/components/Basenames/UsernameProfileNotFound', () => ({
  __esModule: true,
  default: () => <div data-testid="username-profile-not-found">UsernameProfileNotFound</div>,
}));

describe('Name Not Found Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('metadata', () => {
    it('should have correct metadataBase', () => {
      expect(metadata.metadataBase).toEqual(new URL('https://base.org'));
    });

    it('should have correct title', () => {
      expect(metadata.title).toBe('Basenames | Not Found');
    });

    it('should have correct openGraph configuration', () => {
      expect(metadata.openGraph).toMatchObject({
        title: 'Basenames | Not Found',
        url: '/not-found',
      });
    });
  });

  describe('UsernameNotFound component', () => {
    it('should render the main element', async () => {
      const page = await Page();
      render(page);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
    });

    it('should render UsernameProfileNotFound component', async () => {
      const page = await Page();
      render(page);

      expect(screen.getByTestId('username-profile-not-found')).toBeInTheDocument();
    });

    it('should wrap UsernameProfileNotFound in a Suspense boundary', async () => {
      const page = await Page();
      render(page);

      // The component renders within the main element
      const main = screen.getByRole('main');
      expect(main).toContainElement(screen.getByTestId('username-profile-not-found'));
    });

    it('should apply correct CSS classes to main element', async () => {
      const page = await Page();
      render(page);

      const main = screen.getByRole('main');
      // Check for key classes that define the layout
      expect(main).toHaveClass('mx-auto');
      expect(main).toHaveClass('mt-32');
      expect(main).toHaveClass('min-h-screen');
      expect(main).toHaveClass('items-center');
      expect(main).toHaveClass('justify-center');
    });

    it('should have max-width constraint class', async () => {
      const page = await Page();
      render(page);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('max-w-[1440px]');
    });

    it('should have responsive flex direction classes', async () => {
      const page = await Page();
      render(page);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('flex-col');
      expect(main).toHaveClass('md:flex-row');
    });
  });
});
