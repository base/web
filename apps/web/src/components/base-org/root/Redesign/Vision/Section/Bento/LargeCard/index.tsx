import { ImageType } from 'apps/web/src/components/base-org/root/Redesign/Section';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { VideoPlayer } from 'apps/web/src/components/Brand/Video';
import Image from 'next/image';

type LargeCardProps = {
  prefix: ImageType;
  title: string;
  description: string;
  asset?: ImageType;
  assetType?: 'image' | 'video';
  align?: 'top' | 'bottom';
};

export function LargeCard({ content }: { content: LargeCardProps }) {
  return (
    <div className="grid grid-cols-9 gap-10 overflow-hidden rounded-[8px] bg-base-gray-25">
      <div className="col-span-full flex flex-col justify-end gap-4 p-6 lg:col-span-3 lg:gap-8">
        <div className="flex flex-col gap-4 lg:gap-8">
          <Title className="!text-pretty" level={TitleLevel.H5Regular}>
            {content.title}
          </Title>
          <Text variant={TextVariant.Body} className="!text-base-gray-200">
            {content.description}
          </Text>
        </div>
      </div>
      <div className="col-span-full flex min-h-0 w-full lg:col-span-4 lg:col-start-6">
        {content.asset &&
          (content.assetType === 'image' ? (
            <Image
              src={content.asset.src}
              alt={content.asset.alt}
              width={content.asset.width}
              height={content.asset.height}
              className="h-full w-full object-cover lg:max-h-[500px]"
              quality={90}
              draggable={false}
            />
          ) : (
            <div className="aspect-square h-full w-full bg-[#EBEDF1] lg:max-h-[500px]">
              <VideoPlayer videoSrc={content.asset.src} />
            </div>
          ))}
      </div>
    </div>
  );
}
