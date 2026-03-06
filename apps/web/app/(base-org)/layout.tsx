import type { Metadata } from 'next';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import LayoutSwitcher from 'apps/web/src/components/Layout/LayoutSwitcher';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base`,
  description:
    'Base is an open stack that empowers builders, creators, and people everywhere to build apps, grow businesses, create what they love, and earn onchain.',
  openGraph: {
    type: 'website',
    title: `Base`,
    description:
      'Base is an open stack that empowers builders, creators, and people everywhere to build apps, grow businesses, create what they love, and earn onchain.',
    url: `/`,
    images: ['https://base.org/images/base-open-graph.png'],
  },
  twitter: {
    site: '@base',
    card: 'summary_large_image',
  },
};

export default async function BaseOrgLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <AnalyticsProvider context="topnav">
      <LayoutSwitcher wrapperClassName="bg-white text-black transition-colors">
        {children}
      </LayoutSwitcher>
    </AnalyticsProvider>
  );
}
