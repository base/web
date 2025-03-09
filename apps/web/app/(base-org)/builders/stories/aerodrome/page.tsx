import { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';
import { BottomCta } from 'apps/web/src/components/Builders/Stories/BottomCta';
import aerodrome from 'apps/web/src/components/Builders/Stories/StoryCards/assets/aerodrome.svg';

export default function Aerodrome() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          title="Alexander of Aerodrome Finance"
          description="Serving as the essential trading and liquidity marketplace on Base, driving the future of decentralized exchanges."
          href="https://www.aerodrome.finance/"
          region="United States of America"
          project="Aerodrome Finance"
          onBaseSince="August 2023"
          image={aerodrome as StaticImageData}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="Aerodrome is a decentralized exchange, designed to serve as the essential trading and liquidity marketplace on Base."
        />
        <Blockquote
          quote="Base has proven itself as a dominant L2, truly capable of bringing the world onchain. Still day one."
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="The active community, supportive ecosystem, and collective ambition."
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="Base has proven itself as a dominant L2, truly capable of bringing the world onchain. Still day one."
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="Inspiring the broader crypto community to think bigger and longer term."
        />
        <QABlock
          question="What advice do you have to other builders?"
          answer="Lean in, keep building."
        />
        <QABlock question="What's one word you think of when you think of Base?" answer="LFB!" />
        <ReadMore
          previousLabel="Dhawal of HeyElsa AI"
          previousHref="/builders/stories/hey-elsa"
          nextLabel="Back to Stories"
          nextHref="/builders/stories"
        />
        <BottomCta />
      </main>
    </Container>
  );
}
