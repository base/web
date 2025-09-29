import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';

const content = [
  {
    tag: (
      <span className="flex flex-col">
        <span>headline: medium / kerning -3% / leading 100%</span>
        <span>subheadline: regular / kerning -2% / leading 120%</span>
      </span>
    ),
    items: [
      <span
        key="headline-sans-medium"
        className="font-sans font-medium leading-none tracking-[-0.03em] text-scale-[3.25rem]/[4rem]"
      >
        Resources for Builders
      </span>,
      <span
        key="subheadline-sans-regular"
        className="font-sans leading-[120%] tracking-[-0.02em] text-scale-[1.875rem]/[2.25rem]"
      >
        Get help to build and grow your project on Base with our Builder Resource Kit
      </span>,
    ],
  },
  {
    tag: (
      <span className="flex flex-col">
        <span>headline: medium / kerning -2% / leading 110%</span>
        <span>date: mono light / kerning 0%</span>
        <span>body: medium / kerning 0% / leading 140%</span>
      </span>
    ),
    items: [
      <span
        key="headline-sans-medium-2"
        className="text-pretty font-sans font-medium leading-[110%] tracking-[-0.02em] text-scale-[2rem]/[2.5rem]"
      >
        Building for the long-term: making Base faster, simpler, and more powerful
      </span>,
      <span
        key="date-mono-light"
        className="pt-2 font-mono font-light leading-none tracking-normal text-scale-[0.9375rem]/[1.125rem]"
      >
        February 27th, 2025
      </span>,
      <span
        key="body-sans-medium"
        className="pt-4 font-sans leading-[140%] tracking-normal text-scale-[1.125rem]/[1.375rem]"
      >
        Base&apos;s mission is to build a global onchain economy that increases innovation,
        creativity, and freedom. To further our mission, we need to continue making Base more
        powerful, easier to use, and faster than ever. We are focused on cultivating an ecosystem of
        long-term people playing long-term games. We want to support passionate builders who are
        creating products that solve real needs for real people.
      </span>,
    ],
  },
  {
    tag: (
      <span className="flex flex-col">
        <span>headline: bold / kerning -2% / stylistic set on</span>
        <span>subheadline: mono light / kerning 0%</span>
      </span>
    ),
    items: [
      <span
        key="headline-sans-bold"
        className="font-sans text-5xl font-bold leading-none tracking-[-0.02em] md:text-scale-[4.375rem]/[5.5rem]"
      >
        BaseCamp
      </span>,
      <span
        key="subheadline-mono-light"
        className="-mt-1 font-mono text-5xl font-light leading-none tracking-normal md:text-scale-[4.3125rem]/[5.4375rem]"
      >
        March 2026
      </span>,
    ],
  },
  {
    tag: (
      <span className="flex flex-col">
        <span>headline: regular / kerning 0% / leading 140%</span>
        <span>body: light / leading 140%</span>
      </span>
    ),
    items: [
      <span
        key="headline-sans-regular"
        className="font-sans leading-[140%] tracking-normal text-scale-[1.1875rem]/[1.5rem]"
      >
        Distribution & Growth
      </span>,
      <span
        key="body-sans-light"
        className="mb-5 font-sans font-light leading-[140%] tracking-normal text-scale-[1rem]/[1.25rem]"
      >
        Reach millions of people across the Coinbase product ecosystem and social graph, plus
        opportunities for builder grants.
      </span>,
      <span
        key="headline-sans-regular-2"
        className="font-sans leading-[140%] tracking-normal text-scale-[1.1875rem]/[1.5rem]"
      >
        Trust & Security
      </span>,
      <span
        key="body-sans-light-2"
        className="font-sans font-light leading-[140%] tracking-normal text-scale-[1rem]/[1.25rem]"
      >
        The most dependable way for ambitious projects to scale with the most trusted brand in
        crypto.
      </span>,
    ],
  },
];

export function TypeSystemExamples() {
  return (
    <VariantListComponent
      id="primary-typeface-type-system-examples"
      prefix="Primary Typeface"
      title="Type System → Examples"
      fullWidth
      columns={2}
      content={content}
    />
  );
}
