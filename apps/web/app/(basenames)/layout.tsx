import CryptoProviders from 'apps/web/app/CryptoProviders';
import ErrorsProvider from 'apps/web/contexts/Errors';
import UsernameNav from 'apps/web/src/components/Layout/UsernameNav';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    type: 'website',
    title: `Basenames`,
    url: `/`,
    images: ['https://base.org/images/base-open-graph.png'],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

export default async function BasenameLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorsProvider context="basenames">
      <CryptoProviders>
        <div className="max-w-screen flex min-h-screen flex-col">
          <UsernameNav />
          {children}
        </div>
      </CryptoProviders>
    </ErrorsProvider>
  );
}
