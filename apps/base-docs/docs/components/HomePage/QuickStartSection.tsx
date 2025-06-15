import { QuickLink } from './QuickLink.tsx';
import { Code, Wallet, Users } from 'lucide-react';

const sections = [
  {
    title: 'Building Onchain',
    icon: Code,
    links: [
      { text: 'Deploy on Base', href: '/docs/chain/deploy-on-base-quickstart' },
      { text: 'Get to Know Base', href: '/get-started/core-concepts/overview' },
      { text: 'Bridge an L1 Token to Base', href: '/docs/chain/bridge-an-l1-token-to-base' }
    ]
  },
  {
    title: 'Payments on Base',
    icon: Wallet,
    links: [
      { text: 'Deploy a Shopify Storefront', href: '/guides/use-case-guides/commerce/deploy-a-shopify-storefront' },
      { text: 'Implement One-Click Checkout', href: '/builderkits/onchainkit/checkout/checkout' },
      { text: 'Add an In-App Onramp', href: '/guides/use-case-guides/finance/build-a-smart-wallet-funding-app' }
    ]
  },
  {
    title: 'Social on Base',
    icon: Users,
    links: [
      { text: 'Add Basenames to Your App', href: '/docs/identity/basenames/basenames-onchainkit-tutorial' },
      { text: 'Mint NFTs in the Feed', href: '/guides/life-cycle-guides/activating/nft-minting' },
      { text: 'Drag and Drop Identity Components', href: '/builderkits/onchainkit/identity/identity' }
    ]
  }
];

export function QuickStartSection() {
  return (
    <div className="mt-16 sm:mt-24">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <div key={section.title} className="w-full rounded-md p-6 bg-zinc-50 dark:bg-black shadow-lg shadow-zinc-300/50 dark:shadow-none border border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-black transition-colors duration-200">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="w-full min-w-0">
                  <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                    {section.title}
                  </h2>
                  <div className="mt-2 space-y-0.5">
                    {section.links.slice(0, 3).map((link) => (
                      <QuickLink key={link.text} href={link.href}>
                        {link.text}
                      </QuickLink>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
