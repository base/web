import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { Icon } from 'apps/web/src/components/Icon/Icon';
import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

export function Hero({
  title,
  description,
  href,
  region,
  project,
  onBaseSince,
  image,
}: {
  title: string;
  description: string;
  href: string;
  region: string;
  project: string;
  onBaseSince: string;
  image: StaticImageData;
}) {
  return (
    <div className="mb-24 mt-32 flex w-full flex-col items-start gap-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <Title level={TitleLevel.Display3} className="font-medium">
            {title}
          </Title>
          <Title level={TitleLevel.Title2} className="text-dark-palette-foregroundMuted">
            {description}
          </Title>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[245px_245px_245px] md:gap-12">
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase text-dark-palette-foregroundMuted">
            Region
          </span>
          <Title level={TitleLevel.Title3}>{region}</Title>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase text-dark-palette-foregroundMuted">
            Project
          </span>
          <Link href={href}>
            <div className="flex flex-row items-center gap-2">
              <Title level={TitleLevel.Title3}>{project}</Title>
              <div className="text-dark-palette-foregroundMuted">
                <Icon name="diagonalUpArrow" width={16} height={16} color="currentColor" />
              </div>
            </div>
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium uppercase text-dark-palette-foregroundMuted">
            On Base Since
          </span>
          <Title level={TitleLevel.Title3}>{onBaseSince}</Title>
        </div>
      </div>
      <Image src={image} alt={title} />
    </div>
  );
}
