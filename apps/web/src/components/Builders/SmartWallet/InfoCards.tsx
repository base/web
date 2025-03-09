import { Card } from 'apps/web/src/components/Builders/Shared/Card';
import shieldOutline from 'apps/web/src/components/Builders/SmartWallet/svg/shieldOutline.svg';
import globe from 'apps/web/src/components/Builders/SmartWallet/svg/globe.svg';
import cash from 'apps/web/src/components/Builders/SmartWallet/svg/cash.svg';
import defi from 'apps/web/src/components/Builders/SmartWallet/svg/defi.svg';
import faces from 'apps/web/src/components/Builders/SmartWallet/svg/faces.svg';
import support from 'apps/web/src/components/Builders/SmartWallet/svg/support.svg';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
const INFO_CARDS = [
  {
    icon: (
      <Image src={defi as StaticImageData} alt="defi" width={32} height={32} className="h-8 w-8" />
    ),
    title: 'Universal account',
    description: 'An account that just works anywhere your users go.',
  },
  {
    icon: (
      <Image src={cash as StaticImageData} alt="cash" width={31} height={32} className="h-8 w-8" />
    ),
    title: 'Instant onboarding',
    description:
      'Bring users onchain in seconds with secure passkey sign-in. No app or extension required.',
  },
  {
    icon: (
      <Image
        src={globe as StaticImageData}
        alt="globe"
        width={30}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Onchain made simple',
    description:
      'Build delightful user experiences with sponsored transactions, spend permissions, and batch operations.',
  },
  {
    icon: (
      <Image
        src={shieldOutline as StaticImageData}
        alt="shieldOutline"
        width={30}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Built-in onramps',
    description:
      'Simple account funding for users — with Apple Pay, debit card, or Coinbase Exchange balances.',
  },
  {
    icon: (
      <Image
        src={faces as StaticImageData}
        alt="faces"
        width={33}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Free to use',
    description: 'Smart Wallet is 100% free for users and developers. No fees whatsoever.',
  },
  {
    icon: (
      <Image
        src={support as StaticImageData}
        alt="support"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Safe and secure',
    description: 'Built by Coinbase, the most trusted brand in crypto.',
  },
];

export function InfoCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-20 sm:grid-cols-3">
      {INFO_CARDS.map((card) => {
        return (
          <Card
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            iconClassName="text-[#578BFA]"
          />
        );
      })}
    </div>
  );
}
