import { Hero } from 'apps/web/src/components/Brand/Hero';
import { Banner } from 'apps/web/src/components/Brand/Banner';
/* The Square imports */
import { TheSquare } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square';
import { TheSquareShape } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/1-shape';
import { TheSquareOrigin } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/2-origin';
import { TheSquareUnicode } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/3-unicode';
import { TheSquareFavicon } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/4-favicon';
import { TheSquareAppIcons } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/5-app-icons';
import { TheSquareColor } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/6-color';
import { TheSquareMisuse } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/7-misuse';
import { TheSquareInUse } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/1-the-square/8-in-use';
/* Basemark imports */
import { Basemark } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/2-basemark';
import { BasemarkConstruction } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/2-basemark/1-construction';
import { BasemarkColor } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/2-basemark/2-color';
import { BasemarkMisuse } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/2-basemark/3-misuse';
import { BasemarkInUse } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/2-basemark/4-in-use';
/* Logotype imports */
import { Logotype } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype';
import { LogotypeLockup } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/1-lockup';
import { LogotypeLockupCorrection } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/2-lockup-correction';
import { LogotypeUsage } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/3-usage';
import { LogotypeSafeSpace } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/4-safe-space';
import { LogotypeColor } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/5-color';
import { LogotypeMisuse } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/6-misuse';
import { LogotypeInUse } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/3-logotype/7-in-use';
import coreIdentifiersImg from 'apps/web/public/images/backgrounds/core-identifiers.webp';
/* Usage imports */
import { Usage } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/4-usage';
import { UsageLayouts } from 'apps/web/app/(base-org)/brand/(2)/core-identifiers/sections/4-usage/1-layouts';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';

export default function Page() {
  return (
    <>
      <Hero title="Core Identifiers" imageUrl={coreIdentifiersImg.src} />
      <Banner>
        Base began as an internal experiment, mirrored from Coinbase, and has grown into an open
        canvas for anyone building onchain. These guidelines capture that shift. They are less a
        rulebook than a starter kit: here you&apos;ll find the non-negotiables that keep us
        recognizable and the flex zones that invite the community to remix. Use them to stay
        coherent, but never contained. If a choice makes Base clearer, more human, or more useful:
        do it, then share what you learned so the system keeps evolving.
      </Banner>

      <TheSquare />
      <TheSquareShape />
      <TheSquareOrigin />
      <TheSquareUnicode />
      <TheSquareFavicon />
      <TheSquareAppIcons />
      <TheSquareColor />
      <TheSquareMisuse />
      <TheSquareInUse />

      <Basemark />
      <BasemarkConstruction />
      <BasemarkColor />
      <BasemarkMisuse />
      <BasemarkInUse />

      <Logotype />
      <LogotypeLockup />
      <LogotypeLockupCorrection />
      <LogotypeUsage />
      <LogotypeSafeSpace />
      <LogotypeColor />
      <LogotypeMisuse />
      <LogotypeInUse />

      <Usage />
      <UsageLayouts />

      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[0], BRAND_PAGES_INDEX[2]];
