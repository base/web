import tweet3 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet3.jpg';
import tweet1 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet1.jpg';
import tweet2 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet2.jpg';
import tweet4 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet4.jpg';
import tweet5 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet5.jpg';
import tweet6 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet6.jpg';
import tweet7 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet7.jpg';
import tweet8 from 'apps/web/src/components/Builders/Onchainkit/assets/tweet8.jpg';
import jesse from 'apps/web/src/components/Builders/Onchainkit/assets/jesse.jpg';
import { StaticImageData } from 'next/image';

type Tweet = {
  image?: StaticImageData;
  name: string;
  username: string;
  content: string;
};

export const TWEETS: Tweet[] = [
  {
    image: tweet3,
    name: 'Moonsters',
    username: '@MoonstersX',
    content:
      'What a pleasure it was to implement @onchainkit on @base! Not only does it look amazing, but the code is absolutely beautiful. Great work! Keep it up! 🚀🔥 Big thanks to all the based people making it possible. 💙 #Base #Onchainkit',
  },
  {
    image: tweet1,
    name: 'ArtGridz',
    username: '@artgridz',
    content: 'OnchainKit is super based',
  },
  {
    image: tweet2,
    name: 'Thomas',
    username: '@torok_tomi',
    content:
      "I just became a huge fan of @OnchainKit!  If you're diving into onchain app development, this is hands down the best library to kickstart your journey.",
  },
  {
    image: tweet4,
    name: 'BARIO.ETH',
    username: '@BaseBario',
    content:
      "The world’s first co-owned agentic NFT Paperboy's token-gated dApp is powered by @OnchainKit.",
  },
  {
    image: jesse,
    name: 'jesse.base.eth',
    username: '@jessepollak',
    content: 'the builders like using @onchainkit on @base',
  },
  {
    image: tweet5,
    name: 'artiom',
    username: '@artignatyev',
    content: `merry xmas 🐬✨ the dolphin team is cooking

  just shipped the buy feature powered by @OnchainKit

  now you can buy $DOLPHIN via apple pay, credit card, or coinbase smart-wallet in just a few taps — directly on http://dolphin.now`,
  },
  {
    image: tweet6,
    name: 'Tinydinomfers',
    username: '@tinydinomfers',
    content: `sneak peek 👀

our minting page is proudly built using the
@OnchainKit
 by
@base


stay tuned, and we’ll show you how it all works! 🚀`,
  },
  {
    image: tweet7,
    name: 'SandwichCat ($SACA)',
    username: '@SandwichCatCoin',
    content: `Sandwich Cat has spoken: funding your $SACA journey just got faster.

With Fund Card, you can now add one-click crypto purchases directly to your web3 app. It’s sleek, simple, and already live on our homepage.

Why wait? More $SACA, fewer clicks. Get on it: https://sacaonbase.com`,
  },
  {
    image: tweet8,
    name: 'story91.base.eth',
    username: '@Crypto_Story_',
    content: `SPHERE, your gateway to the Base ecosystem! Soon...

🚀 Swap, buy, mint NFTs, and connect with the Base community—all in one place.

Track your stats, join base.eth Chat, and stay updated with the latest network status. 🌐

Built on
@base
 with
@OnchainKit`,
  },
  // {
  //   image: tweet6,
  //   name: '',
  //   username: '',
  //   content: ``
  // },
];
