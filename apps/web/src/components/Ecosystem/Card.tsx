'use client';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import Link from 'apps/web/src/components/Link';
import Card from 'apps/web/src/components/base-org/Card';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

type Props = {
  name: string;
  url: string;
  description: string;
  imageUrl: string;
  category: string;
  subcategory: string;
};

const MAX_DESCRIPTION_LENGTH = 200;

function getNiceDomainDisplayFromUrl(url: string) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
}

export default function EcosystemCard({
  name,
  url,
  description,
  imageUrl,
  category,
  subcategory,
}: Props) {
  const truncatedDescription =
    description.length > MAX_DESCRIPTION_LENGTH
      ? description.slice(0, MAX_DESCRIPTION_LENGTH) + '...'
      : description;

  return (
    <Link
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      className="flex flex-col items-stretch w-full h-full justify-stretch"
    >
      <Card
        wrapperClassName="w-full h-full"
        innerClassName="p-4 lg:p-6 group/ecosystem-card flex flex-col gap-4 justify-start w-full"
        radius={8}
      >
        <div className="flex flex-col gap-4">
          <div className="relative z-20 h-24 w-24 overflow-hidden rounded-[8px] bg-base-gray-50 p-3 lg:h-32 lg:w-32 lg:p-4">
            <ImageWithLoading
              src={imageUrl}
              alt={`Logo of ${name}`}
              width={128}
              height={128}
              backgroundClassName="bg-base-gray-50"
              imageClassName="rounded-[8px] w-full h-full object-contain"
            />
          </div>
          <div className="flex flex-col flex-1 gap-3">
            <div className="flex flex-col gap-1">
              <Title level={TitleLevel.H6Regular}>{name}</Title>
              <Text variant={TextVariant.BodyMono} className="truncate !text-base-gray-200">
                {getNiceDomainDisplayFromUrl(url)}
              </Text>
            </div>
            <Text className="flex-1 opacity-80 group-hover/ecosystem-card:opacity-100">
              {truncatedDescription}
            </Text>
          </div>
        </div>

        <div className="flex flex-row gap-x-2 mt-auto">
          <div className="flex flex-col justify-center rounded-[8px] bg-base-gray-50 px-2.5 py-1.5 text-base-black">
            <span className="font-mono text-xs uppercase">{category}</span>
          </div>
          {subcategory !== category && (
            <div className="flex flex-col justify-center rounded-[8px] bg-base-gray-50 px-2.5 py-1.5 text-base-gray-200">
              <span className="font-mono text-xs uppercase">{subcategory}</span>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
