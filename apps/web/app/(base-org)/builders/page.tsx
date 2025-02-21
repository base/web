import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Landing/Hero';
import { UseCases } from 'apps/web/src/components/Builders/Landing/UseCases';
import { Apps } from 'apps/web/src/components/Builders/Landing/Apps';
import { Testimonials } from 'apps/web/src/components/Builders/Landing/Testimonials';
import { Tools } from 'apps/web/src/components/Builders/Landing/Tools';
import { WhyBase } from 'apps/web/src/components/Builders/Landing/WhyBase';
import { LiveDemo } from 'apps/web/src/components/Builders/Landing/LiveDemo';
import { BottomCta } from 'apps/web/src/components/Builders/Shared/BottomCta';
import buildersCover from './builders.png';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Builders`,
  openGraph: {
    title: `Base | Builders`,
    url: `/builders`,
    images: [buildersCover.src],
  },
};

export default function Developers() {
  return (
    <AnalyticsProvider context="developers">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero />
        <Container className="!px-[1.5rem] lg:!px-[2rem]">
          <UseCases />
          <Tools />
          <Apps />
          <Testimonials />
          <WhyBase />
          <LiveDemo />
          <BottomCta />
        </Container>
      </main>
    </AnalyticsProvider>
  );
}
