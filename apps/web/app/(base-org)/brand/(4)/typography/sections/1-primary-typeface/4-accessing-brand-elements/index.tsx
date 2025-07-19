import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';
import { SvgImport } from 'apps/web/src/components/Brand/Image';
import squareSVG from './square.svg';
import lockupSVG from './lockup.svg';
import logotypeSVG from './logotype.svg';
import basemarkSVG from './basemark.svg';

const content = [
  {
    tag: 'typing',
    items: [
      <span
        key="thin1"
        className="font-sans text-2xl leading-none tracking-[-0.03em] md:text-scale-4xl/5xl"
      >
        &lt;square&gt;
      </span>,
    ],
  },
  {
    tag: 'output',
    items: [
      {
        src: squareSVG.src as SvgImport['src'],
        alt: 'Accessing Elements - The Square',
        width: squareSVG.width as SvgImport['width'],
        height: squareSVG.height as SvgImport['height'],
      },
    ],
  },
  {
    tag: 'typing',
    items: [
      <span
        key="light1"
        className="font-sans text-2xl leading-none tracking-[-0.03em] md:text-scale-4xl/5xl"
      >
        &lt;lockup&gt;
      </span>,
    ],
  },
  {
    tag: 'output',
    items: [
      {
        src: lockupSVG.src as SvgImport['src'],
        alt: 'Accessing Elements - Lockup',
        width: lockupSVG.width as SvgImport['width'],
        height: lockupSVG.height as SvgImport['height'],
      },
    ],
  },
  {
    tag: 'typing',
    items: [
      <span
        key="regular1"
        className="font-sans text-2xl leading-none tracking-[-0.03em] md:text-scale-4xl/5xl"
      >
        &lt;logotype&gt;
      </span>,
    ],
  },
  {
    tag: 'output',
    items: [
      {
        src: logotypeSVG.src as SvgImport['src'],
        alt: 'Accessing Elements - Logotype',
        width: logotypeSVG.width as SvgImport['width'],
        height: logotypeSVG.height as SvgImport['height'],
      },
    ],
  },
  {
    tag: 'typing',
    items: [
      <span
        key="medium1"
        className="font-sans text-2xl leading-none tracking-[-0.03em] md:text-scale-4xl/5xl"
      >
        &lt;basemark&gt;
      </span>,
    ],
  },
  {
    tag: 'output',
    items: [
      {
        src: basemarkSVG.src as SvgImport['src'],
        alt: 'Accessing Elements - Basemark',
        width: basemarkSVG.width as SvgImport['width'],
        height: basemarkSVG.height as SvgImport['height'],
      },
    ],
  },
];

export function AccessingBrandElements() {
  return (
    <VariantListComponent
      columns={2}
      respectColsOnMobile
      id="accessing-brand-elements"
      useImgsNaturalSize
      prefix="Primary Typeface"
      title="Accessing Brand Elements"
      description={
        <span className="flex flex-col gap-2">
          <span>
            For most uses, please use our official vector assets or figma components. However, all
            of Base&apos;s core brand elements are also embedded in our custom Base typefaces for
            quick access, and for easily composing live text lockups in Adobe, Figma, on the web and
            in product. When creating branded lockups using these embedded assets, make sure to
            adhere to all scaling and spacing requirements. (outlined on p. 22, 75, 115) The
            features are accessible via a custom Stylistic Set (see below) and are activated by
            typing the strings on this slide.
          </span>
          <span>
            Note: When composing a logo lockup using the two separate elements of &lt;square&gt; and
            &lt;logotype&gt;, add a space character between the elements and give it a negative
            spacing of -27.7% in order to match the required spacing.
          </span>
        </span>
      }
      content={content}
    />
  );
}
