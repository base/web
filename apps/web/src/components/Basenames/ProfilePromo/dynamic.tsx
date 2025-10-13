'use client';
import dynamic from 'next/dynamic';

const DynamicProfilePromo = dynamic(
  async () => import('apps/web/src/components/Basenames/ProfilePromo'),
  {
    ssr: false,
  },
);

export default DynamicProfilePromo;
