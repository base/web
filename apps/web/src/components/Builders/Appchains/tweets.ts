import { StaticImageData } from 'next/image';
import blocklords from 'apps/web/src/components/Builders/Appchains/assets/blocklords.jpg';
import superchamps from 'apps/web/src/components/Builders/Appchains/assets/superchamps.jpg';
import mvl from 'apps/web/src/components/Builders/Appchains/assets/mvl.jpg';
import horizen from 'apps/web/src/components/Builders/Appchains/assets/horizen.jpg';
import metacade from 'apps/web/src/components/Builders/Appchains/assets/metacade.jpg';
import dcp from 'apps/web/src/components/Builders/Appchains/assets/dcp.jpg';
import proof8 from 'apps/web/src/components/Builders/Appchains/assets/proof8.jpg';

type Tweet = {
  image?: StaticImageData;
  name: string;
  username: string;
  content: string;
  link: string;
};

export const TWEETS: Tweet[] = [
  {
    image: blocklords,
    name: 'Blocklords',
    username: '@BLOCKLORDS',
    content: `With Dynasty’s scale—1.8 million wallets and over 80 million transactions—we needed something faster, cheaper, and built for scale.`,
    link: 'https://x.com/BLOCKLORDS',
  },
  {
    image: superchamps,
    name: 'Super Champs',
    username: '@SuperChampsHQ',
    content: `Gaming on Base is going to be like gaming on iOS. Base Appchains provide us scale and consistent throughput.`,
    link: 'https://x.com/SuperChampsHQ',
  },
  {
    image: mvl,
    name: 'MVL',
    username: '@mvlchain',
    content: `The cost-efficient data posting capabilities of Base Appchains, along with access to Coinbase tools, will provide a breakthrough advantage for processing onchain data for TADA/MVL.`,
    link: 'https://x.com/mvlchain',
  },
  {
    image: horizen,
    name: 'Horizen',
    username: '@horizenglobal',
    content: `Base’s appchain model allows us to integrate privacy at scale while ensuring low fees, seamless adoption, and compliance-ready solutions.`,
    link: 'https://x.com/horizenglobal',
  },
  {
    image: metacade,
    name: 'Metacade',
    username: '@Metacade_',
    content: `Having our own Appchain on Base gives us endless possibilities to expand our service offerings with greater customization and scalability for us and our gaming partners.`,
    link: 'https://x.com/Metacade_',
  },
  {
    image: dcp,
    name: 'Decentralized Pictures',
    username: '@DCP_Foundation',
    content: `Appchains have been a game-changer in helping us build faster, simpler, and more powerful products. With dedicated scalability and support, appchains will allow us to focus on our mission and onchain products.`,
    link: 'https://x.com/DCP_Foundation',
  },
  {
    image: proof8,
    name: 'Proof 8',
    username: '@weareproof8',
    content: `We utilise blockchain tech to provide verifiable ownership of inventory managed by warehouses and distilleries, along with provenance and auditability. These enterprise customers prioritise performance, security and privacy.`,
    link: 'https://x.com/weareproof8',
  },
];
