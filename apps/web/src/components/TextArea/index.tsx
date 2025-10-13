import classNames from 'classnames';
import { TextareaHTMLAttributes, forwardRef } from 'react';

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className: _className, disabled, ...props }, ref) => {
    const textAreaClassNames = classNames(
      'rounded-md border border-gray-40/20 p-4 text-black transition-colors hover:border-blue-600',
      { 'opacity-50 pointer-events-none bg-gray-40/10': disabled },
    );
    return <textarea ref={ref} className={textAreaClassNames} disabled={disabled} {...props} />;
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
