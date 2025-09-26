import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import BasemarkConstructionPng from './construction.png';

const png = BasemarkConstructionPng as SvgImport;

const images = [
  {
    src: png.src,
    alt: 'Basemark Construction',
    width: png.width,
    height: png.height,
  },
];

export function BasemarkConstruction() {
  return (
    <ImageComponent
      id="basemark-construction"
      prefix="Basemark"
      title="Construction"
      description="The Basemark always lives on a one by one grid. Strokes sit forty percent in from each edge, with ten percent corner clearance. Maintain five percent corner radius and sixty percent smoothing for coherence with the Square."
      images={images}
    />
  );
}
