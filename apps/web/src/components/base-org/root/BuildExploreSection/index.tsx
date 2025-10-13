import Title from 'apps/web/src/components/base-org/typography/Title';

import CardLink from 'apps/web/src/components/base-org/CardLink';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import AnalyticsProvider from 'apps/web/contexts/Analytics';
import docsIllustration from './assets/docs_illustration.svg';
import resourcesIllustration from './assets/resources_illustration.svg';
import appsIllustration from './assets/apps_illustration.svg';
import bridgeIllustration from './assets/bridge_illustration.svg';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';
import { StaticImageData } from 'next/image';

export default async function BuildExploreSection() {
  return (
    <section>
      <AnalyticsProvider context="build_tiles">
        <Title level={TitleLevel.Title1}>Build</Title>
        <div className="mb-12 mt-8 flex w-full flex-col gap-4 md:flex-row">
          <CardLink href="https://docs.base.org/">
            <div className="flex items-center gap-4">
              <ImageAdaptive
                src={docsIllustration as StaticImageData}
                alt="Base docs"
                title="Base docs illustration"
                className="max-h-[4rem]"
              />
              <div>
                <Text className="mr-2 inline-block">Docs</Text>{' '}
                <Text className="inline-block opacity-50">
                  Get started building on Base by reading our docs.
                </Text>
              </div>
            </div>
          </CardLink>
          <CardLink href="/build">
            <div className="flex items-center gap-4">
              <ImageAdaptive
                src={resourcesIllustration as StaticImageData}
                alt="Resources"
                title="Resources illustration"
                className="max-h-[4rem]"
              />
              <div>
                <Text className="mr-2 inline-block">Resources</Text>{' '}
                <Text className="inline-block opacity-50">
                  Resources for builders to build, fund and grow your apps.
                </Text>
              </div>
            </div>
          </CardLink>
        </div>
      </AnalyticsProvider>
      <AnalyticsProvider context="explore_tiles">
        <Title level={TitleLevel.Title1}>Explore</Title>
        <div className="mt-8 flex w-full flex-col gap-4 md:flex-row">
          <CardLink href="/ecosystem">
            <div className="flex items-center gap-4">
              <ImageAdaptive
                src={appsIllustration as StaticImageData}
                alt="Resources"
                title="Resources illustration"
                className="max-h-[4rem]"
              />
              <div>
                <Text className="mr-2 inline-block">Apps</Text>{' '}
                <Text className="inline-block opacity-50">
                  Explore the apps in the Base ecosystem.
                </Text>
              </div>
            </div>
          </CardLink>
          <CardLink href="https://bridge.base.org/">
            <div className="flex items-center gap-4">
              <ImageAdaptive
                src={bridgeIllustration as StaticImageData}
                alt="Bridge"
                title="Bridge illustration"
                className="max-h-[4rem]"
              />
              <div>
                <Text className="mr-2 inline-block">Bridge</Text>{' '}
                <Text className="inline-block opacity-50">Bring your assets to Base.</Text>
              </div>
            </div>
          </CardLink>
        </div>
      </AnalyticsProvider>
    </section>
  );
}
