'use client';

import dynamic from 'next/dynamic';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import {
  AnimatedText,
  Icons,
} from 'apps/web/src/components/base-org/root/Redesign/Section/BaseChain';

const GlobeScene = dynamic(async () => import('apps/web/src/components/WebGL/Scenes/GlobeScene'), {
  ssr: false,
});

type MetricCardProps = {
  title: string;
  icon: React.ReactNode;
  value: string;
  unit?: string;
};

function MetricCard({ title, icon, value, unit }: MetricCardProps) {
  return (
    <div className="pointer-events-none flex w-full flex-col rounded-lg bg-base-gray-25/90 p-4 backdrop-blur-sm md:w-[250px] md:bg-white">
      <div className="mb-4 flex items-start justify-between">
        <div className="flex flex-col gap-1">
          <Text variant={TextVariant.Body}>{title}</Text>
        </div>
        <div className="ml-2 h-6 w-6 flex-shrink-0">{icon}</div>
      </div>
      <div className="flex items-end gap-2">
        <AnimatedText
          text={value}
          titleLevel={TitleLevel.H1Regular}
          className="!font-mono"
          delay={0.2}
        />
        {unit && (
          <AnimatedText
            text={unit}
            titleLevel={TitleLevel.H2Regular}
            className="pb-[9px] lg:pb-2"
            delay={0.2}
          />
        )}
      </div>
    </div>
  );
}

function StatsOverlay() {
  return (
    <div className="pointer-events-auto absolute left-8 top-8 z-10 flex flex-col gap-4">
      <MetricCard title="Assets on Platform" icon={Icons.median} value="$14B+" />
      <MetricCard title="Block Time" icon={Icons.platform} value="200" unit="MS" />
    </div>
  );
}

function StatsMobile() {
  return (
    <div className="flex flex-col gap-4 pt-4">
      <MetricCard title="Assets on Platform" icon={Icons.median} value="$14B+" />
      <MetricCard title="Block Time" icon={Icons.platform} value="200" unit="MS" />
    </div>
  );
}

export function GlobeWrapper() {
  return (
    <div className="w-full">
      <div className="relative h-[400px] overflow-hidden">
        <GlobeScene className="h-full !max-h-full !min-h-0" />
        <div className="hidden sm:block">
          <StatsOverlay />
        </div>
      </div>
      <div className="block pt-8 sm:hidden">
        <StatsMobile />
      </div>
    </div>
  );
}
