import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Developers/Hero';
import { UseCases } from 'apps/web/src/components/Developers/UseCases';
import { Customers } from 'apps/web/src/components/Developers/Customers';
import { Testimonials } from 'apps/web/src/components/Developers/Testimonials';
import { Tools } from 'apps/web/src/components/Developers/Tools';
import { WhyBase } from 'apps/web/src/components/Developers/WhyBase';
import { LiveDemo } from 'apps/web/src/components/Developers/LiveDemo';
import { BottomCta } from 'apps/web/src/components/Developers/BottomCta';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Developers`,
  openGraph: {
    title: `Base | Developers`,
    url: `/developers`,
  },
};

export default async function Developers() {
  return (
    <AnalyticsProvider context="developers">
      <Container>
        <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black">
          <Hero />
          <UseCases />
          <Customers />
          <Testimonials />
          <Tools />
          <WhyBase />
          <LiveDemo />
          <BottomCta />
        </main>
      </Container>
    </AnalyticsProvider>
  );
}
