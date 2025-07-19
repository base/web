import Link from 'apps/web/src/components/Link';
import { ReactNode } from 'react';
import { forwardRef } from 'react';

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
        <div className="mb-6 flex flex-col gap-3">
          <div className="font-sans text-2xl">{title}</div>
          <div className="font-sans text-gray-15">{description}</div>
        </div>
        <div className="mt-auto flex h-[269px] w-full flex-col">
          <div className="my-auto">{content}</div>
        </div>
      </Link>
    );
  },
);

UseCaseCard.displayName = 'UseCaseCard';
