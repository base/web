import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsLockupSvg from './lockup-examples.svg';

const svg = SubBrandsLockupSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Partnerships Lockup Examples',
    width: svg.width,
    height: svg.height,
  },
];

export function PartnershipsLockupExamples() {
  return <ImageComponent id="lockup-examples" title="Lockup Examples" images={images} />;
}
