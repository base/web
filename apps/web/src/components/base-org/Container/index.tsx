import classNames from 'classnames';
import { ElementType, ReactNode } from 'react';

type ContainerProps = { children: ReactNode; as?: ElementType; className?: string };

export default function Container({ children, as, className }: ContainerProps) {
  const Tag = as ?? 'div';
  return (
    <Tag
      className={classNames(
        'mx-auto w-full max-w-[80rem] px-[1rem] md:px-[1.5rem] lg:px-[2rem]',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
