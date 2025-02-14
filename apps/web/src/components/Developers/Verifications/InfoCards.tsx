import { Card } from 'apps/web/src/components/Developers/Shared/Card';
import key from 'apps/web/src/components/Developers/Verifications/key.svg';
import identityCard from 'apps/web/src/components/Developers/Verifications/identityCard.svg';
import complianceProduct from 'apps/web/src/components/Developers/Verifications/complianceProduct.svg';
import Image, { StaticImageData } from 'next/image';

const INFO_CARDS = [
  {
    icon: (
      <Image src={key as StaticImageData} alt="key" width={32} height={32} className="h-8 w-8" />
    ),
    title: 'Access control',
    description:
      'Implement granular access control using verified Coinbase attestations. Perfect for gating features, content, or entire applications.',
  },
  {
    icon: (
      <Image
        src={identityCard as StaticImageData}
        alt="identityCard"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Identity verification',
    description:
      'Seamlessly verify user identities without handling sensitive data. Reduce fraud and enhance security in your DeFi applications.',
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
    title: 'Compliance & reporting',
    description:
      'Build compliant applications with verifiable attestations. Perfect for KYC requirements and regulatory reporting.',
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
