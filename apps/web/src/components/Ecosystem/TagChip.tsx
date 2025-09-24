'use client';

import classNames from 'classnames';
import { useCallback } from 'react';
import { TextVariant } from 'apps/web/src/components/base-org/typography/TextRedesign/types';
import { variantStyles } from 'apps/web/src/components/base-org/typography/TextRedesign';

type Props = {
  tag: string;
  isSelected: boolean;
  selectTag: (tag: string) => void;
  className?: string;
};

export function TagChip({ tag, isSelected, selectTag, className }: Props) {
  const onClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      selectTag(tag);
    },
    [selectTag, tag],
  );

  const buttonClasses = classNames(
    variantStyles[TextVariant.CTALabelSm],
    'h-8 whitespace-nowrap rounded-[8px] border px-2 transition-colors',
    className,
    tag === 'ai' ? 'uppercase' : 'capitalize',
    {
      'bg-base-black text-base-white border-base-black': isSelected,
      'text-base-gray-200 transition-colors hover:bg-base-gray-30 hover:text-black border-base-gray-200':
        !isSelected,
    },
  );

  return (
    <button onClick={onClick} type="button" className={buttonClasses}>
      {tag}
    </button>
  );
}
