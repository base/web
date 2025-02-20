import { Marquee } from 'apps/web/src/components/Developers/Shared/Marquee';
import { TweetCard } from 'apps/web/src/components/Developers/Shared/TweetCard';
import tweet from 'apps/web/src/components/Developers/Appchains/tweet.png';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Title from 'apps/web/src/components/base-org/typography/Title';

export function Testimonials() {
  return (
    <div className="flex w-full flex-col gap-10">
      <Title level={TitleLevel.Title1}>Some thoughts from our customers.</Title>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee className="[--duration:20s]" pauseOnHover>
          <TweetCard
            image={tweet}
            name="sweetman.eth"
            username="@sweetman.eth"
            content="Just built a musician-friendly AI Agent using @base and @CoinbaseDev AgentKit! Watch how you can go from zero to shipping in less than 10 minutes—and maybe snag part of the $30k grants!"
          />
          <TweetCard
            image={tweet}
            name="sweetman.eth"
            username="@sweetman.eth"
            content="Just built a musician-friendly AI Agent using @base and @CoinbaseDev
AgentKit! Watch how you can go from zero to shipping in less than 10 minutes—and maybe snag part of the $30k grants!"
          />
          <TweetCard
            image={tweet}
            name="sweetman.eth"
            username="@sweetman.eth"
            content="Just built a musician-friendly AI Agent using @base and @CoinbaseDev AgentKit! Watch how you can go from zero to shipping in less than 10 minutes—and maybe snag part of the $30k grants!"
          />
        </Marquee>
      </div>
    </div>
  );
}
