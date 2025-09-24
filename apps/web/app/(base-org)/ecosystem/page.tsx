import type { Metadata } from 'next';
import { Suspense } from 'react';
import Content from 'apps/web/src/components/Ecosystem/Content';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { EcosystemHero } from 'apps/web/src/components/Ecosystem/Hero';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | Ecosystem`,
  openGraph: {
    title: `Base | Ecosystem`,
    url: `/ecosystem`,
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
