import { render, screen } from '@testing-library/react';
import BasenameLayout, { metadata } from './layout';

// Mock the providers and components
jest.mock('apps/web/app/CryptoProviders', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="crypto-providers">{children}</div>
  ),
}));

jest.mock('apps/web/contexts/Errors', () => ({
  __esModule: true,
  default: ({ children, context }: { children: React.ReactNode; context: string }) => (
    <div data-testid="errors-provider" data-context={context}>
      {children}
    </div>
  ),
}));

jest.mock('apps/web/src/components/Layout/UsernameNav', () => ({
  __esModule: true,
  default: () => <nav data-testid="username-nav">Username Nav</nav>,
}));

describe('BasenameLayout', () => {
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
        type: 'website',
        title: 'Basenames',
        url: '/',
        images: ['https://base.org/images/base-open-graph.png'],
      });
    });

    it('should have correct twitter configuration', () => {
      expect(metadata.twitter).toEqual({
        site: '@base',
        card: 'summary_large_image',
      });
    });
  });

  describe('BasenameLayout component', () => {
    it('should render children within the layout', async () => {
      const layout = await BasenameLayout({
        children: <div data-testid="test-child">Test Child Content</div>,
      });

      render(layout);

      expect(screen.getByTestId('test-child')).toBeInTheDocument();
      expect(screen.getByText('Test Child Content')).toBeInTheDocument();
    });

    it('should wrap children with ErrorsProvider with basenames context', async () => {
      const layout = await BasenameLayout({
        children: <div>Child</div>,
      });

      render(layout);

      const errorsProvider = screen.getByTestId('errors-provider');
      expect(errorsProvider).toBeInTheDocument();
      expect(errorsProvider).toHaveAttribute('data-context', 'basenames');
    });

    it('should wrap children with CryptoProviders', async () => {
      const layout = await BasenameLayout({
        children: <div>Child</div>,
      });

      render(layout);

      expect(screen.getByTestId('crypto-providers')).toBeInTheDocument();
    });

    it('should render UsernameNav', async () => {
      const layout = await BasenameLayout({
        children: <div>Child</div>,
      });

      render(layout);

      expect(screen.getByTestId('username-nav')).toBeInTheDocument();
    });

    it('should nest providers in correct order (ErrorsProvider > CryptoProviders)', async () => {
      const layout = await BasenameLayout({
        children: <div data-testid="child">Child</div>,
      });

      render(layout);

      const errorsProvider = screen.getByTestId('errors-provider');
      const cryptoProviders = screen.getByTestId('crypto-providers');

      // ErrorsProvider should contain CryptoProviders
      expect(errorsProvider).toContainElement(cryptoProviders);
    });

    it('should render layout with proper structure containing nav and children', async () => {
      const layout = await BasenameLayout({
        children: <div data-testid="page-content">Page Content</div>,
      });

      render(layout);

      const nav = screen.getByTestId('username-nav');
      const content = screen.getByTestId('page-content');

      // Both nav and content should be present
      expect(nav).toBeInTheDocument();
      expect(content).toBeInTheDocument();
    });
  });
});
