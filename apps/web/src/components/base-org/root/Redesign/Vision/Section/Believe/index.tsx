import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import { BelieveSectionCards } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Believe/Cards';

export function SectionBelieve() {
  return (
    <Section content={content} disableWrapperAnimation>
      <BelieveSectionCards />
    </Section>
  );
}

const content = {
  title: 'What We Believe',
};
