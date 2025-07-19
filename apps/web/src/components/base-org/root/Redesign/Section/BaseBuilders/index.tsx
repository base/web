'use client';

import { ImageType, Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import PrefixAsset from './prefix.svg';
import { Terminal } from './Terminal';

const prefix = PrefixAsset as ImageType;

export function SectionBaseBuilders() {
  return (
    <Section content={content}>
      <div className="col-span-full flex w-full min-h-[500px] md:min-h-[600px] lg:min-h-[700px] xl:min-h-[800px] max-h-[809px] items-center justify-center rounded-lg md:bg-base-gray-25">
        <Terminal />
      </div>
    </Section>
  );
}

const content = {
  prefix: {
    src: prefix.src,
    alt: 'Base Build',
    width: prefix.width,
    height: prefix.height,
  },
  title: 'From idea to app to business',
  description:
    'Base gives builders the tools they need to build, grow, and earn from their apps, at every stage.',
  cta: {
    label: 'Start Building',
    href: 'https://base.org/build',
  },
};
