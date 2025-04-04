import ErrorsProvider from 'apps/web/contexts/Errors';
import type { Metadata } from 'next';
import RenewNames from 'apps/web/src/components/Basenames/RenewNames/RenewNames';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Renew Basenames`,
  description:
    'Renew your Basenames to maintain your identity on Base. Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es).',
  openGraph: {
    title: `Renew Basenames`,
    url: `/renew-names`,
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

export default async function Page() {
  return (
    <ErrorsProvider context="registration">
      <main className="mt-48">
        <RenewNames />
      </main>
    </ErrorsProvider>
  );
} 