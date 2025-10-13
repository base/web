import { Card, CardProps } from 'apps/web/src/components/Builders/Shared/Card';
import lightningBolt from 'apps/web/src/components/Builders/Appchains/lighteningBolt.svg';
import taxesReceipt from 'apps/web/src/components/Builders/Appchains/taxesReceipt.svg';
import perpetualSwap from 'apps/web/src/components/Builders/Appchains/perpetualSwap.svg';
import faces from 'apps/web/src/components/Builders/Appchains/faces.svg';
import complianceProduct from 'apps/web/src/components/Builders/Appchains/complianceProduct.svg';
import globe from 'apps/web/src/components/Builders/Appchains/globe.svg';
import Image, { StaticImageData } from 'next/image';

const INFO_CARDS: CardProps[] = [
  {
    icon: (
      <Image
        src={lightningBolt as StaticImageData}
        alt="lightningBolt"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'High throughput, low costs',
    description:
      'Faster transactions with 1-second block times and under 10-second roundtrips — for fractions of cents.',
  },

  {
    icon: (
      <Image
        src={taxesReceipt as StaticImageData}
        alt="taxesReceipt"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Sustainable growth',
    description: 'Deliver delightful, performant user experiences with dedicated blockspace.',
  },
  {
    icon: (
      <Image
        src={faces as StaticImageData}
        alt="faces"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Builder-friendly fees',
    description:
      'Competitive, fixed monthly price. No complicated vendor commitments, no price negotiations.',
  },
  {
    icon: (
      <Image
        src={complianceProduct as StaticImageData}
        alt="complianceProduct"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Enterprise-grade infra',
    description:
      'Fully-managed sequencer and nodes, maintenance and upgrades, and block explorer. Plus real-time monitoring and alerts for any disruptions in chain performance.',
  },

  {
    icon: (
      <Image
        src={globe as StaticImageData}
        alt="globe"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Base builder tools',
    description:
      'Seamless integration with Smart Wallet, Paymaster, OnchainKit, AgentKit, and other tools from Base and Coinbase Developer Platform.',
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
    title: 'Open-source',
    description:
      'Built on the OP Enclave framework for fast withdrawals and a seamless integration between your Appchain and Base. ',
  },
];

export function InfoCards() {
  return (
    <div className="grid w-full grid-cols-1 gap-20 md:grid-cols-3">
      {INFO_CARDS.map((card) => {
        return (
          <Card
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            iconClassName="text-[#C9A4FA]"
          />
        );
      })}
    </div>
  );
}
