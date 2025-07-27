import * as React from 'react';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import BaseFooterSVG from 'apps/web/src/components/Layout/Footer/BaseFooterSVG';
import Link from 'apps/web/src/components/Link';

export function Footer() {
  return (
    <AnalyticsProvider context="footer">
      <footer className="col-span-full grid grid-cols-1 pt-20 md:pt-32 lg:grid-cols-[13.438rem_1fr]">
        <div className="lg:col-start-2">
          <div className="mx-auto flex w-full max-w-[clamp(1024px,calc(1024px+(100vw-1024px)*0.25),1248px)] justify-center px-4 md:px-6 lg:px-8">
            <div className="relative z-20 grid w-full grid-cols-9 gap-x-[min(2.25vw,_32px)] gap-y-10 py-4 md:gap-y-16 md:py-8 lg:h-[max(42dvw,_665px)] lg:max-h-[800px] lg:gap-y-0">
              <div className="col-span-full grid grid-cols-2 md:flex md:justify-between lg:col-span-9 [&:has(ul:hover)_div:not(:has(ul:hover))]:opacity-50">
                {LINK_SECTIONS.map((section) => (
                  <div
                    key={section.title}
                    className="mb-6 transition-opacity duration-200 [&:has(a:hover)_a:not(:hover)]:opacity-50"
                  >
                    <h3 className="mb-3 font-sans text-sm leading-[130%] tracking-normal">
                      {section.title}
                    </h3>
                    <ul className="flex flex-col">
                      {section.links.map((link) => (
                        <li key={link.label}>
                          <Link
                            href={link.href}
                            target={link.newTab ? '_blank' : '_self'}
                            rel={link.newTab ? 'noopener noreferrer' : undefined}
                            className="block py-1 font-mono text-sm font-[350] uppercase text-gray-50 transition-opacity duration-200"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <BaseFooterSVG className="bottom-6 col-span-full h-auto w-full md:px-0 lg:absolute lg:bottom-8 lg:col-span-9" />
            </div>
          </div>
        </div>
      </footer>
    </AnalyticsProvider>
  );
}

const LINK_SECTIONS = [
  {
    title: 'Explore',
    links: [{ label: 'Apps', href: '/ecosystem' }],
  },
  {
    title: 'Builders',
    links: [
      { label: 'Tools', href: 'https://www.base.org/build' },
      { label: 'BaseScan', href: 'https://basescan.org/' },
      {
        label: 'Gas credits',
        href: 'https://docs.base.org/identity/smart-wallet/introduction/base-gasless-campaign',
        newTab: true,
      },
      { label: 'Engineering blog', href: 'https://www.base.dev/blog', newTab: true },
      { label: 'Support', href: 'https://discord.com/invite/buildonbase' }, // TODO: add discord link
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Brand kit', href: 'https://www.base.org/brand', newTab: true },
      { label: 'Events', href: 'https://lu.ma/BaseMeetups', newTab: true },
    ],
  },
  {
    title: 'Socials',
    links: [
      { label: 'X', href: 'https://x.com/base', newTab: true },
      { label: 'Warpcast', href: 'https://warpcast.com/base', newTab: true },
      { label: 'Discord', href: 'https://discord.com/invite/buildonbase', newTab: true },
    ],
  },
  {
    title: 'Base',
    links: [
      {
        label: 'Vision',
        href: '/about/vision',
      },
      { label: 'Blog', href: 'https://paragraph.xyz/@base', newTab: true },
      { label: 'Jobs', href: '/jobs' },
      { label: 'Terms of service', href: 'https://docs.base.org/terms-of-service', newTab: true }, // TODO: update
      { label: 'Privacy policy', href: 'https://docs.base.org/privacy-policy', newTab: true },
    ],
  },
];
