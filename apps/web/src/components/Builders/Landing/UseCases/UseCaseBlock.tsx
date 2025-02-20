'use client';

import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
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
      <Link href={href}>
        <div className="flex h-[320px] w-full flex-col items-center rounded-2xl bg-dark-palette-backgroundAlternate">
          {children}
        </div>
      </Link>
      <div className="flex flex-col gap-2">
        <Title level={TitleLevel.Title3} as="h3" className="font-medium text-white">
          {title}
        </Title>
        <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
          {description}
        </Title>
      </div>
      <ButtonWithLinkAndEventLogging
        variant={ButtonVariants.SecondaryOutline}
        linkClassNames="w-fit"
        buttonClassNames="flex items-center justify-between px-4 pb-2.5 pt-3 group font-medium"
        href={href}
        target="_blank"
        eventName={`developers_build-scale-monetize_${title.replace(/\s+/g, '-').toLowerCase()}`}
      >
        <div className="flex items-center gap-4">
          <span>Get started</span>
          <div className="transition-transform duration-200 group-hover:translate-x-1">
            <Icon name="arrowRight" width={16} height={16} color="white" />
          </div>
        </div>
      </ButtonWithLinkAndEventLogging>
    </div>
  );
}
