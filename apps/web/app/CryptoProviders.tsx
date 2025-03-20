'use client';

import { AppConfig, OnchainKitProvider } from '@coinbase/onchainkit';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  phantomWallet,
  rainbowWallet,
  uniswapWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { base, baseSepolia, mainnet } from 'wagmi/chains';
import { isDevelopment } from 'apps/web/src/constants';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        coinbaseWallet,
        metaMaskWallet,
        uniswapWallet,
        rainbowWallet,
        phantomWallet,
        walletConnectWallet,
      ],
    },
  ],
  {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? 'dummy-id',
    walletConnectParameters: {},
    appName: 'Base.org',
    appDescription: '',
    appUrl: 'https://www.base.org/',
    appIcon: '',
  },
);

const config = createConfig({
  connectors,
  chains: [base, baseSepolia, mainnet],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true,
});
const queryClient = new QueryClient();

export type CryptoProvidersProps = {
  children: React.ReactNode;
  mode?: 'light' | 'dark';
  theme?: 'default' | 'base' | 'cyberpunk' | 'hacker';
};

export default function CryptoProviders({
  children,
  mode = 'light',
  theme = 'default',
}: CryptoProvidersProps) {
  const onchainKitConfig: AppConfig = useMemo(
    () => ({
      appearance: {
        mode,
        theme,
      },
      wallet: {
        display: 'modal',
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
          <RainbowKitProvider modalSize="compact">{children}</RainbowKitProvider>
        </OnchainKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
