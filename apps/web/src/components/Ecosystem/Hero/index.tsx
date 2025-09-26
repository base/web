import { Button, ButtonSizes } from 'apps/web/src/components/Button/Redesign/Button';

import Container from 'apps/web/src/components/base-org/Container';
import HeroBackground from 'apps/web/src/components/Brand/Hero/Background';
import ecosystemImg from 'apps/web/public/images/backgrounds/ecosystem.webp';
import { AnimatedTitle } from 'apps/web/src/components/AnimatedTitle';

const heroBackgroundConfig = {
  imageUrl: ecosystemImg.src,
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

export function EcosystemHero() {
  return (
    <Container className="gap-y-10 lg:pt-0">
      <div className="relative z-20 col-span-full h-[412px] w-full pb-0 lg:col-span-10 lg:h-[670px]">
        <AnimatedTitle titleLines={['Ecosystem']} />
      </div>
      <div className="absolute -bottom-[4.5rem] left-0 right-0 top-0 z-10 overflow-hidden lg:-bottom-20">
        <HeroBackground config={heroBackgroundConfig} />
      </div>
      <div className="col-span-full flex w-full flex-row gap-x-[min(2.25vw,_32px)] sm:grid sm:grid-cols-9 lg:hidden">
        <Button className="flex-1 sm:col-span-3" size={ButtonSizes.Small}>
          Build on Base
        </Button>
        <Button className="flex-1 sm:col-span-3" size={ButtonSizes.Small}>
          Get Base app
        </Button>
      </div>
    </Container>
  );
}
