'use client';

import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function UseCaseBlock({
  children,
  title,
  description,
  href,
}: {
  children: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex h-[320px] w-full flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate">
        {children}
      </div>
      <div className="flex flex-col gap-2">
        <Title level={TitleLevel.Title3} as="h3" className="font-bold text-white">
          {title}
        </Title>
        <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
          {description}
        </Title>
      </div>
      <ButtonWithLinkAndEventLogging
        variant={ButtonVariants.SecondaryOutline}
        buttonClassNames="flex w-40 items-center justify-between px-4 py-3 group"
        href={href}
        eventName={`developers_build-scale-monetize_${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex w-40 items-center justify-between">
          <span>Get started</span>
          <div className="transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrowRight" width={20} height={20} color="white" />
          </div>
        </div>
      </ButtonWithLinkAndEventLogging>
    </div>
  );
}
