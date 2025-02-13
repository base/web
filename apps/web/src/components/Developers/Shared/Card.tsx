import Title from 'apps/web/src/components/base-org/typography/Title';
import { TitleLevel } from 'apps/web/src/components/base-org/typography/Title/types';
import { ReactNode } from 'react';

export type CardProps = {
  icon?: ReactNode;
  title: string;
  description: string;
  iconClassName?: string;
  className?: string;
};
export function Card({
  icon,
  title,
  description,
  className,
  iconClassName = 'text-white',
}: CardProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      {icon && <div className={iconClassName}>{icon}</div>}
      <Title level={TitleLevel.Title3} className="pt-4 font-bold">
        {title}
      </Title>
      <Title className="pt-2 text-dark-palette-foregroundMuted" level={TitleLevel.Title4}>
        {description}
      </Title>
    </div>
  );
}
