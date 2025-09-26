import Link from 'apps/web/src/components/Link';
import { ReactNode } from 'react';
import { forwardRef } from 'react';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

type Props = {
  cardNumber: number;
  title: string;
  description: string;
  href: string;
  content: ReactNode;
};

export const UseCaseCard = forwardRef<HTMLAnchorElement, Props>(
  ({ cardNumber, title, description, href, content }, ref) => {
    const isExternal = href.startsWith('http');

    return (
      <Link
        className="group flex h-full w-[350px] flex-col justify-between rounded-lg bg-gray-90 p-6 transition-colors hover:bg-gray-80 md:w-[450px]"
        linkRef={ref}
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
      >
        <div className="h-[65px] font-mono text-2xl font-light">0{cardNumber}</div>
        <div className="flex flex-col gap-3 mb-6">
          <Title level={TitleLevel.H2Regular}>{title}</Title>
          <Text variant={TextVariant.Body} className="!text-base-gray-200">
            {description}
          </Text>
        </div>
        <div className="mt-auto flex h-[269px] w-full flex-col">
          <div className="my-auto">{content}</div>
        </div>
      </Link>
    );
  },
);

UseCaseCard.displayName = 'UseCaseCard';
