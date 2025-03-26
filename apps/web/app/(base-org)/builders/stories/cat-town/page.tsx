import { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';
import { BottomCta } from 'apps/web/src/components/Builders/Stories/BottomCta';
import catTown from 'apps/web/src/components/Builders/Stories/StoryCards/assets/catTown.svg';

export default function CatTown() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          title="Tara of Cat Town"
          description="Building a cozy onchain life sim game, combining gaming with DeFi to create a thriving community."
          href="https://www.cat.town"
          region="United Kingdom"
          project="Cat Town"
          onBaseSince="April 2024"
          image={catTown as StaticImageData}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="Cat Town is a cozy onchain life sim game where cats live, trade, and build a thriving community together. We're building on Base with sustainable tokenomics and an autonomous in-game economy, Cat Town creates an experience that combines traditional gaming with DeFi.

            Players can participate in many onchain games including fishing tournaments, gacha collections, and quests, all while earning KIBBLE - the game's utility token. Each activity contributes to the town's economy through a balanced system of rewards, burning mechanisms, and reinvestment into the ecosystem to return value to loyal players. Utilizing smart contracts, AI agents, NFTs and verifiable randomness for fair gameplay, Cat Town offers a long-term commitment to sustainability.
          "
        />
        <Blockquote
          quote="Creating Cat Town has opened doors I never could have imagined. It's incredible to see how our little game has made a real difference."
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="I've found that the opportunity to work with other builders in an exciting and fast-paced environment has been invaluable. I've met some incredibly talented people through building and socializing in the Base community, forming partnerships and collaborations that have led to me having a greater understanding of the space. I've been building on Base for almost a year and I've learned a lot in such a short space of time. I've found that there's always something new to learn and someone eager to help. There is a remarkable energy in the Base community, it can only be described as optimistic and excited for the future. At meetup events there is definitely a strong sense of community and I was lucky enough to attend Base Camp 001 and experience it first hand!"
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="I've found that building on Base has opened so many doors for me. In my experience, Base offers the perfect balance of established infrastructure and emerging opportunities, and having Coinbase's brand behind it gives me real confidence. In an uncertain world, Base is a certainty I've come to rely on. What excites me most is how the ecosystem is mature enough to provide reliable development tools and support, yet still young enough that we builders can make a significant impact in shaping the future."
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="The 24/7 nature of crypto means staying on top of news and developments is a constant challenge while building a project. Being part of a small team of only three full-time devs, I often find it a struggle to balance development work with community engagement, market awareness, technical updates, and of course... the real world! I'm lucky that we have such a supportive community who help where they can.
            While my daily routine might look different from a traditional work schedule, I've embraced it. Coming from outside the crypto world, I've faced my share of challenges adapting, but when I compare my knowledge now to where I was a year ago, it's incredible to see how far I've come.
          "
        />
        <QABlock
          question="What advice do you have to other builders?"
          answer="I'll share my biggest piece of advice: do not stop building. I've learned that consistency and persistence are my greatest assets onchain. I would advise everyone to make sure to keep refining your project, learn from feedback, and continue to engage with your community - even during market downturns or when you encounter technical challenges. From my experience, the most successful projects aren't just built during the hype - they're built by people like me who remain dedicated to their vision while staying flexible enough to adapt to new opportunities.
            Creating Cat Town has opened doors I never could have imagined. Through Cat Town and our community we've been able to help support animal shelters and charities worldwide. From contributing to typhoon Gaemi relief efforts to aiding senior citizens in the Philippines, it's incredible to see how our little game has made a real difference. What started as a creative project has grown into something that truly helps others, and that means the world to me.
            You really won't know where your onchain journey will take you or the change it can bring to the world, so don't worry too much. Just keep building!
          "
        />
        <QABlock question="What's one word you think of when you think of Base?" answer="BASED." />
        <ReadMore
          previousLabel="David of Blocklords"
          previousHref="/builders/stories/blocklords"
          nextLabel="AchillesHodl of Byte"
          nextHref="/builders/stories/byte"
        />
        <BottomCta />
      </main>
    </Container>
  );
}
