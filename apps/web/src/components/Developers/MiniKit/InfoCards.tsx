import { Card, CardProps } from 'apps/web/src/components/Developers/Shared/Card';
import megaphone from 'apps/web/src/components/Developers/MiniKit/megaphone.svg';
import trading from 'apps/web/src/components/Developers/MiniKit/trading.svg';
import participate from 'apps/web/src/components/Developers/MiniKit/participate.svg';
import perpetualSwap from 'apps/web/src/components/Developers/MiniKit/perpetualSwap.svg';
import Image, { StaticImageData } from 'next/image';

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
    title: 'Supercharge your distribution',
    description:
      'Leverage referral boosts and exclusive TBA incentive programs to expand your reach and drive user engagement effortlessly.',
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
    title: 'No more cold start problem',
    description:
      'Automatically surface wallet assets, account metadata, and transaction history through WalletContext, ensuring a warm and engaging user experience from day one.',
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
      'With pre-configured TBA connectors and built-in utility features (like transaction batching and confirmation dialogs), get your mini app up and running with just one prop.',
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
    description:
      'Unlock multiple revenue streams with built-in monetization features, including subscription models and referral incentives, so your mini app can generate income in variousways.',
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
          />
        );
      })}
    </div>
  );
}
