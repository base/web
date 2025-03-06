import { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';
import { BottomCta } from 'apps/web/src/components/Builders/Stories/BottomCta';
import byte from 'apps/web/src/components/Builders/Stories/StoryCards/assets/byteAi.svg';

export default function Byte() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          title="AchillesHodl of Byte"
          description="Pioneering the future of food ordering with AI and crypto, transforming human language into the ultimate user interface."
          href="https://www.tryabyte.xyz/"
          region="United States of America"
          project="Byte"
          onBaseSince="November 2024"
          image={byte as StaticImageData}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="Byte is the world's first autonomous AI agent that can deliver food right to your doorstep. Byte provides the world's best food ordering experience through the power of AI and crypto. We believe that human language is the new UX. Any online surface where there are users interacting in human language, they can connect to Byte to order the perfect meal with a 0-click, agentic checkout experience. The future of food ordering is based."
        />
        <Blockquote
          quote="Be active, engage in the community, and build something. You never know where the opportunities will come from."
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="The best part about building on Base is the great developer ecosystem. There are so many great developer tools built by Coinbase Developer Platform that make it easy to get started building and get support in your builder journey. There are also plenty of other great products being built on Base which we can benefit from and easily connect with. I think the EVM compatibility, fast transactions, and low transaction costs attract the developer community who then build amazing products that we can use."
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="I would join Base because of the innovation happening. Every day I learn about another great developer product that I want to dive deep on and learn more about how I can use it to help build my product. The community is also super inviting and helpful. I get approached a lot by builders who see what I'm working on and help point me to tools and solutions that can help me. This is especially helpful because when there are so many great products, it is much easier to speak with developers who have built them or worked with them so I can ramp up quickly and start building."
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="Finding wallet solutions for the consumer AI space has been a challenge for me. There are many solutions I see out there but it is hard to find the right one that can be scaled to user applications. I've now found some great ones that I'm starting to build with, thanks to some helpful advice from other builders on base. I think that the AI agent wallet space is so early that it can be hard to find the right solutions that meet this use case. I see so much being built on base though that I don't think this will be a challenge for builders in a few months from now."
        />
        <ReadMore
          previousLabel="Tara of Cat Town"
          previousHref="/builders/stories/cat-town"
          nextLabel="Merlin of Morpho"
          nextHref="/builders/stories/morpho"
        />
        <BottomCta />
      </main>
    </Container>
  );
}
