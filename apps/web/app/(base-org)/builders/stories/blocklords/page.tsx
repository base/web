import { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';
import { BottomCta } from 'apps/web/src/components/Builders/Stories/BottomCta';
import blocklords from 'apps/web/src/components/Builders/Stories/StoryCards/assets/blocklords.svg';

export default function Blocklords() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          title="David Johansson of BLOCKLORDS"
          description="Building a medieval grand strategy game with a player-driven onchain economy."
          href="https://www.blocklords.com/"
          region="Stockholm, Sweden"
          project="BLOCKLORDS"
          onBaseSince="January 2024"
          image={blocklords as StaticImageData}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="BLOCKLORDS is a medieval grand strategy game with a player-driven onchain economy, where you can start as a farmer, rise to a warrior, or even rule as a king. It's all about choice, strategy, and progression. The game is live on the Epic Games Store, making it accessible to a broad audience.

            We also launched BLOCKLORDS Dynasty, a mobile-first companion game built specifically for Base with onchain logic. Last year, Dynasty brought 1.8 million unique wallets to Base, showing that players are ready for deeper blockchain integrations—when done right.
          "
        />
        <Blockquote
          quote="Take risks. Push the limits when designing smart contracts—don't just follow what's been done before. The best innovations come from experimenting."
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="Low fees, strong liquidity, and a growing user base that actually engages with what you're doing. It's a solid base to build on, no pun intended.

            What really stands out, though, is the community and support. The Base team has been super helpful, and events like Base Camp were a great chance for builders to meet up, swap ideas, and just get things done. It's that kind of hands-on support that makes a big difference.
          "
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="We've been building onchain since 2018, deploying hundreds of smart contracts across almost every major chain. Base stands out—not just for the tech, but for how they support builders at scale. They've gone above and beyond to help us onboard users, build new solutions, and tap into real liquidity."
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="Even with Base's low gas fees, we really pushed the limits last year with Dynasty hitting 1.8 million wallets and over 80 million onchain transactions. Since we wanted to sponsor most transactions for early users (shoutout to Paymaster), even those low fees became unsustainable at scale, which added friction for new players.

            The solution? More on this coming soon.
          "
        />
        <QABlock
          question="What advice do you have to other builders?"
          answer="Take risks. Push the limits when designing smart contracts—don't just follow what's been done before. The best innovations come from experimenting.

            Don't raise funds too early. Too much money too soon can be just as bad as not enough. Make sure you have product-market fit before locking yourself into investor expectations.
          "
        />
        <ReadMore
          previousLabel="Back to Stories"
          previousHref="/builders/stories"
          nextLabel="Tara of Cat Town"
          nextHref="/builders/stories/cat-town"
        />
        <BottomCta />
      </main>
    </Container>
  );
}
