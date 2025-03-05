import { StaticImageData } from 'next/image';
import tweet1 from 'apps/web/src/components/Builders/AgentKit/assets/tweet1.jpg';
import tweet2 from 'apps/web/src/components/Builders/AgentKit/assets/tweet2.jpg';
import tweet3 from 'apps/web/src/components/Builders/AgentKit/assets/tweet3.jpg';
import tweet4 from 'apps/web/src/components/Builders/AgentKit/assets/tweet4.jpg';
import tweet5 from 'apps/web/src/components/Builders/AgentKit/assets/tweet5.png';

type Tweet = {
  image?: StaticImageData | string;
  name: string;
  username: string;
  content: string;
};

export const TWEETS: Tweet[] = [
  {
    image: tweet1,
    name: 'Astronauthi',
    username: '@astronau_thi',
    content: `Super impressed with how easy it is to create and deploy an AI agent using the Coinbase CDP Agent Toolkit. Looking forward to building some amazing stuff with it!

@kleffew94 @coinbasedev`,
  },
  {
    image: tweet2,
    name: 'Anderson',
    username: '@MrAndersonChen',
    content: `How powerful is an AI agent paired with a crypto wallet?

I ran an AI agent using Coinbase AgentKit, and it’s amazing. I can query my ETH balance and send transactions just by asking my agent—the best wallet experience I’ve ever had.

Shout out to @CoinbaseDev and @kleffew94
!`,
  },
  {
    image: tweet3,
    name: 'Derek Brown',
    username: '@derekbrown',
    content: `Stay tuned to @base and @coinbasedev over the next couple of weeks.

Just got done meeting with some of their team and they're cooking.

Exciting roadmap, which overlaps with Native quite well. 

Shout out to @MurrLincoln and @johnp2879 for spending some time with a dev today.`,
  },
  {
    image: tweet4,
    name: 'jacky (:',
    username: '@Jhuang0804',
    content: `@CoinbaseDev agentkit — makes it super easy to create a AI agent + have them utilize the blockchain! cc: @MurrLincoln & @nemild`,
  },
  {
    image: tweet5,
    name: 'Julian Gay',
    username: '@juliangay',
    content: `Had fun coding an AI agent with access to wallet, funding and trading via @CoinbaseDev tx to @MurrLincoln and @kleffew94 for making it so easy 🔥 a few keys and you're gtg!`,
  },
];
