import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsLockupSvg from './lockup-system.svg';

const svg = SubBrandsLockupSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Partnerships Lockup System',
    width: svg.width,
    height: svg.height,
  },
];

export function PartnershipsLockupSystem() {
  return (
    <ImageComponent
      id="lockup-system"
      title="Lockup System"
      description="Use the logotype lockup when you need stronger brand recognition. When speaking to an audience already familiar with the Base brand, feel free to use more abstract core identifiers to represent the partnership. Always scale both logos optically to maintain equal size relationship."
      images={images}
    />
  );
}
