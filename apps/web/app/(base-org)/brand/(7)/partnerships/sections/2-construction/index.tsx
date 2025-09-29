import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsStructureSvg from './construction.svg';

const svg = SubBrandsStructureSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Partnerships Construction',
    width: svg.width,
    height: svg.height,
  },
];

export function PartnershipsConstruction() {
  return (
    <ImageComponent
      id="construction"
      title="Construction"
      description="In the partnership lock-up, use spacing equal to 1.5 times the vertical stem of the “b.” Align the partner logo optically to match the x-height of the logotype."
      images={images}
    />
  );
}
