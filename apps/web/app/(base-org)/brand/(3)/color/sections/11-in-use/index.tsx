import { ImageComponent, SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorInUse1Svg from './in-use-1.svg';
import ColorInUse2Svg from './in-use-2.svg';
import ColorInUse3Svg from './in-use-3.svg';
import ColorInUse4Svg from './in-use-4.svg';

const svg1 = ColorInUse1Svg as SvgImport;
const svg2 = ColorInUse2Svg as SvgImport;
const svg3 = ColorInUse3Svg as SvgImport;
const svg4 = ColorInUse4Svg as SvgImport;

const images = [
  {
    src: svg1.src,
    alt: 'Color In Use 1',
    width: svg1.width,
    height: svg1.height,
  },
  {
    src: svg2.src,
    alt: 'Color In Use 2',
    width: svg2.width,
    height: svg2.height,
  },
  {
    src: svg3.src,
    alt: 'Color In Use 3',
    width: svg3.width,
    height: svg3.height,
  },
  {
    src: svg4.src,
    alt: 'Color In Use 4',
    width: svg4.width,
    height: svg4.height,
  },
];

export function ColorInUse() {
  return (
    <ImageComponent
      id="color-in-use"
      title="In Use"
      description={
        <span className="flex flex-col gap-2">
          Here are a few examples of how to apply our color palette across different contexts:
          <ol className="ml-4 list-inside list-decimal">
            <li>
              Out-of-home marketing — Use our signature blue as the dominant color to maximize brand
              recognition in large-scale, public-facing media.
            </li>
            <li>
              Image treatment — Apply color overlays or texture effects to photographs to create a
              cohesive and recognizable brand aesthetic.
            </li>
            <li>
              Illustration & Infographics — Integrate brand colors into illustrations to maintain
              consistency while adding visual character. Use a structured combination of core and
              secondary colors to clearly differentiate data and guide the viewer&apos;s
              understanding.
            </li>
            <li>Social — Use the full palette to scale and expand the brand identity.</li>
          </ol>
        </span>
      }
      images={images}
    />
  );
}
