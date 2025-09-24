import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import Image from './image.svg';

const svg = Image as SvgImport;

const image = [
  {
    src: svg.src,
    alt: 'Secondary Typeface',
    width: svg.width,
    height: svg.height,
  },
];

export function SecondaryTypeface() {
  return (
    <ImageComponent id="secondary-typeface" title="Secondary Typeface" images={image} fullWidth />
  );
}
