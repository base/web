import { GradientCircle } from 'apps/web/src/components/GradientCircle/GradientCircle';
import ImageAdaptive from 'apps/web/src/components/ImageAdaptive';

type GradientRowProps = {
  /** @default false */
  inverted?: boolean;
  className?: string;
};

async function GradientRow({ inverted = false, className }: GradientRowProps) {
  return (
    <div
      className={`flex flex-row justify-center gap-2 p-2 xl:gap-4 xl:p-4 ${
        inverted ? 'scale-y-[-1]' : ''
      } lg:max-w-[1300px] ${className ?? ''}`}
    >
      <GradientCircle className="hidden h-[60px] w-[60px] md:h-[100px] md:w-[100px] lg:inline-block xl:h-[171px] xl:w-[171px]" />
      <GradientCircle className="h-[60px] w-[60px] md:h-[100px] md:w-[100px] xl:h-[171px] xl:w-[171px]" />
      <GradientCircle className="h-[60px] w-[60px] rotate-[315deg] md:h-[100px] md:w-[100px] xl:h-[171px] xl:w-[171px]" />
      <GradientCircle className="h-[60px] w-[60px] rotate-[270deg] md:h-[100px] md:w-[100px] xl:h-[171px] xl:w-[171px]" />
      <GradientCircle className="h-[60px] w-[60px] rotate-[225deg] md:h-[100px] md:w-[100px] xl:h-[171px] xl:w-[171px]" />
      <GradientCircle className="h-[60px] w-[60px] rotate-180 md:h-[100px] md:w-[100px] xl:h-[171px] xl:w-[171px]" />
      <GradientCircle className="hidden h-[60px] w-[60px] rotate-180 md:h-[100px] md:w-[100px] lg:inline-block xl:h-[171px] xl:w-[171px]" />
    </div>
  );
}

export async function Hero() {
  // negative top margin so it underlays the Nav
  return (
    <div className="flex w-full flex-col items-center bg-black pb-10 pt-28 lg:pb-20 lg:pt-32">
      <GradientRow className="hidden md:flex" inverted />
      <ImageAdaptive
        priority
        quality={100}
        src="/images/about-hero.png"
        alt="Our past present and future is on chain"
        width={1300}
        height={76}
        className="hidden py-4 md:flex md:w-[500px] lg:w-[700px] xl:w-[1300px]"
      />
      <GradientRow />
      <GradientRow className="hidden md:flex" />
    </div>
  );
}
