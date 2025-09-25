import { ImageItem, VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import Usage1Png from './usage-1.png';
import Usage2Png from './usage-2.png';
import Usage3Png from './usage-3.png';
import Usage4Png from './usage-4.png';
import Usage5Png from './usage-5.png';
import Usage6Png from './usage-6.png';

const png1 = Usage1Png as ImageItem;
const png2 = Usage2Png as ImageItem;
const png3 = Usage3Png as ImageItem;
const png4 = Usage4Png as ImageItem;
const png5 = Usage5Png as ImageItem;
const png6 = Usage6Png as ImageItem;

const content = [
  {
    tag: 'Logotype / Lockup',
    items: [
      {
        src: png1.src,
        alt: 'usage-1',
        width: png1.width,
        height: png1.height,
      },
      {
        src: png4.src,
        alt: 'usage-4',
        width: png4.width,
        height: png4.height,
      },
    ],
  },
  {
    tag: 'Basemark',
    items: [
      {
        src: png2.src,
        alt: 'usage-2',
        width: png2.width,
        height: png2.height,
      },
      {
        src: png5.src,
        alt: 'usage-5',
        width: png5.width,
        height: png5.height,
      },
    ],
  },
  {
    tag: 'The Square',
    items: [
      {
        src: png3.src,
        alt: 'usage-3',
        width: png3.width,
        height: png3.height,
      },
      {
        src: png6.src,
        alt: 'usage-6',
        width: png6.width,
        height: png6.height,
      },
    ],
  },
];

export function Usage() {
  return (
    <VariantListComponent
      columns={3}
      id="usage"
      title="Usage"
      description="We have three core identifiers: The logotype, the abstracted Basemark and The Square. In a given scenario we can use either one, two, or all three - depending on the situation. We use the logotype when we need clear brand recognition, and the Basemark when we can be more playful and subversive. "
      content={content}
      fullWidth
    />
  );
}
