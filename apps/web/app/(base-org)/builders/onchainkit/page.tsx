import type { Metadata } from 'next';
import Container from 'apps/web/src/components/base-org/Container';
import { InfoCards } from 'apps/web/src/components/Builders/Onchainkit/InfoCards';
import { Templates } from 'apps/web/src/components/Builders/Onchainkit/Templates';
import { Testmonials } from 'apps/web/src/components/Builders/Onchainkit/Testimonials';
import { LiveDemo } from 'apps/web/src/components/Builders/Shared/LiveDemo';
import { Hero } from 'apps/web/src/components/Builders/Onchainkit/Hero';
import { CtaBanner } from 'apps/web/src/components/Builders/Onchainkit/CtaBanner';

const demoComponents = ['Wallet', 'Buy', 'Fund', 'Earn', 'Transact'];

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | OnchainKit`,
  openGraph: {
    title: `Base | OnchainKit`,
    url: `/builders/onchainkit`,
  },
};

export default function OnchainKit() {
  return (
    <Container>
      <main className="mb-32 flex min-h-screen w-full flex-col gap-40 bg-black px-2 pt-20 sm:items-center md:px-0">
        <Hero />
        <LiveDemo components={demoComponents} />
        <InfoCards />
        <Templates />
        <Testmonials />
        <CtaBanner />
      </main>
    </Container>
  );
}
