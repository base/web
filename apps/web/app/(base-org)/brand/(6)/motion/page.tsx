import { Hero } from 'apps/web/src/components/Brand/Hero';
import { Banner } from 'apps/web/src/components/Brand/Banner';
import motionImg from 'apps/web/public/images/backgrounds/motion.webp';
import { MotionMotion } from './sections/1-motion';
import { MotionPrinciple } from './sections/2-principle';
import { MotionType } from './sections/3-type';
import { MotionTheSquare } from './sections/4-the-square';
import { MotionLogotype } from './sections/5-logotype';
import { MotionIntroOutro } from './sections/6-intro-outro';
import { MotionMisuse } from './sections/7-misuse';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';

export default function Page() {
  return (
    <>
      <Hero title="Motion" imageUrl={motionImg.src} />
      <Banner>
        Motion is how Base breathes. It bridges utility and emotion, turning static screens into
        living spaces that react to every tap. Our animation system is lightweight, snappy, and
        purpose-driven; every keyframe either guides attention or rewards action. Shared easing
        curves create family resemblance across product, social, and event screens, while duration
        and scale flex to fit context. Think of motion as a friendly handshake-quick, confident, and
        memorable-never a magic trick that steals focus.
      </Banner>

      <MotionMotion />
      <MotionPrinciple />
      <MotionType />
      <MotionTheSquare />
      <MotionLogotype />
      <MotionIntroOutro />
      <MotionMisuse />

      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[4], BRAND_PAGES_INDEX[6]];
