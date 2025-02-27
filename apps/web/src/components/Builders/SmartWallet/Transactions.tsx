import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import fund from './fund.png';
import faceID from './face.png';
import onboarding from './onboarding.png';
import Image from 'next/image';

const TRANSACTIONS = [
  {
    label: 'Onboard',
    title: 'Connect with Coinbase Wallet',
    description: 'The fastest way to sign in to apps across the open internet.',
    content: <Image src={onboarding} alt="Onboarding" width={276} />,
  },
  {
    label: 'Fund',
    title: 'Get users onchain in seconds',
    description: 'Built-in user onramps including Apple Pay, debit card, and Coinbase balances.',
    content: <Image src={fund} alt="Fund" width={436} />,
  },
  {
    label: 'Transact',
    title: 'Create seamless onchain experiences',
    description:
      'Make it easy for anyone to come onchain. Less wallet pop-ups, less signatures, less friction. ',
    content: <Image src={faceID} alt="Face ID" width={276} />,
  },
];

export function Transactions() {
  return (
    <div className="flex w-full flex-col gap-12 sm:items-center sm:gap-40">
      <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
        Universal SSO, with payments and identity built-in
      </Title>
      <Title level={TitleLevel.Title1} className="font-bold sm:hidden">
        Universal SSO, with payments and identity built-in
      </Title>

      <div className="flex w-full flex-col gap-10">
        {TRANSACTIONS.map((transaction, i) => {
          return (
            <div
              key={transaction.label}
              className={
                i === 1
                  ? 'flex w-full flex-col-reverse justify-between gap-6 sm:flex-row-reverse sm:items-center sm:gap-10'
                  : 'flex w-full flex-col-reverse justify-between gap-6 sm:flex-row sm:items-center sm:gap-10'
              }
            >
              <div className="flex max-w-full flex-col sm:w-[540px]">
                <div className="hidden text-[#578BFA] sm:flex">
                  <Title level={TitleLevel.Title3} className="font-bold">
                    {transaction.label}
                  </Title>
                </div>
                <div className="hidden flex-col gap-2 sm:flex">
                  <Title level={TitleLevel.Title1} className="pt-3 font-bold">
                    {transaction.title}
                  </Title>
                  <Title
                    level={TitleLevel.Title2}
                    className="pt-1 text-dark-palette-foregroundMuted"
                  >
                    {transaction.description}
                  </Title>
                </div>

                <div className="flex flex-col gap-2 sm:hidden">
                  <Title level={TitleLevel.Title3} as="h3" className="font-medium text-white">
                    {transaction.title}
                  </Title>
                  <Title level={TitleLevel.Title4} className="text-dark-palette-foregroundMuted">
                    {transaction.description}
                  </Title>
                </div>
              </div>
              <div className="flex w-[540px] max-w-full flex-col items-center justify-center rounded-2xl bg-dark-palette-backgroundAlternate p-12">
                {transaction.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
