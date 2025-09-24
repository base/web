import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import Styling1Svg from './styling-1.svg';
import Styling2Svg from './styling-2.svg';
import Styling3Svg from './styling-3.svg';
import Styling4Svg from './styling-4.svg';

const svg1 = Styling1Svg as SvgImport;
const svg2 = Styling2Svg as SvgImport;
const svg3 = Styling3Svg as SvgImport;
const svg4 = Styling4Svg as SvgImport;

const images = [
  {
    src: svg1.src,
    alt: 'Styling 1',
    width: svg1.width,
    height: svg1.height,
    tag: 'Variable weight',
  },
  {
    src: svg2.src,
    alt: 'Styling 2',
    width: svg2.width,
    height: svg2.height,
    tag: 'Use as texture',
  },
  {
    src: svg3.src,
    alt: 'Styling 3',
    width: svg3.width,
    height: svg3.height,
    tag: <span className="text-white">Layer with treated imagery</span>,
  },
  {
    src: svg4.src,
    alt: 'Styling 4',
    width: svg4.width,
    height: svg4.height,
    tag: 'Use it for labeling purposes',
  },
];

export function Styling() {
  return (
    <ImageComponent
      id="secondary-typeface-styling"
      prefix="Secondary Typeface"
      title="Styling"
      description="Do not lead with gradients in core comms. Avoid opacity, layering and other visual effects. Never hero a color other than Blue, Black, White, or Gray."
      images={images}
    />
  );
}
