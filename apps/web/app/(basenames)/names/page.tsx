import RegistrationProviders from 'apps/web/app/(basenames)/names/RegistrationProviders';
import ErrorsProvider from 'apps/web/contexts/Errors';
import PoweredByEns from 'apps/web/src/components/Basenames/PoweredByEns';
import RegistrationFAQ from 'apps/web/src/components/Basenames/RegistrationFaq';
import RegistrationFlow from 'apps/web/src/components/Basenames/RegistrationFlow';
import RegistrationValueProp from 'apps/web/src/components/Basenames/RegistrationValueProp';
import type { Metadata } from 'next';
import basenameCover from './basename_cover.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Basenames`,
  description:
    'Basenames are a core onchain building block that enables anyone to establish their identity on Base by registering human-readable names for their address(es). They are a fully onchain solution which leverages ENS infrastructure deployed on Base.',
  openGraph: {
    title: `Basenames`,
    url: `/names`,
    images: [basenameCover.src],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

type PageProps = { searchParams?: { code?: string } };
export default async function Page({ searchParams }: PageProps) {
  const code = searchParams?.code;

  return (
    <ErrorsProvider context="registration">
      <RegistrationProviders code={code}>
        <main>
          <RegistrationFlow />
          <RegistrationValueProp />
          <PoweredByEns />
          <RegistrationFAQ />
        </main>
      </RegistrationProviders>
    </ErrorsProvider>
  );
}
