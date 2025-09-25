import { ImageMasonry, MasonryImage } from 'apps/web/src/components/Brand/ImageMasonry';
import PartnershipsInUse1Svg from './in-use-1.svg';
import PartnershipsInUse2Svg from './in-use-2.svg';
import PartnershipsInUse3Svg from './in-use-3.svg';

const svg1 = PartnershipsInUse1Svg as MasonryImage;
const svg2 = PartnershipsInUse2Svg as MasonryImage;
const svg3 = PartnershipsInUse3Svg as MasonryImage;

const images = [
  {
    src: svg1.src,
    alt: 'Partnerships In-Use 1',
    width: svg1.width,
    height: svg1.height,
  },
  {
    src: svg2.src,
    alt: 'Partnerships In-Use 2',
    width: svg2.width,
    height: svg2.height,
  },
  {
    src: svg3.src,
    alt: 'Partnerships In-Use 3',
    width: svg3.width,
    height: svg3.height,
  },
];

export function PartnershipsInUse() {
  return <ImageMasonry id="in-use" title="In-Use" images={images} />;
}
