import ErrorsProvider from 'apps/web/contexts/Errors';
import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { Hero } from 'apps/web/src/components/base-org/root/Redesign/Vision/Hero';
import { SectionWhy } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Why';
import { SectionBelieve } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Believe';
import { SectionBento } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Bento';
import { VisionPreFooter } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/VisionPreFooter';

export default async function Vision() {
  return (
    <ErrorsProvider context="base_landing_page">
      <div id="webgl-canvas-vision" className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="-z-1 h-full w-full">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="lg:pt-0">
        <div className="col-span-full flex flex-col gap-12">
          <Hero />
          <SectionWhy />
          <SectionBelieve />
          <SectionBento />
          <VisionPreFooter />
        </div>
      </Container>
    </ErrorsProvider>
  );
}
