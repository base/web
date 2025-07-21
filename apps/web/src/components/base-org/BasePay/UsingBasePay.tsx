import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

export default function UsingBasePay() {
  return (
    <section className="col-span-full pb-24 pt-12 text-black">
      <div className="flex flex-col items-center justify-between gap-12 md:flex-row md:items-start md:gap-24">
        <Title level={TitleLevel.H5Regular} as="h1">
          Using Base Pay
        </Title>
        <div className="flex flex-col gap-12 md:w-1/2 lg:w-3/5">
          <Title level={TitleLevel.H4Regular}>Select Base Pay at checkout</Title>
          <Title level={TitleLevel.H6Regular}>Available on participating Shopify stores</Title>
          <div className="h-[1px] w-full bg-black" />

          <Title level={TitleLevel.H4Regular}>Confirm your purchase</Title>
          <Title level={TitleLevel.H6Regular}>
            Simple Face ID verification or fingerprint scan
          </Title>
          <div className="h-[1px] w-full bg-black" />

          <Title level={TitleLevel.H4Regular}>Transaction completes instantly</Title>
          <Title level={TitleLevel.H6Regular}>Cheaper and faster than any credit card</Title>
          <div className="h-[1px] w-full bg-black" />

          <Title level={TitleLevel.H4Regular}>Continue earning 4.1% APY</Title>
          <Title level={TitleLevel.H6Regular}>Earn on your remaining USDC balance</Title>
          <div className="h-[1px] w-full bg-black" />
        </div>
      </div>
    </section>
  );
}
