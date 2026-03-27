import type { Metadata } from 'next';
import { Suspense } from 'react';
import Content from 'apps/web/src/components/Ecosystem/Content';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { EcosystemHero } from 'apps/web/src/components/Ecosystem/Hero';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: 'Ecosystem - Explore Apps Built on Base',
  description:
    'Discover the Base ecosystem: DeFi protocols, NFT marketplaces, gaming, social apps, and more. Explore 1000+ decentralized applications built on Base L2.',
  keywords: [
    'base ecosystem',
    'base apps',
    'base dapps',
    'defi on base',
    'nft base',
    'base projects',
    'ethereum l2 apps',
    'blockchain applications',
    'web3 ecosystem',
  ],
  openGraph: {
    title: 'Base Ecosystem - Explore Apps Built on Base',
    description:
      'Discover the Base ecosystem: DeFi protocols, NFT marketplaces, gaming, social apps, and more. Explore 1000+ decentralized applications built on Base L2.',
    url: 'https://base.org/ecosystem',
    images: [
      {
        url: 'https://base.org/images/base-open-graph.png',
        width: 1200,
        height: 630,
        alt: 'Base Ecosystem',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Base Ecosystem - Explore Apps Built on Base',
    description:
      'Discover 1000+ decentralized applications built on Base: DeFi, NFTs, gaming, social, and more.',
  },
  alternates: {
    canonical: 'https://base.org/ecosystem',
  },
};

export default async function Ecosystem() {
  return (
    <>
      <div
        id="webgl-canvas-ecosystem"
        className="overflow-hidden absolute top-0 left-0 w-full h-full"
      >
        <div className="w-full h-full -z-1">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="lg:pt-0">
        <main className="flex flex-col col-span-full items-center w-full">
          <EcosystemHero />

          <Suspense fallback={<div />}>
            <Content />
          </Suspense>
        </main>
      </Container>
    </>
  );
}
