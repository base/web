import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';

export default function UsingBasePay() {
  return (
    <section className="col-span-full pb-24 pt-12 text-black">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start md:gap-24">
        <Title level={TitleLevel.H1Regular} as="h1">
          Using Base Pay
        </Title>
        <div className="flex flex-col gap-6 md:w-1/2 lg:w-3/5">
          <div className="flex flex-col gap-2">
            <Title level={TitleLevel.H2Regular}>Select Base Pay at checkout</Title>
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Available on participating Shopify stores
            </Text>
          </div>
          <div className="h-[1px] w-full bg-black" />

          <div className="flex flex-col gap-2">
            <Title level={TitleLevel.H2Regular}>Confirm your purchase</Title>
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Simple Face ID verification or fingerprint scan
            </Text>
          </div>

          <div className="h-[1px] w-full bg-black" />

          <div className="flex flex-col gap-2">
            <Title level={TitleLevel.H2Regular}>Transaction completes instantly</Title>
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Cheaper and faster than any credit card
            </Text>
          </div>
          <div className="h-[1px] w-full bg-black" />

          <div className="flex flex-col gap-2">
            <Title level={TitleLevel.H2Regular}>Continue earning 3.35% APY</Title>
            <Text variant={TextVariant.Body} className="!text-base-gray-200">
              Earn on your remaining USDC balance
            </Text>
          </div>
          <div className="h-[1px] w-full bg-black" />
        </div>
      </div>
    </section>
  );
}
