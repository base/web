import Link from 'apps/web/src/components/Link';
import Image, { StaticImageData } from 'next/image';
import classNames from 'classnames';
import {
  Button,
  ButtonVariants,
  ButtonSizes,
} from 'apps/web/src/components/Button/Redesign/Button';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

type BrandIndexItem = {
  href: string;
  img: StaticImageData | string | Record<string, unknown>;
  label: string;
};

export default function BrandIndex({
  index,
  hasHeading,
}: {
  index: BrandIndexItem[];
  hasHeading?: boolean;
}) {
  return (
    <div
      className={classNames(
        'col-span-full grid gap-x-8 gap-y-6 md:grid-cols-2 md:gap-y-10 lg:col-span-9 lg:col-start-4',
        hasHeading && 'lg:pb-2',
        !hasHeading && 'pb-10 lg:pb-[88px]',
      )}
    >
      {hasHeading && (
        <div className="col-span-full border-t border-base-black pt-4 md:pt-6">
          <Title level={TitleLevel.H5Regular} as="h4">
            More Sections
          </Title>
        </div>
      )}

      {index.map((item) => {
        const isVideo =
          typeof item.img === 'string'
            ? item.img.match(/\.(mp4|webm|ogg|mov)$/i)
            : typeof item.img === 'object' && item.img && !('width' in item.img);

        return (
          <div key={item.href}>
            <Link href={item.href}>
              {!isVideo ? (
                <Image
                  src={item.img as StaticImageData | string}
                  alt={item.label}
                  className="w-full"
                  quality={99}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1440px) 30vw, 700px"
                />
              ) : (
                <div className="rounded-[12px] bg-base-gray-25">
                  <video
                    className="aspect-[676/524] w-full object-cover mix-blend-darken"
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source
                      src={
                        typeof item.img === 'string'
                          ? item.img
                          : String((item.img as Record<string, unknown>).default)
                      }
                      type="video/mp4"
                    />
                  </video>
                </div>
              )}
            </Link>
            <Button
              variant={ButtonVariants.Secondary}
              type="button"
              className="mt-4 w-full md:col-span-2 md:w-fit md:px-4"
              asChild
              size={ButtonSizes.Small}
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}
