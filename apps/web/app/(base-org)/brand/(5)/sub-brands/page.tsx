import { Hero } from 'apps/web/src/components/Brand/Hero';
import { Banner } from 'apps/web/src/components/Brand/Banner';
import { SubBrandsLockup } from 'apps/web/app/(base-org)/brand/(5)/sub-brands/sections/1-lockup';
import { SubBrandsStructure } from 'apps/web/app/(base-org)/brand/(5)/sub-brands/sections/2-structure';
import { SubBrandsLockups } from 'apps/web/app/(base-org)/brand/(5)/sub-brands/sections/3-lockups';
import { SubBrandsAbstractLockups } from 'apps/web/app/(base-org)/brand/(5)/sub-brands/sections/4-abstract-lockups';
import { SubBrandsInUse } from 'apps/web/app/(base-org)/brand/(5)/sub-brands/sections/5-in-use';
import subBrandsImg from 'apps/web/public/images/backgrounds/sub-brands.webp';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';

const patternAtlas = {
  url: '/patterns/pat-colorful.png',
  columns: 6,
};

export default function Page() {
  return (
    <>
      <Hero title="Sub-brands" imageUrl={subBrandsImg.src} altPattern={patternAtlas} />
      <Banner>
        Think of sub-brands as rooms in one house: different purposes, shared foundation. Sub-brands
        are functional branches, not campaign slogans. They signal distinct product pillars and
        audiences. The voice shifts slightly per audience — friendly for users, technical for
        builders — but typography, color, and motion stay constant so the family feels cohesive.
      </Banner>

      <SubBrandsLockup />
      <SubBrandsStructure />
      <SubBrandsLockups />
      <SubBrandsAbstractLockups />
      <SubBrandsInUse />

      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[3], BRAND_PAGES_INDEX[5]];
