import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function Hero() {
  return (
    <div className="relative w-full">
      <div className="mb-32 mt-48 flex w-full flex-col items-start justify-center gap-3">
        <Title level={TitleLevel.Display3} className="font-medium">
          Builder Stories
        </Title>
        <Title
          level={TitleLevel.Title3}
          className="text-[1.625rem] text-dark-palette-foregroundMuted"
        >
          Inspirational stories of builders and the new internet they&apos;re building on Base.
        </Title>
      </div>
    </div>
  );
}
