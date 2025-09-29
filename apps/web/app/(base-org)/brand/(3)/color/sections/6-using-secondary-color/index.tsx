import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import ColorUsingSecondaryColor1Svg from './using-secondary-color-1.svg';
import ColorUsingSecondaryColor2Svg from './using-secondary-color-2.svg';
import ColorUsingSecondaryColor3Svg from './using-secondary-color-3.svg';
import ColorUsingSecondaryColor4Svg from './using-secondary-color-4.svg';

const color1SVG = ColorUsingSecondaryColor1Svg as SvgImport;
const color2SVG = ColorUsingSecondaryColor2Svg as SvgImport;
const color3SVG = ColorUsingSecondaryColor3Svg as SvgImport;
const color4SVG = ColorUsingSecondaryColor4Svg as SvgImport;

const content = [
  {
    tag: '1 Color',
    items: [
      {
        src: color1SVG.src,
        alt: 'Using Secondary Color - 1 Color Example',
        width: color1SVG.width,
        height: color1SVG.height,
      },
    ],
  },
  {
    tag: '2 Colors',
    items: [
      {
        src: color2SVG.src,
        alt: 'Using Secondary Color - 2 Colors Example',
        width: color2SVG.width,
        height: color2SVG.height,
      },
    ],
  },
  {
    tag: '3 Colors - Analogous',
    items: [
      {
        src: color3SVG.src,
        alt: 'Using Secondary Color - 3 Colors - Analogous Example',
        width: color3SVG.width,
        height: color3SVG.height,
      },
    ],
  },
  {
    tag: 'Multicolor',
    items: [
      {
        src: color4SVG.src,
        alt: 'Using Secondary Color - Multicolor Example',
        width: color4SVG.width,
        height: color4SVG.height,
      },
    ],
  },
];

export function ColorUsingSecondaryColor() {
  return (
    <VariantListComponent
      id="using-secondary-color"
      title="Using Secondary Color"
      description="When using the secondary palette, it should only be applied to supplementary elements — always after black, white, and blue have been used. Avoid using more than 3 vibrant colors — always pair with one muted color."
      content={content}
    />
  );
}
