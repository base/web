import { render, screen } from '@testing-library/react';
import Page, { metadata } from './page';

// Mock the ErrorsProvider
jest.mock('apps/web/contexts/Errors', () => ({
  __esModule: true,
  default: ({ children, context }: { children: React.ReactNode; context: string }) => (
    <div data-testid="errors-provider" data-context={context}>
      {children}
    </div>
  ),
}));

// Mock the NamesList component
jest.mock('apps/web/src/components/Basenames/ManageNames/NamesList', () => ({
  __esModule: true,
  default: () => <div data-testid="names-list">NamesList</div>,
}));

describe('Manage Names Page', () => {
  describe('metadata', () => {
    it('should have correct metadataBase', () => {
      expect(metadata.metadataBase).toEqual(new URL('https://base.org'));
    });

    it('should have correct title', () => {
      expect(metadata.title).toBe('Basenames');
    });

    it('should have correct description', () => {
      expect(metadata.description).toContain('Basenames are a core onchain building block');
      expect(metadata.description).toContain('ENS infrastructure deployed on Base');
    });

    it('should have correct openGraph configuration', () => {
      expect(metadata.openGraph).toEqual({
        title: 'Basenames',
        url: '/manage-names',
      });
    });

    it('should have correct twitter configuration', () => {
      expect(metadata.twitter).toEqual({
        site: '@base',
        card: 'summary_large_image',
      });
    });
  });

  describe('Page component', () => {
    it('should render ErrorsProvider with registration context', async () => {
      const page = await Page();
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      expect(errorsProvider).toBeInTheDocument();
      expect(errorsProvider).toHaveAttribute('data-context', 'registration');
    });

    it('should render NamesList component', async () => {
      const page = await Page();
      render(page);

      expect(screen.getByTestId('names-list')).toBeInTheDocument();
    });

    it('should render main element containing NamesList', async () => {
      const page = await Page();
      render(page);

      const main = screen.getByRole('main');
      expect(main).toBeInTheDocument();
      expect(main).toContainElement(screen.getByTestId('names-list'));
    });

    it('should have correct nesting order (ErrorsProvider > main > NamesList)', async () => {
      const page = await Page();
      render(page);

      const errorsProvider = screen.getByTestId('errors-provider');
      const main = screen.getByRole('main');
      const namesList = screen.getByTestId('names-list');

      expect(errorsProvider).toContainElement(main);
      expect(main).toContainElement(namesList);
    });

    it('should apply mt-48 class to main element', async () => {
      const page = await Page();
      render(page);

      const main = screen.getByRole('main');
      expect(main).toHaveClass('mt-48');
    });
  });
});
