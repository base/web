import Link from 'apps/web/src/components/Link';
import cx from 'classnames';
import Title from 'apps/web/src/components/base-org/typography/TitleRedesign';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/TitleRedesign/types';

type Props = {
  links: {
    title: string;
    description: string;
    url: string;
  }[];
};

export function LinkStack({ links }: Props) {
  return (
    <ul className="flex flex-col gap-0 w-full">
      {links.map((link, index) => {
        const isExternal = link.url.startsWith('http');

        return (
          <li key={link.url} className="w-full">
            <Link
              href={link.url}
              className={cx(
                'space-between group flex w-full items-center border-t border-white py-4 hover:bg-gray-90',
                {
                  'border-b': index === links.length - 1,
                },
              )}
              target={isExternal ? '_blank' : undefined}
              rel={isExternal ? 'noopener noreferrer' : undefined}
            >
              <div className="flex flex-col gap-3">
                <div className="text-4xl leading-[1.15] tracking-[-1.6px] md:text-7xl md:leading-none md:tracking-[-2.56px]">
                  <Title level={TitleLevel.H2Regular}>{link.title}</Title>
                </div>
                <div className="max-w-[325px] leading-[1.25] text-gray-20">{link.description}</div>
              </div>
              <div className="ml-auto font-mono text-2xl leading-none">{'/>'}</div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
