import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorProductSvg from './product.svg';

const svg = ColorProductSvg as SvgImport;

const images = [
  {
    src: svg.src,
    alt: 'Color Product',
    width: svg.width,
    height: svg.height,
  },
];

export function ColorProduct() {
  return (
    <ImageComponent
      id="product"
      title="Product"
      description="The product uses a palette optimized for accessibility, which differs slightly from the brand palette. For guidance on using the full spectrum or product-specific colors, please consult the product team."
      fullWidth
      images={images}
    />
  );
}
