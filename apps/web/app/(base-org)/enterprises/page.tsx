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
import { SolutionText } from './SolutionText';
import { GenericHero } from './GenericHero';
import { CaseStudyCard } from 'apps/web/app/(base-org)/enterprises/CaseStudyCard';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Ecosystem`,
  openGraph: {
    title: `Base | Enterprises`,
    url: `/enterprises`,
  },
};

import assetImage from './images/asset.png';
import bankingImage from './images/banking.png';
import loyaltyImage from './images/loyalty.png';
import paymentsImage from './images/payments.png';

import Image from 'next/image';

export default async function Enterprises() {
  return (
    <>
      <AnalyticsProvider context="enterprises">
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
              title="Enterprises"
              imageUrl={'/images/backgrounds/partnerships.webp'}
              buttons={[{ text: 'Build on Base', href: '/enterprises/build' }]}
            />
            <div className="flex flex-col gap-12">
              <Split>
                <Split.Text>
                  <SolutionText
                    eyebrow="Payments"
                    title="Instant global payments"
                    description="Simple, borderless, low-cost payments for merchants, with support for 15+ local stablecoins. Instant settlement on 24/7 payment rails."
                  />
                </Split.Text>
                <Split.Content>
                  <div className="h-full w-full ">
                    <Image
                      src={paymentsImage}
                      width={1080}
                      height={1080}
                      alt="Payments"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Split.Content>
              </Split>

              <Split reverse>
                <Split.Text>
                  <SolutionText
                    eyebrow="Onchain Finance"
                    title="Asset Flexibility & Freedom"
                    description="Borrow, lend, and earn at competitive rates through decentralized protocols running on Base. Offer savings accounts and collateralized loans powered by audited, compliant smart contracts."
                  />
                </Split.Text>
                <Split.Content>
                  <div className="h-full w-full ">
                    <Image
                      src={assetImage}
                      width={1080}
                      height={1080}
                      alt="Asset"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Split.Content>
              </Split>

              <Split>
                <Split.Text>
                  <SolutionText
                    eyebrow="Tokenization"
                    title="24/7 Banking without Borders"
                    description="Keep assets at the bank, while taking advantage of programmable, global, instant onchain rails."
                  />
                </Split.Text>
                <Split.Content>
                  <div className="h-full w-full ">
                    <Image
                      src={bankingImage}
                      width={1080}
                      height={1080}
                      alt="Banking"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </Split.Content>
              </Split>

              <Split reverse>
                <Split.Text>
                  <SolutionText
                    eyebrow="Loyalty"
                    title="Loyalty programs"
                    description=" Brand-first rewards that feel seamless to customers. Use blockchain under the hood, not in their face."
                  />
                </Split.Text>
                <Split.Content>
                  <Image
                    src={loyaltyImage}
                    width={1080}
                    height={1080}
                    alt="Loyalty"
                    className="h-full w-full object-cover"
                  />
                </Split.Content>
              </Split>

              <div className="grid gap-10 md:grid-cols-1 lg:grid-cols-3">
                <div className="col-span-full">
                  <div className="flex max-w-md flex-col gap-2">
                    <Title level={TitleLevel.H5Regular}>Case studies</Title>
                    <Text variant={TextVariant.BodyLarge}>
                      Explore how leading enterprises use Base for payments, finance, tokenized
                      holdings, and loyalty.
                    </Text>
                  </div>
                </div>
                <CaseStudyCard
                  name="Shopify"
                  tag="Payments"
                  description="Simple, borderless, low-cost payments for merchants, with support for 15+ local stablecoins. Instant settlement on 24/7 payment rails."
                  slug="/enterprises/shopify"
                  image="/images/enterprises/shopify.png"
                />
                <CaseStudyCard
                  name="JP Morgan"
                  tag="Onchain Finance"
                  description="Simple, borderless, low-cost payments for merchants, with support for 15+ local stablecoins. Instant settlement on 24/7 payment rails."
                  slug="/enterprises/shopify"
                  image="/images/enterprises/jpmorgan.jpeg"
                />
                <CaseStudyCard
                  name="Coinbase"
                  tag="Tokenization"
                  description="Keep assets at the bank, while taking advantage of programmable, global, instant onchain rails."
                  slug="/enterprises/coinbase"
                  image="/images/enterprises/coinbase.png"
                />
              </div>
            </div>
          </div>
        </Container>
      </AnalyticsProvider>
    </>
  );
}
