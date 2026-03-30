import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';

const content = [
  {
    tag: 'Inter Tight',
    items: [
      <span key="inter-tight" className="break-words text-4xl">
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>0123456789</p>
      </span>,
    ],
  },
  {
    tag: 'Inter',
    items: [
      <span key="inter" className="break-words font-inter text-4xl">
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>0123456789</p>
      </span>,
    ],
  },
  {
    tag: 'Roboto Mono',
    items: [
      <span key="roboto-mono" className="break-words font-roboto-mono text-4xl">
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>0123456789</p>
      </span>,
    ],
  },
  {
    tag: 'Doto',
    items: [
      <span key="doto" className="break-words font-doto text-4xl">
        <p>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
        <p>abcdefghijklmnopqrstuvwxyz</p>
        <p>0123456789</p>
      </span>,
    ],
  },
];

export function FallbackSystemFont() {
  return (
    <VariantListComponent
      id="primary-typeface-fallback-system-font"
      prefix="Primary Typeface"
      title="Fallback / System Font"
      description="Base Sans is based on Modern Gothic, and includes unique customizations and alternative glyphs that make it more ownable to Base, and more legible. Several letters were given a more geometric structure, to have better flow, consistency and appropriateness to the brand. In addition, there is a set of unique alternate shapes for the b, h, m, n, r, u and the symbols that are decisively geometric and are meant for occasional display purposes, especially in developer settings."
      content={content}
    />
  );
}
