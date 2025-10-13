import classNames from 'classnames';
import { LabelHTMLAttributes, forwardRef } from 'react';

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

const Label = forwardRef<HTMLLabelElement, LabelProps>(({ children, htmlFor, className }, ref) => {
  const labelClasses = classNames('font-bold', className, { 'cursor-pointer': !!htmlFor });
  return (
    <label ref={ref} htmlFor={htmlFor} className={labelClasses}>
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export default Label;
