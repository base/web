'use client';

import { ReactNode } from 'react';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';

type CtaBannerProps = {
  title: string;
  description: string;
  cta?: ReactNode;
  sectionClassName?: string;
};

export function CtaBanner({ title, description, cta, sectionClassName }: CtaBannerProps) {
  return (
    <section className={classNames('w-full bg-black', sectionClassName)}>
      <div className="flex flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate py-16 text-center">
        <div className="px-7">
          <Title level={TitleLevel.Title1} as="h2" className="max-sm:hidden">
            {title}
          </Title>
          <Title level={TitleLevel.Title3} as="h2" className="font-bold sm:hidden">
            {title}
          </Title>
          <Title level={TitleLevel.Title4} as="p" className="mt-2 max-sm:hidden sm:text-center">
            {description}
          </Title>
          <Text variant={TextVariant.Body} className="mt-2 sm:hidden sm:text-center">
            {description}
          </Text>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {cta}
        </div>
      </div>
    </section>
  );
}
