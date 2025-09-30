import { Card } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Believe/Card';

export function BelieveSectionCards() {
  return (
    <div className="col-span-full grid grid-cols-2 gap-x-[min(2.25vw,_32px)] gap-y-[min(2.25vw,_32px)] lg:grid-cols-4">
      {cardsContent.map((card) => (
        <Card content={card} key={`${card.index}-${card.title}`} />
      ))}
    </div>
  );
}

const cardsContent = [
  {
    index: '01',
    title: 'Ownership unlocks creativity.',
    description: 'You should own your work.',
    gltf: {
      src: '/models/upd/key.glb',
      useRgbTexture: true,
      modelRotation: [-0.7, 0.5, 0] as [number, number, number],
    },
  },
  {
    index: '02',
    title: 'Open beats closed.',
    description: 'Open-source code, open data, open opportunity.',
    gltf: {
      src: '/models/upd/open-source.glb',
      useRgbTexture: true,
      stretchZ: 3,
    },
  },
  {
    index: '03',
    title: 'Global is the default.',
    description: 'Geography shouldn’t limit talent or ideas.',
    gltf: {
      src: '/models/upd/globe.glb',
      useRgbTexture: true,
      modelRotation: [-0.7, 0.2, 0] as [number, number, number],
    },
  },
  {
    index: '04',
    title: 'Builders lead the way.',
    description: 'From weekend builders to dedicated teams, innovation starts with people.',
    gltf: {
      src: '/models/upd/builders.glb',
      useRgbTexture: false,
    },
  },
];
