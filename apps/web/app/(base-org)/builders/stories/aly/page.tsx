import Container from 'apps/web/src/components/base-org/Container';
import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';
import mtsumi from 'apps/web/src/components/Builders/Stories/StoryCards/assets/mtsumi.webp';
import Image from 'next/image';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';

export default function Aly() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          date="January 11, 2025"
          title="Aly Mtsumi of Element Pay"
          description="Enabling users to buy stablecoins through m-pesa and spend them."
          region="Nairobi, Kenya"
          project="Element Pay"
          onBaseSince="December 2023"
          image={mtsumi}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="At ElementPay, our goal is simple, bring users on-chain for cheap, fast transactions and
            real freedom with their money. No more waiting on banks or paying high transaction fees.
            By leveraging stablecoins, we're unlocking participation in a truly global economy
            where anyone can send, receive, and manage funds with ease. We're trying to make
            crypto accessible and empowering everyone to experience the future of finance."
        />
        <Blockquote
          quote="It feels like we're building the future together."
          color="text-dark-green-60"
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="The best part of building on Base is how seamless and developer-friendly the ecosystem is.
          Base's support for builders and its vision of making on-chain accessible to everyone aligns perfectly
          with what we're trying to achieve with Element. It feels like we're building the future together."
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="Go for it! Base offers an incredible combination of low fees, scalability, and a strong, supportive community.
          It's the perfect foundation to focus on innovation without worrying about the limitations or costs of traditional
          chains. Plus, being part of Base means contributing to a vision of bringing more people on-chain and making decentralized
          finance truly accessible. If you're building for the future, Base is where you want to be."
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="One of the biggest challenges we've faced is navigating the legal and regulatory landscape, especially when it
          comes to scaling. Crypto is still new territory in Kenya, and figuring out how to stay compliant while offering services
          like onramps and offramps hasn't been easy. It takes a lot of research, planning, and sometimes even creative problem-solving
          to ensure we can expand while staying within the rules."
        />
        <QABlock
          question="What advice do you have to other builders?"
          answer=" Think big! Base is a blank canvas for so much more. Whether it's using blockchain for carbon trading like I've
          considered with my iSafari app, letting users sell their photos as NFTs, or building something transformative like a platform
          to securely store and access medical records globally, the potential is limitless."
        />
        <ReadMore
          previousLabel="Back to Stories"
          previousHref="/builders/stories"
          nextLabel="Ngan Nguyen of Onchain Buster"
          nextHref="/builders/stories/ngan"
        />
      </main>
    </Container>
  );
}
