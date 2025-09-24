import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsAbstractLockupsSvg from './abstract-lockups.svg';

const svg = SubBrandsAbstractLockupsSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Sub Brands Abstract Lockups',
    width: svg.width,
    height: svg.height,
  },
];

export function SubBrandsAbstractLockups() {
  return (
    <ImageComponent
      id="sub-brands-abstract-lockups"
      title="Abstract Lockups"
      description="Following our Core Identifiers Usage guidelines (see p.26), we can utilize our abstract identifiers - the Square and the Basemark in our sub brand lockups instead of the spelled-out logotype. We can use these where the Base context is present or implied, like in our products or social channels."
      images={images}
    />
  );
}
