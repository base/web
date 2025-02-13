'use client';

import { ReactNode } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

type CtaBannerProps = {
  title: string;
  description?: string;
  cta?: ReactNode;
};

export function CtaBanner({ title, description, cta }: CtaBannerProps) {
  return (
    <section className="w-full bg-black">
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate px-8 py-16 py-8">
        <Title level={TitleLevel.Title1} as="h2" className="max-w-2xl max-sm:hidden sm:text-center">
          {title}
        </Title>
        <Title
          level={TitleLevel.Title3}
          as="h2"
          className="max-w-2xl text-center font-bold sm:hidden"
        >
          {title}
        </Title>
        {description && (
          <Title level={TitleLevel.Title4} as="p" className="mt-2 sm:text-center">
            {description}
          </Title>
        )}
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">{cta}</div>
      </div>
    </section>
  );
}
