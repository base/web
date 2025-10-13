'use client';

import Card from 'apps/web/src/components/base-org/Card';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'apps/web/src/components/Link';
import React from 'react';

type CardLinkProps = {
  children: React.ReactNode;
  href: string;
};

export default function CardLink({ children, href }: CardLinkProps) {
  const externalResource = href.startsWith('https://');
  const target = externalResource ? '_blank' : undefined;
  return (
    <Link href={href} target={target} className="group w-full">
      <Card
        innerClassName="p-4 transition-all bg-[#181818] group-hover:bg-[#1C1C1C]"
        wrapperClassName="transition-all"
      >
        {children}
        <i className="absolute right-4 top-4 opacity-50 transition-all group-hover:opacity-100">
          <Icon name="baseOrgDiagonalUpArrow" color="currentColor" height="0.8rem" width="0.8rem" />
        </i>
      </Card>
    </Link>
  );
}
