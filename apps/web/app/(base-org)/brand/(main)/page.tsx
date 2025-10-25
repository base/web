import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { Banner } from 'apps/web/src/components/Brand/Banner';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import type { Metadata } from 'next';
import Link from 'apps/web/src/components/Link';
import { Button } from 'apps/web/src/components/Button/Redesign/Button';
import BrandIndex from 'apps/web/src/components/Brand/Index';

/* img imports */
import colorImg from './color.png';
import coreImg from './core.png';
import messagingImg from './messaging.png';
import partnerImg from './partner.png';
import subBrandsImg from './sub-brands.png';
import typoImg from './typo.png';
import inUseImg from './in-use.png';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Brand`,
  openGraph: {
    title: `Base | Brand`,
    url: `/brand`,
  },
};

const heroBackgroundConfig = {
  className: 'h-full w-full',
  enableInteractivity: true,
  velocityDissipation: 0.94,
  radius: 0.25,
};

export default async function Page() {
  return (
    <>
      <Container className="lg:pt-0">
        <div className="z-20 col-span-full h-[412px] lg:h-[607px]">
          <Title level={TitleLevel.H2Regular} as="h1" className="ml-4 mt-8 lg:mt-12">
            Base Brand
            <br />
            Guidelines
          </Title>
        </div>

        <div className="absolute -bottom-[4.5rem] left-0 right-0 top-0 z-10 overflow-hidden lg:-bottom-20">
          <HeroBackground config={heroBackgroundConfig} />
        </div>
      </Container>
      <Banner>
        Base began as an internal experiment, mirrored from Coinbase, and has grown into an open
        canvas for anyone building onchain. These guidelines capture that shift. They are less a
        rulebook than a starter kit: here you&apos;ll find the non-negotiables that keep us
        recognizable and the flex zones that invite the community to remix. Use them to stay
        coherent, but never contained. If a choice makes Base clearer, more human, or more useful:
        do it, then share what you learned so the system keeps evolving.
      </Banner>

      <BrandIndex index={BRAND_PAGES_INDEX} />

      <div className="col-span-full grid grid-cols-9 gap-x-[min(2.25vw,_32px)]">
        <div className="col-span-full border-t border-base-black pb-2 pt-5 [&_*]:!text-pretty">
          <Title level={TitleLevel.H6Regular} as="p">
            Before unveiling our new brand, we launched Brand in the Open—an experiment in open
            collaboration and creativity. We invited 10 artists to reimagine the Base brand in their
            own style, exploring new expressions of what Base could be.
          </Title>
        </div>
        <AnalyticsProvider context="brand">
          <Button type="button" className="col-span-full mt-8 md:col-span-3" asChild>
            <Link href="https://brandintheopen.xyz" target="_blank" rel="noopener">
              Explore the campaign
            </Link>
          </Button>
        </AnalyticsProvider>
      </div>
    </>
  );
}

export const BRAND_PAGES_INDEX = [
  {
    label: 'Messaging',
    href: '/brand/messaging',
    img: messagingImg,
  },
  {
    label: 'Core Identifiers',
    href: '/brand/core-identifiers',
    img: coreImg,
  },
  {
    label: 'Color',
    href: '/brand/color',
    img: colorImg,
  },
  {
    label: 'Typography',
    href: '/brand/typography',
    img: typoImg,
  },
  {
    label: 'Sub-brands',
    href: '/brand/sub-brands',
    img: subBrandsImg,
  },
  {
    label: 'Motion',
    href: '/brand/motion',
    img: '/videos/motion/motion.mp4',
  },
  {
    label: 'Partnerships',
    href: '/brand/partnerships',
    img: partnerImg,
  },
  {
    label: 'In use',
    href: '/brand/in-use',
    img: inUseImg,
  },
];
