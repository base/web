import { MinusIcon, PlusIcon } from '@heroicons/react/16/solid';

type YearSelectorProps = {
  years: number;
  onIncrement: () => void;
  onDecrement: () => void;
  label: string;
};

export default function YearSelector({
  years,
  onIncrement,
  onDecrement,
  label,
}: YearSelectorProps) {
  return (
    <div className="max-w-[14rem] self-start">
      <p className="text-line mb-2 text-sm font-bold uppercase">{label}</p>
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onDecrement}
          disabled={years === 1}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
          aria-label="Decrement years"
        >
          <MinusIcon width="14" height="14" className="fill-[#32353D]" />
        </button>
        <span className="flex w-32 items-center justify-center text-3xl font-bold text-black">
          {years} year{years > 1 && 's'}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#DEE1E7]"
          aria-label="Increment years"
        >
          <PlusIcon width="14" height="14" className="fill-[#32353D]" />
        </button>
      </div>
    </div>
  );
}
