import bg1 from 'apps/web/src/components/Builders/MiniKit/bg1.png';
import bg2 from 'apps/web/src/components/Builders/MiniKit/bg2.png';
import walletLogo from 'apps/web/src/components/Builders/MiniKit/walletLogo.svg';
import warpcastLogo from 'apps/web/src/components/Builders/MiniKit/warpcastLogo.svg';
import Image, { StaticImageData } from 'next/image';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ReactNode } from 'react';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Link from 'apps/web/src/components/Link';

type SupportedPlatformCardProps = {
  title?: string;
  value: string;
  description: string;
  image: StaticImageData;
  logo: ReactNode;
  href: string;
};

function SupportedPlatformCard({
  title,
  value,
  description,
  image,
  logo,
  href,
}: SupportedPlatformCardProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className="relative flex min-h-[212px] flex-col justify-between gap-10 overflow-hidden rounded-lg p-6"
    >
      <Image src={image} alt="Template background" layout="fill" objectFit="cover" />
      <div className="z-10 flex items-center gap-2 text-white">
        {logo}
        {title && (
          <Title level={TitleLevel.Title4} className="font-bold">
            {title}
          </Title>
        )}
      </div>

      <div className="z-10 flex flex-col">
        <Title level={TitleLevel.Title1}>{value}</Title>
        <Text variant={TextVariant.Body}>{description}</Text>
      </div>
    </Link>
  );
}

export function SupportedPlatforms() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <Title level={TitleLevel.Title1}>
          Reach users wherever they are, with a few lines of code
        </Title>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <SupportedPlatformCard
          description="A sufficiently decentralized social network"
          value="Warpcast"
          image={bg2}
          logo={
            <Image
              src={warpcastLogo as StaticImageData}
              alt="Warpcast logo"
              width={18}
              height={16}
            />
          }
          href="https://warpcast.com/"
        />
        <SupportedPlatformCard
          description="In Alpha"
          value="Coinbase Wallet"
          image={bg1}
          logo={
            <Image src={walletLogo as StaticImageData} alt="Wallet logo" width={20} height={20} />
          }
          href="https://wallet.coinbase.com/"
        />
      </div>
    </div>
  );
}
