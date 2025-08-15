import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import TheSquareShapePng from './shape.png';

const png = TheSquareShapePng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'The Square Shape',
    width: png.width,
    height: png.height,
  },
];

export function TheSquareShape() {
  return (
    <ImageComponent
      id="the-square-shape"
      prefix="The Square"
      title="Shape"
      description="Exact radii keep the shape feeling friendly, never soft. Radius five percent with sixty percent smoothing is mandatory in every execution. Export as vector so the curve does not rasterize. Consistency here protects recognizability at every size."
      images={images}
    />
  );
}
