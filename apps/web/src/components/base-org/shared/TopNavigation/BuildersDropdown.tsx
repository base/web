import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import agentKit from 'apps/web/src/components/Builders/Shared/assets/Tools/agentKit.svg';
import miniKit from 'apps/web/src/components/Builders/Shared/assets/Tools/miniKit.svg';
import baseWallet from 'apps/web/src/components/Builders/Shared/assets/Tools/smartWallet.svg';
import onchainKit from 'apps/web/src/components/Builders/Shared/assets/Tools/onchainKit.svg';
import Image, { StaticImageData } from 'next/image';
import options from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/options.svg';
import bug from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/bug.svg';
import blockchain from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/blockchain.svg';
import gitHubLogo from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/gitHubLogo.svg';
import blog from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/blog.svg';
import bridging from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/bridging.svg';
import chartVolume from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/chartVolume.svg';
import baseBatches from 'apps/web/src/components/base-org/shared/TopNavigation/assets/developers/baseBatches.svg';
import Link from 'apps/web/src/components/Link';
import Card from 'apps/web/src/components/base-org/Card';
import basenet from 'apps/web/src/components/Builders/Appchains/basenet.svg';

type BuildersDropdownProps = {
  onLinkClick: () => void;
};

type ToolMiniCardProps = {
  title: string;
  description: string;
  icon: StaticImageData;
  href: string;
  onLinkClick: () => void;
};

type FooterCardProps = {
  label: string;
  icon?: StaticImageData;
  href: string;
  onLinkClick: () => void;
};

export function BuildersDropdown({ onLinkClick }: BuildersDropdownProps) {
  return (
    <AnalyticsProvider context="developers">
      <Card radius={13} innerClassName="bg-dark-palette-backgroundAlternate">
        <div className="flex flex-col gap-2.5 rounded-xl bg-dark-palette-backgroundAlternate p-2">
          <Link
            href="/builders"
            onClick={onLinkClick}
            className="flex items-center justify-between rounded-lg bg-dark-palette-secondary px-4 pb-3 pt-3 hover:bg-[#3A3D45]"
          >
            <div className="flex flex-col justify-center">
              <Title level={TitleLevel.Headline} className="text-sm tracking-normal">
                Builders
              </Title>
              {/* use tracking-wide to temporary offset the odd tight letter-spacing */}
              <p className="text-sm tracking-wide text-dark-palette-foregroundMuted">
                Start building with Base tools
              </p>
            </div>
            <Icon name="arrowRight" height={16} width={16} />
          </Link>
          <Link
            href="https://docs.base.org"
            onClick={onLinkClick}
            className="flex items-center justify-between rounded-lg bg-dark-palette-secondary px-4 pb-3 pt-3 hover:bg-[#3A3D45]"
          >
            <div className="flex flex-col justify-center">
              <Title level={TitleLevel.Headline} className="text-sm tracking-normal">
                Docs
              </Title>
              {/* use tracking-wide to temporary offset the odd tight letter-spacing */}
              <p className="text-sm tracking-wide text-dark-palette-foregroundMuted">
                Dive into the developer docs
              </p>
            </div>
            <Icon name="arrowRight" height={16} width={16} />
          </Link>
          <div className="flex items-center justify-between rounded-lg">
            <div className="grid w-full grid-cols-2 gap-1">
              <ToolMiniCard
                title="OnchainKit"
                description="All-in-one onchain toolkit"
                icon={onchainKit as StaticImageData}
                href="/builders/onchainkit"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="AgentKit"
                description="Launch your AI Agent"
                icon={agentKit as StaticImageData}
                href="/builders/agentkit"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="Smart Wallet"
                description="Seamless self-custody"
                icon={baseWallet as StaticImageData}
                href="/builders/smart-wallet"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="Base Appchains"
                description="Scale your app"
                icon={basenet as StaticImageData}
                href="/builders/base-appchains"
                onLinkClick={onLinkClick}
              />
              <ToolMiniCard
                title="Mini Apps"
                description="Build once. Deploy anywhere"
                icon={miniKit as StaticImageData}
                href="/build/mini-apps"
                onLinkClick={onLinkClick}
              />
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-dark-palette-secondary py-3">
            <div className="grid w-full grid-cols-2 gap-x-1 gap-y-2.5">
              <FooterCard
                label="Status Page"
                icon={options as StaticImageData}
                href="https://status.base.org/"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Bug bounty"
                icon={bug as StaticImageData}
                href="https://hackerone.com/coinbase"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="BaseScan"
                icon={blockchain as StaticImageData}
                href="https://basescan.org/"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="GitHub"
                icon={gitHubLogo as StaticImageData}
                href="https://github.com/base"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Engineering blog"
                icon={blog as StaticImageData}
                href="https://www.base.dev/blog"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Builder stories"
                icon={bridging as StaticImageData}
                href="/builders/stories"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Base Stats"
                icon={chartVolume as StaticImageData}
                href="https://www.base.org/stats"
                onLinkClick={onLinkClick}
              />
              <FooterCard
                label="Base Batches"
                icon={baseBatches as StaticImageData}
                href="https://www.basebatches.xyz"
                onLinkClick={onLinkClick}
              />
            </div>
          </div>
        </div>
        {/* </div> */}
      </Card>
    </AnalyticsProvider>
  );
}

function ToolMiniCard({ title, description, icon, href, onLinkClick }: ToolMiniCardProps) {
  return (
    <Link
      href={href}
      onClick={onLinkClick}
      className="flex cursor-pointer flex-col gap-4 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-[#32353D]"
    >
      <div className="flex items-center gap-4">
        <div className="rounded-lg">
          <Image src={icon} alt={title} width={24} height={24} className="h-8 w-8" />
        </div>
        <div className="flex flex-col">
          <Title level={TitleLevel.Headline} className="text-sm font-bold text-white">
            {title}
          </Title>
          <Title
            level={TitleLevel.Headline}
            as="p"
            className="text-sm font-normal tracking-normal text-dark-palette-foregroundMuted"
          >
            {description}
          </Title>
        </div>
      </div>
    </Link>
  );
}

function FooterCard({ label, icon, href, onLinkClick }: FooterCardProps) {
  return (
    <Link
      href={href}
      target={href.startsWith('https://') ? '_blank' : undefined}
      onClick={onLinkClick}
      className="flex items-center gap-2 px-4"
    >
      {icon && <Image src={icon} alt={label} width={16} height={16} />}
      <Title level={TitleLevel.Headline} className="text-sm font-normal tracking-normal">
        {label}
      </Title>
    </Link>
  );
}
