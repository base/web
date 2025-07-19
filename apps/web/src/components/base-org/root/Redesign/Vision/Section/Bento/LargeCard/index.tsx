import { ImageType } from 'apps/web/src/components/base-org/root/Redesign/Section';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import Image from 'next/image';

type LargeCardProps = {
  prefix: ImageType;
  title: string;
  description: string;
  asset?: ImageType;
  align?: 'top' | 'bottom';
};

export function LargeCard({ content }: { content: LargeCardProps }) {
  return (
    <div className="grid grid-cols-9 gap-10 overflow-hidden rounded-[8px] bg-base-gray-25">
      <div className="flex flex-col col-span-full gap-4 justify-end p-6 lg:col-span-3 lg:gap-8">
        <div className="flex flex-col gap-4 lg:gap-8">
          <Title className="!text-pretty" level={TitleLevel.H5Regular}>
            {content.title}
          </Title>
          <Text variant={TextVariant.Body} className="!text-base-gray-200">
            {content.description}
          </Text>
        </div>
      </div>
      <div className="flex col-span-full w-full min-h-0 lg:col-span-4 lg:col-start-6">
        {content.asset && (
          <Image
            src={content.asset.src}
            alt={content.asset.alt}
            width={content.asset.width}
            height={content.asset.height}
            className="object-cover w-full h-full lg:max-h-[500px]"
            quality={90}
            draggable={false}
          />
        )}
      </div>
    </div>
  );
}
