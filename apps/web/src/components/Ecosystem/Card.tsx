'use client';

/**
 * Ecosystem Card Component
 *
 * Displays an individual ecosystem project/app in a card format.
 * Includes project logo, name, description, and category tags.
 */

import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import Card from 'apps/web/src/components/base-org/Card';
import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import type { EcosystemApp } from 'apps/web/src/types/ecosystem';

type Props = EcosystemApp;

const MAX_DESCRIPTION_LENGTH = 200;

/**
 * Extracts a clean domain name from a URL for display purposes.
 * Removes protocol and www prefix, and strips path segments.
 *
 * @param url - The full URL to extract the domain from
 * @returns The cleaned domain name (e.g., "example.com")
 *
 * @example
 * getNiceDomainDisplayFromUrl("https://www.example.com/path") // returns "example.com"
 */
function getNiceDomainDisplayFromUrl(url: string): string {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').split('/')[0];
}

/**
 * EcosystemCard displays a single ecosystem project in a clickable card format.
 *
 * Features:
 * - Project logo with loading state
 * - Project name and domain
 * - Truncated description (max 200 characters)
 * - Category and subcategory tags
 * - Opens project URL in a new tab
 */
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
    <a
      href={url}
      rel="noreferrer noopener"
      target="_blank"
      aria-label={`Visit ${name} - ${category} project. ${truncatedDescription}`}
      className="flex flex-col items-stretch w-full h-full justify-stretch focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg"
    >
      <Card
        wrapperClassName="w-full h-full"
        innerClassName="p-4 lg:p-6 group/ecosystem-card flex flex-col gap-8 justify-start w-full"
        radius={8}
      >
        <div className="flex flex-col gap-8 lg:gap-4">
          <div className="relative z-20 size-[128px] overflow-clip rounded-[8px] bg-base-gray-50 p-6">
            <ImageWithLoading
              src={imageUrl}
              alt={`Logo of ${name}`}
              width={128}
              height={128}
              backgroundClassName="bg-base-gray-50"
              imageClassName="rounded-[8px]"
            />
          </div>
          <div className="flex flex-col gap-4 h-full">
            <div className="flex flex-col gap-2">
              <Title level={TitleLevel.H6Regular}>{name}</Title>
              <Text variant={TextVariant.BodyMono} className="truncate !text-base-gray-200">
                {getNiceDomainDisplayFromUrl(url)}
              </Text>
            </div>
            <Text className="opacity-80 group-hover/ecosystem-card:opacity-100">
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
    </a>
  );
}
