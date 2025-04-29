'use client';

import { AppConfig, OnchainKitProvider } from '@coinbase/onchainkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';
import { coinbaseWallet } from 'wagmi/connectors';
import { isDevelopment } from 'apps/web/src/constants';
import { cdpBaseRpcEndpoint, cdpBaseSepoliaRpcEndpoint } from 'apps/web/src/cdp/constants';

export type CryptoProvidersProps = {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
  theme?: 'default' | 'base' | 'cyberpunk' | 'hacker';
};

const config = createConfig({
  chains: [base, baseSepolia, mainnet],
  connectors: [coinbaseWallet()],
  transports: {
    [base.id]: http(cdpBaseRpcEndpoint),
    [baseSepolia.id]: http(cdpBaseSepoliaRpcEndpoint),
    [mainnet.id]: http(),
  },
  ssr: true,
});
const queryClient = new QueryClient();

export default function CryptoProviders({
  children,
  mode = 'light',
  theme = 'base',
}: CryptoProvidersProps) {
  const onchainKitConfig: AppConfig = useMemo(
    () => ({
      appearance: {
        mode,
        theme,
        name: 'Base',
      },
      wallet: {
        display: 'modal',
        supportedWallets: {
          rabby: true,
          trust: true,
        },
      },
    }),
    [mode, theme],
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider
          chain={isDevelopment ? baseSepolia : base}
          apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
          config={onchainKitConfig}
          projectId={process.env.NEXT_PUBLIC_CDP_PROJECT_ID}
        >
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
