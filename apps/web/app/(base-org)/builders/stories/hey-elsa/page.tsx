import { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';
import { BottomCta } from 'apps/web/src/components/Builders/Stories/BottomCta';
import heyElsa from 'apps/web/src/components/Builders/Stories/StoryCards/assets/elsa.svg';

export default function HeyElsa() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          title="Dhawal Shah of HeyElsa AI"
          description="Revolutionizing crypto trading with AI-driven intelligence, pushing boundaries in portfolio management."
          href="https://www.heyelsa.ai/"
          region="India"
          project="HeyElsa AI"
          onBaseSince="August 2024"
          image={heyElsa as StaticImageData}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="Elsa is an advanced crypto intelligence platform that combines custom LLM technology with AI agent orchestration to revolutionize crypto trading and portfolio management."
        />
        <Blockquote
          quote="Base provides unmatched developer support and fosters a highly constructive community that inspires innovation and encourages you to push boundaries."
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="Unparalleled support, constructive feedback from the community, and available distribution."
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="Base provides unmatched developer support and fosters a highly constructive community that inspires innovation and encourages you to push boundaries. If you want to build and win, Base is the place to be."
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="Finding a product marketing fit is the biggest challenge. Also, narratives move fast in crypto."
        />
        <QABlock
          question="What advice do you have to other builders?"
          answer="Build with conviction."
        />
        <QABlock
          question="What's one word you think of when you think of Base?"
          answer="Relentless."
        />
        <ReadMore
          previousLabel="Merlin of Morpho"
          previousHref="/builders/stories/morpho"
          nextLabel="Alexander of Aerodrome"
          nextHref="/builders/stories/aerodrome"
        />
        <BottomCta />
      </main>
    </Container>
  );
}
