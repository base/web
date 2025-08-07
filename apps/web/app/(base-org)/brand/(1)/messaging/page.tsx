import { Hero } from 'apps/web/src/components/Brand/Hero';
import { Banner } from 'apps/web/src/components/Brand/Banner';
import { CriticalStyleConventions } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/1-critical-style-conventions';
import { Taglines } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/2-taglines';
import { Copy } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/3-copy';
import { WhatToAvoid } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/5-what-to-avoid';
import { WritingGuidelines } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/6-writing-guidelines';
import { ToneAndVoice } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/7-tone-and-voice';
import { ClarityConcisionFlow } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/8-clarity-concision-flow';
import { Naunces } from 'apps/web/app/(base-org)/brand/(1)/messaging/sections/9-naunces';
import messagingImg from 'apps/web/public/images/backgrounds/messaging.webp';
import BrandIndex from 'apps/web/src/components/Brand/Index';
import { BRAND_PAGES_INDEX } from 'apps/web/app/(base-org)/brand/(main)/page';

const patternAtlas = {
  url: '/patterns/pat-colorful.png',
  columns: 6,
};

export default function Page() {
  return (
    <>
      <Hero title="Messaging" altPattern={patternAtlas} imageUrl={messagingImg.src} />
      <Banner>
        <p>
          Base is built by and for real people, so our voice mirrors everyday conversation: clear,
          direct, optimistic. We explain new concepts without jargon and celebrate the builders and
          creators behind Base.
        </p>
        <p>
          Every sentence is an onramp, and we write so that everyone can understand the value of
          being onchain and takes action.
        </p>
        <p>
          We lead with active verbs, trim adverbs, and swap buzzwords for words people actually say
          out loud.
        </p>
        <p>
          Each sentence should answer &quot;why should I care?&quot; in practical terms. We state
          the benefit first, the tech second. When addressing the community, we write like a human,
          not a press release.
        </p>
      </Banner>
      <CriticalStyleConventions />
      <Taglines />
      <Copy />
      <WritingGuidelines />
      <ToneAndVoice />
      <ClarityConcisionFlow />
      <Naunces />
      <WhatToAvoid />
      <BrandIndex index={FINAL_INDEX} hasHeading />
    </>
  );
}

const FINAL_INDEX = [BRAND_PAGES_INDEX[1], BRAND_PAGES_INDEX[2]];
