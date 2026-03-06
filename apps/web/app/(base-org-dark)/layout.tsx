import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import LayoutSwitcher from 'apps/web/src/components/Layout/LayoutSwitcher';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base`,
  description:
    'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.',
  openGraph: {
    type: 'website',
    title: `Base`,
    description:
      'Base is a secure, low-cost, builder-friendly Ethereum L2 built to bring the next billion users onchain.',
    url: `/`,
    images: ['https://base.org/images/base-open-graph.png'],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

export default function BaseOrgLayoutDark({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <AnalyticsProvider context="topnav">
      <LayoutSwitcher wrapperClassName="dark bg-black text-white transition-colors">
        {children}
      </LayoutSwitcher>
    </AnalyticsProvider>
  );
}
