import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { type StaticImageData } from 'next/image';
import Link from 'next/link';
import agentKit from 'apps/web/src/components/Builders/Shared/assets/Tools/agentKit.svg';
import miniKit from 'apps/web/src/components/Builders/Shared/assets/Tools/miniKit.svg';
import smartWallet from 'apps/web/src/components/Builders/Shared/assets/Tools/smartWallet.svg';
import onchainKit from 'apps/web/src/components/Builders/Shared/assets/Tools/onchainKit.svg';
import basenet from 'apps/web/src/components/Builders/Appchains/basenet.svg';

type ToolCardProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  href: string;
};

export function Tools() {
  return (
    <section className="h-full w-full">
      <Title level={TitleLevel.Title1} as="h2" className="mb-9 mt-32">
        A suite of tools to build world-class onchain apps — purpose-built for Base
      </Title>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
        <ToolCard
          title="OnchainKit"
          description="Build an app in 10 minutes with an all-in-one toolkit and full-stack components."
          icon={onchainKit as StaticImageData}
          href="/builders/onchainkit"
        />
        <ToolCard
          title="Smart Wallet"
          description="A passkey-based universal account to connect with the onchain world."
          icon={smartWallet as StaticImageData}
          href="/builders/smart-wallet"
        />
        <ToolCard
          title="AgentKit"
          description="Give every AI agent a crypto wallet and the ability to transact and interact onchain."
          icon={agentKit as StaticImageData}
          href="/builders/agentkit"
        />
        <ToolCard
          title="Base Appchains"
          description="Launch your own chain with dedicated blockspace on Base, in minutes."
          icon={basenet as StaticImageData}
          href="/builders/base-appchains"
        />
        <ToolCard
          title="Mini Apps"
          description="Feature your mini app on decentralized social platforms with a few lines of code."
          icon={miniKit as StaticImageData}
          href="/build/mini-apps"
        />
      </div>
    </section>
  );
}

function ToolCard({ title, description, icon, href }: ToolCardProps) {
  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-col gap-4 rounded-xl bg-dark-palette-backgroundAlternate p-6 transition-all duration-200 hover:bg-dark-gray-10"
    >
      <div className="flex flex-col gap-8 md:flex-row md:items-center">
        <Image src={icon} alt={title} width={64} height={64} className="h-16 w-16" />
        <div className="flex flex-col gap-2">
          <Title level={TitleLevel.Title3} as="h3" className="font-medium text-white">
            {title}
          </Title>
          <Title level={TitleLevel.Title4} as="p" className="text-dark-palette-foregroundMuted">
            {description}
          </Title>
        </div>
      </div>
    </Link>
  );
}
