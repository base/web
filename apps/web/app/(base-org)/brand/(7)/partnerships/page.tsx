import { Hero } from 'apps/web/src/components/Brand/Hero';
import { Banner } from 'apps/web/src/components/Brand/Banner';
import partnerships from 'apps/web/public/images/backgrounds/partnerships.webp';
import { PartnershipsLockup } from 'apps/web/app/(base-org)/brand/(7)/partnerships/sections/1-lockup';
import { PartnershipsConstruction } from 'apps/web/app/(base-org)/brand/(7)/partnerships/sections/2-construction';
import { PartnershipsLockupSystem } from 'apps/web/app/(base-org)/brand/(7)/partnerships/sections/3-lockup-system';
import { PartnershipsLockupExamples } from 'apps/web/app/(base-org)/brand/(7)/partnerships/sections/4-lockup-examples';
import { InvertedPartnerLockup } from 'apps/web/app/(base-org)/brand/(7)/partnerships/sections/inverted-partner-lockup';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';

const patternAtlas = {
  url: '/patterns/pat-colorful.png',
  columns: 6,
};

export default function Page() {
  return (
    <>
      <Hero title="Partnerships" imageUrl={partnerships.src} altPattern={patternAtlas} />
      <Banner>
        Effective collaboration starts with a balanced lockup that honors both brands while staying
        true to the Base toolkit. Lead with the logotype lockup when Base owns the initiative;
        invert the order when we support a partner launch. Always match optical weight, not literal
        size, and preserve clear space so neither mark feels crowded.
      </Banner>

      <PartnershipsLockup />
      <PartnershipsConstruction />
      <PartnershipsLockupSystem />
      <PartnershipsLockupExamples />
      <InvertedPartnerLockup />

      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[5], BRAND_PAGES_INDEX[7]];
