import type { Metadata } from 'next';
import Sidebar from 'apps/web/src/components/Layout/Navigation/Sidebar';
import { Footer } from 'apps/web/src/components/Layout/Footer/Footer';
import MobileNav from 'apps/web/src/components/Layout/Navigation/MobileNav';
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
    <div className="bg-white text-black transition-colors">
      <div className="min-w-screen relative mx-auto grid min-h-screen w-full max-w-[1920px] grid-cols-1 selection:bg-blue-5 selection:text-base-blue lg:grid-cols-[13.438rem_1fr]">
        <AnalyticsProvider context="sidenav">
          <Sidebar />
          <MobileNav />
        </AnalyticsProvider>
        <main className="mx-auto flex w-full max-w-[clamp(1024px,calc(1024px+(100vw-1024px)*0.25),1248px)] justify-center px-4 md:px-6 lg:col-start-2 lg:px-8">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
