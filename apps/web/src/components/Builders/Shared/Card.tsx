import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ReactNode } from 'react';

export type CardProps = {
  icon?: ReactNode;
  title: string;
  description: string | ReactNode;
  iconClassName?: string;
  className?: string;
  tag?: ReactNode;
};
export function Card({
  icon,
  title,
  description,
  className,
  iconClassName = 'text-white',
  tag,
}: CardProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {icon && <div className={iconClassName}>{icon}</div>}
      <div className="flex items-center gap-4 pt-4">
        <Title level={TitleLevel.Title3} className="font-bold">
          {title}
        </Title>
        {tag}
      </div>
      {typeof description === 'string' ? (
        <Title className="pt-2 text-dark-palette-foregroundMuted" level={TitleLevel.Title4}>
          {description}
        </Title>
      ) : (
        description
      )}
    </div>
  );
}
