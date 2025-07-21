import Text from 'apps/web/src/components/base-org/typography/TextRedesign';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';
import { cn } from 'apps/web/src/utils/cn';
import Link from 'apps/web/src/components/Link';
import React from 'react';

type ResourcesGridProps = {
  accentColor?: 'green' | 'yellow' | 'blue' | 'brown';
  items: {
    title: string;
    description: string;
    href: string;
  }[];
};

export default function ResourcesGrid({ items, accentColor = 'blue' }: ResourcesGridProps) {
  const getLongestString = (strings: string[]) => {
    return strings.reduce((a, b) => (a.length > b.length ? a : b), '');
  };

  return (
    <div
      className={cn(
        'col-span-full mt-6 grid gap-[min(2.25vw,_32px)] lg:mt-10',
        items.length >= 3 ? 'grid-cols-1 lg:grid-cols-3' : 'grid-cols-1',
        items.length === 2 && 'lg:grid-cols-2',
      )}
    >
      {items.map((item) => (
        <Link
          href={item.href}
          key={item.href}
          target={item.href.includes('https://') ? '_blank' : '_self'}
          className="group mb-4 flex h-[308px] flex-col rounded-lg bg-base-gray-25 p-6 transition-colors duration-300 hover:bg-base-gray-50 lg:mb-0"
        >
          <div className="flex h-full flex-col justify-between lg:h-[230px]">
            <div className="flex items-center justify-between">
              <SquareSVG
                className={cn(
                  accentColor === 'green' && '[&_rect]:fill-[#66C800]',
                  accentColor === 'yellow' && '[&_rect]:fill-[#ffd200]',
                  accentColor === 'blue' && '[&_rect]:fill-[#0000ff]',
                  accentColor === 'brown' && '[&_rect]:fill-[#b8a581]',
                )}
              />
              <svg
                width="13"
                height="14"
                viewBox="0 0 13 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="transition-transform duration-300 ease-in-out group-hover:rotate-45"
              >
                <path
                  d="M2.02127 13.04L0.317273 11.36L8.52527 3.152V2.792L2.38127 2.888V0.8H12.5573V10.952H10.4693L10.5653 4.808H10.2053L2.02127 13.04Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="flex-0 mt-auto flex flex-col gap-3">
              <div className="relative">
                <Title level={TitleLevel.H6Regular} as="h4">
                  {item.title}
                </Title>
              </div>
              <div className="relative">
                <Text
                  variant={TextVariant.Body}
                  className="absolute left-0 top-0 !text-pretty !text-base-gray-200"
                >
                  {item.description}
                </Text>
                <Text
                  variant={TextVariant.Body}
                  className="pointer-events-none invisible select-none !text-pretty !text-base-gray-200"
                >
                  {getLongestString(items.map((i) => i.description))}
                </Text>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function SquareSVG(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="24" height="24" rx="2" fill="#66C800" />
    </svg>
  );
}
