import { Hero } from 'apps/web/src/components/About/Hero';
import BuildingBase from 'apps/web/src/components/BuildingBase/BuildingBase';

import { Divider } from 'apps/web/src/components/Divider/Divider';
import { GetConnected } from 'apps/web/src/components/GetConnected/GetConnected';
import { StartBuildingOnBase } from 'apps/web/src/components/StartBuildingOnBase/StartBuildingOnBase';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://base.org'),
  title: `Base | About`,
  openGraph: {
    title: `Base | About`,
    url: `/about`,
  },
};

export default async function About() {
  return (
    <main className="flex w-full flex-col items-center bg-black">
      <Hero />
      <BuildingBase />
      <Divider />
      <StartBuildingOnBase />
      <Divider />
      <GetConnected />
    </main>
  );
}
