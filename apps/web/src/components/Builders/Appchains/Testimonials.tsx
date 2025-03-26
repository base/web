import { Marquee } from 'apps/web/src/components/Builders/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Builders/Shared/TweetCard';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TWEETS } from 'apps/web/src/components/Builders/Appchains/tweets';
import Link from 'apps/web/src/components/Link';

export function Testimonials() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>What our early customers are saying</Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          {TWEETS?.map((tweet) => {
            return (
              <Link key={tweet.username} target="_blank" href={tweet.link}>
                <TweetCard
                  image={tweet.image}
                  name={tweet.name}
                  username={tweet.username}
                  content={tweet.content}
                />
              </Link>
            );
          })}
        </Marquee>
      </div>
    </div>
  );
}
