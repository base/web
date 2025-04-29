import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Link from 'apps/web/src/components/Link';

export function Pricing() {
  return (
    <div className="flex w-full justify-between gap-10 max-sm:flex-col sm:items-center">
      <div className="flex max-w-2xl shrink flex-col gap-6">
        <Title level={TitleLevel.Display3} className="font-bold sm:max-w-md">
          Best-in-class pricing, built for developers.
        </Title>
      </div>

      <div className="flex w-[355px] flex-col gap-4 rounded-lg border border-[#8A919E]/20 bg-dark-palette-backgroundAlternate p-6">
        <Title level={TitleLevel.Title3}>Appchain plan</Title>
        <div className="flex  w-full items-center justify-between gap-4 pt-2">
          <Title level={TitleLevel.Headline}>Testnet</Title>
          <Text variant={TextVariant.Body}>Starting at $1 per month</Text>
        </div>
        <div className="flex  w-full items-center justify-between gap-4">
          <Title level={TitleLevel.Headline}>Mainnet</Title>
          <Link
            href="https://app.deform.cc/form/4705840f-d6ae-4a31-b52d-906f89a8e206/?page_number=0"
            target="_blank"
            className="text-palette-primary"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
