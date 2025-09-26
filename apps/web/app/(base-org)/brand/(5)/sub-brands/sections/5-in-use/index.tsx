import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import SubBrandsInUse1Svg from './in-use-1.svg';
import SubBrandsInUse2Svg from './in-use-2.svg';
import SubBrandsInUse3Svg from './in-use-3.svg';
import SubBrandsInUse4Svg from './in-use-4.svg';

const svg1 = SubBrandsInUse1Svg as SvgImport;
const svg2 = SubBrandsInUse2Svg as SvgImport;
const svg3 = SubBrandsInUse3Svg as SvgImport;
const svg4 = SubBrandsInUse4Svg as SvgImport;

const images = [
  {
    src: svg1.src,
    alt: 'Sub Brands In Use 1',
    width: svg1.width,
    height: svg1.height,
  },
  {
    src: svg2.src,
    alt: 'Sub Brands In Use 2',
    width: svg2.width,
    height: svg2.height,
  },
  {
    src: svg3.src,
    alt: 'Sub Brands In Use 3',
    width: svg3.width,
    height: svg3.height,
  },
  {
    src: svg4.src,
    alt: 'Sub Brands In Use 4',
    width: svg4.width,
    height: svg4.height,
  },
];

export function SubBrandsInUse() {
  return <ImageComponent id="sub-brands-in-use" title="In-use" images={images} />;
}
