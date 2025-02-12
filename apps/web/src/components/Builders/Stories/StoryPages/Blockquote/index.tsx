import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import classNames from 'classnames';

export function Blockquote({ quote, color }: { quote: string; color: string }) {
  return (
    <div className={classNames('mb-14 w-full italic', color)}>
      <Title level={TitleLevel.Display3}>"{quote}"</Title>
    </div>
  );
}
