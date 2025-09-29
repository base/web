import type { Metadata } from 'next';
import AnalyticsProvider from '../../../contexts/Analytics';

import Container from 'apps/web/src/components/base-org/Container';
import { WebGLCanvas } from 'apps/web/src/components/WebGL/WebGLCanvas';
import { ResourcesHero } from 'apps/web/src/components/Resources/section/Hero';
import ResourcesEssentials from 'apps/web/src/components/Resources/section/Essentials';
import ResourcesFundSection from 'apps/web/src/components/Resources/section/Fund';
import ResourcesGetNoticedSection from 'apps/web/src/components/Resources/section/GetNoticed';
import ResourcesGetInvolvedSection from 'apps/web/src/components/Resources/section/GetInvolved';
import ResourcesStartBuildingSection from 'apps/web/src/components/Resources/section/StartBuilding';
import ResourcesBuildWithUs from 'apps/web/src/components/Resources/section/BuildWithUs';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: 'Base | Resources',
  openGraph: {
    title: 'Base | Resources',
    url: '/resources',
    images: ['https://base.org/images/getstarted-open-graph.png'],
  },
};

export default async function Resources() {
  return (
    <AnalyticsProvider context="builder_resource_kit">
      <div id="webgl-canvas" className="absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="-z-1 h-full w-full">
          <WebGLCanvas />
        </div>
      </div>
      <Container className="lg:pt-0">
        <div className="col-span-full flex flex-col gap-12">
          <ResourcesHero />
          <ResourcesEssentials />
          <ResourcesFundSection />
          <ResourcesGetNoticedSection />
          <ResourcesGetInvolvedSection />
          <ResourcesStartBuildingSection />
          <ResourcesBuildWithUs />
        </div>
      </Container>
    </AnalyticsProvider>
  );
}
