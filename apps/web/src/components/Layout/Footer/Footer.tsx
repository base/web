import baseLogo from './assets/baseLogo.svg';
import Image, { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import Link from 'apps/web/src/components/Link';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Title from 'apps/web/src/components/base-org/typography/Title';

const LINK_SECTIONS = [
  {
    title: 'Explore',
    links: [
      { label: 'Bridge', href: 'https://bridge.base.org' },
      { label: 'Apps', href: 'https://www.base.org/ecosystem' },
    ],
  },
  {
    title: 'Builders',
    links: [
      { label: 'Tools', href: 'https://www.base.org/builders' },
      { label: 'BaseScan', href: 'https://basescan.org/' },
      { label: 'Stories', href: 'https://www.base.org/builders/stories' },
      {
        label: 'Gas credits',
        href: 'https://www.docs.base.org/identity/smart-wallet/introduction/base-gasless-campaign',
      },
      { label: 'Engineering blog', href: 'https://www.base.dev/blog' },
      { label: 'Support', href: 'https://discord.com/invite/buildonbase' }, // TODO: add discord link
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Grants', href: 'https://paragraph.xyz/@grants.base.eth/calling-based-builders' },
      { label: 'Brand kit', href: 'https://github.com/base/brand-kit' },
      { label: 'Events', href: 'https://lu.ma/BaseMeetups' },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'X', href: 'https://x.com/base' },
      { label: 'Warpcast', href: 'https://warpcast.com/base' },
      { label: 'Discord', href: 'https://discord.com/invite/buildonbase' },
    ],
  },
  {
    title: 'Base',
    links: [
      {
        label: 'Vision',
        href: 'https://base.mirror.xyz/gFOLgyrs8jtX4Eqt4Kh6ikWhB3tqrhQoKfddeqZIECs',
      },
      { label: 'Blog', href: 'https://base.mirror.xyz' },
      { label: 'Careers', href: 'https://www.base.org/jobs' },
      { label: 'Terms of service', href: 'https://docs.base.org/terms-of-service' }, // TODO: update
      { label: 'Privacy policy', href: 'https://docs.base.org/privacy-policy' },
    ],
  },
];

export function Footer() {
  return (
    <AnalyticsProvider context="footer">
      <footer className="relative z-20 mx-auto mt-auto flex w-full flex-col justify-center bg-black bg-black pb-8 pt-12 text-white">
        <Container>
          <div className="flex w-full gap-2 max-sm:flex-col max-sm:gap-10 sm:justify-between">
            <Image src={baseLogo as StaticImageData} alt="Based" className="h-8 w-8" />
            <div className="grid grid-cols-2 gap-10 max-sm:gap-9 sm:grid-cols-5">
              {LINK_SECTIONS.map((section) => {
                return (
                  <div key={section.title} className="flex flex-col gap-2">
                    <Title level={TitleLevel.Headline}>{section.title}</Title>
                    <div className="flex flex-col gap-2">
                      {section.links.map((link) => {
                        return (
                          <Link
                            key={link.label}
                            href={link.href}
                            className="text-palette-foregroundMuted"
                            target="_blank"
                          >
                            {link.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </footer>
    </AnalyticsProvider>
  );
}
