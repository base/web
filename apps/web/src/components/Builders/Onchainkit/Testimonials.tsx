import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Builders/Shared/TweetCard';
import { TWEETS } from 'apps/web/src/components/Builders/Onchainkit/tweets';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function Testmonials() {
  const mid = Math.ceil(TWEETS.length / 2);
  const firstHalf = TWEETS.slice(0, mid);
  const secondHalf = TWEETS.slice(mid);

  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>Builders ship faster with OnchainKit</Title>

      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          {firstHalf?.map((tweet) => (
            <TweetCard key={tweet.username} {...tweet} />
          ))}
        </Marquee>
        <Marquee className="[--duration:20s]" reverse pauseOnHover>
          {secondHalf?.map((tweet) => (
            <TweetCard key={tweet.username} {...tweet} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute left-0 top-0 h-full w-4 bg-gradient-to-r from-black to-transparent" />

        <div className="pointer-events-none absolute right-0 top-0 h-full w-4 bg-gradient-to-l from-black to-transparent" />
      </div>
    </div>
  );
}
