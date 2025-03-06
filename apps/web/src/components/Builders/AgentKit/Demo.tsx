import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { FORK_TEMPLATE_LINK } from 'apps/web/src/components/Builders/AgentKit/links';
import { AnimatedList } from 'apps/web/src/components/Builders/Shared/AnimatedList';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import classNames from 'classnames';
import Link from 'next/link';
import { ReactNode } from 'react';

type Item = {
  text: string;
  type: 'user' | 'agent';
  content?: ReactNode;
};

const MESSAGES: Item[] = [
  {
    text: 'Send 0.001 ETH to jesse.base.eth',
    type: 'user',
  },
  {
    text: 'Sent 0.001 ETH to jesse.base.eth',
    type: 'agent',
    content: (
      <div className="mt-2 flex justify-center rounded-lg border border-[#FCB983] p-2 text-[#FCB983]">
        View transaction
      </div>
    ),
  },
  {
    text: 'Deposit 1000 USDC',
    type: 'user',
  },
  {
    text: 'Deposited 1000 USDC on Morpho',
    type: 'agent',
    content: (
      <div className="mt-2 flex justify-center rounded-lg border border-[#FCB983] p-2 text-[#FCB983]">
        Check your deposit
      </div>
    ),
  },
  {
    text: 'Send Base Paint #534 to vitalik.base.eth',
    type: 'user',
  },
  {
    text: 'Sent Base Paint #534',
    type: 'agent',
  },
];

const MESSAGE_ARRAY = Array.from({ length: 10 }, () => MESSAGES).flat();

function Message({ text, content, type }: Item) {
  const isAgent = type === 'agent';
  return (
    <figure
      className={classNames(
        'relative  flex min-h-fit w-full max-w-[500px] cursor-pointer overflow-hidden',
        'transition-all duration-200 ease-in-out',
        '[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]',
        'transform-gpu dark:bg-transparent dark:backdrop-blur-md',
        isAgent ? 'mr-auto items-start' : 'ml-auto items-end',
      )}
    >
      <div
        className={classNames(
          'flex shrink flex-col overflow-hidden rounded-lg p-4',
          isAgent ? 'mr-auto bg-[#330D00]' : 'ml-auto bg-dark-palette-backgroundAlternate',
        )}
      >
        <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
          <span className="text-sm sm:text-lg">{text}</span>
        </figcaption>
        {content}
      </div>
    </figure>
  );
}

export function Demo() {
  return (
    <div className="flex w-full max-w-4xl flex-col items-center overflow-hidden rounded-lg border border-palette-line border-opacity-40">
      <div className="flex w-full justify-between border-b border-palette-line border-opacity-40 bg-dark-palette-backgroundAlternate px-6 py-4">
        <Title level={TitleLevel.Headline}>Based Agent</Title>
        <Link
          href={FORK_TEMPLATE_LINK}
          target="_blank"
          className="flex gap-2 text-[#E66020] transition-all duration-200 ease-in-out hover:scale-[103%]"
        >
          <Title level={TitleLevel.Headline}>Fork the template</Title>
          <Icon name="fork" color="currentColor" />
        </Link>
      </div>
      <div
        className={classNames(
          'relative flex h-[500px] w-full flex-col overflow-hidden rounded-lg p-6 ',
        )}
      >
        <AnimatedList>
          {MESSAGE_ARRAY.map((item) => (
            <Message {...item} key={crypto.randomUUID()} />
          ))}
        </AnimatedList>
      </div>
    </div>
  );
}
