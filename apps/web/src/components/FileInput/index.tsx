import classNames from 'classnames';
import { forwardRef, InputHTMLAttributes } from 'react';

export type FileInputProps = InputHTMLAttributes<HTMLInputElement>;

const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  ({ className: _className, disabled, className, ...props }, ref) => {
    const FileInputClassNames = classNames(
      'rounded-md border border-gray-40/20 p-4 text-black transition-colors hover:border-blue-600 cursor-pointer',
      { 'pointer-events-none bg-gray-40/10': disabled },
      className,
    );
    return (
      <input type="file" ref={ref} className={FileInputClassNames} disabled={disabled} {...props} />
    );
  },
);

FileInput.displayName = 'FileInput';

export default FileInput;
