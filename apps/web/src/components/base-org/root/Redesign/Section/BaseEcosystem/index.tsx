import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import { Cards } from './Cards';

export function SectionBaseEcosystem() {
  return (
    <Section content={content} disableWrapperAnimation>
      <Cards />
    </Section>
  );
}

const content = {
  // title: 'An open stack for the global economy',
  // description:
  //   'Base is built to empower builders, creators, and people everywhere to build apps, grow businesses, create what they love, and earn onchain.',
};
