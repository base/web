'use client';

import Link from 'apps/web/src/components/Link';
import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import Image from 'next/image';
import { customers } from 'apps/web/src/components/Builders/SmartWallet/Customers';

const logoStyle = {
  width: 'auto',
  height: 'auto',
  minWidth: '64px',
  maxWidth: '100%',
  maxHeight: '64px',
};

export function PartnersSection() {
  return (
    <Marquee className="[--duration:60s]" childrenClassName="mr-24 !gap-24">
      {customers.map((customer) => (
        <div className="flex w-[200px] items-center" key={`first-${customer.href}`}>
          <Link href={customer.href} target="_blank" rel="noopener noreferrer">
            <Image
              src={customer.logo}
              alt={String(customer.logo.src)}
              style={logoStyle}
              className="flex-none object-contain opacity-50 transition-opacity hover:opacity-100"
            />
          </Link>
        </div>
      ))}
    </Marquee>
  );
}
