'use client';

import { useEffect, useState } from 'react';
import { useErrors } from 'apps/web/contexts/Errors';
import type { CryptoProvidersProps } from './CryptoProviders';

export function DynamicCryptoProviders({
  children,
  mode = 'light',
  theme = 'base',
  smartWalletOnly = false,
}: CryptoProvidersProps) {
  const [CryptoProvidersDynamic, setCryptoProvidersDynamic] = useState<
    React.ComponentType<{
      children: React.ReactNode;
      mode?: 'light' | 'dark';
      theme?: 'default' | 'base' | 'cyberpunk' | 'hacker';
      smartWalletOnly?: boolean;
    }>
  >();
  const { logError } = useErrors();

  useEffect(() => {
    import('apps/web/app/CryptoProviders')
      .then((mod) => {
        setCryptoProvidersDynamic(() => mod.default);
      })
      .catch((error) => logError(error, 'Failed to load CryptoProviders'));
  }, [logError]);

  if (!CryptoProvidersDynamic) return null;

  return (
    <CryptoProvidersDynamic mode={mode} theme={theme} smartWalletOnly={smartWalletOnly}>
      {children}
    </CryptoProvidersDynamic>
  );
}
