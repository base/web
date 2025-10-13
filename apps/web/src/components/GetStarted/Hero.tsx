import Image from 'next/image';
import getStartedHeroImage from './images/getstarted-hero-img.png';
import Container from 'apps/web/src/components/base-org/Container';

export default async function Hero() {
  return (
    <div className="bg-[#283145] pt-24">
      <Container>
        <div className="flex w-full flex-col items-center justify-between gap-20 sm:flex-row">
          <div className="max-w-full lg:max-w-[450px]">
            <h1 className="mb-6 font-display text-4xl leading-tight sm:text-5xl lg:mb-10 lg:text-[80px] lg:leading-none">
              Resources for Builders
            </h1>
            <span className="text-lg sm:text-xl lg:text-2xl">
              Get help to build and grow your project on Base with our Builder Resource Kit
            </span>
          </div>
          <div className="self-end overflow-hidden">
            <div className="mr-[-25px] max-h-[591px] max-w-[788px] 2xl:mr-0">
              <Image src={getStartedHeroImage} alt="onchain summer" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
