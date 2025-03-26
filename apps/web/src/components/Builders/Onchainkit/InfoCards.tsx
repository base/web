import { Card } from 'apps/web/src/components/Builders/Shared/Card';
import cryptoBasics from 'apps/web/src/components/Builders/Onchainkit/cryptoBasics.svg';
import serverless from 'apps/web/src/components/Builders/Onchainkit/serverless.svg';
import cloudProduct from 'apps/web/src/components/Builders/Onchainkit/cloudProduct.svg';
import developerPlatformProduct from 'apps/web/src/components/Builders/Onchainkit/developerPlatformProduct.svg';
import derivativesProductNew from 'apps/web/src/components/Builders/Onchainkit/derivativesProductNew.svg';
import taxesReceiptInactive from 'apps/web/src/components/Builders/Onchainkit/taxesReceiptInactive.svg';
import Image, { StaticImageData } from 'next/image';

const INFO_CARDS = [
  {
    icon: (
      <Image
        src={developerPlatformProduct as StaticImageData}
        alt="developerPlatformProduct"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Full-stack',
    description: 'Abstract away complex configuration or setup. No blockchain knowledge required.',
  },
  {
    icon: (
      <Image
        src={cloudProduct as StaticImageData}
        alt="cloudProduct"
        width={31}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'AI-friendly',
    description:
      'Leverage your favorite tools to deploy your app with components that work automatically on Base.',
  },
  {
    icon: (
      <Image
        src={serverless as StaticImageData}
        alt="serverless"
        width={30}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Serverless',
    description: 'Just "npm create onchain" to start building, no backend infrastructure required.',
  },
  {
    icon: (
      <Image
        src={cryptoBasics as StaticImageData}
        alt="cryptoBasics"
        width={30}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Composable',
    description: 'Build apps that interact with and build upon other apps in the Base ecosystem.',
  },
  {
    icon: (
      <Image
        src={derivativesProductNew as StaticImageData}
        alt="derivativesProductNew"
        width={33}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Ship faster',
    description:
      'Remove complexity with standard components, so you can focus on making your app stand out.',
  },
  {
    icon: (
      <Image
        src={taxesReceiptInactive as StaticImageData}
        alt="taxesReceiptInactive"
        width={32}
        height={32}
        className="h-8 w-8"
      />
    ),
    title: 'Cost-effective',
    description: 'Base offers fast and affordable transactions, where fees are less than one cent.',
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
