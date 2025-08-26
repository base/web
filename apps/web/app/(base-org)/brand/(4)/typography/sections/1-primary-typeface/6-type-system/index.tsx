import { VariantListComponent } from 'apps/web/src/components/Brand/VariantList';

const content = [
  {
    tag: 'xl',
    items: [
      <span
        key="xl-medium"
        className="overflow-hidden font-sans font-medium leading-none tracking-[-0.03em] text-scale-7xl/8xl"
      >
        <span className="block truncate">A better internet starts here.</span>
      </span>,
      <span
        key="xl-regular"
        className="font-sans leading-none tracking-[-0.03em] text-scale-6xl/7xl"
      >
        <span className="block truncate">A better internet starts here.</span>
      </span>,
    ],
  },
  {
    tag: 'l',
    items: [
      <span
        key="l-medium"
        className="font-sans font-medium leading-none tracking-[-0.03em] text-scale-5xl/6xl"
      >
        <span className="block truncate">A better internet starts here.</span>
      </span>,
      <span
        key="l-regular"
        className="font-sans leading-none tracking-[-0.03em] text-scale-4xl/5xl"
      >
        <span className="block truncate">A better internet starts here.</span>
      </span>,
    ],
  },
  {
    tag: 'm',
    items: [
      <span
        key="m-medium"
        className="font-sans font-medium leading-none tracking-[-0.03em] text-scale-3xl/4xl"
      >
        <span className="block truncate">A better internet starts here.</span>
      </span>,
      <span
        key="m-regular"
        className="font-sans leading-none tracking-[-0.03em] text-scale-2xl/3xl"
      >
        A better internet starts here.
      </span>,
    ],
  },
  {
    tag: 's',
    items: [
      <span key="s-regular" className="pb-2 font-sans text-lg leading-none tracking-[-0.03em]">
        A better internet starts here.
      </span>,
      <span
        key="s-mono"
        className="pb-2 font-mono text-[1rem] font-light uppercase leading-none tracking-[-0.03em]"
      >
        A better internet starts here.
      </span>,
      <span
        key="s-doto"
        className="font-doto text-[1rem] font-semibold uppercase leading-none tracking-[-0.03em]"
      >
        A better internet starts here.
      </span>,
    ],
  },
];

export function TypeSystem() {
  return (
    <VariantListComponent
      id="primary-typeface-type-system"
      prefix="Primary Typeface"
      title="Type System"
      fullWidth
      content={content}
    />
  );
}
