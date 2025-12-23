import type { Metadata } from 'next';
import { Suspense } from 'react';
import Content from 'apps/web/src/components/Ecosystem/Content';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { EcosystemHero } from 'apps/web/src/components/Ecosystem/Hero';
import { Split } from 'apps/web/app/(base-org)/enterprises/Split';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import { GenericHero } from 'apps/web/src/components/base-org/root/Redesign/GenericHero';
import ShopifyBlogContent from './ShopifyBlogContent';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Ecosystem`,
  openGraph: {
    title: `Base | Enterprises`,
    url: `/enterprises`,
  },
};

export default async function Shopify() {
  return (
    <>
      <AnalyticsProvider context="enterprises-shopify">
        <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
          <div className="-z-1 h-full w-full">
            <WebGLCanvas />
          </div>
        </div>
        <Container className="lg:pt-0">
          <div className="col-span-full flex flex-col gap-12">
            {/* <Hero /> */}
            {/* <EcosystemHero /> */}
            <GenericHero
              title="Shopify"
              imageUrl={'/images/backgrounds/partnerships.webp'}
              variant="compact"
            />
            <div className="flex flex-col gap-12">
              <ShopifyBlogContent className="font-sans" />
            </div>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
