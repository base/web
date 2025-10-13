import classNames from 'classnames';
import { FieldsetHTMLAttributes, forwardRef } from 'react';

export type FieldsetProps = { inline?: boolean } & FieldsetHTMLAttributes<HTMLFieldSetElement>;

const Fieldset = forwardRef<HTMLFieldSetElement, FieldsetProps>(
  ({ children, inline = false }, ref) => {
    const fieldsetClasses = classNames('flex w-full  gap-3', {
      'flex-col': !inline,
      'flex-row justify-between items-center': inline,
    });
    return (
      <fieldset className={fieldsetClasses} ref={ref}>
        {children}
      </fieldset>
    );
  },
);

Fieldset.displayName = 'Fieldset';

export default Fieldset;
