import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import Link from 'next/link';

export function ReadMore({
  previousLabel,
  previousHref,
  nextLabel,
  nextHref,
}: {
  previousLabel: string;
  previousHref: string;
  nextLabel: string;
  nextHref: string;
}) {
  return (
    <div className="my-16 flex w-full flex-row justify-between">
      <div className="flex flex-col gap-2 border-b border-dark-palette-foregroundMuted">
        <span className="text-sm uppercase text-dark-palette-foregroundMuted">Previous</span>
        <Link href={previousHref}>
          <Title level={TitleLevel.Title3}>{previousLabel}</Title>
        </Link>
      </div>
      <div className="flex flex-col gap-2 border-b border-dark-palette-foregroundMuted text-right">
        <span className="text-sm uppercase text-dark-palette-foregroundMuted">Next</span>
        <Link href={nextHref}>
          <Title level={TitleLevel.Title3}>{nextLabel}</Title>
        </Link>
      </div>
    </div>
  );
}
