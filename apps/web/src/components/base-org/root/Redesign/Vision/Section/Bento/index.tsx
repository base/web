import { ImageType, Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import { LargeCard } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Bento/LargeCard';

import BaseAppPrefix from '../../../Section/BaseApp/prefix.svg';
import BaseBuildersPrefix from '../../../Section/BaseBuilders/prefix.svg';
import BaseChainPrefix from '../../../Section/BaseChain/prefix.svg';
import BasePayPrefix from '../../../Section/BasePay/prefix.svg';

import baseAppImg from './assets/base-app.png';
import baseBuildersImg from './assets/base-builders.png';
import baseChainImg from './assets/base-chain.png';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

const baseChainPrefix = BaseChainPrefix as ImageType;
const baseBuildersPrefix = BaseBuildersPrefix as ImageType;
const baseAppPrefix = BaseAppPrefix as ImageType;
const basePayPrefix = BasePayPrefix as ImageType;
const baseAppAsset = baseAppImg as ImageType;
const baseBuildersAsset = baseBuildersImg as ImageType;
const baseChainAsset = baseChainImg as ImageType;

export function SectionBento() {
  return (
    <Section content={content}>
      <div className="relative col-span-full flex flex-col gap-8">
        {cardsContent.map((card) => (
          <LargeCard content={card} key={`${card.prefix.alt}-${card.title}`} />
        ))}
      </div>
      <div className="col-span-full lg:col-span-7">
        <Title level={TitleLevel.H6Regular} as="h3" className="!text-pretty">
          And on top of it all, a vibrant ecosystem with millions of people, thousands of apps, and
          businesses big and small. All building on Base.
        </Title>
      </div>
    </Section>
  );
}

const content = {
  title: "How We'll Get There",
  description:
    'Together, these layers form the global onchain economy where value flows directly to the people who create it.',
};

const cardsContent = [
  {
    prefix: {
      src: baseChainPrefix.src,
      alt: 'Base Chain',
      width: baseChainPrefix.width,
      height: baseChainPrefix.height,
    },
    title: 'Base Chain',
    description: 'An open network to power the global economy—fast, open, built to scale.',
    asset: {
      src: baseChainAsset.src,
      alt: 'Base Chain',
      width: baseChainAsset.width,
      height: baseChainAsset.height,
    },
    assetType: 'image',
  },
  {
    prefix: {
      src: baseBuildersPrefix.src,
      alt: 'Base Builders',
      width: baseBuildersPrefix.width,
      height: baseBuildersPrefix.height,
    },
    title: 'Base Build',
    description:
      'Everything builders need to build, grow, and earn from their apps—at every stage.',
    asset: {
      src: baseBuildersAsset.src,
      alt: 'Base Builders',
      width: baseBuildersAsset.width,
      height: baseBuildersAsset.height,
    },
    assetType: 'image',
  },
  {
    prefix: {
      src: baseAppPrefix.src,
      alt: 'Base App',
      width: baseAppPrefix.width,
      height: baseAppPrefix.height,
    },
    title: 'Base App',
    description: 'A new kind of social network for people. The gateway to the global economy.',
    asset: {
      src: baseAppAsset.src,
      alt: 'Base App',
      width: baseAppAsset.width,
      height: baseAppAsset.height,
    },
    assetType: 'image',
  },
  {
    prefix: {
      src: basePayPrefix.src,
      alt: 'Base Pay',
      width: basePayPrefix.width,
      height: basePayPrefix.height,
    },
    title: 'Base Pay',
    description:
      'Express checkout with global settlement at near-zero cost. Available for every business to accept USDC.',
    asset: {
      src: '/videos/basepay-square.webm',
      alt: 'Base Pay',
      width: 0,
      height: 0,
    },
    assetType: 'video',
  },
] as const;
