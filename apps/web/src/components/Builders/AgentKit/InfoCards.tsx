import { Card, CardProps } from 'apps/web/src/components/Builders/Shared/Card';
import dropsActive from 'apps/web/src/components/Builders/AgentKit/dropsActive.svg';
import blockchain from 'apps/web/src/components/Builders/AgentKit/blockchain.svg';
import metaverse from 'apps/web/src/components/Builders/AgentKit/metaverse.svg';
import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Link from 'next/link';
import { AGENTKIT_DOCS_LINK } from 'apps/web/src/components/Builders/AgentKit/links';

const INFO_CARDS: CardProps[] = [
  {
    icon: (
      <Image
        src={dropsActive as StaticImageData}
        alt="dropsActive"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'No coding required',
    description: (
      <Title className="pt-2 text-dark-palette-foregroundMuted" level={TitleLevel.Title4}>
        Use our{' '}
        <Link target="_blank" href={AGENTKIT_DOCS_LINK} className="text-dark-palette-foreground">
          videos and templates
        </Link>{' '}
        to create an AgentKit agent in less than five minutes. No development experience required.
      </Title>
    ),
  },
  {
    icon: (
      <Image
        src={blockchain as StaticImageData}
        alt="blockchain"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Built-in onchain',
    description:
      'Secure access to features for reliable onchain operations, including trades, transfers, and contract deployments.',
  },
  {
    icon: (
      <Image
        src={metaverse as StaticImageData}
        alt="metaverse"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Infinitely customizable',
    description:
      "AgentKit can be used with any framework, any model, and with as many or as little actions as you'd like.",
  },
];

export function InfoCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-20 max-sm:gap-12 md:grid-cols-3">
      {INFO_CARDS.map((card) => {
        return (
          <Card
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            iconClassName="text-[#818CF8]"
          />
        );
      })}
    </div>
  );
}
