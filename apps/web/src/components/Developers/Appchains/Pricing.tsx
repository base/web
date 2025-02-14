import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

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
          <Text variant={TextVariant.Body}>$1 per month</Text>
        </div>
        <div className="flex  w-full items-center justify-between gap-4">
          <Title level={TitleLevel.Headline}>Mainnet</Title>
          <Text variant={TextVariant.Body}>$3k per month</Text>
        </div>
      </div>
    </div>
  );
}
