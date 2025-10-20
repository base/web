import { InteractiveCard } from 'apps/web/src/components/base-org/root/Redesign/Section/BaseJoin/InteractiveCard';
import { Section } from 'apps/web/src/components/base-org/root/Redesign/Section';
import { ImageType } from 'apps/web/src/components/base-org/root/Redesign/Section';
import Link from 'apps/web/src/components/Link';

import Card1 from './card-1.png';
import Card2 from './card-2.png';
import Card3 from './card-3.avif';

const card1 = Card1 as ImageType;
const card2 = Card2 as ImageType;
const card3 = Card3 as ImageType;

export function SectionBaseJoin() {
  return (
    <Section content={content}>
      <div className="col-span-full flex flex-col gap-8 md:flex-row">
        {cards.map((card) => (
          <Link key={card.index} href={card.href} className="flex-1 overflow-hidden !rounded-[8px]">
            <InteractiveCard
              shader={false}
              index={card.index}
              title={card.title}
              description={card.description}
              image={card.image}
              brightness={card.brightness}
              contrast={card.contrast}
              tileSize={8}
            />
          </Link>
        ))}
      </div>
    </Section>
  );
}

const content = {
  title: 'Based happenings',
};

type CardProps = React.ComponentProps<typeof InteractiveCard> & { index: number; href: string };

const cards: CardProps[] = [
  {
    index: 1,
    title: 'Base Batches',
    description:
      'Turn your ideas into real products and kickstart your business, with mentorship, community, visibility, and pathways to funding.',
    image: card1.src,
    brightness: 0.8,
    contrast: 2,
    href: 'https://www.basebatches.xyz/',
  },
  {
    index: 2,
    title: 'BaseCamp 2025',
    description:
      'Watch the State of Base livestream from BaseCamp 2025, where we announced that Base is exploring a network token and more.',
    image: card2.src,
    brightness: 1.2,
    contrast: 0.9,
    href: 'https://www.basecamp2025.xyz/',
  },
  {
    index: 3,
    title: 'Meetups',
    description: 'Connect with the Base community. Join a meetup near you.',
    image: card3.src,
    brightness: 1.9,
    contrast: 0.8,
    href: 'https://lu.ma/BaseMeetups',
  },
];
