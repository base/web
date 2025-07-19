import { AnimatedText } from 'apps/web/src/components/base-org/root/Redesign/Section/Metrics';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

function StatRow({
  value,
  label,
  unit,
  prefix,
  animated,
}: {
  value: string;
  label: string;
  unit?: string;
  prefix?: string;
  animated: boolean;
}) {
  return (
    <div className="flex items-end gap-4">
      <Title level={TitleLevel.H5Regular} as="div" className="font-light leading-none">
        {prefix}
        {animated ? <AnimatedText text={value} titleLevel={TitleLevel.H5Regular} /> : value}
        {unit}
      </Title>
      <div className="whitespace-nowrap font-mono leading-[1.5] text-[#B1B7C3]">{label}</div>
    </div>
  );
}

type Props = {
  description: string;
  statItems: {
    value: string;
    label: string;
    unit?: string;
    prefix?: string;
  }[];
  animated?: boolean;
};

export function StatsSection({ description, statItems, animated = false }: Props) {
  return (
    <div className="flex flex-col gap-12 md:flex-row md:gap-[80px]">
      <div className="max-w-[400px] text-3xl leading-none">{description}</div>
      <div className="flex flex-col gap-8">
        {statItems.map(({ value, label, unit, prefix }) => (
          <StatRow
            key={label}
            value={value}
            label={label}
            unit={unit}
            prefix={prefix}
            animated={animated}
          />
        ))}
      </div>
    </div>
  );
}
