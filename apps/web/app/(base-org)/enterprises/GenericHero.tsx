import { Button, ButtonSizes } from 'apps/web/src/components/Button/Redesign/Button';

import Container from 'apps/web/src/components/base-org/Container';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';
import type { HeroBackgroundConfig } from 'apps/web/src/components/Brand/Hero/Background';

type ButtonProps = {
  text: string;
  href: string;
};

type GenericHeroProps = {
  title: string;
  imageUrl: string;
  buttons: [ButtonProps];
};

export function GenericHero({ title, imageUrl, buttons }: GenericHeroProps) {
  const heroBackgroundConfig: HeroBackgroundConfig = {
    imageUrl: imageUrl,
    altPattern: {
      url: '/patterns/pat-colorful.png',
      columns: 6,
    },
    className: 'h-full w-full',
    enableInteractivity: true,
    velocityDissipation: 0.94,
    radius: 0.25,
    bottomFade: true,
  };
  return (
    <Container className="pointer-events-none h-[40vh] gap-y-10 lg:pt-0">
      <div className="relative z-20 col-span-full h-[412px] w-full pb-0 lg:col-span-10 lg:h-[670px]">
        <AnimatedTitle titleLines={[title]} />
      </div>
      <div className="pointer-events-auto absolute -bottom-[4.5rem] left-0 right-0 top-0 z-10 overflow-hidden lg:-bottom-20">
        <HeroBackground config={heroBackgroundConfig} />
      </div>
    </Container>
  );
}
