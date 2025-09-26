import { Hero } from 'apps/web/src/components/Brand/Hero';

/* Primary Typeface imports */
import { PrimaryTypeface } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface';
import { IntroducingBaseSans } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/1-introducing-base-sans';
import { CharacterSet } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/2-character-set';
import { Features } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/3-features';
import { AccessingBrandElements } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/4-accessing-brand-elements';
import { PrimaryTypefaceImage } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/5-image';
import { TypeSystem } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/6-type-system';
import { TypeSystemExamples } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/7-type-system-examples';
import { FallbackSystemFont } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/1-primary-typeface/8-fallback-system-font';

/* Secondary Typeface imports */
import { SecondaryTypeface } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/2-secondary-typeface';
import { Typetesting } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/2-secondary-typeface/1-typetesting';
import { Styling } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/2-secondary-typeface/2-styling';
import { Roundness } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/2-secondary-typeface/3-roundness';
import { Hierarchy } from 'apps/web/app/(base-org)/brand/(4)/typography/sections/2-secondary-typeface/4-hierarchy';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';
import typography from 'apps/web/public/images/backgrounds/typography.webp';

export default function Page() {
  return (
    <>
      <Hero title="Typography" imageUrl={typography.src} />

      <PrimaryTypeface />
      <IntroducingBaseSans />
      <CharacterSet />
      <Features />
      <AccessingBrandElements />
      <PrimaryTypefaceImage />
      <TypeSystem />
      <TypeSystemExamples />
      <FallbackSystemFont />

      <SecondaryTypeface />
      <Typetesting />
      <Styling />
      <Roundness />
      <Hierarchy />

      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[2], BRAND_PAGES_INDEX[4]];
