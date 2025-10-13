import type { Metadata } from 'next';

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

export default async function StatsLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="h-screen w-screen">
          {children}
      </div>
  );
}
