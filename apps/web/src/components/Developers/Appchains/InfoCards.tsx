import { Card, CardProps } from 'apps/web/src/components/Developers/Shared/Card';
import lightningBolt from 'apps/web/src/components/Developers/Appchains/lighteningBolt.svg';
import taxesReceipt from 'apps/web/src/components/Developers/Appchains/taxesReceipt.svg';
import perpetualSwap from 'apps/web/src/components/Developers/Appchains/perpetualSwap.svg';
import faces from 'apps/web/src/components/Developers/Appchains/faces.svg';
import complianceProduct from 'apps/web/src/components/Developers/Appchains/complianceProduct.svg';
import globe from 'apps/web/src/components/Developers/Appchains/globe.svg';
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
    title: 'High-speed, low-cost throughput ',
    description:
      'Faster transactions with one-second block times, roundtrips in less than 10 seconds, all for a fraction of a cent.',
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
    title: 'Worldwide reach',
    description:
      "Access to the Base ecosystem and Coinbase retail users through direct send and receive with Coinbase's custodial platform.",
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
      'Base charges a competitive, fixed monthly service fee. No complicated vendor commitments, no negotiating for best price (already is), and no sequencer fees.',
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
      'Fully-managed sequencers and nodes, maintenance and upgrades, and block explorer. Plus real-time monitoring and alerts for any disruptions in chain performance.',
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
    title: 'Base developer tools',
    description:
      'Seamless integration with Smart Wallet, Paymaster, Bundler, OnchainKit, and AgentKit — right out of the box — to help you build and grow your app.',
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
      'Built on the OP Enclave framework for fast withdrawals and a seamless integration between your appchain and Base.',
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
