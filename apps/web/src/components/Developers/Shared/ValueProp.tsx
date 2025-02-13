import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { type StaticImageData } from 'next/image';

export type ValuePropProps = {
  title: string;
  description: string;
  icon: StaticImageData;
};

export function ValueProp({ title, description, icon }: ValuePropProps) {
  return (
    <div className="w-full rounded-xl bg-dark-palette-backgroundAlternate px-6 py-5">
      <div className="grid w-full grid-cols-[auto_1fr] items-center">
        <Image src={icon} alt={title} width={32} height={32} className="h-5 w-5" />
        <div className="ml-14 flex">
          <Title level={TitleLevel.Title3} className="w-1/2">
            {title}
          </Title>
          <Title level={TitleLevel.Title4} className="w-1/2 text-dark-palette-foreground">
            {description}
          </Title>
        </div>
      </div>
    </div>
  );
}
