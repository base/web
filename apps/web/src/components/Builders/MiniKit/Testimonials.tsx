import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { TweetCard } from 'apps/web/src/components/Builders/Shared/TweetCard';
import bracky from 'apps/web/src/components/Builders/MiniKit/bracky.png';
import { ButtonWithLinkAndEventLogging } from 'apps/web/src/components/Button/ButtonWithLinkAndEventLogging';
import { ButtonVariants } from 'apps/web/src/components/base-org/Button/types';

const TESTIMONIALS = [
  {
    image: bracky,
    name: 'bracky',
    username: '@bracky',
    cta: (
      <ButtonWithLinkAndEventLogging
        variant={ButtonVariants.Secondary}
        iconName="diagonalUpArrow"
        buttonClassNames="flex w-full rounded-xl"
        href="https://login.coinbase.com/signin"
        target="_blank"
        eventName="minikit-get-started"
        linkClassNames="w-full"
      >
        Go to Warpcast
      </ButtonWithLinkAndEventLogging>
    ),
    content:
      '@bracketgame now operates through Farcaster Frames. The choice of Frames reflects my strategic preference for protocols that concentrate user attention and transaction flow into unified control points....',
  },
  {
    image: bracky,
    name: 'bracky',
    username: '@bracky',
    cta: (
      <ButtonWithLinkAndEventLogging
        variant={ButtonVariants.Secondary}
        iconName="diagonalUpArrow"
        buttonClassNames="flex w-full rounded-xl"
        href="https://login.coinbase.com/signin"
        target="_blank"
        eventName="minikit-get-started"
        linkClassNames="w-full"
      >
        Go to Warpcast
      </ButtonWithLinkAndEventLogging>
    ),
    content:
      '@bracketgame now operates through Farcaster Frames. The choice of Frames reflects my strategic preference for protocols that concentrate user attention and transaction flow into unified control points....',
  },
  {
    image: bracky,
    name: 'bracky',
    username: '@bracky',
    cta: (
      <ButtonWithLinkAndEventLogging
        variant={ButtonVariants.Secondary}
        iconName="diagonalUpArrow"
        buttonClassNames="flex w-full rounded-xl"
        href="https://login.coinbase.com/signin"
        target="_blank"
        eventName="minikit-get-started"
        linkClassNames="w-full"
      >
        Go to Warpcast
      </ButtonWithLinkAndEventLogging>
    ),
    content:
      '@bracketgame now operates through Farcaster Frames. The choice of Frames reflects my strategic preference for protocols that concentrate user attention and transaction flow into unified control points....',
  },
];

export function Testimonials() {
  return (
    <div className="flex w-full flex-col gap-10">
      <div>
        <Title level={TitleLevel.Title1}>Mini apps built with MiniKit.</Title>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {TESTIMONIALS.map((item) => {
          return (
            <div className="mx-auto flex max-w-sm flex-col gap-4 md:mx-0" key={item.name}>
              <TweetCard
                name={item.name}
                username={item.username}
                content={item.content}
                image={item.image}
              />
              {item.cta}
            </div>
          );
        })}
      </div>
    </div>
  );
}
