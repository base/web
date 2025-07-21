'use client';

import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import {
  Button,
  ButtonVariants,
  ButtonSizes,
} from 'apps/web/src/components/Button/Redesign/Button';
import Link from 'apps/web/src/components/Link';

export default function AcceptBasePay() {
  return (
    <section className="col-span-full py-12 text-black">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:gap-24">
        <Title level={TitleLevel.H4Regular}>Accept Base Pay on your online store</Title>
        <div className="flex flex-col gap-8">
          <Title level={TitleLevel.H5Regular}>
            Base Pay works on stores running Shopify payments. You can also accept Base Pay by using
            our SDK.
          </Title>
          <Button variant={ButtonVariants.Primary} size={ButtonSizes.Small} className="w-1/2 px-2">
            <Link
              href="https://docs.base.org/base-account/guides/accept-payments"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accept Base Pay
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
