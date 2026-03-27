import type { Metadata } from 'next';
import Sidebar from 'apps/web/src/components/Layout/Navigation/Sidebar';
import { Footer } from 'apps/web/src/components/Layout/Footer/Footer';
import MobileNav from 'apps/web/src/components/Layout/Navigation/MobileNav';
import { DynamicWrappedGasPriceDropdown } from 'apps/web/src/components/Layout/Navigation/GasPriceDropdown';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import {
  OrganizationSchema,
  WebsiteSchema,
  SoftwareApplicationSchema,
} from 'apps/web/src/components/SEO/StructuredData';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: {
    default: 'Base | Ethereum L2 Blockchain - Build Onchain Apps',
    template: '%s | Base',
  },
  description:
    'Base is a secure, low-cost Ethereum Layer 2 blockchain built on Optimism. Build decentralized apps, DeFi protocols, NFTs, and smart contracts with EVM compatibility and Coinbase integration.',
  keywords: [
    'ethereum l2',
    'layer 2 blockchain',
    'base blockchain',
    'ethereum scaling',
    'optimism',
    'coinbase l2',
    'smart contracts',
    'web3 development',
    'defi platform',
    'nft marketplace',
    'blockchain platform',
    'decentralized applications',
    'dapp development',
    'crypto infrastructure',
    'ethereum layer 2',
    'build onchain',
    'onchain apps',
    'base network',
    'evm compatible',
    'scaling solution',
  ],
  authors: [{ name: 'Base', url: 'https://base.org' }],
  creator: 'Base',
  publisher: 'Base',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://base.org',
    siteName: 'Base',
    title: 'Base | Ethereum L2 Blockchain - Build Onchain Apps',
    description:
      'Base is a secure, low-cost Ethereum Layer 2 blockchain built on Optimism. Build decentralized apps, DeFi protocols, NFTs, and smart contracts with EVM compatibility and Coinbase integration.',
    images: [
      {
        url: 'https://base.org/images/base-open-graph.png',
        width: 1200,
        height: 630,
        alt: 'Base - Ethereum L2 Blockchain',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@base',
    creator: '@base',
    title: 'Base | Ethereum L2 Blockchain - Build Onchain Apps',
    description:
      'Base is a secure, low-cost Ethereum Layer 2 blockchain built on Optimism. Build decentralized apps, DeFi protocols, NFTs, and smart contracts.',
    images: ['https://base.org/images/base-open-graph.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://base.org',
  },
  verification: {
    google: 'lqwNRCxYlFLIcX9EiKAvE4k4ZT8JGpdWgehEIPA7y1Y',
  },
};

export default async function BaseOrgLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Structured Data for SEO */}
      <OrganizationSchema />
      <WebsiteSchema />
      <SoftwareApplicationSchema />

      <div className="text-black bg-white transition-colors">
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

        {/* Gas Price Dropdown - Top Right */}
        <div className="hidden fixed top-4 right-4 z-50 lg:block">
          <DynamicWrappedGasPriceDropdown />
        </div>
      </div>
    </>
  );
}
