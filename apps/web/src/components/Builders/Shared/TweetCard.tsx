import { TextVariant } from 'apps/web/src/components/base-org/typography/Text/types';
import Title from 'apps/web/src/components/base-org/typography/Title';
import Text from 'apps/web/src/components/base-org/typography/Text';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Image, { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

type TweetCardProps = {
  image?: StaticImageData;
  name: string;
  username?: string;
  content?: string | ReactNode;
};

export function TweetCard({ image, name, username, content }: TweetCardProps) {
  return (
    <div className="flex h-[250px] max-w-sm flex-col gap-2 overflow-auto rounded-lg border border-[#8A919E]/20 bg-dark-palette-backgroundAlternate p-6">
      <div className="flex gap-2">
        {image && <Image src={image} alt={name} height={48} width={48} className="rounded-full" />}
        <div className="flex flex-col gap-1">
          <Title level={TitleLevel.Title3}>{name}</Title>
          <Text variant={TextVariant.Label1} className="text-dark-palette-foregroundMuted">
            {username}
          </Text>
        </div>
      </div>
      <Text variant={TextVariant.Body} className="whitespace-pre-line">
        {content}
      </Text>
    </div>
  );
}
