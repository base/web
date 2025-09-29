import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import Image from './image.svg';

const svg = Image as SvgImport;

const image = [
  {
    src: svg.src,
    alt: 'Primary Typeface Image',
    width: svg.width,
    height: svg.height,
  },
];

export function PrimaryTypefaceImage() {
  return <ImageComponent id="primary-typeface-image" images={image} fullWidth />;
}
