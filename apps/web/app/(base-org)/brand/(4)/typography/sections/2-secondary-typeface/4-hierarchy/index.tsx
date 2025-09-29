import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import Image from './image.svg';

const svg = Image as SvgImport;

const image = [
  {
    src: svg.src,
    alt: 'Secondary Typeface Hierarchy',
    width: svg.width,
    height: svg.height,
  },
];

export function Hierarchy() {
  return (
    <ImageComponent
      id="secondary-typeface-hierarchy"
      prefix="Secondary Typeface"
      title="Hierarchy"
      images={image}
    />
  );
}
