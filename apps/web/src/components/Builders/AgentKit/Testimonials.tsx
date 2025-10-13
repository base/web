import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Builders/Shared/TweetCard';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TWEETS } from 'apps/web/src/components/Builders/AgentKit/tweets';

export function Testmonials() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>Powering the most creative onchain agents</Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          {TWEETS?.map((tweet) => {
            return (
              <TweetCard
                key={tweet.username}
                image={tweet.image}
                name={tweet.name}
                username={tweet.username}
                content={tweet.content}
              />
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
