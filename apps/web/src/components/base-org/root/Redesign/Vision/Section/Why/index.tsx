'use client';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';

export function SectionWhy() {
  return <Section content={content}>{/* Section Why */}</Section>;
}

const content = {
  title: 'Our Why',
  description:
    'The internet should belong to all of us. Right now, most of it is closed, owned by a few, and built to extract. \n \nWe believe in something better: An open internet where value flows freely, and where what you create is yours to own, grow, and share. \n \nThat’s why we’re building Base. A home for builders, creators, and anyone who wants to shape the future. A new foundation for a truly free global economy.',
};
