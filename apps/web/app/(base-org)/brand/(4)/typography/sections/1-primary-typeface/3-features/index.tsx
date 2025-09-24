import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import Features1Svg from './features-1.svg';
import Features2Svg from './features-2.svg';
import Features3Svg from './features-3.svg';
import Features4Svg from './features-4.svg';

const features1SVG = Features1Svg as SvgImport;
const features2SVG = Features2Svg as SvgImport;
const features3SVG = Features3Svg as SvgImport;
const features4SVG = Features4Svg as SvgImport;

const content = [
  {
    tag: 'Unique characters - Geometric construction',
    items: [
      {
        src: features1SVG.src,
        alt: 'Features - Unique characters - Geometric construction',
        width: features1SVG.width,
        height: features1SVG.height,
      },
    ],
  },
  {
    tag: 'Square Display Alts',
    items: [
      {
        src: features2SVG.src,
        alt: 'Features - Square Display Alts',
        width: features2SVG.width,
        height: features2SVG.height,
      },
    ],
  },
  {
    tag: 'Square Symbols',
    items: [
      {
        src: features3SVG.src,
        alt: 'Features - Square Symbols',
        width: features3SVG.width,
        height: features3SVG.height,
      },
    ],
  },
  {
    tag: 'Single Storey A',
    items: [
      {
        src: features4SVG.src,
        alt: 'Features - Single Storey A',
        width: features4SVG.width,
        height: features4SVG.height,
      },
    ],
  },
];

export function Features() {
  return (
    <VariantListComponent
      id="primary-typeface-features"
      prefix="Primary Typeface"
      title="Features"
      description="Base Sans is based on Modern Gothic, and includes unique customizations and alternative glyphs that makes it more ownable to Base, and more legible. Several letters were given a more geometric structure, to have better flow, consistency and appropriateness to the brand. In addition, there is a set of unique alternate shapes for the b, h, m, n, r, u and the symbols that are decisively geometric and are means for occasional display purposes, especially in developers setting. "
      content={content}
    />
  );
}
