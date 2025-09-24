import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsLockupSvg from './lockup.svg';

const svg = SubBrandsLockupSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Partnerships Lockup',
    width: svg.width,
    height: svg.height,
  },
];

export function PartnershipsLockup() {
  return (
    <ImageComponent
      id="lockup"
      title="Lockup"
      description="The primary partnership lockup uses the logotype lockup with the partner's logo."
      fullWidth
      images={images}
    />
  );
}
