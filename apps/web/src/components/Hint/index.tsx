import classNames from 'classnames';
import { HTMLAttributes, forwardRef } from 'react';

export enum HintVariants {
  Muted = 'muted',
  Error = 'error',
}

export type HintProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: HintVariants;
};

const Hint = forwardRef<HTMLSpanElement, HintProps>(
  ({ children, variant = HintVariants.Muted }, ref) => {
    const hintClassName = classNames('text-sm', {
      'text-gray-60': variant === HintVariants.Muted,
      'text-red-60': variant === HintVariants.Error,
    });

    return (
      <span ref={ref} className={hintClassName}>
        {children}
      </span>
    );
  },
);

Hint.displayName = 'Hint';

export default Hint;
