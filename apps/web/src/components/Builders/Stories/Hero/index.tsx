import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';

export function Hero() {
  return (
    <div className="relative w-full">
      <div className="my-32 flex w-full flex-col items-start justify-center gap-2">
        <Title level={TitleLevel.Display3} className="font-medium">
          Builder Stories
        </Title>
        <Title level={TitleLevel.Title3} className="max-w-[575px] text-gray-50">
          Inspirational stories of builders and the new internet they&apos;re building on Base.
        </Title>
      </div>
    </div>
  );
}
