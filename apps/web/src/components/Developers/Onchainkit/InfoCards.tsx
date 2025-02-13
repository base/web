import { Card } from 'apps/web/src/components/Developers/Shared/Card';
import cryptoBasics from 'apps/web/src/components/Developers/Onchainkit/cryptoBasics.svg';
import serverless from 'apps/web/src/components/Developers/Onchainkit/serverless.svg';
import cloudProduct from 'apps/web/src/components/Developers/Onchainkit/cloudProduct.svg';
import developerPlatformProduct from 'apps/web/src/components/Developers/Onchainkit/developerPlatformProduct.svg';
import derivativesProductNew from 'apps/web/src/components/Developers/Onchainkit/derivativesProductNew.svg';
import taxesReceiptInactive from 'apps/web/src/components/Developers/Onchainkit/taxesReceiptInactive.svg';
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
    title: 'Full-stack in one command',
    description:
      'Abstract away any complex configuration or setup. No blockchain knowledge required.',
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
    title: 'AI-compatible',
    description:
      'Leverage your favorite AI tools to get your app onchain faster with more features than possible otherwise.',
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
    description:
      'To deploy full-stack onchain apps without managing backend infrastructure — just "npm create onchain" to get started.',
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
    description:
      'To build apps that can interact with and build upon other apps in the Base ecosystem.',
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
    title: 'Go to market faster',
    description:
      'We streamline all the table stake features, so you can focus on your differentiator and go to market faster.',
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
    description:
      'To make it cost-effective to build and scale applications with transaction fees of less than 1 cent.',
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
            iconClassName="text-[#C9A4FA]"
          />
        );
      })}
    </div>
  );
}
