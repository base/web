import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import Image from './image.svg';

const svg = Image as SvgImport;

const image = [
  {
    src: svg.src,
    alt: 'Primary Typeface',
    width: svg.width,
    height: svg.height,
  },
];

export function PrimaryTypeface() {
  return <ImageComponent id="primary-typeface" title="Primary Typeface" images={image} fullWidth />;
}
