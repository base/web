import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';

const content = [
  {
    tag: 'base sans',
    items: [
      <span key="thin1" className="font-sans text-3xl font-thin leading-none lg:text-scale-5xl/6xl">
        Base Sans Thin
      </span>,
      <span
        key="light1"
        className="font-sans text-3xl font-light leading-none lg:text-scale-5xl/6xl"
      >
        Base Sans Light
      </span>,
      <span
        key="regular1"
        className="font-sans text-3xl font-normal leading-none lg:text-scale-5xl/6xl"
      >
        Base Sans Regular
      </span>,
      <span
        key="medium1"
        className="font-sans text-3xl font-medium leading-none lg:text-scale-5xl/6xl"
      >
        Base Sans Medium
      </span>,
      <span key="bold1" className="font-sans text-3xl font-bold leading-none lg:text-scale-5xl/6xl">
        Base Sans Bold
      </span>,
      <span
        key="black1"
        className="font-sans text-3xl font-black leading-none lg:text-scale-5xl/6xl"
      >
        Base Sans Black
      </span>,
    ],
  },
  {
    tag: 'base sans italic',
    items: [
      <span
        key="thin1"
        className="font-sans text-3xl font-thin italic leading-none lg:text-scale-5xl/6xl"
      >
        Thin Italic
      </span>,
      <span
        key="light1"
        className="font-sans text-3xl font-light italic leading-none lg:text-scale-5xl/6xl"
      >
        Light Italic
      </span>,
      <span
        key="regular1"
        className="font-sans text-3xl font-normal italic leading-none lg:text-scale-5xl/6xl"
      >
        Regular Italic
      </span>,
      <span
        key="medium1"
        className="font-sans text-3xl font-medium italic leading-none lg:text-scale-5xl/6xl"
      >
        Medium Italic
      </span>,
      <span
        key="bold1"
        className="font-sans text-3xl font-bold italic leading-none lg:text-scale-5xl/6xl"
      >
        Bold Italic
      </span>,
      <span
        key="black1"
        className="font-sans text-3xl font-black italic leading-none lg:text-scale-5xl/6xl"
      >
        Black Italic
      </span>,
    ],
  },
  {
    tag: 'base mono',
    items: [
      <span
        key="thin1"
        className="font-mono text-3xl font-thin italic leading-none lg:text-scale-5xl/6xl"
      >
        Base Mono Thin
      </span>,
      <span
        key="light1"
        className="font-mono text-3xl font-light italic leading-none lg:text-scale-5xl/6xl"
      >
        Base Mono Light
      </span>,
      <span
        key="regular1"
        className="font-mono text-3xl font-normal italic leading-none lg:text-scale-5xl/6xl"
      >
        Base Mono Regular
      </span>,
      <span
        key="medium1"
        className="font-mono text-3xl font-medium italic leading-none lg:text-scale-5xl/6xl"
      >
        Base Mono Medium
      </span>,
    ],
  },
  {
    tag: 'base mono italic',
    items: [
      <span
        key="thin1"
        className="font-mono text-3xl font-thin italic leading-none lg:text-scale-5xl/6xl"
      >
        Thin Italic
      </span>,
      <span
        key="light1"
        className="font-mono text-3xl font-light italic leading-none lg:text-scale-5xl/6xl"
      >
        Light Italic
      </span>,
      <span
        key="regular1"
        className="font-mono text-3xl font-normal italic leading-none lg:text-scale-5xl/6xl"
      >
        Regular Italic
      </span>,
      <span
        key="medium1"
        className="font-mono text-3xl font-medium italic leading-none lg:text-scale-5xl/6xl"
      >
        Medium Italic
      </span>,
    ],
  },
];

export function IntroducingBaseSans() {
  return (
    <VariantListComponent
      id="primary-typeface-introducing-base-sans"
      prefix="Primary Typeface"
      title="Introducing Base Sans"
      description={
        <span className="flex flex-col gap-2">
          <span>
            Base Sans is the primary typeface of Base. It is at the heart of our identity and is
            purpose built for legibility and adaptability in the fast moving onchain world. Its open
            counters echo the Square&apos;s geometry.
          </span>
          <span>
            Base Mono complements Base Sans, and is meant for setting metadata, code blocks, and for
            display purposes in more developer-facing contexts.
          </span>
        </span>
      }
      content={content}
    />
  );
}
