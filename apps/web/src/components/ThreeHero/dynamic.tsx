'use client';

import dynamic from 'next/dynamic';

const SceneDynamic = dynamic(
  async () => import('apps/web/src/components/ThreeHero').then((mod) => mod.Scene),
  { ssr: false },
);

export default SceneDynamic;
