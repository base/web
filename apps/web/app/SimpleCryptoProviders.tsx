import { createConfig, http, WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { cdpBaseRpcEndpoint, cdpBaseSepoliaRpcEndpoint } from 'apps/web/src/cdp/constants';
import { base, baseSepolia, mainnet } from 'wagmi/chains';

const queryClient = new QueryClient();

const config = createConfig({
  connectors: [],
  chains: [base, baseSepolia, mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [base.id]: http(cdpBaseRpcEndpoint),
    [baseSepolia.id]: http(cdpBaseSepoliaRpcEndpoint),
    [mainnet.id]: http(),
  },
  ssr: true,
});

export function SimpleCryptoProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
