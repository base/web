import { Card } from 'apps/web/src/components/Developers/Shared/Card';
import shieldOutline from 'apps/web/src/components/Developers/SmartWallet/svg/shieldOutline.svg';
import globe from 'apps/web/src/components/Developers/SmartWallet/svg/globe.svg';
import cash from 'apps/web/src/components/Developers/SmartWallet/svg/cash.svg';
import defi from 'apps/web/src/components/Developers/SmartWallet/svg//defi.svg';
import faces from 'apps/web/src/components/Developers/SmartWallet/svg/faces.svg';
import support from 'apps/web/src/components/Developers/SmartWallet/svg/support.svg';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
const INFO_CARDS = [
  {
    icon: (
      <Image src={defi as StaticImageData} alt="defi" width={32} height={32} className="h-8 w-8" />
    ),
    title: 'Universal account',
    description: 'One account across hundreds of apps and eight different chains.',
  },
  {
    icon: (
      <Image src={cash as StaticImageData} alt="cash" width={31} height={32} className="h-8 w-8" />
    ),
    title: 'Easy onboarding',
    description: 'Secured by Passkeys, takes seconds to set up.',
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
    title: 'Super powered',
    description:
      'Build delightful experiences with Sponsored transactions, Spend Permissions, Batch Operations, and more.',
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
    title: 'Trust & security',
    description: 'The most trusted brand in crypto.',
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
    description: 'Free to integrate, free to operate, forever. No fees whatsoever.',
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
    title: 'Support',
    description: 'No questions too big or small.',
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
