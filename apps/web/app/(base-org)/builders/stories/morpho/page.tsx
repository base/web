import { StaticImageData } from 'next/image';
import Container from 'apps/web/src/components/base-org/Container';
import { Hero } from 'apps/web/src/components/Builders/Stories/StoryPages/Hero';
import { QABlock } from 'apps/web/src/components/Builders/Stories/StoryPages/QABlock';
import { Blockquote } from 'apps/web/src/components/Builders/Stories/StoryPages/Blockquote';
import { ReadMore } from 'apps/web/src/components/Builders/Stories/StoryPages/ReadMore';
import { BottomCta } from 'apps/web/src/components/Builders/Stories/BottomCta';
import morpho from 'apps/web/src/components/Builders/Stories/StoryCards/assets/morpho.svg';

export default function Morpho() {
  return (
    <Container className="!px-[1.5rem] lg:!px-[2rem]">
      <main className="mb-32 flex min-h-screen w-full flex-col items-center bg-black pt-20">
        <Hero
          title="Merlin Egalite of Morpho"
          description="Building the largest and most secure lending protocol on Base, leveraging the power of the Superchain ecosystem."
          href="https://www.morpho.xyz/"
          region="Paris, France"
          project="Morpho"
          onBaseSince="February 2024"
          image={morpho as StaticImageData}
        />
        <QABlock
          question="Tell us a little about the app you are building on Base?"
          answer="We're building Morpho, a fully immutable and permissionless lending protocol with isolated markets. It's the largest and most secure lending protocol on Base."
        />
        <Blockquote
          quote="Base is at the crossroad of DeFi, memecoins, NFT, and Coinbase's large distribution network."
        />
        <QABlock
          question="What's the best part of building on Base?"
          answer="Base is part of the Superchain ecosystem. Hence, it benefits from continuous improvements on the OP stack which will be translated into cheap fees, greater UX for users, and some day, liquidity reaggregation across the different chains part of the ecosystem."
        />
        <QABlock
          question="What do you want to tell builders who are thinking about Base? Why would you convince them to join Base?"
          answer="Base is at the crossroad of DeFi, memecoins, NFT, and Coinbase's large distribution network. It's one of the best L2 to build tools and apps that benefit from synergistic integrations!"
        />
        <QABlock
          question="What challenges have you experienced?"
          answer="No real challenges actually. Base is EVM based so was pretty simple to integrate on our side."
        />
        <QABlock
          question="What advice do you have to other builders?"
          answer="Builders should focus on one thing: reach PMF which is usually synonymous with providing value and fixing real problems."
        />
        <QABlock question="What's one word you think of when you think of Base?" answer="Based." />
        <ReadMore
          previousLabel="AchillesHodl of Byte"
          previousHref="/builders/stories/byte"
          nextLabel="Dhawal of HeyElsa AI"
          nextHref="/builders/stories/hey-elsa"
        />
        <BottomCta />
      </main>
    </Container>
  );
}
