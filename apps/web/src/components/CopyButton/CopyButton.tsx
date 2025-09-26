'use client';

import classNames from 'classnames';
import { SVGProps, useCallback, useEffect, useRef, useState } from 'react';

const handleCopy = async (
  text: string,
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  lastCopiedRef: React.MutableRefObject<number>,
  setCopied: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    await navigator.clipboard.writeText(text);
    setCopied(true);
    lastCopiedRef.current = Date.now();

    timeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text:', err);
  }
};

const handleMouseEnter = (
  copied: boolean,
  lastCopiedRef: React.MutableRefObject<number>,
  timeoutRef: React.MutableRefObject<NodeJS.Timeout | null>,
  setCopied: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  if (copied && Date.now() - lastCopiedRef.current > 500) {
    setCopied(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }
};

export function CopyButton({ text, className }: { text: string; className?: string }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastCopiedRef = useRef<number>(0);

  useEffect(() => {
    const currentTimeout = timeoutRef.current;
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, []);

  const handleMouseEnterCallback = useCallback(() => {
    handleMouseEnter(copied, lastCopiedRef, timeoutRef, setCopied);
  }, [copied]);

  const handleCopyCallback = useCallback(() => {
    void handleCopy(text, timeoutRef, lastCopiedRef, setCopied);
  }, [text]);

  return (
    <div
      className={classNames('relative grid justify-items-center', className)}
      onMouseEnter={handleMouseEnterCallback}
    >
      <button
        type="button"
        className="grid absolute z-20 place-items-center cursor-pointer group size-7"
        onClick={handleCopyCallback}
      >
        <div className="grid relative place-items-center size-full">
          <Icons.LightCheck
            className={classNames(
              'absolute size-5 w-auto transition-all duration-300 will-change-transform',
              copied
                ? 'scale-100 opacity-100 animate-in fade-in [&_path]:fill-black'
                : 'scale-30 opacity-0 animate-out fade-out',
            )}
          />
          <Icons.Copy
            className={classNames(
              'absolute size-5 transition-all duration-300 will-change-transform group-hover:[&_path]:fill-black',
              copied
                ? 'scale-30 opacity-0 animate-out fade-out'
                : 'scale-100 opacity-100 animate-in fade-in',
            )}
          />
        </div>
      </button>
    </div>
  );
}

const Icons = {
  LightCheck: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B1B1B1" {...props}>
      <path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z" />
    </svg>
  ),
  Copy: (props: SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#B1B1B1" {...props}>
      <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z" />
    </svg>
  ),
};
