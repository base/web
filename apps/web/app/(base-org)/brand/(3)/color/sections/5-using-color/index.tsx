import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorUsingColor1Svg from './using-color-1.svg';
import ColorUsingColor2Svg from './using-color-2.svg';
import ColorUsingColor3Svg from './using-color-3.svg';

const color1SVG = ColorUsingColor1Svg as SvgImport;
const color2SVG = ColorUsingColor2Svg as SvgImport;
const color3SVG = ColorUsingColor3Svg as SvgImport;

const content = [
  {
    tag: 'core',
    items: [
      {
        src: color1SVG.src,
        alt: 'Using Color - Core Example',
        width: color1SVG.width,
        height: color1SVG.height,
      },
    ],
  },
  {
    tag: 'marketing, social',
    items: [
      {
        src: color2SVG.src,
        alt: 'Using Color - Marketing Example',
        width: color2SVG.width,
        height: color2SVG.height,
      },
    ],
  },
  {
    tag: 'novelty',
    items: [
      {
        src: color3SVG.src,
        alt: 'Using Color - Novelty Example',
        width: color3SVG.width,
        height: color3SVG.height,
      },
    ],
  },
];

export function ColorUsingColor() {
  return (
    <VariantListComponent
      id="using-color"
      title="Using Color"
      description="The core color combination is grayscale and blue. The secondary palette can then be used to enrich marketing and social content, but it should never overshadow the primary colors. For campaigns or special novelty projects, colors outside the brand palette may be used to keep the brand from feeling stagnant."
      content={content}
      useImgsNaturalSize
    />
  );
}
