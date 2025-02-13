'use client';

import { ReactNode } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

type CtaBannerProps = {
  title: string;
  description: string;
  cta?: ReactNode;
};

export function CtaBanner({ title, description, cta }: CtaBannerProps) {
  return (
    <section className="w-full bg-black">
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate py-16">
        <Title level={TitleLevel.Title1} as="h2">
          {title}
        </Title>
        <Title level={TitleLevel.Title4} as="p" className="mt-2 max-sm:text-center">
          {description}
        </Title>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">{cta}</div>
      </div>
    </section>
  );
}
