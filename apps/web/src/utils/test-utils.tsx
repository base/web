import React, { ReactElement } from 'react';
import { render as rtlRender, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Create a custom render function that includes providers
function AllTheProviders({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  rtlRender(ui, { wrapper: AllTheProviders, ...options });

// Mock implementations for common hooks
export const mockUseAccount = (overrides: Record<string, unknown> = {}) => {
  const wagmiMocks = jest.requireMock('wagmi');
  wagmiMocks.useAccount.mockReturnValue({
    address: undefined,
    isConnecting: false,
    isDisconnected: true,
    ...overrides,
  });
};

export const mockUseNameList = (overrides: Record<string, unknown> = {}) => {
  jest.doMock('apps/web/src/components/Basenames/ManageNames/hooks', () => ({
    useNameList: () => ({
      namesData: null,
      isLoading: false,
      ...overrides,
    }),
  }));
};

export const mockUseBasenameChain = (overrides: Record<string, unknown> = {}) => {
  jest.doMock('apps/web/src/hooks/useBasenameChain', () => ({
    __esModule: true,
    default: () => ({
      basenameChain: { id: 8453 },
      ...overrides,
    }),
  }));
};

// Re-export everything from testing-library except render
export * from '@testing-library/react';

// Override render method
export { customRender as render };

// Helper to create test data
export const createMockNameData = (overrides: Record<string, unknown> = {}) => ({
  domain: 'test.base.eth',
  owner: '0x123',
  expiry: '2025-12-31',
  ...overrides,
});

// Helper to wait for async operations
export const waitForAsyncOperations = async (): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, 0));
