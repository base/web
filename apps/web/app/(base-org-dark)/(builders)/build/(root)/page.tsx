/* eslint-disable react-perf/jsx-no-new-array-as-prop */
import type { Metadata } from 'next';
import buildersCover from './builders.png';
import Image from 'next/image';
import { UseCasesSection } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/UseCasesSection';
import { StatsSection } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/StatsSection';
import { Tab } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/Tab';
import { LinkStack } from 'apps/web/app/(base-org-dark)/(builders)/build/(root)/LinkStack';
import { LinkCard } from 'apps/web/src/components/base-org/shared/LinkCard';
import {
  Button,
  ButtonSizes,
  ButtonVariants,
} from 'apps/web/src/components/Button/Redesign/Button';
import { BuildersSection } from 'apps/web/app/(base-org-dark)/(builders)/BuildersSection';
import Link from 'apps/web/src/components/Link';
import { BuildersContainer } from 'apps/web/app/(base-org-dark)/(builders)/BuildersContainer';
import buildersHero from './builders-hero.png';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Builders`,
  openGraph: {
    title: `Base | Builders`,
    url: `/build`,
    images: [buildersCover.src],
  },
};

const topStatsItems = [
  { value: '12', unit: 'B+', label: 'ASSETS ON PLATFORM', prefix: '$' },
  { value: '200', unit: 'ms', label: 'BLOCK TIME' },
  { value: '0.01', unit: '', label: 'MEDIAN FEE', prefix: '<$' },
];

const testimonialsTabItems = [
  {
    title: 'Build',
    content:
      'Base provides unmatched developer support and fosters a highly constructive community that inspires innovation and encourages you to push boundaries. If you want to build and win, Base is the place to be.',
    author: 'Dhawal Shah',
    source: 'HeyElsa AI',
  },
  {
    title: 'Scale',
    content:
      "Base stands out for how they support builders at scale. They've gone above and beyond to help us onboard users, build new solutions, and tap into real liquidity.",
    author: 'David Johansson',
    source: 'BLOCKLORDS',
  },
  {
    title: 'Monetize',
    content:
      "Base is at the crossroad of DeFi, memecoins, NFT, and Coinbase's large distribution network. It's one of the best L2 to build tools and apps that benefit from synergistic integrations!",
    author: 'Merlin Egalite',
    source: 'Morpho',
  },
];

const links = [
  {
    title: 'Base Account',
    description: 'A passkey-based universal account to connect with the onchain world.',
    url: '/build/base-account',
  },
  {
    title: 'OnchainKit',
    description: 'All-in-one toolkit and ready-to-use, full-stack components.',
    url: '/build/onchainkit',
  },
  {
    title: 'Mini Apps',
    description: 'Publish your mini app to the Base app with a few lines of code.',
    url: '/build/mini-apps',
  },
  {
    title: 'Base Appchains',
    description: 'Launch a chain with dedicated blockspace on Base, in minutes.',
    url: '/build/appchains',
  },
];

const builderCardItems = [
  {
    title: 'Builder Grants',
    actionCta: 'Apply for Grants',
    href: 'https://paragraph.com/@grants.base.eth/calling-based-builders',
    hoverImage: '/images/builder-grant-hover.png',
    imageClassName: 'object-cover md:object-contain md:object-[80px_170%]',
  },
  {
    title: 'Builder Rewards',
    actionCta: 'Claim rewards',
    href: 'http://builderscore.xyz/',
    hoverImage: '/images/builder-rewards-hover.png',
    imageClassName: 'object-cover md:object-contain md:scale-[1.5] md:object-[0_63%]',
  },
  {
    title: 'Base Batches',
    actionCta: 'APPLY TO JOIN',
    href: 'https://www.basebatches.xyz/',
    hoverImage: '/images/base-batches-hover.png',
    imageClassName: 'object-cover md:object-contain md:object-[0_107%]',
  },
];

export default function Builders() {
  return (
    <BuildersContainer
      title="What will you build?"
      asciiImageSrc={buildersHero.src}
      asciiImageContainerClassName="aspect-square inset-auto top-[-10%] w-full"
    >
      <section className="col-span-12 -mt-[200px]">
        <StatsSection
          animated
          description="Everything you need to build, grow, and earn onchain."
          statItems={topStatsItems}
        />
      </section>
      <BuildersSection
        viewport={{ once: true }}
        className="flex flex-col gap-y-20"
        contentBlocks={[, <UseCasesSection key="use-cases" />]}
      />
      <BuildersSection
        contentBlocks={[<Tab tabItems={testimonialsTabItems} key="testimonials" />]}
      />
      <BuildersSection
        className="flex flex-col gap-6 md:gap-8"
        contentBlocks={[
          <h2 className="text-3xl leading-[1.125] tracking-[-0.96px]" key="tools-title">
            Tools for builders
          </h2>,
          <LinkStack links={links} key="tools" />,
        ]}
      />
      <BuildersSection
        className="flex flex-col gap-8"
        contentBlocks={[
          <Title level={TitleLevel.H0Medium} key="get-funded-title">
            Get funded
          </Title>,
          <div className="mb-4" key="get-funded-stats">
            <StatsSection
              description="Base supports builders at every stage—from idea, to app, to business."
              statItems={[]}
              animated
              key="funded"
            />
          </div>,
          <ul className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-6" key="get-funded-cards">
            {builderCardItems.map((item) => (
              <li key={item.title}>
                <LinkCard {...item} />
              </li>
            ))}
          </ul>,
        ]}
      />
      <BuildersSection
        extraContent={
          <Image
            src="/images/builders-footer.svg"
            alt=""
            width={1141}
            height={918}
            className="absolute bottom-0 right-0 z-[-1]"
          />
        }
        className="relative flex flex-col justify-center gap-8 md:min-h-[480px]"
        contentBlocks={[
          <div
            className="hidden font-doto text-[83px] leading-[0.9] tracking-[-4.159px] md:block"
            key="just-build-it-title"
          >
            JUST BUILD IT.
          </div>,
          <div
            className="text-7xl leading-none tracking-[-2.56px] md:text-2xl md:leading-[1.2] md:tracking-[-0.72px]"
            key="just-build-it-description"
          >
            Build in minutes. Go live in hours.
          </div>,
          <div key="just-build-it-button">
            <Button
              className="w-full px-10 md:w-[310px]"
              variant={ButtonVariants.Secondary}
              size={ButtonSizes.Small}
              asChild
            >
              <Link href="https://docs.base.org/" target="_blank" rel="noopener noreferrer">
                Start building
              </Link>
            </Button>
          </div>,
        ]}
      />
    </BuildersContainer>
  );
}
