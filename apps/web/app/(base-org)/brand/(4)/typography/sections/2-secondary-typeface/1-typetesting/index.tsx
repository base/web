import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import Typetesting1Svg from './typetesting-1.svg';
import Typetesting2Svg from './typetesting-2.svg';
import Typetesting3Svg from './typetesting-3.svg';

const typetesting1SVG = Typetesting1Svg as SvgImport;
const typetesting2SVG = Typetesting2Svg as SvgImport;
const typetesting3SVG = Typetesting3Svg as SvgImport;

const content = [
  {
    tag: 'Always use all caps',
    items: [
      {
        src: typetesting1SVG.src,
        alt: 'Typetesting - Always use all caps',
        width: typetesting1SVG.width,
        height: typetesting1SVG.height,
      },
    ],
  },
  {
    tag: 'Always refine the spacing',
    items: [
      {
        src: typetesting2SVG.src,
        alt: 'Typetesting - Always refine the spacing',
        width: typetesting2SVG.width,
        height: typetesting2SVG.height,
      },
    ],
  },
  {
    tag: 'Pair with Base Sans for clear hierarchy',
    items: [
      {
        src: typetesting3SVG.src,
        alt: 'Typetesting - Pair with Base Sans for clear hierarchy',
        width: typetesting3SVG.width,
        height: typetesting3SVG.height,
      },
    ],
  },
];

export function Typetesting() {
  return (
    <VariantListComponent
      id="secondary-typeface-typetesting"
      prefix="Secondary Typeface"
      title="Typetesting"
      description={
        <>
          Due to Doto&apos;s design characteristics and monospaced nature, it should be used in all
          caps with carefully customized spacing. Always use it for short, impactful messages, and
          avoid it for long texts.
        </>
      }
      content={content}
    />
  );
}
