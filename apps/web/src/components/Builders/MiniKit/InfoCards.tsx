import { Card, CardProps } from 'apps/web/src/components/Builders/Shared/Card';
import megaphone from 'apps/web/src/components/Builders/MiniKit/megaphone.svg';
import trading from 'apps/web/src/components/Builders/MiniKit/trading.svg';
import participate from 'apps/web/src/components/Builders/MiniKit/participate.svg';
import perpetualSwap from 'apps/web/src/components/Builders/MiniKit/perpetualSwap.svg';
import Image, { StaticImageData } from 'next/image';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Text from 'apps/web/src/components/base-org/typography/Text';

const INFO_CARDS: CardProps[] = [
  {
    icon: (
      <Image
        src={megaphone as StaticImageData}
        alt="megaphone"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Grow your audience',
    description:
      'Expand your reach and drive user engagement across decentralized platforms with one unified SDK.',
  },
  {
    icon: (
      <Image
        src={trading as StaticImageData}
        alt="trading"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Simplify user onboarding',
    description:
      'Avoid the cold start problem by automatically surfacing wallet assets, account metadata, and transaction history. Deliver a warm, engaging user experience from day one.',
  },
  {
    icon: (
      <Image
        src={participate as StaticImageData}
        alt="participate"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Minimum configuration',
    description:
      'Kickstart your mini app in minutes — with pre-configured connectors and built-in utility features like transaction batching and confirmation dialogues.',
  },
  {
    icon: (
      <Image
        src={perpetualSwap as StaticImageData}
        alt="perpetualSwap"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Diversify your revenue',
    tag: (
      <Text
        variant={TextVariant.Label2}
        className="rounded-md bg-dark-palette-backgroundAlternate px-2 py-1 text-dark-palette-foregroundMuted"
      >
        COMING SOON
      </Text>
    ),
    description:
      'Unlock new revenue streams with built-in monetization features — including subscription models and referral incentives — so your mini app can generate income in various ways.',
  },
];

export function InfoCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-2">
      {INFO_CARDS.map((card) => {
        return (
          <Card
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            iconClassName="text-[#D058C1]"
            tag={card.tag}
          />
        );
      })}
    </div>
  );
}
