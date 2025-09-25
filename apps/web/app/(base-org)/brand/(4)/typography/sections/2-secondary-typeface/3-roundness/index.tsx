import { ImageItem, VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import Roundness1Svg from './roundness-1.svg';
import Roundness2Svg from './roundness-2.svg';
import Roundness3Svg from './roundness-3.svg';

const svg1 = Roundness1Svg as ImageItem;
const svg2 = Roundness2Svg as ImageItem;
const svg3 = Roundness3Svg as ImageItem;

const content = [
  {
    tag: 'round 0',
    items: [
      {
        src: svg1.src,
        alt: 'roundness-1',
        width: svg1.width,
        height: svg1.height,
      },
    ],
  },
  {
    tag: 'round 50',
    items: [
      {
        src: svg2.src,
        alt: 'roundness-2',
        width: svg2.width,
        height: svg2.height,
      },
    ],
  },
  {
    tag: 'round 100',
    items: [
      {
        src: svg3.src,
        alt: 'roundness-3',
        width: svg3.width,
        height: svg3.height,
      },
    ],
  },
];

export function Roundness() {
  return (
    <VariantListComponent
      columns={3}
      id="secondary-typeface-roundness"
      prefix="Secondary Typeface"
      title="Roundness"
      description="When using Doto at a display size, we can customize the roundness using the variable axis and pair it with our Square better."
      content={content}
      useImgsNaturalSize
    />
  );
}
