import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';
import agentKit from 'apps/web/src/components/Developers/Tools/assets/agentKit.svg';
import baseNet from 'apps/web/src/components/Developers/Tools/assets/appchains.svg';
import miniKit from 'apps/web/src/components/Developers/Tools/assets/miniKit.svg';
import baseWallet from 'apps/web/src/components/Developers/Tools/assets/smartWallet.svg';
import onchainKit from 'apps/web/src/components/Developers/Tools/assets/onchainKit.svg';
import verification from 'apps/web/src/components/Developers/Tools/assets/verification.svg';
import Image, { StaticImageData } from 'next/image';
import options from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/options.svg';
import bug from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/bug.svg';
import blockchain from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/blockchain.svg';
import gitHubLogo from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/gitHubLogo.svg';
import blog from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/blog.svg';
import bridging from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/bridging.svg';

type ToolMiniCardProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  href: string;
};

type FooterCardProps = {
  label: string;
  icon: StaticImageData;
  href: string;
};

export function DevelopersDropdown() {
  return (
    <AnalyticsProvider context="developers">
      <div className="relative m-0 w-full rounded-xl bg-white/20 p-[1px]">
        <div className="flex flex-col gap-2.5 rounded-xl bg-dark-palette-backgroundAlternate p-2">
          <Link
            href="https://docs.base.org"
            className="flex items-center justify-between rounded-lg bg-dark-palette-secondary px-4 py-3 hover:bg-white/10"
          >
            <div>
              <Title level={TitleLevel.Headline}>Documentation</Title>
              <span className="text-sm text-dark-palette-foregroundMuted ">
                Start building with Base tools
              </span>
            </div>
            <Icon name="arrowRight" height={24} width={24} />
          </Link>
          <div className="flex items-center justify-between rounded-lg">
            <div className="grid w-full grid-cols-2 gap-1">
              <ToolMiniCard
                title="AgentKit"
                description="Launch your AI Agent"
                icon={agentKit as StaticImageData}
                href="https://docs.cdp.coinbase.com/agentkit/docs/welcome"
              />
              <ToolMiniCard
                title="Base Nets"
                description="Cheap transactions at scale"
                icon={baseNet as StaticImageData}
                href="/coming-soon"
              />
              <ToolMiniCard
                title="MiniKit"
                description="Build once. Deploy anywhere"
                icon={miniKit as StaticImageData}
                href="/coming-soon"
              />
              <ToolMiniCard
                title="Smart Wallet"
                description="Seamless self-custody"
                icon={baseWallet as StaticImageData}
                href="https://www.smartwallet.dev/why"
              />
              <ToolMiniCard
                title="OnchainKit"
                description="All-in-one onchain toolkit"
                icon={onchainKit as StaticImageData}
                href="https://onchainkit.xyz/"
              />
              <ToolMiniCard
                title="Verifications"
                description="In-app identity and compliance"
                icon={verification as StaticImageData}
                href="https://vocs-migration-mvp-one.vercel.app/dev-tools/identity/verifications/quickstart"
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-dark-palette-secondary py-2">
            <div className="grid w-full grid-cols-2 gap-x-1 gap-y-2.5">
              <FooterCard
                label="Status"
                icon={options as StaticImageData}
                href="https://status.base.org/"
              />
              <FooterCard
                label="Bug Bounty"
                icon={bug as StaticImageData}
                href="https://hackerone.com/base"
              />
              <FooterCard
                label="Block Explorer"
                icon={blockchain as StaticImageData}
                href="https://status.base.org/"
              />
              <FooterCard
                label="Github"
                icon={gitHubLogo as StaticImageData}
                href="https://github.com/base-org"
              />
              <FooterCard
                label="Blog"
                icon={blog as StaticImageData}
                href="https://blog.base.org/"
              />
              <FooterCard
                label="Builder Stories"
                icon={bridging as StaticImageData}
                href="https://status.base.org/"
              />
            </div>
          </div>
        </div>
      </div>
    </AnalyticsProvider>
  );
}

function ToolMiniCard({ title, description, icon, href }: ToolMiniCardProps) {
  return (
    <Link
      href={href}
      className="flex cursor-pointer flex-col gap-4 rounded-xl px-3 py-2 transition-all duration-200 hover:bg-white/10"
    >
      <div className="flex items-center gap-8">
        <div className="rounded-lg border border-dark-palette-lineHeavy p-2">
          <Image src={icon} alt={title} width={32} height={32} className="h-8 w-8" />
        </div>
        <div>
          <Title level={TitleLevel.Headline} className="font-bold text-white">
            {title}
          </Title>
          <Title
            level={TitleLevel.Headline}
            as="p"
            className="font-normal text-dark-palette-foregroundMuted"
          >
            {description}
          </Title>
        </div>
      </div>
    </Link>
  );
}

function FooterCard({ label, icon, href }: FooterCardProps) {
  return (
    <Link href={href} className="flex items-center gap-2 px-3">
      <Image src={icon} alt={label} width={16} height={16} />
      <Title level={TitleLevel.Headline} className="font-normal">
        {label}
      </Title>
    </Link>
  );
}
