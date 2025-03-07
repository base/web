'use client';
import ImageWithLoading from 'apps/web/src/components/ImageWithLoading';
import Card from 'apps/web/src/components/base-org/Card';
import Text from 'apps/web/src/components/base-org/typography/Text';

type Props = {
  name: string;
  url: string;
  description: string;
  imageUrl: string;
  category: string;
  subcategory: string;
};

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
  return (
    <Card innerClassName="p-4 group/ecosystem-card">
      <a
        href={url}
        rel="noreferrer noopener"
        target="_blank"
        className="flex w-full flex-col justify-start gap-8"
      >
        <div className="flex flex-row justify-between">
          <div className="relative z-20 h-[80px] w-[80px] rounded-[3px]">
            <ImageWithLoading
              src={imageUrl}
              alt={`Logo of ${name}`}
              width={80}
              height={80}
              backgroundClassName="bg-black"
            />
            <div className="absolute inset-0 -z-10 h-full w-full opacity-70 blur-[1rem]">
              <ImageWithLoading
                src={imageUrl}
                alt={`Logo of ${name}`}
                width={80}
                height={80}
                backgroundClassName="bg-black"
              />
            </div>
          </div>
          <div className="flex flex-col items-end gap-y-2.5">
            <div className="flex h-6 flex-col justify-center rounded-[100px] bg-black px-2 py-1">
              <span className="rounded-full border border-white px-2 py-1 font-mono text-xs uppercase text-white">
                {category}
              </span>
            </div>
            <div className="flex h-6 flex-col justify-center rounded-[100px] bg-black px-2 py-1">
              {subcategory !== category && (
                <span className="rounded-full border border-gray-muted px-2 py-1 font-mono text-[10px] uppercase text-gray-muted">
                  {subcategory}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <h3 className="font-mono text-xl uppercase text-white">{name}</h3>
            <span className="truncate font-mono text-gray-muted">
              {getNiceDomainDisplayFromUrl(url)}
            </span>
          </div>
          <Text className="opacity-80 group-hover/ecosystem-card:opacity-100">{description}</Text>
        </div>
      </a>
    </Card>
  );
}
