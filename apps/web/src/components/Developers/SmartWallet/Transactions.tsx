import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import fund from './fund.png';
import faceID from './face.png';
import onboarding from './onboarding.png';
import Image from 'next/image';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';

const TRANSACTIONS = [
  {
    label: 'Onboard',
    title: 'Connect with Coinbase Wallet',
    description: 'The easiest way to sign in to new and existing onchain apps.',
    content: <Image src={onboarding} alt="Onboarding" width={276} />,
  },
  {
    label: 'Fund',
    title: 'Coinbase onramp and balances',
    description: 'Users can use their Coinbase balances onchain or fund with debit card.',
    content: <Image src={fund} alt="Fund" width={436} />,
  },
  {
    label: 'Transact',
    title: 'Sponsored transactions and Spend Permissions passkey.',
    description:
      'Make transactions painless with sponsored gas. Use Spend Permissions to transact with no user interaction required. ',
    content: <Image src={faceID} alt="Face ID" width={276} />,
  },
];

export function Transactions() {
  return (
    <div className="flex w-full flex-col gap-12 sm:items-center sm:gap-40">
      <Title level={TitleLevel.Display3} className="font-bold max-sm:hidden">
        Onchain transactions without distractions
      </Title>
      <Title level={TitleLevel.Title3} className="font-bold sm:hidden">
        Onchain transactions without distractions
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
              <div className="flex w-[540px] max-w-full flex-col items-center justify-center rounded-xl bg-dark-palette-backgroundAlternate p-12">
                {transaction.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
