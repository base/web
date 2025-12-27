'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import type { CryptoProvidersProps } from './CryptoProviders';
import Loader from './Loader'; // Assumed component for loading fallback

// --- Custom Dynamic Load Component ---

/**
 * Custom dynamic wrapper for CryptoProviders, primarily to handle external error logging.
 *
 * NOTE: The 'use client' directive is correctly placed at the top of the file
 * as dynamic imports often rely on client-side features.
 *
 * @param props - Props passed to the underlying CryptoProviders component.
 */
export function DynamicCryptoProviders({
  children,
  mode = 'light',
  theme = 'base',
  smartWalletOnly = false,
}: CryptoProvidersProps) {
  const { logError } = useErrors();

  // Dynamically import the CryptoProviders component.
  // ssr: false ensures this heavy component is only loaded on the client side.
  const CryptoProvidersDynamic = dynamic(
    () =>
      import('apps/web/app/CryptoProviders').catch((error) => {
        // Catch the load failure and log it using the context hook.
        logError(error, 'Failed to dynamically load CryptoProviders');
        // Re-throw or return a component that handles the error state if needed.
        throw error;
      }),
    {
      // Optional: Set a fallback component to show while the providers are loading.
      loading: () => <Loader />, 
      // Crucial for Web3/Wallet providers to avoid SSR issues with 'window' object.
      ssr: false, 
    },
  );

  return (
    <CryptoProvidersDynamic mode={mode} theme={theme} smartWalletOnly={smartWalletOnly}>
      {children}
    </CryptoProvidersDynamic>
  );
}

// NOTE on Loader Component:
// For completeness, here is a mock Loader component:
/*
import React from 'react';
const Loader = () => (
  <div style={{ minHeight: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
    Loading Wallet Providers...
  </div>
);
*/
