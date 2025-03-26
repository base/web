import ErrorsProvider from 'apps/web/contexts/Errors';
import type { Metadata } from 'next';
import NamesList from 'apps/web/src/components/Basenames/ManageNames/NamesList';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    title: `Basenames`,
    url: `/manage-names`,
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
        <NamesList />
      </main>
    </ErrorsProvider>
  );
}
