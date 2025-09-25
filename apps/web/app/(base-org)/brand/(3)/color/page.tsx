import { Hero } from 'apps/web/src/components/Brand/Hero';
import { Banner } from 'apps/web/src/components/Brand/Banner';
import colorImg from 'apps/web/public/images/backgrounds/color.webp';
import { ColorOurPalette } from 'apps/web/app/(base-org)/brand/(3)/color/sections/1-our-palette';
import { ColorBaseBlue } from 'apps/web/app/(base-org)/brand/(3)/color/sections/2-base-blue';
import { ColorColorValuesHexRgb } from 'apps/web/app/(base-org)/brand/(3)/color/sections/3-color-values-hex-rgb';
import { ColorColorValuesPantoneCmyk } from 'apps/web/app/(base-org)/brand/(3)/color/sections/4-color-values-pantone-cmyk';
import { ColorUsingColor } from 'apps/web/app/(base-org)/brand/(3)/color/sections/5-using-color';
import { ColorUsingSecondaryColor } from 'apps/web/app/(base-org)/brand/(3)/color/sections/6-using-secondary-color';
import { ColorUsingColorOnWeb } from 'apps/web/app/(base-org)/brand/(3)/color/sections/7-using-color-on-web';
import { ColorInteractionAndLegibility } from 'apps/web/app/(base-org)/brand/(3)/color/sections/8-color-interaction-and-legibility';
import { ColorProduct } from 'apps/web/app/(base-org)/brand/(3)/color/sections/9-product';
import { ColorMisuse } from 'apps/web/app/(base-org)/brand/(3)/color/sections/10-misuse';
import { ColorInUse } from 'apps/web/app/(base-org)/brand/(3)/color/sections/11-in-use';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';

const patternAtlas = {
  url: '/patterns/pat-colorful.png',
  columns: 6,
};

export default function Page() {
  return (
    <>
      <Hero title="Color" imageUrl={colorImg.src} altPattern={patternAtlas} />
      <Banner>
        <p>Color does more than decorate: it signals action, emotion, and accessibility.</p>
        <p>
          Base Blue is our anchor: an RGB native hue optimized for every screen. New primaries
          inject warmth or urgency; cool neutrals balance layouts and meet contrast requirements.
        </p>
        <p>
          Think rhythm, not rainbow: lead with monochrome and spotlight one accent. Keep color
          tokens locked, verify AA contrast in both themes, and remember that restraint breeds
          recognition: if every element shouts, none of them will be heard.
        </p>
      </Banner>

      <ColorOurPalette />
      <ColorBaseBlue />
      <ColorColorValuesHexRgb />
      <ColorColorValuesPantoneCmyk />
      <ColorUsingColor />
      <ColorUsingSecondaryColor />
      <ColorUsingColorOnWeb />
      <ColorInteractionAndLegibility />
      <ColorProduct />
      <ColorMisuse />
      <ColorInUse />

      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[1], BRAND_PAGES_INDEX[3]];
