import { Card } from 'apps/web/src/components/base-org/root/Redesign/Vision/Section/Believe/Card';

export function Cards() {
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
    title: 'Base App',
    description:
      'An everything app where you can create, earn, trade, discover apps, and chat with friends all in one place.',
    gltf: {
      src: '/models/upd/base-app-2.glb',
      useRgbTexture: true,
    },
  },
  {
    index: '02',
    title: 'Base Build',
    description:
      'Everything builders need to build, grow, and earn from their apps, at every stage.',
    gltf: {
      src: '/models/upd/open-source.glb',
      useRgbTexture: true,
      stretchZ: 3,
    },
  },
  {
    index: '03',
    title: 'Base Chain',
    description:
      'An open network to power the global economy. Fast, open, and built to scale. Built on Ethereum, built on the Superchain.',
    gltf: {
      src: '/models/upd/globe.glb',
      useRgbTexture: true,
      modelRotation: [-0.7, 0.2, 0] as [number, number, number],
    },
  },
  {
    index: '04',
    title: 'Base Pay',
    description: 'The fastest way to checkout with USDC - fast, cheap, globally.',
    gltf: {
      src: '/models/upd/base-pay.glb',
      useRgbTexture: true,
    },
  },
];
