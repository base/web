import classNames from 'classnames';
import { ElementType, ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  fullSpan?: boolean;
  gapY?: boolean;
  id?: string;
};

// TODO: check gap?
export default function Container({ children, as, className, id }: ContainerProps) {
  const Tag = as ?? 'div';
  return (
    <Tag
      className={classNames(
        'relative z-20 mx-auto mb-[72px] grid w-full grid-cols-9 gap-x-[min(2.25vw,_32px)] lg:mb-20 lg:py-8',
        className,
      )}
      id={id}
    >
      {children}
    </Tag>
  );
}
