import type { Metadata } from 'next';
import Sidebar from 'apps/web/src/components/Layout/Navigation/Sidebar';
import TopNav from 'apps/web/src/components/Layout/Navigation/TopNav';
import { Footer } from 'apps/web/src/components/Layout/Footer/Footer';
import MobileNav from 'apps/web/src/components/Layout/Navigation/MobileNav';
import { DynamicWrappedGasPriceDropdown } from 'apps/web/src/components/Layout/Navigation/GasPriceDropdown';
import AnalyticsProvider from 'apps/web/contexts/Analytics';

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
    <div className="relative bg-white px-4 text-black transition-colors md:px-6 lg:px-8">
      <div className="min-w-screen mx-auto grid min-h-screen w-full max-w-screen-lg grid-cols-1 selection:bg-blue-5 selection:text-base-blue 2xl:max-w-screen-xl ">
        <AnalyticsProvider context="sidenav">
          {/* <Sidebar /> */}
          <TopNav />
          <MobileNav />
        </AnalyticsProvider>
        <main className="mx-auto flex w-full justify-center pt-12">{children}</main>
        <Footer />
      </div>

      {/* Gas Price Dropdown - Top Right */}
      <div className="fixed right-4 top-4 z-50 hidden lg:block">
        {/* <DynamicWrappedGasPriceDropdown /> */}
      </div>
    </div>
  );
}
