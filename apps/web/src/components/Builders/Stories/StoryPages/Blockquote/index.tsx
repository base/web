import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';

export function Blockquote({ quote, color='text-white' }: { quote: string; color?: string }) {
  return (
    <div className={classNames('mb-14 w-full', color)}>
      <Title level={TitleLevel.Display3}>&quot;{quote}&quot;</Title>
    </div>
  );
}
