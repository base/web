import AnalyticsProvider from 'apps/web/contexts/Analytics';
import ErrorsProvider from 'apps/web/contexts/Errors';
import { Hero } from 'apps/web/src/components/base-org/root/Redesign/Hero';
import { SectionBaseApp } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseApp';
import { SectionBaseBuilders } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseBuilders';
import { SectionBasePay } from 'apps/web/src/components/base-org/root/Redesign/Section/BasePay';
import { SectionBaseChain } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseChain';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { SectionBaseJoin } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseJoin';
import { SectionBlog } from 'apps/web/src/components/base-org/root/Redesign/Section/Blog';
import Container from 'apps/web/src/components/base-org/Container';
import { SectionBaseEcosystem } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseEcosystem';

export default async function Home() {
  return (
    <ErrorsProvider context="base_landing_page">
      <div id="webgl-canvas" className="overflow-hidden absolute top-0 left-0 w-full h-full">
        <div className="w-full h-full -z-1">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="lg:pt-0">
        <div className="flex flex-col col-span-full gap-12">
          <Hero />
          <SectionBaseEcosystem />
          <SectionBaseApp />
          <SectionBaseBuilders />
          <SectionBaseChain />
          <SectionBasePay />
          <SectionBaseJoin />
          <AnalyticsProvider context="blog_carousel">
            <SectionBlog />
          </AnalyticsProvider>
        </div>
      </Container>
    </ErrorsProvider>
  );
}
