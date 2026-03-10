import AnalyticsProvider from 'apps/web/contexts/Analytics';
import ErrorsProvider from 'apps/web/contexts/Errors';
import { Hero } from 'apps/web/src/components/base-org/root/Redesign/Hero';
import Container from 'apps/web/src/components/base-org/Container';
import { SectionBaseEcosystem } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseEcosystem';
import dynamic from 'next/dynamic';
import RenderOnInView from 'apps/web/src/components/base-org/shared/RenderOnInView';
import { WebGLCanvasClient } from './WebGLCanvasClient';

// Heavy section (cobe, motion, many images) — separate chunk for faster incremental compiles
const SectionBaseApp = dynamic(
  () =>
    import('apps/web/src/components/base-org/root/Redesign/Section/BaseApp').then(
      (mod) => mod.SectionBaseApp,
    ),
  { ssr: true },
);

const SectionBaseBuilders = dynamic(
  async () =>
    import('apps/web/src/components/base-org/root/Redesign/Section/BaseBuilders').then(
      (mod) => mod.SectionBaseBuilders,
    ),
  {
    ssr: true,
  },
);

const SectionBaseJoin = dynamic(
  async () =>
    import('apps/web/src/components/base-org/root/Redesign/Section/BaseJoin').then(
      (mod) => mod.SectionBaseJoin,
    ),
  {
    ssr: true,
  },
);

const SectionBasePay = dynamic(
  async () =>
    import('apps/web/src/components/base-org/root/Redesign/Section/BasePay').then(
      (mod) => mod.SectionBasePay,
    ),
  {
    ssr: true,
  },
);

const SectionBlog = dynamic(
  async () =>
    import('apps/web/src/components/base-org/root/Redesign/Section/Blog').then(
      (mod) => mod.SectionBlog,
    ),
  {
    ssr: true,
  },
);

const SectionBaseChain = dynamic(
  async () =>
    import('apps/web/src/components/base-org/root/Redesign/Section/BaseChain').then(
      (mod) => mod.SectionBaseChain,
    ),
  {
    ssr: true,
  },
);

export default async function Home() {
  return (
    <ErrorsProvider context="base_landing_page">
      <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="-z-1 h-full w-full">
          <WebGLCanvasClient />
        </div>
      </div>
      <Container className="lg:pt-0">
        <div className="col-span-full flex flex-col gap-12">
          <Hero />
          {true && <SectionBaseEcosystem />}
          <RenderOnInView>
            <SectionBaseChain />
          </RenderOnInView>
          <SectionBaseApp />
          <RenderOnInView>
            <SectionBaseBuilders />
          </RenderOnInView>
          <RenderOnInView>
            <SectionBasePay />
          </RenderOnInView>
          <RenderOnInView>
            <SectionBaseJoin />
          </RenderOnInView>
          <RenderOnInView>
            <AnalyticsProvider context="blog_carousel">
              <SectionBlog />
            </AnalyticsProvider>
          </RenderOnInView>
        </div>
      </Container>
    </ErrorsProvider>
  );
}
